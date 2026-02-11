require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const SOURCE_DIR = path.expanduser ? path.expanduser('~/Downloads/website') : '/Users/deepakdinesh/Downloads/website';
const OUTPUT_FILE = path.expanduser ? path.expanduser('~/Projects/spilledpalette/data/artworks.json') : '/Users/deepakdinesh/Projects/spilledpalette/data/artworks.json';

// Categorization function based on filename
function categorize(filename) {
  const lower = filename.toLowerCase();
  
  // sanctuary: landscapes, sunsets, willow trees
  if (/landscape|sunset|sunrise|willow|hills|nature scene|scene/i.test(lower)) {
    return 'sanctuary';
  }
  
  // dreamers: rainbows, soft, pastel
  if (/pastel|rainbow|dream|soft|boho/i.test(lower)) {
    return 'dreamers';
  }
  
  // modern: line art, geometric, abstract shapes (non-botanical)
  if (/sunburst|geometric|shapes(?! plant)|abstract (sunburst|butterfly|shapes)(?! plant)|stylized eye/i.test(lower)) {
    return 'modern';
  }
  
  // ink: typography, sketches, line art
  if (/sketch|line art|drawing|minimalist|striped/i.test(lower)) {
    return 'ink';
  }
  
  // dopamine: bright, fun, smiley, happiness
  if (/happiness|fun|smiley|bright|dopamine|colorful/i.test(lower)) {
    return 'dopamine';
  }
  
  // patterns: repeating designs
  if (/pattern/i.test(lower)) {
    return 'patterns';
  }
  
  // botanical: vases, plants, leaves (default for most)
  if (/vase|plant|leaf|leaves|fern|botanical|floral|flower|foliage|palm|branch|berry|berries|butterfly|dandelion|olive|petal|grass|moon/i.test(lower)) {
    return 'botanical';
  }
  
  // Default to botanical for anything else
  return 'botanical';
}

// Generate ID from title
function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Generate Cloudinary URLs
function generateUrls(cloudName, publicId) {
  const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
  return {
    url: `${base}/${publicId}`,
    thumb: `${base}/w_400,q_auto,f_auto/${publicId}`,
    preview: `${base}/w_800,q_auto,f_auto/${publicId}`,
    full: `${base}/w_1600,q_auto,f_auto/${publicId}`
  };
}

// Upload single file
async function uploadFile(filePath, cloudName) {
  const filename = path.basename(filePath, '.tiff');
  const id = generateId(filename);
  const category = categorize(filename);
  const publicId = `spilledpalette/${id}`;
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: 'image',
      format: 'jpg', // Convert TIFF to JPG
      transformation: [
        { quality: 'auto:good', fetch_format: 'auto' }
      ]
    });
    
    const urls = generateUrls(cloudName, publicId);
    
    return {
      id,
      title: filename,
      category,
      cloudinaryId: publicId,
      ...urls
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

// Main upload function
async function uploadAll() {
  const startTime = Date.now();
  
  // Verify credentials
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Missing Cloudinary credentials. Please set:');
    console.error('  - CLOUDINARY_CLOUD_NAME');
    console.error('  - CLOUDINARY_API_KEY');
    console.error('  - CLOUDINARY_API_SECRET');
    process.exit(1);
  }
  
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  
  // Get all TIFF files
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.toLowerCase().endsWith('.tiff'))
    .map(f => path.join(SOURCE_DIR, f));
  
  console.log(`📁 Found ${files.length} TIFF files`);
  console.log(`☁️  Uploading to Cloudinary (cloud: ${cloudName})...\n`);
  
  const artworks = [];
  const errors = [];
  
  // Upload files sequentially to avoid rate limits
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filename = path.basename(file, '.tiff');
    const category = categorize(filename);
    
    process.stdout.write(`[${i + 1}/${files.length}] Uploading: ${filename} (${category})... `);
    
    const result = await uploadFile(file, cloudName);
    
    if (result) {
      artworks.push(result);
      process.stdout.write('✅\n');
    } else {
      errors.push(filename);
      process.stdout.write('❌\n');
    }
  }
  
  // Sort by category then title
  artworks.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.title.localeCompare(b.title);
  });
  
  // Save to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(artworks, null, 2));
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`\n✅ Upload complete!`);
  console.log(`📊 Uploaded: ${artworks.length}/${files.length}`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📁 Output: ${OUTPUT_FILE}`);
  
  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(e => console.log(`   - ${e}`));
  }
  
  // Category breakdown
  const byCategory = {};
  artworks.forEach(a => {
    byCategory[a.category] = (byCategory[a.category] || 0) + 1;
  });
  console.log(`\n📊 Categories:`);
  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });
}

uploadAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

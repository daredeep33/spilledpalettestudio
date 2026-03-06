const https = require('https');
const fs = require('fs');

const API_KEY = process.env.GEMINI_API_KEY || '';

// Generate Logo
const logoPrompt = `Design an elegant logo for "Spilled Palette Studio" - an art gallery website. 
Style: Minimalist, sophisticated, artistic.
Elements: Abstract paint brush or palette motif, flowing paint strokes, warm terracotta and soft cream colors.
Typography: Elegant serif font for "Spilled Palette" with "Studio" smaller beneath.
Background: Clean white or very light cream.
Mood: Creative, professional, artistic, calming.
Shape: Suitable for horizontal website header and square social media profile.`;

// Generate Favicon
const faviconPrompt = `Design a simple favicon icon for "Spilled Palette Studio" art gallery.
Style: Minimalist, iconic, recognizable at small size.
Elements: Abstract paint palette or brush stroke, warm terracotta color (#D4A574).
Background: Transparent or white.
Shape: Square, simple enough to work at 32x32 and 16x16 pixels.
Clean, professional, artistic.`;

function generateImage(prompt, filename) {
  const data = JSON.stringify({
    contents: [{
      role: "user",
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      temperature: 0.7
    }
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);

          if (response.candidates && response.candidates[0].content.parts) {
            const parts = response.candidates[0].content.parts;
            parts.forEach((part) => {
              if (part.inlineData) {
                const buffer = Buffer.from(part.inlineData.data, 'base64');
                fs.writeFileSync(filename, buffer);
                console.log(`✅ Generated: ${filename}`);
              }
            });
          }
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('Generating logo...');
  await generateImage(logoPrompt, '/Users/deepakdinesh/Projects/spilledpalette/public/logo.png');

  console.log('Generating favicon...');
  await generateImage(faviconPrompt, '/Users/deepakdinesh/Projects/spilledpalette/public/favicon.png');

  console.log('\nDone!');
}

main().catch(console.error);

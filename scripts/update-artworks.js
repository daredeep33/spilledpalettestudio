const fs = require('fs');

// Read the mapping file
const mapping = JSON.parse(fs.readFileSync('./data/cloudinary_mapping_final.json', 'utf8'));

// Generate updated artworks.ts
let artworksTs = `export interface Artwork {
  id: string
  title: string
  category: 'sanctuary' | 'botanical' | 'modern' | 'dreamers' | 'dopamine' | 'ink' | 'patterns'
  cloudinaryId: string
  insituId: string
  url: string
  insituUrl: string
  thumb: string
  preview: string
  full: string
  insituFull: string
  aspectRatio: 'portrait' | 'landscape' | 'square'
  price: number
}

export const categories = [
  { id: 'all', label: 'All Collection' },
  { id: 'sanctuary', label: 'The Sanctuary Series' },
  { id: 'botanical', label: 'Botanical Studio' },
  { id: 'modern', label: 'Modern Muse' },
  { id: 'dreamers', label: 'Little Dreamers' },
  { id: 'dopamine', label: 'Dopamine Decor' },
  { id: 'ink', label: 'Ink & Word' },
  { id: 'patterns', label: 'The Pattern Library' },
] as const

export const artworks: Artwork[] = [
`;

mapping.artworks.forEach((artwork, index) => {
  const artworkPath = artwork.artwork.url.replace('http://res.cloudinary.com/dzg9imnjl/image/upload/', '');
  const insituPath = artwork.insitu.url.replace('http://res.cloudinary.com/dzg9imnjl/image/upload/', '');
  const artworkId = artworkPath.replace(/.*\//, '').replace('.tiff', '').replace('.png', '').replace('.jpg', '');
  const title = artwork.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const isLast = index === mapping.artworks.length - 1;
  
  artworksTs += `  {
    "id": "${artwork.title}",
    "title": "${title}",
    "category": "${artwork.category}",
    "cloudinaryId": "${artworkPath}",
    "insituId": "${insituPath}",
    "url": "https://res.cloudinary.com/dzg9imnjl/image/upload/${artworkPath}",
    "insituUrl": "https://res.cloudinary.com/dzg9imnjl/image/upload/${insituPath}",
    "thumb": "https://res.cloudinary.com/dzg9imnjl/image/upload/w_400,q_auto,f_auto/${artworkPath}",
    "preview": "https://res.cloudinary.com/dzg9imnjl/image/upload/w_800,q_auto,f_auto/${artworkPath}",
    "full": "https://res.cloudinary.com/dzg9imnjl/image/upload/w_1600,q_auto,f_auto/${artworkPath}",
    "insituFull": "https://res.cloudinary.com/dzg9imnjl/image/upload/w_1600,q_auto,f_auto/${insituPath}",
    "aspectRatio": "portrait",
    "price": 45
  }${isLast ? '' : ','}\n`;
});

artworksTs += `]\n`;

fs.writeFileSync('./data/artworks.ts', artworksTs);
console.log(`✅ Updated artworks.ts with ${mapping.artworks.length} artworks and in-situ images`);

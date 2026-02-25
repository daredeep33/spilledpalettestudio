const https = require('https');

const API_KEY = '391864421862156';
const API_SECRET = 'TCB-RRA_GRoO4JNNXwS-NCVcgMY';
const CLOUD_NAME = 'dzg9imnjl';

// Delete both artwork and in-situ images
const imagesToDelete = [
  'spilledpalette/artwork/botanical/abstract-palm-tree',
  'spilledpalette/insitu/botanical/botanical-abstract-palm-tree-in-situ'
];

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

function deleteImage(publicId) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      public_ids: [publicId],
      invalidate: true
    });

    const options = {
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUD_NAME}/resources/image/upload`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`Deleted ${publicId}:`, res.statusCode === 200 ? '✅ Success' : '⚠️ ' + body);
        resolve();
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  for (const image of imagesToDelete) {
    await deleteImage(image);
  }
  console.log('\nDone!');
}

main().catch(console.error);

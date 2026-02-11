const https = require('https');

const API_KEY = 'AIzaSyAOhavZn3Hne0Yt2-0qsfUDhrI8GzETSuA';

const data = JSON.stringify({
  contents: [{
    role: "user",
    parts: [{
      text: "Create a beautiful abstract botanical painting with soft pastel colors, suitable for an art gallery website hero image. Elegant, minimalist, calming aesthetic."
    }]
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

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      console.log('Response:', JSON.stringify(response, null, 2));
      
      // Check if image was generated
      if (response.candidates && response.candidates[0].content.parts) {
        const parts = response.candidates[0].content.parts;
        parts.forEach((part, i) => {
          if (part.inlineData) {
            console.log(`\n✅ IMAGE GENERATED (part ${i})`);
            console.log(`MIME Type: ${part.inlineData.mimeType}`);
            console.log(`Data length: ${part.inlineData.data.length} chars`);
            
            // Save image
            const fs = require('fs');
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync('/tmp/generated_hero.png', buffer);
            console.log('Image saved to: /tmp/generated_hero.png');
          }
        });
      }
    } catch (e) {
      console.error('Parse error:', e);
      console.log('Raw body:', body);
    }
  });
});

req.on('error', (e) => console.error('Request error:', e));
req.write(data);
req.end();

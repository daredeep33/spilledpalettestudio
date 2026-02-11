const { GoogleAuth } = require('google-auth-library');
const https = require('https');

async function generateImage() {
  const auth = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/generative-language'
    ]
  });
  
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  
  const data = JSON.stringify({
    contents: [{
      role: "user",
      parts: [{
        text: "Create a beautiful abstract botanical painting with soft pastel colors, suitable for an art gallery website hero image"
      }]
    }],
    generation_config: {
      response_modalities: ["TEXT", "IMAGE"]
    }
  });
  
  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: '/v1beta/models/gemini-2.0-flash-exp:generateContent',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken.token}`
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          console.log('Response:', JSON.stringify(response, null, 2));
          resolve(response);
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

generateImage().catch(console.error);

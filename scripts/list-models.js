const https = require('https');

const API_KEY = 'AIzaSyAOhavZn3Hne0Yt2-0qsfUDhrI8GzETSuA';

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models?key=${API_KEY}`,
  method: 'GET'
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      console.log('Available Models:');
      response.models.forEach(m => {
        console.log(`- ${m.name} (${m.displayName})`);
      });
    } catch (e) {
      console.error('Error:', body);
    }
  });
});

req.on('error', console.error);
req.end();

const https = require('https');

const testUrl = 'https://media1.tenor.com/m/Xp9ygs-aPf8AAAAC/yeh-bhi-meri-galti-hai-ye-bhi-meri-galti-hai.gif';

console.log("Testing with Referer: http://localhost:3000/ ...");
https.get(testUrl, { headers: { 'Referer': 'http://localhost:3000/' } }, (res) => {
  console.log("Status with localhost referer:", res.statusCode);
});

console.log("Testing with no referer ...");
https.get(testUrl, { headers: {} }, (res) => {
  console.log("Status with no referer:", res.statusCode);
});

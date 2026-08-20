const https = require('https');

const idUrl = 'https://c.tenor.com/6818294267016527359AAAAC/yeh-bhi-meri-galti-hai.gif';

https.get(idUrl, (res) => {
  console.log(idUrl, "=> status:", res.statusCode);
});

const https = require('https');

const media1Url = 'https://media1.tenor.com/m/Xp9ygs-aPf8AAAAC/yeh-bhi-meri-galti-hai-ye-bhi-meri-galti-hai.gif';
const cTenorUrl = 'https://c.tenor.com/Xp9ygs-aPf8AAAAC/yeh-bhi-meri-galti-hai-ye-bhi-meri-galti-hai.gif';
const mediaTenorUrl = 'https://media.tenor.com/m/Xp9ygs-aPf8AAAAC/yeh-bhi-meri-galti-hai-ye-bhi-meri-galti-hai.gif';

[media1Url, cTenorUrl, mediaTenorUrl].forEach(url => {
  https.get(url, (res) => {
    console.log(url, "=> status:", res.statusCode);
  });
});

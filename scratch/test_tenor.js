const https = require('https');

const urls = [
  'https://tenor.com/view/yeh-bhi-meri-galti-hai-ye-bhi-meri-galti-hai-johnny-lever-johnny-lever-meme-akhsay-kumar-meme-gif-6818294267016527359',
  'https://tenor.com/view/ayee-link-dena-gif-17590636023769861346',
  'https://tenor.com/view/dhamaal-javed-jaffrey-chalti-toh-hai-nahi-udi-baba-udi-baba-gif-18173495'
];

urls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/[^"]+\.gif/g) || data.match(/https:\/\/media[^\s"<']+/g);
      console.log("URL:", url);
      console.log("Media matches:", match ? match.slice(0, 5) : "none");
    });
  });
});

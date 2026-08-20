const https = require('https');

const tenorUrls = [
  "https://tenor.com/view/yeh-bhi-meri-galti-hai-ye-bhi-meri-galti-hai-johnny-lever-johnny-lever-meme-akhsay-kumar-meme-gif-6818294267016527359",
  "https://tenor.com/view/ayee-link-dena-gif-17590636023769861346",
  "https://tenor.com/view/mujhse-shaadi-karogi-akshay-kumar-salman-khan-kabhi-tu-yaha-so-kabhi-mai-vaha-so-kabhi-ek-dusre-par-soyenge-bhai-bhai-milke-soyenge-gif-17959058",
  "https://tenor.com/view/dhamaal-javed-jaffrey-chalti-toh-hai-nahi-udi-baba-udi-baba-gif-18173495",
  "https://tenor.com/view/uss-hisaab-se-mere-kitne-paise-huey-manav-dhamaal-javed-jaffrey-gif-10572523281542780289",
  "https://tenor.com/view/dhamaal-javed-jaffrey-adi-he-is-not-so-smart-hes-not-so-smart-gif-18173312",
  "https://tenor.com/view/dhamaal-javed-jaffrey-paya-nahi-aisi-dangerous-situations-mein-mai-automatically-aage-kaise-aa-jata-hoon-gif-18173401",
  "https://tenor.com/view/ek-baar-jo-maine-commitment-kardi-uske-baad-apne-aap-kibhi-nahi-sunta-gif-7769208924808356520",
  "https://tenor.com/view/oh-yes-handsome-sunglasses-gif-15760305",
  "https://tenor.com/view/salman-khan-gif-14971439",
  "https://tenor.com/view/aryan-khan-salman-khan-salman-bhai-salman-sallu-bhai-gif-2300018493553517462",
  "https://tenor.com/view/holding-hands-namaste-heroes-salman-khan-celebration-gif-744390825087103431",
  "https://tenor.com/view/salman-khan-love-dabangg-glasses-kulfy-gif-5530577291219038577",
  "https://tenor.com/view/war-hrithik-roshan-hrithik-style-hrithik-entry-hotness-alert-gif-19873739",
  "https://tenor.com/view/apr-7-gif-9173291662249268716",
  "https://tenor.com/view/plan-what's-your-plan-plan-kya-plan-kya-hai-tumhara-goggles-gif-1356955180928040300",
  "https://tenor.com/view/best-gif-9019929844728787973",
  "https://tenor.com/view/animal-director-animal-loda-lele-mera-animal-last-scene-ranbir-kapoor-animal-gif-15641091994361537700",
  "https://tenor.com/view/ranbir-kapoor-ae-dil-hai-mushkil-senem-hindi-gif-5682658576562307589",
  "https://tenor.com/view/brahmastra-brahmastra-trailer-brahmastra-movie-alia-bhatt-ranbir-kapoor-gif-25953382",
  "https://tenor.com/view/ranbir-kapoor-excited-working-happy-laddu-gif-23008047",
  "https://tenor.com/view/tu-jhoothi-main-makkaar-ranbir-kapoor-shraddha-kapoor-gif-27476430",
  "https://tenor.com/view/ranbir-kapoor-aishwarya-rai-anushka-sharma-fawad-khan-ae-dil-hai-mushkil-gif-683228443256261346",
  "https://tenor.com/view/anushka-sharma-ranbir-kapoor-gif-19028729",
  "https://tenor.com/view/bollywood-bollywood-2-sidharth-malhotra-shraddha-kapoor-deepika-padukone-gif-9133585470819292690",
  "https://tenor.com/view/emraan-hashmi-bads-of-bollywood-aryan-khan-raghav-juyal-raghav-emraan-gif-13258264524425659805",
  "https://tenor.com/view/emraan-hashmi-aashiq-banaya-aapne-murder-zeher-tumsa-nahi-dekha-gif-11586231285519674804",
  "https://tenor.com/view/it-was-a-wonderful-journey-emraan-hashmi-pinkvilla-it-was-fun-i-had-a-wonderful-time-gif-1362834078848933966",
  "https://tenor.com/view/bollywood-once-upon-a-time-in-mumbai-emraan-hashmi-prachi-desai-nimra-gif-7564422617388680183"
];

const results = {};

let pending = tenorUrls.length;

tenorUrls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/media1\.tenor\.com\/m\/[^\s"<']+\.gif/);
      if (match) {
        results[url] = match[0];
      } else {
        const anyGif = data.match(/https:\/\/[^"]+\.gif/);
        results[url] = anyGif ? anyGif[0] : null;
      }
      pending--;
      if (pending === 0) {
        console.log(JSON.stringify(results, null, 2));
      }
    });
  }).on('error', () => {
    pending--;
  });
});

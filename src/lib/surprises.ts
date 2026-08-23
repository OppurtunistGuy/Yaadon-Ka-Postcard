// Curated Bollywood & Festival surprises — memes, dialogues, songs, icons & Virtual Rakhis
// Organised by vibe & festival theme. Each surprise is a hidden "gift" inside a postcard.

export type Vibe = "jolly" | "romantic" | "action" | "classic" | "rakhi" | "ganpati";
export type SurpriseType = "meme" | "dialogue" | "song" | "moment" | "festival";

export interface SelectedGif {
  id: string;
  title: string;
  character: string;
  mediaUrl: string;
  previewUrl: string;
  source: string;
  width?: number;
  height?: number;
}

export interface Surprise {
  id: string;
  vibe: Vibe;
  type: SurpriseType;
  title: string;
  character: string;
  movie?: string;
  quote: string;
  caption: string;
  emoji: string;
  gifUrl?: string;
  gif?: SelectedGif;
  accent: string;
  songTitle?: string;
  songArtist?: string;
  musicUrl?: string;
  musicPlatform?: "youtube" | "spotify";
  rakhiId?: string;
  ganpatiImgId?: string;
}

export interface VibeMeta {
  id: Vibe;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
}

export const VIBES: VibeMeta[] = [
  {
    id: "jolly",
    label: "Jolly",
    emoji: "😂",
    tagline: "Haste haste bhej do",
    description: "Comic legends & timeless one-liners to crack them up.",
  },
  {
    id: "romantic",
    label: "Romantic",
    emoji: "❤️",
    tagline: "Dil se dil tak",
    description: "Soulful songs & dialogues that say what words can't.",
  },
  {
    id: "action",
    label: "Action Hero",
    emoji: "🔥",
    tagline: "Entry full swag",
    description: "Swag entries & power-packed moments for the hero mode.",
  },
  {
    id: "classic",
    label: "Classic",
    emoji: "✨",
    tagline: "Puraani yaadein",
    description: "A timeless mix — let the postcard choose the mood.",
  },
];

export function createAuthoritativeGif(
  id: string,
  title: string,
  character: string,
  mediaUrl: string,
  source = "tenor"
): SelectedGif {
  return {
    id,
    title,
    character,
    mediaUrl: mediaUrl.trim(),
    previewUrl: mediaUrl.trim(),
    source,
  };
}

export function normalizeGif(
  input?: string | Partial<SelectedGif> | null,
  defaultTitle = "Surprise GIF",
  defaultCharacter = "Bollywood Classic"
): SelectedGif | undefined {
  if (!input) return undefined;

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return undefined;
    return createAuthoritativeGif(trimmed, defaultTitle, defaultCharacter, trimmed);
  }

  const media = (input.mediaUrl || input.previewUrl || "").trim();
  if (!media) return undefined;

  return createAuthoritativeGif(
    input.id || media,
    input.title || defaultTitle,
    input.character || defaultCharacter,
    media,
    input.source || "tenor"
  );
}

// Authoritative Surprises Master List — includes Celebrity Character options & Festive Options
export const SURPRISES_RAW: Surprise[] = [
  // ============ 🌸 RAKHI FESTIVAL SURPRISES & VIRTUAL RAKHIS ============
  {
    id: "rakhi-dhaaga",
    vibe: "rakhi",
    type: "festival",
    title: "Golden Om Virtual Rakhi",
    character: "Virtual Rakhi Thread 🕉️",
    quote: "Phoolon ka taron ka sabka kehna hai, ek hazaron mein meri behen/bhai hai!",
    caption: "Shubh Om emblem with golden zardosi thread tied on your postcard.",
    emoji: "🌸",
    accent: "#b91c1c",
    rakhiId: "rakhi-gold-om",
  },
  {
    id: "rakhi-mor-pankh-surprise",
    vibe: "rakhi",
    type: "festival",
    title: "Mor Pankh Virtual Rakhi",
    character: "Virtual Rakhi Thread 🦚",
    quote: "Jitna bhi lado, musibat mein sabse pehle bhai/behen hi khada hota hai.",
    caption: "Royal peacock feather emblem with shimmering turquoise silk tassels.",
    emoji: "🦚",
    accent: "#0284c7",
    rakhiId: "rakhi-mor-pankh",
  },
  {
    id: "rakhi-swastik-surprise",
    vibe: "rakhi",
    type: "festival",
    title: "Resham Swastik Virtual Rakhi",
    character: "Virtual Rakhi Thread 🌸",
    quote: "Pehle mera gift nikal... uske baad hi aarti utarungii!",
    caption: "Auspicious red & yellow mauli thread with crimson zardosi flower.",
    emoji: "🌸",
    accent: "#991b1b",
    rakhiId: "rakhi-swastik-red",
  },
  {
    id: "rakhi-rudraksha-surprise",
    vibe: "rakhi",
    type: "festival",
    title: "Rudraksha Royal Virtual Rakhi",
    character: "Virtual Rakhi Thread 📿",
    quote: "Humesha ek dusre ki raksha karne ka vaada.",
    caption: "Sacred Rudraksha bead with protective saffron silk threads.",
    emoji: "📿",
    accent: "#78350f",
    rakhiId: "rakhi-rudraksha-royal",
  },

  // ============ 🐘 GANPATI FESTIVAL SURPRISES & BAPPA PORTRAITS ============
  {
    id: "ganpati-lalbaugcha-raja",
    vibe: "ganpati",
    type: "festival",
    title: "Lalbaugcha Raja Portrait",
    character: "Ganesh Utsav Special 👑",
    quote: "Ganpati Bappa Morya! Mangal Murti Morya!",
    caption: "Lalbaugcha Raja - Navsacha Ganpati blessing your postcard.",
    emoji: "👑",
    accent: "#b91c1c",
    ganpatiImgId: "ganpati-lalbaugcha-raja",
  },
  {
    id: "ganpati-dagdusheth",
    vibe: "ganpati",
    type: "festival",
    title: "Dagdusheth Halwai Bappa",
    character: "Ganesh Utsav Special 🕉️",
    quote: "Sukh Karta Dukh Harta Varta Vighnachi... Bappa har vighna door karein!",
    caption: "Shrimant Dagdusheth Halwai Ganpati with golden aura & blessings.",
    emoji: "🕉️",
    accent: "#d97706",
    ganpatiImgId: "ganpati-dagdusheth",
  },
  {
    id: "ganpati-modak-priya",
    vibe: "ganpati",
    type: "festival",
    title: "Ukdiche Modak Bal Ganesha",
    character: "Ganesh Utsav Special 🥟",
    quote: "Bappa ke favourite Modak... aur aapke liye dher saara prem!",
    caption: "Sweet modak bhog & joyous festive spirit for your loved ones.",
    emoji: "🥟",
    accent: "#ea580c",
    ganpatiImgId: "ganpati-modak-priya",
  },
  {
    id: "ganpati-vighnaharta-gold",
    vibe: "ganpati",
    type: "festival",
    title: "Golden Vighnaharta Blessing",
    character: "Ganesh Utsav Special 🪔",
    quote: "Vighnaharta Bappa sabka kalyan karein aur sukh samriddhi de!",
    caption: "Golden Ganpati Bappa portrait with marigold garland frame.",
    emoji: "🪔",
    accent: "#b45309",
    ganpatiImgId: "ganpati-vighnaharta-gold",
  },

  // ============ 😂 JOLLY — Johnny Lever, Akshay Kumar, Javed Jaffrey ============
  {
    id: "jl-galti-hai",
    vibe: "jolly",
    type: "meme",
    title: "Yeh Bhi Meri Galti Hai",
    character: "Johnny Lever",
    movie: "Awara Paagal Deewana",
    quote: "Yeh bhi meri galti hai... yeh bhi meri galti hai!",
    caption: "Mana liya, ab khul ja surprise!",
    emoji: "😅",
    accent: "#c2410c",
    gif: createAuthoritativeGif(
      "jl-galti-hai-gif",
      "Yeh Bhi Meri Galti Hai",
      "Johnny Lever",
      "https://media1.tenor.com/m/Xp9ygs-aPf8AAAAC/yeh-bhi-meri-galti-hai-ye-bhi-meri-galti-hai.gif"
    ),
  },
  {
    id: "jl-amaza-ayega",
    vibe: "jolly",
    type: "dialogue",
    title: "Abhi Maza Aayega",
    character: "Johnny Lever",
    movie: "Phir Hera Pheri",
    quote: "Abhi maza aayega na bhidu... abhi toh shuru hua hai!",
    caption: "The suspense was worth it, bhidu.",
    emoji: "🤣",
    accent: "#d97706",
    gif: createAuthoritativeGif(
      "jl-amaza-ayega-gif",
      "Abhi Maza Aayega",
      "Johnny Lever",
      "https://media1.tenor.com/m/Go5_iSEZE94AAAAC/oh-yes-handsome.gif"
    ),
  },
  {
    id: "jl-chhota-chhatri",
    vibe: "jolly",
    type: "dialogue",
    title: "Ayee Chhota Chhatri",
    character: "Johnny Lever",
    movie: "Awara Paagal Deewana",
    quote: "Aye chhota chhatri! Kya kar raha hai tu idhar?",
    caption: "Surprise open karo, chhota chhatri!",
    emoji: "🎩",
    accent: "#b45309",
    gif: createAuthoritativeGif(
      "jl-chhota-chhatri-gif",
      "Ayee Chhota Chhatri",
      "Johnny Lever",
      "https://media1.tenor.com/m/W0yLl6SNJ0IAAAAC/dhamaal-javed-jaffrey.gif"
    ),
  },
  {
    id: "jl-thik-karke",
    vibe: "jolly",
    type: "dialogue",
    title: "Abhi Thik Karke Deta Hu",
    character: "Johnny Lever",
    movie: "Golmaal",
    quote: "Abhi thik karke deta hu... ekdum jaisa pehle tha!",
    caption: "Sending you a fix-it-up smile.",
    emoji: "🔧",
    accent: "#ca8a04",
    gif: createAuthoritativeGif(
      "jl-thik-karke-gif",
      "Abhi Thik Karke Deta Hu",
      "Johnny Lever",
      "https://media1.tenor.com/m/sL7BOhPbW2kAAAAC/dhamaal-javed-jaffrey.gif"
    ),
  },
  {
    id: "ak-link-dena",
    vibe: "jolly",
    type: "meme",
    title: "Ayee Link Dena",
    character: "Akshay Kumar",
    movie: "Phool Aur Kaante / Meme",
    quote: "Ayee link dena... abhi forward karta hu!",
    caption: "Yeh link, dil se bheja hai.",
    emoji: "🔗",
    accent: "#0891b2",
    gif: createAuthoritativeGif(
      "ak-link-dena-gif",
      "Ayee Link Dena",
      "Akshay Kumar",
      "https://media1.tenor.com/m/9B5-Q7H-DOIAAAAC/ayee-link-dena.gif"
    ),
  },
  {
    id: "ak-thanks-kambakht",
    vibe: "jolly",
    type: "dialogue",
    title: "Thanks, Kambakht",
    character: "Akshay Kumar",
    movie: "Kambakkht Ishq",
    quote: "Thanks... kambakht, tu hi toh hai mere paas.",
    caption: "Kambakht, thanks for being you.",
    emoji: "🙏",
    accent: "#be123c",
    gif: createAuthoritativeGif(
      "ak-thanks-kambakht-gif",
      "Thanks Kambakht",
      "Akshay Kumar",
      "https://media1.tenor.com/m/fS06Z3YA9AUAAAAC/best.gif"
    ),
  },
  {
    id: "ak-paisa-hi-paisa",
    vibe: "jolly",
    type: "meme",
    title: "Paisa Hi Paisa Hoga",
    character: "Akshay Kumar",
    movie: "Phir Hera Pheri",
    quote: "Paisa hi paisa hoga... par asli daawat toh pyaar hai!",
    caption: "Pyaar hi paisa hai, bhai.",
    emoji: "💸",
    accent: "#15803d",
    gif: createAuthoritativeGif(
      "ak-paisa-hi-paisa-gif",
      "Paisa Hi Paisa Hoga",
      "Akshay Kumar",
      "https://media1.tenor.com/m/EtTfjC9XfWwAAAAC/plan-what%27s-your-plan.gif"
    ),
  },
  {
    id: "ak-bhai-bhai-soyenge",
    vibe: "jolly",
    type: "moment",
    title: "Bhai Bhai Milke Soyenge",
    character: "Akshay Kumar & Salman Khan",
    movie: "Mujhse Shaadi Karogi",
    quote: "Kabhi tu yahaan so, kabhi main wahaaan... bhai bhai milke soyenge!",
    caption: "Apno ke beech, aaram se.",
    emoji: "🛌",
    accent: "#1d4ed8",
    gif: createAuthoritativeGif(
      "ak-bhai-bhai-soyenge-gif",
      "Bhai Bhai Milke Soyenge",
      "Akshay Kumar & Salman Khan",
      "https://media1.tenor.com/m/Xu1G4qmjXFUAAAAC/mujhse-shaadi-karogi-akshay-kumar-salman-khan.gif"
    ),
  },
  {
    id: "jj-udi-baba",
    vibe: "jolly",
    type: "meme",
    title: "Udi Baba Udi Baba",
    character: "Javed Jaffrey",
    movie: "Dhamaal",
    quote: "Chalti toh hai nahi... udi baba, udi baba!",
    caption: "Surprise udi baba, pakad lo!",
    emoji: "✈️",
    accent: "#0369a1",
    gif: createAuthoritativeGif(
      "jj-udi-baba-gif",
      "Udi Baba Udi Baba",
      "Javed Jaffrey",
      "https://media1.tenor.com/m/W0yLl6SNJ0IAAAAC/dhamaal-javed-jaffrey.gif"
    ),
  },
  {
    id: "jj-kitne-paise",
    vibe: "jolly",
    type: "dialogue",
    title: "Kitne Paise Huey",
    character: "Javed Jaffrey",
    movie: "Dhamaal",
    quote: "Uss hisaab se mere kitne paise huey?",
    caption: "Pyaar ka hisaab, full paisa vasool.",
    emoji: "🧮",
    accent: "#0f766e",
    gif: createAuthoritativeGif(
      "jj-kitne-paise-gif",
      "Kitne Paise Huey",
      "Javed Jaffrey",
      "https://media1.tenor.com/m/krkl6K_nlYEAAAAC/uss-hisaab-se-mere-kitne-paise-huey.gif"
    ),
  },

  // ============ 🔥 ACTION HERO — Salman Khan, Hrithik Roshan ============
  {
    id: "sk-commitment",
    vibe: "action",
    type: "dialogue",
    title: "Ek Baar Commitment",
    character: "Salman Khan",
    movie: "Wanted",
    quote: "Ek baar jo maine commitment kar di... uske baad apne aap ki bhi nahi sunta!",
    caption: "Commitment kar di — yeh postcard tere liye.",
    emoji: "💪",
    accent: "#1e293b",
    gif: createAuthoritativeGif(
      "sk-commitment-gif",
      "Ek Baar Commitment",
      "Salman Khan",
      "https://media1.tenor.com/m/a9HGWqT_IqgAAAAC/ek-baar-jo-maine-commitment-kardi-uske-baad-apne-aap-kibhi-nahi-sunta.gif"
    ),
  },
  {
    id: "sk-oh-yes-handsome",
    vibe: "action",
    type: "moment",
    title: "Oh Yes, Handsome!",
    character: "Salman Khan",
    movie: "Partner",
    quote: "Oh yes... handsome, ready ho ja surprise ke liye!",
    caption: "Handsome entry, handsome surprise.",
    emoji: "😎",
    accent: "#334155",
    gif: createAuthoritativeGif(
      "sk-oh-yes-handsome-gif",
      "Oh Yes Handsome",
      "Salman Khan",
      "https://media1.tenor.com/m/Go5_iSEZE94AAAAC/oh-yes-handsome.gif"
    ),
  },
  {
    id: "sk-salman-entry",
    vibe: "action",
    type: "moment",
    title: "Bhai Ki Entry",
    character: "Salman Khan",
    movie: "Dabangg",
    quote: "Bhai aagaye... ab aur kya chahiye?",
    caption: "Bhai ka pyaar, tere liye.",
    emoji: "🕶️",
    accent: "#0c4a6e",
    gif: createAuthoritativeGif(
      "sk-salman-entry-gif",
      "Bhai Ki Entry",
      "Salman Khan",
      "https://media1.tenor.com/m/eF2UdKIr1RIAAAAC/salman-khan.gif"
    ),
  },
  {
    id: "sk-dabangg-love",
    vibe: "action",
    type: "moment",
    title: "Dabangg Love",
    character: "Salman Khan",
    movie: "Dabangg",
    quote: "Cool glasses, cool kulfy... aur tere liye cool postcard!",
    caption: "Dabangg style mein, yaad bheji.",
    emoji: "🦸",
    accent: "#7f1d1d",
    gif: createAuthoritativeGif(
      "sk-dabangg-love-gif",
      "Dabangg Love",
      "Salman Khan",
      "https://media1.tenor.com/m/TMCOvn3z8XEAAAAC/salman-khan-love.gif"
    ),
  },
  {
    id: "hr-war-entry",
    vibe: "action",
    type: "moment",
    title: "War Swag Entry",
    character: "Hrithik Roshan",
    movie: "War",
    quote: "Entry ho gayi... hotness alert, surprise bhi aagaya!",
    caption: "Style se khula surprise.",
    emoji: "🔥",
    accent: "#b91c1c",
    gif: createAuthoritativeGif(
      "hr-war-entry-gif",
      "War Swag Entry",
      "Hrithik Roshan",
      "https://media1.tenor.com/m/5tzDrVpwtYAAAAAC/war-hrithik-roshan.gif"
    ),
  },
  {
    id: "hr-plan-kya",
    vibe: "action",
    type: "dialogue",
    title: "Plan Kya Hai?",
    character: "Hrithik Roshan",
    movie: "Bang Bang",
    quote: "Plan kya hai tumhara? Postcard khol aur dekh!",
    caption: "Plan: surprise khul gaya.",
    emoji: "📋",
    accent: "#1e40af",
    gif: createAuthoritativeGif(
      "hr-plan-kya-gif",
      "Plan Kya Hai?",
      "Hrithik Roshan",
      "https://media1.tenor.com/m/EtTfjC9XfWwAAAAC/plan-what%27s-your-plan.gif"
    ),
  },

  // ============ ❤️ ROMANTIC — Shah Rukh Khan, Ranbir Kapoor, Emraan Hashmi ============
  {
    id: "srk-tujhe-dekha",
    vibe: "romantic",
    type: "dialogue",
    title: "Tujhe Dekha Toh Yeh Jaana",
    character: "Shah Rukh Khan",
    movie: "Dilwale Dulhania Le Jayenge",
    quote: "Tujhe dekha toh yeh jaana sanam... pyaar hota hai deewana sanam!",
    caption: "Classic DDLJ romantic magic for your special one.",
    emoji: "🌹",
    accent: "#be123c",
    gif: createAuthoritativeGif(
      "srk-tujhe-dekha-gif",
      "Tujhe Dekha Toh Yeh Jaana",
      "Shah Rukh Khan",
      "https://media1.tenor.com/m/fS06Z3YA9AUAAAAC/best.gif"
    ),
  },
  {
    id: "srk-kuch-kuch-hota-hai",
    vibe: "romantic",
    type: "dialogue",
    title: "Kuch Kuch Hota Hai",
    character: "Shah Rukh Khan",
    movie: "Kuch Kuch Hota Hai",
    quote: "Kuch kuch hota hai... tum nahi samjhogi!",
    caption: "Nostalgic Rahul romance for your best friend or partner.",
    emoji: "💖",
    accent: "#9f1239",
    gif: createAuthoritativeGif(
      "srk-kuch-kuch-gif",
      "Kuch Kuch Hota Hai",
      "Shah Rukh Khan",
      "https://media1.tenor.com/m/zLl_lAvcVmMAAAAC/tu-jhoothi-main-makkaar-ranbir-kapoor.gif"
    ),
  },
  {
    id: "srk-palat",
    vibe: "romantic",
    type: "moment",
    title: "Palat... Palat!",
    character: "Shah Rukh Khan",
    movie: "Dilwale Dulhania Le Jayenge",
    quote: "Agar yeh tujhe pyaar karti hai toh yeh paltegi... Palat... Palat!",
    caption: "The iconic DDLJ romantic suspense moment.",
    emoji: "👑",
    accent: "#881337",
    gif: createAuthoritativeGif(
      "srk-palat-gif",
      "Palat Palat",
      "Shah Rukh Khan",
      "https://media1.tenor.com/m/Ttzb3gvSwgUAAAAC/ranbir-kapoor-ae-dil-hai-mushkil.gif"
    ),
  },
  {
    id: "rk-ae-dil-mushkil",
    vibe: "romantic",
    type: "dialogue",
    title: "Ae Dil Hai Mushkil",
    character: "Ranbir Kapoor",
    movie: "Ae Dil Hai Mushkil",
    quote: "Ae dil hai mushkil... par tujhe bhejna asaan hai.",
    caption: "Mushkil se asaan tak, tere liye.",
    emoji: "💔",
    accent: "#9f1239",
    gif: createAuthoritativeGif(
      "rk-ae-dil-mushkil-gif",
      "Ae Dil Hai Mushkil",
      "Ranbir Kapoor",
      "https://media1.tenor.com/m/Ttzb3gvSwgUAAAAC/ranbir-kapoor-ae-dil-hai-mushkil.gif"
    ),
  },
  {
    id: "rk-brahmastra",
    vibe: "romantic",
    type: "moment",
    title: "Brahmastra Astra of Love",
    character: "Ranbir Kapoor",
    movie: "Brahmastra",
    quote: "Astra toh bahut hain... par pyaar ka sabse powerful!",
    caption: "Pyaar ka astra, tere liye.",
    emoji: "✨",
    accent: "#6d28d9",
    gif: createAuthoritativeGif(
      "rk-brahmastra-gif",
      "Brahmastra Astra of Love",
      "Ranbir Kapoor",
      "https://media1.tenor.com/m/w-WHGAe_CbQAAAAC/brahmastra-brahmastra-trailer.gif"
    ),
  },
  {
    id: "rk-tu-jhoothi-makkaar",
    vibe: "romantic",
    type: "dialogue",
    title: "Tu Jhoothi Main Makkaar",
    character: "Ranbir Kapoor",
    movie: "Tu Jhoothi Main Makkaar",
    quote: "Tu jhoothi, main makkaar... par yeh postcard sach hai!",
    caption: "Sachi yaad, jhoothi confidence nahi.",
    emoji: "💘",
    accent: "#be185d",
    gif: createAuthoritativeGif(
      "rk-tu-jhoothi-makkaar-gif",
      "Tu Jhoothi Main Makkaar",
      "Ranbir Kapoor",
      "https://media1.tenor.com/m/zLl_lAvcVmMAAAAC/tu-jhoothi-main-makkaar-ranbir-kapoor.gif"
    ),
  },
  {
    id: "eh-aashiq-banaya",
    vibe: "romantic",
    type: "moment",
    title: "Aashiq Banaya Aapne",
    character: "Emraan Hashmi",
    movie: "Aashiq Banaya Aapne",
    quote: "Aashiq banaya aapne... har pal har ghadi.",
    caption: "Nostalgic romantic magic.",
    emoji: "💓",
    accent: "#991b1b",
    gif: createAuthoritativeGif(
      "eh-aashiq-banaya-gif",
      "Aashiq Banaya Aapne",
      "Emraan Hashmi",
      "https://media1.tenor.com/m/oMqP97rq7bQAAAAC/emraan-hashmi-aashiq-banaya-aapne.gif"
    ),
  },
  {
    id: "eh-once-upon-mumbai",
    vibe: "romantic",
    type: "moment",
    title: "Once Upon A Time In Mumbai",
    character: "Emraan Hashmi",
    movie: "Once Upon A Time In Mumbai",
    quote: "Once upon a time... ek postcard, ek yaad, ek tu.",
    caption: "Puraani Mumbai, nayi yaad.",
    emoji: "🏙️",
    accent: "#92400e",
    gif: createAuthoritativeGif(
      "eh-once-upon-mumbai-gif",
      "Once Upon A Time In Mumbai",
      "Emraan Hashmi & Prachi Desai",
      "https://media1.tenor.com/m/aPo6SuBiA_cAAAAC/bollywood-once-upon-a-time-in-mumbai.gif"
    ),
  },
  {
    id: "song-tu-hi-meri-shab",
    vibe: "romantic",
    type: "song",
    title: "Tu Hi Meri Shab Hai",
    character: "Emraan Hashmi",
    movie: "Gangster",
    quote: "Tu hi meri shab hai... tu hi mera sab hai.",
    caption: "Meri shab, mera sab.",
    emoji: "🌌",
    songTitle: "Tu Hi Meri Shab Hai",
    songArtist: "Gangster — Emraan Hashmi",
    accent: "#4c1d95",
    gif: createAuthoritativeGif(
      "song-tu-hi-meri-shab-gif",
      "Tu Hi Meri Shab Hai",
      "Emraan Hashmi",
      "https://media1.tenor.com/m/oMqP97rq7bQAAAAC/emraan-hashmi-aashiq-banaya-aapne.gif"
    ),
  },

  // ============ ✨ CLASSIC ============
  {
    id: "cl-timeless",
    vibe: "classic",
    type: "dialogue",
    title: "Puraani Yaad",
    character: "A Nostalgic Memory",
    quote: "Kuch baatein, kuch lamhe... waqt ke saath, dil ke paas.",
    caption: "Waqt gaya, yaad reh gayi.",
    emoji: "🕰️",
    accent: "#78716c",
    gif: createAuthoritativeGif(
      "cl-timeless-gif",
      "Puraani Yaad",
      "A Nostalgic Memory",
      "https://media1.tenor.com/m/fS06Z3YA9AUAAAAC/best.gif"
    ),
  },
  {
    id: "cl-letter",
    vibe: "classic",
    type: "dialogue",
    title: "Chitthi",
    character: "A Nostalgic Memory",
    quote: "Chitthi aayi hai... dil se likhi, dil tak pohochi.",
    caption: "Chitthi, tere naam.",
    emoji: "✉️",
    accent: "#a16207",
    gif: createAuthoritativeGif(
      "cl-letter-gif",
      "Chitthi",
      "A Nostalgic Memory",
      "https://media1.tenor.com/m/9B5-Q7H-DOIAAAAC/ayee-link-dena.gif"
    ),
  },

  // ============ 🪡 RAKHI FESTIVAL SURPRISES ============
  {
    id: "rakhi-gold-om-surprise",
    vibe: "rakhi",
    type: "festival",
    title: "Golden Om Rakhi 🕉️",
    character: "Raksha Bandhan Special",
    quote: "Bhai-Behan ka sacred pyaara dhaaga.",
    caption: "Rakhi tied with love & blessings.",
    emoji: "🪡",
    accent: "#d97706",
    rakhiId: "rakhi-gold-om",
  },
  {
    id: "rakhi-mor-pankh-peacock-surprise",
    vibe: "rakhi",
    type: "festival",
    title: "Mor Pankh Peacock Rakhi 🦚",
    character: "Raksha Bandhan Special",
    quote: "May our bond stay colorful forever!",
    caption: "Peacock feather thread of love.",
    emoji: "🦚",
    accent: "#0284c7",
    rakhiId: "rakhi-mor-pankh",
  },
  {
    id: "rakhi-swastik-red-surprise",
    vibe: "rakhi",
    type: "festival",
    title: "Resham Swastik Rakhi 卐",
    character: "Raksha Bandhan Special",
    quote: "Auspicious red silk for your happiness.",
    caption: "Crimson silk Mauli thread.",
    emoji: "🌸",
    accent: "#b91c1c",
    rakhiId: "rakhi-swastik-red",
  },
  {
    id: "rakhi-rudraksha-royal-surprise",
    vibe: "rakhi",
    type: "festival",
    title: "Rudraksha Royal Rakhi 📿",
    character: "Raksha Bandhan Special",
    quote: "Protective Rudraksha for my dearest brother.",
    caption: "Sacred Rudraksha bead thread.",
    emoji: "📿",
    accent: "#78350f",
    rakhiId: "rakhi-rudraksha-royal",
  },

  // ============ 🐘 GANPATI FESTIVAL SURPRISES ============
  {
    id: "ganpati-blessings-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Bappa's Blessings",
    character: "Ganesh Utsav Special",
    quote: "Sweet modaks, divine blessings and happiness always.",
    caption: "Sweet modaks, divine blessings and happiness always. Ganpati Bappa Morya!",
    emoji: "🕉️",
    accent: "#b91c1c",
    ganpatiImgId: "ganpati-blessings-card",
  },
  {
    id: "ganpati-mangalmay-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "सर्व मंगलमय होवो",
    character: "Ganesh Utsav Special",
    quote: "बाप्पाच्या चरणी सर्व मंगलमय होवो",
    caption: "गोड मोदक, शुभेच्छा आणि बाप्पाचा आशीर्वाद तुमच्यासाठी.",
    emoji: "🌺",
    accent: "#9a3412",
    ganpatiImgId: "ganpati-mangalmay-card",
  },
  {
    id: "ganpati-modak-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Modak & Blessings",
    character: "Ganesh Utsav Special",
    quote: "Sweet modaks and Bappa's blessings",
    caption: "Sweet modaks and Bappa's blessings",
    emoji: "🥟",
    accent: "#ea580c",
    ganpatiImgId: "ganpati-modak-card",
  },
  {
    id: "ganpati-durva-grass-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Durva Grass",
    character: "Ganesh Utsav Special",
    quote: "Symbol of purity and new beginnings",
    caption: "Symbol of purity and new beginnings, removing negativity and clearing the path ahead.",
    emoji: "🌿",
    accent: "#15803d",
    ganpatiImgId: "ganpati-durva-grass-card",
  },
  {
    id: "ganpati-flowers-devotion-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Flowers & Devotion",
    character: "Ganesh Utsav Special",
    quote: "Offer your prayers with love and sincerity",
    caption: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
    emoji: "🌸",
    accent: "#be185d",
    ganpatiImgId: "ganpati-flowers-devotion-card",
  },
  {
    id: "ganpati-offer-devotion-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Offer with Devotion",
    character: "Ganesh Utsav Special",
    quote: "Pure flowers, pure heart, pure intentions.",
    caption: "Pure flowers, pure heart, pure intentions.",
    emoji: "✨",
    accent: "#d97706",
    ganpatiImgId: "ganpati-offer-devotion-card",
  },
  {
    id: "ganpati-bananas-jaggery-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Bananas & Jaggery",
    character: "Ganesh Utsav Special",
    quote: "Bring sweetness and positivity into life, fostering harmony.",
    caption: "Bring sweetness and positivity into life, fostering harmony in relationships.",
    emoji: "🍌",
    accent: "#b45309",
    ganpatiImgId: "ganpati-bananas-jaggery-card",
  },
  // Backward compatibility alias surprise IDs
  {
    id: "ganpati-devotion-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Offer with Devotion",
    character: "Ganesh Utsav Special",
    quote: "Pure flowers, pure heart, pure intentions.",
    caption: "Pure flowers, pure heart, pure intentions.",
    emoji: "✨",
    accent: "#d97706",
    ganpatiImgId: "ganpati-offer-devotion-card",
  },
  {
    id: "ganpati-flowers-leaves-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Flowers & Devotion",
    character: "Ganesh Utsav Special",
    quote: "Offer your prayers with love and sincerity",
    caption: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
    emoji: "🌸",
    accent: "#be185d",
    ganpatiImgId: "ganpati-flowers-devotion-card",
  },
  {
    id: "ganpati-blessing-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Bappa's Blessings",
    character: "Ganesh Utsav Special",
    quote: "Sweet modaks, divine blessings and happiness always.",
    caption: "Sweet modaks, divine blessings and happiness always.",
    emoji: "🕉️",
    accent: "#b91c1c",
    ganpatiImgId: "ganpati-blessings-card",
  },
  {
    id: "ganpati-aarti-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Flowers & Devotion",
    character: "Ganesh Utsav Special",
    quote: "Offer your prayers with love and sincerity",
    caption: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
    emoji: "🌸",
    accent: "#be185d",
    ganpatiImgId: "ganpati-flowers-devotion-card",
  },
  {
    id: "ganpati-prosperity-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Bananas & Jaggery",
    character: "Ganesh Utsav Special",
    quote: "Bring sweetness and positivity into life, fostering harmony.",
    caption: "Bring sweetness and positivity into life, fostering harmony in relationships.",
    emoji: "🍌",
    accent: "#b45309",
    ganpatiImgId: "ganpati-bananas-jaggery-card",
  },
  {
    id: "ganpati-lalbaugcha-raja-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Bappa's Blessings",
    character: "Ganesh Utsav Special",
    quote: "Sweet modaks, divine blessings and happiness always.",
    caption: "Sweet modaks, divine blessings and happiness always.",
    emoji: "🕉️",
    accent: "#b91c1c",
    ganpatiImgId: "ganpati-blessings-card",
  },
  {
    id: "ganpati-dagdusheth-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Durva Grass",
    character: "Ganesh Utsav Special",
    quote: "Symbol of purity and new beginnings",
    caption: "Symbol of purity and new beginnings, removing negativity and clearing the path ahead.",
    emoji: "🌿",
    accent: "#15803d",
    ganpatiImgId: "ganpati-durva-grass-card",
  },
  {
    id: "ganpati-modak-priya-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Modak & Blessings",
    character: "Ganesh Utsav Special",
    quote: "Sweet modaks and Bappa's blessings",
    caption: "Sweet modaks and Bappa's blessings",
    emoji: "🥟",
    accent: "#ea580c",
    ganpatiImgId: "ganpati-modak-card",
  },
  {
    id: "ganpati-vighnaharta-gold-surprise",
    vibe: "ganpati",
    type: "festival",
    title: "Flowers & Devotion",
    character: "Ganesh Utsav Special",
    quote: "Offer your prayers with love and sincerity",
    caption: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
    emoji: "🌸",
    accent: "#be185d",
    ganpatiImgId: "ganpati-flowers-devotion-card",
  },
];

export const SURPRISES: Surprise[] = SURPRISES_RAW.map((s) => ({
  ...s,
  gifUrl: s.gif?.mediaUrl || s.gifUrl,
}));

export function getSurprisesForVibe(vibe: Vibe): Surprise[] {
  if (vibe === "classic") {
    const pool = [
      "jl-galti-hai",
      "ak-link-dena",
      "sk-commitment",
      "hr-war-entry",
      "rk-ae-dil-mushkil",
      "song-tu-hi-meri-shab",
      "cl-timeless",
      "cl-letter",
    ];
    return SURPRISES.filter((s) => pool.includes(s.id));
  }
  return SURPRISES.filter((s) => s.vibe === vibe);
}

export function getSurprisesForTheme(themeId?: string | null, vibe?: Vibe | null): Surprise[] {
  if (themeId === "rakhi") {
    return SURPRISES.filter((s) => s.vibe === "rakhi");
  }
  if (themeId === "ganpati") {
    return SURPRISES.filter((s) => s.vibe === "ganpati");
  }
  return getSurprisesForVibe(vibe || "classic");
}

export function getSurpriseById(id?: string | null): Surprise | undefined {
  if (!id || id === "none") return undefined;
  const s = SURPRISES.find((item) => item.id === id || item.rakhiId === id || item.ganpatiImgId === id);
  if (!s) return undefined;
  if (!s.gif && s.gifUrl) {
    s.gif = createAuthoritativeGif(s.id, s.title, s.character, s.gifUrl);
  }
  return s;
}

export function getVibeMeta(vibe: Vibe): VibeMeta {
  return VIBES.find((v) => v.id === vibe) ?? VIBES[3];
}

export interface CharacterMeta {
  name: string;
  avatar: string;
  count: number;
}

export function getCharactersForVibe(vibe: Vibe): CharacterMeta[] {
  if (vibe === "classic" || vibe === "rakhi" || vibe === "ganpati") return [];
  const surprisesInVibe = SURPRISES.filter((s) => s.vibe === vibe);
  const charMap = new Map<string, CharacterMeta>();

  for (const s of surprisesInVibe) {
    if (!s.character || s.character.includes("Special") || s.character.includes("Virtual Rakhi")) continue;
    const existing = charMap.get(s.character);
    if (existing) {
      existing.count += 1;
    } else {
      charMap.set(s.character, {
        name: s.character,
        avatar: s.emoji || "✨",
        count: 1,
      });
    }
  }

  return Array.from(charMap.values());
}

export function getSurprisesForCharacter(vibe: Vibe, characterName: string): Surprise[] {
  return SURPRISES.filter((s) => s.vibe === vibe && s.character === characterName);
}

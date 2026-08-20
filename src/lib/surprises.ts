// Curated Bollywood surprises — memes, dialogues, songs & iconic moments
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
  // ============ 🪡 RAKHI FESTIVAL SURPRISES ============
  {
    id: "rakhi-dhaaga",
    vibe: "rakhi",
    type: "festival",
    title: "Pyar Ka Dhaaga",
    character: "Raksha Bandhan Special",
    quote: "Phoolon ka taron ka sabka kehna hai, ek hazaron mein meri behen/bhai hai!",
    caption: "Resham ka dhaaga, umr bhar ka vaada.",
    emoji: "🪡",
    accent: "#b91c1c",
    gif: createAuthoritativeGif(
      "rakhi-dhaaga-gif",
      "Pyar Ka Dhaaga",
      "Raksha Bandhan Special",
      "https://media1.tenor.com/m/fS06Z3YA9AUAAAAC/best.gif"
    ),
  },
  {
    id: "rakhi-gift-de",
    vibe: "rakhi",
    type: "festival",
    title: "Mera Gift Kahan Hai?",
    character: "Rakhi Special",
    quote: "Pehle mera gift nikal... uske baad hi aarti utarungii!",
    caption: "No gift, no Rakhi logic!",
    emoji: "🎁",
    accent: "#d97706",
    gif: createAuthoritativeGif(
      "rakhi-gift-gif",
      "Mera Gift Kahan Hai?",
      "Rakhi Special",
      "https://media1.tenor.com/m/9B5-Q7H-DOIAAAAC/ayee-link-dena.gif"
    ),
  },
  {
    id: "rakhi-bhai-love",
    vibe: "rakhi",
    type: "festival",
    title: "Bhai Ho Toh Aisa",
    character: "Rakhi Special",
    quote: "Jitna bhi lado, musibat mein sabse pehle bhai hi khada hota hai.",
    caption: "Humesha saath nibhane ka vaada.",
    emoji: "💖",
    accent: "#991b1b",
    gif: createAuthoritativeGif(
      "rakhi-bhai-gif",
      "Bhai Ho Toh Aisa",
      "Rakhi Special",
      "https://media1.tenor.com/m/ClSbgu9gcccAAAAC/holding-hands-namaste.gif"
    ),
  },

  // ============ 🐘 GANPATI FESTIVAL SURPRISES ============
  {
    id: "ganpati-bappa-morya",
    vibe: "ganpati",
    type: "festival",
    title: "Ganpati Bappa Morya",
    character: "Ganesh Utsav Special",
    quote: "Ganpati Bappa Morya! Mangal Murti Morya!",
    caption: "Bappa aaye hain sabki dukh door karne.",
    emoji: "🐘",
    accent: "#9a3412",
    gif: createAuthoritativeGif(
      "ganpati-bappa-gif",
      "Ganpati Bappa Morya",
      "Ganesh Utsav Special",
      "https://media1.tenor.com/m/Go5_iSEZE94AAAAC/oh-yes-handsome.gif"
    ),
  },
  {
    id: "ganpati-modak",
    vibe: "ganpati",
    type: "festival",
    title: "Ukdiche Modak",
    character: "Ganesh Utsav Special",
    quote: "Bappa ke favourite Modak... aur aapke liye dher saara prem!",
    caption: "Mithaas aur aashirwaad saath mein.",
    emoji: "🥟",
    accent: "#c2410c",
    gif: createAuthoritativeGif(
      "ganpati-modak-gif",
      "Ukdiche Modak",
      "Ganesh Utsav Special",
      "https://media1.tenor.com/m/KGr0nFnSjHoAAAAC/ranbir-kapoor-excited.gif"
    ),
  },
  {
    id: "ganpati-aarti",
    vibe: "ganpati",
    type: "festival",
    title: "Aarti & Blessings",
    character: "Ganesh Utsav Special",
    quote: "Sukh Karta Dukh Harta Varta Vighnachi... Bappa har vighna door karein!",
    caption: "Aarti ki stuti, ghar mein sukh samriddhi.",
    emoji: "🪔",
    accent: "#b45309",
    gif: createAuthoritativeGif(
      "ganpati-aarti-gif",
      "Aarti & Blessings",
      "Ganesh Utsav Special",
      "https://media1.tenor.com/m/ClSbgu9gcccAAAAC/holding-hands-namaste.gif"
    ),
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

  // ============ ❤️ ROMANTIC — Ranbir Kapoor, Emraan Hashmi ============
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
    character: "Ranbir Kapoor & Alia Bhatt",
    movie: "Brahmastra",
    quote: "Astra toh bahut hain... par pyaar ka sabse powerful!",
    caption: "Pyaar ka astra, tere liye.",
    emoji: "✨",
    accent: "#6d28d9",
    gif: createAuthoritativeGif(
      "rk-brahmastra-gif",
      "Brahmastra Astra of Love",
      "Ranbir Kapoor & Alia Bhatt",
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
    character: "Emraan Hashmi & Prachi Desai",
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

export function getSurpriseById(id: string): Surprise | undefined {
  const s = SURPRISES.find((item) => item.id === id);
  if (!s) return undefined;
  if (!s.gif && s.gifUrl) {
    s.gif = createAuthoritativeGif(s.id, s.title, s.character, s.gifUrl);
  }
  return s;
}

export function getVibeMeta(vibe: Vibe): VibeMeta {
  return VIBES.find((v) => v.id === vibe) ?? VIBES[3];
}

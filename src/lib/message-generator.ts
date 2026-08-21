export type SupportedLanguage = "auto" | "hi" | "mr" | "te" | "hinglish";

export interface MessageGenerationContext {
  themeId?: string | null;
  vibe?: string | null;
  receiverName?: string;
  senderName?: string;
  city?: string;
  relationship?: string;
  surpriseId?: string | null;
  language?: SupportedLanguage;
}

// 🚩 MARATHI PROMPTS
const MARATHI_GANPATI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}गणपती बाप्पाच्या आगमनाने तुमच्या आयुष्यात सुख, समृद्धी आणि समाधान लाभो! मोदकांचा गोडवा आणि बाप्पाचा आशीर्वाद सदैव सोबत राहो. गणपती बाप्पा मोरया!`,
  (ctx: MessageGenerationContext) =>
    `बाप्पाच्या चरणी प्रार्थना आहे की तुमच्या आयुष्यातील सर्व संकटे दूर होवोत. गणेश चतुर्थीच्या हार्दिक शुभेच्छा!${ctx.senderName ? ` — ${ctx.senderName}` : ""}`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}बाप्पाची कृपा तुमच्यावर आणि तुमच्या कुटुंबावर कायम राहो. मंगलमूर्ती मोरया!`,
];

const MARATHI_RAKHI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `रेशमाचा धागा, भावा-बहिणीचे अतुट प्रेम! रक्षाबंधन निमित्त मनापासून खूप खूप शुभेच्छा${ctx.receiverName ? `, ${ctx.receiverName}` : ""}!`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}कितीही मोठे झालो तरी लहानपणीच्या आठवणी आणि तुझे प्रेम कायम माझ्या मनात राहील. हॅप्पी रक्षाबंधन!`,
];

const MARATHI_CLASSIC_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `प्रिय ${ctx.receiverName}, ` : ""}तू कितीही लांब असलीस/असलास तरी आठवणी नेहमीच जवळ असतात. हे छोटंसं पोस्टकार्ड तुझ्यासाठी!`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}जुन्या दिवसांची आठवण झाली की तुझा चेहरा समोर येतो. नेहमी हसत राहा!`,
];

// 🇮🇳 HINDI PROMPTS
const HINDI_GANPATI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `प्रिय ${ctx.receiverName}, ` : ""}गणपति बाप्पा का आशीर्वाद आपके जीवन में सुख, शांति और समृद्धि लाए। मोदक की मिठास और बाप्पा की कृपा आप पर सदा बनी रहे। गणेश चतुर्थी की हार्दिक शुभकामनाएं!`,
  (ctx: MessageGenerationContext) =>
    `विघ्नहर्ता आपके जीवन के सारे कष्ट दूर करें और खुशियों से आपका घर भर दें। गणपति बाप्पा मोरया!${ctx.senderName ? ` — ${ctx.senderName}` : ""}`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}बाप्पा की भक्ति और प्यार से भरा यह पोस्टकार्ड आपके लिए। हमेशा मुस्कुराते रहिए!`,
];

const HINDI_RAKHI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `कच्चे धागों से बना यह रक्षाबंधन का रिश्ता हमेशा अटूट रहे। राखी की ढेरों शुभकामनाएं${ctx.receiverName ? `, ${ctx.receiverName}` : ""}!`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}बचपन की वो खट्टी-मिट्ठी यादें और तेरा प्यार ही मेरी सबसे बड़ी ताकत है। Happy Raksha Bandhan!`,
];

const HINDI_CLASSIC_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `प्यारे ${ctx.receiverName}, ` : ""}तू चाहे जितना दूर हो, दिल के बहुत करीब है। यह छोटा सा पोस्टकार्ड मेरी पुरानी यादों का तोहफा है!`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}पुराने दिनों की वो चाय की चुस्कियां और तेरी बातें... आज बहुत याद आ रही हो/रहे हो!`,
];

// 🌺 TELUGU PROMPTS
const TELUGU_GANPATI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `ప్రియమైన ${ctx.receiverName}, ` : ""}వినాయక చవితి శుభాకాంక్షలు! గణపతి బప్పా అనుగ్రహంతో మీ జీవితంలో సుఖసంతోషాలు, విజయం మరియు ఆరోగ్యం ఎల్లప్పుడూ నిండాలని కోరుకుంటున్నాను. గణపతి బప్పా మోరియా!`,
  (ctx: MessageGenerationContext) =>
    `విఘ్నహర్త వినాయకుడు మీ కష్టాలన్నీ తొలిగించి, శుభాలను ప్రసాదించాలి. హృదయపూర్వక గణేష్ చతుర్థి శుభాకాంక్షలు!${ctx.senderName ? ` — ${ctx.senderName}` : ""}`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}గణపతి దేవుని దివ్య ఆశీస్సులు మీపై మరియు మీ కుటుంబంపై ఎల్లప్పుడూ ఉండాలని కోరుకుంటూ...`,
];

const TELUGU_RAKHI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `రాఖీ పండుగ శుభాకాంక్షలు${ctx.receiverName ? `, ${ctx.receiverName}` : ""}! ఈ పవిత్రమైన రాఖీ దారం మన అనుబంధాన్ని ఎప్పటికీ పదిలంగా ఉంచుతుంది!`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}ఎంత దూరంలో ఉన్నా మన చిన్ననాటి జ్ఞాపకాలు మరియు ప్రేమ ఎప్పటికీ మారవు. Happy Raksha Bandhan!`,
];

const TELUGU_CLASSIC_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `ప్రియమైన ${ctx.receiverName}, ` : ""}నువ్వు ఎంత దూరంలో ఉన్నా మన స్నేహం మరియు జ్ఞాపకాలు ఎప్పటికీ ప్రత్యేకమైనవే! ఈ చిన్న పోస్ట్‌కార్డ్ నీ కోసం...`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}పాత జ్ఞాపకాలను గుర్తుచేసుకుంటూ నీకు ప్రేమతో పంపుతున్న పోస్ట్‌కార్డ్. ఎల్లప్పుడూ సంతోషంగా ఉండు!`,
];

// ✉️ HINGLISH PROMPTS
const HINGLISH_GANPATI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `Dear ${ctx.receiverName}, ` : ""}Ganpati Bappa's divine presence brings so much warmth and peace into our lives. May your home be blessed with endless modaks, good health, and happiness always. Bappa Morya!`,
  (ctx: MessageGenerationContext) =>
    `Sending you heartfelt prayers and Bappa's divine blessings today${ctx.receiverName ? `, ${ctx.receiverName}` : ""}. May Vighnaharta remove all worries and fill your days with pure joy!`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}Bappa's blessings are always guiding you. Wishing you sweet modaks, bright smiles, and positive energy this Ganeshotsav!`,
];

const HINGLISH_RAKHI_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}yaad hai bachpan mein har choti cheez par ladna? Distance might separate us today, but this thread of Rakhi ties our hearts forever!`,
  (ctx: MessageGenerationContext) =>
    `Dear ${ctx.receiverName || "sibling"}, no matter how far we live, you will always be my favorite person to annoy and protect. Happy Raksha Bandhan!`,
];

const HINGLISH_CLASSIC_PROMPTS = [
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `Pyaare ${ctx.receiverName}, ` : ""}tu chaahe jitna door ho, dil ke bilkul paas hai. Just like a timeless 90s Bollywood classic, some bonds only get richer with time.`,
  (ctx: MessageGenerationContext) =>
    `${ctx.receiverName ? `${ctx.receiverName}, ` : ""}jab bhi kisi purane gaane ki dhun bajti hai, tera chehra yaad aata hai. Distance is just a test of how far love can travel!`,
];

let lastGeneratedIndex: Record<string, number> = {};

export function generateInspirationalMessage(ctx: MessageGenerationContext): string {
  const themeId = ctx.themeId || "classic";
  const lang = ctx.language || "auto";

  let pool: Array<(ctx: MessageGenerationContext) => string> = [];

  // Direct language routing
  if (lang === "mr") {
    if (themeId === "ganpati") pool = MARATHI_GANPATI_PROMPTS;
    else if (themeId === "rakhi") pool = MARATHI_RAKHI_PROMPTS;
    else pool = MARATHI_CLASSIC_PROMPTS;
  } else if (lang === "hi") {
    if (themeId === "ganpati") pool = HINDI_GANPATI_PROMPTS;
    else if (themeId === "rakhi") pool = HINDI_RAKHI_PROMPTS;
    else pool = HINDI_CLASSIC_PROMPTS;
  } else if (lang === "te") {
    if (themeId === "ganpati") pool = TELUGU_GANPATI_PROMPTS;
    else if (themeId === "rakhi") pool = TELUGU_RAKHI_PROMPTS;
    else pool = TELUGU_CLASSIC_PROMPTS;
  } else if (lang === "hinglish") {
    if (themeId === "ganpati") pool = HINGLISH_GANPATI_PROMPTS;
    else if (themeId === "rakhi") pool = HINGLISH_RAKHI_PROMPTS;
    else pool = HINGLISH_CLASSIC_PROMPTS;
  } else {
    // Auto / Mixed mode based on themeId
    if (themeId === "ganpati") {
      pool = [...MARATHI_GANPATI_PROMPTS, ...HINDI_GANPATI_PROMPTS, ...TELUGU_GANPATI_PROMPTS, ...HINGLISH_GANPATI_PROMPTS];
    } else if (themeId === "rakhi") {
      pool = [...MARATHI_RAKHI_PROMPTS, ...HINDI_RAKHI_PROMPTS, ...TELUGU_RAKHI_PROMPTS, ...HINGLISH_RAKHI_PROMPTS];
    } else {
      pool = [...MARATHI_CLASSIC_PROMPTS, ...HINDI_CLASSIC_PROMPTS, ...TELUGU_CLASSIC_PROMPTS, ...HINGLISH_CLASSIC_PROMPTS];
    }
  }

  const key = `${themeId}_${lang}_${ctx.vibe || ""}`;
  let lastIdx = lastGeneratedIndex[key] ?? -1;
  let nextIdx = Math.floor(Math.random() * pool.length);
  if (pool.length > 1 && nextIdx === lastIdx) {
    nextIdx = (nextIdx + 1) % pool.length;
  }
  lastGeneratedIndex[key] = nextIdx;

  return pool[nextIdx](ctx);
}

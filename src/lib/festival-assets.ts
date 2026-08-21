export interface VirtualRakhi {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  threadColor: string;
  beadColor: string;
  centerEmoji: string;
  description: string;
}

export interface GanpatiImage {
  id: string;
  title: string;
  tagline: string;
  accent: string;
  emoji: string;
  imageUrl: string;
  blessing: string;
}

export const VIRTUAL_RAKHIS: VirtualRakhi[] = [
  {
    id: "rakhi-gold-om",
    name: "Golden Om Rakhi 🕉️",
    tagline: "Golden zardosi thread with sacred Om emblem",
    accent: "#d97706",
    threadColor: "#dc2626",
    beadColor: "#f59e0b",
    centerEmoji: "🕉️",
    description: "Traditional golden beads strung on red silk thread for lifelong protection.",
  },
  {
    id: "rakhi-mor-pankh",
    name: "Mor Pankh Peacock Rakhi 🦚",
    tagline: "Vibrant peacock feather with silk tassels",
    accent: "#0284c7",
    threadColor: "#0284c7",
    beadColor: "#10b981",
    centerEmoji: "🦚",
    description: "Royal peacock feather emblem representing joy, grace & love.",
  },
  {
    id: "rakhi-swastik-red",
    name: "Resham Swastik Rakhi 卐",
    tagline: "Shubh Swastik with crimson red silk threads",
    accent: "#b91c1c",
    threadColor: "#991b1b",
    beadColor: "#fbbf24",
    centerEmoji: "🌸",
    description: "Auspicious red & yellow mauli thread with shimmering zardosi flower.",
  },
  {
    id: "rakhi-rudraksha-royal",
    name: "Rudraksha Royal Rakhi 📿",
    tagline: "Sacred Rudraksha bead with gold filigree",
    accent: "#78350f",
    threadColor: "#d97706",
    beadColor: "#92400e",
    centerEmoji: "📿",
    description: "Protective Rudraksha emblem woven into auspicious saffron thread.",
  },
];

export const GANPATI_IMAGES: GanpatiImage[] = [
  {
    id: "ganpati-blessings-card",
    title: "Bappa's Blessings 🕉️",
    tagline: "Sweet modaks, divine blessings and happiness always",
    accent: "#b91c1c",
    emoji: "🕉️",
    imageUrl: "/assets/festivals/ganpati-blessings-card.jpg",
    blessing: "Sweet modaks, divine blessings and happiness always. Ganpati Bappa Morya!",
  },
  {
    id: "ganpati-mangalmay-card",
    title: "सर्व मंगलमय होवो 🌺",
    tagline: "बाप्पाच्या चरणी सर्व मंगलमय होवो",
    accent: "#9a3412",
    emoji: "🌺",
    imageUrl: "/assets/festivals/ganpati-mangalmay-card.jpg",
    blessing: "गोड मोदक, शुभेच्छा आणि बाप्पाचा आशीर्वाद तुमच्यासाठी. Ganpati Bappa Morya!",
  },
  {
    id: "ganpati-modak-card",
    title: "Modak & Blessings 🥟",
    tagline: "Sweet modaks and Bappa's blessings",
    accent: "#ea580c",
    emoji: "🥟",
    imageUrl: "/assets/festivals/ganpati-modak-card.jpg",
    blessing: "Sweet modaks and Bappa's blessings for you!",
  },
  {
    id: "ganpati-durva-grass-card",
    title: "Durva Grass 🌿",
    tagline: "Symbol of purity and new beginnings",
    accent: "#15803d",
    emoji: "🌿",
    imageUrl: "/assets/festivals/ganpati-durva-grass-card.jpg",
    blessing: "Symbol of purity and new beginnings, removing negativity and clearing the path ahead.",
  },
  {
    id: "ganpati-flowers-devotion-card",
    title: "Flowers & Devotion 🌸",
    tagline: "Offer your prayers with love and sincerity",
    accent: "#be185d",
    emoji: "🌸",
    imageUrl: "/assets/festivals/ganpati-flowers-devotion-card.jpg",
    blessing: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
  },
  {
    id: "ganpati-offer-devotion-card",
    title: "Offer with Devotion ✨",
    tagline: "Pure flowers, pure heart, pure intentions",
    accent: "#d97706",
    emoji: "✨",
    imageUrl: "/assets/festivals/ganpati-offer-devotion-card.jpg",
    blessing: "Pure flowers, pure heart, pure intentions.",
  },
  {
    id: "ganpati-bananas-jaggery-card",
    title: "Bananas & Jaggery 🍌",
    tagline: "Bring sweetness and positivity into life",
    accent: "#b45309",
    emoji: "🍌",
    imageUrl: "/assets/festivals/ganpati-bananas-jaggery-card.jpg",
    blessing: "Bring sweetness and positivity into life, fostering harmony in relationships.",
  },
  // Backward compatibility alias IDs
  {
    id: "ganpati-devotion-card",
    title: "Offer with Devotion ✨",
    tagline: "Pure flowers, pure heart, pure intentions",
    accent: "#d97706",
    emoji: "✨",
    imageUrl: "/assets/festivals/ganpati-offer-devotion-card.jpg",
    blessing: "Pure flowers, pure heart, pure intentions.",
  },
  {
    id: "ganpati-flowers-leaves-card",
    title: "Flowers & Devotion 🌸",
    tagline: "Offer your prayers with love and sincerity",
    accent: "#be185d",
    emoji: "🌸",
    imageUrl: "/assets/festivals/ganpati-flowers-devotion-card.jpg",
    blessing: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
  },
  {
    id: "ganpati-blessing",
    title: "Bappa's Blessings 🕉️",
    tagline: "Sweet modaks, divine blessings and happiness always",
    accent: "#b91c1c",
    emoji: "🕉️",
    imageUrl: "/assets/festivals/ganpati-blessings-card.jpg",
    blessing: "Sweet modaks, divine blessings and happiness always. Ganpati Bappa Morya!",
  },
  {
    id: "ganpati-modak",
    title: "Modak & Blessings 🥟",
    tagline: "Sweet modaks and Bappa's blessings",
    accent: "#ea580c",
    emoji: "🥟",
    imageUrl: "/assets/festivals/ganpati-modak-card.jpg",
    blessing: "Sweet modaks and Bappa's blessings for you!",
  },
  {
    id: "ganpati-aarti",
    title: "Flowers & Devotion 🌸",
    tagline: "Offer your prayers with love and sincerity",
    accent: "#be185d",
    emoji: "🌸",
    imageUrl: "/assets/festivals/ganpati-flowers-devotion-card.jpg",
    blessing: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
  },
  {
    id: "ganpati-prosperity",
    title: "Bananas & Jaggery 🍌",
    tagline: "Bring sweetness and positivity into life",
    accent: "#b45309",
    emoji: "🍌",
    imageUrl: "/assets/festivals/ganpati-bananas-jaggery-card.jpg",
    blessing: "Bring sweetness and positivity into life, fostering harmony in relationships.",
  },
  {
    id: "ganpati-lalbaugcha-raja",
    title: "Bappa's Blessings 🕉️",
    tagline: "Sweet modaks, divine blessings and happiness always",
    accent: "#b91c1c",
    emoji: "🕉️",
    imageUrl: "/assets/festivals/ganpati-blessings-card.jpg",
    blessing: "Sweet modaks, divine blessings and happiness always. Ganpati Bappa Morya!",
  },
  {
    id: "ganpati-dagdusheth",
    title: "Durva Grass 🌿",
    tagline: "Symbol of purity and new beginnings",
    accent: "#15803d",
    emoji: "🌿",
    imageUrl: "/assets/festivals/ganpati-durva-grass-card.jpg",
    blessing: "Symbol of purity and new beginnings, removing negativity and clearing the path ahead.",
  },
  {
    id: "ganpati-modak-priya",
    title: "Modak & Blessings 🥟",
    tagline: "Sweet modaks and Bappa's blessings",
    accent: "#ea580c",
    emoji: "🥟",
    imageUrl: "/assets/festivals/ganpati-modak-card.jpg",
    blessing: "Sweet modaks and Bappa's blessings for you!",
  },
  {
    id: "ganpati-vighnaharta-gold",
    title: "Flowers & Devotion 🌸",
    tagline: "Offer your prayers with love and sincerity",
    accent: "#be185d",
    emoji: "🌸",
    imageUrl: "/assets/festivals/ganpati-flowers-devotion-card.jpg",
    blessing: "Offer your prayers with love and sincerity, and let positivity bloom in life.",
  },
];

export function getVirtualRakhi(id?: string | null): VirtualRakhi {
  return VIRTUAL_RAKHIS.find((r) => r.id === id) ?? VIRTUAL_RAKHIS[0];
}

export function getGanpatiImage(id?: string | null): GanpatiImage {
  return GANPATI_IMAGES.find((g) => g.id === id) ?? GANPATI_IMAGES[0];
}

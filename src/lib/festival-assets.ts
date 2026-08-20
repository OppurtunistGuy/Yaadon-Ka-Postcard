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
    id: "ganpati-lalbaugcha-raja",
    title: "Lalbaugcha Raja 👑",
    tagline: "King of Mumbai & fulfiller of wishes",
    accent: "#b91c1c",
    emoji: "👑",
    imageUrl: "https://images.unsplash.com/photo-1662057283626-d3c22037e908?q=80&w=800&auto=format&fit=crop",
    blessing: "Lalbaugcha Raja aapki har manokamna poori karein!",
  },
  {
    id: "ganpati-dagdusheth",
    title: "Dagdusheth Halwai Bappa 🕉️",
    tagline: "Golden aura & divine blessings",
    accent: "#d97706",
    emoji: "🕉️",
    imageUrl: "https://images.unsplash.com/photo-1695277154261-26ec037b5871?q=80&w=800&auto=format&fit=crop",
    blessing: "Ganesh Utsav ki paavan shubhkamnayein!",
  },
  {
    id: "ganpati-modak-priya",
    title: "Modak Priya Bal Ganesha 🥟",
    tagline: "Sweet modaks & joyous celebration",
    accent: "#ea580c",
    emoji: "🥟",
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f010e423b961?q=80&w=800&auto=format&fit=crop",
    blessing: "Ghar mein mithaas, sukh aur samriddhi aaye!",
  },
  {
    id: "ganpati-vighnaharta-gold",
    title: "Golden Vighnaharta 🪔",
    tagline: "Remover of obstacles & harbinger of peace",
    accent: "#b45309",
    emoji: "🪔",
    imageUrl: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=800&auto=format&fit=crop",
    blessing: "Bappa aapke jeevan se har vighna door karein!",
  },
];

export function getVirtualRakhi(id?: string | null): VirtualRakhi {
  return VIRTUAL_RAKHIS.find((r) => r.id === id) ?? VIRTUAL_RAKHIS[0];
}

export function getGanpatiImage(id?: string | null): GanpatiImage {
  return GANPATI_IMAGES.find((g) => g.id === id) ?? GANPATI_IMAGES[0];
}

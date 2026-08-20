export type FestivalThemeId = "classic" | "rakhi" | "ganpati" | string;

export interface FestivalTheme {
  id: FestivalThemeId;
  name: string;
  tagline: string;
  icon: string;
  accentColor: string;
  secondaryColor: string;
  paperTint: string;
  stampLabel: string;
  postmarkText: string;
  ribbonText: string;
  waxSealEmoji: string;
  cornerDecorationEmoji: string;
  description: string;
}

export const FESTIVAL_THEMES: FestivalTheme[] = [
  {
    id: "classic",
    name: "Classic Postcard",
    tagline: "Nostalgic 90s Airmail",
    icon: "✉️",
    accentColor: "#7a1f23",
    secondaryColor: "#1d4ed8",
    paperTint: "#fbf4e2",
    stampLabel: "BHARAT POST",
    postmarkText: "POSTED · BHARAT",
    ribbonText: "♡ Posted with love ♡",
    waxSealEmoji: "✉",
    cornerDecorationEmoji: "✦",
    description: "Traditional Indian postal style with aged paper and classic airmail borders.",
  },
  {
    id: "rakhi",
    name: "Rakhi Theme",
    tagline: "Raksha Bandhan Special",
    icon: "🪡",
    accentColor: "#b91c1c",
    secondaryColor: "#d97706",
    paperTint: "#fffbeb",
    stampLabel: "RAKHI POST",
    postmarkText: "RAKSHA BANDHAN",
    ribbonText: "🪡 Rakhi Pyar ka Dhaaga 🪡",
    waxSealEmoji: "🌺",
    cornerDecorationEmoji: "🏵️",
    description: "Festive Rakhi theme with marigold hues, silk thread motifs, and warm brother-sister nostalgia.",
  },
  {
    id: "ganpati",
    name: "Ganpati Theme",
    tagline: "Ganesh Utsav Special",
    icon: "🐘",
    accentColor: "#9a3412",
    secondaryColor: "#c2410c",
    paperTint: "#fff7ed",
    stampLabel: "GANPATI POST",
    postmarkText: "BAPPA MORYA",
    ribbonText: "🐘 Ganpati Bappa Morya 🐘",
    waxSealEmoji: "🕉️",
    cornerDecorationEmoji: "🪔",
    description: "Divine Ganesh Utsav theme with Modak accents, brass lamp flourishes, and saffron warmth.",
  },
];

export function getFestivalTheme(id?: string | null): FestivalTheme {
  const found = FESTIVAL_THEMES.find((t) => t.id === id);
  return found ?? FESTIVAL_THEMES[0];
}

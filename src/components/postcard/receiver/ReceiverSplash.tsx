"use client";

import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { WaxSeal } from "../shared/Decorations";
import { getFestivalTheme } from "@/lib/festival-themes";

export function ReceiverSplash({
  senderName,
  city,
  themeId,
  onOpen,
  loading,
}: {
  senderName?: string;
  city?: string;
  themeId?: string | null;
  onOpen: () => void;
  loading?: boolean;
}) {
  const theme = getFestivalTheme(themeId);
  const isGanpati = themeId === "ganpati";
  const isRakhi = themeId === "rakhi";

  return (
    <PaperBackground className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden select-none">
      {/* Ambient background decoration (subtle marigold / diya touches) */}
      {isGanpati && (
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-between px-6 sm:px-16" aria-hidden>
          <span className="text-6xl sm:text-8xl">🪔</span>
          <span className="text-6xl sm:text-8xl">🌸</span>
        </div>
      )}
      {isRakhi && (
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-between px-6 sm:px-16" aria-hidden>
          <span className="text-6xl sm:text-8xl">🪡</span>
          <span className="text-6xl sm:text-8xl">🏵️</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm text-center flex flex-col items-center relative z-10"
      >
        {/* Theme Icon / Diya */}
        <div className="text-5xl sm:text-6xl mb-4 select-none animate-float-soft" aria-hidden>
          {theme.arrivalEmoji}
        </div>

        {/* Minimal Arrival Heading */}
        <h1
          className="font-serif-vintage font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight"
          style={{ color: theme.accentColor }}
        >
          {theme.arrivalHeading}
        </h1>

        {/* Subheading */}
        <p className="font-handwritten text-lg sm:text-xl mt-3 text-[var(--ink-soft)]">
          {senderName
            ? `${senderName} sent you something special.`
            : theme.arrivalSubheading}
        </p>

        {/* Primary Action Button — OPEN POSTCARD */}
        <motion.button
          onClick={onOpen}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="mt-8 btn-vintage font-serif-vintage font-bold px-8 py-3.5 rounded-md tracking-wide text-lg inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition cursor-pointer text-[#fff8e7]"
        >
          <MailOpen className="w-5 h-5 text-[#fff8e7]" />
          <span className="text-[#fff8e7]">{loading ? "Opening..." : theme.openButtonText}</span>
        </motion.button>

        {/* Small subtle text */}
        <p className="mt-5 font-handwritten text-sm text-[var(--ink-soft)] opacity-90">
          {theme.arrivalFooterText}
        </p>

        <div className="mt-6 opacity-80">
          <WaxSeal size={40} emoji={theme.waxSealEmoji} />
        </div>
      </motion.div>
    </PaperBackground>
  );
}

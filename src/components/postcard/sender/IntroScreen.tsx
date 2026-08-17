"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, Heart } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { PostageStamp, Postmark } from "../shared/Stamp";
import { WaxSeal } from "../shared/Decorations";
import { useSenderStore } from "@/lib/postcard-store";

export function IntroScreen() {
  const setStep = useSenderStore((s) => s.setStep);

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      {/* top bar */}
      <header className="px-4 sm:px-8 pt-6 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5" style={{ color: "var(--burgundy)" }} />
          <span
            className="font-serif-vintage font-bold text-lg sm:text-xl tracking-wide"
            style={{ color: "var(--burgundy)" }}
          >
            Yaadon ka Postcard
          </span>
        </div>
        <LoveRibbonSmall />
      </header>

      <main className="flex-1 px-4 sm:px-8 flex flex-col items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl text-center"
        >
          {/* stamps row */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <PostageStamp accent="#b4351f" rotate={-8} className="hidden sm:block">
              <StampFace emoji="💌" label="Love" />
            </PostageStamp>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <PostageStamp accent="#1f4a7a" rotate={3}>
                <StampFace emoji="📮" label="Post" />
              </PostageStamp>
            </motion.div>
            <PostageStamp accent="#4a6b3a" rotate={9} className="hidden sm:block">
              <StampFace emoji="✨" label="Yaad" />
            </PostageStamp>
          </div>

          <h1
            className="font-serif-vintage font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight"
            style={{ color: "var(--burgundy)" }}
          >
            Send a postcard.
            <br />
            <span className="italic font-medium" style={{ color: "var(--ink)" }}>
              Hide a feeling inside.
            </span>
          </h1>

          <p
            className="mt-4 font-handwritten text-lg sm:text-xl max-w-lg mx-auto"
            style={{ color: "var(--ink-soft)" }}
          >
            Straight out of the 90s &mdash; write a heartfelt note on aged paper,
            tuck a Bollywood surprise inside, and share a link they&apos;ll never
            forget.
          </p>

          <AirmailDivider className="max-w-xs mx-auto my-7" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setStep("details")}
              className="btn-vintage font-serif-vintage font-semibold px-7 py-3 rounded-md tracking-wide text-base sm:text-lg flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Create a Postcard
            </button>
            <span
              className="font-handwritten text-sm"
              style={{ color: "var(--ink-soft)" }}
            >
              takes under a minute ♡
            </span>
          </div>

          {/* why special row */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {WHY_SPECIAL.map((w) => (
              <div
                key={w.label}
                className="paper-grain paper-stains rounded-md p-3 text-center vignette"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="text-2xl mb-1">{w.emoji}</div>
                <div
                  className="font-serif-vintage text-xs font-bold leading-tight"
                  style={{ color: "var(--burgundy)" }}
                >
                  {w.label}
                </div>
                <div
                  className="text-[10px] mt-0.5 leading-tight"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {w.text}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* postbox footer */}
      <footer className="px-4 sm:px-8 pb-6 pt-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12" style={{ background: "var(--border)" }} />
          <WaxSeal size={48} emoji="📮" />
          <div className="h-px w-12" style={{ background: "var(--border)" }} />
        </div>
        <p
          className="font-serif-vintage text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "var(--ink-soft)" }}
        >
          ♡ &mdash; Send a postcard. Share a feeling. Create a memory. &mdash; ♡
        </p>
      </footer>
    </PaperBackground>
  );
}

function StampFace({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="w-[52px] h-[60px] flex flex-col items-center justify-center gap-0.5 px-1 py-1">
      <span className="text-2xl leading-none">{emoji}</span>
      <span
        className="font-serif-vintage text-[7px] font-bold leading-tight uppercase tracking-wide"
        style={{ color: "var(--burgundy)" }}
      >
        {label}
      </span>
      <span
        className="text-[6px] leading-tight text-center"
        style={{ color: "var(--ink-soft)" }}
      >
        India Post
      </span>
    </div>
  );
}

function LoveRibbonSmall() {
  return (
    <div
      className="hidden sm:flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase font-serif-vintage"
      style={{ color: "var(--ink-soft)" }}
    >
      <Heart className="w-3 h-3" style={{ color: "var(--burgundy)" }} />
      <span>Made with love</span>
    </div>
  );
}

const WHY_SPECIAL = [
  { emoji: "🕰️", label: "Nostalgic Feel", text: "Aged paper, stamps & postmarks" },
  { emoji: "✍️", label: "Personal & Fun", text: "Handwritten-style message" },
  { emoji: "🎁", label: "Hidden Surprise", text: "A Bollywood gift inside" },
  { emoji: "🔗", label: "Easy to Share", text: "One link, one memory" },
];

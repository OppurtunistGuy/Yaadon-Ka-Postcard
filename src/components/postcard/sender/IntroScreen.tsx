"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, Heart } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { PostageStamp } from "../shared/Stamp";
import { WaxSeal } from "../shared/Decorations";
import { useSenderStore } from "@/lib/postcard-store";
import { useSound } from "@/hooks/use-sound";
import { useSentPostcards } from "@/hooks/use-sent-postcards";
import { SentPostcardsList } from "./SentPostcardsList";

export function IntroScreen() {
  const setStep = useSenderStore((s) => s.setStep);
  const { play } = useSound();
  const { records, removeRecord, clear } = useSentPostcards();

  function handleCreate() {
    play("stamp");
    setStep("details");
  }

  function handleOpenSent(token: string) {
    play("click");
    if (typeof window !== "undefined") {
      window.location.href = `/?card=${token}`;
    }
  }

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
          {/* stamps row — grounded with a shared baseline shadow */}
          <div className="relative flex items-end justify-center gap-3 mb-6">
            {/* baseline shadow strip */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-56 h-2 rounded-full opacity-30 blur-sm"
              style={{ background: "rgba(90,50,20,0.4)" }}
            />
            <motion.div
              initial={{ y: -30, opacity: 0, rotate: -15 }}
              animate={{ y: 0, opacity: 1, rotate: -8 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
              className="hidden sm:block"
            >
              <motion.div
                animate={{ rotate: [-8, -5, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <PostageStamp accent="#b4351f" rotate={-8}>
                  <StampFace emoji="💌" label="Love" />
                </PostageStamp>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ y: -40, opacity: 0, rotate: 10 }}
              animate={{ y: 0, opacity: 1, rotate: 3 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <PostageStamp accent="#1f4a7a" rotate={3}>
                  <StampFace emoji="📮" label="Post" />
                </PostageStamp>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ y: -30, opacity: 0, rotate: 20 }}
              animate={{ y: 0, opacity: 1, rotate: 9 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
              className="hidden sm:block"
            >
              <motion.div
                animate={{ rotate: [9, 6, 9] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <PostageStamp accent="#4a6b3a" rotate={9}>
                  <StampFace emoji="✨" label="Yaad" />
                </PostageStamp>
              </motion.div>
            </motion.div>
          </div>

          <h1
            className="font-serif-vintage font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight"
            style={{ color: "var(--burgundy)" }}
          >
            Send a postcard.
            <br />
            <span className="italic font-bold" style={{ color: "var(--ink)" }}>
              Hide a feeling inside.
            </span>
          </h1>

          <p
            className="mt-5 font-handwritten text-lg sm:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            Straight out of the 90s &mdash; write a heartfelt note on aged paper,
            tuck a Bollywood surprise inside, and share a link they&apos;ll never
            forget.
          </p>

          <AirmailDivider className="max-w-xs mx-auto my-8" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleCreate}
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
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {WHY_SPECIAL.map((w, idx) => (
              <motion.div
                key={w.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="paper-grain paper-stains rounded-md p-4 text-center vignette relative overflow-hidden"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "#faf2dc",
                  boxShadow:
                    "inset 0 0 14px rgba(139, 69, 19, 0.08), 0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 4px rgba(90,50,20,0.06)",
                }}
              >
                {/* paper edge accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-50"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(122,31,35,0.3), transparent)",
                  }}
                />
                <div
                  className="text-3xl mb-1.5 leading-none"
                  style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
                >
                  {w.emoji}
                </div>
                <div
                  className="font-serif-vintage text-xs font-bold leading-tight"
                  style={{ color: "var(--burgundy)" }}
                >
                  {w.label}
                </div>
                <div
                  className="text-[10px] mt-1 leading-tight"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {w.text}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recently sent postcards */}
        <SentPostcardsList
          records={records}
          onOpen={handleOpenSent}
          onDelete={removeRecord}
          onClear={clear}
        />
      </main>

      {/* postbox footer */}
      <footer className="px-4 sm:px-8 pb-6 pt-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-16" style={{ background: "var(--border)" }} />
          <div
            className="relative w-10 h-10 rounded-md flex items-center justify-center"
            style={{
              backgroundColor: "var(--burgundy)",
              color: "#f7eed8",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            aria-hidden
          >
            <Mail className="w-5 h-5" />
            {/* postbox slot */}
            <div
              className="absolute top-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-sm"
              style={{ backgroundColor: "#2e0a0a" }}
            />
          </div>
          <div className="h-px w-16" style={{ background: "var(--border)" }} />
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

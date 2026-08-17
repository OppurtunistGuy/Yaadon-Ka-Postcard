"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Home, Sparkles } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { PostcardCard } from "../shared/PostcardCard";
import { WaxSeal } from "../shared/Decorations";
import { ReactionBar } from "./ReactionBar";
import type { PostcardData } from "../shared/PostcardCard";

export function ReceiverView({
  data,
  token,
  initialReaction,
  onReveal,
  onGoHome,
}: {
  data: PostcardData;
  token: string;
  initialReaction?: string | null;
  onReveal: () => void;
  onGoHome: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  function handleReveal() {
    setRevealed(true);
    onReveal();
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <header className="px-4 sm:px-8 pt-5 pb-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-70 transition"
            style={{ color: "var(--ink-soft)" }}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Make your own</span>
          </button>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
            <span
              className="font-serif-vintage font-bold tracking-wide text-sm sm:text-base"
              style={{ color: "var(--burgundy)" }}
            >
              Your Postcard
            </span>
          </div>
          <div className="w-20" />
        </div>
        <AirmailDivider className="mt-3" />
      </header>

      <main className="flex-1 px-4 sm:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* message-first banner */}
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                <WaxSeal size={48} emoji="💌" />
              </motion.div>
              <h1
                className="font-serif-vintage text-2xl sm:text-3xl font-bold mt-2"
                style={{ color: "var(--burgundy)" }}
              >
                Pehle message padho...
              </h1>
              <p
                className="font-handwritten text-sm mt-1"
                style={{ color: "var(--ink-soft)" }}
              >
                Neeche ek surprise bhi hai &mdash; jab ready ho, tap karna.
              </p>
            </div>

            <PostcardCard
              data={data}
              revealState={revealed ? "revealed" : "hidden"}
              onReveal={handleReveal}
              className="animate-float-soft"
            />

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-5 text-center"
                >
                  <div
                    className="paper-grain paper-stains rounded-md p-4 vignette inline-block max-w-md"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <Sparkles
                      className="w-5 h-5 mx-auto mb-1"
                      style={{ color: "var(--gold)" }}
                    />
                    <p
                      className="font-handwritten text-base leading-snug"
                      style={{ color: "var(--ink)" }}
                    >
                      Surprise kaisa laga? {data.surprise.emoji}
                    </p>
                    <p
                      className="font-handwritten text-xs mt-1"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      Apna postcard bhi banao aur kisi ko surprise do.
                    </p>
                    <button
                      onClick={onGoHome}
                      className="btn-vintage font-serif-vintage font-semibold px-5 py-2 rounded-md tracking-wide text-sm mt-3 inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Make a Postcard
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reaction bar — appears after reveal */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <ReactionBar token={token} initialReaction={initialReaction} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <footer className="px-4 sm:px-8 pb-5 pt-4 text-center">
        <p
          className="font-serif-vintage text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--ink-soft)" }}
        >
          ♡ &mdash; A postcard travels heart to heart. &mdash; ♡
        </p>
      </footer>
    </PaperBackground>
  );
}

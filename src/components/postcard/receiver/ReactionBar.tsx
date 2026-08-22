"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/use-sound";

const REACTIONS = [
  { emoji: "😂", label: "Hansi", phrase: "Hansi waala reaction sender tak pahunch gaya! ✨" },
  { emoji: "❤️", label: "Pyaar", phrase: "Dil se pyaara reaction sender tak pahunch gaya! ❤️" },
  { emoji: "🥺", label: "Emotional", phrase: "Yeh meetha reaction sender tak pahunch gaya! 🥹" },
  { emoji: "🔥", label: "Aag", phrase: "Kadak reaction sender tak pahunch gaya! 🔥" },
  { emoji: "👏", label: "Wah!", phrase: "Kamaal ka reaction sender tak pahunch gaya! 👏" },
  { emoji: "🤗", label: "Jadoo ki jappi", phrase: "Warm jadoo ki jappi sender tak pahunch gayi! 🤗" },
];

/**
 * Reaction bar — lets the receiver send an emoji reaction back to the sender.
 * Persists via PATCH /api/postcards/[token] { action: "react", reaction }.
 * Shows a confirmation burst on tap.
 */
export function ReactionBar({
  token,
  senderName,
  initialReaction,
}: {
  token: string;
  senderName?: string;
  initialReaction?: string | null;
}) {
  const [selected, setSelected] = useState<string | null>(initialReaction ?? null);
  const [justPicked, setJustPicked] = useState<string | null>(null);
  const { play } = useSound();

  const cleanSender = senderName?.trim() || "sender";

  const reactions = [
    { emoji: "😂", label: "Hansi", phrase: `Hansi waala reaction ${cleanSender} tak pahunch gaya! ✨` },
    { emoji: "❤️", label: "Pyaar", phrase: `Dil se pyaara reaction ${cleanSender} tak pahunch gaya! ❤️` },
    { emoji: "🥺", label: "Emotional", phrase: `Yeh meetha reaction ${cleanSender} tak pahunch gaya! 🥹` },
    { emoji: "🔥", label: "Aag", phrase: `Kadak reaction ${cleanSender} tak pahunch gaya! 🔥` },
    { emoji: "👏", label: "Wah!", phrase: `Kamaal ka reaction ${cleanSender} tak pahunch gaya! 👏` },
    { emoji: "🤗", label: "Jadoo ki jappi", phrase: `Warm jadoo ki jappi ${cleanSender} tak pahunch gayi! 🤗` },
  ];

  async function handleReact(emoji: string) {
    const next = selected === emoji ? null : emoji;
    setSelected(next);
    setJustPicked(emoji);
    play("click");
    setTimeout(() => setJustPicked(null), 600);
    try {
      await fetch(`/api/postcards/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "react", reaction: next ?? "" }),
      });
    } catch {
      // best-effort
    }
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2 justify-center">
        <div className="h-px w-10" style={{ background: "var(--border)" }} />
        <span
          className="font-serif-vintage text-[9px] uppercase tracking-[0.2em]"
          style={{ color: "var(--ink-soft)" }}
        >
          {cleanSender.toUpperCase()} KO BOLO
        </span>
        <div className="h-px w-10" style={{ background: "var(--border)" }} />
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {reactions.map((r) => {
          const active = selected === r.emoji;
          return (
            <button
              key={r.emoji}
              onClick={() => handleReact(r.emoji)}
              aria-label={`React with ${r.label}`}
              title={r.label}
              className={`reaction-chip relative w-11 h-11 rounded-full flex items-center justify-center text-xl ${
                active ? "reaction-chip-active" : ""
              }`}
              style={{
                backgroundColor: active ? "rgba(122,31,35,0.12)" : "transparent",
                border: active
                  ? `1.5px solid var(--burgundy)`
                  : `1px dashed var(--border)`,
              }}
            >
              <span className="leading-none">{r.emoji}</span>
              {active && (
                <motion.span
                  layoutId="reaction-check"
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ backgroundColor: "var(--burgundy)" }}
                >
                  ✓
                </motion.span>
              )}
              <AnimatePresence>
                {justPicked === r.emoji && (
                  <motion.span
                    initial={{ opacity: 1, scale: 0.5, y: 0 }}
                    animate={{ opacity: 0, scale: 1.8, y: -28 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute pointer-events-none text-xl"
                  >
                    {r.emoji}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-handwritten text-xs text-center mt-2"
            style={{ color: "var(--ink-soft)" }}
          >
            {reactions.find((r) => r.emoji === selected)?.phrase}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

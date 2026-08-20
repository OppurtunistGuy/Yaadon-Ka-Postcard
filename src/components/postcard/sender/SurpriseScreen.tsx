"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { GifDisplay } from "../shared/GifDisplay";
import { useSenderStore } from "@/lib/postcard-store";
import { getSurprisesForTheme, getVibeMeta } from "@/lib/surprises";
import { getFestivalTheme } from "@/lib/festival-themes";
import { cn } from "@/lib/utils";

const TYPE_BADGE: Record<string, { label: string; emoji: string }> = {
  meme: { label: "Meme", emoji: "🤣" },
  dialogue: { label: "Dialogue", emoji: "💬" },
  song: { label: "Song", emoji: "🎵" },
  moment: { label: "Moment", emoji: "🎬" },
  festival: { label: "Festival", emoji: "✨" },
};

export function SurpriseScreen() {
  const { draft, updateDraft, setStep } = useSenderStore();

  const currentTheme = getFestivalTheme(draft.themeId);
  const isFestivalMode = draft.themeId === "rakhi" || draft.themeId === "ganpati";
  const vibeMeta = getVibeMeta(draft.vibe ?? "classic");

  const surprises = getSurprisesForTheme(draft.themeId, draft.vibe);

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <SenderHeader
        step={2}
        total={4}
        title="Pick a surprise"
        onBack={() => setStep("details")}
      />

      <main className="flex-1 px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-5"
          >
            <div className="text-4xl mb-1">
              {isFestivalMode ? currentTheme.icon : vibeMeta.emoji}
            </div>
            <h2
              className="font-serif-vintage text-2xl sm:text-3xl font-bold"
              style={{ color: currentTheme.accentColor || "var(--burgundy)" }}
            >
              {isFestivalMode ? `${currentTheme.name} Surprises` : `${vibeMeta.label} Surprises`}
            </h2>
            <p
              className="font-handwritten text-sm mt-1"
              style={{ color: "var(--ink-soft)" }}
            >
              {isFestivalMode ? currentTheme.description : vibeMeta.description}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {surprises.map((s, idx) => {
              const selected = draft.surpriseId === s.id;
              const badge = TYPE_BADGE[s.type] ?? TYPE_BADGE.dialogue;

              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  type="button"
                  onClick={() => updateDraft({ surpriseId: s.id })}
                  className={cn(
                    "surprise-card paper-grain relative text-left rounded-md p-4 overflow-hidden vignette",
                    selected && "surprise-card-selected",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  style={{
                    border: selected
                      ? `2px solid ${currentTheme.accentColor || "var(--burgundy)"}`
                      : `1px solid var(--border)`,
                    backgroundColor: selected ? "#f5e7c0" : "#faf2dc",
                    boxShadow: selected ? "0 6px 16px rgba(90,50,20,0.16)" : undefined,
                  }}
                >
                  {/* accent stripe */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: s.accent }}
                  />
                  <div className="flex items-start gap-3 pl-1.5">
                    <div
                      className="w-11 h-11 rounded-md flex items-center justify-center text-xl shrink-0 shadow-inner"
                      style={{ backgroundColor: s.accent, color: "#fff" }}
                    >
                      {s.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: "rgba(122, 31, 35, 0.1)",
                            color: currentTheme.accentColor || "var(--burgundy)",
                          }}
                        >
                          {badge.emoji} {badge.label}
                        </span>
                        {selected && (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white"
                            style={{
                              backgroundColor: currentTheme.accentColor || "var(--burgundy)",
                            }}
                          >
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Picked
                          </span>
                        )}
                      </div>
                      <div
                        className="font-serif-vintage font-bold text-sm mt-1.5 leading-tight"
                        style={{ color: "var(--ink)" }}
                      >
                        {s.character}
                      </div>
                      {s.movie && (
                        <div
                          className="text-[10px] italic"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          {s.movie}
                        </div>
                      )}
                      <p
                        className="font-handwritten text-[14px] leading-snug mt-1.5"
                        style={{ color: "var(--ink)" }}
                      >
                        &ldquo;{s.quote}&rdquo;
                      </p>

                      {/* Render normalized GIF preview safely */}
                      <GifDisplay gif={s.gif || s.gifUrl} title={s.title} compact />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AirmailDivider className="my-6" />

          {/* nav */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep("details")}
              className="text-sm font-medium hover:opacity-70 transition"
              style={{ color: "var(--ink-soft)" }}
            >
              ← Back
            </button>
            <span
              className="font-handwritten text-xs hidden sm:block"
              style={{ color: "var(--ink-soft)" }}
            >
              {draft.surpriseId
                ? "Nice pick! Ab message likho."
                : "Ek surprise chuno 👆"}
            </span>
            <button
              disabled={!draft.surpriseId}
              onClick={() => draft.surpriseId && setStep("message")}
              className={cn(
                "btn-vintage font-serif-vintage font-semibold px-6 py-2.5 rounded-md tracking-wide flex items-center gap-2",
                !draft.surpriseId && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              Write Message
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      <SenderFooter />
    </PaperBackground>
  );
}

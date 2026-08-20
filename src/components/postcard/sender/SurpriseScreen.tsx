"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, Sparkles } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { GifDisplay } from "../shared/GifDisplay";
import { VirtualRakhiDisplay } from "../shared/VirtualRakhiDisplay";
import { useSenderStore } from "@/lib/postcard-store";
import { getSurprisesForTheme, getVibeMeta } from "@/lib/surprises";
import { getFestivalTheme } from "@/lib/festival-themes";
import { getGanpatiImage, getVirtualRakhi } from "@/lib/festival-assets";
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
  const isRakhiMode = draft.themeId === "rakhi";
  const isGanpatiMode = draft.themeId === "ganpati";
  const isFestivalMode = isRakhiMode || isGanpatiMode;
  const vibeMeta = getVibeMeta(draft.vibe ?? "classic");

  const surprises = getSurprisesForTheme(draft.themeId, draft.vibe);

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <SenderHeader
        step={2}
        total={4}
        title={isRakhiMode ? "Pick a Virtual Rakhi" : isGanpatiMode ? "Pick Ganpati Bappa's Blessing" : "Pick a surprise"}
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
              {isRakhiMode
                ? "Virtual Rakhi Threads 🪡"
                : isGanpatiMode
                ? "Ganpati Bappa's Images & Blessings 🕉️"
                : `${vibeMeta.label} Surprises`}
            </h2>
            <p
              className="font-handwritten text-sm mt-1"
              style={{ color: "var(--ink-soft)" }}
            >
              {isRakhiMode
                ? "Sister-to-Brother special — virtual Rakhi will be tied on the recipient's postcard!"
                : isGanpatiMode
                ? "Choose a divine Ganpati Bappa portrait to attach with your greetings!"
                : vibeMeta.description}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {surprises.map((s, idx) => {
              const selected = draft.surpriseId === s.id;
              const badge = TYPE_BADGE[s.type] ?? TYPE_BADGE.dialogue;
              const ganpatiImg = s.ganpatiImgId ? getGanpatiImage(s.ganpatiImgId) : null;
              const rakhiAsset = s.rakhiId ? getVirtualRakhi(s.rakhiId) : null;

              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  type="button"
                  onClick={() => updateDraft({ surpriseId: s.id })}
                  className={cn(
                    "surprise-card paper-grain relative text-left rounded-md p-4 overflow-hidden vignette flex flex-col justify-between",
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

                  <div>
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
                          {s.title}
                        </div>

                        <p
                          className="font-handwritten text-[13px] leading-snug mt-1 text-amber-900/80 italic"
                        >
                          &ldquo;{s.quote}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Virtual Rakhi Selection Preview */}
                    {isRakhiMode && (
                      <div className="mt-3 bg-amber-50/80 p-2.5 rounded border border-amber-900/15">
                        <VirtualRakhiDisplay rakhiId={s.rakhiId} compact isTied={false} />
                        <div className="text-[11px] text-center font-handwritten mt-1" style={{ color: "var(--ink-soft)" }}>
                          {rakhiAsset?.tagline || s.caption}
                        </div>
                      </div>
                    )}

                    {/* Ganpati Bappa Image Selection Preview */}
                    {isGanpatiMode && ganpatiImg && (
                      <div className="mt-3 bg-amber-50/80 p-2 rounded border border-amber-900/15">
                        <div className="relative rounded overflow-hidden h-32 border border-amber-900/20 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={ganpatiImg.imageUrl}
                            alt={ganpatiImg.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                            <span className="text-amber-100 font-serif-vintage text-xs font-bold truncate">
                              {ganpatiImg.title}
                            </span>
                          </div>
                        </div>
                        <div className="text-[11px] text-center font-handwritten mt-1" style={{ color: "var(--ink-soft)" }}>
                          {ganpatiImg.tagline}
                        </div>
                      </div>
                    )}

                    {/* Standard GIF preview */}
                    {!isFestivalMode && (
                      <div className="mt-2 pl-1.5">
                        <GifDisplay gif={s.gif || s.gifUrl} title={s.title} compact />
                      </div>
                    )}
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
                : isRakhiMode
                ? "Ek Virtual Rakhi chuno 👆"
                : isGanpatiMode
                ? "Bappa ki image chuno 👆"
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

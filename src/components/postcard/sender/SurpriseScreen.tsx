"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Heart, Sparkles, Check, Info } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { GifDisplay } from "../shared/GifDisplay";
import { VirtualRakhiDisplay } from "../shared/VirtualRakhiDisplay";
import { useSenderStore } from "@/lib/postcard-store";
import { getSurprisesForTheme, getSurprisesForVibe, getVibeMeta, VIBES, Vibe } from "@/lib/surprises";
import { FESTIVAL_THEMES, getFestivalTheme } from "@/lib/festival-themes";
import { getGanpatiImage, getVirtualRakhi } from "@/lib/festival-assets";
import { cn } from "@/lib/utils";

const CELEBRITIES = [
  { name: "Johnny Lever", vibe: "jolly", role: "Jolly", avatar: "🤣" },
  { name: "Akshay Kumar", vibe: "action", role: "Action Hero", avatar: "💥" },
  { name: "Shah Rukh Khan", vibe: "romantic", role: "Romantic", avatar: "👑" },
  { name: "Hrithik Roshan", vibe: "action", role: "Action Hero", avatar: "🔥" },
  { name: "Salman Khan", vibe: "action", role: "Action Hero", avatar: "🕶️" },
  { name: "Emraan Hashmi", vibe: "romantic", role: "Romantic", avatar: "💖" },
];

export function SurpriseScreen() {
  const { draft, updateDraft, setStep } = useSenderStore();
  const [selectedCharacterFilter, setSelectedCharacterFilter] = useState<string>("all");

  const currentThemeId = draft.themeId || "classic";
  const currentTheme = getFestivalTheme(currentThemeId);
  const isClassicMode = currentThemeId === "classic";
  const isRakhiMode = currentThemeId === "rakhi";
  const isGanpatiMode = currentThemeId === "ganpati";

  // Handle theme mode tab switch
  function handleThemeSwitch(themeId: string) {
    updateDraft({
      themeId,
      vibe: themeId === "rakhi" ? "rakhi" : themeId === "ganpati" ? "ganpati" : (draft.vibe || "classic"),
      surpriseId: null,
    });
  }

  // Retrieve surprises based on current theme and vibe
  const surprises = getSurprisesForTheme(currentThemeId, draft.vibe || "classic");

  // Filter classic celebrities if filter is active
  const filteredCelebrities = selectedCharacterFilter === "all"
    ? CELEBRITIES
    : CELEBRITIES.filter((c) => c.vibe === selectedCharacterFilter);

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <SenderHeader
        step={2}
        total={4}
        title="Pick a Festival Theme & Surprise"
        onBack={() => setStep("details")}
      />

      <main className="flex-1 px-4 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto">

          {/* ===== Top Theme Switcher Tabs — Matching Design Image ===== */}
          <div className="mb-8">
            <div className="text-center mb-3">
              <h2 className="font-serif-vintage text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2" style={{ color: "var(--burgundy)" }}>
                <span>✨</span> Pick a Festival Theme <span>✨</span>
              </h2>
              <p className="font-handwritten text-sm text-[var(--ink-soft)] mt-0.5">
                Choose a theme to continue creating your postcard
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-center gap-2 max-w-md mx-auto p-1.5 rounded-lg bg-[#faf2dc] border border-amber-900/20 shadow-xs">
              <button
                type="button"
                onClick={() => handleThemeSwitch("classic")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-serif-vintage font-bold transition flex items-center justify-center gap-1.5",
                  isClassicMode
                    ? "bg-[var(--burgundy)] text-white shadow-sm"
                    : "text-amber-950 hover:bg-amber-900/10"
                )}
              >
                <span>✉️</span> Classic
              </button>

              <button
                type="button"
                onClick={() => handleThemeSwitch("rakhi")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-serif-vintage font-bold transition flex items-center justify-center gap-1.5",
                  isRakhiMode
                    ? "bg-rose-700 text-white shadow-sm"
                    : "text-amber-950 hover:bg-amber-900/10"
                )}
              >
                <span>🪡</span> Rakhi
              </button>

              <button
                type="button"
                onClick={() => handleThemeSwitch("ganpati")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-serif-vintage font-bold transition flex items-center justify-center gap-1.5",
                  isGanpatiMode
                    ? "bg-amber-700 text-white shadow-sm"
                    : "text-amber-950 hover:bg-amber-900/10"
                )}
              >
                <span>🕉️</span> Ganpati
              </button>
            </div>
          </div>

          {/* ===== CLASSIC MODE CONTENT ===== */}
          {isClassicMode && (
            <div className="space-y-6">
              {/* Section 1: Pick Their Vibe */}
              <div className="bg-[#faf2dc]/90 p-4 sm:p-5 rounded-lg border border-amber-900/20">
                <h3 className="font-serif-vintage text-base font-bold text-[var(--burgundy)] mb-1">
                  Pick their vibe
                </h3>
                <p className="font-handwritten text-xs text-[var(--ink-soft)] mb-3">
                  Choose a vibe that matches your feeling
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {VIBES.map((v) => {
                    const selected = (draft.vibe || "classic") === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => updateDraft({ vibe: v.id as Vibe, surpriseId: null })}
                        className={cn(
                          "p-2.5 rounded-md text-left transition border vignette flex items-center gap-2",
                          selected
                            ? "bg-amber-100 border-amber-900 shadow-xs font-bold"
                            : "bg-amber-50/60 border-amber-900/15 hover:bg-amber-100/50"
                        )}
                      >
                        <span className="text-xl">{v.emoji}</span>
                        <div className="min-w-0">
                          <div className="font-serif-vintage text-xs text-[var(--burgundy)]">{v.label}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Pick a Character */}
              <div className="bg-[#faf2dc]/90 p-4 sm:p-5 rounded-lg border border-amber-900/20">
                <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                  <div>
                    <h3 className="font-serif-vintage text-base font-bold text-[var(--burgundy)]">
                      Pick a character
                    </h3>
                    <p className="font-handwritten text-xs text-[var(--ink-soft)]">
                      Choose a celebrity to create a surprise
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto py-1">
                    {["all", "jolly", "romantic", "action", "classic"].map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setSelectedCharacterFilter(filter)}
                        className={cn(
                          "text-[10px] font-serif-vintage capitalize px-2 py-0.5 rounded border transition",
                          selectedCharacterFilter === filter
                            ? "bg-amber-900 text-amber-50 border-amber-900"
                            : "bg-amber-50 text-amber-900 border-amber-900/20"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Celebrities Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {filteredCelebrities.map((celeb) => (
                    <div
                      key={celeb.name}
                      onClick={() => updateDraft({ vibe: celeb.vibe as Vibe })}
                      className={cn(
                        "p-3 rounded-md border text-center transition cursor-pointer flex flex-col items-center justify-center",
                        draft.vibe === celeb.vibe
                          ? "bg-amber-100 border-amber-900 shadow-xs"
                          : "bg-amber-50/60 border-amber-900/15 hover:bg-amber-100/40"
                      )}
                    >
                      <span className="text-3xl mb-1">{celeb.avatar}</span>
                      <div className="font-serif-vintage text-xs font-bold text-[var(--burgundy)]">
                        {celeb.name}
                      </div>
                      <div className="font-handwritten text-[10px] text-[var(--ink-soft)] mt-0.5">
                        {celeb.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Celebrity Surprises */}
              <div className="space-y-3">
                <h3 className="font-serif-vintage text-base font-bold text-[var(--burgundy)]">
                  Pick a surprise for your postcard
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {surprises.map((s) => {
                    const selected = draft.surpriseId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => updateDraft({ surpriseId: s.id })}
                        className={cn(
                          "paper-grain relative text-left rounded-md p-3.5 border transition",
                          selected
                            ? "bg-[#f5e7c0] border-amber-900 shadow-sm"
                            : "bg-[#faf2dc] border-amber-900/20 hover:bg-amber-100/50"
                        )}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-2xl">{s.emoji}</span>
                          <div className="min-w-0 flex-1">
                            <div className="font-serif-vintage font-bold text-xs text-[var(--burgundy)]">
                              {s.title}
                            </div>
                            <div className="font-handwritten text-xs italic text-[var(--ink-soft)] mt-0.5">
                              &ldquo;{s.quote}&rdquo;
                            </div>
                          </div>
                          {selected && <Check className="w-4 h-4 text-amber-900 shrink-0" />}
                        </div>
                        {s.gifUrl && (
                          <div className="mt-2">
                            <GifDisplay gif={s.gif || s.gifUrl} title={s.title} compact />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ===== RAKHI MODE CONTENT ===== */}
          {isRakhiMode && (
            <div className="bg-rose-50/60 p-5 rounded-lg border border-rose-300/60 space-y-4">
              <div className="text-center">
                <h3 className="font-serif-vintage text-xl font-bold text-rose-900 flex items-center justify-center gap-1.5">
                  <span>→</span> Rakhi Surprises <span>♡</span>
                </h3>
                <p className="font-handwritten text-xs text-rose-800/80 mt-0.5">
                  Choose a rakhi surprise to attach with your postcard
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {surprises.map((s) => {
                  const selected = draft.surpriseId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateDraft({ surpriseId: s.id })}
                      className={cn(
                        "p-4 rounded-lg border text-center transition flex flex-col items-center justify-between",
                        selected
                          ? "bg-rose-100 border-rose-800 shadow-sm"
                          : "bg-white/80 border-rose-200 hover:bg-rose-100/40"
                      )}
                    >
                      <div className="w-full flex flex-col items-center">
                        <span className="text-3xl mb-2">{s.emoji}</span>
                        <div className="font-serif-vintage font-bold text-xs text-rose-950">
                          {s.title}
                        </div>
                        <div className="font-handwritten text-[11px] text-rose-800/80 mt-1 italic">
                          &ldquo;{s.quote}&rdquo;
                        </div>
                        <div className="mt-2 w-full">
                          <VirtualRakhiDisplay rakhiId={s.rakhiId || "rakhi-gold-om"} compact isTied={false} />
                        </div>
                      </div>
                      {selected && (
                        <div className="mt-2 text-[10px] font-serif-vintage uppercase font-bold text-rose-900 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== GANPATI MODE CONTENT ===== */}
          {isGanpatiMode && (
            <div className="bg-amber-50/60 p-5 rounded-lg border border-amber-300/60 space-y-4">
              <div className="text-center">
                <h3 className="font-serif-vintage text-xl font-bold text-amber-950 flex items-center justify-center gap-1.5">
                  <span>⊹</span> Ganpati Bappa Surprises 🕉️ <span>⊹</span>
                </h3>
                <p className="font-handwritten text-xs text-amber-900/80 mt-0.5">
                  Choose a divine surprise to attach with your postcard
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {surprises.map((s) => {
                  const selected = draft.surpriseId === s.id;
                  const ganpatiImg = s.ganpatiImgId ? getGanpatiImage(s.ganpatiImgId) : null;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateDraft({ surpriseId: s.id })}
                      className={cn(
                        "p-3.5 rounded-lg border text-center transition flex flex-col items-center justify-between",
                        selected
                          ? "bg-amber-100 border-amber-800 shadow-sm"
                          : "bg-white/80 border-amber-200 hover:bg-amber-100/40"
                      )}
                    >
                      <div className="w-full flex flex-col items-center">
                        <span className="text-3xl mb-1">{s.emoji}</span>
                        <div className="font-serif-vintage font-bold text-xs text-amber-950">
                          {s.title}
                        </div>
                        <div className="font-handwritten text-[11px] text-amber-900/80 mt-0.5 italic">
                          &ldquo;{s.quote}&rdquo;
                        </div>

                        {ganpatiImg && (
                          <div className="mt-2.5 relative w-full h-28 rounded overflow-hidden border border-amber-900/20 shadow-xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={ganpatiImg.imageUrl}
                              alt={ganpatiImg.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {selected && (
                        <div className="mt-2 text-[10px] font-serif-vintage uppercase font-bold text-amber-900 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== Bottom Stationery Treatment Info Callout — Matching Design Image ===== */}
          <div className="mt-6 p-3.5 rounded-md border border-amber-900/20 bg-[#faf2dc]/80 flex items-center gap-2.5 text-amber-950">
            <Info className="w-4 h-4 shrink-0 text-amber-900" />
            <p className="font-serif-vintage text-xs leading-snug">
              Changing the theme will update the entire postcard look (colors, stamps, decorations) in the next step.
            </p>
          </div>

          <AirmailDivider className="my-6" />

          {/* Bottom Nav Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep("details")}
              className="text-sm font-medium hover:opacity-70 transition font-serif-vintage"
              style={{ color: "var(--ink-soft)" }}
            >
              ← Back to Details
            </button>

            <button
              onClick={() => setStep("message")}
              disabled={!draft.surpriseId && !isClassicMode}
              className={cn(
                "btn-vintage font-serif-vintage font-semibold px-7 py-3 rounded-md tracking-wide flex items-center gap-2",
                !draft.surpriseId && !isClassicMode && "opacity-50 cursor-not-allowed"
              )}
            >
              <span>Write your message</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <SenderFooter />
    </PaperBackground>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Info } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { GifDisplay } from "../shared/GifDisplay";
import { VirtualRakhiDisplay } from "../shared/VirtualRakhiDisplay";
import { useSenderStore } from "@/lib/postcard-store";
import {
  getSurprisesForTheme,
  getCharactersForVibe,
  getSurprisesForCharacter,
  VIBES,
  type Vibe,
} from "@/lib/surprises";
import { FESTIVAL_THEMES, getFestivalTheme } from "@/lib/festival-themes";
import { getGanpatiImage } from "@/lib/festival-assets";
import { cn } from "@/lib/utils";

export function SurpriseScreen() {
  const { draft, updateDraft, setStep } = useSenderStore();

  const currentThemeId = draft.themeId || "classic";
  const isClassicMode = currentThemeId === "classic";
  const isRakhiMode = currentThemeId === "rakhi";
  const isGanpatiMode = currentThemeId === "ganpati";

  // Single active character selection state
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  // Sync initial selected character if draft already contains a surpriseId
  useEffect(() => {
    if (isClassicMode && draft.vibe && draft.surpriseId && !selectedCharacter) {
      const surprises = getSurprisesForTheme("classic", draft.vibe);
      const found = surprises.find((s) => s.id === draft.surpriseId);
      if (found?.character) {
        setSelectedCharacter(found.character);
      }
    }
  }, [isClassicMode, draft.vibe, draft.surpriseId, selectedCharacter]);

  // Handle Festival Theme Switch (Classic vs Rakhi vs Ganpati)
  function handleThemeSwitch(themeId: string) {
    if (themeId === currentThemeId) return;

    if (themeId === "classic") {
      updateDraft({
        themeId: "classic",
        vibe: "jolly",
        surpriseId: null,
      });
      setSelectedCharacter(null);
    } else {
      updateDraft({
        themeId: themeId as any,
        vibe: themeId === "rakhi" ? "rakhi" : "ganpati",
        surpriseId: null,
      });
      setSelectedCharacter(null);
    }
  }

  // Handle Vibe Selection change (Clears character & surprise, loads characters for new vibe)
  function handleVibeSelect(newVibe: Vibe) {
    updateDraft({ vibe: newVibe, surpriseId: null });
    setSelectedCharacter(null);
  }

  // Handle Character Selection change (Immediately deselects every other character)
  function handleCharacterSelect(charName: string) {
    setSelectedCharacter(charName);
    updateDraft({ surpriseId: null });
  }

  const currentVibe = draft.vibe || "jolly";
  const isJustMeMode = isClassicMode && currentVibe === "classic";

  // Characters dynamically controlled by selected Vibe
  const charactersForVibe = isClassicMode && !isJustMeMode ? getCharactersForVibe(currentVibe) : [];

  // Surprises dynamically controlled by selected Character
  const surprisesForCharacter =
    isClassicMode && !isJustMeMode && selectedCharacter
      ? getSurprisesForCharacter(currentVibe, selectedCharacter)
      : [];

  // Festival Surprises for Rakhi / Ganpati
  const festivalSurprises = getSurprisesForTheme(currentThemeId, draft.vibe);

  // Can user proceed?
  const canContinue =
    isClassicMode
      ? isJustMeMode || Boolean(draft.surpriseId)
      : Boolean(draft.surpriseId);

  return (
    <PaperBackground className="min-h-screen flex flex-col justify-between selection:bg-amber-900/10">
      <SenderHeader
        step={2}
        total={4}
        title="Pick a Festival Theme & Surprise"
        onBack={() => setStep("details")}
      />

      <main className="flex-1 px-4 sm:px-8 py-6 box-border min-w-0">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* ===== Theme Header Badge (Step 1 Single Source of Truth) ===== */}
          <div className="mb-6 text-center">
            <h2 className="font-serif-vintage text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2 text-[var(--burgundy)]">
              {isClassicMode && <span>✉️ Classic Postcard Surprise ✉️</span>}
              {isRakhiMode && <span>🪡 Rakhi Festival Surprise 🪡</span>}
              {isGanpatiMode && <span>🕉️ Ganpati Bappa Surprise 🕉️</span>}
            </h2>
            <p className="font-handwritten text-sm text-[var(--ink-soft)] mt-0.5">
              {isClassicMode && "Select a vibe and character surprise for your postcard"}
              {isRakhiMode && "Attach a virtual rakhi thread for your sibling"}
              {isGanpatiMode && "Attach a divine Bappa blessing for your family & friends"}
            </p>
          </div>

          {/* ===== CLASSIC MODE CONTENT ===== */}
          {isClassicMode && (
            <div className="space-y-6">
              {/* Section 1: Pick Their Vibe */}
              <div className="bg-[#faf2dc]/90 p-4 sm:p-5 rounded-lg border border-amber-900/20 shadow-xs">
                <h3 className="font-serif-vintage text-base font-bold text-[var(--burgundy)] mb-1">
                  1. Pick their vibe
                </h3>
                <p className="font-handwritten text-xs text-[var(--ink-soft)] mb-3">
                  Choose a vibe — selecting a new vibe updates the available characters below
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {VIBES.map((v) => {
                    const selected = currentVibe === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleVibeSelect(v.id as Vibe)}
                        className={cn(
                          "p-3 rounded-md text-left transition border vignette flex items-center gap-2.5 cursor-pointer",
                          selected
                            ? "bg-amber-100 border-[var(--burgundy)] border-2 shadow-xs font-bold"
                            : "bg-amber-50/60 border-amber-900/15 hover:bg-amber-100/50"
                        )}
                      >
                        <span className="text-2xl shrink-0">{v.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-serif-vintage text-xs font-bold text-[var(--burgundy)] leading-tight">
                            {v.label}
                          </div>
                          <div className="font-handwritten text-[10px] text-[var(--ink-soft)] leading-tight mt-0.5 truncate">
                            {v.tagline}
                          </div>
                        </div>
                        {selected && <Check className="w-3.5 h-3.5 text-[var(--burgundy)] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Just Me Notice */}
              {isJustMeMode && (
                <div className="p-4 rounded-md border border-amber-900/20 bg-[#fffceb] text-center">
                  <p className="font-serif-vintage text-xs font-semibold text-[var(--burgundy)]">
                    ✨ &ldquo;Just Me&rdquo; mode selected — No celebrity attachments.
                  </p>
                  <p className="font-handwritten text-xs text-[var(--ink-soft)] mt-0.5">
                    Your postcard will be sent cleanly with your personal message as the hero.
                  </p>
                </div>
              )}

              {/* Section 2: Pick a Character (Controlled strictly by Vibe) */}
              {!isJustMeMode && (
                <div className="bg-[#faf2dc]/90 p-4 sm:p-5 rounded-lg border border-amber-900/20 shadow-xs">
                  <h3 className="font-serif-vintage text-base font-bold text-[var(--burgundy)] mb-1">
                    2. Pick a character
                  </h3>
                  <p className="font-handwritten text-xs text-[var(--ink-soft)] mb-3">
                    Showing characters for <span className="font-bold text-[var(--burgundy)] font-serif-vintage uppercase">{currentVibe}</span> vibe — click to select ONE character
                  </p>

                  {/* Horizontal 3-Column Celebrities Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {charactersForVibe.map((celeb) => {
                      const isSelected = selectedCharacter === celeb.name;
                      return (
                        <button
                          key={celeb.name}
                          type="button"
                          onClick={() => handleCharacterSelect(celeb.name)}
                          className={cn(
                            "p-3 rounded-md border text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[90px] relative vignette",
                            isSelected
                              ? "bg-amber-100 border-[var(--burgundy)] border-2 shadow-xs font-bold scale-[1.01]"
                              : "bg-amber-50/60 border-amber-900/15 hover:bg-amber-100/40"
                          )}
                        >
                          {isSelected && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[var(--burgundy)] text-white flex items-center justify-center text-[10px]">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                          )}
                          <span className="text-3xl mb-1">{celeb.avatar}</span>
                          <div className="font-serif-vintage text-xs font-bold text-[var(--burgundy)] truncate max-w-[140px]">
                            {celeb.name}
                          </div>
                          <div className="font-handwritten text-[10px] text-[var(--ink-soft)] mt-0.5">
                            {celeb.count} {celeb.count === 1 ? "surprise" : "surprises"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Section 3: Celebrity Surprises (Filtered strictly by selected Character) */}
              {!isJustMeMode && selectedCharacter && (
                <div className="space-y-3">
                  <h3 className="font-serif-vintage text-base font-bold text-[var(--burgundy)]">
                    3. Pick a surprise for your postcard ({selectedCharacter})
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {surprisesForCharacter.map((s) => {
                      const isSelected = draft.surpriseId === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => updateDraft({ surpriseId: s.id })}
                          className={cn(
                            "paper-grain relative text-left rounded-md p-3.5 border transition cursor-pointer flex flex-col justify-between vignette",
                            isSelected
                              ? "bg-[#f5e7c0] border-[var(--burgundy)] border-2 shadow-xs"
                              : "bg-[#faf2dc] border-amber-900/20 hover:bg-amber-100/50"
                          )}
                        >
                          <div>
                            <div className="flex items-start gap-2.5">
                              <span className="text-2xl shrink-0">{s.emoji}</span>
                              <div className="min-w-0 flex-1">
                                <div className="font-serif-vintage font-bold text-xs text-[var(--burgundy)] truncate">
                                  {s.title}
                                </div>
                                <div className="font-handwritten text-xs italic text-[var(--ink-soft)] mt-0.5 leading-snug">
                                  &ldquo;{s.quote}&rdquo;
                                </div>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-[var(--burgundy)] shrink-0 font-bold" />}
                            </div>
                            {s.gifUrl && (
                              <div className="mt-2">
                                <GifDisplay gif={s.gif || s.gifUrl} title={s.title} compact />
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== RAKHI MODE CONTENT ===== */}
          {isRakhiMode && (
            <div className="bg-rose-50/60 p-5 rounded-lg border border-rose-300/60 space-y-4">
              <div className="text-center">
                <h3 className="font-serif-vintage text-xl font-bold text-rose-900 flex items-center justify-center gap-1.5">
                  <span>🪡</span> Virtual Rakhi Surprises <span>♡</span>
                </h3>
                <p className="font-handwritten text-xs text-rose-800/80 mt-0.5">
                  Choose a virtual rakhi thread to attach to your postcard
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {festivalSurprises.map((s) => {
                  const selected = draft.surpriseId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateDraft({ surpriseId: s.id })}
                      className={cn(
                        "p-4 rounded-lg border text-center transition flex flex-col items-center justify-between cursor-pointer",
                        selected
                          ? "bg-rose-100 border-rose-800 shadow-xs"
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
                  Choose a divine portrait to attach to your postcard
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {festivalSurprises.map((s) => {
                  const selected = draft.surpriseId === s.id;
                  const ganpatiImg = s.ganpatiImgId ? getGanpatiImage(s.ganpatiImgId) : null;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateDraft({ surpriseId: s.id })}
                      className={cn(
                        "p-3.5 rounded-lg border text-center transition flex flex-col items-center justify-between cursor-pointer",
                        selected
                          ? "bg-amber-100 border-amber-800 shadow-xs"
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

          {/* ===== Bottom Info Callout ===== */}
          <div className="p-3.5 rounded-md border border-amber-900/20 bg-[#faf2dc]/80 flex items-center gap-2.5 text-amber-950">
            <Info className="w-4 h-4 shrink-0 text-amber-900" />
            <p className="font-serif-vintage text-xs leading-snug">
              Changing the theme will update the entire postcard look (colors, stamps, decorations) in the next step.
            </p>
          </div>

          <AirmailDivider className="my-6" />

          {/* Bottom Nav Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep("details")}
              className="text-sm font-medium hover:opacity-70 transition font-serif-vintage cursor-pointer text-[var(--ink-soft)]"
            >
              &larr; Back to Details
            </button>

            <button
              onClick={() => setStep("message")}
              disabled={!canContinue}
              className={cn(
                "btn-vintage font-serif-vintage font-semibold px-7 py-3 rounded-md tracking-wide flex items-center gap-2 cursor-pointer shadow-sm hover:shadow",
                !canContinue && "opacity-50 cursor-not-allowed grayscale"
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

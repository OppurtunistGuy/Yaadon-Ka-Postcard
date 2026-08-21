"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { useSenderStore } from "@/lib/postcard-store";
import { VIBES, type Vibe } from "@/lib/surprises";
import { FESTIVAL_THEMES, type FestivalThemeId } from "@/lib/festival-themes";
import { cn } from "@/lib/utils";

export function DetailsScreen() {
  const { draft, updateDraft, setStep } = useSenderStore();

  const isFestivalMode = draft.themeId === "rakhi" || draft.themeId === "ganpati";

  const canContinue = isFestivalMode
    ? draft.receiverName.trim() &&
      draft.city.trim() &&
      draft.relationship.trim() &&
      draft.senderName.trim()
    : draft.receiverName.trim() &&
      draft.city.trim() &&
      draft.relationship.trim() &&
      draft.senderName.trim() &&
      draft.vibe;

  function handleThemeSelect(newThemeId: FestivalThemeId) {
    if (draft.themeId === newThemeId) return;

    if (newThemeId === "classic") {
      // Switching from festival to classic -> clear surprise, restore vibe requirement
      updateDraft({
        themeId: newThemeId,
        surpriseId: null,
      });
    } else {
      // Switching to a festival -> hide vibe selection, clear surprise
      updateDraft({
        themeId: newThemeId,
        vibe: null,
        surpriseId: null,
      });
    }
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <SenderHeader step={1} total={4} title="Who's it for?" />

      <main className="flex-1 px-4 sm:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="paper-grain paper-stains rounded-lg p-5 sm:p-6 vignette"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Festival Theme Selector */}
            <div className="mb-6 p-4 rounded-md border bg-amber-900/5 border-amber-900/15">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
                <h3
                  className="font-serif-vintage text-sm font-bold uppercase tracking-wider"
                  style={{ color: "var(--burgundy)" }}
                >
                  Postcard Mode & Theme
                </h3>
              </div>
              <p
                className="font-handwritten text-xs mb-3"
                style={{ color: "var(--ink-soft)" }}
              >
                Chuno Postcard ka avatar — Festival theme ya Classic Celebrity mode!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {FESTIVAL_THEMES.map((theme) => {
                  const selected = (draft.themeId || "classic") === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => handleThemeSelect(theme.id as FestivalThemeId)}
                      className={cn(
                        "relative p-2.5 rounded-md text-left transition-all border vignette flex items-center gap-2.5",
                        selected
                          ? "bg-amber-100/90 border-amber-800 shadow-sm"
                          : "bg-amber-50/50 border-amber-900/20 hover:bg-amber-100/40"
                      )}
                    >
                      <span className="text-2xl shrink-0">{theme.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-serif-vintage text-xs font-bold leading-tight truncate"
                          style={{ color: theme.accentColor }}
                        >
                          {theme.name}
                        </div>
                        <div
                          className="text-[10px] italic leading-tight truncate"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          {theme.tagline}
                        </div>
                      </div>
                      {selected && (
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: theme.accentColor, color: "#fff" }}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <h2
              className="font-serif-vintage text-2xl font-bold mb-1"
              style={{ color: "var(--burgundy)" }}
            >
              Address the postcard
            </h2>
            <p
              className="font-handwritten text-sm mb-5"
              style={{ color: "var(--ink-soft)" }}
            >
              Puraani tarah &mdash; naam, sheher, rishta, aur apna naam bhi.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Receiver's Name"
                emoji="👤"
                placeholder="e.g. Rahul"
                value={draft.receiverName}
                onChange={(v) => updateDraft({ receiverName: v })}
                maxLength={60}
                autoFocus
              />
              <Field
                label="City / Location"
                emoji="📍"
                placeholder="e.g. Mumbai"
                value={draft.city}
                onChange={(v) => updateDraft({ city: v })}
                maxLength={60}
              />
              <Field
                label="Relationship"
                emoji="🤝"
                placeholder="e.g. Best Friend, Bhai, Ma"
                value={draft.relationship}
                onChange={(v) => updateDraft({ relationship: v })}
                maxLength={40}
              />
              <div>
                <span
                  className="font-serif-vintage text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5"
                  style={{ color: "var(--burgundy)" }}
                >
                  <span>✍️</span> Your Name & Sign-off
                </span>
                <input
                  type="text"
                  value={draft.senderName}
                  onChange={(e) => updateDraft({ senderName: e.target.value })}
                  placeholder="e.g. Rahul / Priya"
                  maxLength={60}
                  className="field-vintage w-full font-handwritten text-base px-3 py-2 rounded-md outline-none mb-2"
                  style={{
                    backgroundColor: "rgba(255, 250, 235, 0.7)",
                    border: "1px solid var(--border)",
                    color: "var(--ink)",
                  }}
                />
                {draft.themeId === "rakhi" && (
                  <div className="flex items-center gap-2">
                    <span className="font-handwritten text-xs" style={{ color: "var(--ink-soft)" }}>
                      Sign-off:
                    </span>
                    <button
                      type="button"
                      onClick={() => updateDraft({ senderGender: "male" })}
                      className={cn(
                        "px-2.5 py-1 rounded text-xs font-serif-vintage transition border",
                        (draft.senderGender || "male") === "male"
                          ? "bg-amber-800 text-amber-50 border-amber-900 shadow-sm font-bold"
                          : "bg-amber-50 text-amber-900 border-amber-900/20 opacity-75 hover:opacity-100"
                      )}
                    >
                      Tera, (He / Male)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateDraft({ senderGender: "female" })}
                      className={cn(
                        "px-2.5 py-1 rounded text-xs font-serif-vintage transition border",
                        draft.senderGender === "female"
                          ? "bg-amber-800 text-amber-50 border-amber-900 shadow-sm font-bold"
                          : "bg-amber-50 text-amber-900 border-amber-900/20 opacity-75 hover:opacity-100"
                      )}
                    >
                      Teri, (She / Female)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Vibe selector — Only shown when in Classic / No Festival mode */}
            {!isFestivalMode ? (
              <>
                <AirmailDivider className="my-6" />
                <div>
                  <h3
                    className="font-serif-vintage text-lg font-bold mb-1"
                    style={{ color: "var(--burgundy)" }}
                  >
                    Pick the vibe & celebrity mode
                  </h3>
                  <p
                    className="font-handwritten text-sm mb-4"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    Yeh decide karega ki kaunse Bollywood characters & surprises dikhenge.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {VIBES.map((v) => {
                      const selected = draft.vibe === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => updateDraft({ vibe: v.id as Vibe, surpriseId: null })}
                          className={cn(
                            "vibe-card relative paper-grain rounded-md p-3 text-center vignette",
                            selected && "vibe-card-selected",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          )}
                          style={{
                            border: selected
                              ? `2px solid var(--burgundy)`
                              : `1px solid var(--border)`,
                            backgroundColor: selected ? "#f5e7c0" : "#faf2dc",
                            boxShadow: selected ? "0 6px 16px rgba(90,50,20,0.18)" : undefined,
                          }}
                        >
                          {selected && (
                            <span
                              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center shadow"
                              style={{ backgroundColor: "var(--burgundy)" }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                          <div className="text-3xl mb-1.5">{v.emoji}</div>
                          <div
                            className="font-serif-vintage font-bold text-sm leading-tight"
                            style={{ color: "var(--burgundy)" }}
                          >
                            {v.label}
                          </div>
                          <div
                            className="font-handwritten text-[11px] mt-0.5 leading-tight"
                            style={{ color: "var(--ink-soft)" }}
                          >
                            {v.tagline}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div
                className="mt-6 p-3 rounded-md border border-amber-900/20 text-center"
                style={{ backgroundColor: "rgba(255, 250, 235, 0.6)" }}
              >
                <span className="font-handwritten text-xs" style={{ color: "var(--ink-soft)" }}>
                  🌿 Festival Mode is active — Celebrity & Vibe selection is hidden for festival-specific surprises.
                </span>
              </div>
            )}
          </motion.div>

          {/* nav */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep("intro")}
              className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-70 transition h-11 px-1"
              style={{ color: "var(--ink-soft)" }}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              disabled={!canContinue}
              onClick={() => {
                if (!canContinue) return;
                setStep("surprise");
              }}
              className={cn(
                "btn-vintage font-serif-vintage font-semibold px-6 py-2.5 rounded-md tracking-wide flex items-center gap-2 h-11",
                !canContinue && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              Choose Theme & Surprise
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      <SenderFooter />
    </PaperBackground>
  );
}

function Field({
  label,
  emoji,
  placeholder,
  value,
  onChange,
  maxLength,
  autoFocus,
}: {
  label: string;
  emoji: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span
        className="font-serif-vintage text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5"
        style={{ color: "var(--burgundy)" }}
      >
        <span className="text-sm">{emoji}</span>
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus={autoFocus}
        className="field-vintage w-full font-handwritten text-base px-3 py-2.5 rounded-md outline-none transition-all leading-relaxed"
        style={{
          backgroundColor: "rgba(255, 250, 235, 0.7)",
          border: "1px solid var(--border)",
          color: "var(--ink)",
        }}
      />
    </label>
  );
}

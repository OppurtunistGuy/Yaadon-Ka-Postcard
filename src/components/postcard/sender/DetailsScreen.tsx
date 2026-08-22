"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { CityCombobox } from "./CityCombobox";
import { useSenderStore } from "@/lib/postcard-store";
import { VIBES, type Vibe } from "@/lib/surprises";
import { FESTIVAL_THEMES, type FestivalThemeId } from "@/lib/festival-themes";
import { validateName, validateCityText, validateRelationshipText } from "@/lib/name-validation";
import { cn } from "@/lib/utils";

const RELATIONSHIP_OPTIONS = [
  "Friend",
  "Best Friend",
  "Partner",
  "Spouse",
  "Brother",
  "Sister",
  "Parent",
  "Child",
  "Colleague",
  "Other",
];

export function DetailsScreen() {
  const { draft, updateDraft, setStep } = useSenderStore();

  const isFestivalMode = draft.themeId === "rakhi" || draft.themeId === "ganpati";

  // Form Validation Errors State
  const [receiverError, setReceiverError] = useState<string | undefined>();
  const [cityError, setCityError] = useState<string | undefined>();
  const [relationshipError, setRelationshipError] = useState<string | undefined>();
  const [senderError, setSenderError] = useState<string | undefined>();

  // Custom Relationship text state when "Other" is selected
  const [customRelationship, setCustomRelationship] = useState(() => {
    if (draft.relationship && !RELATIONSHIP_OPTIONS.includes(draft.relationship)) {
      return draft.relationship;
    }
    return "";
  });

  // Validation on Blur
  function handleReceiverBlur() {
    if (!draft.receiverName.trim()) return;
    const res = validateName(draft.receiverName, { fieldName: "Recipient Name", minLen: 2, maxLen: 50 });
    if (!res.valid) {
      setReceiverError("Please enter a valid name.");
    } else {
      setReceiverError(undefined);
      updateDraft({ receiverName: res.normalized });
    }
  }

  function handleCityBlur() {
    if (!draft.city.trim()) return;
    const res = validateCityText(draft.city);
    if (!res.valid) {
      setCityError("Please enter a valid city.");
    } else {
      setCityError(undefined);
      updateDraft({ city: res.normalized });
    }
  }

  function handleSenderBlur() {
    if (!draft.senderName.trim()) return;
    const res = validateName(draft.senderName, { fieldName: "Your Name", minLen: 2, maxLen: 50 });
    if (!res.valid) {
      setSenderError("Please enter a valid name.");
    } else {
      setSenderError(undefined);
      updateDraft({ senderName: res.normalized });
    }
  }

  function handleCustomRelationshipBlur() {
    if (!customRelationship.trim()) return;
    const res = validateRelationshipText(customRelationship);
    if (!res.valid) {
      setRelationshipError("Please enter a valid relationship.");
    } else {
      setRelationshipError(undefined);
      updateDraft({ relationship: res.normalized });
    }
  }

  // Validate all fields on Continue
  function handleContinue() {
    const rRes = validateName(draft.receiverName, { minLen: 2, maxLen: 50 });
    const cRes = validateCityText(draft.city);
    const relText = draft.relationship === "Other" ? customRelationship : draft.relationship;
    const relRes = validateRelationshipText(relText);
    const sRes = validateName(draft.senderName, { minLen: 2, maxLen: 50 });

    let hasError = false;

    if (!rRes.valid) {
      setReceiverError("Please enter a valid name.");
      hasError = true;
    } else {
      setReceiverError(undefined);
      updateDraft({ receiverName: rRes.normalized });
    }

    if (!cRes.valid) {
      setCityError("Please enter a valid city.");
      hasError = true;
    } else {
      setCityError(undefined);
      updateDraft({ city: cRes.normalized });
    }

    if (!relRes.valid) {
      setRelationshipError("Please enter a valid relationship.");
      hasError = true;
    } else {
      setRelationshipError(undefined);
      updateDraft({ relationship: relRes.normalized });
    }

    if (!sRes.valid) {
      setSenderError("Please enter a valid name.");
      hasError = true;
    } else {
      setSenderError(undefined);
      updateDraft({ senderName: sRes.normalized });
    }

    if (hasError) return;

    const isClassic = !draft.themeId || draft.themeId === "classic";
    if (isClassic) {
      updateDraft({ surpriseId: null, vibe: "classic" });
      setStep("message");
    } else {
      setStep("surprise");
    }
  }

  function handleThemeSelect(newThemeId: FestivalThemeId) {
    if (draft.themeId === newThemeId) return;

    if (newThemeId === "classic") {
      updateDraft({
        themeId: newThemeId,
        vibe: "classic",
        surpriseId: null,
      });
    } else {
      updateDraft({
        themeId: newThemeId,
        vibe: null,
        surpriseId: null,
      });
    }
  }

  const isClassic = !draft.themeId || draft.themeId === "classic";

  const selectedRelationship = RELATIONSHIP_OPTIONS.includes(draft.relationship)
    ? draft.relationship
    : draft.relationship
    ? "Other"
    : "";

  return (
    <PaperBackground className="min-h-screen flex flex-col selection:bg-amber-900/10">
      <SenderHeader step={1} total={isClassic ? 3 : 4} title="Who's it for?" />

      <main className="flex-1 px-4 sm:px-8 py-6 box-border min-w-0">
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="paper-grain paper-stains rounded-lg p-5 sm:p-6 vignette border border-amber-900/20 shadow-xs"
            style={{ backgroundColor: "#faf2dc" }}
          >
            {/* Festival Theme Selector */}
            <div className="mb-6 p-4 rounded-md border bg-amber-900/5 border-amber-900/15">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[var(--burgundy)]" />
                <h3
                  className="font-serif-vintage text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--burgundy)]"
                >
                  Postcard Mode & Theme
                </h3>
              </div>
              <p className="font-handwritten text-xs mb-3 text-[var(--ink-soft)]">
                Select your postcard theme — Classic airmail or Festival special!
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
                        "relative p-2.5 rounded-md text-left transition-all border vignette flex items-center gap-2.5 cursor-pointer",
                        selected
                          ? "bg-amber-100/90 border-amber-800 shadow-xs"
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
                        <div className="text-[10px] italic leading-tight truncate text-[var(--ink-soft)]">
                          {theme.tagline}
                        </div>
                      </div>
                      {selected && (
                        <Check className="w-4 h-4 text-[var(--burgundy)] shrink-0 font-bold" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipient Details Form */}
            <div className="space-y-4">
              <div>
                <label className="block font-serif-vintage text-xs font-bold uppercase tracking-wider text-[var(--burgundy)] mb-1">
                  Recipient Name (Kis ke liye hai?)
                </label>
                <input
                  type="text"
                  value={draft.receiverName}
                  onChange={(e) => {
                    updateDraft({ receiverName: e.target.value });
                    if (receiverError) setReceiverError(undefined);
                  }}
                  placeholder="e.g. Rahul Sharma"
                  maxLength={50}
                  className={cn(
                    "field-vintage w-full font-handwritten text-base px-3 py-2 rounded-md outline-none border bg-[#fffceb]",
                    receiverError ? "border-red-600 focus:ring-1 focus:ring-red-600" : "border-[var(--border)]"
                  )}
                />
                {receiverError && <p className="text-xs text-red-600 font-sans mt-1">{receiverError}</p>}
              </div>

              <div>
                <label className="block font-serif-vintage text-xs font-bold uppercase tracking-wider text-[var(--burgundy)] mb-1">
                  City / Location (Kahan rehte hain?)
                </label>
                <CityCombobox
                  value={draft.city}
                  onChange={(city) => {
                    updateDraft({ city });
                    if (cityError) setCityError(undefined);
                  }}
                  error={cityError}
                />
                {cityError && <p className="text-xs text-red-600 font-sans mt-1">{cityError}</p>}
              </div>

              <div>
                <label className="block font-serif-vintage text-xs font-bold uppercase tracking-wider text-[var(--burgundy)] mb-1">
                  Relationship (Kya lagte hain aapke?)
                </label>
                <select
                  value={selectedRelationship}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "Other") {
                      updateDraft({ relationship: "Other" });
                      setCustomRelationship("");
                    } else {
                      updateDraft({ relationship: val });
                      setRelationshipError(undefined);
                    }
                  }}
                  className={cn(
                    "field-vintage w-full font-handwritten text-base px-3 py-2 rounded-md outline-none border bg-[#fffceb] cursor-pointer",
                    relationshipError ? "border-red-600 focus:ring-1 focus:ring-red-600" : "border-[var(--border)]"
                  )}
                >
                  <option value="" disabled>
                    Select Relationship...
                  </option>
                  {RELATIONSHIP_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {selectedRelationship === "Other" && (
                  <input
                    type="text"
                    value={customRelationship}
                    onChange={(e) => {
                      setCustomRelationship(e.target.value);
                      updateDraft({ relationship: e.target.value });
                      if (relationshipError) setRelationshipError(undefined);
                    }}
                    placeholder="Describe relationship (e.g. Childhood Bestie)"
                    maxLength={30}
                    className="field-vintage w-full font-handwritten text-sm px-3 py-2 rounded-md outline-none border border-[var(--border)] bg-[#fffceb] mt-2"
                  />
                )}
                {relationshipError && <p className="text-xs text-red-600 font-sans mt-1">{relationshipError}</p>}
              </div>

              <div>
                <label className="block font-serif-vintage text-xs font-bold uppercase tracking-wider text-[var(--burgundy)] mb-1">
                  Sender Name (Aapka naam?)
                </label>
                <input
                  type="text"
                  value={draft.senderName}
                  onChange={(e) => {
                    updateDraft({ senderName: e.target.value });
                    if (senderError) setSenderError(undefined);
                  }}
                  placeholder="e.g. Your name"
                  maxLength={50}
                  className={cn(
                    "field-vintage w-full font-handwritten text-base px-3 py-2 rounded-md outline-none border bg-[#fffceb]",
                    senderError ? "border-red-600 focus:ring-1 focus:ring-red-600" : "border-[var(--border)]"
                  )}
                />
                {senderError && <p className="text-xs text-red-600 font-sans mt-1">{senderError}</p>}
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setStep("intro")}
              className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-70 transition h-11 px-1 text-[var(--ink-soft)] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleContinue}
              className="btn-vintage font-serif-vintage font-semibold px-6 py-2.5 rounded-md tracking-wide flex items-center gap-2 h-11 cursor-pointer shadow-sm hover:shadow text-sm"
            >
              <span>{isClassic ? "Write your message" : "Choose Festival Surprise"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      <SenderFooter />
    </PaperBackground>
  );
}

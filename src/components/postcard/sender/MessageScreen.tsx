"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eraser, Music, Check, AlertCircle } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { PostcardCard } from "../shared/PostcardCard";
import { useSenderStore } from "@/lib/postcard-store";
import { getSurpriseById, getVibeMeta } from "@/lib/surprises";
import { parseMusicUrl } from "@/lib/security";

const PROMPTS = [
  "Tu chaahe jitna door ho, humsafar wali feeling kabhi nahi badalti...",
  "Aaj khud pe gussa hai kyunki tujhe bahut miss kar raha hu.",
  "Bachpan ki woh chai ki dukaan, aur tu... yaad aata hai.",
  "Tere bina yeh sheher thoda aur sunsaan lagta hai.",
  "Dekh, zyada sentimental mat hona, par tu important hai. Bas.",
];

export function MessageScreen() {
  const { draft, updateDraft, setStep } = useSenderStore();
  const vibeMeta = getVibeMeta(draft.vibe ?? "classic");
  const surprise = getSurpriseById(draft.surpriseId ?? "");
  const showMusicAttachment = draft.vibe === "romantic" || draft.vibe === "action";

  const [rawMusicInput, setRawMusicInput] = useState(draft.musicUrl || "");
  const [musicError, setMusicError] = useState<string | null>(null);

  function handleMusicChange(val: string) {
    setRawMusicInput(val);
    if (!val.trim()) {
      setMusicError(null);
      updateDraft({ musicUrl: null, musicPlatform: null, musicTitle: null });
      return;
    }

    const parsed = parseMusicUrl(val);
    if (parsed) {
      setMusicError(null);
      updateDraft({
        musicUrl: parsed.url,
        musicPlatform: parsed.platform,
        musicTitle: parsed.title,
      });
    } else {
      setMusicError("Only valid YouTube (youtube.com, youtu.be) or Spotify (open.spotify.com) HTTPS links are allowed.");
      updateDraft({ musicUrl: null, musicPlatform: null, musicTitle: null });
    }
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <SenderHeader
        step={3}
        total={4}
        title="Write your message"
        onBack={() => setStep("surprise")}
      />

      <main className="flex-1 px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-[1fr_1.1fr] gap-5 items-start"
          >
            {/* editor column */}
            <div
              className="paper-grain paper-stains rounded-lg p-5 vignette"
              style={{ border: "1px solid var(--border)" }}
            >
              <h2
                className="font-serif-vintage text-xl font-bold mb-1"
                style={{ color: "var(--burgundy)" }}
              >
                Apna dil likho
              </h2>
              <p
                className="font-handwritten text-sm mb-4"
                style={{ color: "var(--ink-soft)" }}
              >
                Jaise chitthi mein likhte the &mdash; thoda lamba, thoda honest.
              </p>

              <textarea
                value={draft.message}
                onChange={(e) => updateDraft({ message: e.target.value })}
                rows={7}
                maxLength={1200}
                placeholder="Dear Rahul, aaj suddenly tera khayal aaya aur socha likh hi du..."
                className="w-full font-handwritten text-base px-3 py-3 rounded-md outline-none resize-y min-h-[170px] transition-all focus:shadow-md ruled-lines leading-[32px]"
                style={{
                  backgroundColor: "rgba(255, 250, 235, 0.6)",
                  border: "1px solid var(--border)",
                  color: "var(--ink)",
                }}
              />
              <div className="flex items-center justify-between mt-2">
                <span
                  className="text-[11px] font-mono"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {draft.message.length}/1200
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateDraft({ message: "" })}
                    className="inline-flex items-center gap-1 text-xs hover:opacity-70 transition"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    Clear
                  </button>
                  <button
                    onClick={() =>
                      updateDraft({
                        message:
                          PROMPTS[Math.floor(Math.random() * PROMPTS.length)],
                      })
                    }
                    className="btn-pastel inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Inspire me
                  </button>
                </div>
              </div>

              {/* Music Attachment section for Romantic & Action Hero vibes */}
              {showMusicAttachment && (
                <div className="mt-4 pt-4 border-t border-dashed border-amber-900/20">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Music className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
                    <h3
                      className="font-serif-vintage text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--burgundy)" }}
                    >
                      🎵 Add a song for them (Optional)
                    </h3>
                  </div>
                  <p
                    className="font-handwritten text-xs mb-2"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    Attach a YouTube or Spotify song link for the receiver.
                  </p>
                  <input
                    type="url"
                    value={rawMusicInput}
                    onChange={(e) => handleMusicChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://open.spotify.com/track/..."
                    className="w-full text-xs font-mono px-3 py-2 rounded-md outline-none transition-all"
                    style={{
                      backgroundColor: "rgba(255, 250, 235, 0.7)",
                      border: musicError
                        ? "1px solid #b91c1c"
                        : draft.musicUrl
                        ? "1px solid #15803d"
                        : "1px solid var(--border)",
                      color: "var(--ink)",
                    }}
                  />
                  {draft.musicUrl && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      Valid {draft.musicPlatform === "youtube" ? "YouTube" : "Spotify"} link attached!
                    </div>
                  )}
                  {musicError && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {musicError}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-dashed" style={{ borderColor: "var(--border)" }}>
                <p
                  className="font-handwritten text-xs leading-relaxed"
                  style={{ color: "var(--ink-soft)" }}
                >
                  💡 Tip: likh aise jaise bol raha hai. Hinglish chalega, emo
                  bhi chalega, thoda ajeeb bhi chalega &mdash; tera hai.
                </p>
              </div>
            </div>

            {/* live preview */}
            <div>
              <div
                className="font-serif-vintage text-[10px] uppercase tracking-[0.2em] mb-2 text-center"
                style={{ color: "var(--ink-soft)" }}
              >
                Live preview
              </div>
              {surprise && (
                <PostcardCard
                  data={{
                    themeId: draft.themeId,
                    receiverName: draft.receiverName,
                    city: draft.city,
                    relationship: draft.relationship,
                    senderName: draft.senderName,
                    message: draft.message,
                    surprise,
                    vibeLabel: vibeMeta.label,
                    vibeEmoji: vibeMeta.emoji,
                    musicUrl: draft.musicUrl,
                    musicPlatform: draft.musicPlatform,
                    musicTitle: draft.musicTitle,
                  }}
                  revealState="hidden"
                  className="animate-float-soft"
                />
              )}
            </div>
          </motion.div>

          {/* nav */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep("surprise")}
              className="text-sm font-medium hover:opacity-70 transition"
              style={{ color: "var(--ink-soft)" }}
            >
              ← Back
            </button>
            <button
              disabled={draft.message.trim().length < 3 || Boolean(musicError)}
              onClick={() =>
                draft.message.trim().length >= 3 && !musicError && setStep("preview")
              }
              className="btn-vintage font-serif-vintage font-semibold px-6 py-2.5 rounded-md tracking-wide flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
            >
              Preview Postcard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
      <SenderFooter />
    </PaperBackground>
  );
}

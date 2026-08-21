"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { SenderHeader, SenderFooter } from "./SenderChrome";
import { PostcardCard } from "../shared/PostcardCard";
import { useSenderStore } from "@/lib/postcard-store";
import { getSurpriseById, getVibeMeta } from "@/lib/surprises";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/use-sound";
import { useSentPostcards } from "@/hooks/use-sent-postcards";

export function PreviewScreen() {
  const { draft, setStep, setGeneratedToken, setSubmitting, isSubmitting, error, setError } =
    useSenderStore();
  const { toast } = useToast();
  const { play } = useSound();
  const { addRecord } = useSentPostcards();
  const vibeMeta = getVibeMeta(draft.vibe ?? "classic");
  const surprise = getSurpriseById(draft.surpriseId ?? "");
  const [revealed, setRevealed] = useState(false);

  async function handleGenerate() {
    if (!surprise) {
      toast({
        title: "Surprise missing",
        description: "Please go back and select a surprise.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setError(null);
    play("stamp");
    try {
      const res = await fetch("/api/postcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          themeId: draft.themeId || "classic",
          receiverName: draft.receiverName,
          city: draft.city,
          relationship: draft.relationship,
          senderName: draft.senderName,
          senderGender: draft.senderGender || "male",
          vibe: draft.vibe || draft.themeId || "classic",
          surpriseId: draft.surpriseId,
          message: draft.message,
          musicUrl: draft.musicUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.errors?.[0] ?? "Could not generate postcard");
      }
      setGeneratedToken(data.token);
      // record locally so sender can re-open later
      addRecord({
        token: data.token,
        receiverName: draft.receiverName,
        city: draft.city,
        vibeLabel: vibeMeta.label,
        vibeEmoji: vibeMeta.emoji,
        senderName: draft.senderName,
        themeId: draft.themeId,
      });
      play("success");
      setStep("share");
      toast({
        title: "Postcard ready! 🎉",
        description: "Your unique link has been generated.",
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      toast({
        title: "Hmm, that didn't work",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <SenderHeader
        step={4}
        total={4}
        title="Preview & send"
        onBack={() => setStep("message")}
      />

      <main className="flex-1 px-4 sm:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-4">
              <h2
                className="font-serif-vintage text-2xl font-bold"
                style={{ color: "var(--burgundy)" }}
              >
                Yeh rahi teri postcard
              </h2>
              <p
                className="font-handwritten text-sm"
                style={{ color: "var(--ink-soft)" }}
              >
                Surprise neeche locked hai &mdash; receiver tap karega to khulega.
              </p>
            </div>

            {surprise && (
              <PostcardCard
                data={{
                  themeId: draft.themeId,
                  receiverName: draft.receiverName,
                  city: draft.city,
                  relationship: draft.relationship,
                  senderName: draft.senderName,
                  senderGender: draft.senderGender,
                  message: draft.message,
                  surprise,
                  vibeLabel: vibeMeta.label,
                  vibeEmoji: vibeMeta.emoji,
                  musicUrl: draft.musicUrl,
                  musicPlatform: draft.musicPlatform,
                  musicTitle: draft.musicTitle,
                }}
                revealState={revealed ? "revealed" : "hidden"}
                onReveal={() => {
                  setRevealed(true);
                  play("reveal");
                }}
              />
            )}

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {revealed ? (
                <button
                  onClick={() => {
                    setRevealed(false);
                    play("paper");
                  }}
                  className="btn-pastel text-xs font-medium px-3 py-1.5 rounded"
                >
                  Re-hide surprise
                </button>
              ) : (
                <span
                  className="font-handwritten text-xs animate-nudge"
                  style={{ color: "var(--ink-soft)" }}
                >
                  👆 tap the blurred area to peek at your surprise
                </span>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <button
                onClick={handleGenerate}
                disabled={isSubmitting}
                className="btn-vintage font-serif-vintage font-bold px-7 py-3 rounded-md tracking-wide text-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Stamping it...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Share Link
                  </>
                )}
              </button>
              {error && (
                <p className="text-xs text-destructive text-center max-w-xs">
                  {error}
                </p>
              )}
              <p
                className="font-handwritten text-xs"
                style={{ color: "var(--ink-soft)" }}
              >
                Generate karte hi unique link milega &mdash; WhatsApp pe bhej de.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <SenderFooter />
    </PaperBackground>
  );
}

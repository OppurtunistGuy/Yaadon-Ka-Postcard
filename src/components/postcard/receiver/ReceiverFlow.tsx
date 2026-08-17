"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Mail, Home } from "lucide-react";
import { ReceiverSplash } from "./ReceiverSplash";
import { ReceiverView } from "./ReceiverView";
import { PaperBackground } from "../shared/PaperBackground";
import { WaxSeal } from "../shared/Decorations";
import { AirmailDivider } from "../shared/AirmailBorder";
import type { Surprise, Vibe } from "@/lib/surprises";

interface FetchedPostcard {
  receiverName: string;
  city: string;
  relationship: string;
  senderName: string;
  message: string;
  vibe: string;
  vibeMeta: { label: string; emoji: string };
  surpriseId: string;
}

interface FetchedSurprise {
  id: string;
  vibe: string;
  type: string;
  title: string;
  character: string;
  movie?: string;
  quote: string;
  caption: string;
  emoji: string;
  gifUrl?: string;
  accent: string;
}

type LoadState = "loading" | "ready" | "notfound" | "error";

export function ReceiverFlow({
  token,
  onGoHome,
}: {
  token: string;
  onGoHome: () => void;
}) {
  const [state, setState] = useState<LoadState>("loading");
  const [postcard, setPostcard] = useState<FetchedPostcard | null>(null);
  const [surprise, setSurprise] = useState<FetchedSurprise | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/postcards/${token}`, { method: "GET" });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setState("notfound");
          return;
        }
        setPostcard(data.postcard);
        setSurprise(data.surprise);
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  function handleOpen() {
    setOpened(true);
    fetch(`/api/postcards/${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "open" }),
    }).catch(() => {});
  }

  function handleReveal() {
    fetch(`/api/postcards/${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reveal" }),
    }).catch(() => {});
  }

  // ----- Loading -----
  if (state === "loading") {
    return (
      <PaperBackground className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex justify-center mb-3">
            <WaxSeal size={56} emoji="📮" />
          </div>
          <Loader2
            className="w-6 h-6 mx-auto animate-spin"
            style={{ color: "var(--burgundy)" }}
          />
          <p
            className="font-handwritten text-base mt-3"
            style={{ color: "var(--ink-soft)" }}
          >
            Postcard nikal rahe hain postbox se...
          </p>
        </motion.div>
      </PaperBackground>
    );
  }

  // ----- Not found / error -----
  if (state === "notfound" || state === "error") {
    return (
      <PaperBackground className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="flex justify-center mb-3">
            <WaxSeal size={64} emoji="📭" />
          </div>
          <h1
            className="font-serif-vintage text-2xl font-bold"
            style={{ color: "var(--burgundy)" }}
          >
            Postcard kho gayi...
          </h1>
          <p
            className="font-handwritten text-sm mt-2"
            style={{ color: "var(--ink-soft)" }}
          >
            {state === "notfound"
              ? "Yeh link galat hai ya postcard post mein ghum gayi. Sender se naya link maang lo."
              : "Kuch gadbad ho gayi. Thodi der mein dobara try karo."}
          </p>
          <AirmailDivider className="max-w-[200px] mx-auto my-5" />
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="btn-pastel text-sm font-semibold px-4 py-2 rounded inline-flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-4 h-4" />
              Try again
            </button>
            <button
              onClick={onGoHome}
              className="btn-vintage text-sm font-semibold px-4 py-2 rounded inline-flex items-center justify-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              Make a postcard
            </button>
          </div>
        </motion.div>
      </PaperBackground>
    );
  }

  // ----- Splash (before open) -----
  if (!opened) {
    return (
      <ReceiverSplash
        senderName={postcard?.senderName}
        city={postcard?.city}
        onOpen={handleOpen}
      />
    );
  }

  // ----- Postcard view (after open) -----
  if (!postcard || !surprise) return null;

  const surpriseTyped: Surprise = {
    id: surprise.id,
    vibe: surprise.vibe as Vibe,
    type: surprise.type as Surprise["type"],
    title: surprise.title,
    character: surprise.character,
    movie: surprise.movie,
    quote: surprise.quote,
    caption: surprise.caption,
    emoji: surprise.emoji,
    gifUrl: surprise.gifUrl,
    accent: surprise.accent,
  };

  return (
    <ReceiverView
      data={{
        receiverName: postcard.receiverName,
        city: postcard.city,
        relationship: postcard.relationship,
        senderName: postcard.senderName,
        message: postcard.message,
        surprise: surpriseTyped,
        vibeLabel: postcard.vibeMeta.label,
        vibeEmoji: postcard.vibeMeta.emoji,
      }}
      onReveal={handleReveal}
      onGoHome={onGoHome}
    />
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ZoomIn, ZoomOut, RotateCcw, Heart, Send } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { PostcardCard } from "../shared/PostcardCard";
import { ReactionBar } from "./ReactionBar";
import { FeedbackForm } from "./FeedbackForm";
import type { PostcardData } from "../shared/PostcardCard";

const ZOOM_STEPS = [0.75, 1.0, 1.25, 1.5, 2.0];

export function ReceiverView({
  data,
  token,
  initialReaction,
  onReveal,
  onGoHome,
}: {
  data: PostcardData;
  token: string;
  initialReaction?: string | null;
  onReveal: () => void;
  onGoHome: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(1); // 1.0 (100%) by default
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef<number | null>(null);

  const currentZoom = ZOOM_STEPS[zoomIndex];

  function handleReveal() {
    setRevealed(true);
    onReveal();
  }

  async function handleClaim() {
    setIsClaimed(true);
    try {
      await fetch(`/api/postcards/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "claim" }),
      });
    } catch {
      // best-effort
    }
  }

  function handleZoomIn() {
    setZoomIndex((prev) => Math.min(prev + 1, ZOOM_STEPS.length - 1));
  }

  function handleZoomOut() {
    setZoomIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleResetZoom() {
    setZoomIndex(1); // 100%
    setPan({ x: 0, y: 0 });
  }

  // Touch pinch-to-zoom on mobile/tablet scoped strictly to the postcard container
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDist.current = dist;
    } else if (e.touches.length === 1 && currentZoom > 1.0) {
      isDragging.current = true;
      dragStart.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDist.current !== null) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const diff = currentDist - initialPinchDist.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) handleZoomIn();
        else handleZoomOut();
        initialPinchDist.current = currentDist;
      }
    } else if (e.touches.length === 1 && isDragging.current && currentZoom > 1.0) {
      setPan({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y,
      });
    }
  };

  const handleTouchEnd = () => {
    initialPinchDist.current = null;
    isDragging.current = false;
  };

  return (
    <PaperBackground className="min-h-screen flex flex-col justify-between selection:bg-amber-900/10">
      {/* Header — Subtle & clean postal bar with reading zoom controls */}
      <header className="px-4 sm:px-8 py-3.5 border-b sticky top-0 z-30 bg-[#f7eed8]/95 backdrop-blur-xs" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
            <span
              className="font-serif-vintage font-bold tracking-tight text-sm sm:text-base"
              style={{ color: "var(--burgundy)" }}
            >
              Yaadon ka Postcard
            </span>
          </div>

          {/* Scoped Postcard Zoom Controls (− 100% + Reset) */}
          <div className="flex items-center gap-1.5 bg-[#faf3e0] border rounded-md px-2 py-1 shadow-2xs" style={{ borderColor: "var(--border)" }}>
            <button
              onClick={handleZoomOut}
              disabled={zoomIndex === 0}
              title="Zoom out"
              aria-label="Zoom out postcard"
              className="p-1 rounded hover:bg-black/5 disabled:opacity-30 transition cursor-pointer text-xs font-bold text-[var(--burgundy)]"
            >
              −
            </button>
            <span className="font-mono text-[11px] font-semibold px-1 min-w-[40px] text-center text-[var(--ink)]">
              {Math.round(currentZoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomIndex === ZOOM_STEPS.length - 1}
              title="Zoom in"
              aria-label="Zoom in postcard"
              className="p-1 rounded hover:bg-black/5 disabled:opacity-30 transition cursor-pointer text-xs font-bold text-[var(--burgundy)]"
            >
              +
            </button>
            {currentZoom !== 1.0 && (
              <button
                onClick={handleResetZoom}
                title="Reset zoom"
                aria-label="Reset zoom"
                className="ml-1 pl-1.5 border-l text-[10px] font-serif-vintage text-[var(--ink-soft)] hover:text-[var(--burgundy)] transition"
                style={{ borderColor: "var(--border)" }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Postcard Reading Viewport */}
      <main className="flex-1 w-full px-3 sm:px-6 py-6 sm:py-10 flex flex-col items-center justify-start overflow-x-hidden">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* Postcard Zoomable Area */}
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full transition-transform duration-200 ease-out origin-top"
            style={{
              transform: `scale(${currentZoom}) translate(${pan.x / currentZoom}px, ${pan.y / currentZoom}px)`,
              touchAction: currentZoom > 1.0 ? "none" : "pan-y",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostcardCard
                data={data}
                revealState={revealed ? "revealed" : "hidden"}
                onReveal={handleReveal}
              />
            </motion.div>
          </div>

          {/* After Reveal: Made you smile & Send one back CTA (Secondary) */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="w-full mt-8 flex flex-col items-center"
              >
                {/* Subtle post-reveal action box */}
                <div
                  className="rounded-lg p-5 border bg-[#faf3e0]/90 text-center max-w-md w-full shadow-xs"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-serif-vintage font-bold text-[var(--burgundy)]">
                    <span>Made you smile?</span>
                    <Heart className="w-4 h-4 fill-red-700 text-red-700" />
                  </div>
                  <p className="font-handwritten text-xs sm:text-sm text-[var(--ink-soft)] mt-1">
                    Send a little memory back to someone you cherish.
                  </p>
                  <button
                    onClick={onGoHome}
                    className="mt-4 btn-vintage font-serif-vintage font-semibold px-6 py-2.5 rounded-md tracking-wide text-sm inline-flex items-center gap-2 shadow-xs hover:shadow transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send a postcard back</span>
                  </button>
                </div>

                {/* Recipient Claim Confirmation Action */}
                <div className="mt-4 text-center">
                  {isClaimed ? (
                    <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-serif-vintage font-bold text-emerald-800 inline-flex items-center gap-1.5 shadow-2xs">
                      <span>✅ Claimed by recipient</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleClaim}
                      className="btn-pastel font-serif-vintage text-xs font-bold px-4 py-2 rounded-md transition border border-amber-900/20 shadow-2xs hover:shadow inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🙋</span>
                      <span>This postcard is for me</span>
                    </button>
                  )}
                </div>

                {/* Reaction bar for quick feedback */}
                <div className="w-full mt-6">
                  <ReactionBar token={token} senderName={data.senderName} initialReaction={initialReaction} />
                </div>

                {/* Receiver Feedback & Star Rating Form (After Reveal) */}
                <div className="w-full">
                  <FeedbackForm token={token} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-5 text-center border-t mt-6" style={{ borderColor: "var(--border)" }}>
        <p
          className="font-serif-vintage text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[var(--ink-soft)]"
        >
          ♡ &mdash; A postcard travels heart to heart. &mdash; ♡
        </p>
      </footer>
    </PaperBackground>
  );
}

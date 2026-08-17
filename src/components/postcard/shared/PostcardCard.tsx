"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { PaperBackground } from "./PaperBackground";
import { AirmailBorder } from "./AirmailBorder";
import { PostageStamp, Postmark } from "./Stamp";
import { WaxSeal, LoveRibbon } from "./Decorations";
import type { Surprise } from "@/lib/surprises";

export interface PostcardData {
  receiverName: string;
  city: string;
  relationship: string;
  senderName: string;
  message: string;
  surprise: Surprise;
  vibeLabel: string;
  vibeEmoji: string;
}

/**
 * The full visual postcard — aged paper, airmail border, stamp + postmark,
 * ruled message area with handwritten text, and a surprise slot at the bottom.
 *
 * `revealState`:
 *  - "hidden" → surprise area is blurred & locked (preview / receiver pre-reveal)
 *  - "revealed" → surprise is shown with reveal animation
 *  - "plain" → no surprise shown at all (sender message step)
 */
export const PostcardCard = forwardRef<
  HTMLDivElement,
  {
    data: PostcardData;
    revealState?: "hidden" | "revealed" | "plain";
    onReveal?: () => void;
    className?: string;
    date?: string;
  }
>(function PostcardCard(
  { data, revealState = "hidden", onReveal, className, date },
  ref
) {
  const isLocked = revealState === "hidden";
  const isRevealed = revealState === "revealed";
  const isPlain = revealState === "plain";

  return (
    <PaperBackground
      className={cn(
        "rounded-lg overflow-hidden shadow-2xl vignette",
        className
      )}
    >
      {/* Airmail outer border */}
      <AirmailBorder thickness="md">
        <div className="p-4 sm:p-5">
          {/* ===== Header: stamps + postmark ===== */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <div
                className="font-serif-vintage italic text-[11px] tracking-wide"
                style={{ color: "var(--ink-soft)" }}
              >
                Inland Postcard · Bharat
              </div>
              <div
                className="font-serif-vintage text-lg sm:text-xl font-bold leading-tight"
                style={{ color: "var(--burgundy)" }}
              >
                Yaadon ka Postcard
              </div>
              <LoveRibbon />
            </div>

            <div className="flex items-start gap-2 shrink-0">
              <Postmark city={data.city || "India"} date={date} animate={isRevealed} />
              <PostageStamp accent={data.surprise.accent} rotate={-4}>
                <div className="w-[52px] h-[60px] flex flex-col items-center justify-center gap-0.5 px-1 py-1">
                  <span className="text-xl leading-none">{data.vibeEmoji}</span>
                  <span
                    className="font-serif-vintage text-[7px] font-bold leading-tight uppercase tracking-wide"
                    style={{ color: "var(--burgundy)" }}
                  >
                    {data.vibeLabel}
                  </span>
                  <span className="text-[6px] leading-tight text-center" style={{ color: "var(--ink-soft)" }}>
                    Postage · ₹2
                  </span>
                </div>
              </PostageStamp>
            </div>
          </div>

          {/* ===== Address line ===== */}
          <div className="mt-3 pb-2 border-b border-dashed" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className="font-serif-vintage text-[10px] uppercase tracking-widest"
                style={{ color: "var(--ink-soft)" }}
              >
                To:
              </span>
              <span
                className="font-serif-vintage font-semibold text-sm"
                style={{ color: "var(--ink)" }}
              >
                {data.receiverName || "My Dear"}
              </span>
              {data.relationship && (
                <span
                  className="text-[11px] italic"
                  style={{ color: "var(--ink-soft)" }}
                >
                  ({data.relationship})
                </span>
              )}
            </div>
            <div
              className="font-handwritten text-xs mt-0.5"
              style={{ color: "var(--ink-soft)" }}
            >
              {data.city ? `✦ ${data.city}` : "✦ Somewhere in the memories"}
            </div>
          </div>

          {/* ===== Message area (ruled lines, handwritten) ===== */}
          <div className="mt-3 ruled-lines min-h-[150px] sm:min-h-[170px] relative">
            <p
              className="font-handwritten text-[17px] sm:text-[19px] leading-[32px] whitespace-pre-wrap break-words pr-1"
              style={{ color: "var(--ink)" }}
            >
              {data.message || "Your heartfelt message will appear here..."}
            </p>
            {/* ink fade at edges */}
            <div className="pointer-events-none absolute inset-0 vignette rounded-sm" />
          </div>

          {/* ===== Signature ===== */}
          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="min-w-0">
              <div
                className="text-[9px] uppercase tracking-widest"
                style={{ color: "var(--ink-soft)" }}
              >
                With love,
              </div>
              <div
                className="font-handwritten-cursive text-2xl sm:text-3xl leading-tight truncate"
                style={{ color: "var(--burgundy)" }}
              >
                {data.senderName || "—"}
              </div>
            </div>
            {!isPlain && (
              <div className="flex items-center gap-2 shrink-0">
                <WaxSeal size={42} emoji={data.vibeEmoji} />
              </div>
            )}
          </div>

          {/* ===== Surprise section ===== */}
          {!isPlain && (
            <SurpriseSlot
              surprise={data.surprise}
              isLocked={isLocked}
              isRevealed={isRevealed}
              onReveal={onReveal}
            />
          )}
        </div>
      </AirmailBorder>
    </PaperBackground>
  );
});

function SurpriseSlot({
  surprise,
  isLocked,
  isRevealed,
  onReveal,
}: {
  surprise: Surprise;
  isLocked: boolean;
  isRevealed: boolean;
  onReveal?: () => void;
}) {
  return (
    <div className="mt-4">
      {/* divider */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <span
          className="font-serif-vintage text-[9px] uppercase tracking-[0.25em]"
          style={{ color: "var(--ink-soft)" }}
        >
          A little surprise
        </span>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      <button
        type="button"
        onClick={isLocked ? onReveal : undefined}
        disabled={!isLocked}
        aria-label={isLocked ? "Tap to reveal the surprise" : undefined}
        className={cn(
          "group relative w-full text-left rounded-md overflow-hidden transition-all",
          isLocked
            ? "cursor-pointer hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            : "cursor-default"
        )}
        style={{
          border: `1px dashed ${surprise.accent}`,
          backgroundColor: isLocked ? "rgba(243, 230, 196, 0.5)" : "transparent",
        }}
      >
        {isLocked ? (
          <div className="p-4 flex items-center justify-center gap-3 min-h-[110px]">
            {/* blurred preview */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
              <div className="blur-md scale-110 opacity-60">
                <span className="text-5xl">{surprise.emoji}</span>
              </div>
            </div>
            <div className="relative flex flex-col items-center gap-1 text-center z-10">
              <span
                className="text-2xl animate-float-soft"
                aria-hidden
              >
                🎁
              </span>
              <span
                className="font-serif-vintage text-sm font-semibold"
                style={{ color: "var(--burgundy)" }}
              >
                Tap here to reveal your surprise!
              </span>
              <span
                className="text-[10px] italic"
                style={{ color: "var(--ink-soft)" }}
              >
                Shhh... it's a secret worth the wait
              </span>
            </div>
          </div>
        ) : (
          <div className={cn("p-4", isRevealed && "animate-reveal")}>
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-md flex items-center justify-center text-2xl shrink-0 shadow-inner"
                style={{
                  backgroundColor: surprise.accent,
                  color: "#fff",
                }}
              >
                {surprise.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className="font-serif-vintage font-bold text-sm"
                    style={{ color: "var(--ink)" }}
                  >
                    {surprise.character}
                  </span>
                  {surprise.movie && (
                    <span
                      className="text-[10px] italic"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      · {surprise.movie}
                    </span>
                  )}
                </div>
                <div
                  className="font-handwritten text-[15px] leading-snug mt-1"
                  style={{ color: "var(--ink)" }}
                >
                  &ldquo;{surprise.quote}&rdquo;
                </div>
                <div
                  className="text-[11px] mt-1.5 italic"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {surprise.caption}
                </div>
                {surprise.gifUrl && (
                  <a
                    href={surprise.gifUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-[10px] font-medium underline decoration-dotted underline-offset-2 hover:opacity-80"
                    style={{ color: "var(--postal-blue)" }}
                  >
                    ▶ Watch the moment
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}

"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { PaperBackground } from "./PaperBackground";
import { AirmailBorder } from "./AirmailBorder";
import { PostageStamp, Postmark } from "./Stamp";
import { WaxSeal } from "./Decorations";
import { GifDisplay } from "./GifDisplay";
import type { Surprise } from "@/lib/surprises";
import { getFestivalTheme } from "@/lib/festival-themes";
import { validateHttpsUrl } from "@/lib/security";
import { ExternalLink } from "lucide-react";

export interface PostcardData {
  themeId?: string | null;
  receiverName: string;
  city: string;
  relationship: string;
  senderName: string;
  message: string;
  surprise: Surprise;
  vibeLabel: string;
  vibeEmoji: string;
  musicUrl?: string | null;
  musicPlatform?: "youtube" | "spotify" | null;
  musicTitle?: string | null;
}

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

  const theme = getFestivalTheme(data.themeId);
  const validatedMusicUrl = validateHttpsUrl(data.musicUrl);

  return (
    <PaperBackground
      ref={ref}
      className={cn(
        "rounded-lg overflow-hidden shadow-2xl vignette relative",
        className
      )}
      style={{ backgroundColor: theme.paperTint }}
    >
      {/* Airmail outer border */}
      <AirmailBorder thickness="md">
        <div className="p-4 sm:p-5 relative">
          {/* Corner theme decoration icon */}
          {theme.cornerDecorationEmoji && (
            <div
              className="absolute top-2 right-2 text-sm opacity-40 select-none pointer-events-none"
              aria-hidden
            >
              {theme.cornerDecorationEmoji}
            </div>
          )}

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
                style={{ color: theme.accentColor }}
              >
                Yaadon ka Postcard
              </div>
              <div
                className="inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase"
                style={{ color: "var(--ink-soft)" }}
              >
                <span>{theme.ribbonText}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 shrink-0">
              <Postmark
                label={theme.postmarkText}
                city={data.city || "India"}
                date={date}
                animate={isRevealed}
              />
              <PostageStamp accent={theme.accentColor} rotate={-4}>
                <div className="w-[54px] h-[62px] flex flex-col items-center justify-center gap-0.5 px-1 py-1">
                  <span className="text-xl leading-none">{data.vibeEmoji}</span>
                  <span
                    className="font-serif-vintage text-[7px] font-bold leading-tight uppercase tracking-wide text-center"
                    style={{ color: theme.accentColor }}
                  >
                    {theme.stampLabel}
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
                style={{ color: theme.accentColor }}
              >
                {data.senderName || "—"}
              </div>
            </div>
            {!isPlain && (
              <div className="flex items-center gap-2 shrink-0">
                <WaxSeal size={42} emoji={theme.waxSealEmoji} />
              </div>
            )}
          </div>

          {/* ===== Surprise section ===== */}
          {!isPlain && data.surprise && (
            <SurpriseSlot
              surprise={data.surprise}
              themeAccent={theme.accentColor}
              isLocked={isLocked}
              isRevealed={isRevealed}
              onReveal={onReveal}
              musicUrl={validatedMusicUrl}
              musicPlatform={data.musicPlatform}
              musicTitle={data.musicTitle}
            />
          )}
        </div>
      </AirmailBorder>
    </PaperBackground>
  );
});

function SurpriseSlot({
  surprise,
  themeAccent,
  isLocked,
  isRevealed,
  onReveal,
  musicUrl,
  musicPlatform,
  musicTitle,
}: {
  surprise: Surprise;
  themeAccent: string;
  isLocked: boolean;
  isRevealed: boolean;
  onReveal?: () => void;
  musicUrl?: string | null;
  musicPlatform?: "youtube" | "spotify" | null;
  musicTitle?: string | null;
}) {
  const accent = surprise.accent || themeAccent;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <span
          className="font-serif-vintage text-[9px] uppercase tracking-[0.25em]"
          style={{ color: "var(--ink-soft)" }}
        >
          {musicUrl ? "Surprise & Song 🎵" : "A little surprise"}
        </span>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      <div
        className={cn(
          "group relative w-full text-left rounded-md overflow-hidden transition-all",
          isLocked
            ? "cursor-pointer hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            : "cursor-default"
        )}
        style={{
          border: `1.5px dashed ${accent}`,
          backgroundColor: isLocked ? "rgba(243, 230, 196, 0.5)" : "#faf2dc",
        }}
        onClick={isLocked ? onReveal : undefined}
      >
        {isLocked ? (
          <div className="p-4 flex items-center justify-center gap-3 min-h-[110px]">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
              <div className="blur-md scale-110 opacity-60">
                <span className="text-5xl">{surprise.emoji}</span>
              </div>
            </div>
            <div className="relative flex flex-col items-center gap-1 text-center z-10">
              <span className="text-2xl animate-float-soft" aria-hidden>
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
                Shhh... it&apos;s a secret worth the wait
              </span>
            </div>
          </div>
        ) : (
          <div className={cn("p-4", isRevealed && "animate-reveal")}>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center text-2xl shrink-0 shadow-inner"
                  style={{
                    backgroundColor: accent,
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
                </div>
              </div>

              {/* Music Card — Only opens upon explicit user interaction */}
              {musicUrl && (
                <div
                  className="mt-1 p-3 rounded-md flex items-center justify-between gap-3 border vignette"
                  style={{
                    backgroundColor: "rgba(122,31,35,0.06)",
                    borderColor: accent,
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-900 text-amber-100 text-sm animate-pulse shrink-0">
                      🎵
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-serif-vintage text-xs font-bold" style={{ color: "var(--burgundy)" }}>
                        A song for you
                      </div>
                      <div className="text-[10px] italic truncate" style={{ color: "var(--ink-soft)" }}>
                        {musicTitle || (musicPlatform === "spotify" ? "Spotify Track" : "YouTube Song")}
                      </div>
                    </div>
                  </div>

                  <a
                    href={musicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-serif-vintage font-bold px-3 py-1.5 rounded shadow-sm hover:shadow transition shrink-0"
                    style={{
                      backgroundColor: musicPlatform === "spotify" ? "#1db954" : "#ff0000",
                      color: "#ffffff",
                    }}
                  >
                    <span>Listen on {musicPlatform === "spotify" ? "Spotify" : "YouTube"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Render selected GIF safely via GifDisplay */}
              <GifDisplay gif={surprise.gif || surprise.gifUrl} title={surprise.title} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

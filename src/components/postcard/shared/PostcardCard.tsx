"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { PaperBackground } from "./PaperBackground";
import { AirmailBorder } from "./AirmailBorder";
import { PostageStamp, Postmark } from "./Stamp";
import { WaxSeal } from "./Decorations";
import { GifDisplay } from "./GifDisplay";
import { VirtualRakhiDisplay } from "./VirtualRakhiDisplay";
import type { Surprise } from "@/lib/surprises";
import { getFestivalTheme } from "@/lib/festival-themes";
import { getGanpatiImage } from "@/lib/festival-assets";
import { validateHttpsUrl } from "@/lib/security";
import { ExternalLink, Sparkles } from "lucide-react";

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
              <PostageStamp accent={theme.accentColor}>
                <div className="px-2 py-1.5 min-w-[54px] min-h-[64px] flex flex-col items-center justify-center">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-amber-900/70">
                    {theme.stampLabel}
                  </div>
                  <div className="text-xl my-0.5">{data.vibeEmoji || "📮"}</div>
                  <div className="text-[8px] font-serif-vintage italic text-amber-950 font-bold">
                    {data.vibeLabel || "Special"}
                  </div>
                </div>
              </PostageStamp>
            </div>
          </div>

          <div className="my-3 h-px" style={{ background: "var(--border)" }} />

          {/* ===== Main body: Message & Recipient ===== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: Message column */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3 min-h-[140px]">
              <div>
                <div
                  className="font-serif-vintage text-xs uppercase tracking-wider font-bold mb-1"
                  style={{ color: "var(--burgundy)" }}
                >
                  Priy {data.receiverName || "Dost"},
                </div>

                <div
                  className="font-handwritten text-base leading-relaxed whitespace-pre-wrap break-words"
                  style={{ color: "var(--ink)" }}
                >
                  {data.message ||
                    "Yahan tera message hoga — dil se likhi hui do baatein..."}
                </div>
              </div>

              <div className="pt-2 text-right">
                <div
                  className="font-handwritten text-sm italic"
                  style={{ color: "var(--ink-soft)" }}
                >
                  Tera / Teri,
                </div>
                <div
                  className="font-handwritten text-base font-bold"
                  style={{ color: "var(--burgundy)" }}
                >
                  {data.senderName || "Aapka Dost"}
                </div>
              </div>
            </div>

            {/* Right: Recipient lines */}
            <div
              className="md:col-span-5 flex flex-col justify-center space-y-3 pt-3 md:pt-0 md:border-l md:pl-4"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="space-y-2 font-handwritten text-sm">
                <div>
                  <span
                    className="font-serif-vintage text-[10px] font-bold uppercase tracking-wider block"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    To:
                  </span>
                  <div
                    className="border-b pb-0.5 font-semibold text-base"
                    style={{ borderColor: "var(--border)", color: "var(--ink)" }}
                  >
                    {data.receiverName || "___________"}
                  </div>
                </div>

                <div>
                  <span
                    className="font-serif-vintage text-[10px] font-bold uppercase tracking-wider block"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    City / Address:
                  </span>
                  <div
                    className="border-b pb-0.5"
                    style={{ borderColor: "var(--border)", color: "var(--ink)" }}
                  >
                    {data.city || "___________"}
                  </div>
                </div>

                <div>
                  <span
                    className="font-serif-vintage text-[10px] font-bold uppercase tracking-wider block"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    Rishta:
                  </span>
                  <div
                    className="border-b pb-0.5 text-xs italic"
                    style={{ borderColor: "var(--border)", color: "var(--ink-soft)" }}
                  >
                    {data.relationship || "___________"}
                  </div>
                </div>
              </div>

              {/* Wax Seal */}
              <div className="flex justify-end pt-1">
                <WaxSeal size={42} emoji={theme.waxSealEmoji} />
              </div>
            </div>
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
  const isRakhiMode = surprise.vibe === "rakhi" || !!surprise.rakhiId;
  const isGanpatiMode = surprise.vibe === "ganpati" || !!surprise.ganpatiImgId;
  const ganpatiImage = isGanpatiMode ? getGanpatiImage(surprise.ganpatiImgId) : null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <span
          className="font-serif-vintage text-[9px] uppercase tracking-[0.25em]"
          style={{ color: "var(--ink-soft)" }}
        >
          {isRakhiMode ? "🪡 Virtual Rakhi Gift" : isGanpatiMode ? "🕉️ Ganpati Bappa Blessing" : musicUrl ? "Surprise & Song 🎵" : "A little surprise"}
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
                {isRakhiMode ? "🪡" : isGanpatiMode ? "🕉️" : "🎁"}
              </span>
              <span
                className="font-serif-vintage text-sm font-semibold"
                style={{ color: "var(--burgundy)" }}
              >
                {isRakhiMode ? "Tap to tie Virtual Rakhi!" : isGanpatiMode ? "Tap to receive Bappa's Blessings!" : "Tap here to reveal your surprise!"}
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
              {/* Virtual Rakhi Component */}
              {isRakhiMode ? (
                <div className="bg-amber-50/70 p-3 rounded-md border border-amber-900/20 text-center">
                  <div className="font-serif-vintage text-sm font-bold mb-1" style={{ color: "#991b1b" }}>
                    {surprise.title}
                  </div>
                  <div className="font-handwritten text-xs italic mb-2 text-amber-900/80">
                    &ldquo;{surprise.quote}&rdquo;
                  </div>
                  <VirtualRakhiDisplay rakhiId={surprise.rakhiId || "rakhi-gold-om"} isTied={true} />
                </div>
              ) : isGanpatiMode && ganpatiImage ? (
                /* Ganpati Bappa Image Attachment Display */
                <div className="bg-amber-50/80 p-3 rounded-md border border-amber-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{ganpatiImage.emoji}</span>
                    <div>
                      <div className="font-serif-vintage text-sm font-bold" style={{ color: "#b91c1c" }}>
                        {ganpatiImage.title}
                      </div>
                      <div className="text-[11px] italic" style={{ color: "var(--ink-soft)" }}>
                        {ganpatiImage.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-md overflow-hidden border border-amber-900/20 shadow-md mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ganpatiImage.imageUrl}
                      alt={ganpatiImage.title}
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <p className="text-amber-100 font-handwritten text-sm drop-shadow-md">
                        &ldquo;{ganpatiImage.blessing}&rdquo;
                      </p>
                    </div>
                  </div>

                  <p className="font-handwritten text-xs text-center italic" style={{ color: "var(--ink-soft)" }}>
                    &ldquo;{surprise.quote}&rdquo;
                  </p>
                </div>
              ) : (
                /* Standard Character Surprise Header */
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
              )}

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

              {/* Render selected GIF safely via GifDisplay (if not Virtual Rakhi / Ganpati Image) */}
              {!isRakhiMode && !isGanpatiMode && (
                <GifDisplay gif={surprise.gif || surprise.gifUrl} title={surprise.title} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

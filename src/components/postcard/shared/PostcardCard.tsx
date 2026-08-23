"use client";

import { forwardRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PaperBackground } from "./PaperBackground";
import { AirmailBorder } from "./AirmailBorder";
import { PostageStamp, Postmark } from "./Stamp";
import { WaxSeal } from "./Decorations";
import { GifDisplay } from "./GifDisplay";
import { VirtualRakhiDisplay } from "./VirtualRakhiDisplay";
import { FaintRakhiBackground, FaintGanpatiBackground, RakhiImageBackground, GanpatiImageBackground } from "./FaintRakhiBackground";
import type { Surprise } from "@/lib/surprises";
import { getFestivalTheme } from "@/lib/festival-themes";
import { getGanpatiImage } from "@/lib/festival-assets";
import { validateHttpsUrl } from "@/lib/security";
import { ExternalLink, Sparkles, BookOpen } from "lucide-react";

export interface PostcardData {
  themeId?: string | null;
  receiverName: string;
  city: string;
  relationship: string;
  senderName: string;
  senderGender?: "male" | "female" | null;
  message: string;
  surprise?: Surprise | null;
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
  const [expandedMessage, setExpandedMessage] = useState(false);
  const [stampState, setStampState] = useState<"theme" | "postmark">("postmark");

  useEffect(() => {
    if (data.themeId !== "rakhi" && data.themeId !== "ganpati") {
      setStampState("postmark");
      return;
    }

    const timer = setInterval(() => {
      setStampState((prev) => (prev === "theme" ? "postmark" : "theme"));
    }, 3500);

    return () => clearInterval(timer);
  }, [data.themeId]);

  let themeBadgeIcon = "✨";
  let themeBadgeLabel = "CLASSIC POSTCARD";

  if (data.themeId === "rakhi") {
    themeBadgeIcon = "🌸";
    themeBadgeLabel = "RAKHI SPECIAL";
  } else if (data.themeId === "ganpati") {
    themeBadgeIcon = "🕉️";
    themeBadgeLabel = "GANPATI SPECIAL";
  }

  const theme = getFestivalTheme(data.themeId);
  const validatedMusicUrl = validateHttpsUrl(data.musicUrl);

  const rawMessage = data.message || "Yahan tera message hoga — dil se likhi hui do baatein...";
  const isLongMessage = rawMessage.length > 300;
  const visibleMessage = isLongMessage && !expandedMessage ? `${rawMessage.slice(0, 280)}...` : rawMessage;

  const startsWithGreeting = /^(dear|priy|pyaare|hello|hi|namaste)\b/i.test(rawMessage.trim());
  const receiverName = data.receiverName || "Dost";
  const formattedGreeting = startsWithGreeting ? "" : `Dear ${receiverName},`;

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
          {/* Official Theme Background Image Assets (Low Opacity Multiply Blend) */}
          {data.themeId === "rakhi" && <RakhiImageBackground />}
          {data.themeId === "ganpati" && <GanpatiImageBackground />}

          {/* Corner theme decoration icon */}
          {theme.cornerDecorationEmoji && (
            <div
              className="absolute top-2 right-2 text-sm opacity-40 select-none pointer-events-none"
              aria-hidden
            >
              {theme.cornerDecorationEmoji}
            </div>
          )}

          {/* ===== Header: Theme Badge, Title & Dynamic Stamp ===== */}
          <div className="flex items-start justify-between gap-3">
            {/* Left: Theme Badge & Postcard Title */}
            <div className="flex flex-col gap-1 min-w-0">
              {/* Theme Identity Badge (Approved Mockup Spec) */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-dashed text-[10px] font-serif-vintage tracking-widest font-bold uppercase w-fit"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--burgundy)",
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                }}
              >
                <span>{themeBadgeIcon}</span>
                <span>{themeBadgeLabel}</span>
              </div>

              {/* Postcard Main Title */}
              <div
                className="font-serif-vintage text-lg sm:text-xl font-bold leading-tight mt-0.5"
                style={{ color: theme.accentColor }}
              >
                Yaadon ka Postcard
              </div>

              {/* Subtitle / Ribbon */}
              <div
                className="inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase"
                style={{ color: "var(--ink-soft)" }}
              >
                <span>{theme.ribbonText || "♡ POSTED WITH LOVE ♡"}</span>
              </div>
            </div>

            {/* Right: Fixed-size Stamp Container (Zero Layout Shift) */}
            <div className="shrink-0 w-[92px] h-[92px] relative flex items-center justify-center">
              {data.themeId !== "rakhi" && data.themeId !== "ganpati" ? (
                /* CLASSIC MODE: Fixed timestamp postmark only */
                <Postmark
                  label={theme.postmarkText}
                  city={data.city || "India"}
                  date={date}
                  animate={isRevealed}
                />
              ) : (
                /* RAKHI / GANPATI SPECIAL MODE: Alternates every 3-5 sec */
                <AnimatePresence mode="wait">
                  {stampState === "postmark" ? (
                    <motion.div
                      key="postmark-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Postmark
                        label={theme.postmarkText}
                        city={data.city || "India"}
                        date={date}
                        animate={false}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="theme-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <PostageStamp accent={theme.accentColor} rotate={-3}>
                        <div className="px-1.5 py-1 min-w-[56px] min-h-[64px] max-w-[70px] max-h-[72px] flex flex-col items-center justify-center text-center">
                          <div className="text-xl my-0.5">{themeBadgeIcon}</div>
                          <div className="text-[8px] font-serif-vintage uppercase font-bold tracking-wider text-amber-950 leading-tight">
                            {themeBadgeLabel}
                          </div>
                        </div>
                      </PostageStamp>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          <div className="my-3 h-px" style={{ background: "var(--border)" }} />

          {/* ===== Main body: Message & Recipient ===== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: Message column */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3 min-h-[130px]">
              <div>
                {formattedGreeting && (
                  <div
                    className="font-serif-vintage text-xs sm:text-sm font-bold mb-1.5 leading-snug"
                    style={{ color: "var(--burgundy)" }}
                  >
                    {formattedGreeting}
                  </div>
                )}
                <div
                  className="font-handwritten text-base leading-relaxed whitespace-pre-wrap break-words"
                  style={{ color: "var(--ink)" }}
                >
                  {visibleMessage}
                </div>

                {isLongMessage && (
                  <button
                    type="button"
                    onClick={() => setExpandedMessage(!expandedMessage)}
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-serif-vintage font-bold text-[var(--burgundy)] hover:underline cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3 shrink-0" />
                    <span>{expandedMessage ? "Show postcard message" : "Read full message"}</span>
                  </button>
                )}
              </div>

              <div className="pt-1 text-right">
                <div
                  className="font-handwritten text-sm italic"
                  style={{ color: "var(--ink-soft)" }}
                >
                  With love,
                </div>
                <div
                  className="font-handwritten text-base font-bold"
                  style={{ color: "var(--burgundy)" }}
                >
                  {data.senderName || "Aapka Dost"}
                </div>
              </div>
            </div>

            {/* Right: Recipient lines (To & City / Address only) */}
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
              </div>

              {/* Wax Seal */}
              <div className="flex justify-end pt-1">
                <WaxSeal size={42} emoji={theme.waxSealEmoji} />
              </div>
            </div>
          </div>

          {/* ===== Surprise section (Rendered ONLY when an actual theme/attachment surprise exists) ===== */}
          {!isPlain &&
            Boolean(
              data.surprise &&
                data.surprise.id &&
                data.surprise.id !== "none"
            ) &&
            data.surprise && (
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
    <div className="mt-5 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
      {/* Postal separator heading */}
      <div className="flex items-center gap-2 mb-2 text-center justify-center">
        <div className="h-px w-12" style={{ background: "var(--border)" }} />
        <span
          className="font-serif-vintage text-[9px] uppercase tracking-[0.25em]"
          style={{ color: "var(--ink-soft)" }}
        >
          {isRevealed
            ? isRakhiMode
              ? "🪡 Virtual Rakhi Attached"
              : isGanpatiMode
              ? "🕉️ Ganpati Bappa Blessing"
              : "✨ Revealed Surprise"
            : "🔒 Something is hidden"}
        </span>
        <div className="h-px w-12" style={{ background: "var(--border)" }} />
      </div>

      <div
        className={cn(
          "group relative w-full text-left rounded-md overflow-hidden transition-all duration-300",
          isLocked
            ? "cursor-pointer hover:shadow-md border-dashed border-amber-900/30"
            : "border border-amber-900/20 shadow-xs"
        )}
        style={{
          backgroundColor: isLocked ? "rgba(243, 230, 196, 0.45)" : "#faf2dc",
        }}
        onClick={isLocked ? onReveal : undefined}
      >
        {isLocked ? (
          <div className="relative p-5 min-h-[120px] flex flex-col items-center justify-center overflow-hidden select-none">
            {/* Real underlying surprise blurred out so receiver sees something authentic is tucked inside */}
            <div
              className="absolute inset-0 p-4 opacity-40 filter blur-[14px] pointer-events-none select-none flex items-center justify-center gap-4 scale-95"
              aria-hidden
            >
              <div className="text-4xl">{surprise.emoji || "🎁"}</div>
              <div className="space-y-1">
                <div className="h-4 w-32 bg-amber-950/40 rounded" />
                <div className="h-3 w-48 bg-amber-950/30 rounded" />
              </div>
            </div>

            {/* Locked Prompt Overlay */}
            <div className="relative z-10 text-center flex flex-col items-center gap-1.5 py-1">
              <span className="text-xl leading-none">🔒</span>
              <div
                className="font-serif-vintage text-sm sm:text-base font-bold tracking-tight"
                style={{ color: "var(--burgundy)" }}
              >
                Something is hidden
              </div>
              <div
                className="font-handwritten text-xs sm:text-sm text-[var(--ink-soft)]"
              >
                Tap to discover it
              </div>
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
                /* Ganpati Bappa Illustrated Card Display */
                <div className="bg-amber-50/90 p-3 rounded-md border border-amber-900/20 shadow-xs text-center">
                  <div className="relative rounded-md overflow-hidden border border-amber-900/20 shadow-sm mb-2 bg-[#FAF4E6]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ganpatiImage.imageUrl}
                      alt={ganpatiImage.title}
                      className="w-full h-auto max-h-48 object-contain mx-auto"
                    />
                  </div>
                  <div className="p-2 rounded bg-amber-100/60 border border-amber-900/10">
                    <p className="text-amber-950 font-serif-vintage text-xs font-bold leading-tight">
                      &ldquo;{ganpatiImage.blessing}&rdquo;
                    </p>
                    <p className="font-handwritten text-xs italic mt-0.5 text-amber-900/80">
                      &ldquo;{surprise.quote}&rdquo;
                    </p>
                  </div>
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

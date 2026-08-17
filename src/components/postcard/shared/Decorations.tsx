"use client";

import { cn } from "@/lib/utils";

/**
 * Wax seal — embossed red wax look. Use as a decorative flourish.
 */
export function WaxSeal({
  className,
  size = 64,
  emoji = "✉",
  animate = false,
}: {
  className?: string;
  size?: number;
  emoji?: string;
  animate?: boolean;
}) {
  return (
    <div
      className={cn(
        "wax-seal flex items-center justify-center rounded-full shrink-0",
        animate && "animate-stamp-drop",
        className
      )}
      style={{ width: size, height: size }}
    >
      <span
        style={{
          fontSize: size * 0.36,
          filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.4))",
        }}
        className="opacity-90"
      >
        {emoji}
      </span>
    </div>
  );
}

/**
 * Decorative old-paper "torn tape" sticker.
 */
export function Tape({
  children,
  className,
  rotate = -3,
}: {
  children?: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      className={cn("tape px-3 py-1 rounded-sm text-xs", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

/**
 * "Posted with Love" vintage badge — a small ribbon.
 */
export function LoveRibbon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase",
        className
      )}
      style={{ color: "var(--ink-soft)" }}
    >
      <span>♡</span>
      <span>Posted with love</span>
      <span>♡</span>
    </div>
  );
}

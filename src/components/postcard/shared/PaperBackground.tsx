"use client";

import { cn } from "@/lib/utils";

/**
 * Aged paper background with subtle grain + stains.
 * Use as a wrapper to give any area the vintage parchment look.
 */
export function PaperBackground({
  children,
  className,
  stains = true,
}: {
  children?: React.ReactNode;
  className?: string;
  stains?: boolean;
}) {
  return (
    <div
      className={cn(
        "paper-grain relative",
        stains && "paper-stains",
        className
      )}
      style={{
        backgroundColor: "var(--paper)",
      }}
    >
      {children}
    </div>
  );
}

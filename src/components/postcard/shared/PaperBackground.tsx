"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Aged paper background with subtle grain + stains.
 * Use as a wrapper to give any area the vintage parchment look.
 */
export const PaperBackground = forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode;
    className?: string;
    stains?: boolean;
    style?: React.CSSProperties;
  }
>(function PaperBackground({ children, className, stains = true, style }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "paper-grain relative",
        stains && "paper-stains",
        className
      )}
      style={{
        backgroundColor: "var(--paper)",
        ...style,
      }}
    >
      {children}
    </div>
  );
});

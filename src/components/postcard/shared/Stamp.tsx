"use client";

import { cn } from "@/lib/utils";

/**
 * Postage stamp — perforated edge, vintage illustration slot.
 */
export function PostageStamp({
  children,
  className,
  rotate = -6,
  accent = "#7a1f23",
}: {
  children?: React.ReactNode;
  className?: string;
  rotate?: number;
  accent?: string;
}) {
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* perforated edge using dashed border + background dots */}
      <div
        className="relative p-1.5 rounded-[3px]"
        style={{
          background: `radial-gradient(circle at 3px 3px, var(--paper) 2px, transparent 2.5px) 0 0 / 7px 7px,
                      radial-gradient(circle at 3px 3px, var(--paper) 2px, transparent 2.5px) 3.5px 3.5px / 7px 7px`,
          backgroundColor: "var(--paper)",
        }}
      >
        <div
          className="relative rounded-[2px] overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            border: `1px solid ${accent}`,
            backgroundColor: "#f3e6c4",
            boxShadow: "inset 0 0 8px rgba(90,50,20,0.18)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Postmark — circular cancellation stamp overlay.
 */
export function Postmark({
  label = "Posted",
  date,
  city,
  className,
  animate = false,
}: {
  label?: string;
  date?: string;
  city?: string;
  className?: string;
  animate?: boolean;
}) {
  const d = date ?? new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" });
  return (
    <div
      className={cn(
        "postmark flex flex-col items-center justify-center w-[88px] h-[88px] text-center select-none",
        animate && "animate-stamp-drop",
        className
      )}
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
    >
      <span className="text-[8px] leading-tight font-bold tracking-wider px-2">
        {label}
      </span>
      <span className="text-[9px] leading-tight font-semibold mt-0.5">{city ?? "India"}</span>
      <span className="text-[8px] leading-tight mt-0.5">{d}</span>
    </div>
  );
}

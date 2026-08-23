"use client";

import { cn } from "@/lib/utils";

/**
 * Postage stamp — authentic perforated edge with notched border,
 * drop shadow, and subtle grunge texture. Vintage illustration slot inside.
 */
export function PostageStamp({
  children,
  className,
  rotate = -6,
  accent = "#7a1f23",
  shadow = true,
}: {
  children?: React.ReactNode;
  className?: string;
  rotate?: number;
  accent?: string;
  shadow?: boolean;
}) {
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        filter: shadow
          ? "drop-shadow(1px 2px 2px rgba(60,30,10,0.28))"
          : undefined,
      }}
    >
      {/* Perforated edge: paper-coloured dots punched out around the border.
          We build the notched edge using a radial-gradient mask on a wrapper. */}
      <div
        className="relative p-[6px]"
        style={{
          // The "paper" showing through perforations
          backgroundColor: "var(--paper)",
          // Notched scallop border via radial-gradient dots
          backgroundImage:
            "radial-gradient(circle at 4px 4px, transparent 3px, var(--paper) 3.2px)",
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0",
        }}
      >
        {/* Inner stamp body */}
        <div
          className="relative rounded-[2px] overflow-hidden flex flex-col items-center justify-center text-center paper-grain"
          style={{
            border: `1.5px solid ${accent}`,
            backgroundColor: "#f3e6c4",
            boxShadow:
              "inset 0 0 10px rgba(90,50,20,0.22), inset 0 0 0 1px rgba(255,255,255,0.3)",
          }}
        >
          {/* inner thin frame line (like real stamp borders) */}
          <div
            className="absolute inset-[3px] rounded-[1px] pointer-events-none"
            style={{ border: `0.5px solid ${accent}55` }}
          />
          {/* subtle ink-grunge overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(90,50,20,0.15) 0%, transparent 30%), radial-gradient(circle at 70% 80%, rgba(90,50,20,0.12) 0%, transparent 25%)",
            }}
          />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Postmark — circular cancellation stamp overlay with ink-bleed texture.
 */
export function Postmark({
  label = "POSTED",
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
  const d =
    date ??
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).toUpperCase();

  const rawCity = city ? city.trim().toUpperCase() : "POSTCARD";
  const displayCity = rawCity.includes("BHARAT") ? "POSTCARD" : rawCity;
  const displayLabel = label.toUpperCase().includes("BHARAT") ? "POSTED" : label.toUpperCase();

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-[92px] h-[92px] text-center select-none shrink-0",
        animate && "animate-stamp-drop",
        className
      )}
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
    >
      {/* Outer circular ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "1.5px solid var(--postal-red)",
          opacity: 0.8,
        }}
      />
      {/* Dashed inner ring */}
      <div
        className="absolute inset-[4px] rounded-full pointer-events-none"
        style={{
          border: "1px dashed var(--postal-red)",
          opacity: 0.6,
        }}
      />
      {/* Ink bleed texture overlay */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, transparent 40%, rgba(180,53,31,0.12) 70%), radial-gradient(circle at 75% 70%, transparent 50%, rgba(180,53,31,0.1) 80%)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Text content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-1"
        style={{ color: "var(--postal-red)", opacity: 0.85 }}
      >
        <span className="text-[8px] leading-tight font-bold tracking-[0.14em] uppercase flex items-center gap-0.5">
          <span>{displayLabel}</span>
          <span className="text-[7px] opacity-70">♡</span>
        </span>
        <span className="text-[9px] leading-tight font-bold tracking-wider mt-0.5 uppercase truncate max-w-[76px]">
          {displayCity}
        </span>
        <span className="text-[8px] leading-tight font-semibold mt-0.5 opacity-90">
          {d}
        </span>
      </div>
    </div>
  );
}

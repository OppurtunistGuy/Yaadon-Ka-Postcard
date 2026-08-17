"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

/**
 * Floating ambient sound toggle. Sits in a fixed position so it's available
 * across all screens. Uses Web Audio API (no external files).
 */
export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Mute ambient sounds" : "Enable ambient sounds"}
      title={enabled ? "Sound on — click to mute" : "Sound off — click to enable"}
      className={cn(
        "fixed z-50 bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        enabled ? "animate-sound-pulse" : "",
        className
      )}
      style={{
        backgroundColor: enabled ? "var(--burgundy)" : "rgba(60,40,20,0.5)",
        color: "#f7eed8",
        border: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </button>
  );
}

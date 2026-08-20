"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { getVirtualRakhi, type VirtualRakhi } from "@/lib/festival-assets";
import { cn } from "@/lib/utils";

interface VirtualRakhiDisplayProps {
  rakhiId?: string | null;
  rakhi?: VirtualRakhi;
  compact?: boolean;
  interactive?: boolean;
  onTie?: () => void;
  isTied?: boolean;
}

export function VirtualRakhiDisplay({
  rakhiId,
  rakhi: customRakhi,
  compact = false,
  interactive = false,
  onTie,
  isTied = true,
}: VirtualRakhiDisplayProps) {
  const rakhi = customRakhi || getVirtualRakhi(rakhiId);

  return (
    <div className={cn("relative flex flex-col items-center justify-center my-3 select-none", compact ? "py-1" : "py-3")}>
      {/* Golden Thread Horizontal Line */}
      <div className="relative w-full flex items-center justify-center">
        {/* Left Thread Tassels */}
        <div
          className="h-1 flex-1 rounded-l-full shadow-sm relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${rakhi.threadColor} 30%, ${rakhi.beadColor} 70%, ${rakhi.accent} 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>

        {/* Left Gold Beads */}
        <div className="flex items-center gap-1 mx-1 z-10">
          <span className="w-2.5 h-2.5 rounded-full shadow-md border border-amber-300" style={{ backgroundColor: rakhi.beadColor }} />
          <span className="w-3.5 h-3.5 rounded-full shadow-md border border-amber-200" style={{ backgroundColor: "#fbbf24" }} />
          <span className="w-2.5 h-2.5 rounded-full shadow-md border border-amber-300" style={{ backgroundColor: rakhi.beadColor }} />
        </div>

        {/* Central Rakhi Dial */}
        <motion.div
          initial={isTied ? { scale: 0.9, rotate: -5 } : { scale: 1 }}
          animate={isTied ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : { scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "relative rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300 z-20 cursor-pointer",
            compact ? "w-14 h-14" : "w-20 h-20"
          )}
          style={{
            background: `radial-gradient(circle, #fef3c7 0%, ${rakhi.accent} 70%, #78350f 100%)`,
            boxShadow: `0 0 20px ${rakhi.accent}66, 0 4px 12px rgba(0,0,0,0.25)`,
          }}
          onClick={onTie}
        >
          {/* Outer Zardosi Flower Petals */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-200/80 animate-spin-slow" />

          {/* Golden Ring */}
          <div className="w-4/5 h-4/5 rounded-full border border-amber-300/90 flex items-center justify-center bg-amber-100/90 shadow-inner">
            <span className={cn(compact ? "text-xl" : "text-3xl", "drop-shadow-md")}>
              {rakhi.centerEmoji}
            </span>
          </div>

          {/* Floating Sparkle Badges */}
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 text-amber-400"
          >
            <Sparkles className="w-4 h-4 fill-amber-300" />
          </motion.span>
        </motion.div>

        {/* Right Gold Beads */}
        <div className="flex items-center gap-1 mx-1 z-10">
          <span className="w-2.5 h-2.5 rounded-full shadow-md border border-amber-300" style={{ backgroundColor: rakhi.beadColor }} />
          <span className="w-3.5 h-3.5 rounded-full shadow-md border border-amber-200" style={{ backgroundColor: "#fbbf24" }} />
          <span className="w-2.5 h-2.5 rounded-full shadow-md border border-amber-300" style={{ backgroundColor: rakhi.beadColor }} />
        </div>

        {/* Right Thread Tassels */}
        <div
          className="h-1 flex-1 rounded-r-full shadow-sm relative overflow-hidden"
          style={{
            background: `linear-gradient(270deg, transparent 0%, ${rakhi.threadColor} 30%, ${rakhi.beadColor} 70%, ${rakhi.accent} 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>

      {/* Rakhi Tag */}
      {!compact && (
        <div className="mt-2 text-center">
          <div
            className="font-serif-vintage text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full shadow-sm"
            style={{ backgroundColor: "rgba(254, 243, 199, 0.95)", color: rakhi.accent, border: `1px solid ${rakhi.accent}44` }}
          >
            <Heart className="w-3 h-3 fill-current" />
            Virtual Rakhi Attached
          </div>
          <p className="font-handwritten text-xs mt-1 text-amber-900/80 italic">
            &ldquo;{rakhi.tagline}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

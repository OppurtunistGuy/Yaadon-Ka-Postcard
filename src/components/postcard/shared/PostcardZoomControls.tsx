"use client";

import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PostcardZoomControlsProps {
  scalePercent: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  className?: string;
}

export function PostcardZoomControls({
  scalePercent,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onReset,
  className,
}: PostcardZoomControlsProps) {
  return (
    <div
      className={cn(
        "zoom-controls inline-flex items-center gap-1.5",
        className
      )}
      role="toolbar"
      aria-label="Postcard zoom controls"
    >
      <button
        type="button"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        aria-label="Zoom out postcard"
        title="Zoom out (−)"
        className="p-1 rounded hover:bg-amber-100 disabled:opacity-40 transition-colors"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <span
        className="zoom-level text-xs font-semibold px-1"
        aria-live="polite"
        title="Current Zoom Level"
      >
        {scalePercent}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        aria-label="Zoom in postcard"
        title="Zoom in (+)"
        className="p-1 rounded hover:bg-amber-100 disabled:opacity-40 transition-colors"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      <div className="h-3 w-px bg-amber-900/20 mx-0.5" aria-hidden />

      <button
        type="button"
        onClick={onReset}
        disabled={scalePercent === 100}
        aria-label="Reset zoom to 100%"
        title="Reset zoom"
        className="px-1.5 py-0.5 text-[10px] font-serif-vintage uppercase tracking-wider rounded hover:bg-amber-100 disabled:opacity-40 transition-colors flex items-center gap-1"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Reset</span>
      </button>
    </div>
  );
}

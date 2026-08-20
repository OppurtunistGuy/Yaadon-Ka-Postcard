"use client";

import React, { useState, useEffect } from "react";
import { normalizeGif, type SelectedGif } from "@/lib/surprises";

export interface GifDisplayProps {
  gif?: SelectedGif | string | null;
  title?: string;
  compact?: boolean;
  className?: string;
}

export function GifDisplay({ gif, title, compact = false, className = "" }: GifDisplayProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const selectedGif: SelectedGif | undefined =
    typeof gif === "string" ? normalizeGif(gif, title) : gif ?? undefined;

  const initialMediaUrl = selectedGif?.mediaUrl?.trim();
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(initialMediaUrl);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    setCurrentSrc(selectedGif?.mediaUrl?.trim());
  }, [selectedGif?.mediaUrl]);

  useEffect(() => {
    if (selectedGif) {
      console.log("Selected GIF:", selectedGif);
      console.log("GIF media URL:", currentSrc);
    }
  }, [selectedGif, currentSrc]);

  const isValidMediaUrl =
    Boolean(currentSrc) &&
    !currentSrc!.includes("tenor.com/view/") &&
    !currentSrc!.includes("tenor.com/embed/") &&
    !currentSrc!.includes("tenor.com/search/");

  if (!selectedGif || !isValidMediaUrl || hasError) {
    if (selectedGif && (!isValidMediaUrl || hasError)) {
      console.error("GIF failed to load or has invalid URL:", selectedGif);
    }
    if (selectedGif) {
      return (
        <div
          className={`mt-2 rounded-md p-3 bg-amber-900/10 border border-amber-900/20 text-center select-none ${className}`}
        >
          <span className="text-xl">🎬</span>
          <div className="text-[11px] font-serif-vintage italic mt-0.5 text-amber-900/70">
            {selectedGif.title || title || "Bollywood Surprise"}
          </div>
        </div>
      );
    }
    return null;
  }

  function handleImageError() {
    // Attempt fallback from media1.tenor.com/m/ to c.tenor.com/ if primary CDN blocked/failed
    if (currentSrc && currentSrc.includes("media1.tenor.com/m/")) {
      const fallback = currentSrc.replace("media1.tenor.com/m/", "c.tenor.com/");
      console.warn("Primary GIF host failed, attempting secondary CDN:", fallback);
      setCurrentSrc(fallback);
      return;
    }
    console.error("GIF failed to load:", selectedGif);
    setIsLoading(false);
    setHasError(true);
  }

  return (
    <div
      className={`relative mt-2 rounded-md overflow-hidden border border-amber-900/20 bg-black/5 flex items-center justify-center ${
        compact ? "max-h-28" : "max-h-60 min-h-[140px]"
      } ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-900/5 text-xs text-amber-900/60 font-serif-vintage italic">
          Loading GIF...
        </div>
      )}
      <img
        src={currentSrc}
        alt={selectedGif.title || title || "Bollywood Surprise GIF"}
        className={`w-full object-cover rounded-md transition-opacity duration-300 ${
          compact ? "max-h-28" : "max-h-60"
        } ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ZOOM_STEPS = [0.75, 1.0, 1.25, 1.5, 2.0] as const;
const DEFAULT_INDEX = 1; // 1.0 = 100%

export interface PostcardZoom {
  scale: number;
  scalePercent: number; // 75, 100, 125, 150, 200
  canZoomIn: boolean;
  canZoomOut: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function usePostcardZoom(): PostcardZoom {
  const [stepIndex, setStepIndex] = useState<number>(DEFAULT_INDEX);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scale = ZOOM_STEPS[stepIndex];
  const scalePercent = Math.round(scale * 100);
  const canZoomIn = stepIndex < ZOOM_STEPS.length - 1;
  const canZoomOut = stepIndex > 0;

  const zoomIn = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
  }, []);

  const zoomOut = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setStepIndex(DEFAULT_INDEX);
  }, []);

  // Desktop Ctrl + wheel support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      if (e.deltaY < 0) {
        setStepIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
      } else if (e.deltaY > 0) {
        setStepIndex((i) => Math.max(i - 1, 0));
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch pinch-to-zoom support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startDist = 0;
    let startIndex = DEFAULT_INDEX;
    let isPinching = false;

    function dist(touches: TouchList) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 2) return;
      isPinching = true;
      startDist = dist(e.touches);
      startIndex = stepIndex;
      el?.classList.add("is-pinching");
    }

    function onTouchMove(e: TouchEvent) {
      if (!isPinching || e.touches.length !== 2) return;
      if (e.cancelable) e.preventDefault();
      const currentDist = dist(e.touches);
      const ratio = currentDist / (startDist || 1);

      const delta = ratio > 1.2 ? 1 : ratio < 0.8 ? -1 : 0;
      const newIndex = Math.min(
        Math.max(startIndex + delta, 0),
        ZOOM_STEPS.length - 1
      );
      setStepIndex(newIndex);
    }

    function onTouchEnd(e: TouchEvent) {
      if (e.touches.length < 2) {
        isPinching = false;
        el?.classList.remove("is-pinching");
      }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [stepIndex]);

  return {
    scale,
    scalePercent,
    canZoomIn,
    canZoomOut,
    zoomIn,
    zoomOut,
    reset,
    containerRef,
  };
}

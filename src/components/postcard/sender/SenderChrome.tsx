"use client";

import { Mail, ChevronLeft } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { useSenderStore } from "@/lib/postcard-store";

/**
 * Shared sender screen chrome — header with step indicator + footer tagline.
 */
export function SenderHeader({
  step,
  total,
  title,
  onBack,
}: {
  step: number;
  total: number;
  title: string;
  onBack?: () => void;
}) {
  const setStep = useSenderStore((s) => s.setStep);
  const handleBack = onBack ?? (() => setStep("intro"));

  return (
    <header className="px-4 sm:px-8 pt-5 pb-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-70 transition"
          style={{ color: "var(--ink-soft)" }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
          <span
            className="font-serif-vintage font-bold tracking-wide text-sm sm:text-base"
            style={{ color: "var(--burgundy)" }}
          >
            {title}
          </span>
        </div>

        <StepPips step={step} total={total} />
      </div>
      <AirmailDivider className="mt-3" />
    </header>
  );
}

function StepPips({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <span
            key={n}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: active
                ? "var(--burgundy)"
                : done
                ? "var(--gold)"
                : "var(--border)",
              transform: active ? "scale(1.3)" : "scale(1)",
            }}
          />
        );
      })}
    </div>
  );
}

export function SenderFooter() {
  return (
    <footer className="px-4 sm:px-8 pb-5 pt-4 text-center">
      <p
        className="font-serif-vintage text-[10px] tracking-[0.2em] uppercase"
        style={{ color: "var(--ink-soft)" }}
      >
        ♡ &mdash; Send a postcard. Share a feeling. Create a memory. &mdash; ♡
      </p>
    </footer>
  );
}

export { PaperBackground };

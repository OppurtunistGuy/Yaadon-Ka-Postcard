"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, MessageSquare } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

export function FeedbackForm({
  token,
  initialRating,
  initialComment,
  initialIsPublic,
  initialPublicName,
}: {
  token: string;
  initialRating?: number | null;
  initialComment?: string | null;
  initialIsPublic?: boolean;
  initialPublicName?: string | null;
}) {
  const [rating, setRating] = useState<number>(initialRating ?? 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(initialComment ?? "");
  const [isPublic, setIsPublic] = useState<boolean>(initialIsPublic ?? false);
  const [nameInput, setNameInput] = useState<string>(initialPublicName ?? "");
  const [submitted, setSubmitted] = useState<boolean>(Boolean(initialRating));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { play } = useSound();

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (rating < 1) return;

    setIsSubmitting(true);
    play("click");

    try {
      await fetch(`/api/postcards/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "feedback",
          rating,
          comment: comment.trim(),
          isPublic,
          publicName: isPublic ? nameInput.trim() : null,
        }),
      });
      setSubmitted(true);
      play("success");
    } catch {
      // best-effort
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="mt-6 p-4 sm:p-5 rounded-lg border bg-[#faf3e0]/95 max-w-md mx-auto shadow-xs text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-center gap-1.5 mb-1 text-sm sm:text-base font-serif-vintage font-bold text-[var(--burgundy)]">
        <MessageSquare className="w-4 h-4 text-[var(--burgundy)]" />
        <span>Rate your experience</span>
      </div>
      <p className="font-handwritten text-xs text-[var(--ink-soft)] mb-3">
        Kaisa laga postcard experience? Apka feedback humare liye maaynay rakhta hai.
      </p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-amber-100/60 rounded-md border border-amber-900/10 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-serif-vintage text-xs font-bold text-amber-950">
            Shukriya! Feedback submit ho gaya. ✨
          </span>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="ml-auto text-[11px] font-sans text-amber-900 underline hover:opacity-80"
          >
            Edit
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 1–5 Star Interactive Rating */}
          <div className="flex items-center justify-center gap-1.5 my-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (hoverRating || rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform transform hover:scale-110 focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      active
                        ? "fill-amber-500 text-amber-500"
                        : "text-amber-900/30 hover:text-amber-500/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Optional Comment */}
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={300}
              rows={2}
              placeholder="Optional comment / feedback (max 300 chars)..."
              className="w-full text-xs font-handwritten px-3 py-2 rounded-md outline-none border border-[var(--border)] bg-[#fffceb] text-[var(--ink)] resize-none"
            />
            <div className="text-[10px] text-right font-mono text-[var(--ink-soft)]">
              {comment.length}/300
            </div>
          </div>

          {/* Checkbox: Show my name with this feedback */}
          <div className="text-left space-y-2 pt-1 border-t border-amber-900/10">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-amber-900/30 text-[var(--burgundy)] focus:ring-0 cursor-pointer"
              />
              <span className="font-serif-vintage text-xs font-medium text-[var(--burgundy)]">
                Show my name with this feedback
              </span>
            </label>

            {/* Name Field appears ONLY when selected */}
            <AnimatePresence>
              {isPublic && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Your Name (e.g. Rahul Sharma)"
                    maxLength={50}
                    className="w-full text-xs font-handwritten px-3 py-2 rounded-md outline-none border border-[var(--border)] bg-[#fffceb] text-[var(--ink)]"
                  />
                  <p className="text-[10px] text-amber-900/70 italic mt-0.5">
                    Will be displayed publicly as First Name / First Name + Last Initial.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rating < 1 || isSubmitting}
            className="w-full btn-vintage font-serif-vintage text-xs font-bold py-2 rounded-md transition shadow-2xs hover:shadow disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}

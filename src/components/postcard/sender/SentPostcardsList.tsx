"use client";

import { motion } from "framer-motion";
import { Mail, Clock, Trash2, ArrowRight } from "lucide-react";
import type { SentPostcardRecord } from "@/hooks/use-sent-postcards";
import Link from "next/link";

const HOMEPAGE_LIMIT = 5;

export function SentPostcardsList({
  records,
  onOpen,
  onDelete,
  onClear,
  showAll = false,
}: {
  records: SentPostcardRecord[];
  onOpen: (token: string) => void;
  onDelete: (token: string) => void;
  onClear: () => void;
  showAll?: boolean;
}) {
  if (records.length === 0) return null;

  const displayRecords = showAll ? records : records.slice(0, HOMEPAGE_LIMIT);
  const hasMore = !showAll && records.length > HOMEPAGE_LIMIT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="w-full max-w-2xl mx-auto mt-12 mb-6"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3 px-1 border-b pb-2" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
          <h3
            className="font-serif-vintage text-base sm:text-lg font-bold tracking-tight"
            style={{ color: "var(--burgundy)" }}
          >
            Postcards you&apos;ve sent
          </h3>
          <span
            className="text-[11px] px-1.5 py-0.5 rounded font-mono font-medium"
            style={{ backgroundColor: "rgba(122,31,35,0.08)", color: "var(--burgundy)" }}
          >
            {records.length}
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-[11px] font-serif-vintage tracking-wider hover:opacity-75 transition"
          style={{ color: "var(--ink-soft)" }}
        >
          Clear all
        </button>
      </div>

      {/* Slip List */}
      <div className="divide-y rounded-md overflow-hidden bg-[#faf3e0]/80 border shadow-xs" style={{ borderColor: "var(--border)" }}>
        {displayRecords.map((r, idx) => {
          const dateStr = new Date(r.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          });

          return (
            <motion.div
              key={r.token}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-black/[0.02] transition group"
            >
              {/* Emoji Badge Box — Matching Screenshot */}
              <div className="w-10 h-10 rounded-xl bg-amber-900/10 border border-amber-900/20 flex items-center justify-center text-2xl shrink-0 select-none shadow-2xs">
                {r.vibeEmoji || "💌"}
              </div>

              {/* Middle content: Recipient + Vibe Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5 truncate">
                  <span className="font-serif-vintage font-bold text-sm text-[var(--ink)]">
                    To: {r.receiverName}
                  </span>
                  <span className="text-xs text-[var(--ink-soft)] opacity-80">
                    · {r.city}
                  </span>
                </div>
                <div className="font-handwritten text-xs text-[var(--ink-soft)] flex items-center gap-1.5 mt-0.5">
                  <span className="font-semibold text-amber-950">{r.vibeLabel}</span>
                  <span>· from {r.senderName}</span>
                </div>
              </div>

              {/* Right Side: Date + External Link + Trash */}
              <div className="flex items-center gap-3 shrink-0 text-right">
                <span className="text-xs font-mono text-[var(--ink-soft)] opacity-70 hidden sm:inline">
                  {dateStr}
                </span>
                <button
                  onClick={() => onOpen(r.token)}
                  aria-label="Open postcard"
                  className="p-1.5 rounded hover:bg-black/5 transition text-[var(--burgundy)]"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(r.token)}
                  aria-label="Delete record"
                  className="opacity-50 hover:opacity-100 p-1.5 transition text-[var(--ink-soft)] hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
        {/* Footer info bar inside box — Matching Image 2 */}
        <div className="px-4 py-2.5 bg-amber-900/5 text-center border-t text-[11px] font-serif-vintage text-[var(--ink-soft)] opacity-90 flex items-center justify-center gap-1.5" style={{ borderColor: "var(--border)" }}>
          <span>📅 Saved on this device only</span>
          <span>&bull;</span>
          <span>{records.length} postcard{records.length === 1 ? "" : "s"}</span>
        </div>
      </div>

      {/* View All Link (Scalability for 10, 20, 50, 100 postcards) */}
      {hasMore && (
        <div className="mt-3 text-center">
          <Link
            href="/postcards"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif-vintage font-semibold py-1 px-3 rounded hover:underline transition"
            style={{ color: "var(--burgundy)" }}
          >
            <span>View all postcards ({records.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}

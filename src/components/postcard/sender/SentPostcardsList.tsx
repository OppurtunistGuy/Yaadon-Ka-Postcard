"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Trash2, ExternalLink, Mail, ChevronDown } from "lucide-react";
import { AirmailDivider } from "../shared/AirmailBorder";
import type { SentPostcardRecord } from "@/hooks/use-sent-postcards";

const PAGE_SIZE = 5;

export function SentPostcardsList({
  records,
  onOpen,
  onDelete,
  onClear,
}: {
  records: SentPostcardRecord[];
  onOpen: (token: string) => void;
  onDelete: (token: string) => void;
  onClear: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (records.length === 0) return null;

  const visibleRecords = records.slice(0, visibleCount);
  const hasMore = visibleCount < records.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="max-w-2xl mx-auto mt-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
          <h3
            className="font-serif-vintage text-base font-bold"
            style={{ color: "var(--burgundy)" }}
          >
            Postcards you&apos;ve sent
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold"
            style={{ backgroundColor: "rgba(122,31,35,0.1)", color: "var(--burgundy)" }}
          >
            {records.length}
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-[10px] uppercase tracking-wider hover:opacity-70 transition font-serif-vintage"
          style={{ color: "var(--ink-soft)" }}
        >
          Clear all
        </button>
      </div>

      <AirmailDivider className="mb-3" />

      {/* Compact Scrollable Area */}
      <div
        className="space-y-2 max-h-80 overflow-y-auto pr-1 rounded-md"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--burgundy) transparent",
        }}
      >
        {visibleRecords.map((r, idx) => {
          const dateStr = new Date(r.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          });

          return (
            <motion.div
              key={r.token}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="paper-grain rounded-md p-2.5 flex items-center justify-between gap-3 vignette group hover:shadow-sm transition-all"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "#faf2dc",
              }}
            >
              {/* Mini stamp badge */}
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 shadow-inner"
                style={{
                  backgroundColor: "var(--burgundy)",
                  color: "#f7eed8",
                  border: "1px solid #5a1518",
                }}
              >
                <span className="text-sm">{r.vibeEmoji || "💌"}</span>
              </div>

              {/* Information text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span
                    className="font-serif-vintage font-bold text-xs sm:text-sm truncate"
                    style={{ color: "var(--ink)" }}
                  >
                    To: {r.receiverName}
                  </span>
                  <span
                    className="text-[10px] italic truncate"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    · {r.city}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span
                    className="font-handwritten text-xs truncate"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {r.vibeLabel} · from {r.senderName}
                  </span>
                  <span
                    className="text-[9px] font-mono opacity-60"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    · {dateStr}
                  </span>
                </div>
              </div>

              {/* View / Delete actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpen(r.token)}
                  className="inline-flex items-center gap-1 text-xs font-serif-vintage font-semibold px-2 py-1 rounded hover:bg-black/5 transition"
                  style={{ color: "var(--postal-blue)" }}
                >
                  <ExternalLink className="w-3 h-3" />
                  View
                </button>
                <button
                  onClick={() => onDelete(r.token)}
                  aria-label="Delete postcard record"
                  className="inline-flex items-center gap-1 text-xs font-serif-vintage px-2 py-1 rounded hover:bg-black/5 transition opacity-60 hover:opacity-100"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More Pagination Button */}
      {hasMore && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="btn-pastel inline-flex items-center gap-1.5 text-xs font-serif-vintage font-semibold px-4 py-1.5 rounded-full shadow-sm hover:shadow transition"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            Load more ({records.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <Mail className="w-3 h-3" style={{ color: "var(--ink-soft)" }} />
        <span
          className="font-handwritten text-[11px]"
          style={{ color: "var(--ink-soft)" }}
        >
          Saved on this device · Showing {visibleRecords.length} of {records.length}
        </span>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Clock, Trash2, ExternalLink, Mail } from "lucide-react";
import { AirmailDivider } from "../shared/AirmailBorder";
import type { SentPostcardRecord } from "@/hooks/use-sent-postcards";

/**
 * "Postcards I've sent" — shows recently created postcards from localStorage.
 * Lets the sender quickly re-open or delete a previously generated link.
 */
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
  if (records.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="max-w-2xl mx-auto mt-10"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
          <h3
            className="font-serif-vintage text-base font-bold"
            style={{ color: "var(--burgundy)" }}
          >
            Postcards you&apos;ve sent
          </h3>
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

      <div className="space-y-2">
        {records.map((r, idx) => (
          <motion.div
            key={r.token}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className="paper-grain paper-stains rounded-md p-3 flex items-center gap-3 vignette group"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "#faf2dc",
            }}
          >
            {/* mini stamp */}
            <div
              className="w-10 h-10 rounded-sm flex flex-col items-center justify-center shrink-0 shadow-inner"
              style={{
                backgroundColor: "var(--burgundy)",
                color: "#f7eed8",
                border: "1px solid #5a1518",
              }}
            >
              <span className="text-base leading-none">{r.vibeEmoji}</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span
                  className="font-serif-vintage font-semibold text-sm truncate"
                  style={{ color: "var(--ink)" }}
                >
                  To: {r.receiverName}
                </span>
                <span
                  className="text-[10px] italic"
                  style={{ color: "var(--ink-soft)" }}
                >
                  · {r.city}
                </span>
              </div>
              <div
                className="font-handwritten text-xs truncate"
                style={{ color: "var(--ink-soft)" }}
              >
                {r.vibeLabel} · from {r.senderName}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onOpen(r.token)}
                aria-label="Open as receiver"
                title="Preview as receiver"
                className="p-1.5 rounded hover:bg-black/5 transition"
                style={{ color: "var(--postal-blue)" }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(r.token)}
                aria-label="Delete from recent"
                title="Remove"
                className="p-1.5 rounded hover:bg-black/5 transition opacity-60 hover:opacity-100"
                style={{ color: "var(--ink-soft)" }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <Mail className="w-3 h-3" style={{ color: "var(--ink-soft)" }} />
        <span
          className="font-handwritten text-[11px]"
          style={{ color: "var(--ink-soft)" }}
        >
          Saved on this device only · {records.length}{" "}
          {records.length === 1 ? "postcard" : "postcards"}
        </span>
      </div>
    </motion.div>
  );
}

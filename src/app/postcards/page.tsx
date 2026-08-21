"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, Trash2, Search, Clock, ExternalLink } from "lucide-react";
import { PaperBackground } from "@/components/postcard/shared/PaperBackground";
import { AirmailDivider } from "@/components/postcard/shared/AirmailBorder";
import { useSentPostcards } from "@/hooks/use-sent-postcards";

export default function PostcardsHistoryPage() {
  const { records, removeRecord, clear } = useSentPostcards();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = records.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      r.receiverName.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.senderName.toLowerCase().includes(q) ||
      r.vibeLabel.toLowerCase().includes(q)
    );
  });

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-8 pt-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif-vintage font-bold hover:opacity-75 transition"
            style={{ color: "var(--burgundy)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Postcard Desk</span>
          </Link>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
            <span className="font-serif-vintage font-bold text-sm sm:text-base" style={{ color: "var(--burgundy)" }}>
              Postcards Mailbox
            </span>
          </div>
        </div>
      </header>

      {/* Main Mailbox Content */}
      <main className="flex-1 px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Top Title & Clear Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif-vintage font-extrabold text-2xl sm:text-3xl" style={{ color: "var(--burgundy)" }}>
                Sent Postcards History
              </h1>
              <p className="font-handwritten text-sm text-[var(--ink-soft)] mt-0.5">
                Every memory you&apos;ve posted from this device.
              </p>
            </div>

            {records.length > 0 && (
              <button
                onClick={clear}
                className="text-xs font-serif-vintage px-3 py-1.5 rounded border self-start sm:self-auto hover:bg-black/5 transition"
                style={{ borderColor: "var(--border)", color: "var(--ink-soft)" }}
              >
                Clear Entire Mailbox
              </button>
            )}
          </div>

          {/* Search Box */}
          {records.length > 0 && (
            <div className="relative mb-6">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" style={{ color: "var(--ink)" }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by receiver name, city, sender or vibe..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-md border font-serif-vintage focus:outline-none focus:ring-1"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "#faf3e0",
                  color: "var(--ink)",
                }}
              />
            </div>
          )}

          {/* List of Sent Postcards */}
          {records.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-lg border bg-[#faf3e0]/60" style={{ borderColor: "var(--border)" }}>
              <div className="text-4xl mb-3">📭</div>
              <h3 className="font-serif-vintage font-bold text-lg" style={{ color: "var(--burgundy)" }}>
                No sent postcards yet
              </h3>
              <p className="font-handwritten text-sm text-[var(--ink-soft)] mt-1 max-w-sm mx-auto">
                Once you create and share a postcard with someone special, it will appear here in your mailbox.
              </p>
              <Link
                href="/"
                className="mt-5 btn-vintage font-serif-vintage font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-md inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Create your first postcard
              </Link>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="text-center py-12 text-xs sm:text-sm text-[var(--ink-soft)] font-serif-vintage">
              No postcards found matching &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            <div className="divide-y rounded-md overflow-hidden bg-[#faf3e0]/90 border shadow-xs" style={{ borderColor: "var(--border)" }}>
              {filteredRecords.map((r) => {
                const dateStr = new Date(r.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={r.token}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-black/[0.02] transition"
                  >
                    {/* Emoji badge */}
                    <div className="text-2xl sm:text-3xl shrink-0 select-none">
                      {r.vibeEmoji || "💌"}
                    </div>

                    {/* Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 truncate">
                        <span className="font-serif-vintage font-bold text-sm sm:text-base text-[var(--ink)]">
                          To {r.receiverName}
                        </span>
                        <span className="text-xs text-[var(--ink-soft)] opacity-80">
                          · {r.city}
                        </span>
                      </div>
                      <div className="font-handwritten text-xs sm:text-sm text-[var(--ink-soft)] flex items-center gap-2 mt-0.5">
                        <span>{r.vibeLabel}</span>
                        <span>· from {r.senderName}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[var(--ink-soft)] opacity-60 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{dateStr}</span>
                        <span>· Link: /p/{r.token}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <Link
                        href={`/p/${r.token}`}
                        className="font-serif-vintage text-xs font-semibold px-3 py-1.5 rounded border hover:bg-black/5 transition inline-flex items-center gap-1.5"
                        style={{ color: "var(--burgundy)", borderColor: "var(--border)" }}
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => removeRecord(r.token)}
                        aria-label="Delete record"
                        className="opacity-50 hover:opacity-100 p-1.5 transition text-[var(--ink-soft)] hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="px-4 sm:px-8 py-6 text-center border-t" style={{ borderColor: "var(--border)" }}>
        <p className="font-serif-vintage text-[10px] tracking-[0.2em] uppercase text-[var(--ink-soft)]">
          ♡ &mdash; Yaadon ka Postcard &bull; Nostalgic Indian Mail &mdash; ♡
        </p>
      </footer>
    </PaperBackground>
  );
}

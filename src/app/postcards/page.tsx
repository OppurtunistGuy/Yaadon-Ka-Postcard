"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Plus,
  Copy,
  Check,
  Eye,
  Gift,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { PaperBackground } from "@/components/postcard/shared/PaperBackground";
import { useSentPostcards } from "@/hooks/use-sent-postcards";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/clipboard";

interface SenderPostcard {
  token: string;
  receiverName: string;
  city: string;
  themeId: string;
  createdAt: string;
  openedAt?: string | null;
  revealedAt?: string | null;
  claimedAt?: string | null;
  reaction?: string | null;
  status: "Created" | "Opened" | "Surprise Revealed" | "Claimed";
}

interface SenderStats {
  totalSent: number;
  remainingCredits: number;
  openedCount: number;
  revealedCount: number;
}

export default function MyPostcardsDashboardPage() {
  const { records } = useSentPostcards();
  const { toast } = useToast();
  const [postcards, setPostcards] = useState<SenderPostcard[]>([]);
  const [stats, setStats] = useState<SenderStats>({
    totalSent: 0,
    remainingCredits: 10,
    openedCount: 0,
    revealedCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  async function loadSenderDashboard() {
    setIsLoading(true);
    try {
      const localTokens = records.map((r) => r.token).join(",");
      const res = await fetch(`/api/sender/postcards?localTokens=${encodeURIComponent(localTokens)}`);
      const data = await res.json();
      if (res.ok && data.ok) {
        setPostcards(data.postcards || []);
        setStats(data.stats || { totalSent: 0, remainingCredits: 10, openedCount: 0, revealedCount: 0 });
      }
    } catch {
      // fallback to local records if offline
      setPostcards(
        records.map((r) => ({
          token: r.token,
          receiverName: r.receiverName,
          city: r.city,
          themeId: r.themeId || "classic",
          createdAt: String(r.createdAt || new Date().toISOString()),
          status: "Created",
        }))
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSenderDashboard();
  }, [records]);

  async function handleCopyLink(token: string) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/p/${token}`;
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedToken(token);
      toast({
        title: "Link copied!",
        description: "Postcard link copied to clipboard.",
      });
      setTimeout(() => setCopiedToken(null), 2000);
    } else {
      toast({
        title: "Copy failed",
        description: "Could not copy postcard link.",
        variant: "destructive",
      });
    }
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col justify-between selection:bg-amber-900/10">
      {/* Header */}
      <header className="px-4 sm:px-8 py-4 border-b sticky top-0 z-30 bg-[#f7eed8]/95 backdrop-blur-xs" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[var(--burgundy)]" />
            <div>
              <h1 className="font-serif-vintage font-bold text-lg text-[var(--burgundy)] leading-none">
                My Postcards Dashboard
              </h1>
              <span className="font-handwritten text-xs text-[var(--ink-soft)]">
                Private Sender Activity & Status Tracker
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSenderDashboard}
              disabled={isLoading}
              className="p-2 rounded-md border border-amber-900/20 bg-amber-50/70 hover:bg-amber-100/70 text-xs font-serif-vintage text-[var(--burgundy)] flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Sync Status</span>
            </button>

            <a
              href="/"
              className="btn-vintage font-serif-vintage text-xs font-bold px-3.5 py-2 rounded-md tracking-wider flex items-center gap-1.5 shadow-2xs hover:shadow transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Postcard</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Sent */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)] flex items-center justify-between">
                <span>Total Sent</span>
                <span>📮</span>
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-[var(--burgundy)] mt-2">
                {stats.totalSent}
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                Postcards created by you
              </div>
            </div>

            {/* Remaining Credits */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)] flex items-center justify-between">
                <span>Remaining Credits</span>
                <span>🎟️</span>
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-emerald-800 mt-2">
                {stats.remainingCredits}
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                Postcards remaining in plan
              </div>
            </div>

            {/* Opened */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)] flex items-center justify-between">
                <span>Opened</span>
                <Eye className="w-4 h-4 text-amber-800" />
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-[var(--burgundy)] mt-2">
                {stats.openedCount}
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                Opened by receivers
              </div>
            </div>

            {/* Surprise Revealed */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)] flex items-center justify-between">
                <span>Surprise Revealed</span>
                <Gift className="w-4 h-4 text-amber-800" />
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-[var(--burgundy)] mt-2">
                {stats.revealedCount}
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                Surprises unlocked
              </div>
            </div>
          </div>

          {/* Postcards List */}
          <div className="p-5 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif-vintage text-sm uppercase tracking-wider font-bold text-[var(--burgundy)] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[var(--burgundy)]" />
                <span>Your Sent Postcards ({postcards.length})</span>
              </h2>
              <span className="font-handwritten text-xs text-[var(--ink-soft)]">
                State Flow: Created &rarr; Opened &rarr; Surprise Revealed &rarr; Claimed
              </span>
            </div>

            {postcards.length === 0 ? (
              <div className="text-center p-8 bg-amber-50/50 rounded-md border border-dashed border-amber-900/20">
                <p className="font-serif-vintage text-sm font-bold text-[var(--burgundy)]">
                  You haven&apos;t sent any postcards yet!
                </p>
                <p className="font-handwritten text-xs text-[var(--ink-soft)] mt-1 mb-4">
                  Create a custom nostalgic postcard for someone special.
                </p>
                <a
                  href="/"
                  className="btn-vintage font-serif-vintage text-xs font-bold px-5 py-2 rounded-md inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Send First Postcard</span>
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {postcards.map((card) => {
                  const isClaimed = card.status === "Claimed" || Boolean(card.claimedAt);
                  const isRevealed = card.status === "Surprise Revealed" || Boolean(card.revealedAt);
                  const isOpened = card.status === "Opened" || Boolean(card.openedAt);

                  return (
                    <div
                      key={card.token}
                      className="p-4 rounded-md border bg-[#fffceb] border-amber-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      {/* Left: Recipient Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-serif-vintage font-bold text-sm text-[var(--burgundy)]">
                            To: {card.receiverName}
                          </span>
                          <span className="text-xs italic text-[var(--ink-soft)]">
                            📍 {card.city}
                          </span>
                          <span className="text-[10px] uppercase font-serif-vintage font-bold px-2 py-0.5 rounded bg-amber-100/70 border border-amber-900/10 text-amber-950">
                            {card.themeId}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-[var(--ink-soft)] mt-1 flex items-center gap-2 flex-wrap">
                          <span>
                            Sent: {new Date(card.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          {card.reaction && (
                            <span className="bg-amber-100 px-1.5 py-0.5 rounded text-[10px] font-sans font-bold text-amber-900">
                              Reaction: {card.reaction}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Status Badge & Actions */}
                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Status Badge */}
                        <div>
                          {isClaimed ? (
                            <span className="inline-flex items-center gap-1 text-xs font-serif-vintage font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-950 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              Claimed by recipient
                            </span>
                          ) : isRevealed ? (
                            <span className="inline-flex items-center gap-1 text-xs font-serif-vintage font-bold px-2.5 py-1 rounded bg-purple-100 text-purple-950 border border-purple-300">
                              <Gift className="w-3.5 h-3.5 text-purple-700" />
                              Surprise Revealed
                            </span>
                          ) : isOpened ? (
                            <span className="inline-flex items-center gap-1 text-xs font-serif-vintage font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-950 border border-blue-300">
                              <Eye className="w-3.5 h-3.5 text-blue-700" />
                              Opened
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-serif-vintage font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-950 border border-amber-300">
                              <Clock className="w-3.5 h-3.5 text-amber-700" />
                              Created
                            </span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyLink(card.token)}
                            className="p-1.5 rounded border border-amber-900/20 bg-amber-50 hover:bg-amber-100 text-xs font-serif-vintage text-[var(--burgundy)] flex items-center gap-1 transition cursor-pointer"
                            title="Copy Share Link"
                          >
                            {copiedToken === card.token ? (
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span className="text-[11px] font-bold">Copy</span>
                          </button>

                          <a
                            href={`/p/${card.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded border border-amber-900/20 bg-amber-50 hover:bg-amber-100 text-xs font-serif-vintage text-[var(--burgundy)] flex items-center gap-1 transition"
                            title="View Postcard"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-5 text-center border-t" style={{ borderColor: "var(--border)" }}>
        <p className="font-serif-vintage text-[10px] tracking-[0.2em] uppercase text-[var(--ink-soft)]">
          ♡ &mdash; Yaadon Ka Postcard · Sender Activity Center &mdash; ♡
        </p>
      </footer>
    </PaperBackground>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  LogOut,
  RefreshCw,
  Sparkles,
  BarChart3,
  Heart,
  Eye,
  Gift,
  Star,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { PaperBackground } from "@/components/postcard/shared/PaperBackground";
import { AirmailDivider } from "@/components/postcard/shared/AirmailBorder";

interface StatsData {
  totalSent: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
  openedCount: number;
  openRate: number;
  revealedCount: number;
  revealRate: number;
  themeBreakdown: {
    classic: number;
    rakhi: number;
    ganpati: number;
  };
  reactionCounts: Record<string, number>;
  feedbackStats: {
    totalFeedbacks: number;
    avgRating: number;
    ratingBreakdown: Record<number, number>;
  };
  publicFeedbacks: Array<{
    id: string;
    rating: number;
    comment: string;
    displayName: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  async function fetchStats() {
    setIsLoadingStats(true);
    try {
      const res = await fetch("/api/admin/stats", { method: "GET" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStats(data.stats);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingStats(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordInput) return;

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        setPasswordInput("");
        fetchStats();
      } else {
        setLoginError(data.error || "Invalid password");
      }
    } catch {
      setLoginError("Login request failed. Try again.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setStats(null);
  }

  // 1. Initial Loading State
  if (isAuthenticated === null) {
    return (
      <PaperBackground className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center font-serif-vintage text-sm text-[var(--ink-soft)] flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[var(--burgundy)]" />
          <span>Verifying admin security session...</span>
        </div>
      </PaperBackground>
    );
  }

  // 2. Unauthenticated Login View
  if (!isAuthenticated) {
    return (
      <PaperBackground className="min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full paper-grain paper-stains rounded-lg p-6 sm:p-8 vignette border border-amber-900/20 shadow-xl"
          style={{ backgroundColor: "#faf2dc" }}
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-900/10 flex items-center justify-center mx-auto mb-3 text-[var(--burgundy)] border border-amber-900/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif-vintage text-2xl font-bold text-[var(--burgundy)]">
              Admin Portal
            </h1>
            <p className="font-handwritten text-xs text-[var(--ink-soft)] mt-1">
              Owner-only analytics & aggregate postcard stats.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-serif-vintage text-xs font-bold uppercase tracking-wider text-[var(--burgundy)] mb-1">
                Admin Security Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                required
                autoFocus
                className="field-vintage w-full font-mono text-sm px-3 py-2.5 rounded-md outline-none border border-[var(--border)] bg-[#fffceb] h-[44px]"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-700 font-sans font-medium text-center bg-red-50 p-2 rounded border border-red-200">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-vintage w-full font-serif-vintage text-sm font-bold py-2.5 rounded-md tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-amber-900/10 text-center">
            <span className="font-sans text-[10px] text-amber-900/60 uppercase tracking-widest block">
              🔒 End-to-End Privacy Guaranteed
            </span>
          </div>
        </motion.div>
      </PaperBackground>
    );
  }

  // 3. Authenticated Analytics Dashboard View
  const themeTotal = (stats?.themeBreakdown.classic || 0) + (stats?.themeBreakdown.rakhi || 0) + (stats?.themeBreakdown.ganpati || 0);

  return (
    <PaperBackground className="min-h-screen flex flex-col justify-between selection:bg-amber-900/10">
      {/* Admin Top Header */}
      <header className="px-4 sm:px-8 py-4 border-b sticky top-0 z-30 bg-[#f7eed8]/95 backdrop-blur-xs" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-[var(--burgundy)]" />
            <div>
              <h1 className="font-serif-vintage font-bold text-lg text-[var(--burgundy)] leading-none">
                Yaadon Ka Postcard — Admin Analytics
              </h1>
              <span className="font-handwritten text-xs text-[var(--ink-soft)]">
                Anonymized Aggregate Performance Metrics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchStats}
              disabled={isLoadingStats}
              className="p-2 rounded-md border border-amber-900/20 bg-amber-50/70 hover:bg-amber-100/70 text-xs font-serif-vintage text-[var(--burgundy)] flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStats ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-md bg-amber-900/10 hover:bg-amber-900/20 text-xs font-serif-vintage text-[var(--burgundy)] flex items-center gap-1.5 transition cursor-pointer border border-amber-900/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Privacy Guarantee Banner */}
          <div className="p-3 rounded-lg border bg-amber-900/5 border-amber-900/15 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--burgundy)] shrink-0" />
            <p className="font-handwritten text-xs text-[var(--ink-soft)] leading-relaxed">
              <strong className="font-bold text-[var(--burgundy)]">Privacy Protected:</strong> Individual postcard contents, messages, names, and recipient locations are never logged or exposed. Only aggregate metrics and opted-in public feedback are displayed below.
            </p>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Sent */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)]">
                <span>Total Postcards Sent</span>
                <span>📮</span>
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-[var(--burgundy)] mt-2">
                {stats?.totalSent ?? 0}
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                All-time postcards created
              </div>
            </div>

            {/* Opened Rate */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)]">
                <span>Opened Rate</span>
                <Eye className="w-4 h-4 text-amber-800" />
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-[var(--burgundy)] mt-2 flex items-baseline gap-2">
                <span>{stats?.openRate ?? 0}%</span>
                <span className="text-xs font-sans text-amber-900/70 font-normal">
                  ({stats?.openedCount ?? 0} cards)
                </span>
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                Postcards opened by receivers
              </div>
            </div>

            {/* Surprises Revealed */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)]">
                <span>Surprises Revealed</span>
                <Gift className="w-4 h-4 text-amber-800" />
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-[var(--burgundy)] mt-2 flex items-baseline gap-2">
                <span>{stats?.revealRate ?? 0}%</span>
                <span className="text-xs font-sans text-amber-900/70 font-normal">
                  ({stats?.revealedCount ?? 0} reveals)
                </span>
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                Revealed by recipients
              </div>
            </div>

            {/* Average Rating */}
            <div className="p-4 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-serif-vintage uppercase font-bold text-[var(--ink-soft)]">
                <span>Average Rating</span>
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="font-serif-vintage text-3xl font-bold text-[var(--burgundy)] mt-2 flex items-baseline gap-2">
                <span>{stats?.feedbackStats?.avgRating ?? 0}</span>
                <span className="text-xs font-sans text-amber-900/70 font-normal">
                  / 5 ({stats?.feedbackStats?.totalFeedbacks ?? 0} reviews)
                </span>
              </div>
              <div className="text-[11px] font-handwritten text-[var(--ink-soft)] mt-1">
                Receiver experience satisfaction
              </div>
            </div>
          </div>

          {/* Middle Row: Period Stats & Theme Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Period Breakdown */}
            <div className="md:col-span-5 p-5 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <h2 className="font-serif-vintage text-sm uppercase tracking-wider font-bold text-[var(--burgundy)] mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Time Period Activity</span>
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded bg-amber-50/70 border border-amber-900/10">
                  <span className="font-serif-vintage text-xs font-bold text-amber-950">Today</span>
                  <span className="font-mono text-sm font-bold text-[var(--burgundy)]">{stats?.todayCount ?? 0}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-amber-50/70 border border-amber-900/10">
                  <span className="font-serif-vintage text-xs font-bold text-amber-950">This Week (Last 7 Days)</span>
                  <span className="font-mono text-sm font-bold text-[var(--burgundy)]">{stats?.weekCount ?? 0}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded bg-amber-50/70 border border-amber-900/10">
                  <span className="font-serif-vintage text-xs font-bold text-amber-950">This Month (Last 30 Days)</span>
                  <span className="font-mono text-sm font-bold text-[var(--burgundy)]">{stats?.monthCount ?? 0}</span>
                </div>
              </div>
            </div>

            {/* Theme Breakdown */}
            <div className="md:col-span-7 p-5 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
              <h2 className="font-serif-vintage text-sm uppercase tracking-wider font-bold text-[var(--burgundy)] mb-4 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Theme Usage Breakdown</span>
              </h2>

              <div className="space-y-3.5">
                {/* Classic Theme */}
                <div>
                  <div className="flex justify-between text-xs font-serif-vintage font-bold mb-1">
                    <span>✉️ Classic Postcard</span>
                    <span>
                      {stats?.themeBreakdown.classic ?? 0} cards (
                      {themeTotal > 0 ? Math.round(((stats?.themeBreakdown.classic || 0) / themeTotal) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-amber-900/10 overflow-hidden">
                    <div
                      className="h-full bg-[var(--burgundy)] rounded-full transition-all duration-500"
                      style={{
                        width: `${themeTotal > 0 ? ((stats?.themeBreakdown.classic || 0) / themeTotal) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Rakhi Theme */}
                <div>
                  <div className="flex justify-between text-xs font-serif-vintage font-bold mb-1">
                    <span>🌸 Rakhi Festival Special</span>
                    <span>
                      {stats?.themeBreakdown.rakhi ?? 0} cards (
                      {themeTotal > 0 ? Math.round(((stats?.themeBreakdown.rakhi || 0) / themeTotal) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-amber-900/10 overflow-hidden">
                    <div
                      className="h-full bg-rose-700 rounded-full transition-all duration-500"
                      style={{
                        width: `${themeTotal > 0 ? ((stats?.themeBreakdown.rakhi || 0) / themeTotal) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Ganpati Theme */}
                <div>
                  <div className="flex justify-between text-xs font-serif-vintage font-bold mb-1">
                    <span>🕉️ Ganpati Bappa Special</span>
                    <span>
                      {stats?.themeBreakdown.ganpati ?? 0} cards (
                      {themeTotal > 0 ? Math.round(((stats?.themeBreakdown.ganpati || 0) / themeTotal) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-amber-900/10 overflow-hidden">
                    <div
                      className="h-full bg-amber-700 rounded-full transition-all duration-500"
                      style={{
                        width: `${themeTotal > 0 ? ((stats?.themeBreakdown.ganpati || 0) / themeTotal) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reactions Aggregate Breakdown */}
          <div className="p-5 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
            <h2 className="font-serif-vintage text-sm uppercase tracking-wider font-bold text-[var(--burgundy)] mb-3 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-700" />
              <span>Receiver Reactions Breakdown</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { emoji: "😂", label: "Hansi" },
                { emoji: "❤️", label: "Pyaar" },
                { emoji: "🥺", label: "Emotional" },
                { emoji: "🔥", label: "Aag" },
                { emoji: "👏", label: "Wah!" },
                { emoji: "🤗", label: "Jappi" },
              ].map((r) => {
                const count = stats?.reactionCounts?.[r.emoji] ?? 0;
                return (
                  <div
                    key={r.emoji}
                    className="p-3 rounded-md border border-amber-900/15 bg-amber-50/70 text-center flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl mb-1">{r.emoji}</span>
                    <span className="font-serif-vintage text-xs font-bold text-amber-950">{r.label}</span>
                    <span className="font-mono text-sm font-bold text-[var(--burgundy)] mt-0.5">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Opted-in Public Feedback Feed */}
          <div className="p-5 rounded-lg border bg-[#faf2dc] border-amber-900/20 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif-vintage text-sm uppercase tracking-wider font-bold text-[var(--burgundy)] flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>Opted-In Public Ratings & Feedback ({stats?.publicFeedbacks?.length ?? 0})</span>
                </h2>
                <p className="font-handwritten text-xs text-[var(--ink-soft)] mt-0.5">
                  Only feedback where receiver checked &ldquo;Show my name with this feedback&rdquo; appears below.
                </p>
              </div>
            </div>

            {(!stats?.publicFeedbacks || stats.publicFeedbacks.length === 0) ? (
              <div className="text-center p-6 bg-amber-50/50 rounded-md border border-dashed border-amber-900/20">
                <span className="font-handwritten text-xs text-[var(--ink-soft)]">
                  No public feedback opted-in yet. Feedback will appear here as receivers share rating & public name.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {stats.publicFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-3.5 rounded-md border border-amber-900/15 bg-[#fffceb] space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif-vintage text-xs font-bold text-[var(--burgundy)]">
                        {fb.displayName}
                      </span>
                      <div className="flex items-center gap-0.5 text-xs text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < fb.rating ? "fill-amber-500 text-amber-500" : "text-amber-900/20"}`}
                          />
                        ))}
                      </div>
                    </div>

                    {fb.comment ? (
                      <p className="font-handwritten text-xs text-[var(--ink)] italic leading-relaxed">
                        &ldquo;{fb.comment}&rdquo;
                      </p>
                    ) : (
                      <p className="font-handwritten text-[11px] text-[var(--ink-soft)] italic">
                        (No comment provided)
                      </p>
                    )}

                    <div className="text-[10px] font-mono text-[var(--ink-soft)] text-right">
                      {new Date(fb.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Admin Footer */}
      <footer className="px-4 sm:px-8 py-4 text-center border-t mt-8" style={{ borderColor: "var(--border)" }}>
        <p className="font-serif-vintage text-[10px] tracking-[0.2em] uppercase text-[var(--ink-soft)]">
          Yaadon Ka Postcard — Confidential Owner Dashboard
        </p>
      </footer>
    </PaperBackground>
  );
}

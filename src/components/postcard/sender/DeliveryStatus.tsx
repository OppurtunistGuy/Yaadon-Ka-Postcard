"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailCheck, Eye, Gift, Heart, RefreshCw, Bell } from "lucide-react";
import { AirmailDivider } from "../shared/AirmailBorder";

interface Status {
  openedAt: string | null;
  revealedAt: string | null;
  reaction: string | null;
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "abhi abhi";
  if (min < 60) return `${min} min pehle`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} ghante pehle`;
  const day = Math.floor(hr / 24);
  return `${day} din pehle`;
}

/**
 * Delivery status — lets the sender see if/when their postcard was opened,
 * the surprise revealed, and the receiver's emoji reaction.
 * Polls the GET endpoint every 20s while the share screen is open.
 */
export function DeliveryStatus({ token }: { token: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/postcards/${token}`, { method: "GET" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({
          openedAt: data.postcard.openedAt,
          revealedAt: data.postcard.revealedAt,
          reaction: data.postcard.reaction,
        });
        setLastChecked(new Date());
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 20000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const opened = !!status?.openedAt;
  const revealed = !!status?.revealedAt;
  const reaction = status?.reaction;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative paper-grain paper-stains rounded-lg p-5 vignette"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" style={{ color: "var(--burgundy)" }} />
          <h3
            className="font-serif-vintage font-bold text-sm"
            style={{ color: "var(--burgundy)" }}
          >
            Delivery status
          </h3>
        </div>
        <button
          onClick={fetchStatus}
          aria-label="Refresh status"
          className="p-1.5 rounded hover:bg-black/5 transition"
          style={{ color: "var(--ink-soft)" }}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <AirmailDivider className="mb-4" />

      <div className="space-y-3">
        {/* Step 1: Sent */}
        <StatusStep
          icon={<MailCheck className="w-4 h-4" />}
          label="Postcard posted"
          value="Delivered ✓"
          done
          time={null}
        />

        {/* Step 2: Opened */}
        <StatusStep
          icon={<Eye className="w-4 h-4" />}
          label="Receiver opened it"
          value={opened ? "Opened!" : "Waiting..."}
          done={opened}
          time={opened && status?.openedAt ? timeAgo(status.openedAt) : null}
        />

        {/* Step 3: Revealed */}
        <StatusStep
          icon={<Gift className="w-4 h-4" />}
          label="Surprise revealed"
          value={revealed ? "Revealed!" : opened ? "Almost there..." : "Locked"}
          done={revealed}
          time={revealed && status?.revealedAt ? timeAgo(status.revealedAt) : null}
        />
      </div>

      {/* Reaction */}
      <AnimatePresence>
        {reaction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 pt-4 border-t border-dashed"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2">
              <Heart
                className="w-4 h-4"
                style={{ color: "var(--burgundy)", fill: "var(--burgundy)" }}
              />
              <span
                className="font-serif-vintage text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--burgundy)" }}
              >
                Receiver ne react kiya:
              </span>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mt-2 flex items-center justify-center"
            >
              <span
                className="text-5xl"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
              >
                {reaction}
              </span>
            </motion.div>
            <p
              className="font-handwritten text-xs text-center mt-2"
              style={{ color: "var(--ink-soft)" }}
            >
              Yay! Message pohonch gaya dil tak. 💌
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!reaction && (
        <p
          className="font-handwritten text-[11px] text-center mt-4"
          style={{ color: "var(--ink-soft)" }}
        >
          {lastChecked
            ? `Last checked ${timeAgo(lastChecked.toISOString())} · auto-refreshes every 20s`
            : "Auto-refreshes every 20s"}
        </p>
      )}
    </motion.div>
  );
}

function StatusStep({
  icon,
  label,
  value,
  done,
  time,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  done: boolean;
  time: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
        style={{
          backgroundColor: done ? "var(--burgundy)" : "rgba(60,40,20,0.1)",
          color: done ? "#f7eed8" : "var(--ink-soft)",
          border: done ? "none" : "1px dashed var(--border)",
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="font-serif-vintage text-xs font-semibold"
          style={{ color: "var(--ink)" }}
        >
          {label}
        </div>
        <div
          className="font-handwritten text-xs"
          style={{ color: done ? "var(--burgundy)" : "var(--ink-soft)" }}
        >
          {value}
          {time && (
            <span style={{ color: "var(--ink-soft)" }}> · {time}</span>
          )}
        </div>
      </div>
      {done && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-xs font-bold"
          style={{ color: "var(--burgundy)" }}
        >
          ✓
        </motion.span>
      )}
    </div>
  );
}

"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface SentPostcardRecord {
  token: string;
  receiverName: string;
  city: string;
  vibeLabel: string;
  vibeEmoji: string;
  senderName: string;
  createdAt: number;
  status?: "Sent" | "Delivered";
  themeId?: string;
}

const STORAGE_KEY = "ykpostcard:sent-recent";
const MAX_RECORDS = 100;
const EMPTY: SentPostcardRecord[] = [];

let cache: SentPostcardRecord[] | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function readFromStorage(): SentPostcardRecord[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.slice(0, MAX_RECORDS);
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): SentPostcardRecord[] {
  if (cache === null) {
    cache = readFromStorage();
  }
  return cache;
}

function getServerSnapshot(): SentPostcardRecord[] {
  return EMPTY;
}

function write(records: SentPostcardRecord[]) {
  if (typeof window === "undefined") return;
  const next = records.slice(0, MAX_RECORDS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  cache = next;
  notify();
}

export function useSentPostcards() {
  const records = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addRecord = useCallback((rec: Omit<SentPostcardRecord, "createdAt">) => {
    const current = getSnapshot();
    const next = [
      { ...rec, createdAt: Date.now(), status: "Sent" as const },
      ...current.filter((r) => r.token !== rec.token),
    ];
    write(next);
  }, []);

  const removeRecord = useCallback((token: string) => {
    const next = getSnapshot().filter((r) => r.token !== token);
    write(next);
  }, []);

  const clear = useCallback(() => {
    write(EMPTY);
  }, []);

  return { records, addRecord, removeRecord, clear };
}

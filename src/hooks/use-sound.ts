"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Ambient & action sound effects synthesised via the Web Audio API.
 * No external audio files needed — everything is generated procedurally
 * for a lightweight, self-contained vintage soundscape.
 */

type SoundName = "stamp" | "paper" | "reveal" | "open" | "click" | "success";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return ctx;
}

function playTone(
  audioCtx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.15,
  startAt = 0
) {
  const now = audioCtx.currentTime + startAt;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(gain, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

function playNoise(
  audioCtx: AudioContext,
  duration: number,
  gain = 0.08,
  startAt = 0,
  filterFreq = 2000
) {
  const now = audioCtx.currentTime + startAt;
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = filterFreq;
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(gain, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  src.connect(filter);
  filter.connect(g);
  g.connect(audioCtx.destination);
  src.start(now);
  src.stop(now + duration + 0.05);
}

function playSound(name: SoundName) {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  // resume if suspended (autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  switch (name) {
    case "stamp":
      // rubber stamp thud: short low tone + noise click
      playTone(audioCtx, 120, 0.12, "sine", 0.18);
      playNoise(audioCtx, 0.08, 0.12, 0, 3000);
      break;
    case "paper":
      // paper rustle: filtered noise
      playNoise(audioCtx, 0.25, 0.05, 0, 4000);
      break;
    case "click":
      // soft UI click
      playTone(audioCtx, 600, 0.06, "triangle", 0.08);
      break;
    case "open":
      // envelope opening: paper + soft swoosh
      playNoise(audioCtx, 0.3, 0.06, 0, 2500);
      playTone(audioCtx, 440, 0.15, "sine", 0.1, 0.05);
      break;
    case "reveal":
      // magical reveal: rising chime
      playTone(audioCtx, 523, 0.15, "sine", 0.12, 0);
      playTone(audioCtx, 659, 0.15, "sine", 0.12, 0.08);
      playTone(audioCtx, 784, 0.25, "sine", 0.14, 0.16);
      break;
    case "success":
      // success fanfare: 3 ascending notes
      playTone(audioCtx, 523, 0.15, "triangle", 0.12, 0);
      playTone(audioCtx, 659, 0.15, "triangle", 0.12, 0.1);
      playTone(audioCtx, 784, 0.3, "triangle", 0.14, 0.2);
      break;
  }
}

const STORAGE_KEY = "ykpostcard:sound-enabled";

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function getEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}
function getServerSnapshot(): boolean {
  return false;
}
function setEnabledStored(next: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

export function useSound() {
  const enabled = useSyncExternalStore(subscribe, getEnabled, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !getEnabled();
    setEnabledStored(next);
    if (next) {
      // play a sample so the user hears it enable
      playSound("stamp");
    }
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      playSound(name);
    },
    [enabled]
  );

  return { enabled, toggle, play };
}

"use client";

import { create } from "zustand";
import type { Vibe } from "@/lib/surprises";
import type { FestivalThemeId } from "@/lib/festival-themes";
import type { MusicPlatform } from "@/lib/security";

export type SenderStep =
  | "intro"
  | "details"
  | "surprise"
  | "message"
  | "preview"
  | "share";

export interface PostcardDraft {
  themeId: FestivalThemeId;
  receiverName: string;
  city: string;
  relationship: string;
  senderName: string;
  senderGender: "male" | "female";
  vibe: Vibe | null;
  surpriseId: string | null;
  message: string;
  musicUrl: string | null;
  musicPlatform: MusicPlatform | null;
  musicTitle: string | null;
}

interface SenderState {
  step: SenderStep;
  draft: PostcardDraft;
  generatedToken: string | null;
  isSubmitting: boolean;
  error: string | null;

  setStep: (step: SenderStep) => void;
  updateDraft: (patch: Partial<PostcardDraft>) => void;
  reset: () => void;
  setGeneratedToken: (token: string | null) => void;
  setSubmitting: (v: boolean) => void;
  setError: (e: string | null) => void;
}

const emptyDraft: PostcardDraft = {
  themeId: "classic",
  receiverName: "",
  city: "",
  relationship: "",
  senderName: "",
  senderGender: "male",
  vibe: null,
  surpriseId: null,
  message: "",
  musicUrl: null,
  musicPlatform: null,
  musicTitle: null,
};

export const useSenderStore = create<SenderState>((set) => ({
  step: "intro",
  draft: emptyDraft,
  generatedToken: null,
  isSubmitting: false,
  error: null,

  setStep: (step) => set({ step }),
  updateDraft: (patch) =>
    set((s) => ({ draft: { ...s.draft, ...patch }, error: null })),
  reset: () => set({ step: "intro", draft: emptyDraft, generatedToken: null, error: null, isSubmitting: false }),
  setGeneratedToken: (token) => set({ generatedToken: token }),
  setSubmitting: (v) => set({ isSubmitting: v }),
  setError: (e) => set({ error: e }),
}));

"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle, Share2, Sparkles, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

export function getAppShareUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://yaadon-ka-postcard.vercel.app";
}

export const APP_SHARE_MESSAGE =
  "Send vintage Indian postcards with nostalgic Bollywood vibes & festival surprises! 📮 Check out Yaadon Ka Postcard:";

export interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareAppModal({ isOpen, onClose }: ShareAppModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = getAppShareUrl();
  const fullText = `${APP_SHARE_MESSAGE} ${appUrl}`;

  async function handleCopyAppUrl() {
    const success = await copyToClipboard(appUrl);
    if (success) {
      setCopied(true);
      toast({
        title: "App Link Copied! 📋",
        description: "Yaadon Ka Postcard app link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({ title: "Could not copy link", variant: "destructive" });
    }
  }

  function handleWhatsAppShare() {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  async function handleInstagramShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Yaadon Ka Postcard",
          text: APP_SHARE_MESSAGE,
          url: appUrl,
        });
        return;
      } catch {
        // Fallback to copy link if user cancels or native share fails
      }
    }
    await handleCopyAppUrl();
    toast({
      title: "Link Copied for Instagram! 📸",
      description: "Paste the link in your Instagram Story, Bio, or DM.",
    });
  }

  async function handleSnapchatShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Yaadon Ka Postcard",
          text: APP_SHARE_MESSAGE,
          url: appUrl,
        });
        return;
      } catch {
        // Fallback
      }
    }
    const snapUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(appUrl)}`;
    window.open(snapUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md paper-grain paper-stains rounded-xl p-6 vignette border border-amber-900/30 shadow-2xl space-y-5"
        style={{ backgroundColor: "#faf2dc" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-amber-900/60 hover:text-amber-950 hover:bg-amber-900/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/10 text-[var(--burgundy)] text-xs font-serif-vintage font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Share Yaadon Ka Postcard
          </div>
          <h2 className="font-serif-vintage text-2xl font-bold text-[var(--burgundy)]">
            Spread the Nostalgia 💌
          </h2>
          <p className="font-handwritten text-xs text-[var(--ink-soft)] max-w-xs mx-auto">
            Share this app with friends & family so they can send nostalgic postcards too!
          </p>
        </div>

        {/* Share Action Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppShare}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-[#25D366] text-white font-serif-vintage text-xs font-bold shadow-sm hover:opacity-90 transition cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>WhatsApp</span>
          </button>

          {/* Instagram */}
          <button
            onClick={handleInstagramShare}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-serif-vintage text-xs font-bold shadow-sm hover:opacity-90 transition cursor-pointer"
          >
            <Share2 className="w-6 h-6" />
            <span>Instagram</span>
          </button>

          {/* Snapchat */}
          <button
            onClick={handleSnapchatShare}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-[#FFFC00] text-black font-serif-vintage text-xs font-bold shadow-sm hover:opacity-90 transition cursor-pointer"
          >
            <Heart className="w-6 h-6 fill-current" />
            <span>Snapchat</span>
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="pt-2 border-t border-amber-900/15">
          <label className="block font-serif-vintage text-[11px] uppercase tracking-wider text-[var(--burgundy)] mb-1 font-bold">
            Direct App URL
          </label>
          <div className="flex items-center gap-2 p-2 rounded-md bg-[#fffceb] border border-amber-900/20">
            <input
              readOnly
              value={appUrl}
              className="flex-1 min-w-0 bg-transparent text-xs font-mono text-[var(--ink)] outline-none truncate"
            />
            <button
              onClick={handleCopyAppUrl}
              className="px-3 py-1.5 rounded-md bg-[var(--burgundy)] text-white text-xs font-serif-vintage font-bold flex items-center gap-1.5 shrink-0 hover:opacity-90 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy App Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Inline card for sharing the app itself (e.g. inside ShareScreen)
 */
export function ShareAppCard() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const appUrl = getAppShareUrl();
  const fullText = `${APP_SHARE_MESSAGE} ${appUrl}`;

  async function handleCopyAppUrl() {
    const success = await copyToClipboard(appUrl);
    if (success) {
      setCopied(true);
      toast({
        title: "App Link Copied! 📋",
        description: "Yaadon Ka Postcard app link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({ title: "Could not copy link", variant: "destructive" });
    }
  }

  function handleWhatsAppShare() {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  async function handleInstagramShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Yaadon Ka Postcard",
          text: APP_SHARE_MESSAGE,
          url: appUrl,
        });
        return;
      } catch {
        // Fallback
      }
    }
    await handleCopyAppUrl();
    toast({
      title: "Link Copied for Instagram! 📸",
      description: "Paste the link in your Instagram Story, Bio, or DM.",
    });
  }

  async function handleSnapchatShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Yaadon Ka Postcard",
          text: APP_SHARE_MESSAGE,
          url: appUrl,
        });
        return;
      } catch {
        // Fallback
      }
    }
    const snapUrl = `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(appUrl)}`;
    window.open(snapUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="paper-grain paper-stains rounded-lg p-5 vignette border border-amber-900/20 shadow-xs space-y-4 bg-[#faf2dc]">
      <div className="flex items-center justify-between gap-2 border-b border-amber-900/15 pb-2.5">
        <div>
          <h3 className="font-serif-vintage text-base font-bold text-[var(--burgundy)] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            Share Yaadon Ka Postcard App
          </h3>
          <p className="font-handwritten text-xs text-[var(--ink-soft)]">
            Love creating postcards? Share this app with your friends & family!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={handleWhatsAppShare}
          className="py-2.5 px-3 rounded-md bg-[#25D366] text-white font-serif-vintage text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:opacity-90 transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleInstagramShare}
          className="py-2.5 px-3 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-serif-vintage text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:opacity-90 transition cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Instagram</span>
        </button>

        <button
          onClick={handleSnapchatShare}
          className="py-2.5 px-3 rounded-md bg-[#FFFC00] text-black font-serif-vintage text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:opacity-90 transition cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Snapchat</span>
        </button>

        <button
          onClick={handleCopyAppUrl}
          className="py-2.5 px-3 rounded-md bg-amber-900/10 text-[var(--burgundy)] border border-amber-900/20 font-serif-vintage text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:bg-amber-900/20 transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied" : "Copy App Link"}</span>
        </button>
      </div>
    </div>
  );
}

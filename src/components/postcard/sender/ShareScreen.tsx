"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Link2, MessageCircle, Plus } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { AirmailDivider } from "../shared/AirmailBorder";
import { SenderFooter } from "./SenderChrome";
import { WaxSeal, Tape } from "../shared/Decorations";
import { PostageStamp } from "../shared/Stamp";
import { DeliveryStatus } from "./DeliveryStatus";
import { useSenderStore } from "@/lib/postcard-store";
import { useToast } from "@/hooks/use-toast";
import { ShareAppCard } from "../shared/ShareAppModal";

export function ShareScreen() {
  const { generatedToken, reset } = useSenderStore();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" && generatedToken
      ? `${window.location.origin}/p/${generatedToken}`
      : "";

  const shareText = `Tumhe ek postcard aaya hai! 💌 Khol yahan: ${shareUrl}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: "Link copied!", description: "Ab paste kahi bhi kar sakte ho." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copy nahi hua", variant: "destructive" });
    }
  }

  function handleWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleNew() {
    reset();
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <header className="px-4 sm:px-8 pt-6 pb-2 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="inline-flex"
        >
          <WaxSeal size={64} emoji="✅" animate />
        </motion.div>
        <h1
          className="font-serif-vintage text-3xl sm:text-4xl font-extrabold mt-3"
          style={{ color: "var(--burgundy)" }}
        >
          Postcard ready!
        </h1>
        <p
          className="font-handwritten text-base mt-1"
          style={{ color: "var(--ink-soft)" }}
        >
          Bundle bandha hai, sirf link bhejna baaki hai.
        </p>
      </header>

      <main className="flex-1 px-4 sm:px-8 py-6">
        <div className="max-w-xl mx-auto">
          {/* bundle visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative paper-grain paper-stains rounded-lg p-6 vignette"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* tape on corners */}
            <Tape className="absolute -top-2 left-6" rotate={-6}>
              Posted
            </Tape>
            <Tape className="absolute -top-2 right-6" rotate={4}>
              With love
            </Tape>

            <div className="flex items-center justify-between gap-3 pt-3">
              <div className="min-w-0">
                <div
                  className="font-serif-vintage text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  Postcard Status
                </div>
                <div
                  className="font-serif-vintage font-bold text-sm sm:text-base tracking-wide mt-0.5"
                  style={{ color: "var(--burgundy)" }}
                >
                  Postcard ready to share
                </div>
              </div>
              <PostageStamp accent="#b4351f" rotate={-5}>
                <div className="w-[52px] h-[60px] flex flex-col items-center justify-center gap-0.5">
                  <span className="text-2xl">📮</span>
                  <span
                    className="font-serif-vintage text-[7px] font-bold uppercase"
                    style={{ color: "var(--burgundy)" }}
                  >
                    Ready
                  </span>
                </div>
              </PostageStamp>
            </div>

            <AirmailDivider className="my-4" />

            {/* link box */}
            <div
              className="rounded-md p-3 flex items-center gap-2"
              style={{
                border: "1px dashed var(--border)",
                backgroundColor: "rgba(255, 250, 235, 0.6)",
              }}
            >
              <Link2 className="w-4 h-4 shrink-0" style={{ color: "var(--ink-soft)" }} />
              <input
                readOnly
                value={shareUrl}
                onFocus={(e) => e.target.select()}
                className="flex-1 min-w-0 bg-transparent outline-none font-mono text-xs sm:text-sm truncate"
                style={{ color: "var(--ink)" }}
              />
              <button
                onClick={handleCopy}
                className="btn-pastel inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>

            {/* share actions */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsApp}
                className="rounded-md py-3 px-4 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-md"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  boxShadow: "0 2px 0 #1da851",
                }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button
                onClick={handleCopy}
                className="btn-vintage font-semibold text-sm py-3 px-4 rounded-md flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                Copy Link
              </button>
            </div>

            <p
              className="font-handwritten text-xs text-center mt-3"
              style={{ color: "var(--ink-soft)" }}
            >
              Receiver link kholta hi &ldquo;You&apos;ve got a Postcard!&rdquo;
              screen dekhega &mdash; surprise baad mein.
            </p>
          </motion.div>

          {/* preview link + new */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-dotted underline-offset-4"
              style={{ color: "var(--postal-blue)" }}
            >
              <Link2 className="w-4 h-4" />
              Preview as receiver
            </a>
            <button
              onClick={handleNew}
              className="btn-pastel inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded"
            >
              <Plus className="w-4 h-4" />
              Create another
            </button>
          </div>

          {/* Delivery status — live tracking */}
          {generatedToken && (
            <div className="mt-6">
              <DeliveryStatus token={generatedToken} />
            </div>
          )}

          {/* Share Yaadon Ka Postcard App */}
          <div className="mt-6">
            <ShareAppCard />
          </div>

          <div className="mt-8 flex justify-center">
            <WaxSeal size={56} emoji="❤" />
          </div>
        </div>
      </main>
      <SenderFooter />
    </PaperBackground>
  );
}

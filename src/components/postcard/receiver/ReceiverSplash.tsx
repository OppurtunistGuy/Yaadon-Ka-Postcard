"use client";

import { motion } from "framer-motion";
import { MailOpen, Hand } from "lucide-react";
import { PaperBackground } from "../shared/PaperBackground";
import { Postmark } from "../shared/Stamp";
import { WaxSeal } from "../shared/Decorations";
import { AirmailDivider } from "../shared/AirmailBorder";

export function ReceiverSplash({
  senderName,
  city,
  onOpen,
  loading,
}: {
  senderName?: string;
  city?: string;
  onOpen: () => void;
  loading?: boolean;
}) {
  return (
    <PaperBackground className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md text-center"
      >
        {/* postbox */}
        <motion.div
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto w-40 h-44 mb-6"
        >
          {/* postbox body */}
          <div
            className="absolute inset-0 rounded-t-md rounded-b-lg shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #8a1f1f 0%, #5e1414 100%)",
              border: "2px solid #3e0d0d",
            }}
          >
            {/* crown */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-t-full"
              style={{
                background: "linear-gradient(180deg, #a52828 0%, #7a1f1f 100%)",
                border: "2px solid #3e0d0d",
                borderBottom: "none",
              }}
            />
            {/* slot */}
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-2.5 rounded-sm"
              style={{ backgroundColor: "#2e0a0a", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)" }}
            />
            {/* LETTERS text */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="font-serif-vintage text-[10px] font-bold tracking-[0.3em] text-amber-100/90">
                LETTERS
              </span>
              <span className="font-serif-vintage text-[8px] tracking-widest text-amber-100/70 mt-0.5">
                BHARAT
              </span>
            </div>
            {/* collection tray */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-10 rounded-sm"
              style={{
                backgroundColor: "#3e0d0d",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
              }}
            />
            {/* envelope peeking out */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 w-20 h-8 rounded-sm airmail-edge-thin border-2"
              style={{ borderColor: "#3e0d0d" }}
            />
          </div>
          {/* shadow */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 rounded-full"
            style={{ background: "rgba(60, 30, 10, 0.25)", filter: "blur(4px)" }}
          />
        </motion.div>

        {/* postmark accent */}
        <div className="flex justify-center mb-2">
          <Postmark city={city ?? "India"} label="Delivered" animate />
        </div>

        <h1
          className="font-serif-vintage font-extrabold text-3xl sm:text-4xl leading-tight"
          style={{ color: "var(--burgundy)" }}
        >
          You&apos;ve got a Postcard!
        </h1>

        <p
          className="font-handwritten text-lg mt-2"
          style={{ color: "var(--ink-soft)" }}
        >
          {senderName ? `${senderName} ne bheja hai` : "Kisi ne yaad kiya tumhe"}
          &nbsp;💌
        </p>

        <AirmailDivider className="max-w-[200px] mx-auto my-6" />

        <motion.button
          onClick={onOpen}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className="btn-vintage font-serif-vintage font-bold px-8 py-3.5 rounded-md tracking-wide text-lg inline-flex items-center gap-2 disabled:opacity-70"
        >
          <MailOpen className="w-5 h-5" />
          {loading ? "Opening..." : "Open Postcard"}
        </motion.button>

        <motion.div
          animate={{ y: [0, -4, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mt-4 inline-flex items-center gap-1.5 text-xs"
          style={{ color: "var(--ink-soft)" }}
        >
          <Hand className="w-3.5 h-3.5" />
          <span className="font-handwritten">tap to open</span>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <WaxSeal size={48} emoji="✉" />
        </div>
      </motion.div>
    </PaperBackground>
  );
}

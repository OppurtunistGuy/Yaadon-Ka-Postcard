"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSenderStore } from "@/lib/postcard-store";
import { IntroScreen } from "./IntroScreen";
import { DetailsScreen } from "./DetailsScreen";
import { SurpriseScreen } from "./SurpriseScreen";
import { MessageScreen } from "./MessageScreen";
import { PreviewScreen } from "./PreviewScreen";
import { ShareScreen } from "./ShareScreen";

export function SenderFlow() {
  const step = useSenderStore((s) => s.step);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {step === "intro" && <IntroScreen />}
        {step === "details" && <DetailsScreen />}
        {step === "surprise" && <SurpriseScreen />}
        {step === "message" && <MessageScreen />}
        {step === "preview" && <PreviewScreen />}
        {step === "share" && <ShareScreen />}
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { SenderFlow } from "@/components/postcard/sender/SenderFlow";
import { ReceiverFlow } from "@/components/postcard/receiver/ReceiverFlow";

// Subscribe to the URL so we always read the latest `?card=` param.
function subscribe() {
  return () => {};
}

function getCardToken(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("card");
}

function getServerSnapshot(): string | null {
  return null;
}

function clearCardParam() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("card");
  window.history.replaceState({}, "", url.toString());
}

export default function Home() {
  const cardToken = useSyncExternalStore(subscribe, getCardToken, getServerSnapshot);

  if (cardToken) {
    return (
      <ReceiverFlow
        token={cardToken}
        onGoHome={() => {
          clearCardParam();
          window.location.reload();
        }}
      />
    );
  }

  return <SenderFlow />;
}

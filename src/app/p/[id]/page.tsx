import type { Metadata } from "next";
import { ReceiverFlow } from "@/components/postcard/receiver/ReceiverFlow";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const ogUrl = `/api/og?token=${id}`;

  return {
    title: "You've got a Postcard! 💌 — Yaadon ka Postcard",
    description: "Someone sent you a nostalgic postcard with a hidden surprise. Open it to read your message.",
    openGraph: {
      title: "You've got a Postcard! 💌",
      description: "Someone sent you a nostalgic postcard with a hidden surprise. Open to reveal.",
      url: `${siteUrl}/p/${id}`,
      siteName: "Yaadon ka Postcard",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: "A vintage postcard waiting to be opened",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "You've got a Postcard! 💌",
      description: "Someone sent you a nostalgic postcard with a hidden surprise.",
      images: [ogUrl],
    },
  };
}

export default async function PostcardPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <ReceiverFlow
      token={id}
      onGoHome={() => {
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }}
    />
  );
}

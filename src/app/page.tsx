import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

interface SearchParams {
  card?: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const token = params.card;

  if (token) {
    const ogUrl = `/api/og?token=${token}`;
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    return {
      title: "You've got a Postcard! 💌 — Yaadon ka Postcard",
      description:
        "Someone sent you a nostalgic postcard with a hidden Bollywood surprise. Open it to read your message.",
      openGraph: {
        title: "You've got a Postcard! 💌",
        description:
          "Someone sent you a nostalgic postcard with a hidden Bollywood surprise. Open to reveal.",
        url: `${siteUrl}/?card=${token}`,
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
        description:
          "Someone sent you a nostalgic postcard with a hidden Bollywood surprise.",
        images: [ogUrl],
      },
    };
  }

  // Default (sender) metadata
  return {
    title: "Yaadon ka Postcard — Send a Memory",
    description:
      "Write a heartfelt note on aged paper, tuck a Bollywood surprise inside, and share a link they'll never forget. A nostalgic 90s digital postcard.",
    openGraph: {
      title: "Yaadon ka Postcard — Send a Memory",
      description:
        "Write a heartfelt note, hide a Bollywood surprise, share the feeling.",
      siteName: "Yaadon ka Postcard",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Yaadon ka Postcard — Send a Memory",
      description:
        "Write a heartfelt note, hide a Bollywood surprise, share the feeling.",
    },
  };
}

export default function Page() {
  return <HomeClient />;
}

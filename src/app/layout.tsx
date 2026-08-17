import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Kalam, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yaadon Ka Postcard — Send a Memory",
  description:
    "A nostalgic digital postcard straight out of the 90s/2000s. Write a heartfelt message, hide a Bollywood surprise, and share the feeling.",
  keywords: [
    "postcard",
    "nostalgia",
    "90s",
    "Bollywood",
    "Johnny Lever",
    "Akshay Kumar",
    "Salman Khan",
    "Hrithik Roshan",
    "Ranbir Kapoor",
    "Emraan Hashmi",
  ],
  authors: [{ name: "Yaadon Ka Postcard" }],
  openGraph: {
    title: "Yaadon Ka Postcard — Send a Memory",
    description: "Write a heartfelt message, hide a Bollywood surprise, share the feeling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${kalam.variable} ${caveat.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

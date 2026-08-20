/**
 * Security utilities for Yaadon ka Postcard
 * Prevents XSS, open redirects, executable URL schemes, and invalid music links.
 */

// Simple robust HTML escaping to sanitize any untrusted text before rendering/storing
export function sanitizeText(input?: string | null): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Validates and sanitizes external media or link URLs.
 * Strictly enforces HTTPS protocol and rejects dangerous schemes (javascript:, data:, blob:, file:, etc.)
 */
export function validateHttpsUrl(rawUrl?: string | null): string | null {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // Rejection check for unsafe schemes
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("blob:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export type MusicPlatform = "youtube" | "spotify";

export interface ParsedMusic {
  url: string;
  platform: MusicPlatform;
  title: string;
}

/**
 * Validates YouTube or Spotify URLs.
 * Rejects arbitrary domains and unsafe protocols.
 */
export function parseMusicUrl(rawUrl?: string | null): ParsedMusic | null {
  const safeUrl = validateHttpsUrl(rawUrl);
  if (!safeUrl) return null;

  try {
    const parsed = new URL(safeUrl);
    const host = parsed.hostname.toLowerCase();

    // Check YouTube
    if (
      host === "www.youtube.com" ||
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be"
    ) {
      let title = "Song on YouTube";
      if (parsed.searchParams.has("v")) {
        title = `YouTube Track (${parsed.searchParams.get("v")})`;
      } else if (host === "youtu.be") {
        const id = parsed.pathname.slice(1);
        if (id) title = `YouTube Track (${id})`;
      }
      return {
        url: safeUrl,
        platform: "youtube",
        title,
      };
    }

    // Check Spotify
    if (
      host === "open.spotify.com" ||
      host === "spotify.com" ||
      host.endsWith(".spotify.com")
    ) {
      let title = "Song on Spotify";
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        title = `Spotify ${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)}`;
      }
      return {
        url: safeUrl,
        platform: "spotify",
        title,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Generates an opaque, non-sequential, random identifier (e.g. 10 characters).
 * Uses Web Crypto API when available.
 */
export function generateOpaqueId(length = 10): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      result += chars[bytes[i] % chars.length];
    }
    return result;
  }
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// In-memory rate limiting map for API routes
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

/**
 * Basic in-memory rate limiter helper for server endpoints.
 * Limits `key` to `maxRequests` per `windowMs`.
 */
export function checkRateLimit(key: string, maxRequests = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(key, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

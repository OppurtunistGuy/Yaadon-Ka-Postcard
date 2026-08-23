import zlib from "zlib";
import { db } from "./db";
import { generateOpaqueId } from "./security";

export interface PostcardPayload {
  token?: string;
  senderKey?: string | null;
  themeId?: string | null;
  receiverName: string;
  city: string;
  relationship: string;
  senderName: string;
  senderGender?: string | null;
  vibe: string;
  surpriseId?: string | null;
  message: string;
  musicUrl?: string | null;
  musicPlatform?: string | null;
  musicTitle?: string | null;
  openedAt?: Date | null;
  revealedAt?: Date | null;
  claimedAt?: Date | null;
  reaction?: string | null;
  rating?: number | null;
  comment?: string | null;
  publicName?: string | null;
  isPublic?: boolean;
  createdAt?: Date;
}

const globalForPostcards = globalThis as unknown as {
  postcardCache: Map<string, PostcardPayload> | undefined;
};

if (!globalForPostcards.postcardCache) {
  globalForPostcards.postcardCache = new Map<string, PostcardPayload>();
}

const postcardCache = globalForPostcards.postcardCache;

/**
 * Decodes legacy compressed (`p_...`), uncompressed (`P_...`), or raw tokens for backwards compatibility with older links.
 */
export function decodeSelfContainedToken(rawToken: string): PostcardPayload | null {
  if (!rawToken) return null;
  const cleanToken = decodeURIComponent(rawToken).trim();

  // Mode 1: Compressed binary token (p_)
  if (cleanToken.startsWith("p_")) {
    try {
      const rawStr = cleanToken.slice(2);
      const buf = Buffer.from(rawStr, "base64url");
      const decompressed = zlib.inflateRawSync(buf).toString("utf-8");
      const d = JSON.parse(decompressed);
      if (d && (d.r || d.receiverName)) {
        return {
          token: cleanToken,
          themeId: d.t || d.themeId || "classic",
          receiverName: d.r || d.receiverName,
          city: d.c || d.city || "",
          relationship: d.l || d.relationship || "",
          senderName: d.s || d.senderName || "",
          senderGender: d.g || d.senderGender || "male",
          vibe: d.v || d.vibe || "classic",
          surpriseId: d.i ?? d.surpriseId ?? null,
          message: d.m || d.message || "",
          musicUrl: d.mu || d.musicUrl || null,
          musicPlatform: d.mp || d.musicPlatform || null,
          musicTitle: d.mt || d.musicTitle || null,
          createdAt: new Date(),
        };
      }
    } catch {
      // ignore
    }
  }

  // Mode 2: Legacy uncompressed token (P_)
  if (cleanToken.startsWith("P_")) {
    try {
      const rawStr = cleanToken.slice(2);
      const json = Buffer.from(rawStr, "base64url").toString("utf-8");
      const d = JSON.parse(json);
      if (d && (d.r || d.receiverName)) {
        return {
          token: cleanToken,
          themeId: d.t || d.themeId || "classic",
          receiverName: d.r || d.receiverName,
          city: d.c || d.city || "",
          relationship: d.l || d.relationship || "",
          senderName: d.s || d.senderName || "",
          senderGender: d.g || d.senderGender || "male",
          vibe: d.v || d.vibe || "classic",
          surpriseId: d.i ?? d.surpriseId ?? null,
          message: d.m || d.message || "",
          musicUrl: d.mu || d.musicUrl || null,
          musicPlatform: d.mp || d.musicPlatform || null,
          musicTitle: d.mt || d.musicTitle || null,
          createdAt: new Date(),
        };
      }
    } catch {
      // ignore
    }
  }

  // Mode 3: Raw base64url JSON fallback
  try {
    const json = Buffer.from(cleanToken, "base64url").toString("utf-8");
    const d = JSON.parse(json);
    if (d && (d.r || d.receiverName)) {
      return {
        token: cleanToken,
        themeId: d.t || d.themeId || "classic",
        receiverName: d.r || d.receiverName,
        city: d.c || d.city || "",
        relationship: d.l || d.relationship || "",
        senderName: d.s || d.senderName || "",
        senderGender: d.g || d.senderGender || "male",
        vibe: d.v || d.vibe || "classic",
        surpriseId: d.i ?? d.surpriseId ?? null,
        message: d.m || d.message || "",
        musicUrl: d.mu || d.musicUrl || null,
        musicPlatform: d.mp || d.musicPlatform || null,
        musicTitle: d.mt || d.musicTitle || null,
        createdAt: new Date(),
      };
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * Creates a new postcard and ALWAYS returns an 8-character random ID (e.g. /p/a7K9xQ2m).
 * Stores payload server-side in DB + memory map. Never outputs long encoded tokens.
 */
export async function createPostcard(payload: PostcardPayload): Promise<{ token: string }> {
  const shortToken = generateOpaqueId(8);

  const fullPayload: PostcardPayload = {
    ...payload,
    token: shortToken,
    themeId: payload.themeId || "classic",
    surpriseId: payload.surpriseId || null,
    senderGender: payload.senderGender || "male",
  };

  // Cache in server memory map immediately
  postcardCache.set(shortToken, fullPayload);

  try {
    const dataToInsert: any = {
      token: shortToken,
      senderKey: payload.senderKey || null,
      themeId: payload.themeId || "classic",
      receiverName: payload.receiverName,
      city: payload.city,
      relationship: payload.relationship,
      senderName: payload.senderName,
      senderGender: payload.senderGender || "male",
      vibe: payload.vibe,
      surpriseId: payload.surpriseId || null,
      message: payload.message,
      musicUrl: payload.musicUrl || null,
      musicPlatform: payload.musicPlatform || null,
      musicTitle: payload.musicTitle || null,
    };
    await (db.postcard as any).create({
      data: dataToInsert,
    });
  } catch (e) {
    console.warn("[createPostcard] DB insert notice (cached in server memory):", e);
  }

  // ALWAYS return the clean, 8-character short token (e.g. /p/a7K9xQ2m)
  return { token: shortToken };
}

export async function fetchPostcardByToken(rawToken: string): Promise<PostcardPayload | null> {
  if (!rawToken) return null;
  const token = decodeURIComponent(rawToken).trim();

  // 1. Check memory cache first
  if (postcardCache.has(token)) {
    return postcardCache.get(token)!;
  }

  // 2. Check DB
  try {
    const cardFromDb: any = await db.postcard.findUnique({ where: { token } });
    if (cardFromDb) {
      const result: PostcardPayload = {
        token: cardFromDb.token,
        senderKey: cardFromDb.senderKey,
        themeId: cardFromDb.themeId,
        receiverName: cardFromDb.receiverName,
        city: cardFromDb.city,
        relationship: cardFromDb.relationship,
        senderName: cardFromDb.senderName,
        senderGender: cardFromDb.senderGender,
        vibe: cardFromDb.vibe,
        surpriseId: cardFromDb.surpriseId,
        message: cardFromDb.message,
        musicUrl: cardFromDb.musicUrl,
        musicPlatform: cardFromDb.musicPlatform,
        musicTitle: cardFromDb.musicTitle,
        openedAt: cardFromDb.openedAt,
        revealedAt: cardFromDb.revealedAt,
        claimedAt: cardFromDb.claimedAt,
        reaction: cardFromDb.reaction,
        rating: cardFromDb.rating,
        comment: cardFromDb.comment,
        publicName: cardFromDb.publicName,
        isPublic: cardFromDb.isPublic ?? false,
        createdAt: cardFromDb.createdAt,
      };
      postcardCache.set(token, result);
      return result;
    }
  } catch (e) {
    console.warn("[fetchPostcardByToken] DB lookup notice:", e);
  }

  // 3. Decode legacy compressed or self-contained token (for backwards compatibility with older links)
  const decoded = decodeSelfContainedToken(token);
  if (decoded) {
    postcardCache.set(token, decoded);
    return decoded;
  }

  return null;
}

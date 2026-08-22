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
  surpriseId: string;
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
 * Encodes payload into a compact, self-contained compressed token.
 * Uses deflateRaw binary compression + base64url for ultra-short URL tokens.
 */
export function encodeSelfContainedToken(payload: PostcardPayload): string {
  const compact = {
    t: payload.themeId || "classic",
    r: payload.receiverName,
    c: payload.city,
    l: payload.relationship,
    s: payload.senderName,
    g: payload.senderGender || "male",
    v: payload.vibe,
    i: payload.surpriseId,
    m: payload.message,
    mu: payload.musicUrl || null,
    mp: payload.musicPlatform || null,
    mt: payload.musicTitle || null,
  };
  const json = JSON.stringify(compact);
  try {
    const compressed = zlib.deflateRawSync(Buffer.from(json, "utf-8"));
    const base64url = compressed.toString("base64url");
    return `p_${base64url}`;
  } catch {
    const base64 = Buffer.from(json, "utf-8").toString("base64url");
    return `P_${base64}`;
  }
}

/**
 * Decodes compressed (`p_...`), uncompressed (`P_...`), or legacy raw tokens into a full PostcardPayload object.
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
      if (d && (d.r || d.receiverName) && (d.i || d.surpriseId)) {
        return {
          token: cleanToken,
          themeId: d.t || d.themeId || "classic",
          receiverName: d.r || d.receiverName,
          city: d.c || d.city || "",
          relationship: d.l || d.relationship || "",
          senderName: d.s || d.senderName || "",
          senderGender: d.g || d.senderGender || "male",
          vibe: d.v || d.vibe || "classic",
          surpriseId: d.i || d.surpriseId,
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
      if (d && (d.r || d.receiverName) && (d.i || d.surpriseId)) {
        return {
          token: cleanToken,
          themeId: d.t || d.themeId || "classic",
          receiverName: d.r || d.receiverName,
          city: d.c || d.city || "",
          relationship: d.l || d.relationship || "",
          senderName: d.s || d.senderName || "",
          senderGender: d.g || d.senderGender || "male",
          vibe: d.v || d.vibe || "classic",
          surpriseId: d.i || d.surpriseId,
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
    if (d && (d.r || d.receiverName) && (d.i || d.surpriseId)) {
      return {
        token: cleanToken,
        themeId: d.t || d.themeId || "classic",
        receiverName: d.r || d.receiverName,
        city: d.c || d.city || "",
        relationship: d.l || d.relationship || "",
        senderName: d.s || d.senderName || "",
        senderGender: d.g || d.senderGender || "male",
        vibe: d.v || d.vibe || "classic",
        surpriseId: d.i || d.surpriseId,
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

export async function createPostcard(payload: PostcardPayload): Promise<{ token: string }> {
  // Generate a clean, short 8-character unpredictable random ID (e.g. a7K9xQ2m)
  const shortToken = generateOpaqueId(8);

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
      surpriseId: payload.surpriseId,
      message: payload.message,
      musicUrl: payload.musicUrl || null,
      musicPlatform: payload.musicPlatform || null,
      musicTitle: payload.musicTitle || null,
    };
    await (db.postcard as any).create({
      data: dataToInsert,
    });
    // Cache in server memory map
    postcardCache.set(shortToken, { ...payload, token: shortToken });
    return { token: shortToken };
  } catch (e) {
    console.warn("[createPostcard] DB save notice (in-memory mapping active):", e);
    postcardCache.set(shortToken, { ...payload, token: shortToken });
    return { token: shortToken };
  }
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

  // 3. Decode compressed or self-contained token
  const decoded = decodeSelfContainedToken(token);
  if (decoded) {
    postcardCache.set(token, decoded);
    return decoded;
  }

  return null;
}

import { db } from "./db";
import { generateOpaqueId } from "./security";

export interface PostcardPayload {
  token?: string;
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
  reaction?: string | null;
  createdAt?: Date;
}

const globalForPostcards = globalThis as unknown as {
  postcardCache: Map<string, PostcardPayload> | undefined;
};

if (!globalForPostcards.postcardCache) {
  globalForPostcards.postcardCache = new Map<string, PostcardPayload>();
}

const postcardCache = globalForPostcards.postcardCache;

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
  const base64 = Buffer.from(json, "utf-8").toString("base64url");
  return `P_${base64}`;
}

export function decodeSelfContainedToken(token: string): PostcardPayload | null {
  if (!token.startsWith("P_")) return null;
  try {
    const rawStr = token.slice(2);
    const json = Buffer.from(rawStr, "base64url").toString("utf-8");
    const d = JSON.parse(json);
    if (!d || !d.r || !d.i) return null;

    return {
      token,
      themeId: d.t || "classic",
      receiverName: d.r,
      city: d.c || "",
      relationship: d.l || "",
      senderName: d.s || "",
      senderGender: d.g || "male",
      vibe: d.v || "classic",
      surpriseId: d.i,
      message: d.m || "",
      musicUrl: d.mu || null,
      musicPlatform: d.mp || null,
      musicTitle: d.mt || null,
      createdAt: new Date(),
    };
  } catch {
    return null;
  }
}

export async function createPostcard(payload: PostcardPayload): Promise<{ token: string }> {
  // Always create fallback self-contained token
  const selfContainedToken = encodeSelfContainedToken(payload);
  const opaqueToken = generateOpaqueId(10);

  // Cache in memory
  postcardCache.set(selfContainedToken, { ...payload, token: selfContainedToken });
  postcardCache.set(opaqueToken, { ...payload, token: opaqueToken });

  let savedToDb = false;
  try {
    const dataToInsert: any = {
      token: opaqueToken,
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
    savedToDb = true;
  } catch (e) {
    console.warn("[createPostcard] DB create warning, using failproof self-contained token fallback:", e);
  }

  // If DB create failed or if running on Vercel ephemeral filesystem, use selfContainedToken to ensure 100% reliability
  const finalToken = (savedToDb && !process.env.VERCEL) ? opaqueToken : selfContainedToken;
  postcardCache.set(finalToken, { ...payload, token: finalToken });

  return { token: finalToken };
}

export async function fetchPostcardByToken(token: string): Promise<PostcardPayload | null> {
  if (!token) return null;

  // 1. Check memory cache first
  if (postcardCache.has(token)) {
    return postcardCache.get(token)!;
  }

  // 2. Check DB
  try {
    const cardFromDb = await db.postcard.findUnique({ where: { token } });
    if (cardFromDb) {
      const result: PostcardPayload = {
        token: cardFromDb.token,
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
        reaction: cardFromDb.reaction,
        createdAt: cardFromDb.createdAt,
      };
      postcardCache.set(token, result);
      return result;
    }
  } catch (e) {
    console.warn("[fetchPostcardByToken] DB lookup warning:", e);
  }

  // 3. Check self-contained P_ token
  const decoded = decodeSelfContainedToken(token);
  if (decoded) {
    postcardCache.set(token, decoded);
    return decoded;
  }

  return null;
}

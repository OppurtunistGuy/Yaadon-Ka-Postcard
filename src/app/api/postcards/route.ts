import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SURPRISES } from "@/lib/surprises";
import { FESTIVAL_THEMES } from "@/lib/festival-themes";
import { sanitizeText, parseMusicUrl, generateOpaqueId, checkRateLimit } from "@/lib/security";

function getValidSurpriseIds(): Set<string> {
  return new Set(SURPRISES.map((s) => s.id));
}

const ALLOWED_VIBES = ["jolly", "romantic", "action", "classic", "rakhi", "ganpati"];

export async function POST(req: NextRequest) {
  try {
    // Rate limit checking per IP
    const clientIp = req.headers.get("x-forwarded-for") || "client-ip";
    if (!checkRateLimit(`create:${clientIp}`, 30, 60000)) {
      return NextResponse.json(
        { ok: false, errors: ["Too many requests. Please try again later."] },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      themeId,
      receiverName,
      city,
      relationship,
      senderName,
      vibe,
      surpriseId,
      message,
      musicUrl,
    } = body ?? {};

    // Theme validation
    const validThemeIds = FESTIVAL_THEMES.map((t) => t.id);
    const cleanThemeId = themeId && validThemeIds.includes(themeId) ? themeId : "classic";
    const cleanVibe = vibe || (cleanThemeId === "rakhi" ? "rakhi" : cleanThemeId === "ganpati" ? "ganpati" : "classic");

    // Validate required fields
    const errors: string[] = [];
    if (!receiverName || typeof receiverName !== "string" || receiverName.trim().length < 1)
      errors.push("Receiver name is required");
    if (!city || typeof city !== "string" || city.trim().length < 1)
      errors.push("City is required");
    if (!relationship || typeof relationship !== "string" || relationship.trim().length < 1)
      errors.push("Relationship is required");
    if (!senderName || typeof senderName !== "string" || senderName.trim().length < 1)
      errors.push("Sender name is required");
    if (!message || typeof message !== "string" || message.trim().length < 3)
      errors.push("Message is too short");

    if (!cleanVibe || !ALLOWED_VIBES.includes(cleanVibe)) errors.push("Pick a valid vibe");

    const validSurprises = getValidSurpriseIds();
    if (!surpriseId || !validSurprises.has(surpriseId as string))
      errors.push("Pick a valid surprise");

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Music validation
    let cleanMusicUrl: string | null = null;
    let musicPlatform: string | null = null;
    let musicTitle: string | null = null;

    if (musicUrl && (cleanVibe === "romantic" || cleanVibe === "action")) {
      const parsedMusic = parseMusicUrl(musicUrl);
      if (parsedMusic) {
        cleanMusicUrl = parsedMusic.url;
        musicPlatform = parsedMusic.platform;
        musicTitle = parsedMusic.title;
      }
    }

    // Sanitize user text
    const payloadData = {
      themeId: cleanThemeId,
      receiverName: sanitizeText(receiverName).slice(0, 60),
      city: sanitizeText(city).slice(0, 60),
      relationship: sanitizeText(relationship).slice(0, 40),
      senderName: sanitizeText(senderName).slice(0, 60),
      senderGender: body.senderGender === "female" ? "female" : "male",
      vibe: cleanVibe,
      surpriseId,
      message: sanitizeText(message).slice(0, 1200),
      musicUrl: cleanMusicUrl,
      musicPlatform,
      musicTitle,
    };

    // Opaque 10-char random token (non-sequential, no internal data)
    const token = generateOpaqueId(10);

    try {
      await db.postcard.create({
        data: {
          token,
          ...payloadData,
        },
      });
    } catch (e) {
      console.error("[POST /api/postcards] Database create error:", e);
      return NextResponse.json(
        { ok: false, errors: ["Could not save postcard. Please try again."] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      token,
    });
  } catch (err) {
    console.error("[POST /api/postcards]", err);
    return NextResponse.json(
      { ok: false, errors: ["Something went wrong. Try again."] },
      { status: 500 }
    );
  }
}

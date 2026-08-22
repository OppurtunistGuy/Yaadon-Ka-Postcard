import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SURPRISES } from "@/lib/surprises";
import { FESTIVAL_THEMES } from "@/lib/festival-themes";
import { sanitizeText, parseMusicUrl, generateOpaqueId, checkRateLimit } from "@/lib/security";
import { createPostcard } from "@/lib/postcard-store-server";
import { validateName, validateCityText, validateRelationshipText } from "@/lib/name-validation";
import { trackEvent } from "@/lib/analytics";

function getValidSurpriseIds(): Set<string> {
  const ids = new Set<string>();
  for (const s of SURPRISES) {
    if (s.id) ids.add(s.id);
    if (s.rakhiId) ids.add(s.rakhiId);
    if (s.ganpatiImgId) ids.add(s.ganpatiImgId);
  }
  return ids;
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

    // Validate and normalize required fields
    const errors: string[] = [];

    const rRes = validateName(receiverName ?? "", { minLen: 2, maxLen: 50 });
    if (!rRes.valid) errors.push(rRes.error || "Please enter a valid receiver name.");

    const cRes = validateCityText(city ?? "");
    if (!cRes.valid) errors.push(cRes.error || "Please enter a valid city.");

    const relRes = validateRelationshipText(relationship ?? "");
    if (!relRes.valid) errors.push(relRes.error || "Please enter a valid relationship.");

    const sRes = validateName(senderName ?? "", { minLen: 2, maxLen: 50 });
    if (!sRes.valid) errors.push(sRes.error || "Please enter a valid sender name.");

    if (!message || typeof message !== "string" || message.trim().length < 3) {
      errors.push("Message is too short");
    } else if (message.trim().length > 500) {
      errors.push("Message must be 500 characters or fewer for a postcard");
    }

    if (!cleanVibe || !ALLOWED_VIBES.includes(cleanVibe)) errors.push("Pick a valid vibe");

    const isFestivalTheme = cleanThemeId === "rakhi" || cleanThemeId === "ganpati";
    if (isFestivalTheme && (!surpriseId || surpriseId === "none")) {
      errors.push("Please select a festival surprise.");
    }

    const validSurprises = getValidSurpriseIds();
    const cleanSurpriseId = surpriseId && validSurprises.has(surpriseId as string) ? surpriseId : null;

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Music validation
    let cleanMusicUrl: string | null = null;
    let musicPlatform: string | null = null;
    let musicTitle: string | null = null;

    if (musicUrl) {
      const parsedMusic = parseMusicUrl(musicUrl);
      if (parsedMusic) {
        cleanMusicUrl = parsedMusic.url;
        musicPlatform = parsedMusic.platform;
        musicTitle = parsedMusic.title;
      }
    }

    const senderKey = req.cookies.get("sender_session")?.value || req.headers.get("x-sender-key") || body.senderKey || null;

    // Sanitize user text
    const payloadData = {
      themeId: cleanThemeId,
      senderKey,
      receiverName: rRes.normalized,
      city: cRes.normalized,
      relationship: relRes.normalized,
      senderName: sRes.normalized,
      senderGender: body.senderGender === "female" ? "female" : "male",
      vibe: cleanVibe,
      surpriseId: cleanSurpriseId || null,
      message: sanitizeText(message).slice(0, 500),
      musicUrl: cleanMusicUrl,
      musicPlatform,
      musicTitle,
    };

    const { token } = await createPostcard(payloadData);
    trackEvent({ event: "postcard_created", themeId: cleanThemeId });
    trackEvent({ event: "postcard_sent", themeId: cleanThemeId });

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

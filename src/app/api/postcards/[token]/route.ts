import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSurpriseById, getVibeMeta } from "@/lib/surprises";
import { checkRateLimit, sanitizeText } from "@/lib/security";
import { fetchPostcardByToken } from "@/lib/postcard-store-server";
import { trackEvent } from "@/lib/analytics";

function formatPublicDisplayName(rawName?: string | null): string | null {
  if (!rawName) return null;
  const clean = sanitizeText(rawName).trim();
  if (!clean) return null;

  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0];
  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0]?.toUpperCase();
  return lastInitial ? `${firstName} ${lastInitial}.` : firstName;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "client-ip";
    if (!checkRateLimit(`get:${clientIp}`, 60, 60000)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    const { token } = await params;
    if (!token || typeof token !== "string" || token.length > 4096) {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid token" },
        { status: 400 }
      );
    }

    const card = await fetchPostcardByToken(token);

    if (!card) {
      return NextResponse.json(
        { ok: false, error: "This postcard could not be found. Maybe it got lost in the mail." },
        { status: 404 }
      );
    }

    const hasSurprise = Boolean(card.surpriseId && card.surpriseId !== "none");
    const surprise = hasSurprise ? getSurpriseById(card.surpriseId) : null;

    return NextResponse.json({
      ok: true,
      postcard: {
        token: card.token,
        themeId: card.themeId || "classic",
        receiverName: sanitizeText(card.receiverName),
        city: sanitizeText(card.city),
        relationship: sanitizeText(card.relationship),
        senderName: sanitizeText(card.senderName),
        senderGender: card.senderGender || "male",
        vibe: card.vibe,
        vibeMeta: getVibeMeta(card.vibe as "jolly" | "romantic" | "action" | "classic"),
        surpriseId: card.surpriseId || null,
        message: sanitizeText(card.message),
        musicUrl: card.musicUrl || null,
        musicPlatform: card.musicPlatform || null,
        musicTitle: card.musicTitle || null,
        createdAt: card.createdAt,
        openedAt: card.openedAt,
        revealedAt: card.revealedAt,
        reaction: card.reaction,
        rating: card.rating,
        comment: card.comment,
        publicName: card.publicName,
        isPublic: card.isPublic ?? false,
      },
      surprise: surprise
        ? {
            id: surprise.id,
            vibe: surprise.vibe,
            type: surprise.type,
            title: surprise.title,
            character: surprise.character,
            movie: surprise.movie,
            quote: surprise.quote,
            caption: surprise.caption,
            emoji: surprise.emoji,
            gifUrl: surprise.gifUrl,
            gif: surprise.gif,
            accent: surprise.accent,
            rakhiId: surprise.rakhiId,
            ganpatiImgId: surprise.ganpatiImgId,
          }
        : null,
    });
  } catch (err) {
    console.error("[GET /api/postcards/[token]]", err);
    return NextResponse.json(
      { ok: false, error: "Could not fetch postcard." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await req.json().catch(() => ({}));
    const action = body?.action;
    const reaction = typeof body?.reaction === "string" ? sanitizeText(body.reaction).slice(0, 16) : null;
    const rating = typeof body?.rating === "number" && body.rating >= 1 && body.rating <= 5 ? body.rating : null;
    const comment = typeof body?.comment === "string" ? sanitizeText(body.comment).slice(0, 300) : null;
    const isPublic = Boolean(body?.isPublic);
    const rawPublicName = typeof body?.publicName === "string" ? body.publicName : null;

    let card: any = null;
    try {
      card = await db.postcard.findUnique({ where: { token } });
    } catch {
      // ignore
    }

    if (!card) {
      return NextResponse.json({ ok: true, reaction: reaction || null });
    }

    const data: any = {};
    if (action === "open" && !card.openedAt) {
      data.openedAt = new Date();
      trackEvent({ event: "postcard_opened", themeId: card.themeId });
    }
    if (action === "reveal" && !card.revealedAt) {
      data.revealedAt = new Date();
      trackEvent({ event: "surprise_revealed", themeId: card.themeId });
    }
    if (action === "react" && reaction !== null) {
      data.reaction = reaction || null;
      trackEvent({ event: "feedback_submitted", themeId: card.themeId });
    }
    if (action === "feedback") {
      if (rating !== null) data.rating = rating;
      if (comment !== null) data.comment = comment;
      data.isPublic = isPublic;
      data.publicName = isPublic ? formatPublicDisplayName(rawPublicName) : null;
      trackEvent({ event: "feedback_submitted", rating: rating || undefined, themeId: card.themeId });
    }
    if (action === "claim" && !card.claimedAt) {
      data.claimedAt = new Date();
    }

    if (Object.keys(data).length > 0) {
      try {
        await db.postcard.update({ where: { token }, data });
      } catch {
        // ignore DB update failure
      }
    }

    return NextResponse.json({
      ok: true,
      reaction: data.reaction ?? card.reaction,
      rating: data.rating ?? card.rating,
      isPublic: data.isPublic ?? card.isPublic,
    });
  } catch (err) {
    console.error("[PATCH /api/postcards/[token]]", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }
}

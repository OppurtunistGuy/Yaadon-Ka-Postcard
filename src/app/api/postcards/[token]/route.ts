import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSurpriseById, getVibeMeta } from "@/lib/surprises";
import { checkRateLimit, sanitizeText } from "@/lib/security";
import { fetchPostcardByToken } from "@/lib/postcard-store-server";

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

    const surprise = getSurpriseById(card.surpriseId);
    if (!surprise) {
      return NextResponse.json(
        { ok: false, error: "Surprise missing for this postcard." },
        { status: 404 }
      );
    }

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
        surpriseId: card.surpriseId,
        message: sanitizeText(card.message),
        musicUrl: card.musicUrl || null,
        musicPlatform: card.musicPlatform || null,
        musicTitle: card.musicTitle || null,
        createdAt: card.createdAt,
        openedAt: card.openedAt,
        revealedAt: card.revealedAt,
        reaction: card.reaction,
      },
      surprise: {
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
      },
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

    let card: any = null;
    try {
      card = await db.postcard.findUnique({ where: { token } });
    } catch {
      // ignore
    }

    if (!card) {
      return NextResponse.json({ ok: true, reaction: reaction || null });
    }

    const data: { openedAt?: Date; revealedAt?: Date; reaction?: string | null } = {};
    if (action === "open" && !card.openedAt) data.openedAt = new Date();
    if (action === "reveal" && !card.revealedAt) data.revealedAt = new Date();
    if (action === "react" && reaction !== null) {
      data.reaction = reaction || null;
    }

    if (Object.keys(data).length > 0) {
      try {
        await db.postcard.update({ where: { token }, data });
      } catch {
        // ignore DB update failure
      }
    }

    return NextResponse.json({ ok: true, reaction: data.reaction ?? card.reaction });
  } catch (err) {
    console.error("[PATCH /api/postcards/[token]]", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }
}

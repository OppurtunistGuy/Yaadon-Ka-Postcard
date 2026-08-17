import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSurpriseById, getVibeMeta } from "@/lib/surprises";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Missing token" },
        { status: 400 }
      );
    }

    const card = await db.postcard.findUnique({ where: { token } });
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
        receiverName: card.receiverName,
        city: card.city,
        relationship: card.relationship,
        senderName: card.senderName,
        vibe: card.vibe,
        vibeMeta: getVibeMeta(card.vibe as "jolly" | "romantic" | "action" | "classic"),
        surpriseId: card.surpriseId,
        message: card.message,
        createdAt: card.createdAt,
        openedAt: card.openedAt,
        revealedAt: card.revealedAt,
      },
      // We still hide the full surprise here — the reveal is a separate action
      // so it can be "locked" client-side until tapped. But for the receiver
      // we send the surprise too (it's just blurred on the client).
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
        accent: surprise.accent,
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

// Mark postcard opened / revealed (lightweight analytics)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await req.json().catch(() => ({}));
    const action = body?.action; // "open" | "reveal"

    const card = await db.postcard.findUnique({ where: { token } });
    if (!card) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const data: { openedAt?: Date; revealedAt?: Date } = {};
    if (action === "open" && !card.openedAt) data.openedAt = new Date();
    if (action === "reveal" && !card.revealedAt) data.revealedAt = new Date();

    if (Object.keys(data).length > 0) {
      await db.postcard.update({ where: { token }, data });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PATCH /api/postcards/[token]]", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }
}

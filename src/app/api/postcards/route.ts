import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SURPRISES, VIBES } from "@/lib/surprises";

function generateToken(): string {
  // Friendly postcard token: 3 blocks of 4 chars
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const block = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${block()}-${block()}-${block()}`;
}

function getValidSurpriseIds(): Set<string> {
  return new Set(SURPRISES.map((s) => s.id));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      receiverName,
      city,
      relationship,
      senderName,
      vibe,
      surpriseId,
      message,
    } = body ?? {};

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

    const validVibes = VIBES.map((v) => v.id);
    if (!vibe || !validVibes.includes(vibe)) errors.push("Pick a vibe");

    const validSurprises = getValidSurpriseIds();
    if (!surpriseId || !validSurprises.has(surpriseId as string))
      errors.push("Pick a surprise");

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Ensure token uniqueness
    let token = generateToken();
    let exists = await db.postcard.findUnique({ where: { token } });
    let attempts = 0;
    while (exists && attempts < 10) {
      token = generateToken();
      exists = await db.postcard.findUnique({ where: { token } });
      attempts++;
    }

    const postcard = await db.postcard.create({
      data: {
        token,
        receiverName: receiverName.trim().slice(0, 60),
        city: city.trim().slice(0, 60),
        relationship: relationship.trim().slice(0, 40),
        senderName: senderName.trim().slice(0, 60),
        vibe,
        surpriseId,
        message: message.trim().slice(0, 1200),
      },
    });

    return NextResponse.json({
      ok: true,
      token: postcard.token,
      id: postcard.id,
    });
  } catch (err) {
    console.error("[POST /api/postcards]", err);
    return NextResponse.json(
      { ok: false, errors: ["Something went wrong. Try again."] },
      { status: 500 }
    );
  }
}

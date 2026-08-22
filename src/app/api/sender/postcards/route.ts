import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { fetchPostcardByToken } from "@/lib/postcard-store-server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    let senderKey = req.cookies.get("sender_session")?.value || req.headers.get("x-sender-key");
    let isNewKey = false;

    if (!senderKey) {
      senderKey = `sk_${crypto.randomBytes(16).toString("hex")}`;
      isNewKey = true;
    }

    // Read extra token parameters passed by client for local storage sync
    const url = new URL(req.url);
    const localTokensParam = url.searchParams.get("localTokens");
    const localTokens = localTokensParam ? localTokensParam.split(",").map((t) => t.trim()).filter(Boolean) : [];

    // Query postcards belonging to this senderKey
    let cardsFromDb = await (db.postcard as any).findMany({
      where: {
        OR: [
          { senderKey },
          ...(localTokens.length > 0 ? [{ token: { in: localTokens } }] : []),
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    // Also resolve any self-contained tokens from local storage if DB missed them
    const existingTokens = new Set(cardsFromDb.map((c: any) => c.token));
    const extraCards: any[] = [];

    for (const t of localTokens) {
      if (!existingTokens.has(t)) {
        const fetched = await fetchPostcardByToken(t);
        if (fetched) {
          extraCards.push({
            token: fetched.token,
            receiverName: fetched.receiverName,
            city: fetched.city,
            themeId: fetched.themeId || "classic",
            createdAt: fetched.createdAt || new Date(),
            openedAt: fetched.openedAt || null,
            revealedAt: fetched.revealedAt || null,
            claimedAt: fetched.claimedAt || null,
            reaction: fetched.reaction || null,
          });
        }
      }
    }

    const allCards = [...cardsFromDb, ...extraCards];

    const totalSent = allCards.length;
    const remainingCredits = Math.max(0, 10 - totalSent);
    const openedCount = allCards.filter((c: any) => c.openedAt).length;
    const revealedCount = allCards.filter((c: any) => c.revealedAt).length;

    const formattedPostcards = allCards.map((c: any) => {
      let status = "Created";
      if (c.claimedAt) status = "Claimed";
      else if (c.revealedAt) status = "Surprise Revealed";
      else if (c.openedAt) status = "Opened";

      return {
        token: c.token,
        receiverName: c.receiverName,
        city: c.city,
        themeId: c.themeId || "classic",
        createdAt: c.createdAt,
        openedAt: c.openedAt,
        revealedAt: c.revealedAt,
        claimedAt: c.claimedAt,
        reaction: c.reaction,
        status,
      };
    });

    const res = NextResponse.json({
      ok: true,
      senderKey,
      stats: {
        totalSent,
        remainingCredits,
        openedCount,
        revealedCount,
      },
      postcards: formattedPostcards,
    });

    if (isNewKey) {
      res.cookies.set("sender_session", senderKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60, // 1 year
        path: "/",
      });
    }

    return res;
  } catch (e) {
    console.error("[GET /api/sender/postcards]", e);
    return NextResponse.json({ ok: false, error: "Failed to load postcards" }, { status: 500 });
  }
}

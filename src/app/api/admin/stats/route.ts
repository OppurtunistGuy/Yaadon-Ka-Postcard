import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminToken } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("admin_session")?.value;
    if (!sessionCookie || !verifyAdminToken(sessionCookie)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 1. Postcard aggregate counts
    const totalSent = await (db.postcard as any).count();
    const todayCount = await (db.postcard as any).count({
      where: { createdAt: { gte: todayStart } },
    });
    const weekCount = await (db.postcard as any).count({
      where: { createdAt: { gte: weekAgo } },
    });
    const monthCount = await (db.postcard as any).count({
      where: { createdAt: { gte: monthAgo } },
    });

    // 2. Open & Reveal rates
    const openedCount = await (db.postcard as any).count({
      where: { openedAt: { not: null } },
    });
    const revealedCount = await (db.postcard as any).count({
      where: { revealedAt: { not: null } },
    });

    const openRate = totalSent > 0 ? Math.round((openedCount / totalSent) * 100) : 0;
    const revealRate = openedCount > 0 ? Math.round((revealedCount / openedCount) * 100) : 0;

    // 3. Theme Breakdown
    const classicCount = await (db.postcard as any).count({
      where: { OR: [{ themeId: "classic" }, { themeId: null }] },
    });
    const rakhiCount = await (db.postcard as any).count({
      where: { themeId: "rakhi" },
    });
    const ganpatiCount = await (db.postcard as any).count({
      where: { themeId: "ganpati" },
    });

    // 4. Reactions breakdown
    const postcardsWithReaction = await (db.postcard as any).findMany({
      where: { reaction: { not: null } },
      select: { reaction: true },
    });

    const reactionCounts: Record<string, number> = {};
    for (const item of postcardsWithReaction) {
      if (item.reaction) {
        reactionCounts[item.reaction] = (reactionCounts[item.reaction] || 0) + 1;
      }
    }

    // 5. Ratings & Feedback aggregate stats
    const ratedPostcards = await (db.postcard as any).findMany({
      where: { rating: { not: null } },
      select: { rating: true },
    });

    const totalFeedbacks = ratedPostcards.length;
    let sumRating = 0;
    const ratingBreakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    for (const card of ratedPostcards) {
      const r = card.rating as number;
      sumRating += r;
      if (ratingBreakdown[r] !== undefined) {
        ratingBreakdown[r]++;
      }
    }

    const avgRating = totalFeedbacks > 0 ? Number((sumRating / totalFeedbacks).toFixed(1)) : 0;

    // 6. Opted-in Public Feedbacks ONLY (No messages, no cities, no recipient details!)
    const publicFeedbackRecords = await (db.postcard as any).findMany({
      where: {
        isPublic: true,
        rating: { not: null },
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        publicName: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const publicFeedbacks = publicFeedbackRecords.map((item: any) => ({
      id: item.id,
      rating: item.rating,
      comment: item.comment || "",
      displayName: item.publicName || "Anonymous",
      createdAt: item.createdAt,
    }));

    return NextResponse.json({
      ok: true,
      stats: {
        totalSent,
        todayCount,
        weekCount,
        monthCount,
        openedCount,
        openRate,
        revealedCount,
        revealRate,
        themeBreakdown: {
          classic: classicCount,
          rakhi: rakhiCount,
          ganpati: ganpatiCount,
        },
        reactionCounts,
        feedbackStats: {
          totalFeedbacks,
          avgRating,
          ratingBreakdown,
        },
        publicFeedbacks,
      },
    });
  } catch (e) {
    console.error("[GET /api/admin/stats]", e);
    return NextResponse.json({ ok: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}

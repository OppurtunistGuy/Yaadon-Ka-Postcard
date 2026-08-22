import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, createAdminToken } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body ?? {};

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        { ok: false, error: "Invalid admin password" },
        { status: 401 }
      );
    }

    const token = createAdminToken();
    const response = NextResponse.json({ ok: true });

    // Set HTTP-only secure cookie
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("[POST /api/admin/login]", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

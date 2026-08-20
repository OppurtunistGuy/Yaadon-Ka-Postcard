import { ImageResponse } from "next/og";
import { db } from "@/lib/db";
import { getSurpriseById, getVibeMeta } from "@/lib/surprises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BG = "#f7eed8";
const INK = "#3b2418";
const INK_SOFT = "#6b4a35";
const BURGUNDY = "#7a1f23";
const POSTAL_RED = "#b4351f";
const POSTAL_BLUE = "#1f4a7a";
const AIRMAIL_RED = "#c63832";
const AIRMAIL_BLUE = "#2b5d8e";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  let card: any = null;
  try {
    card = await db.postcard.findUnique({ where: { token } });
  } catch {
    // fall through to fallback
  }

  if (!card && token && token.startsWith("P_")) {
    try {
      const json = Buffer.from(token.slice(2), "base64url").toString("utf-8");
      card = JSON.parse(json);
    } catch {
      // ignore
    }
  }

  const surprise = card ? getSurpriseById(card.surpriseId) : undefined;
  const vibeMeta = card ? getVibeMeta(card.vibe as "jolly" | "romantic" | "action" | "classic") : undefined;


  const receiverName = card?.receiverName ?? "My Dear";
  const senderName = card?.senderName ?? "Yaadon ka Postcard";
  const city = card?.city ?? "India";
  const relationship = card?.relationship ?? "";
  const vibeLabel = vibeMeta?.label ?? "Classic";
  const vibeEmoji = vibeMeta?.emoji ?? "✨";
  const surpriseEmoji = surprise?.emoji ?? "🎁";
  // Don't spoil the specific surprise — keep it mysterious for click-through
  const surpriseTeaser = "A hidden Bollywood surprise awaits";

  // Build a vintage postcard OG image (1200x630)
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          padding: 0,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Airmail border (top & bottom stripes) */}
        <div
          style={{
            height: 24,
            display: "flex",
            background: `repeating-linear-gradient(-45deg, ${AIRMAIL_RED} 0, ${AIRMAIL_RED} 12px, ${BG} 12px, ${BG} 24px, ${AIRMAIL_BLUE} 24px, ${AIRMAIL_BLUE} 36px, ${BG} 36px, ${BG} 48px)`,
          }}
        />
        {/* Main body */}
        <div
          style={{
            flex: 1,
            display: "flex",
            padding: "36px 56px",
            gap: 32,
          }}
        >
          {/* Left: stamps + header + message */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 16, color: INK_SOFT, fontStyle: "italic" }}>Inland Postcard · Bharat</div>
                <div style={{ fontSize: 40, fontWeight: 800, color: BURGUNDY, lineHeight: 1.1 }}>Yaadon ka Postcard</div>
                <div style={{ fontSize: 14, color: INK_SOFT, letterSpacing: 2, marginTop: 4 }}>♡ POSTED WITH LOVE ♡</div>
              </div>
              {/* Postmark circle */}
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  border: `3px solid ${POSTAL_RED}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: POSTAL_RED,
                  transform: "rotate(-12deg)",
                  opacity: 0.85,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DELIVERED</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{city.toUpperCase()}</div>
                <div style={{ fontSize: 11, marginTop: 2 }}>by Yaadon</div>
              </div>
            </div>

            {/* To: line */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 28, paddingBottom: 12, borderBottom: `2px dashed ${INK_SOFT}55` }}>
              <span style={{ fontSize: 14, color: INK_SOFT, letterSpacing: 2, fontWeight: 700 }}>TO:</span>
              <span style={{ fontSize: 30, fontWeight: 700, color: INK }}>{receiverName}</span>
              {relationship ? (
                <span style={{ fontSize: 18, color: INK_SOFT, fontStyle: "italic" }}>({relationship})</span>
              ) : null}
            </div>

            {/* Message preview */}
            <div style={{ display: "flex", flexDirection: "column", marginTop: 24, fontSize: 24, color: INK, lineHeight: 1.4, flex: 1 }}>
              <span>You&apos;ve got a postcard waiting for you...</span>
              <span style={{ fontSize: 20, color: INK_SOFT, fontStyle: "italic", marginTop: 8 }}>
                Tap the link to read your message &amp; reveal a hidden surprise.
              </span>
            </div>

            {/* From line */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 16 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 12, color: INK_SOFT, letterSpacing: 2 }}>WITH LOVE,</div>
                <div style={{ fontSize: 44, fontWeight: 800, color: BURGUNDY, fontStyle: "italic" }}>{senderName}</div>
              </div>
              {/* vibe stamp */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 90,
                  height: 100,
                  border: `2px solid ${BURGUNDY}`,
                  backgroundColor: "#f3e6c4",
                  borderRadius: 4,
                  boxShadow: "inset 0 0 12px rgba(90,50,20,0.2)",
                }}
              >
                <span style={{ fontSize: 36 }}>{vibeEmoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: BURGUNDY, letterSpacing: 1, marginTop: 4 }}>{vibeLabel.toUpperCase()}</span>
                <span style={{ fontSize: 8, color: INK_SOFT, marginTop: 2 }}>India Post · ₹2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Surprise strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 56px",
            backgroundColor: "#f3e6c4",
            borderTop: `2px dashed ${BURGUNDY}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 44 }}>{surpriseEmoji}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 12, color: INK_SOFT, letterSpacing: 3, fontWeight: 700 }}>A LITTLE SURPRISE INSIDE</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: INK, fontStyle: "italic" }}>{surpriseTeaser}</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 16, color: BURGUNDY, fontWeight: 700, fontStyle: "italic" }}>
            🔗 Open to reveal →
          </div>
        </div>

        {/* Airmail border (bottom) */}
        <div
          style={{
            height: 24,
            display: "flex",
            background: `repeating-linear-gradient(-45deg, ${AIRMAIL_RED} 0, ${AIRMAIL_RED} 12px, ${BG} 12px, ${BG} 24px, ${AIRMAIL_BLUE} 24px, ${AIRMAIL_BLUE} 36px, ${BG} 36px, ${BG} 48px)`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

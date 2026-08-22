import crypto from "crypto";

const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "yaadon_admin_2026_secret_key";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "yaadon_admin_secret";

/**
 * Verifies admin password securely using timing-safe comparison.
 */
export function verifyAdminPassword(inputPassword: string): boolean {
  if (!inputPassword) return false;
  const a = Buffer.from(inputPassword);
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Creates a signed admin session token valid for 24 hours.
 */
export function createAdminToken(): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  const payload = `admin:${expiresAt}`;
  const hmac = crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64url");
}

/**
 * Verifies a signed admin session token.
 */
export function verifyAdminToken(token: string): boolean {
  if (!token) return false;
  try {
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const [role, expiresAtStr, hmac] = raw.split(":");
    if (role !== "admin" || !expiresAtStr || !hmac) return false;

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const payload = `admin:${expiresAtStr}`;
    const expectedHmac = crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");

    const a = Buffer.from(hmac);
    const b = Buffer.from(expectedHmac);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

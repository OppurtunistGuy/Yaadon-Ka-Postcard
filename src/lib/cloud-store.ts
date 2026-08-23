import type { PostcardPayload } from "./postcard-store-server";

/**
 * Universal Cloud Storage Adapter for Serverless Vercel Deployments.
 * Supports:
 * 1. Upstash Redis / Vercel KV REST API (via UPSTASH_REDIS_REST_URL or KV_REST_API_URL)
 * 2. Fallback to in-memory / local storage when cloud KV is not configured.
 */

function getKvConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.POSTGRES_KV_URL ||
    null;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    null;

  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

/**
 * Stores a postcard payload in the persistent cloud KV store.
 */
export async function saveToCloudKv(token: string, payload: PostcardPayload): Promise<boolean> {
  const config = getKvConfig();
  if (!config) return false;

  try {
    const key = `postcard:${token}`;
    const value = JSON.stringify(payload);

    const res = await fetch(`${config.url}/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    return res.ok;
  } catch (err) {
    console.warn("[saveToCloudKv] Notice:", err);
    return false;
  }
}

/**
 * Retrieves a postcard payload from the persistent cloud KV store by short token.
 */
export async function fetchFromCloudKv(token: string): Promise<PostcardPayload | null> {
  const config = getKvConfig();
  if (!config) return null;

  try {
    const key = `postcard:${token}`;
    const res = await fetch(`${config.url}/get/${encodeURIComponent(key)}`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || !data.result) return null;

    const parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
    return parsed as PostcardPayload;
  } catch (err) {
    console.warn("[fetchFromCloudKv] Notice:", err);
    return null;
  }
}

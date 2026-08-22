import { db } from "./db";

export type AnalyticsEventType =
  | "postcard_created"
  | "postcard_sent"
  | "postcard_opened"
  | "surprise_revealed"
  | "feedback_submitted";

export interface AnalyticsEventParams {
  event: AnalyticsEventType;
  themeId?: string | null;
  rating?: number | null;
}

/**
 * Tracks an anonymized analytics event into DB (best-effort, fail-proof).
 */
export async function trackEvent({ event, themeId, rating }: AnalyticsEventParams): Promise<void> {
  try {
    if ((db as any)?.analyticsEvent?.create) {
      await (db as any).analyticsEvent.create({
        data: {
          event,
          themeId: themeId || null,
          rating: rating || null,
        },
      }).catch(() => {});
    }
  } catch (e) {
    // Fail silently on serverless read-only DB environments
  }
}

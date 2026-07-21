import { createHash } from "node:crypto";
import { env } from "@/lib/env";

export const SUGGESTION_MAX_LENGTH = 2000;
export const SUGGESTION_MIN_LENGTH = 5;
export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 200;

// Minimum time (ms) a genuine visitor needs between the form
// rendering and submitting it. Bots that submit instantly get caught
// here without needing a CAPTCHA/external service.
export const MIN_FILL_TIME_MS = 1500;

// Rate limiting: how many submissions a single hashed IP may make.
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_SUBMISSIONS = 3;
export const DAILY_RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
export const DAILY_RATE_LIMIT_MAX_SUBMISSIONS = 8;

// Duplicate detection window.
export const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Hashes a raw IP address so it is never stored in plaintext. */
export function hashIp(rawIp: string): string {
  return createHash("sha256")
    .update(`${env.communityIdeasIpSalt}:${rawIp}`)
    .digest("hex");
}

/** Best-effort extraction of the client IP from standard proxy headers. */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  // No IP available (e.g. local dev without a proxy) — fall back to a
  // constant so rate limiting still functions per-process in dev.
  return "unknown";
}

export interface CommunityIdeaPayload {
  suggestion: string;
  name?: string;
  email?: string;
  locale: "en" | "ru";
  honeypot?: string;
  renderedAt: number;
}

export type ValidationError =
  | "invalid_payload"
  | "suggestion_required"
  | "suggestion_too_long"
  | "email_invalid"
  | "name_too_long"
  | "bot_detected";

export function validatePayload(
  body: unknown,
): { ok: true; value: CommunityIdeaPayload } | { ok: false; error: ValidationError } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "invalid_payload" };
  }

  const record = body as Record<string, unknown>;

  const suggestion =
    typeof record.suggestion === "string" ? record.suggestion.trim() : "";
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const locale = record.locale === "ru" ? "ru" : "en";
  const honeypot = typeof record.honeypot === "string" ? record.honeypot : "";
  const renderedAt =
    typeof record.renderedAt === "number" ? record.renderedAt : NaN;

  // Honeypot field: real visitors never see or fill this input.
  if (honeypot.trim() !== "") {
    return { ok: false, error: "bot_detected" };
  }

  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return { ok: false, error: "bot_detected" };
  }

  if (suggestion.length < SUGGESTION_MIN_LENGTH) {
    return { ok: false, error: "suggestion_required" };
  }

  if (suggestion.length > SUGGESTION_MAX_LENGTH) {
    return { ok: false, error: "suggestion_too_long" };
  }

  if (name.length > NAME_MAX_LENGTH) {
    return { ok: false, error: "name_too_long" };
  }

  if (email.length > EMAIL_MAX_LENGTH || (email !== "" && !EMAIL_PATTERN.test(email))) {
    return { ok: false, error: "email_invalid" };
  }

  return {
    ok: true,
    value: {
      suggestion,
      name: name || undefined,
      email: email || undefined,
      locale,
      honeypot,
      renderedAt,
    },
  };
}

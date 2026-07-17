import { NextRequest, NextResponse } from "next/server";
import { appendIdea, countSubmissionsSince, hasDuplicateSuggestion } from "@/lib/community-ideas/storage";
import {
  DAILY_RATE_LIMIT_MAX_SUBMISSIONS,
  DAILY_RATE_LIMIT_WINDOW_MS,
  DUPLICATE_WINDOW_MS,
  RATE_LIMIT_MAX_SUBMISSIONS,
  RATE_LIMIT_WINDOW_MS,
  getClientIp,
  hashIp,
  validatePayload,
} from "@/lib/community-ideas/validation";

// This route writes to local disk (see lib/community-ideas/storage.ts),
// so it must run on the Node.js runtime, not the Edge runtime.
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const validated = validatePayload(body);
  if (!validated.ok) {
    // Bot-detection failures get their own status code so the client
    // can distinguish them from ordinary validation errors, but we
    // still avoid leaking exactly which check tripped in the message.
    const status = validated.error === "bot_detected" ? 400 : 422;
    return NextResponse.json({ ok: false, error: validated.error }, { status });
  }

  const rawIp = getClientIp(request.headers);
  const ipHash = hashIp(rawIp);

  const [shortWindowCount, dailyCount] = await Promise.all([
    countSubmissionsSince(ipHash, RATE_LIMIT_WINDOW_MS),
    countSubmissionsSince(ipHash, DAILY_RATE_LIMIT_WINDOW_MS),
  ]);

  if (shortWindowCount >= RATE_LIMIT_MAX_SUBMISSIONS || dailyCount >= DAILY_RATE_LIMIT_MAX_SUBMISSIONS) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const isDuplicate = await hasDuplicateSuggestion(
    ipHash,
    validated.value.suggestion,
    DUPLICATE_WINDOW_MS,
  );
  if (isDuplicate) {
    return NextResponse.json({ ok: false, error: "duplicate" }, { status: 409 });
  }

  const referer = request.headers.get("referer");
  let pageUrl = referer ?? "unknown";
  try {
    pageUrl = referer ? new URL(referer).pathname : "unknown";
  } catch {
    pageUrl = "unknown";
  }

  await appendIdea({
    suggestion: validated.value.suggestion,
    name: validated.value.name ?? null,
    email: validated.value.email ?? null,
    locale: validated.value.locale,
    pageUrl,
    userAgent: request.headers.get("user-agent"),
    ipHash,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

import { env } from "@/lib/env";

/**
 * Google's official seller ID used in ads.txt DIRECT entries for
 * AdSense. This is a public, well-known constant — not a secret and
 * not specific to any publisher.
 */
const GOOGLE_ADSENSE_SELLER_ID = "f08c47fec0942fa0";

/**
 * Serves /ads.txt.
 *
 * - If a valid NEXT_PUBLIC_ADSENSE_CLIENT_ID (e.g. "ca-pub-123...")
 *   is configured, converts it to the "pub-123..." form Google's
 *   ads.txt format expects and returns a single correct DIRECT line.
 * - If no valid AdSense client ID is configured, returns a 404
 *   instead of guessing or hardcoding a publisher ID. Nothing here
 *   is ever invented.
 */
export function GET() {
  const clientId = env.adsenseClientId;

  if (!clientId) {
    return new Response("", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const publisherId = clientId.replace(/^ca-/, "");
  const body = `google.com, ${publisherId}, DIRECT, ${GOOGLE_ADSENSE_SELLER_ID}\n`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

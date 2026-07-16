/**
 * Shares a plain-text result via the Web Share API when available,
 * falling back to the clipboard otherwise. Never includes the user's
 * typed question — callers must only pass card names/meanings.
 */
export async function shareOrCopy(
  text: string,
  title: string,
): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator === "undefined") return "failed";

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text });
      return "shared";
    } catch {
      // User cancelled the share sheet or it failed — fall through to copy.
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch {
      return "failed";
    }
  }

  return "failed";
}

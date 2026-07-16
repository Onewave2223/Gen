export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | ClassValue[];

/**
 * Safely merges class names. Accepts strings, numbers, arrays, and
 * objects with boolean values. Falsy values are ignored.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const process = (input: ClassValue): void => {
    if (!input) return;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
      return;
    }

    if (Array.isArray(input)) {
      for (const item of input) {
        process(item);
      }
      return;
    }

    if (typeof input === "object") {
      for (const key of Object.keys(input)) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  };

  for (const input of inputs) {
    process(input);
  }

  return classes.join(" ");
}

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Copies the given text to the clipboard using the Clipboard API.
 * Resolves to `true` on success, `false` if copying is unavailable
 * or fails.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes trailing slashes from a URL while keeping it valid.
 */
export function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed === "") return trimmed;
  return trimmed.replace(/\/+$/, "");
}

/**
 * Builds an absolute URL for the given path using the provided base
 * site URL. Ensures there is exactly one slash between the base and
 * the path, regardless of whether the path starts with "/" or the
 * base ends with one.
 */
export function buildAbsoluteUrl(siteUrl: string, path = "/"): string {
  const base = normalizeSiteUrl(siteUrl);
  const trimmedPath = path.trim();

  if (trimmedPath === "" || trimmedPath === "/") {
    return base === "" ? "/" : base;
  }

  const normalizedPath = trimmedPath.startsWith("/")
    ? trimmedPath
    : `/${trimmedPath}`;

  return `${base}${normalizedPath}`;
}

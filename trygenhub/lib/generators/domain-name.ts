export type DomainExtension = ".com" | ".net" | ".org" | ".io" | ".co" | ".ai";

export type DomainStyle = "brandable" | "keyword" | "short" | "creative";

export type DomainNameOptions = {
  keyword: string;
  extension: DomainExtension;
  style: DomainStyle;
  count: number;
  allowHyphens: boolean;
};

export type DomainNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type DomainNameGenerationResult = {
  domains: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 40;
const MAX_LABEL_LENGTH = 63;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const PREFIXES: readonly string[] = [
  "get",
  "try",
  "go",
  "my",
  "use",
  "join",
  "hello",
  "smart",
  "bright",
  "next",
  "the",
  "we",
  "shop",
  "meet",
];

const SUFFIXES: readonly string[] = [
  "hub",
  "lab",
  "labs",
  "base",
  "flow",
  "nest",
  "spot",
  "works",
  "studio",
  "ly",
  "ify",
  "io",
  "box",
  "zone",
  "stack",
  "app",
  "hq",
];

const CREATIVE_PARTS: readonly string[] = [
  "nova",
  "spark",
  "pixel",
  "orbit",
  "wave",
  "forge",
  "bloom",
  "shift",
  "loop",
  "mint",
  "echo",
  "peak",
  "drift",
  "glow",
  "haven",
  "vibe",
];

export function validateDomainNameOptions(
  options: DomainNameOptions,
): DomainNameValidationResult {
  const { keyword, count } = options;
  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword.length === 0) {
    return {
      valid: false,
      error: "Enter a keyword to generate domain name ideas.",
    };
  }

  if (trimmedKeyword.length > MAX_KEYWORD_LENGTH) {
    return {
      valid: false,
      error: `Keyword must be ${MAX_KEYWORD_LENGTH} characters or fewer.`,
    };
  }

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Number of domain ideas must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  const sanitized = sanitizeDomainKeyword(trimmedKeyword);
  if (sanitized.length === 0) {
    return {
      valid: false,
      error: "Enter a keyword using letters or numbers.",
    };
  }

  return { valid: true };
}

/**
 * Normalizes a keyword into a safe, lowercase ASCII domain label
 * fragment: letters, numbers, and single internal hyphens only, with
 * no leading, trailing, or repeated hyphens.
 */
export function sanitizeDomainKeyword(keyword: string): string {
  const lowered = keyword.trim().toLowerCase();
  const asciiOnly = lowered.replace(/[^a-z0-9-]/g, "");
  const collapsedHyphens = asciiOnly.replace(/-+/g, "-");
  return collapsedHyphens.replace(/^-+/, "").replace(/-+$/, "");
}

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

/**
 * Joins label parts with an optional single hyphen, keeping the
 * result a valid hostname label: no leading, trailing, or doubled
 * hyphens, and never longer than MAX_LABEL_LENGTH characters.
 */
function joinLabelParts(
  parts: readonly string[],
  allowHyphens: boolean,
): string {
  const cleanParts = parts
    .map((part) => part.replace(/^-+/, "").replace(/-+$/, ""))
    .filter((part) => part.length > 0);

  if (cleanParts.length === 0) {
    return "";
  }

  const useHyphen = allowHyphens && cleanParts.length > 1 && Math.random() < 0.35;
  const separator = useHyphen ? "-" : "";
  const label = cleanParts.join(separator);

  return label.slice(0, MAX_LABEL_LENGTH).replace(/-+$/, "");
}

function buildLabel(
  options: DomainNameOptions,
  sanitizedKeyword: string,
): string {
  const { style, allowHyphens } = options;

  switch (style) {
    case "keyword": {
      const useAffix = Math.random() < 0.5;
      if (!useAffix) {
        return joinLabelParts([sanitizedKeyword], allowHyphens);
      }
      const affix = Math.random() < 0.5 ? pick(PREFIXES) : pick(SUFFIXES);
      const parts =
        Math.random() < 0.5
          ? [affix, sanitizedKeyword]
          : [sanitizedKeyword, affix];
      return joinLabelParts(parts, allowHyphens);
    }
    case "short": {
      const shortKeyword = sanitizedKeyword.slice(0, 6);
      const affix = pick(SUFFIXES).slice(0, 5);
      const parts =
        Math.random() < 0.5 ? [shortKeyword, affix] : [affix, shortKeyword];
      return joinLabelParts(parts, allowHyphens);
    }
    case "creative": {
      const creativePart = pick(CREATIVE_PARTS);
      const parts =
        Math.random() < 0.5
          ? [sanitizedKeyword, creativePart]
          : [creativePart, sanitizedKeyword];
      return joinLabelParts(parts, allowHyphens);
    }
    case "brandable":
    default: {
      const prefix = pick(PREFIXES);
      const suffix = pick(SUFFIXES);
      const useSuffix = Math.random() < 0.5;
      const parts = useSuffix
        ? [sanitizedKeyword, suffix]
        : [prefix, sanitizedKeyword];
      return joinLabelParts(parts, allowHyphens);
    }
  }
}

function isValidLabel(label: string): boolean {
  if (label.length === 0 || label.length > MAX_LABEL_LENGTH) {
    return false;
  }
  if (label.startsWith("-") || label.endsWith("-")) {
    return false;
  }
  if (label.includes("--")) {
    return false;
  }
  return /^[a-z0-9-]+$/.test(label);
}

export function generateDomainNames(
  options: DomainNameOptions,
): DomainNameGenerationResult {
  const validation = validateDomainNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeDomainKeyword(options.keyword);
  const { count, extension } = options;

  const results = new Set<string>();
  const maxAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  let attempts = 0;

  while (results.size < count && attempts < maxAttempts) {
    const label = buildLabel(options, sanitizedKeyword);
    if (isValidLabel(label)) {
      results.add(`${label}${extension}`);
    }
    attempts += 1;
  }

  let fallbackSuffix = 1;
  while (results.size < count) {
    const baseLabel = joinLabelParts(
      [sanitizedKeyword, String(fallbackSuffix)],
      false,
    );
    if (isValidLabel(baseLabel)) {
      const candidate = `${baseLabel}${extension}`;
      if (!results.has(candidate)) {
        results.add(candidate);
      }
    }
    fallbackSuffix += 1;
    if (fallbackSuffix > count * MAX_ATTEMPTS_MULTIPLIER) {
      break;
    }
  }

  return { domains: Array.from(results) };
}

export function formatDomainNameResults(domains: readonly string[]): string {
  return domains.join("\n");
}

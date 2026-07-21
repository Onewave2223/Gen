export type AiDomainVibe =
  | "ai"
  | "startup"
  | "creative"
  | "short"
  | "professional";

export type AiDomainExtension =
  | ".com"
  | ".io"
  | ".ai"
  | ".co"
  | ".net"
  | ".app";

export type AiDomainNameOptions = {
  keyword: string;
  vibe: AiDomainVibe;
  extension: AiDomainExtension;
  count: number;
  allowHyphens: boolean;
};

export type AiDomainNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiDomainNameGenerationResult = {
  domains: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const AI_PREFIXES: readonly string[] = [
  "neuro",
  "cyber",
  "quantum",
  "synth",
  "vector",
  "byte",
  "signal",
  "circuit",
  "nova",
  "proto",
  "meta",
  "hyper",
  "logic",
  "pixel",
];

const AI_WORDS: readonly string[] = [
  "mind",
  "core",
  "node",
  "pulse",
  "matrix",
  "loop",
  "grid",
  "flux",
  "spark",
  "drift",
  "wave",
  "orbit",
  "forge",
  "engine",
];

const STARTUP_WORDS: readonly string[] = [
  "hub",
  "base",
  "flow",
  "nest",
  "spot",
  "works",
  "studio",
  "ly",
  "ify",
  "lane",
  "stack",
  "boost",
  "leap",
  "spark",
];

const STARTUP_PREFIXES: readonly string[] = [
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
];

const CREATIVE_WORDS: readonly string[] = [
  "muse",
  "petal",
  "haze",
  "bloom",
  "glow",
  "opal",
  "willow",
  "dew",
  "prism",
  "linen",
  "mist",
  "velvet",
];

const SHORT_WORDS: readonly string[] = [
  "zo",
  "vex",
  "kai",
  "lux",
  "nyx",
  "rex",
  "vio",
  "zen",
  "iva",
  "oki",
];

const PROFESSIONAL_WORDS: readonly string[] = [
  "group",
  "partners",
  "solutions",
  "ventures",
  "digital",
  "collective",
  "office",
  "bureau",
  "projects",
  "labs",
];

const ADJECTIVES: readonly string[] = [
  "bright",
  "swift",
  "silent",
  "cosmic",
  "lucid",
  "bold",
  "hidden",
  "electric",
  "lunar",
  "crisp",
  "vivid",
  "rapid",
];

export function validateAiDomainNameOptions(
  options: AiDomainNameOptions,
): AiDomainNameValidationResult {
  const { keyword, count } = options;

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

  if (keyword.trim().length > MAX_KEYWORD_LENGTH) {
    return {
      valid: false,
      error: `Keyword must be ${MAX_KEYWORD_LENGTH} characters or fewer.`,
    };
  }

  return { valid: true };
}

/**
 * Normalizes a keyword into a safe fragment for domain generation.
 * Removes anything outside of lowercase letters and digits so the
 * resulting label can never be interpreted as markup or introduce
 * unsafe characters into a generated domain.
 */
export function sanitizeAiDomainKeyword(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[randomIndex(pool.length)];
}

function joinParts(parts: readonly string[], allowHyphens: boolean): string {
  if (!allowHyphens) {
    return parts.join("");
  }

  // Only use a hyphen part of the time so results stay varied.
  const useHyphen = Math.random() < 0.5;
  return parts.join(useHyphen ? "-" : "");
}

function buildLabel(
  options: AiDomainNameOptions,
  sanitizedKeyword: string,
): string {
  const { vibe, allowHyphens } = options;
  const hasKeyword = sanitizedKeyword.length > 0;

  let parts: string[];

  switch (vibe) {
    case "ai": {
      const prefix = pick(AI_PREFIXES);
      const word = hasKeyword && Math.random() < 0.5 ? sanitizedKeyword : pick(AI_WORDS);
      parts = [prefix, word];
      break;
    }
    case "startup": {
      const word = pick(STARTUP_WORDS);
      parts = hasKeyword
        ? [hasKeyword ? sanitizedKeyword : pick(STARTUP_PREFIXES), word]
        : [pick(STARTUP_PREFIXES), word];
      break;
    }
    case "creative": {
      const word = pick(CREATIVE_WORDS);
      parts = hasKeyword
        ? Math.random() < 0.5
          ? [sanitizedKeyword, word]
          : [word, sanitizedKeyword]
        : [pick(ADJECTIVES), word];
      break;
    }
    case "short": {
      const word = hasKeyword ? sanitizedKeyword.slice(0, 5) : pick(SHORT_WORDS);
      parts = Math.random() < 0.5 ? [word, pick(SHORT_WORDS)] : [word];
      break;
    }
    case "professional":
    default: {
      const word = pick(PROFESSIONAL_WORDS);
      parts = hasKeyword ? [sanitizedKeyword, word] : [pick(ADJECTIVES), word];
      break;
    }
  }

  parts = parts.filter((part) => part.length > 0);
  if (parts.length === 0) {
    parts = [pick(AI_WORDS)];
  }

  return joinParts(parts, allowHyphens);
}

export function generateAiDomainNames(
  options: AiDomainNameOptions,
): AiDomainNameGenerationResult {
  const validation = validateAiDomainNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiDomainKeyword(options.keyword);
  const { count, extension } = options;

  const results = new Set<string>();
  const maxAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  let attempts = 0;

  while (results.size < count && attempts < maxAttempts) {
    const label = buildLabel(options, sanitizedKeyword);
    if (label.length > 0) {
      results.add(`${label}${extension}`);
    }
    attempts += 1;
  }

  // Deterministic fallback in case the random pool was exhausted before
  // reaching the requested count. Bounded so this can never loop forever.
  let fallbackSuffix = 1;
  const maxFallbackAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  while (results.size < count && fallbackSuffix <= maxFallbackAttempts) {
    const label = buildLabel(options, sanitizedKeyword);
    const candidate = `${label}${fallbackSuffix}${extension}`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { domains: Array.from(results) };
}

export function formatAiDomainNameResults(domains: readonly string[]): string {
  return domains.join("\n");
}

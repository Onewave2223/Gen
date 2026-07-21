export type AiUsernameVibe =
  | "ai"
  | "gamer"
  | "aesthetic"
  | "professional"
  | "minimal";

export type AiUsernameOptions = {
  keyword: string;
  vibe: AiUsernameVibe;
  count: number;
  includeNumbers: boolean;
  includeUnderscore: boolean;
};

export type AiUsernameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiUsernameGenerationResult = {
  usernames: string[];
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
  "echo",
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
  "shift",
  "forge",
  "engine",
  "circuit",
  "spectrum",
  "array",
];

const GAMER_WORDS: readonly string[] = [
  "rogue",
  "viper",
  "phantom",
  "titan",
  "reaper",
  "hunter",
  "striker",
  "blaze",
  "ranger",
  "cobra",
  "sniper",
  "vanguard",
  "outlaw",
  "warden",
  "raider",
];

const AESTHETIC_WORDS: readonly string[] = [
  "moon",
  "petal",
  "cloud",
  "velvet",
  "opal",
  "willow",
  "haze",
  "bloom",
  "dew",
  "linen",
  "pearl",
  "meadow",
  "glow",
  "silk",
  "mist",
];

const PROFESSIONAL_WORDS: readonly string[] = [
  "studio",
  "collective",
  "works",
  "labs",
  "office",
  "bureau",
  "partners",
  "group",
  "projects",
  "ventures",
  "digital",
  "craft",
];

const MINIMAL_WORDS: readonly string[] = [
  "so",
  "ok",
  "ju",
  "we",
  "ly",
  "un",
  "id",
  "ex",
  "va",
  "no",
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
  "quiet",
  "crisp",
  "sharp",
  "gentle",
  "vivid",
  "rapid",
];

export function validateAiUsernameOptions(
  options: AiUsernameOptions,
): AiUsernameValidationResult {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Number of usernames must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
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
 * Normalizes a keyword into a safe fragment for username generation.
 * Removes anything outside of lowercase letters and digits so the
 * resulting keyword can never be interpreted as markup or introduce
 * unsafe characters into a generated username.
 */
export function sanitizeAiUsernameKeyword(keyword: string): string {
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

function randomNumberSuffix(): string {
  return String(randomIndex(1000));
}

function joinParts(
  parts: readonly string[],
  includeUnderscore: boolean,
): string {
  if (!includeUnderscore) {
    return parts.join("");
  }

  // Only use the underscore part of the time so results stay varied.
  const useUnderscore = Math.random() < 0.5;
  return parts.join(useUnderscore ? "_" : "");
}

function buildCandidate(
  options: AiUsernameOptions,
  sanitizedKeyword: string,
): string {
  const { vibe, includeNumbers, includeUnderscore } = options;
  const hasKeyword = sanitizedKeyword.length > 0;

  let parts: string[];

  switch (vibe) {
    case "ai": {
      const prefix = pick(AI_PREFIXES);
      const word = hasKeyword && Math.random() < 0.5 ? sanitizedKeyword : pick(AI_WORDS);
      parts = [prefix, word];
      break;
    }
    case "gamer": {
      const word = pick(GAMER_WORDS);
      parts = hasKeyword
        ? Math.random() < 0.5
          ? [sanitizedKeyword, word]
          : [word, sanitizedKeyword]
        : [pick(ADJECTIVES), word];
      break;
    }
    case "aesthetic": {
      const word = pick(AESTHETIC_WORDS);
      parts = hasKeyword
        ? Math.random() < 0.5
          ? [sanitizedKeyword, word]
          : [word, sanitizedKeyword]
        : [pick(AESTHETIC_WORDS), word];
      break;
    }
    case "professional": {
      const word = pick(PROFESSIONAL_WORDS);
      parts = hasKeyword ? [sanitizedKeyword, word] : [pick(ADJECTIVES), word];
      break;
    }
    case "minimal":
    default: {
      const word = hasKeyword ? sanitizedKeyword : pick(AI_WORDS);
      parts = Math.random() < 0.5 ? [word, pick(MINIMAL_WORDS)] : [word];
      break;
    }
  }

  parts = parts.filter((part) => part.length > 0);
  if (parts.length === 0) {
    parts = [pick(AI_WORDS)];
  }

  let candidate = joinParts(parts, includeUnderscore);

  if (includeNumbers && Math.random() < 0.4) {
    candidate = `${candidate}${randomNumberSuffix()}`;
  }

  return candidate;
}

export function generateAiUsernames(
  options: AiUsernameOptions,
): AiUsernameGenerationResult {
  const validation = validateAiUsernameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiUsernameKeyword(options.keyword);
  const { count } = options;

  const results = new Set<string>();
  const maxAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  let attempts = 0;

  while (results.size < count && attempts < maxAttempts) {
    const candidate = buildCandidate(options, sanitizedKeyword);
    if (candidate.length > 0) {
      results.add(candidate);
    }
    attempts += 1;
  }

  // Deterministic fallback in case the random pool was exhausted before
  // reaching the requested count. Bounded so this can never loop forever.
  let fallbackSuffix = 1;
  const maxFallbackAttempts = count * MAX_ATTEMPTS_MULTIPLIER;
  while (results.size < count && fallbackSuffix <= maxFallbackAttempts) {
    const base = buildCandidate(options, sanitizedKeyword);
    const candidate = `${base}${fallbackSuffix}`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { usernames: Array.from(results) };
}

export function formatAiUsernameResults(usernames: readonly string[]): string {
  return usernames.join("\n");
}

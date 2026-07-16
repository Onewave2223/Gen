export type UsernameStyle =
  | "random"
  | "clean"
  | "gaming"
  | "cute"
  | "professional";

export type UsernameOptions = {
  keyword: string;
  style: UsernameStyle;
  count: number;
  includeNumbers: boolean;
  includeSeparator: boolean;
};

export type UsernameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type UsernameGenerationResult = {
  usernames: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const ADJECTIVES: readonly string[] = [
  "bright",
  "swift",
  "silent",
  "clever",
  "cosmic",
  "vivid",
  "lucky",
  "wild",
  "calm",
  "bold",
  "rapid",
  "golden",
  "hidden",
  "epic",
  "electric",
  "lunar",
  "solar",
  "crystal",
  "velvet",
  "neon",
  "quiet",
  "brave",
  "amber",
  "arctic",
  "misty",
  "royal",
  "sunny",
  "windy",
  "frosty",
  "gentle",
  "rusty",
  "shiny",
  "stormy",
  "witty",
];

const NOUNS: readonly string[] = [
  "fox",
  "wolf",
  "raven",
  "panda",
  "tiger",
  "comet",
  "orbit",
  "pixel",
  "nova",
  "storm",
  "echo",
  "flame",
  "shadow",
  "spark",
  "dream",
  "wave",
  "phoenix",
  "dragon",
  "star",
  "cloud",
  "otter",
  "falcon",
  "meadow",
  "harbor",
  "canyon",
  "river",
  "forest",
  "meteor",
  "lantern",
  "voyager",
  "compass",
  "willow",
];

const GAMING_WORDS: readonly string[] = [
  "rogue",
  "striker",
  "hunter",
  "phantom",
  "titan",
  "viper",
  "sniper",
  "raider",
  "knight",
  "legend",
  "blaze",
  "fury",
  "ace",
  "boss",
  "warrior",
  "reaper",
  "ranger",
  "cobra",
  "hawk",
  "ninja",
  "vanguard",
  "outlaw",
];

const CUTE_WORDS: readonly string[] = [
  "bunny",
  "peach",
  "cookie",
  "cherry",
  "honey",
  "bubble",
  "muffin",
  "berry",
  "kitty",
  "panda",
  "mochi",
  "sugar",
  "blossom",
  "sunny",
  "cupcake",
  "daisy",
  "pudding",
  "marshmallow",
  "clover",
  "petal",
];

const PROFESSIONAL_WORDS: readonly string[] = [
  "studio",
  "digital",
  "works",
  "labs",
  "creative",
  "design",
  "media",
  "tech",
  "solutions",
  "projects",
  "collective",
  "group",
  "partners",
  "ventures",
  "office",
  "bureau",
  "craft",
  "forge",
  "guild",
  "collab",
];

export function validateUsernameOptions(
  options: UsernameOptions,
): UsernameValidationResult {
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
export function sanitizeUsernameKeyword(keyword: string): string {
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
  includeSeparator: boolean,
): string {
  if (!includeSeparator) {
    return parts.join("");
  }

  // Only use a separator part of the time so results stay varied.
  const useSeparator = Math.random() < 0.5;
  if (!useSeparator) {
    return parts.join("");
  }

  const separator = Math.random() < 0.5 ? "_" : "-";
  return parts.join(separator);
}

function buildCandidate(
  options: UsernameOptions,
  sanitizedKeyword: string,
): string {
  const { style, includeNumbers, includeSeparator } = options;
  const hasKeyword = sanitizedKeyword.length > 0;

  let parts: string[];

  switch (style) {
    case "clean": {
      const word = hasKeyword && Math.random() < 0.6
        ? sanitizedKeyword
        : pick(NOUNS);
      const modifier = pick(ADJECTIVES);
      parts = hasKeyword && Math.random() < 0.5
        ? [sanitizedKeyword]
        : [modifier, word];
      break;
    }
    case "gaming": {
      const word = pick(GAMING_WORDS);
      parts = hasKeyword
        ? Math.random() < 0.5
          ? [sanitizedKeyword, word]
          : [word, sanitizedKeyword]
        : [pick(ADJECTIVES), word];
      break;
    }
    case "cute": {
      const word = pick(CUTE_WORDS);
      parts = hasKeyword
        ? Math.random() < 0.5
          ? [sanitizedKeyword, word]
          : [word, sanitizedKeyword]
        : [pick(CUTE_WORDS), word];
      break;
    }
    case "professional": {
      const word = pick(PROFESSIONAL_WORDS);
      parts = hasKeyword
        ? [sanitizedKeyword, word]
        : [pick(ADJECTIVES), word];
      break;
    }
    case "random":
    default: {
      const adjective = pick(ADJECTIVES);
      const noun = pick(NOUNS);
      if (hasKeyword) {
        parts =
          Math.random() < 0.5
            ? [sanitizedKeyword, noun]
            : [adjective, sanitizedKeyword];
      } else {
        parts = [adjective, noun];
      }
      break;
    }
  }

  parts = parts.filter((part) => part.length > 0);
  if (parts.length === 0) {
    parts = [pick(NOUNS)];
  }

  let candidate = joinParts(parts, includeSeparator);

  if (includeNumbers && Math.random() < 0.4) {
    candidate = `${candidate}${randomNumberSuffix()}`;
  }

  return candidate;
}

export function generateUsernames(
  options: UsernameOptions,
): UsernameGenerationResult {
  const validation = validateUsernameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeUsernameKeyword(options.keyword);
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

  // Deterministic fallback in case the random pool was exhausted
  // before reaching the requested count. Bounded so this can never
  // loop indefinitely.
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

export function formatUsernameResults(usernames: readonly string[]): string {
  return usernames.join("\n");
}

export type AiPetType = "dog" | "cat" | "bird" | "rabbit" | "universal";

export type AiPetNameOptions = {
  keyword: string;
  petType: AiPetType;
  count: number;
};

export type AiPetNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiPetNameGenerationResult = {
  names: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

function capitalize(value: string): string {
  if (value.length === 0) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const DOG_NAMES: readonly string[] = [
  "Buddy", "Rex", "Bailey", "Max", "Charlie", "Rocky", "Duke", "Bear",
  "Zeus", "Cooper", "Bella", "Luna", "Daisy", "Maggie", "Sadie", "Ranger",
  "Scout", "Biscuit", "Ollie", "Waffle",
];

const CAT_NAMES: readonly string[] = [
  "Whiskers", "Luna", "Simba", "Milo", "Shadow", "Tiger", "Loki", "Cleo",
  "Oreo", "Pepper", "Nala", "Smokey", "Mittens", "Ziggy", "Jasper", "Suki",
  "Biscuit", "Pumpkin", "Willow", "Salem",
];

const BIRD_NAMES: readonly string[] = [
  "Sky", "Kiwi", "Sunny", "Blue", "Peep", "Chirpy", "Pepper", "Mango",
  "Tweety", "Echo", "Breeze", "Robin", "Sparky", "Feather", "Zazu", "Coco",
  "Piper", "Pixel", "Skye", "Marble",
];

const RABBIT_NAMES: readonly string[] = [
  "Clover", "Thumper", "Cotton", "Hazel", "Biscuit", "Pepper", "Willow",
  "Daisy", "Snowball", "Basil", "Nibbles", "Buttons", "Marshmallow", "Peanut",
  "Honey", "Truffle", "Flopsy", "Poppy", "Oreo", "Bramble",
];

const UNIVERSAL_ADJECTIVES: readonly string[] = [
  "Fuzzy", "Tiny", "Speedy", "Lucky", "Sunny", "Sweet", "Fluffy", "Cozy",
  "Bright", "Gentle", "Silly", "Cuddly",
];

const UNIVERSAL_WORDS: readonly string[] = [
  "Star", "Bean", "Puff", "Berry", "Nugget", "Muffin", "Pip", "Noodle",
  "Bubbles", "Clover", "Comet", "Ziggy",
];

function petPool(petType: AiPetType): readonly string[] {
  switch (petType) {
    case "dog":
      return DOG_NAMES;
    case "cat":
      return CAT_NAMES;
    case "bird":
      return BIRD_NAMES;
    case "rabbit":
      return RABBIT_NAMES;
    case "universal":
    default:
      return [...DOG_NAMES, ...CAT_NAMES, ...BIRD_NAMES, ...RABBIT_NAMES];
  }
}

function pickIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[pickIndex(pool.length)];
}

export function validateAiPetNameOptions(
  options: AiPetNameOptions,
): AiPetNameValidationResult {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Number of names must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
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
 * Normalizes a keyword into a safe fragment for name generation.
 * Removes anything outside of letters so the resulting fragment can
 * never introduce markup or unsafe characters into a generated name.
 */
export function sanitizeAiPetKeyword(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");
}

function buildCandidate(
  options: AiPetNameOptions,
  sanitizedKeyword: string,
): string {
  const { petType } = options;
  const hasKeyword = sanitizedKeyword.length > 0;

  if (hasKeyword && Math.random() < 0.3) {
    return capitalize(sanitizedKeyword);
  }

  if (Math.random() < 0.25) {
    const adjective = hasKeyword ? capitalize(sanitizedKeyword) : pick(UNIVERSAL_ADJECTIVES);
    return `${adjective} ${pick(UNIVERSAL_WORDS)}`;
  }

  return pick(petPool(petType));
}

export function generateAiPetNames(
  options: AiPetNameOptions,
): AiPetNameGenerationResult {
  const validation = validateAiPetNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiPetKeyword(options.keyword);
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
    const candidate = `${base} ${fallbackSuffix}`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { names: Array.from(results) };
}

export function formatAiPetNameResults(names: readonly string[]): string {
  return names.join("\n");
}

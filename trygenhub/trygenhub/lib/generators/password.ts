export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
};

export type PasswordValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type PasswordStrengthLevel =
  | "very-weak"
  | "weak"
  | "fair"
  | "strong"
  | "very-strong";

export type PasswordStrength = {
  level: PasswordStrengthLevel;
  label: string;
  score: number;
  percentage: number;
};

const MIN_LENGTH = 4;
const MAX_LENGTH = 128;

const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()-_=+[]{};:,.?/";

const SIMILAR_CHARS = new Set(["0", "O", "o", "1", "l", "I"]);

type CharacterGroupKey = "uppercase" | "lowercase" | "numbers" | "symbols";

const GROUP_CHAR_SETS: Record<CharacterGroupKey, string> = {
  uppercase: UPPERCASE_CHARS,
  lowercase: LOWERCASE_CHARS,
  numbers: NUMBER_CHARS,
  symbols: SYMBOL_CHARS,
};

function removeSimilarChars(chars: string): string {
  let result = "";
  for (const char of chars) {
    if (!SIMILAR_CHARS.has(char)) {
      result += char;
    }
  }
  return result;
}

function getActiveGroups(options: PasswordOptions): CharacterGroupKey[] {
  const groups: CharacterGroupKey[] = [];
  if (options.uppercase) groups.push("uppercase");
  if (options.lowercase) groups.push("lowercase");
  if (options.numbers) groups.push("numbers");
  if (options.symbols) groups.push("symbols");
  return groups;
}

function buildActivePools(
  options: PasswordOptions,
): Map<CharacterGroupKey, string> {
  const pools = new Map<CharacterGroupKey, string>();

  for (const group of getActiveGroups(options)) {
    const baseChars = GROUP_CHAR_SETS[group];
    const chars = options.excludeSimilar
      ? removeSimilarChars(baseChars)
      : baseChars;
    pools.set(group, chars);
  }

  return pools;
}

export function validatePasswordOptions(
  options: PasswordOptions,
): PasswordValidationResult {
  const { length } = options;

  if (
    !Number.isSafeInteger(length) ||
    length < MIN_LENGTH ||
    length > MAX_LENGTH
  ) {
    return {
      valid: false,
      error: `Password length must be a whole number between ${MIN_LENGTH} and ${MAX_LENGTH}.`,
    };
  }

  const activeGroups = getActiveGroups(options);

  if (activeGroups.length === 0) {
    return {
      valid: false,
      error: "Select at least one character type.",
    };
  }

  const pools = buildActivePools(options);
  const combinedPool = Array.from(pools.values()).join("");

  if (combinedPool.length === 0) {
    return {
      valid: false,
      error:
        "Your current options do not leave any characters available for generation.",
    };
  }

  return { valid: true };
}

function getCrypto(): Crypto {
  if (
    typeof globalThis === "undefined" ||
    !globalThis.crypto ||
    typeof globalThis.crypto.getRandomValues !== "function"
  ) {
    throw new Error(
      "Secure random generation is not available in this environment.",
    );
  }

  return globalThis.crypto;
}

/**
 * Returns a cryptographically secure random integer in the inclusive
 * range [0, maxExclusive - 1] using rejection sampling to avoid
 * modulo bias.
 */
function secureRandomIndex(maxExclusive: number): number {
  if (maxExclusive <= 0) {
    throw new Error(
      "Secure random generation is not available in this environment.",
    );
  }

  const crypto = getCrypto();

  // Largest multiple of maxExclusive that fits in a 32-bit unsigned
  // integer range. Values at or above this threshold are rejected to
  // keep the distribution unbiased.
  const maxUint32 = 0x100000000; // 2^32
  const rejectionThreshold =
    maxUint32 - (maxUint32 % maxExclusive);

  const buffer = new Uint32Array(1);

  let randomValue: number;
  do {
    crypto.getRandomValues(buffer);
    randomValue = buffer[0];
  } while (randomValue >= rejectionThreshold);

  return randomValue % maxExclusive;
}

function secureRandomChar(pool: string): string {
  const index = secureRandomIndex(pool.length);
  return pool[index];
}

function secureShuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomIndex(i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
}

export function generatePassword(options: PasswordOptions): string {
  const validation = validatePasswordOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const pools = buildActivePools(options);
  const combinedPool = Array.from(pools.values()).join("");

  const passwordChars: string[] = [];

  // Guarantee at least one character from each active group.
  for (const chars of pools.values()) {
    passwordChars.push(secureRandomChar(chars));
  }

  // Fill the remaining positions from the combined pool.
  while (passwordChars.length < options.length) {
    passwordChars.push(secureRandomChar(combinedPool));
  }

  return secureShuffle(passwordChars).join("");
}

const STRENGTH_LABELS: Record<PasswordStrengthLevel, string> = {
  "very-weak": "Very weak",
  weak: "Weak",
  fair: "Fair",
  strong: "Strong",
  "very-strong": "Very strong",
};

const SCORE_LEVELS: PasswordStrengthLevel[] = [
  "very-weak",
  "weak",
  "fair",
  "strong",
  "very-strong",
];

const SCORE_PERCENTAGES = [20, 40, 60, 80, 100];

/**
 * Produces an approximate, user-facing estimate of password strength.
 * This is not a security audit and does not guarantee that a password
 * resists any particular attack.
 */
export function calculatePasswordStrength(
  password: string,
  options?: PasswordOptions,
): PasswordStrength {
  const length = password.length;

  const hasLower =
    options?.lowercase ?? /[a-z]/.test(password);
  const hasUpper =
    options?.uppercase ?? /[A-Z]/.test(password);
  const hasNumber =
    options?.numbers ?? /[0-9]/.test(password);
  const hasSymbol =
    options?.symbols ?? /[^a-zA-Z0-9]/.test(password);

  const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;

  let points = 0;

  if (length >= 8) points += 1;
  if (length >= 12) points += 1;
  if (length >= 16) points += 1;
  if (length >= 20) points += 1;

  if (varietyCount >= 2) points += 1;
  if (varietyCount >= 3) points += 1;
  if (varietyCount >= 4) points += 1;

  if (length < 6) {
    points = 0;
  } else if (length < 8) {
    points = Math.min(points, 1);
  }

  const maxPoints = 8;
  const normalized = Math.round((points / maxPoints) * 4);
  const score = Math.min(4, Math.max(0, normalized));

  const level = SCORE_LEVELS[score];
  const label = STRENGTH_LABELS[level];
  const percentage = SCORE_PERCENTAGES[score];

  return { level, label, score, percentage };
}

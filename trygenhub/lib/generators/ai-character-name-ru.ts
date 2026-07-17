export type AiCharacterStyleRu =
  | "fantasy"
  | "scifi"
  | "medieval"
  | "modern"
  | "random";

export type AiCharacterNameOptionsRu = {
  keyword: string;
  style: AiCharacterStyleRu;
  count: number;
  includeSurname: boolean;
};

export type AiCharacterNameValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiCharacterNameGenerationResultRu = {
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

const FANTASY_SYLLABLES: readonly string[] = [
  "эл", "аэль", "сил", "таль", "иан", "вен", "лор", "ит", "ни", "ра",
  "вае", "ори", "силь", "фае",
];

const SCIFI_SYLLABLES: readonly string[] = [
  "зекс", "вор", "кир", "накс", "дро", "квин", "зар", "тек", "вин", "орн",
  "ксель", "рин", "некс", "нова",
];

const MEDIEVAL_SYLLABLES: readonly string[] = [
  "эд", "вульф", "берт", "хильд", "вин", "фред", "гар", "мунд", "хельм", "рик",
  "бальд", "вин", "ард", "ольф", "стан",
];

const MODERN_SYLLABLES: readonly string[] = [
  "джей", "эш", "кай", "лео", "миа", "зои", "эли", "ноа", "рэй", "декс",
  "иви", "макс", "скай", "финн", "нелл",
];

const RANDOM_SYLLABLES: readonly string[] = [
  ...FANTASY_SYLLABLES,
  ...SCIFI_SYLLABLES,
  ...MEDIEVAL_SYLLABLES,
  ...MODERN_SYLLABLES,
];

const FANTASY_SURNAME_SUFFIXES: readonly string[] = ["вен", "иэль", "тас", "ион", "вин", "дор"];
const SCIFI_SURNAME_SUFFIXES: readonly string[] = ["екс", "он", "ар", "ус", "икс", "ор"];
const MEDIEVAL_SURNAME_SUFFIXES: readonly string[] = ["форд", "вуд", "шир", "брук", "холл", "гейт"];
const MODERN_SURNAME_SUFFIXES: readonly string[] = ["сон", "ли", "тон", "филд", "вуд", "ман"];

function surnameSuffixesFor(style: AiCharacterStyleRu): readonly string[] {
  switch (style) {
    case "fantasy":
      return FANTASY_SURNAME_SUFFIXES;
    case "scifi":
      return SCIFI_SURNAME_SUFFIXES;
    case "medieval":
      return MEDIEVAL_SURNAME_SUFFIXES;
    case "modern":
      return MODERN_SURNAME_SUFFIXES;
    case "random":
    default:
      return [
        ...FANTASY_SURNAME_SUFFIXES,
        ...SCIFI_SURNAME_SUFFIXES,
        ...MEDIEVAL_SURNAME_SUFFIXES,
        ...MODERN_SURNAME_SUFFIXES,
      ];
  }
}

function pickIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[pickIndex(pool.length)];
}

export function validateAiCharacterNameOptionsRu(
  options: AiCharacterNameOptionsRu,
): AiCharacterNameValidationResultRu {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Количество имён должно быть целым числом от ${MIN_COUNT} до ${MAX_COUNT}.`,
    };
  }

  if (keyword.trim().length > MAX_KEYWORD_LENGTH) {
    return {
      valid: false,
      error: `Ключевое слово должно быть не длиннее ${MAX_KEYWORD_LENGTH} символов.`,
    };
  }

  return { valid: true };
}

/**
 * Normalizes a keyword into a safe fragment for name generation.
 * Keeps lowercase Cyrillic/Latin letters only, so the resulting
 * fragment can never introduce markup or unsafe characters.
 */
export function sanitizeAiCharacterKeywordRu(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-zа-яё]/gi, "");
}

function syllablesFor(style: AiCharacterStyleRu): readonly string[] {
  switch (style) {
    case "fantasy":
      return FANTASY_SYLLABLES;
    case "scifi":
      return SCIFI_SYLLABLES;
    case "medieval":
      return MEDIEVAL_SYLLABLES;
    case "modern":
      return MODERN_SYLLABLES;
    case "random":
    default:
      return RANDOM_SYLLABLES;
  }
}

function buildFirstName(
  style: AiCharacterStyleRu,
  sanitizedKeyword: string,
): string {
  if (sanitizedKeyword.length > 0 && Math.random() < 0.35) {
    return capitalize(sanitizedKeyword);
  }

  const syllables = syllablesFor(style);
  const parts = Math.random() < 0.5 ? 2 : 3;
  let name = "";
  for (let i = 0; i < parts; i += 1) {
    name += pick(syllables);
  }
  return capitalize(name);
}

function buildSurname(style: AiCharacterStyleRu): string {
  const syllables = syllablesFor(style);
  const suffix = pick(surnameSuffixesFor(style));
  return capitalize(`${pick(syllables)}${suffix}`);
}

function buildCandidate(
  options: AiCharacterNameOptionsRu,
  sanitizedKeyword: string,
): string {
  const { style, includeSurname } = options;

  const first = buildFirstName(style, sanitizedKeyword);

  if (includeSurname && Math.random() < 0.7) {
    return `${first} ${buildSurname(style)}`;
  }

  return first;
}

export function generateAiCharacterNamesRu(
  options: AiCharacterNameOptionsRu,
): AiCharacterNameGenerationResultRu {
  const validation = validateAiCharacterNameOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiCharacterKeywordRu(options.keyword);
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

export function formatAiCharacterNameResultsRu(names: readonly string[]): string {
  return names.join("\n");
}

export type AiFantasyRace =
  | "elf"
  | "dwarf"
  | "orc"
  | "human"
  | "dark";

export type AiFantasyNameOptions = {
  keyword: string;
  race: AiFantasyRace;
  count: number;
  includeEpithet: boolean;
};

export type AiFantasyNameValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiFantasyNameGenerationResult = {
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

const ELF_SYLLABLES: readonly string[] = [
  "el", "ael", "sil", "thal", "ian", "wen", "lor", "ith", "ny", "ra",
  "vae", "ori", "syl", "en", "ael",
];

const DWARF_SYLLABLES: readonly string[] = [
  "thor", "grim", "dur", "bal", "ok", "kaz", "mor", "din", "brog", "ug",
  "gron", "throm", "dal", "nir", "bok",
];

const ORC_SYLLABLES: readonly string[] = [
  "grak", "mog", "ug", "thrak", "nazg", "grum", "borz", "kul", "vosh", "duk",
  "gash", "rok", "zug", "krum", "nash",
];

const HUMAN_SYLLABLES: readonly string[] = [
  "ed", "ric", "wyn", "ald", "mar", "wen", "for", "lan", "brid", "hel",
  "ton", "wick", "gar", "leth", "arv",
];

const DARK_SYLLABLES: readonly string[] = [
  "mor", "nex", "vash", "thal", "zir", "kre", "vor", "nis", "grim", "sul",
  "vex", "dral", "ashn", "quel", "xar",
];

const EPITHETS: Record<AiFantasyRace, readonly string[]> = {
  elf: ["the Silverleaf", "Moonwhisper", "of the Silent Woods", "Starbinder", "the Windwalker"],
  dwarf: ["Ironbeard", "the Stonebreaker", "Gemhammer", "of the Deep Halls", "Rockfist"],
  orc: ["Skullcrusher", "the Bloodfang", "Ironjaw", "of the Blackrock Horde", "Doomrider"],
  human: ["the Bold", "of House Ashford", "Wolfsbane", "the Wanderer", "Stormrider"],
  dark: ["the Forsaken", "Shadowbane", "of the Void", "Nightbringer", "the Unbound"],
};

const SURNAME_SUFFIXES: Record<AiFantasyRace, readonly string[]> = {
  elf: ["wen", "iel", "thas", "ion", "wyn"],
  dwarf: ["son", "born", "hammer", "forge", "beard"],
  orc: ["gore", "fist", "tusk", "skull", "maw"],
  human: ["ford", "wood", "field", "brook", "stone"],
  dark: ["shade", "void", "grave", "veil", "rune"],
};

function pickIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[pickIndex(pool.length)];
}

export function validateAiFantasyNameOptions(
  options: AiFantasyNameOptions,
): AiFantasyNameValidationResult {
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
export function sanitizeAiFantasyKeyword(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");
}

function syllablesFor(race: AiFantasyRace): readonly string[] {
  switch (race) {
    case "elf":
      return ELF_SYLLABLES;
    case "dwarf":
      return DWARF_SYLLABLES;
    case "orc":
      return ORC_SYLLABLES;
    case "dark":
      return DARK_SYLLABLES;
    case "human":
    default:
      return HUMAN_SYLLABLES;
  }
}

function buildFirstName(race: AiFantasyRace, sanitizedKeyword: string): string {
  if (sanitizedKeyword.length > 0 && Math.random() < 0.35) {
    return capitalize(sanitizedKeyword);
  }

  const syllables = syllablesFor(race);
  const parts = Math.random() < 0.5 ? 2 : 3;
  let name = "";
  for (let i = 0; i < parts; i += 1) {
    name += pick(syllables);
  }
  return capitalize(name);
}

function buildSurname(race: AiFantasyRace): string {
  const syllables = syllablesFor(race);
  const suffix = pick(SURNAME_SUFFIXES[race]);
  return capitalize(`${pick(syllables)}${suffix}`);
}

function buildCandidate(
  options: AiFantasyNameOptions,
  sanitizedKeyword: string,
): string {
  const { race, includeEpithet } = options;

  const first = buildFirstName(race, sanitizedKeyword);
  const useSurname = Math.random() < 0.6;
  const full = useSurname ? `${first} ${buildSurname(race)}` : first;

  if (includeEpithet && Math.random() < 0.5) {
    return `${full} ${pick(EPITHETS[race])}`;
  }

  return full;
}

export function generateAiFantasyNames(
  options: AiFantasyNameOptions,
): AiFantasyNameGenerationResult {
  const validation = validateAiFantasyNameOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiFantasyKeyword(options.keyword);
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

export function formatAiFantasyNameResults(names: readonly string[]): string {
  return names.join("\n");
}

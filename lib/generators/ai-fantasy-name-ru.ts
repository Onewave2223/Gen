export type AiFantasyRaceRu =
  | "elf"
  | "dwarf"
  | "orc"
  | "human"
  | "dark";

export type AiFantasyNameOptionsRu = {
  keyword: string;
  race: AiFantasyRaceRu;
  count: number;
  includeEpithet: boolean;
};

export type AiFantasyNameValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiFantasyNameGenerationResultRu = {
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
  "эл", "аэль", "сил", "таль", "иан", "вен", "лор", "ит", "ни", "ра",
  "вае", "ори", "силь", "эн",
];

const DWARF_SYLLABLES: readonly string[] = [
  "тор", "грим", "дур", "бал", "ок", "каз", "мор", "дин", "брог", "уг",
  "грон", "тром", "даль", "нир",
];

const ORC_SYLLABLES: readonly string[] = [
  "грак", "мог", "уг", "трак", "назг", "грум", "борз", "кул", "вош", "дук",
  "гаш", "рок", "зуг", "крум",
];

const HUMAN_SYLLABLES: readonly string[] = [
  "эд", "рик", "вин", "альд", "мар", "вен", "фор", "лан", "брид", "хель",
  "тон", "вик", "гар", "лет",
];

const DARK_SYLLABLES: readonly string[] = [
  "мор", "некс", "ваш", "таль", "зир", "кре", "вор", "нис", "грим", "суль",
  "векс", "драль", "ашн", "квель",
];

const EPITHETS: Record<AiFantasyRaceRu, readonly string[]> = {
  elf: ["Серебролист", "Лунный Шёпот", "из Тихих Лесов", "Звездный Плетун", "Ветроход"],
  dwarf: ["Железная Борода", "Камнелом", "Самоцветный Молот", "из Глубоких Залов", "Скалистый Кулак"],
  orc: ["Череполом", "Кровавый Клык", "Железная Челюсть", "из Чёрной Орды", "Наездник Гибели"],
  human: ["Смелый", "из Дома Эшфорд", "Волчья Погибель", "Странник", "Штормовой Наездник"],
  dark: ["Отвергнутый", "Теневой Проклятец", "из Пустоты", "Несущий Ночь", "Несвязанный"],
};

const SURNAME_SUFFIXES: Record<AiFantasyRaceRu, readonly string[]> = {
  elf: ["вен", "иэль", "тас", "ион", "вин"],
  dwarf: ["сон", "рожд", "молот", "кузня", "борода"],
  orc: ["клык", "кулак", "бивень", "череп", "пасть"],
  human: ["форд", "вуд", "поле", "ручей", "камень"],
  dark: ["тень", "пустота", "могила", "вуаль", "руна"],
};

function pickIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(pool: readonly T[]): T {
  return pool[pickIndex(pool.length)];
}

export function validateAiFantasyNameOptionsRu(
  options: AiFantasyNameOptionsRu,
): AiFantasyNameValidationResultRu {
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
export function sanitizeAiFantasyKeywordRu(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-zа-яё]/gi, "");
}

function syllablesFor(race: AiFantasyRaceRu): readonly string[] {
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

function buildFirstName(race: AiFantasyRaceRu, sanitizedKeyword: string): string {
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

function buildSurname(race: AiFantasyRaceRu): string {
  const syllables = syllablesFor(race);
  const suffix = pick(SURNAME_SUFFIXES[race]);
  return capitalize(`${pick(syllables)}${suffix}`);
}

function buildCandidate(
  options: AiFantasyNameOptionsRu,
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

export function generateAiFantasyNamesRu(
  options: AiFantasyNameOptionsRu,
): AiFantasyNameGenerationResultRu {
  const validation = validateAiFantasyNameOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiFantasyKeywordRu(options.keyword);
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

export function formatAiFantasyNameResultsRu(names: readonly string[]): string {
  return names.join("\n");
}

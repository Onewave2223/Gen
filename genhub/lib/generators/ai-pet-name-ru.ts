export type AiPetTypeRu = "dog" | "cat" | "bird" | "rabbit" | "universal";

export type AiPetNameOptionsRu = {
  keyword: string;
  petType: AiPetTypeRu;
  count: number;
};

export type AiPetNameValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiPetNameGenerationResultRu = {
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
  "Бадди", "Рекс", "Бейли", "Макс", "Чарли", "Рокки", "Дюк", "Мишка",
  "Зевс", "Купер", "Белла", "Луна", "Дейзи", "Мэгги", "Сэди", "Рейнджер",
  "Скаут", "Кекс", "Олли", "Вафля",
];

const CAT_NAMES: readonly string[] = [
  "Усатик", "Луна", "Симба", "Майло", "Тень", "Тигр", "Локи", "Клео",
  "Орео", "Перчик", "Нала", "Дымок", "Мурзик", "Зигги", "Джаспер", "Суки",
  "Печенька", "Тыковка", "Ива", "Салем",
];

const BIRD_NAMES: readonly string[] = [
  "Небо", "Киви", "Солнышко", "Синь", "Пип", "Чирик", "Перчик", "Манго",
  "Твити", "Эхо", "Бриз", "Робин", "Искра", "Пёрышко", "Зазу", "Коко",
  "Пайпер", "Пиксель", "Скай", "Мрамор",
];

const RABBIT_NAMES: readonly string[] = [
  "Клевер", "Топотун", "Ватка", "Хейзел", "Печенька", "Перчик", "Ива",
  "Дейзи", "Снежок", "Базилик", "Хрумка", "Пуговка", "Зефирка", "Арахис",
  "Мёдик", "Трюфель", "Флопси", "Мак", "Орео", "Ежевичка",
];

const UNIVERSAL_ADJECTIVES: readonly string[] = [
  "Пушистый", "Крошка", "Быстрый", "Везунчик", "Солнечный", "Милый",
  "Мягкий", "Уютный", "Яркий", "Нежный", "Смешной", "Ласковый",
];

const UNIVERSAL_WORDS: readonly string[] = [
  "Звёздочка", "Бобик", "Пушок", "Ягодка", "Наггет", "Кекс", "Пип", "Лапша",
  "Пузырёк", "Клевер", "Комета", "Зигги",
];

function petPool(petType: AiPetTypeRu): readonly string[] {
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

export function validateAiPetNameOptionsRu(
  options: AiPetNameOptionsRu,
): AiPetNameValidationResultRu {
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
export function sanitizeAiPetKeywordRu(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-zа-яё]/gi, "");
}

function buildCandidate(
  options: AiPetNameOptionsRu,
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

export function generateAiPetNamesRu(
  options: AiPetNameOptionsRu,
): AiPetNameGenerationResultRu {
  const validation = validateAiPetNameOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiPetKeywordRu(options.keyword);
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

export function formatAiPetNameResultsRu(names: readonly string[]): string {
  return names.join("\n");
}

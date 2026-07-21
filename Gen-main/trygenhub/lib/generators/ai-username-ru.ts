export type AiUsernameVibeRu =
  | "ai"
  | "gamer"
  | "aesthetic"
  | "professional"
  | "minimal";

export type AiUsernameOptionsRu = {
  keyword: string;
  vibe: AiUsernameVibeRu;
  count: number;
  includeNumbers: boolean;
  includeUnderscore: boolean;
};

export type AiUsernameValidationResultRu =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

export type AiUsernameGenerationResultRu = {
  usernames: string[];
};

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const MAX_KEYWORD_LENGTH = 30;
const MAX_ATTEMPTS_MULTIPLIER = 50;

const AI_PREFIXES: readonly string[] = [
  "Нейро",
  "Кибер",
  "Квант",
  "Синт",
  "Вектор",
  "Байт",
  "Сигнал",
  "Схема",
  "Нова",
  "Прото",
  "Мета",
  "Гипер",
  "Логик",
  "Пиксель",
  "Эхо",
];

const AI_WORDS: readonly string[] = [
  "Разум",
  "Ядро",
  "Узел",
  "Импульс",
  "Матрица",
  "Цикл",
  "Сеть",
  "Поток",
  "Искра",
  "Дрейф",
  "Волна",
  "Орбита",
  "Сдвиг",
  "Кузница",
  "Спектр",
];

const GAMER_WORDS: readonly string[] = [
  "Изгой",
  "Гадюка",
  "Фантом",
  "Титан",
  "Жнец",
  "Охотник",
  "Штурмовик",
  "Пламя",
  "Рейнджер",
  "Кобра",
  "Снайпер",
  "Авангард",
  "Разбойник",
  "Страж",
  "Рейдер",
];

const AESTHETIC_WORDS: readonly string[] = [
  "Луна",
  "Лепесток",
  "Облако",
  "Бархат",
  "Опал",
  "Ива",
  "Дымка",
  "Цветок",
  "Роса",
  "Лён",
  "Жемчуг",
  "Луг",
  "Сияние",
  "Шёлк",
  "Туман",
];

const PROFESSIONAL_WORDS: readonly string[] = [
  "Студия",
  "Коллектив",
  "Проекты",
  "Лаборатория",
  "Офис",
  "Бюро",
  "Партнёры",
  "Группа",
  "Мастерская",
  "Цифра",
];

const MINIMAL_WORDS: readonly string[] = [
  "ру",
  "нео",
  "ай",
  "уно",
  "ми",
  "экс",
  "ва",
];

const ADJECTIVES: readonly string[] = [
  "Яркий",
  "Быстрый",
  "Тихий",
  "Космический",
  "Ясный",
  "Смелый",
  "Скрытый",
  "Электрический",
  "Лунный",
  "Резкий",
  "Плавный",
  "Живой",
];

export function validateAiUsernameOptionsRu(
  options: AiUsernameOptionsRu,
): AiUsernameValidationResultRu {
  const { keyword, count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Количество никнеймов должно быть целым числом от ${MIN_COUNT} до ${MAX_COUNT}.`,
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
 * Normalizes a keyword into a safe fragment for username generation.
 * Keeps Cyrillic and Latin letters plus digits, and strips anything
 * else so the result can never introduce unsafe characters.
 */
export function sanitizeAiUsernameKeywordRu(keyword: string): string {
  return keyword
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, "");
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

function joinParts(parts: readonly string[], includeUnderscore: boolean): string {
  if (!includeUnderscore) {
    return parts.join("");
  }
  const useUnderscore = Math.random() < 0.5;
  return parts.join(useUnderscore ? "_" : "");
}

function buildCandidate(
  options: AiUsernameOptionsRu,
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

export function generateAiUsernamesRu(
  options: AiUsernameOptionsRu,
): AiUsernameGenerationResultRu {
  const validation = validateAiUsernameOptionsRu(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const sanitizedKeyword = sanitizeAiUsernameKeywordRu(options.keyword);
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
    const candidate = `${base}${fallbackSuffix}`;
    if (!results.has(candidate)) {
      results.add(candidate);
    }
    fallbackSuffix += 1;
  }

  return { usernames: Array.from(results) };
}

export function formatAiUsernameResultsRu(usernames: readonly string[]): string {
  return usernames.join("\n");
}

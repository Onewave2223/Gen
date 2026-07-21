export type EmojiCategory =
  | "all"
  | "smileys"
  | "animals"
  | "food"
  | "activities"
  | "travel"
  | "objects"
  | "symbols";

export type RandomEmojiOptions = {
  category: EmojiCategory;
  count: number;
  unique: boolean;
};

export type RandomEmojiResult = {
  emojis: string[];
};

export type RandomEmojiValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

const MIN_COUNT = 1;
const MAX_COUNT = 100;

type RealEmojiCategory = Exclude<EmojiCategory, "all">;

const EMOJI_DATA: Record<RealEmojiCategory, readonly string[]> = {
  smileys: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🙂",
    "😉",
    "😊",
    "😍",
    "😘",
    "😎",
    "🤩",
    "🤔",
    "😴",
    "🥳",
    "😇",
    "🙃",
    "🤗",
  ],
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🐧",
    "🐦",
    "🐢",
    "🐬",
  ],
  food: [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍓",
    "🍍",
    "🥝",
    "🍕",
    "🍔",
    "🌭",
    "🌮",
    "🍣",
    "🍩",
    "🍪",
    "🍰",
    "🍫",
    "🍿",
    "🥐",
    "🧀",
    "🍜",
  ],
  activities: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🏓",
    "🎳",
    "🎮",
    "🎲",
    "🎯",
    "🎨",
    "🎸",
    "🎤",
    "🎧",
    "🎬",
    "🧩",
    "🏆",
    "🥇",
    "🏹",
  ],
  travel: [
    "✈️",
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚲",
    "🛵",
    "🚀",
    "🚁",
    "⛵",
    "🚂",
    "🗽",
    "🗼",
    "🏝️",
    "🏔️",
    "🏕️",
    "🌋",
    "🧳",
    "🛳️",
    "🚦",
  ],
  objects: [
    "💡",
    "📱",
    "💻",
    "⌚",
    "📷",
    "🎁",
    "📚",
    "✏️",
    "🔑",
    "🔒",
    "🧲",
    "🔨",
    "🧰",
    "💰",
    "💎",
    "🕯️",
    "🧸",
    "🪑",
    "🛏️",
    "🧭",
  ],
  symbols: [
    "❤️",
    "⭐",
    "✨",
    "🔥",
    "💯",
    "✅",
    "❌",
    "⚡",
    "🔔",
    "🎵",
    "🔁",
    "♻️",
    "☀️",
    "🌈",
    "☂️",
    "❄️",
    "⚠️",
    "🔒",
    "🔓",
    "💤",
  ],
};

const CATEGORY_LABELS: Record<EmojiCategory, string> = {
  all: "All",
  smileys: "Smileys",
  animals: "Animals",
  food: "Food",
  activities: "Activities",
  travel: "Travel",
  objects: "Objects",
  symbols: "Symbols",
};

export const emojiCategories: readonly EmojiCategory[] = [
  "all",
  "smileys",
  "animals",
  "food",
  "activities",
  "travel",
  "objects",
  "symbols",
];

export function getCategoryLabel(category: EmojiCategory): string {
  return CATEGORY_LABELS[category];
}

function getAllEmojiPool(): string[] {
  const seen = new Set<string>();
  const pool: string[] = [];

  for (const categoryEmojis of Object.values(EMOJI_DATA)) {
    for (const emoji of categoryEmojis) {
      if (!seen.has(emoji)) {
        seen.add(emoji);
        pool.push(emoji);
      }
    }
  }

  return pool;
}

function getEmojiPool(category: EmojiCategory): readonly string[] {
  if (category === "all") {
    return getAllEmojiPool();
  }
  return EMOJI_DATA[category];
}

export function validateRandomEmojiOptions(
  options: RandomEmojiOptions,
): RandomEmojiValidationResult {
  const { count, unique, category } = options;

  if (!Number.isSafeInteger(count) || count < MIN_COUNT || count > MAX_COUNT) {
    return {
      valid: false,
      error: `Number of emojis must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  if (unique) {
    const pool = getEmojiPool(category);
    if (count > pool.length) {
      return {
        valid: false,
        error:
          "Count cannot exceed the number of available emojis in the selected category when unique results are enabled.",
      };
    }
  }

  return { valid: true };
}

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

function shuffle<T>(values: T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export function generateRandomEmojis(
  options: RandomEmojiOptions,
): RandomEmojiResult {
  const validation = validateRandomEmojiOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const pool = getEmojiPool(options.category);
  const { count, unique } = options;

  let emojis: string[];

  if (unique) {
    emojis = shuffle([...pool]).slice(0, count);
  } else {
    emojis = [];
    for (let i = 0; i < count; i++) {
      emojis.push(pool[randomIndex(pool.length)]);
    }
  }

  return { emojis };
}

export function formatEmojiResults(emojis: readonly string[]): string {
  return emojis.join(" ");
}

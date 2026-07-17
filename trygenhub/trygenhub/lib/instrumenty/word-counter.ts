export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  letters: number;
  digits: number;
  spaces: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
}

const WORDS_PER_MINUTE = 200;
const WORDS_PER_MINUTE_SPEAKING = 130;

/**
 * Computes basic text statistics client-side. Works reasonably well
 * for both Latin and Cyrillic text since word/sentence splitting is
 * based on whitespace and punctuation rather than a specific script.
 */
export function analyzeText(text: string): TextStats {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const trimmed = text.trim();

  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;

  const sentenceMatches = trimmed.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g);
  const sentences =
    trimmed === ""
      ? 0
      : (sentenceMatches ?? []).filter((s) => s.trim() !== "").length;

  const paragraphs =
    trimmed === ""
      ? 0
      : trimmed
          .split(/\n{2,}|\r\n{2,}/)
          .map((p) => p.trim())
          .filter((p) => p !== "").length;

  const readingTimeMinutes =
    words === 0 ? 0 : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  const speakingTimeMinutes =
    words === 0 ? 0 : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE_SPEAKING));

  const lines = text === "" ? 0 : text.split("\n").length;
  // \p{L} matches any Unicode letter (Cyrillic, Latin, etc.), so this is
  // correct for both English and Russian text, unlike an [a-zA-Z] regex.
  const letters = (text.match(/[\p{L}]/gu) ?? []).length;
  const digits = (text.match(/[0-9]/g) ?? []).length;
  const spaces = (text.match(/[ \t]/g) ?? []).length;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    letters,
    digits,
    spaces,
    readingTimeMinutes,
    speakingTimeMinutes,
  };
}

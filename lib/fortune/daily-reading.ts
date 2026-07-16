import { seededRandom, pick, pickInt } from "./prng";
import {
  energiesEn, energiesRu,
  symbolsEn, symbolsRu,
  colorsEn, colorsRu,
  focusesEn, focusesRu,
  messagesEn, messagesRu,
  luckyMomentsEn, luckyMomentsRu,
  type SymbolEntry, type ColorEntry, type DailyReadingLocale,
} from "./daily-reading-data";

export interface DailyReading {
  dateKey: string;
  energy: string;
  symbol: SymbolEntry;
  number: number;
  color: ColorEntry;
  focus: string;
  message: string;
  luckyMoment: string;
}

/**
 * Returns today's date key ("YYYY-MM-DD") in the visitor's local time
 * zone. Used only to seed a deterministic reading — never sent
 * anywhere, never combined with any other identifying data.
 */
export function getTodayKey(now: Date): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Builds a deterministic Daily Reading for a given calendar day.
 *
 * Deliberately a pure function of (dateKey, locale) only — no device
 * fingerprint, IP, or account identifier is used as a seed. Every
 * visitor sees the same reading on the same calendar day, and it's
 * naturally different every day since the date itself changes the
 * seed. Each field draws from an independent slice of the PRNG stream
 * so fields don't visibly correlate with each other.
 */
export function generateDailyReading(
  dateKey: string,
  locale: DailyReadingLocale,
): DailyReading {
  const energies = locale === "ru" ? energiesRu : energiesEn;
  const symbols = locale === "ru" ? symbolsRu : symbolsEn;
  const colors = locale === "ru" ? colorsRu : colorsEn;
  const focuses = locale === "ru" ? focusesRu : focusesEn;
  const messages = locale === "ru" ? messagesRu : messagesEn;
  const luckyMoments = locale === "ru" ? luckyMomentsRu : luckyMomentsEn;

  // Separate seeds per field (same date + a field tag) so the fields
  // don't all shift together when only one pool's length changes.
  const rngEnergy = seededRandom(`daily:${dateKey}:energy`);
  const rngSymbol = seededRandom(`daily:${dateKey}:symbol`);
  const rngNumber = seededRandom(`daily:${dateKey}:number`);
  const rngColor = seededRandom(`daily:${dateKey}:color`);
  const rngFocus = seededRandom(`daily:${dateKey}:focus`);
  const rngMessage = seededRandom(`daily:${dateKey}:message`);
  const rngLucky = seededRandom(`daily:${dateKey}:lucky`);

  return {
    dateKey,
    energy: pick(rngEnergy, energies),
    symbol: pick(rngSymbol, symbols),
    number: pickInt(rngNumber, 1, 99),
    color: pick(rngColor, colors),
    focus: pick(rngFocus, focuses),
    message: pick(rngMessage, messages),
    luckyMoment: pick(rngLucky, luckyMoments),
  };
}

export function formatReadingForShare(
  reading: DailyReading,
  locale: DailyReadingLocale,
): string {
  if (locale === "ru") {
    return [
      `Что ждёт меня сегодня — TryGenHub`,
      `Энергия дня: ${reading.energy}`,
      `Символ: ${reading.symbol.name}`,
      `Число дня: ${reading.number}`,
      `Цвет дня: ${reading.color.name}`,
      `Фокус дня: ${reading.focus}`,
      `Послание: ${reading.message}`,
    ].join("\n");
  }
  return [
    `What awaits me today — TryGenHub`,
    `Energy of the day: ${reading.energy}`,
    `Symbol: ${reading.symbol.name}`,
    `Number of the day: ${reading.number}`,
    `Color of the day: ${reading.color.name}`,
    `Focus of the day: ${reading.focus}`,
    `Message: ${reading.message}`,
  ].join("\n");
}

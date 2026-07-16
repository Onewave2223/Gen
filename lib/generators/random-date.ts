export type RandomDateOptions = {
  startDate: string;
  endDate: string;
  count: number;
  unique: boolean;
  sort: "none" | "asc" | "desc";
};

export type RandomDateValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

const MIN_COUNT = 1;
const MAX_COUNT = 1000;
const DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Parses a strict "YYYY-MM-DD" string into a UTC-based day index
 * (number of days since the Unix epoch). Returns null if the string
 * is not a real calendar date (wrong format, invalid month/day, or a
 * nonexistent leap day).
 */
function parseDateToDayIndex(value: string): number | null {
  const match = DATE_FORMAT.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  const timestamp = Date.UTC(year, month - 1, day);
  const roundTrip = new Date(timestamp);

  // If the input day overflowed into the next month (e.g. Feb 30),
  // the UTC round trip will not match the original components.
  if (
    roundTrip.getUTCFullYear() !== year ||
    roundTrip.getUTCMonth() !== month - 1 ||
    roundTrip.getUTCDate() !== day
  ) {
    return null;
  }

  return Math.floor(timestamp / MS_PER_DAY);
}

function dayIndexToDate(dayIndex: number): Date {
  return new Date(dayIndex * MS_PER_DAY);
}

export function validateRandomDateOptions(
  options: RandomDateOptions,
): RandomDateValidationResult {
  const { startDate, endDate, count, unique } = options;

  const startIndex = parseDateToDayIndex(startDate);
  if (startIndex === null) {
    return { valid: false, error: "Start date is not a valid calendar date." };
  }

  const endIndex = parseDateToDayIndex(endDate);
  if (endIndex === null) {
    return { valid: false, error: "End date is not a valid calendar date." };
  }

  if (startIndex > endIndex) {
    return {
      valid: false,
      error: "Start date must be on or before end date.",
    };
  }

  if (!Number.isSafeInteger(count) || count < MIN_COUNT || count > MAX_COUNT) {
    return {
      valid: false,
      error: `Number of dates must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  if (unique) {
    const availableDays = endIndex - startIndex + 1;
    if (count > availableDays) {
      return {
        valid: false,
        error:
          "Count cannot exceed the number of available calendar days in the selected range when unique results are enabled.",
      };
    }
  }

  return { valid: true };
}

function randomDayIndexInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(values: number[]): void {
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
}

/**
 * Selects `count` unique day indexes within an inclusive range using
 * Floyd's algorithm, which runs in time proportional to `count` rather
 * than the size of the range. This keeps generation fast even for
 * very large date ranges.
 */
function uniqueDayIndexes(
  minIndex: number,
  maxIndex: number,
  count: number,
): number[] {
  const rangeSize = maxIndex - minIndex + 1;
  const selected = new Set<number>();

  for (let j = rangeSize - count; j < rangeSize; j++) {
    const candidate = randomDayIndexInRange(0, j);
    if (selected.has(candidate)) {
      selected.add(j);
    } else {
      selected.add(candidate);
    }
  }

  const results = Array.from(selected, (value) => value + minIndex);
  shuffle(results);
  return results;
}

export function generateRandomDates(options: RandomDateOptions): Date[] {
  const validation = validateRandomDateOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const startIndex = parseDateToDayIndex(options.startDate) as number;
  const endIndex = parseDateToDayIndex(options.endDate) as number;
  const { count, unique, sort } = options;

  let dayIndexes: number[];

  if (unique) {
    dayIndexes = uniqueDayIndexes(startIndex, endIndex, count);
  } else {
    dayIndexes = [];
    for (let i = 0; i < count; i++) {
      dayIndexes.push(randomDayIndexInRange(startIndex, endIndex));
    }
  }

  if (sort === "asc") {
    dayIndexes = [...dayIndexes].sort((a, b) => a - b);
  } else if (sort === "desc") {
    dayIndexes = [...dayIndexes].sort((a, b) => b - a);
  }

  return dayIndexes.map(dayIndexToDate);
}

/**
 * Formats a date for display, e.g. "July 12, 2026". Uses UTC getters
 * throughout so the displayed calendar day never shifts due to the
 * local timezone.
 */
export function formatRandomDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = MONTH_NAMES[date.getUTCMonth()];
  const day = date.getUTCDate();
  return `${month} ${day}, ${year}`;
}

/**
 * Formats a date as "YYYY-MM-DD" for copying, using UTC getters to
 * avoid any timezone-related day shift.
 */
export function formatRandomDateForCopy(date: Date): string {
  const year = String(date.getUTCFullYear()).padStart(4, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatRandomDateResults(dates: readonly Date[]): string {
  return dates.map(formatRandomDateForCopy).join("\n");
}

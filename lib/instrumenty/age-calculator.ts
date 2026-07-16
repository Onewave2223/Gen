export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  approxTotalHours: number;
  daysUntilNextBirthday: number;
  birthWeekday: string;
}

export type AgeValidationResult =
  | { valid: true }
  | { valid: false; error: string };

const RU_WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Normalizes a Date to midnight UTC so day-based math (differences,
 * comparisons) is not affected by time-of-day or timezone drift.
 */
function toUtcMidnight(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

export function validateBirthDate(
  birthDate: Date,
  referenceDate: Date,
): AgeValidationResult {
  if (Number.isNaN(birthDate.getTime())) {
    return { valid: false, error: "Введите корректную дату рождения." };
  }

  const birth = toUtcMidnight(birthDate);
  const reference = toUtcMidnight(referenceDate);

  if (birth.getTime() > reference.getTime()) {
    return {
      valid: false,
      error: "Дата рождения не может быть в будущем.",
    };
  }

  const minDate = new Date(Date.UTC(1, 0, 1));
  if (birth.getTime() < minDate.getTime()) {
    return { valid: false, error: "Введите корректную дату рождения." };
  }

  return { valid: true };
}

/**
 * Calculates a person's age in whole years and months, total days
 * lived, days remaining until the next birthday, and the weekday
 * they were born on. All math is done on UTC-midnight dates to avoid
 * timezone-related off-by-one errors.
 */
export function calculateAge(birthDate: Date, referenceDate: Date): AgeResult {
  const validation = validateBirthDate(birthDate, referenceDate);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const birth = toUtcMidnight(birthDate);
  const reference = toUtcMidnight(referenceDate);

  let years = reference.getUTCFullYear() - birth.getUTCFullYear();
  let months = reference.getUTCMonth() - birth.getUTCMonth();
  let days = reference.getUTCDate() - birth.getUTCDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(
      Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), 0),
    ).getUTCDate();
    days += daysInPrevMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  const totalDays = Math.round(
    (reference.getTime() - birth.getTime()) / MS_PER_DAY,
  );
  const totalWeeks = Math.floor(totalDays / 7);
  const approxTotalHours = totalDays * 24;

  let nextBirthday = new Date(
    Date.UTC(reference.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate()),
  );
  if (nextBirthday.getTime() < reference.getTime()) {
    nextBirthday = new Date(
      Date.UTC(
        reference.getUTCFullYear() + 1,
        birth.getUTCMonth(),
        birth.getUTCDate(),
      ),
    );
  }
  const daysUntilNextBirthday = Math.round(
    (nextBirthday.getTime() - reference.getTime()) / MS_PER_DAY,
  );

  const birthWeekday = RU_WEEKDAYS[birth.getUTCDay()];

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    approxTotalHours,
    daysUntilNextBirthday,
    birthWeekday,
  };
}

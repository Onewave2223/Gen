export interface DateDifferenceResult {
  totalDays: number;
  weeks: number;
  remainderDays: number;
  approxMonths: number;
  totalHours: number;
  years: number;
  months: number;
  days: number;
  direction: "future" | "past" | "same";
}

export type DateDifferenceValidationResult =
  | { valid: true }
  | { valid: false; error: string };

function toUtcMidnight(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function validateDateDifferenceInput(
  startDate: Date,
  endDate: Date,
): DateDifferenceValidationResult {
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return { valid: false, error: "Введите две корректные даты." };
  }

  return { valid: true };
}

/**
 * Calculates the difference between two dates in days, weeks, and an
 * approximate number of months (30-day months, for a quick estimate
 * rather than exact calendar accounting). The "direction" indicates
 * whether the end date falls after, before, or on the start date.
 */
export function calculateDateDifference(
  startDate: Date,
  endDate: Date,
): DateDifferenceResult {
  const validation = validateDateDifferenceInput(startDate, endDate);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const start = toUtcMidnight(startDate);
  const end = toUtcMidnight(endDate);

  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.round(Math.abs(diffMs) / MS_PER_DAY);

  const weeks = Math.floor(totalDays / 7);
  const remainderDays = totalDays % 7;
  const approxMonths = Math.round((totalDays / 30) * 10) / 10;
  const totalHours = totalDays * 24;

  const earlier = diffMs >= 0 ? start : end;
  const later = diffMs >= 0 ? end : start;

  let years = later.getUTCFullYear() - earlier.getUTCFullYear();
  let months = later.getUTCMonth() - earlier.getUTCMonth();
  let days = later.getUTCDate() - earlier.getUTCDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(
      Date.UTC(later.getUTCFullYear(), later.getUTCMonth(), 0),
    ).getUTCDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let direction: DateDifferenceResult["direction"] = "same";
  if (diffMs > 0) direction = "future";
  if (diffMs < 0) direction = "past";

  return {
    totalDays,
    weeks,
    remainderDays,
    approxMonths,
    totalHours,
    years,
    months,
    days,
    direction,
  };
}

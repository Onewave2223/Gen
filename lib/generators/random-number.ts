export interface RandomNumberOptions {
  min: number;
  max: number;
  count: number;
  unique: boolean;
  sort: "none" | "asc" | "desc";
}

export type RandomNumberValidationResult =
  | { valid: true }
  | { valid: false; error: string };

const MAX_COUNT = 1000;

function invalid(error: string): RandomNumberValidationResult {
  return { valid: false, error };
}

export function validateRandomNumberOptions(
  options: RandomNumberOptions,
): RandomNumberValidationResult {
  const { min, max, count, unique } = options;

  if (!Number.isSafeInteger(min)) {
    return invalid("Minimum must be a safe integer.");
  }

  if (!Number.isSafeInteger(max)) {
    return invalid("Maximum must be a safe integer.");
  }

  if (!Number.isSafeInteger(count)) {
    return invalid("Count must be between 1 and 1000.");
  }

  if (min > max) {
    return invalid("Minimum cannot be greater than maximum.");
  }

  if (count < 1 || count > MAX_COUNT) {
    return invalid("Count must be between 1 and 1000.");
  }

  if (unique) {
    const availableValues = max - min + 1;
    if (count > availableValues) {
      return invalid(
        "Count cannot exceed the number of available values when unique results are enabled.",
      );
    }
  }

  return { valid: true };
}

function randomInt(min: number, max: number): number {
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
 * Generates `count` unique random integers within an inclusive range
 * using Floyd's algorithm. This runs in time proportional to `count`,
 * not to the size of the range, so it stays fast even for very large
 * ranges.
 */
function uniqueRandomInts(min: number, max: number, count: number): number[] {
  const rangeSize = max - min + 1;
  const selected = new Set<number>();

  for (let j = rangeSize - count; j < rangeSize; j++) {
    const candidate = randomInt(0, j);
    if (selected.has(candidate)) {
      selected.add(j);
    } else {
      selected.add(candidate);
    }
  }

  const results = Array.from(selected, (value) => value + min);
  shuffle(results);
  return results;
}

export function generateRandomNumbers(
  options: RandomNumberOptions,
): number[] {
  const validation = validateRandomNumberOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const { min, max, count, unique, sort } = options;

  let results: number[];

  if (unique) {
    results = uniqueRandomInts(min, max, count);
  } else {
    results = [];
    for (let i = 0; i < count; i++) {
      results.push(randomInt(min, max));
    }
  }

  if (sort === "asc") {
    return [...results].sort((a, b) => a - b);
  }

  if (sort === "desc") {
    return [...results].sort((a, b) => b - a);
  }

  return results;
}

export function formatRandomNumberResults(
  numbers: readonly number[],
): string {
  return numbers.join("\n");
}

export type RandomChoiceValidationResult =
  | { valid: true }
  | { valid: false; error: string };

/**
 * Splits raw textarea input into a list of non-empty, trimmed
 * options, one per line.
 */
export function parseChoiceOptions(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

export function validateChoiceOptions(
  options: readonly string[],
): RandomChoiceValidationResult {
  if (options.length === 0) {
    return {
      valid: false,
      error: "Введите хотя бы один вариант, каждый с новой строки.",
    };
  }

  if (options.length === 1) {
    return {
      valid: false,
      error: "Введите хотя бы два варианта для случайного выбора.",
    };
  }

  return { valid: true };
}

/**
 * Picks a random option from the list using Math.random. This is for
 * a lightweight, fun decision-making tool, not a security-sensitive
 * operation, so a cryptographic source of randomness is unnecessary.
 */
export function pickRandomOption(options: readonly string[]): string {
  const validation = validateChoiceOptions(options);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

export type DiceRollOptions = {
  diceCount: number;
  sides: number;
};

export type DiceRollResult = {
  rolls: number[];
  total: number;
  minimumPossible: number;
  maximumPossible: number;
};

export type DiceRollValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

const MIN_DICE_COUNT = 1;
const MAX_DICE_COUNT = 100;
const MIN_SIDES = 2;
const MAX_SIDES = 1000;

export function validateDiceRollOptions(
  options: DiceRollOptions,
): DiceRollValidationResult {
  const { diceCount, sides } = options;

  if (
    !Number.isSafeInteger(diceCount) ||
    diceCount < MIN_DICE_COUNT ||
    diceCount > MAX_DICE_COUNT
  ) {
    return {
      valid: false,
      error: `Number of dice must be a whole number between ${MIN_DICE_COUNT} and ${MAX_DICE_COUNT}.`,
    };
  }

  if (
    !Number.isSafeInteger(sides) ||
    sides < MIN_SIDES ||
    sides > MAX_SIDES
  ) {
    return {
      valid: false,
      error: `Number of sides must be a whole number between ${MIN_SIDES} and ${MAX_SIDES}.`,
    };
  }

  return { valid: true };
}

function rollSingleDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollDice(options: DiceRollOptions): DiceRollResult {
  const validation = validateDiceRollOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const { diceCount, sides } = options;

  const rolls: number[] = [];
  for (let i = 0; i < diceCount; i++) {
    rolls.push(rollSingleDie(sides));
  }

  const total = rolls.reduce((sum, value) => sum + value, 0);

  return {
    rolls,
    total,
    minimumPossible: diceCount,
    maximumPossible: diceCount * sides,
  };
}

export function formatDiceRollResult(result: DiceRollResult): string {
  return `Rolls: ${result.rolls.join(", ")}\nTotal: ${result.total}`;
}

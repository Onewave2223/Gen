export type CoinSide = "heads" | "tails";

export type CoinFlipOptions = {
  count: number;
};

export type CoinFlipResult = {
  flips: CoinSide[];
  heads: number;
  tails: number;
};

export type CoinFlipValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      error: string;
    };

const MIN_COUNT = 1;
const MAX_COUNT = 1000;

export function validateCoinFlipOptions(
  options: CoinFlipOptions,
): CoinFlipValidationResult {
  const { count } = options;

  if (
    !Number.isSafeInteger(count) ||
    count < MIN_COUNT ||
    count > MAX_COUNT
  ) {
    return {
      valid: false,
      error: `Number of flips must be a whole number between ${MIN_COUNT} and ${MAX_COUNT}.`,
    };
  }

  return { valid: true };
}

function flipSingleCoin(): CoinSide {
  return Math.random() < 0.5 ? "heads" : "tails";
}

export function flipCoins(options: CoinFlipOptions): CoinFlipResult {
  const validation = validateCoinFlipOptions(options);

  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const flips: CoinSide[] = [];
  let heads = 0;
  let tails = 0;

  for (let i = 0; i < options.count; i++) {
    const flip = flipSingleCoin();
    flips.push(flip);
    if (flip === "heads") {
      heads += 1;
    } else {
      tails += 1;
    }
  }

  return { flips, heads, tails };
}

function capitalize(side: CoinSide): string {
  return side === "heads" ? "Heads" : "Tails";
}

export function formatCoinFlipResult(result: CoinFlipResult): string {
  const resultsLine = result.flips.map(capitalize).join(", ");
  return `Results: ${resultsLine}\nHeads: ${result.heads}\nTails: ${result.tails}`;
}

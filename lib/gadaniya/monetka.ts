export type CoinSide = "orel" | "reshka";

export function flipFateCoin(): CoinSide {
  return Math.random() < 0.5 ? "orel" : "reshka";
}

export function coinSideLabel(side: CoinSide): string {
  return side === "orel" ? "Орёл" : "Решка";
}

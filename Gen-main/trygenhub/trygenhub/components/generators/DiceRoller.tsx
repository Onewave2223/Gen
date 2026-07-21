"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  rollDice,
  formatDiceRollResult,
  type DiceRollOptions,
  type DiceRollResult,
} from "@/lib/generators/dice-roller";

const DEFAULT_DICE_COUNT = "1";
const DEFAULT_SIDES = "6";

const PRESETS = [4, 6, 8, 10, 12, 20, 100];

function parseNumberInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function DiceRoller() {
  const diceCountId = React.useId();
  const sidesId = React.useId();

  const [diceCountInput, setDiceCountInput] = React.useState(
    DEFAULT_DICE_COUNT,
  );
  const [sidesInput, setSidesInput] = React.useState(DEFAULT_SIDES);

  const [result, setResult] = React.useState<DiceRollResult | null>(null);
  const [error, setError] = React.useState("");

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: DiceRollOptions = {
      diceCount: parseNumberInput(diceCountInput),
      sides: parseNumberInput(sidesInput),
    };

    try {
      const rolled = rollDice(options);
      setResult(rolled);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleReset = () => {
    setDiceCountInput(DEFAULT_DICE_COUNT);
    setSidesInput(DEFAULT_SIDES);
    setResult(null);
    setError("");
  };

  const handlePreset = (sides: number) => {
    setSidesInput(String(sides));
  };

  const hasResult = result !== null;
  const copyText = hasResult ? formatDiceRollResult(result) : "";

  const diceCountDisplay = diceCountInput.trim() === "" ? "?" : diceCountInput;
  const sidesDisplay = sidesInput.trim() === "" ? "?" : sidesInput;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={diceCountId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Number of dice
            </label>
            <Input
              id={diceCountId}
              type="number"
              inputMode="numeric"
              min={1}
              max={100}
              value={diceCountInput}
              onChange={(event) => setDiceCountInput(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={sidesId}
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Number of sides
            </label>
            <Input
              id={sidesId}
              type="number"
              inputMode="numeric"
              min={2}
              max={1000}
              value={sidesInput}
              onChange={(event) => setSidesInput(event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[var(--foreground)]">
            Presets
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((sides) => (
              <Button
                key={sides}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handlePreset(sides)}
              >
                d{sides}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-[var(--muted)]">
          Notation:{" "}
          <span className="font-medium text-[var(--foreground)]">
            {diceCountDisplay}d{sidesDisplay}
          </span>
        </p>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Roll dice</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasResult}
        emptyMessage="Your dice rolls will appear here."
        actions={
          <CopyButton
            text={copyText}
            disabled={!hasResult}
            size="sm"
            variant="secondary"
          />
        }
      >
        {hasResult && (
          <div className="flex flex-col gap-3">
            <ul className="flex flex-wrap gap-2">
              {result.rolls.map((value, index) => (
                <li
                  key={`${value}-${index}`}
                  className="flex h-10 min-w-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-2 text-sm font-semibold text-[var(--foreground)]"
                >
                  {value}
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold text-[var(--foreground)]">
              Total: {result.total}
            </p>
            <p className="text-sm text-[var(--muted)]">
              Possible range: {result.minimumPossible}–
              {result.maximumPossible}
            </p>
          </div>
        )}
      </ResultBox>
    </div>
  );
}

DiceRoller.displayName = "DiceRoller";

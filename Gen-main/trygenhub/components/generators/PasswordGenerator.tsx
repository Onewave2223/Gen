"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  generatePassword,
  validatePasswordOptions,
  calculatePasswordStrength,
  type PasswordOptions,
} from "@/lib/generators/password";

const DEFAULT_LENGTH = 16;
const MIN_LENGTH = 4;
const MAX_LENGTH = 128;

const DEFAULT_OPTIONS: Omit<PasswordOptions, "length"> = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: false,
};

function parseLengthInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

export function PasswordGenerator() {
  const lengthId = React.useId();
  const lengthRangeId = React.useId();

  const [lengthInput, setLengthInput] = React.useState(
    String(DEFAULT_LENGTH),
  );
  const [lastValidLength, setLastValidLength] =
    React.useState(DEFAULT_LENGTH);

  const [uppercase, setUppercase] = React.useState(
    DEFAULT_OPTIONS.uppercase,
  );
  const [lowercase, setLowercase] = React.useState(
    DEFAULT_OPTIONS.lowercase,
  );
  const [numbers, setNumbers] = React.useState(DEFAULT_OPTIONS.numbers);
  const [symbols, setSymbols] = React.useState(DEFAULT_OPTIONS.symbols);
  const [excludeSimilar, setExcludeSimilar] = React.useState(
    DEFAULT_OPTIONS.excludeSimilar,
  );

  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [lastOptions, setLastOptions] =
    React.useState<PasswordOptions | null>(null);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setLengthInput(String(value));
    setLastValidLength(value);
  };

  const handleNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const raw = event.target.value;
    setLengthInput(raw);

    const parsed = parseLengthInput(raw);
    if (
      Number.isSafeInteger(parsed) &&
      parsed >= MIN_LENGTH &&
      parsed <= MAX_LENGTH
    ) {
      setLastValidLength(parsed);
    }
  };

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options: PasswordOptions = {
      length: parseLengthInput(lengthInput),
      uppercase,
      lowercase,
      numbers,
      symbols,
      excludeSimilar,
    };

    const validation = validatePasswordOptions(options);

    if (!validation.valid) {
      setError(validation.error);
      setPassword("");
      setLastOptions(null);
      return;
    }

    try {
      const generated = generatePassword(options);
      setPassword(generated);
      setLastOptions(options);
      setError("");
    } catch (err) {
      setPassword("");
      setLastOptions(null);
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  const handleReset = () => {
    setLengthInput(String(DEFAULT_LENGTH));
    setLastValidLength(DEFAULT_LENGTH);
    setUppercase(DEFAULT_OPTIONS.uppercase);
    setLowercase(DEFAULT_OPTIONS.lowercase);
    setNumbers(DEFAULT_OPTIONS.numbers);
    setSymbols(DEFAULT_OPTIONS.symbols);
    setExcludeSimilar(DEFAULT_OPTIONS.excludeSimilar);
    setPassword("");
    setError("");
    setLastOptions(null);
  };

  const hasPassword = password !== "";
  const strength =
    hasPassword && lastOptions
      ? calculatePasswordStrength(password, lastOptions)
      : null;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={lengthId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Password length
          </label>
          <div className="flex items-center gap-4">
            <input
              id={lengthRangeId}
              type="range"
              min={MIN_LENGTH}
              max={MAX_LENGTH}
              step={1}
              value={lastValidLength}
              onChange={handleRangeChange}
              aria-label="Password length"
              className="h-2 w-full cursor-pointer accent-[var(--primary)]"
            />
            <Input
              id={lengthId}
              type="number"
              inputMode="numeric"
              min={MIN_LENGTH}
              max={MAX_LENGTH}
              step={1}
              value={lengthInput}
              onChange={handleNumberInputChange}
              className="w-20 shrink-0"
              aria-label="Password length"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Checkbox
            checked={uppercase}
            onChange={(event) => setUppercase(event.target.checked)}
            label="Uppercase letters"
            description="Include A–Z"
          />
          <Checkbox
            checked={lowercase}
            onChange={(event) => setLowercase(event.target.checked)}
            label="Lowercase letters"
            description="Include a–z"
          />
          <Checkbox
            checked={numbers}
            onChange={(event) => setNumbers(event.target.checked)}
            label="Numbers"
            description="Include 0–9"
          />
          <Checkbox
            checked={symbols}
            onChange={(event) => setSymbols(event.target.checked)}
            label="Symbols"
            description="Include special characters"
          />
          <Checkbox
            checked={excludeSimilar}
            onChange={(event) => setExcludeSimilar(event.target.checked)}
            label="Exclude similar characters"
            description="Remove characters such as 0, O, o, 1, l, and I."
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Generate password</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <ResultBox
        label="Result"
        empty={!hasPassword}
        emptyMessage="Your password will appear here."
        actions={
          <CopyButton
            text={password}
            disabled={!hasPassword}
            size="sm"
            variant="secondary"
          />
        }
      >
        {hasPassword && (
          <span className="block break-all font-mono text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {password}
          </span>
        )}
      </ResultBox>

      {strength && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              Password strength
            </span>
            <span className="text-sm font-medium text-[var(--foreground)]">
              {strength.label}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={strength.percentage}
            aria-label="Password strength"
            className="h-2 w-full overflow-hidden rounded-full bg-[var(--background)]"
          >
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-[width] duration-150"
              style={{ width: `${strength.percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

PasswordGenerator.displayName = "PasswordGenerator";

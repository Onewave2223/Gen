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

const STRENGTH_LABELS_RU: Record<string, string> = {
  "Very weak": "Очень слабый",
  Weak: "Слабый",
  Fair: "Средний",
  Strong: "Надёжный",
  "Very strong": "Очень надёжный",
};

function parseLengthInput(value: string): number {
  return value.trim() === "" ? NaN : Number(value);
}

/**
 * Russian-language UI for the password generator. Reuses the
 * existing crypto.getRandomValues-based generation logic in
 * lib/generators/password.ts, so passwords are still generated
 * locally in the browser and never sent to a server.
 */
export function PasswordGeneratorRu() {
  const lengthId = React.useId();
  const lengthRangeId = React.useId();

  const [lengthInput, setLengthInput] = React.useState(String(DEFAULT_LENGTH));
  const [lastValidLength, setLastValidLength] = React.useState(DEFAULT_LENGTH);

  const [uppercase, setUppercase] = React.useState(DEFAULT_OPTIONS.uppercase);
  const [lowercase, setLowercase] = React.useState(DEFAULT_OPTIONS.lowercase);
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
      setError(translateError(validation.error));
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
        err instanceof Error ? translateError(err.message) : "Что-то пошло не так.",
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
  const strengthLabelRu = strength
    ? STRENGTH_LABELS_RU[strength.label] ?? strength.label
    : null;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleGenerate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={lengthId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Длина пароля
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
              aria-label="Длина пароля"
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
              aria-label="Длина пароля"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Checkbox
            checked={uppercase}
            onChange={(event) => setUppercase(event.target.checked)}
            label="Заглавные буквы"
            description="Включить A–Z"
          />
          <Checkbox
            checked={lowercase}
            onChange={(event) => setLowercase(event.target.checked)}
            label="Строчные буквы"
            description="Включить a–z"
          />
          <Checkbox
            checked={numbers}
            onChange={(event) => setNumbers(event.target.checked)}
            label="Цифры"
            description="Включить 0–9"
          />
          <Checkbox
            checked={symbols}
            onChange={(event) => setSymbols(event.target.checked)}
            label="Специальные символы"
            description="Включить спецсимволы"
          />
          <Checkbox
            checked={excludeSimilar}
            onChange={(event) => setExcludeSimilar(event.target.checked)}
            label="Исключить похожие символы"
            description="Убрать символы вроде 0, O, o, 1, l и I."
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Сгенерировать</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Результат"
        empty={!hasPassword}
        emptyMessage="Здесь появится ваш пароль."
        actions={
          <CopyButton
            text={password}
            disabled={!hasPassword}
            size="sm"
            variant="secondary"
            label="Скопировать"
            copiedLabel="Скопировано!"
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
              Сложность пароля
            </span>
            <span className="text-sm font-medium text-[var(--foreground)]">
              {strengthLabelRu}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={strength.percentage}
            aria-label="Сложность пароля"
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

/**
 * Translates the small, fixed set of English validation messages
 * produced by lib/generators/password.ts into Russian, without
 * modifying the shared, locale-agnostic validation logic itself.
 */
function translateError(message: string): string {
  if (message.startsWith("Password length must be a whole number between")) {
    return `Длина пароля должна быть целым числом от ${MIN_LENGTH} до ${MAX_LENGTH}.`;
  }

  const translations: Record<string, string> = {
    "Select at least one character type.":
      "Выберите хотя бы один тип символов.",
    "Your current options do not leave any characters available for generation.":
      "При текущих настройках нет доступных символов для генерации.",
    "Secure random generation is not available in this environment.":
      "Безопасная генерация случайных чисел недоступна в этом браузере.",
  };

  return translations[message] ?? message;
}

PasswordGeneratorRu.displayName = "PasswordGeneratorRu";

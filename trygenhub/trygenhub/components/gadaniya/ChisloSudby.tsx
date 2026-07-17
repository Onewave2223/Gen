"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ResultBox } from "@/components/generators/ResultBox";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  calculateDestinyNumber,
  getDestinyNumberProfile,
  validateDestinyNumberInput,
  type DestinyNumberProfile,
} from "@/lib/gadaniya/chislo-sudby";

export function ChisloSudby() {
  const dateId = React.useId();

  const [dateValue, setDateValue] = React.useState("");
  const [profile, setProfile] = React.useState<DestinyNumberProfile | null>(
    null,
  );
  const [error, setError] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dateValue) {
      setError("Введите дату рождения.");
      setProfile(null);
      return;
    }

    const [yearStr, monthStr, dayStr] = dateValue.split("-");
    const input = {
      day: Number(dayStr),
      month: Number(monthStr),
      year: Number(yearStr),
    };

    const validation = validateDestinyNumberInput(input);

    if (!validation.valid) {
      setError(validation.error);
      setProfile(null);
      return;
    }

    const number = calculateDestinyNumber(input);
    setProfile(getDestinyNumberProfile(number));
    setError("");
  };

  const handleReset = () => {
    setDateValue("");
    setProfile(null);
    setError("");
  };

  const copyText = profile
    ? `Число судьбы: ${profile.number} — ${profile.title}\n\n${profile.description}\n\nСильные стороны: ${profile.strengths.join(", ")}\nОсобенности: ${profile.traits.join(", ")}`
    : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={dateId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Дата рождения
          </label>
          <Input
            id={dateId}
            type="date"
            value={dateValue}
            onChange={(event) => setDateValue(event.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">Рассчитать число судьбы</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </form>

      <ResultBox
        label="Твоё число судьбы"
        empty={!profile}
        emptyMessage="Здесь появится твоё число судьбы и его описание."
        actions={
          <CopyButton
            text={copyText}
            disabled={!profile}
            size="sm"
            variant="secondary"
            label="Скопировать"
            copiedLabel="Скопировано!"
          />
        }
      >
        {profile && (
          <div className="mystic-fade-up flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-2xl font-bold text-[var(--primary-foreground)]">
                {profile.number}
              </span>
              <span className="text-xl font-semibold text-[var(--foreground)]">
                {profile.title}
              </span>
            </div>
            <p className="text-sm text-[var(--foreground)]">
              {profile.description}
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-[var(--muted)]">
                Сильные стороны:
              </span>
              <ul className="list-inside list-disc text-[var(--foreground)]">
                {profile.strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-[var(--muted)]">
                Возможные особенности:
              </span>
              <ul className="list-inside list-disc text-[var(--foreground)]">
                {profile.traits.map((trait) => (
                  <li key={trait}>{trait}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </ResultBox>
    </div>
  );
}

ChisloSudby.displayName = "ChisloSudby";

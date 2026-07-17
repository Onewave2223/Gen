"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CopyButton } from "@/components/generators/CopyButton";
import {
  MALE_FIRST_NAMES,
  FEMALE_FIRST_NAMES,
  LAST_NAMES,
} from "@/lib/data/names";

const GENDER_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const COUNT_OPTIONS = [1, 3, 5, 10, 20].map((n) => ({
  value: String(n),
  label: String(n),
}));

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(gender: string): string {
  const first =
    gender === "male"
      ? pick(MALE_FIRST_NAMES)
      : gender === "female"
        ? pick(FEMALE_FIRST_NAMES)
        : Math.random() < 0.5
          ? pick(MALE_FIRST_NAMES)
          : pick(FEMALE_FIRST_NAMES);
  const last = pick(LAST_NAMES);
  return `${first} ${last}`;
}

export function RandomNameGenerator() {
  const genderId = React.useId();
  const countId = React.useId();
  const [gender, setGender] = React.useState("any");
  const [count, setCount] = React.useState("5");
  const [names, setNames] = React.useState<string[]>([]);

  const handleGenerate = () => {
    const n = parseInt(count, 10);
    setNames(Array.from({ length: n }, () => generateName(gender)));
  };

  const allText = names.join("\n");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={genderId} className="text-sm font-medium text-[var(--foreground)]">
            Gender
          </label>
          <Select
            id={genderId}
            options={GENDER_OPTIONS}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-[140px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
            Count
          </label>
          <Select
            id={countId}
            options={COUNT_OPTIONS}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-[100px]"
          />
        </div>
      </div>

      <Button type="button" onClick={handleGenerate} className="self-start">
        Generate Names
      </Button>

      {names.length > 0 && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              {names.length} name{names.length !== 1 ? "s" : ""}
            </span>
            <CopyButton text={allText} size="sm" variant="secondary" />
          </div>
          <ul className="flex flex-col gap-1.5">
            {names.map((name, i) => (
              <li key={i} className="text-sm text-[var(--foreground)]">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

RandomNameGenerator.displayName = "RandomNameGenerator";

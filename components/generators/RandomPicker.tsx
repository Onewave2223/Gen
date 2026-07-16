"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

export function RandomPicker() {
  const inputId = React.useId();
  const [optionsText, setOptionsText] = React.useState("");
  const [excludeChosen, setExcludeChosen] = React.useState(false);
  const [excluded, setExcluded] = React.useState<Set<string>>(new Set());
  const [result, setResult] = React.useState<string | null>(null);
  const [animating, setAnimating] = React.useState(false);
  const [error, setError] = React.useState("");

  const options = optionsText
    .split("\n")
    .map((o) => o.trim())
    .filter(Boolean);

  const available = excludeChosen
    ? options.filter((o) => !excluded.has(o))
    : options;

  const handlePick = () => {
    if (available.length === 0) {
      setError(
        options.length === 0
          ? "Enter at least 2 options."
          : "All options have been chosen. Reset to start again.",
      );
      return;
    }

    setError("");
    setAnimating(true);
    setResult(null);

    setTimeout(() => {
      const picked = available[Math.floor(Math.random() * available.length)];
      setResult(picked);
      setAnimating(false);
      if (excludeChosen) {
        setExcluded((prev) => new Set([...prev, picked]));
      }
    }, 400);
  };

  const handleReset = () => {
    setExcluded(new Set());
    setResult(null);
    setError("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
          Options (one per line)
        </label>
        <textarea
          id={inputId}
          value={optionsText}
          onChange={(e) => {
            setOptionsText(e.target.value);
            setResult(null);
            setExcluded(new Set());
            setError("");
          }}
          placeholder={"Pizza\nSushi\nBurger\nPasta\nTacos"}
          rows={5}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-none"
        />
        <span className="text-xs text-[var(--muted)]">
          {options.length} option{options.length !== 1 ? "s" : ""}
          {excludeChosen && excluded.size > 0 && ` · ${available.length} remaining`}
        </span>
      </div>

      <Checkbox
        checked={excludeChosen}
        onChange={(e) => {
          setExcludeChosen(e.target.checked);
          setExcluded(new Set());
          setResult(null);
        }}
        label="Exclude already picked options"
        description="Remove each result from the pool after picking"
      />

      {error && (
        <p role="alert" className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handlePick} disabled={animating}>
          Pick Random
        </Button>
        {excluded.size > 0 && (
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>

      <div
        aria-live="polite"
        className={`min-h-20 flex items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-6 transition-opacity duration-300 ${animating ? "opacity-30" : "opacity-100"}`}
      >
        {result ? (
          <span className="text-2xl font-bold text-[var(--foreground)]">
            {result}
          </span>
        ) : (
          <span className="text-sm text-[var(--muted)]">
            Your result will appear here
          </span>
        )}
      </div>
    </div>
  );
}

RandomPicker.displayName = "RandomPicker";

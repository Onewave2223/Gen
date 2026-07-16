"use client";

import * as React from "react";

type SortMode = "az" | "za" | "shortest" | "longest" | "random";

const MODES: { value: SortMode; label: string }[] = [
  { value: "az", label: "А → Я" },
  { value: "za", label: "Я → А" },
  { value: "shortest", label: "Короткие → длинные" },
  { value: "longest", label: "Длинные → короткие" },
  { value: "random", label: "Случайно" },
];

function sortLines(
  lines: string[],
  mode: SortMode,
  caseSensitive: boolean,
): string[] {
  const arr = [...lines];
  const collatorOptions: Intl.CollatorOptions = caseSensitive
    ? { sensitivity: "case" }
    : { sensitivity: "base" };
  switch (mode) {
    case "az":
      return arr.sort((a, b) => a.localeCompare(b, "ru", collatorOptions));
    case "za":
      return arr.sort((a, b) => b.localeCompare(a, "ru", collatorOptions));
    case "shortest":
      return arr.sort((a, b) => a.length - b.length);
    case "longest":
      return arr.sort((a, b) => b.length - a.length);
    case "random":
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
  }
}

export function SortLinesRu() {
  const inputId = React.useId();
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<SortMode>("az");
  const [caseSensitive, setCaseSensitive] = React.useState(false);
  const [trimLines, setTrimLines] = React.useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [randomKey, setRandomKey] = React.useState(0);

  const output = React.useMemo(() => {
    // randomKey is intentionally unused in the sort logic itself; it exists
    // purely to force a recompute (new shuffle) when "random" is re-selected.
    void randomKey;
    let lines = text.split("\n");
    if (trimLines) lines = lines.map((l) => l.trim());
    if (ignoreEmpty) lines = lines.filter((l) => l.trim() !== "");
    return sortLines(lines, mode, caseSensitive).join("\n");
  }, [text, mode, randomKey, caseSensitive, trimLines, ignoreEmpty]);

  const handleModeChange = (m: SortMode) => {
    if (m === "random" && m === mode) {
      setRandomKey((k) => k + 1);
    }
    setMode(m);
  };

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => handleModeChange(m.value)}
            className={`rounded-[var(--radius)] px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m.value
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="h-4 w-4 rounded accent-[var(--primary)]"
          />
          Учитывать регистр
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="h-4 w-4 rounded accent-[var(--primary)]"
          />
          Убирать пробелы по краям
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={ignoreEmpty}
            onChange={(e) => setIgnoreEmpty(e.target.checked)}
            className="h-4 w-4 rounded accent-[var(--primary)]"
          />
          Игнорировать пустые строки
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
          Введите строки (каждая с новой строки)
        </label>
        <textarea
          id={inputId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Банан\nЯблоко\nАпельсин\nВишня"}
          rows={8}
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--foreground)]">Результат</span>
          <button
            type="button"
            onClick={copyResult}
            disabled={!output.trim()}
            className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-40"
          >
            {copied ? "Скопировано ✓" : "Копировать"}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={8}
          placeholder="Результат появится здесь..."
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>
    </div>
  );
}

SortLinesRu.displayName = "SortLinesRu";

"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { CopyButton } from "@/components/generators/CopyButton";

type SortMode = "az" | "za" | "shortest" | "longest" | "random";

const SORT_BUTTONS: { id: SortMode; label: string }[] = [
  { id: "az", label: "A → Z" },
  { id: "za", label: "Z → A" },
  { id: "shortest", label: "Shortest first" },
  { id: "longest", label: "Longest first" },
  { id: "random", label: "Random shuffle" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function SortLines() {
  const inputId = React.useId();
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [activeMode, setActiveMode] = React.useState<SortMode | null>(null);
  const [caseSensitive, setCaseSensitive] = React.useState(false);
  const [trimLines, setTrimLines] = React.useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = React.useState(false);

  const prepareLines = React.useCallback(() => {
    let lines = input.split("\n");
    if (trimLines) lines = lines.map((l) => l.trim());
    if (ignoreEmpty) lines = lines.filter((l) => l.trim() !== "");
    return lines;
  }, [input, trimLines, ignoreEmpty]);

  const compare = React.useCallback(
    (a: string, b: string) =>
      caseSensitive
        ? a.localeCompare(b, "en")
        : a.localeCompare(b, "en", { sensitivity: "base" }),
    [caseSensitive],
  );

  const handleSort = (mode: SortMode) => {
    const lines = prepareLines();
    let sorted: string[];

    switch (mode) {
      case "az":
        sorted = [...lines].sort((a, b) => compare(a, b));
        break;
      case "za":
        sorted = [...lines].sort((a, b) => compare(b, a));
        break;
      case "shortest":
        sorted = [...lines].sort((a, b) => a.length - b.length);
        break;
      case "longest":
        sorted = [...lines].sort((a, b) => b.length - a.length);
        break;
      case "random":
        sorted = shuffleArray(lines);
        break;
      default:
        sorted = lines;
    }

    setOutput(sorted.join("\n"));
    setActiveMode(mode);
  };

  React.useEffect(() => {
    if (activeMode) handleSort(activeMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseSensitive, trimLines, ignoreEmpty]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Input text (one item per line)
        </label>
        <textarea
          id={inputId}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput("");
            setActiveMode(null);
          }}
          placeholder={"banana\napple\norange\ngrape\nkiwi"}
          rows={7}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <Checkbox
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
          label="Case-sensitive"
          description="Treat 'Apple' and 'apple' differently"
        />
        <Checkbox
          checked={trimLines}
          onChange={(e) => setTrimLines(e.target.checked)}
          label="Trim whitespace"
          description="Remove leading/trailing spaces from each line"
        />
        <Checkbox
          checked={ignoreEmpty}
          onChange={(e) => setIgnoreEmpty(e.target.checked)}
          label="Ignore empty lines"
          description="Exclude blank lines from sorting"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {SORT_BUTTONS.map((btn) => (
          <Button
            key={btn.id}
            type="button"
            variant={activeMode === btn.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => handleSort(btn.id)}
            disabled={!input}
          >
            {btn.label}
          </Button>
        ))}
        {(input || output) && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setInput("");
              setOutput("");
              setActiveMode(null);
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {output && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">Result</span>
            <CopyButton text={output} size="sm" variant="secondary" />
          </div>
          <pre className="whitespace-pre-wrap text-sm text-[var(--foreground)] leading-relaxed break-words font-sans">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

SortLines.displayName = "SortLines";

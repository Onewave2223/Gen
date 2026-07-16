"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { CopyButton } from "@/components/generators/CopyButton";

export function RemoveDuplicateLines() {
  const inputId = React.useId();
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState<string | null>(null);
  const [originalCount, setOriginalCount] = React.useState<number | null>(null);
  const [uniqueCount, setUniqueCount] = React.useState<number | null>(null);
  const [caseSensitive, setCaseSensitive] = React.useState(true);
  const [removeEmpty, setRemoveEmpty] = React.useState(false);
  const [trimLines, setTrimLines] = React.useState(false);

  const handleProcess = () => {
    let lines = input.split("\n");
    const original = lines.length;

    if (trimLines) lines = lines.map((l) => l.trim());
    if (removeEmpty) {
      lines = lines.filter((l) => l.trim() !== "");
    }

    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    setOutput(result.join("\n"));
    setOriginalCount(original);
    setUniqueCount(result.length);
  };

  const removedCount =
    originalCount !== null && uniqueCount !== null ? originalCount - uniqueCount : null;

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
            setOutput(null);
            setOriginalCount(null);
            setUniqueCount(null);
          }}
          placeholder={"apple\nbanana\napple\norange\nbanana"}
          rows={7}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Checkbox
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
          label="Case-sensitive comparison"
          description="Treat 'Apple' and 'apple' as different values"
        />
        <Checkbox
          checked={trimLines}
          onChange={(e) => setTrimLines(e.target.checked)}
          label="Trim whitespace"
          description="Remove leading/trailing spaces from each line before comparing"
        />
        <Checkbox
          checked={removeEmpty}
          onChange={(e) => setRemoveEmpty(e.target.checked)}
          label="Remove empty lines"
          description="Delete blank lines from the result"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleProcess} disabled={!input}>
          Remove Duplicates
        </Button>
        {output !== null && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setInput("");
              setOutput(null);
              setOriginalCount(null);
              setUniqueCount(null);
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {output !== null && removedCount !== null && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              {originalCount} original → {uniqueCount} unique ({removedCount} duplicate
              {removedCount !== 1 ? "s" : ""} removed)
            </span>
            <CopyButton text={output} size="sm" variant="secondary" />
          </div>
          <pre className="whitespace-pre-wrap text-sm text-[var(--foreground)] leading-relaxed break-words font-sans">
            {output || "(empty)"}
          </pre>
        </div>
      )}
    </div>
  );
}

RemoveDuplicateLines.displayName = "RemoveDuplicateLines";

"use client";

import * as React from "react";

export function RemoveDuplicatesRu() {
  const inputId = React.useId();
  const [text, setText] = React.useState("");
  const [caseSensitive, setCaseSensitive] = React.useState(true);
  const [removeEmpty, setRemoveEmpty] = React.useState(false);
  const [trimLines, setTrimLines] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const { output, originalCount, uniqueCount } = React.useMemo(() => {
    let lines = text.split("\n");
    const original = lines.length;

    if (trimLines) lines = lines.map((l) => l.trim());
    if (removeEmpty) lines = lines.filter((l) => l.trim() !== "");

    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    return { output: result.join("\n"), originalCount: original, uniqueCount: result.length };
  }, [text, caseSensitive, removeEmpty, trimLines]);

  const removedCount = originalCount - uniqueCount;

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
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
          Исходный текст (каждая строка — отдельный вариант)
        </label>
        <textarea
          id={inputId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Строка один\nСтрока два\nСтрока один\nСтрока три"}
          rows={8}
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
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
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="h-4 w-4 rounded accent-[var(--primary)]"
          />
          Удалить пустые строки
        </label>
      </div>

      {text && (
        <p className="text-sm text-[var(--muted)]">
          {originalCount} исходных → {uniqueCount} уникальных (удалено:{" "}
          <span className="font-semibold text-[var(--foreground)]">{removedCount}</span>)
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--foreground)]">Результат</span>
          <button
            type="button"
            onClick={copyResult}
            disabled={!output}
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

RemoveDuplicatesRu.displayName = "RemoveDuplicatesRu";

"use client";

import * as React from "react";

type CaseMode = "upper" | "lower" | "title" | "sentence" | "alternating";

const MODES: { value: CaseMode; label: string }[] = [
  { value: "upper", label: "ВЕРХНИЙ" },
  { value: "lower", label: "нижний" },
  { value: "title", label: "Каждое Слово" },
  { value: "sentence", label: "Предложение" },
  { value: "alternating", label: "чЕРЕДОВАНИЕ" },
];

function convertCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(/\S+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^|[.!?]\s+)([а-яa-z])/giu, (_, sep, ch) => sep + ch.toUpperCase());
    case "alternating":
      return text
        .split("")
        .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
        .join("");
  }
}

export function CaseConverterRu() {
  const textareaId = React.useId();
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<CaseMode>("upper");
  const [copied, setCopied] = React.useState(false);

  const output = convertCase(text, mode);

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
            onClick={() => setMode(m.value)}
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor={textareaId} className="text-sm font-medium text-[var(--foreground)]">
          Исходный текст
        </label>
        <textarea
          id={textareaId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите или вставьте текст здесь..."
          rows={6}
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--foreground)]">Результат</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyResult}
              disabled={!output}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-40"
            >
              {copied ? "Скопировано ✓" : "Копировать"}
            </button>
            <button
              type="button"
              onClick={() => setText("")}
              disabled={!text}
              className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-40"
            >
              Очистить
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={output}
          rows={6}
          placeholder="Результат появится здесь..."
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>
    </div>
  );
}

CaseConverterRu.displayName = "CaseConverterRu";

"use client";

import * as React from "react";

interface DecisionMakerProps {
  labels: {
    placeholder: string;
    add: string;
    decide: string;
    again: string;
    exclude: string;
    result: string;
    history: string;
    enterOptions: string;
    needMore: string;
  };
}

export function DecisionMaker({ labels }: DecisionMakerProps) {
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
  const [result, setResult] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<string[]>([]);
  const [animating, setAnimating] = React.useState(false);

  function addOption() {
    const trimmed = input.trim();
    if (!trimmed || options.includes(trimmed)) return;
    setOptions((prev) => [...prev, trimmed]);
    setInput("");
  }

  function removeOption(opt: string) {
    setOptions((prev) => prev.filter((o) => o !== opt));
    if (result === opt) setResult(null);
  }

  function decide() {
    if (options.length < 2) return;
    setAnimating(true);
    setTimeout(() => {
      const pick = options[Math.floor(Math.random() * options.length)];
      setResult(pick);
      setHistory((h) => [pick, ...h].slice(0, 10));
      setAnimating(false);
    }, 600);
  }

  function excludeAndRepick() {
    if (!result) return;
    const remaining = options.filter((o) => o !== result);
    if (remaining.length < 1) return;
    const pick = remaining[Math.floor(Math.random() * remaining.length)];
    setResult(pick);
    setHistory((h) => [pick, ...h].slice(0, 10));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addOption()}
          placeholder={labels.placeholder}
          className="flex-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <button
          onClick={addOption}
          disabled={!input.trim()}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-40"
        >
          {labels.add}
        </button>
      </div>

      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <span
              key={opt}
              className={[
                "flex items-center gap-2 rounded-full border px-3 py-1 text-sm",
                result === opt ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]",
              ].join(" ")}
            >
              {opt}
              <button
                onClick={() => removeOption(opt)}
                className="ml-1 text-xs opacity-60 hover:opacity-100"
                aria-label={`Remove ${opt}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {options.length > 0 && options.length < 2 && (
        <p className="text-sm text-[var(--muted)]">{labels.needMore}</p>
      )}

      {result && (
        <div className={[
          "rounded-[var(--radius)] border-2 border-[var(--primary)] p-5 transition-all",
          animating ? "opacity-0 scale-95" : "opacity-100 scale-100",
        ].join(" ")}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">{labels.result}</p>
          <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{result}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={decide}
          disabled={options.length < 2 || animating}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-40"
        >
          {result ? labels.again : labels.decide}
        </button>
        {result && options.length > 2 && (
          <button
            onClick={excludeAndRepick}
            className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            {labels.exclude}
          </button>
        )}
      </div>

      {history.length > 1 && (
        <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">{labels.history}</p>
          <ul className="flex flex-col gap-1">
            {history.slice(1).map((h, i) => (
              <li key={i} className="text-sm text-[var(--muted)]">{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

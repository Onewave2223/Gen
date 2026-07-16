"use client";

import * as React from "react";
import { analyzeText } from "@/lib/instrumenty/word-counter";

export function WordCounter() {
  const textareaId = React.useId();
  const [text, setText] = React.useState("");

  const stats = React.useMemo(() => analyzeText(text), [text]);

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Letters", value: stats.letters },
    { label: "Digits", value: stats.digits },
    { label: "Spaces", value: stats.spaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
    { label: "Reading time", value: `~${stats.readingTimeMinutes} min` },
    { label: "Speaking time", value: `~${stats.speakingTimeMinutes} min` },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Your text
        </label>
        <textarea
          id={textareaId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          rows={8}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-y"
        />
        <p className="text-xs text-[var(--muted)]">
          Counts update in real time. Your text stays in your browser.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-0.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3"
          >
            <dt className="text-xs text-[var(--muted)]">{item.label}</dt>
            <dd className="text-xl font-bold text-[var(--foreground)]">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

WordCounter.displayName = "WordCounter";

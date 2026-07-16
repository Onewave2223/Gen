"use client";

import * as React from "react";
import { analyzeText } from "@/lib/instrumenty/word-counter";

export function WordCounter() {
  const textareaId = React.useId();
  const [text, setText] = React.useState("");

  const stats = React.useMemo(() => analyzeText(text), [text]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Ваш текст
        </label>
        <textarea
          id={textareaId}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Начните печатать или вставьте текст..."
          rows={10}
          className="w-full resize-y rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Символы" value={stats.characters} />
        <StatCard label="Без пробелов" value={stats.charactersNoSpaces} />
        <StatCard label="Слова" value={stats.words} />
        <StatCard label="Буквы" value={stats.letters} />
        <StatCard label="Цифры" value={stats.digits} />
        <StatCard label="Пробелы" value={stats.spaces} />
        <StatCard label="Предложения" value={stats.sentences} />
        <StatCard label="Абзацы" value={stats.paragraphs} />
        <StatCard label="Строки" value={stats.lines} />
        <StatCard label="Время чтения" value={`${stats.readingTimeMinutes} мин`} />
        <StatCard label="Время озвучивания" value={`${stats.speakingTimeMinutes} мин`} />
      </dl>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3">
      <dt className="text-xs font-medium text-[var(--muted)]">{label}</dt>
      <dd className="text-xl font-bold text-[var(--foreground)]">{value}</dd>
    </div>
  );
}

WordCounter.displayName = "WordCounter";

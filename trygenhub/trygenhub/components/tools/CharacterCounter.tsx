"use client";

import * as React from "react";

function countChars(text: string) {
  const total = text.length;
  const noSpaces = text.replace(/\s/g, "").length;
  const letters = (text.match(/[a-zA-Z]/g) ?? []).length;
  const digits = (text.match(/[0-9]/g) ?? []).length;
  const spaces = (text.match(/[ \t]/g) ?? []).length;
  const lines = text === "" ? 0 : text.split("\n").length;
  return { total, noSpaces, letters, digits, spaces, lines };
}

export function CharacterCounter() {
  const textareaId = React.useId();
  const [text, setText] = React.useState("");

  const stats = countChars(text);

  const items = [
    { label: "Characters", value: stats.total },
    { label: "Characters (no spaces)", value: stats.noSpaces },
    { label: "Letters", value: stats.letters },
    { label: "Digits", value: stats.digits },
    { label: "Spaces", value: stats.spaces },
    { label: "Lines", value: stats.lines },
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
          placeholder="Type or paste your text here to count characters…"
          rows={7}
          className="flex w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] resize-y"
        />
        <p className="text-xs text-[var(--muted)]">
          Updates in real time. Your text stays in your browser.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
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

CharacterCounter.displayName = "CharacterCounter";

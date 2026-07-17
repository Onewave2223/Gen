"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function UuidGeneratorRu() {
  const countId = React.useId();
  const [count, setCount] = React.useState(1);
  const [uuids, setUuids] = React.useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);

  const generate = () => {
    setUuids(Array.from({ length: count }, () => generateUuid()));
  };

  const copyOne = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  };

  const copyAll = async () => {
    if (uuids.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
          Количество UUID (1–20)
        </label>
        <input
          id={countId}
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
          className="w-32 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={generate}>Сгенерировать</Button>
        {uuids.length > 0 && (
          <Button variant="secondary" onClick={copyAll}>
            {copiedAll ? "Скопировано ✓" : "Копировать все"}
          </Button>
        )}
      </div>

      {uuids.length > 0 && (
        <ul className="flex flex-col gap-2">
          {uuids.map((uuid, i) => (
            <li
              key={`${uuid}-${i}`}
              className="flex items-center justify-between gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            >
              <span className="font-mono text-sm text-[var(--foreground)] break-all">{uuid}</span>
              <button
                type="button"
                onClick={() => copyOne(uuid, i)}
                className="shrink-0 rounded-[var(--radius)] border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {copiedIndex === i ? "✓" : "Копировать"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

UuidGeneratorRu.displayName = "UuidGeneratorRu";

"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CopyButton } from "@/components/generators/CopyButton";

const COUNT_OPTIONS = [1,2,3,4,5,10,20,50].map((n) => ({
  value: String(n),
  label: String(n),
}));

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function UuidGenerator() {
  const countId = React.useId();
  const [count, setCount] = React.useState("1");
  const [uuids, setUuids] = React.useState<string[]>([]);

  const handleGenerate = () => {
    const n = parseInt(count, 10);
    setUuids(Array.from({ length: n }, () => generateUUID()));
  };

  const allText = uuids.join("\n");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={countId} className="text-sm font-medium text-[var(--foreground)]">
          Number of UUIDs
        </label>
        <Select
          id={countId}
          options={COUNT_OPTIONS}
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="max-w-[160px]"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleGenerate}>
          Generate
        </Button>
        {uuids.length > 0 && (
          <Button type="button" variant="secondary" onClick={() => setUuids([])}>
            Clear
          </Button>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              {uuids.length} UUID{uuids.length !== 1 ? "s" : ""}
            </span>
            <CopyButton text={allText} size="sm" variant="secondary" />
          </div>
          <ul className="flex flex-col gap-1.5">
            {uuids.map((uuid, i) => (
              <li
                key={i}
                className="font-mono text-sm text-[var(--foreground)] break-all"
              >
                {uuid}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

UuidGenerator.displayName = "UuidGenerator";

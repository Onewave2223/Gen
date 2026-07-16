"use client";

import * as React from "react";

interface DailyIdeaProps {
  ideas: string[];
  labels: { todayIdea: string; randomIdea: string; getAnother: string; refreshed: string };
}

function getDayIndex(ideas: string[]): number {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dayOfYear % ideas.length;
}

export function DailyIdea({ ideas, labels }: DailyIdeaProps) {
  const dailyIdea = ideas[getDayIndex(ideas)];
  const [randomIdea, setRandomIdea] = React.useState<string | null>(null);

  function getAnother() {
    const idx = Math.floor(Math.random() * ideas.length);
    setRandomIdea(ideas[idx]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[var(--radius)] border-2 border-[var(--primary)] bg-[var(--surface)] p-6">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">{labels.todayIdea}</p>
        <p className="text-xl font-bold text-[var(--foreground)]">{dailyIdea}</p>
      </div>

      {randomIdea && (
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-5">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">{labels.randomIdea}</p>
          <p className="text-lg font-semibold text-[var(--foreground)]">{randomIdea}</p>
        </div>
      )}

      <button
        onClick={getAnother}
        className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
      >
        {labels.getAnother}
      </button>
    </div>
  );
}

"use client";

import * as React from "react";

interface WouldYouRatherProps {
  questions: string[][];
  labels: {
    optionA: string;
    optionB: string;
    next: string;
    share: string;
    copied: string;
    copyLink: string;
    question: string;
  };
}

export function WouldYouRather({ questions, labels }: WouldYouRatherProps) {
  const [index, setIndex] = React.useState<number | null>(null);
  const [chosen, setChosen] = React.useState<0 | 1 | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setIndex(Math.floor(Math.random() * questions.length));
  }, [questions.length]);

  const current = index !== null ? questions[index] : null;

  function next() {
    let next = Math.floor(Math.random() * questions.length);
    if (next === index) next = (next + 1) % questions.length;
    setIndex(next);
    setChosen(null);
  }

  function choose(choice: 0 | 1) {
    setChosen(choice);
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ url, title: document.title });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (!current) return null;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {labels.question}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {current.map((option, i) => (
          <button
            key={i}
            onClick={() => choose(i as 0 | 1)}
            className={[
              "flex min-h-[120px] flex-col items-center justify-center rounded-[var(--radius)] border-2 p-6 text-center text-base font-medium transition-all",
              chosen === i
                ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                : chosen !== null
                ? "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] opacity-60"
                : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]",
            ].join(" ")}
          >
            <span className="mb-2 text-2xl font-bold text-[var(--primary)]">{i === 0 ? "A" : "B"}</span>
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={next}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
        >
          {labels.next}
        </button>
        <button
          onClick={share}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
        >
          {copied ? labels.copied : labels.share}
        </button>
      </div>
    </div>
  );
}

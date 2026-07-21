"use client";

import * as React from "react";

interface MovieNightPickerProps {
  genres: string[];
  eras: string[];
  moods: { key: string; label: string; genres: string[] }[];
  audiences: { key: string; label: string }[];
  labels: { pick: string; pickAnother: string; genre: string; era: string; mood: string; audience: string; result: string };
}

export function MovieNightPicker({ genres, eras, moods, audiences, labels }: MovieNightPickerProps) {
  const [mood, setMood] = React.useState(moods[0].key);
  const [audience, setAudience] = React.useState(audiences[0].key);
  const [result, setResult] = React.useState<string | null>(null);

  function pick() {
    const selectedMood = moods.find((m) => m.key === mood);
    const availableGenres = selectedMood ? selectedMood.genres : genres;
    const genre = availableGenres[Math.floor(Math.random() * availableGenres.length)];
    const era = eras[Math.floor(Math.random() * eras.length)];
    const aud = audiences.find((a) => a.key === audience);
    setResult(`${genre} · ${era}${aud ? " · " + aud.label : ""}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[var(--foreground)]">{labels.mood}</label>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                mood === m.key
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
              ].join(" ")}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[var(--foreground)]">{labels.audience}</label>
        <div className="flex flex-wrap gap-2">
          {audiences.map((a) => (
            <button
              key={a.key}
              onClick={() => setAudience(a.key)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                audience === a.key
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
              ].join(" ")}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="rounded-[var(--radius)] border-2 border-[var(--primary)] bg-[var(--surface)] p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">{labels.result}</p>
          <p className="mt-2 text-xl font-bold text-[var(--foreground)]">{result}</p>
        </div>
      )}

      <button
        onClick={pick}
        className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
      >
        {result ? labels.pickAnother : labels.pick}
      </button>
    </div>
  );
}

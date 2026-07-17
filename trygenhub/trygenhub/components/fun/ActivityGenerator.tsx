"use client";

import * as React from "react";

interface ActivityEntry {
  activity: string;
  who: string[];
  where: string[];
  budget: string[];
}

interface ActivityGeneratorProps {
  activities: ActivityEntry[];
  whoOptions: { key: string; label: string }[];
  whereOptions: { key: string; label: string }[];
  budgetOptions: { key: string; label: string }[];
  labels: { generate: string; generateAnother: string; result: string; noMatch: string; who: string; where: string; budget: string };
}

export function ActivityGenerator({ activities, whoOptions, whereOptions, budgetOptions, labels }: ActivityGeneratorProps) {
  const [who, setWho] = React.useState(whoOptions[0].key);
  const [where, setWhere] = React.useState(whereOptions[0].key);
  const [budget, setBudget] = React.useState(budgetOptions[0].key);
  const [result, setResult] = React.useState<string | null>(null);
  const [noMatch, setNoMatch] = React.useState(false);

  function generate() {
    const filtered = activities.filter(
      (a) =>
        (a.who.includes(who) || a.who.includes("any")) &&
        (a.where.includes(where) || a.where.includes("anywhere")) &&
        (a.budget.includes(budget) || a.budget.includes("any"))
    );
    if (filtered.length === 0) {
      setNoMatch(true);
      setResult(null);
    } else {
      setNoMatch(false);
      const pick = filtered[Math.floor(Math.random() * filtered.length)];
      setResult(pick.activity);
    }
  }

  const FilterGroup = ({ label, options, value, onChange }: { label: string; options: { key: string; label: string }[]; value: string; onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[var(--foreground)]">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.key}
            onClick={() => { onChange(o.key); setResult(null); setNoMatch(false); }}
            className={[
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              value === o.key
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
            ].join(" ")}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <FilterGroup label={labels.who} options={whoOptions} value={who} onChange={setWho} />
      <FilterGroup label={labels.where} options={whereOptions} value={where} onChange={setWhere} />
      <FilterGroup label={labels.budget} options={budgetOptions} value={budget} onChange={setBudget} />

      {result && (
        <div className="rounded-[var(--radius)] border-2 border-[var(--primary)] bg-[var(--surface)] p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">{labels.result}</p>
          <p className="mt-2 text-xl font-bold text-[var(--foreground)]">{result}</p>
        </div>
      )}

      {noMatch && (
        <p className="text-sm text-[var(--muted)]">{labels.noMatch}</p>
      )}

      <button
        onClick={generate}
        className="inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
      >
        {result ? labels.generateAnother : labels.generate}
      </button>
    </div>
  );
}

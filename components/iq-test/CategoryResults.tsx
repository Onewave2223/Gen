"use client";

import type { CategoryScore, Locale } from "@/lib/iq-test/types";
import { CATEGORY_LABELS, getDictionary } from "@/lib/iq-test/i18n";

interface Props {
  scores: CategoryScore[];
  strongestCategory: CategoryScore | null;
  weakestCategory: CategoryScore | null;
  locale: Locale;
}

export function CategoryResults({ scores, strongestCategory, weakestCategory, locale }: Props) {
  const dict = getDictionary(locale);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-base font-semibold text-[var(--foreground)]">
        {dict.categoryBreakdownTitle}
      </h3>

      <div className="flex flex-col gap-3">
        {scores.map((cat) => {
          const isStrongest = strongestCategory?.category === cat.category;
          const isWeakest = weakestCategory?.category === cat.category && !isStrongest;
          const label = CATEGORY_LABELS[cat.category][locale];
          return (
            <div key={cat.category} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]">
                  {label}
                  {isStrongest && (
                    <span className="rounded-full bg-[var(--success)] px-2 py-0.5 text-xs text-white">
                      {dict.strongestBadge}
                    </span>
                  )}
                  {isWeakest && (
                    <span className="rounded-full bg-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
                      {dict.focusAreaBadge}
                    </span>
                  )}
                </span>
                <span className="text-sm tabular-nums text-[var(--muted)]">
                  {cat.correct}/{cat.total} ({Math.round(cat.percentage)}%)
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={cat.correct}
                aria-valuemin={0}
                aria-valuemax={cat.total}
                aria-label={`${label}: ${cat.correct} / ${cat.total}`}
                className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--border)]"
              >
                <div
                  className={[
                    "h-full rounded-full transition-all duration-700",
                    cat.percentage >= 80
                      ? "bg-[var(--success)]"
                      : cat.percentage >= 50
                      ? "bg-[var(--primary)]"
                      : "bg-[var(--muted)]",
                  ].join(" ")}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {(strongestCategory || weakestCategory) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {strongestCategory && (
            <div className="rounded-[var(--radius)] border border-[var(--success)]/30 bg-[var(--success)]/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--success)]">
                {dict.strongestAreaTitle}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                {CATEGORY_LABELS[strongestCategory.category][locale]}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {strongestCategory.correct}/{strongestCategory.total} ({Math.round(strongestCategory.percentage)}%)
              </p>
            </div>
          )}
          {weakestCategory && (
            <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                {dict.focusAreaTitle}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                {CATEGORY_LABELS[weakestCategory.category][locale]}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {weakestCategory.correct}/{weakestCategory.total} ({Math.round(weakestCategory.percentage)}%)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

CategoryResults.displayName = "CategoryResults";

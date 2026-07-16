interface Props {
  current: number; // 1-based
  total: number;
  questionOfLabel: string;
}

export function ProgressBar({ current, total, questionOfLabel }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`${questionOfLabel} ${current} / ${total}`}
      className="flex flex-col gap-1"
    >
      <div className="flex justify-between text-xs text-[var(--muted)]">
        <span>{questionOfLabel} {current} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="motion-progress-fill h-full w-full rounded-full bg-[var(--primary)]"
          style={{ transform: `scaleX(${pct / 100})` }}
        />
      </div>
    </div>
  );
}

ProgressBar.displayName = "ProgressBar";

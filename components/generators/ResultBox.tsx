import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ResultBoxProps {
  children: ReactNode;
  label?: string;
  empty?: boolean;
  emptyMessage?: string;
  actions?: ReactNode;
  className?: string;
}

export function ResultBox({
  children,
  label,
  empty = false,
  emptyMessage = "Your result will appear here.",
  actions,
  className,
}: ResultBoxProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4",
        className,
      )}
    >
      {(label || actions) && (
        <div className="flex items-center justify-between gap-3">
          {label && (
            <span className="text-sm font-medium text-[var(--muted)]">
              {label}
            </span>
          )}
          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>
      )}

      <div className="min-h-[2.5rem] break-words text-base text-[var(--foreground)]">
        {empty ? (
          <span className="text-[var(--muted)]">{emptyMessage}</span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

ResultBox.displayName = "ResultBox";

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={cn(
          "flex h-10 w-full rounded-[var(--radius)] border bg-[var(--background)] px-3 text-sm text-[var(--foreground)]",
          "placeholder:text-[var(--muted)]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-[var(--danger)] focus-visible:ring-[var(--danger)]"
            : "border-[var(--border)] focus-visible:ring-[var(--primary)]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

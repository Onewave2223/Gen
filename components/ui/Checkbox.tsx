"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, label, description, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-3",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-describedby={descriptionId}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 rounded-[calc(var(--radius)/2)] border border-[var(--border)] bg-[var(--background)] accent-[var(--primary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
            "disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {(label || description) && (
          <span className="flex flex-col gap-0.5">
            {label && (
              <span className="text-sm font-medium text-[var(--foreground)]">
                {label}
              </span>
            )}
            {description && (
              <span
                id={descriptionId}
                className="text-sm text-[var(--muted)]"
              >
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

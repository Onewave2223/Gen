import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]",
  primary: "bg-[var(--primary)] text-[var(--primary-foreground)]",
  accent: "bg-[var(--accent-2)] text-[var(--primary-foreground)]",
  success: "bg-[var(--success-soft)] text-[var(--success)]",
  warning: "bg-[var(--warning-soft)] text-[var(--warning)]",
  danger: "bg-[var(--danger-soft)] text-[var(--danger)]",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

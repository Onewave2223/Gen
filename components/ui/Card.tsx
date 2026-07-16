import * as React from "react";
import { cn } from "@/lib/utils";

export type CardPadding = "sm" | "md" | "lg" | "none";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  /** Adds a hover lift + border highlight — use for clickable/linked cards. */
  interactive?: boolean;
  /** Slightly stronger shadow + elevated surface color, for cards that sit on a tinted section background. */
  elevated?: boolean;
}

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, padding = "md", interactive = false, elevated = false, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius)] border border-[var(--border)]",
          elevated
            ? "bg-[var(--surface-elevated)] shadow-[var(--shadow-lg)]"
            : "bg-[var(--surface)] shadow-[var(--shadow)]",
          paddingStyles[padding],
          interactive &&
            "transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[var(--shadow-glow)]",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

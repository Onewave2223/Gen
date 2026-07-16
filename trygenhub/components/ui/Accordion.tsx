"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: readonly AccordionItemData[];
  className?: string;
  /** If set, only one item can be open at a time. Defaults to true. */
  singleOpen?: boolean;
  /** ids of items open by default */
  defaultOpenIds?: readonly string[];
}

/**
 * Accessible accordion built on native disclosure semantics (button +
 * aria-expanded/aria-controls) with a CSS grid-row height animation.
 * No animation library required — matches the site's existing
 * transform/opacity-based motion conventions (see globals.css).
 */
export function Accordion({
  items,
  className,
  singleOpen = true,
  defaultOpenIds = [],
}: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<Set<string>>(
    () => new Set(defaultOpenIds),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(singleOpen ? [] : prev);
      if (prev.has(id)) {
        if (singleOpen) return new Set();
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-trigger-${item.id}`;

        return (
          <div
            key={item.id}
            className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200"
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 rounded-[var(--radius)] px-4 py-4 text-left text-sm font-medium text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <span>{item.question}</span>
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "shrink-0 text-[var(--muted)] transition-transform duration-200 ease-[var(--ease-standard)]",
                    isOpen && "rotate-180 text-[var(--primary)]",
                  )}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-standard)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm text-[var(--muted)]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Accordion.displayName = "Accordion";

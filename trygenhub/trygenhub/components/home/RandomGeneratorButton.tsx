"use client";

import { useRouter } from "next/navigation";
import { pickRandomHref } from "@/components/engagement/QuickActions";
import { catalog, catalogRu } from "@/lib/engagement/catalog";
import { cn } from "@/lib/utils";

type Locale = "en" | "ru";

const DEFAULT_LABEL: Record<Locale, string> = {
  en: "🎲 Try a random generator",
  ru: "🎲 Попробовать случайный инструмент",
};

export interface RandomGeneratorButtonProps {
  className?: string;
  label?: string;
  locale?: Locale;
}

export function RandomGeneratorButton({
  className,
  label,
  locale = "en",
}: RandomGeneratorButtonProps) {
  const router = useRouter();
  const items = locale === "ru" ? catalogRu : catalog;
  const resolvedLabel = label ?? DEFAULT_LABEL[locale];

  return (
    <button
      type="button"
      onClick={() => router.push(pickRandomHref(items))}
      className={cn(
        "motion-press inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-5 text-sm font-medium text-[var(--foreground)] shadow-[var(--shadow)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        className,
      )}
    >
      {resolvedLabel}
    </button>
  );
}

RandomGeneratorButton.displayName = "RandomGeneratorButton";

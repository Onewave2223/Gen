import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export interface FeaturedExperienceItem {
  id: string;
  href: string;
  name: string;
  description: string;
  emoji: string;
}

export interface FeaturedExperiencesProps {
  eyebrow: string;
  title: string;
  items: readonly FeaturedExperienceItem[];
}

export function FeaturedExperiences({ eyebrow, title, items }: FeaturedExperiencesProps) {
  return (
    <section className="mystic-scope mystic-bg border-y border-[var(--border)] py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-1.5 text-center">
          <span className="text-sm font-medium text-[var(--primary)]">{eyebrow}</span>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item, index) => (
            <ScrollReveal key={item.id} index={index}>
              <Link
                href={item.href}
                className="mystic-glow group relative flex h-full flex-col items-center gap-2.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 text-center shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <span
                  aria-hidden="true"
                  className="mystic-pulse flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-soft)] text-2xl"
                >
                  {item.emoji}
                </span>
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {item.name}
                </span>
                <span className="text-xs leading-relaxed text-[var(--muted)]">
                  {item.description}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

FeaturedExperiences.displayName = "FeaturedExperiences";

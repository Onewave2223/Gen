import { getFeaturedGenerators } from "@/data/generators";
import { GeneratorCard } from "@/components/generators/GeneratorCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function PopularGenerators() {
  const featuredGenerators = getFeaturedGenerators();

  return (
    <section id="popular" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-sm font-medium text-[var(--primary)]">
          Popular tools
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Start with our most popular generators
        </h2>
        <p className="mx-auto max-w-xl text-base text-[var(--muted)]">
          Quick access to useful tools for random choices, secure passwords,
          names, and more.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredGenerators.map((generator, index) =>
          generator.status === "available" ? (
            <ScrollReveal key={generator.id} index={index}>
              <GeneratorCard
                title={generator.name}
                description={generator.shortDescription}
                href={generator.href}
                badge={generator.badge}
              />
            </ScrollReveal>
          ) : (
            <ScrollReveal
              key={generator.id}
              index={index}
              aria-disabled="true"
              className="relative flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 opacity-70 shadow-[var(--shadow-sm)]"
            >
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 rounded-full bg-[var(--muted)] px-2 py-0.5 text-xs font-medium text-[var(--background)]"
              >
                Coming soon
              </span>
              <span className="flex flex-col gap-1 pr-20">
                <span className="text-base font-semibold text-[var(--foreground)]">
                  {generator.name}
                </span>
                <span className="break-words text-sm text-[var(--muted)]">
                  {generator.shortDescription}
                </span>
              </span>
            </ScrollReveal>
          ),
        )}
      </div>
    </section>
  );
}

PopularGenerators.displayName = "PopularGenerators";

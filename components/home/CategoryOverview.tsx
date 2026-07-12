import Link from "next/link";
import { generatorCategories, generators } from "@/data/generators";

export function CategoryOverview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-sm font-medium text-[var(--primary)]">
          Browse by category
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Tools for every kind of task
        </h2>
        <p className="mx-auto max-w-xl text-base text-[var(--muted)]">
          From quick random picks to secure passwords and name ideas, find
          the right category for what you need.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {generatorCategories.map((category) => {
          const toolCount = generators.filter(
            (generator) => generator.category === category.id,
          ).length;
          const toolCountLabel = `${toolCount} ${toolCount === 1 ? "tool" : "tools"}`;

          return (
            <Link
              key={category.id}
              href="/#generators"
              className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <span className="text-base font-semibold text-[var(--foreground)]">
                {category.name}
              </span>
              <span className="text-sm text-[var(--muted)]">
                {category.description}
              </span>
              <span className="mt-2 text-xs font-medium text-[var(--primary)]">
                {toolCountLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

CategoryOverview.displayName = "CategoryOverview";

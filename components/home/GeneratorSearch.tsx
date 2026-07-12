"use client";

import * as React from "react";
import {
  generatorCategories,
  searchGenerators,
  type GeneratorCategory,
} from "@/data/generators";
import { GeneratorCard } from "@/components/generators/GeneratorCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type CategoryFilter = "all" | GeneratorCategory;

export function GeneratorSearch() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<CategoryFilter>("all");

  const results = searchGenerators(query).filter(
    (generator) => category === "all" || generator.category === category,
  );

  const hasResults = results.length > 0;
  const resultsLabel = `${results.length} ${results.length === 1 ? "tool" : "tools"}`;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <section id="generators" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Find the right generator
        </h2>
        <p className="text-base text-[var(--muted)]">
          Search or browse our collection of free online tools.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <Input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search generators..."
          aria-label="Search generators"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          aria-pressed={category === "all"}
          className={`inline-flex h-9 items-center justify-center rounded-[var(--radius)] px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
            category === "all"
              ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
              : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          All
        </button>
        {generatorCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            aria-pressed={category === cat.id}
            className={`inline-flex h-9 items-center justify-center rounded-[var(--radius)] px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
              category === cat.id
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        {resultsLabel}
      </p>

      {hasResults ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((generator) =>
            generator.status === "available" ? (
              <GeneratorCard
                key={generator.id}
                title={generator.name}
                description={generator.shortDescription}
                href={generator.href}
                badge={generator.badge}
              />
            ) : (
              <div
                key={generator.id}
                aria-disabled="true"
                className="relative flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 opacity-70 shadow-[var(--shadow)]"
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
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            No generators found
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Try a different search term or category.
          </p>
          <Button variant="secondary" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}

GeneratorSearch.displayName = "GeneratorSearch";

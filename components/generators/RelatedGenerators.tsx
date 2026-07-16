import Link from "next/link";
import { getRelatedGenerators } from "@/data/generators";

export interface RelatedGeneratorsProps {
  currentId: string;
  limit?: number;
}

export function RelatedGenerators({
  currentId,
  limit = 4,
}: RelatedGeneratorsProps) {
  const related = getRelatedGenerators(currentId, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-generators-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="related-generators-heading"
        className="text-xl font-semibold text-[var(--foreground)]"
      >
        You may also like
      </h2>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {related.map((generator) => (
          <li key={generator.id}>
            <Link
              href={generator.href}
              className="group flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <span className="text-sm font-medium text-[var(--foreground)]">
                {generator.name}
              </span>
              <span className="text-sm text-[var(--muted)]">
                {generator.shortDescription}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

RelatedGenerators.displayName = "RelatedGenerators";

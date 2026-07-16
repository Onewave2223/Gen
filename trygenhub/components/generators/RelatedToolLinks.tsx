import Link from "next/link";

export interface RelatedToolLink {
  name: string;
  href: string;
  description: string;
}

export interface RelatedToolLinksProps {
  tools: RelatedToolLink[];
  heading?: string;
}

export function RelatedToolLinks({
  tools,
  heading = "You may also like",
}: RelatedToolLinksProps) {
  if (tools.length === 0) return null;

  return (
    <section
      aria-labelledby="related-tools-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="related-tools-heading"
        className="text-xl font-semibold text-[var(--foreground)]"
      >
        {heading}
      </h2>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="group flex flex-col gap-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <span className="text-sm font-medium text-[var(--foreground)]">
                {tool.name}
              </span>
              <span className="text-sm text-[var(--muted)]">
                {tool.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

RelatedToolLinks.displayName = "RelatedToolLinks";

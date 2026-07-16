import Link from "next/link";
import { getOtherGadaniyaTools } from "@/data/gadaniya";

export interface OtherGadaniyaProps {
  currentId: string;
  limit?: number;
}

export function OtherGadaniya({ currentId, limit = 5 }: OtherGadaniyaProps) {
  const otherTools = getOtherGadaniyaTools(currentId, limit);

  if (otherTools.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="other-gadaniya-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="other-gadaniya-heading"
        className="text-xl font-semibold text-[var(--foreground)]"
      >
        Другие гадания
      </h2>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {otherTools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={tool.href}
              className="group flex items-start gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4 transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                {tool.emoji}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[var(--foreground)]">
                  {tool.name}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {tool.shortDescription}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/ru/gadaniya"
        className="text-sm font-medium text-[var(--primary)] hover:underline"
      >
        Все гадания и на главную раздела →
      </Link>
    </section>
  );
}

OtherGadaniya.displayName = "OtherGadaniya";

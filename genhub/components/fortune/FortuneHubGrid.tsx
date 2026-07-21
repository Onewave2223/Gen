import Link from "next/link";
import { fortuneTools } from "@/data/fortune";
import { TOOL_ICON_MAP, SparkleIcon } from "@/components/icons/ToolIcons";

export function FortuneHubGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fortuneTools.map((tool) => {
        const Icon = TOOL_ICON_MAP[tool.id as keyof typeof TOOL_ICON_MAP] ?? SparkleIcon;
        return (
        <li key={tool.id}>
          <Link
            href={tool.href}
            className="group flex h-full flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-all hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-[var(--background)] text-[var(--primary)] mystic-twinkle"
            >
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-lg font-semibold text-[var(--foreground)]">
              {tool.name}
            </span>
            <span className="text-sm text-[var(--muted)]">
              {tool.shortDescription}
            </span>
            <span className="mt-auto text-sm font-medium text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100">
              Try now →
            </span>
          </Link>
        </li>
        );
      })}
    </ul>
  );
}

FortuneHubGrid.displayName = "FortuneHubGrid";

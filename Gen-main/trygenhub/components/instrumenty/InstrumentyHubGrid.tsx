import Link from "next/link";
import { instrumentyTools } from "@/data/instrumenty";
import { TOOL_ICON_MAP, SparkleIcon } from "@/components/icons/ToolIcons";
import { FavoriteButton } from "@/components/engagement/FavoriteButton";

export function InstrumentyHubGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {instrumentyTools.map((tool) => {
        const Icon = TOOL_ICON_MAP[tool.id as keyof typeof TOOL_ICON_MAP] ?? SparkleIcon;
        return (
        <li key={tool.id}>
          <div className="group relative flex h-full flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]">
            <Link
              href={tool.href}
              aria-label={tool.name}
              className="absolute inset-0 z-0 rounded-[var(--radius)] focus:outline-none"
            />

            <span className="absolute right-4 top-4 z-10">
              <FavoriteButton
                id={`instrument:${tool.id}`}
                label={tool.name}
                locale="ru"
                className="pointer-events-auto"
              />
            </span>

            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-[var(--background)] text-[var(--primary)]"
            >
              <Icon className="h-6 w-6" />
            </span>
            <span className="flex flex-col gap-1 pr-8">
              <span className="text-lg font-semibold text-[var(--foreground)]">
                {tool.name}
              </span>
              <span className="text-sm text-[var(--muted)]">
                {tool.shortDescription}
              </span>
            </span>
            <span className="mt-auto text-sm font-medium text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100">
              Открыть инструмент →
            </span>
          </div>
        </li>
        );
      })}
    </ul>
  );
}

InstrumentyHubGrid.displayName = "InstrumentyHubGrid";

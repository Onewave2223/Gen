import type { Metadata } from "next";
import Link from "next/link";
import { generators } from "@/data/generators";
import { GeneratorCard } from "@/components/generators/GeneratorCard";
import { TOOL_ICON_MAP, SparkleIcon } from "@/components/icons/ToolIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators";

const schemas = [
  createWebApplicationSchema({
    name: "Free Online Generators",
    description: "Browse all free random generators and creative tools on TryGenHub.",
    path: PATH,
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: "Free Online Generators – Random Tools & Name Generators",
  description:
    "Browse all free random generators on TryGenHub. UUID generator, random name, random picker, wheel spinner, dice roller, coin flip, and more.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Free Online Generators – Random Tools & Name Generators",
    description: "Browse all free random generators. UUID, names, teams, wheel spinner, dice, and more.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const availableGenerators = generators.filter((g) => g.status === "available");

export default function GeneratorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={schemas} />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <li>
            <Link href="/" className="hover:text-[var(--foreground)]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-[var(--foreground)]">
            Generators
          </li>
        </ol>
      </nav>

      <div className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Free Online Generators
        </h1>
        <p className="max-w-2xl text-base text-[var(--muted)]">
          Browse all random generators and creative tools — UUIDs, names, teams, wheel spinner, dice, passwords, and more.
          Everything runs in your browser. No sign-up required.
        </p>
        <p className="text-sm text-[var(--muted)]">
          {availableGenerators.length} generators available
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availableGenerators.map((generator) => {
          const Icon = TOOL_ICON_MAP[generator.id as keyof typeof TOOL_ICON_MAP] ?? SparkleIcon;
          return (
          <GeneratorCard
            key={generator.id}
            title={generator.name}
            description={generator.shortDescription}
            href={generator.href}
            badge={generator.badge}
            icon={<Icon className="h-6 w-6" />}
            favoriteId={`generator:${generator.id}`}
          />
          );
        })}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/tools"
          className="group flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[var(--shadow-lg)]"
        >
          <span className="text-base font-semibold text-[var(--foreground)]">Text Tools</span>
          <span className="text-sm text-[var(--muted)]">
            Word counter, case converter, QR code generator, sort lines, and more.
          </span>
          <span className="mt-1 text-xs font-medium text-[var(--primary)]">Browse text tools →</span>
        </Link>
        <Link
          href="/calculators"
          className="group flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[var(--shadow-lg)]"
        >
          <span className="text-base font-semibold text-[var(--foreground)]">Calculators</span>
          <span className="text-sm text-[var(--muted)]">
            Age calculator, BMI, tip calculator, percentage calculator, and more.
          </span>
          <span className="mt-1 text-xs font-medium text-[var(--primary)]">Browse calculators →</span>
        </Link>
      </div>
    </div>
  );
}

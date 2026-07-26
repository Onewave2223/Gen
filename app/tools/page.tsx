import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { GeneratorCard } from "@/components/generators/GeneratorCard";
import { InFeedAd } from "@/components/ads/InFeedAd";
import { TOOL_ICON_MAP, SparkleIcon } from "@/components/icons/ToolIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools";

const schemas = [
  createWebApplicationSchema({
    name: "Free Online Text Tools",
    description: "Browse free text tools on TryGenHub — word counter, case converter, QR code generator, and more.",
    path: PATH,
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Tools", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: "Free Online Text Tools – Word Counter, Case Converter & More",
  description:
    "Free online text tools: word counter, character counter, case converter, QR code generator, sort lines, remove duplicate lines. All run in your browser.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Free Online Text Tools – Word Counter, Case Converter & More",
    description: "Word counter, case converter, QR code, sort lines, remove duplicates. Free and browser-based.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function ToolsPage() {
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
            Tools
          </li>
        </ol>
      </nav>

      <div className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Free Online Text Tools
        </h1>
        <p className="max-w-2xl text-base text-[var(--muted)]">
          Practical tools for working with text — count words, convert case, generate QR codes,
          sort and deduplicate lines. Everything runs locally in your browser. Your text stays private.
        </p>
        <p className="text-sm text-[var(--muted)]">
          {tools.length} tools available
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => {
          const Icon = TOOL_ICON_MAP[tool.id as keyof typeof TOOL_ICON_MAP] ?? SparkleIcon;
          return (
            <Fragment key={tool.id}>
              <GeneratorCard
                title={tool.name}
                description={tool.shortDescription}
                href={tool.href}
                icon={<Icon className="h-6 w-6" />}
                favoriteId={`tool:${tool.id}`}
              />
              {index === 5 && <InFeedAd />}
            </Fragment>
          );
        })}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/generators"
          className="group flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[var(--shadow-lg)]"
        >
          <span className="text-base font-semibold text-[var(--foreground)]">Generators</span>
          <span className="text-sm text-[var(--muted)]">
            UUID, random names, wheel spinner, dice roller, lorem ipsum, and more.
          </span>
          <span className="mt-1 text-xs font-medium text-[var(--primary)]">Browse generators →</span>
        </Link>
        <Link
          href="/calculators"
          className="group flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[var(--shadow-lg)]"
        >
          <span className="text-base font-semibold text-[var(--foreground)]">Calculators</span>
          <span className="text-sm text-[var(--muted)]">
            Age, BMI, tip, percentage, and date difference calculators.
          </span>
          <span className="mt-1 text-xs font-medium text-[var(--primary)]">Browse calculators →</span>
        </Link>
      </div>
    </div>
  );
}

import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/data/calculators";
import { GeneratorCard } from "@/components/generators/GeneratorCard";
import { InFeedAd } from "@/components/ads/InFeedAd";
import { TOOL_ICON_MAP, SparkleIcon } from "@/components/icons/ToolIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/calculators";

const schemas = [
  createWebApplicationSchema({
    name: "Free Online Calculators",
    description: "Browse free calculators on TryGenHub — age, BMI, tip, percentage, and date difference.",
    path: PATH,
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Calculators", path: PATH },
  ]),
];

export const metadata: Metadata = {
  title: "Free Online Calculators – Age, BMI, Tip & More",
  description:
    "Free online calculators: age calculator, BMI calculator, tip calculator, percentage calculator, date difference. All work in your browser, no sign-up.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Free Online Calculators – Age, BMI, Tip & More",
    description: "Age, BMI, tip, percentage, and date difference calculators. Free and browser-based.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function CalculatorsPage() {
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
            Calculators
          </li>
        </ol>
      </nav>

      <div className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Free Online Calculators
        </h1>
        <p className="max-w-2xl text-base text-[var(--muted)]">
          Practical everyday calculators — find your exact age, calculate BMI, split a restaurant bill,
          figure out percentages, and more. All run instantly in your browser.
        </p>
        <p className="text-sm text-[var(--muted)]">
          {calculators.length} calculators available
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc, index) => {
          const Icon = TOOL_ICON_MAP[calc.id as keyof typeof TOOL_ICON_MAP] ?? SparkleIcon;
          return (
            <Fragment key={calc.id}>
              <GeneratorCard
                title={calc.name}
                description={calc.shortDescription}
                href={calc.href}
                icon={<Icon className="h-6 w-6" />}
                favoriteId={`calculator:${calc.id}`}
              />
              {index === 2 && <InFeedAd />}
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
          href="/tools"
          className="group flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[var(--shadow-lg)]"
        >
          <span className="text-base font-semibold text-[var(--foreground)]">Text Tools</span>
          <span className="text-sm text-[var(--muted)]">
            Word counter, case converter, QR code generator, sort lines, and more.
          </span>
          <span className="mt-1 text-xs font-medium text-[var(--primary)]">Browse text tools →</span>
        </Link>
      </div>
    </div>
  );
}

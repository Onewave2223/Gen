import type { Metadata } from "next";
import { PercentIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { PercentageCalculator } from "@/components/calculators/PercentageCalculator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/calculators/percentage-calculator";
const NAME = "Percentage Calculator";
const SHORT_DESCRIPTION =
  "Calculate what X% of Y is, what percentage X is of Y, and the percentage change between two values.";

const faqItems: FaqItem[] = [
  {
    question: "What is X% of Y?",
    answer:
      "Multiply Y by X and divide by 100. For example, 20% of 150 = (20 / 100) × 150 = 30.",
  },
  {
    question: "How do I find what percentage X is of Y?",
    answer:
      "Divide X by Y and multiply by 100. For example, 30 is what percent of 150? (30 / 150) × 100 = 20%.",
  },
  {
    question: "How is percentage change calculated?",
    answer:
      "Percentage change = ((New Value − Old Value) / |Old Value|) × 100. A positive result is an increase; a negative result is a decrease.",
  },
];

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SHORT_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Percentage Calculator – Free Online Percent Tool",
  description:
    "Calculate percentages instantly. Find X% of Y, what percent X is of Y, or the percentage change between two values. Free online tool.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/kalkulyator-protsentov" },
  },
  openGraph: {
    title: "Percentage Calculator – Free Online Percent Tool",
    description: "Three percentage calculation modes: X% of Y, X is what % of Y, and % change. Free.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Age Calculator", href: "/calculators/age-calculator", description: "Calculate your exact age in years, months, and days." },
  { name: "Date Difference Calculator", href: "/calculators/date-difference", description: "Find the number of days between two dates." },
  { name: "Tip Calculator", href: "/calculators/tip-calculator", description: "Calculate tips and split bills." },
  { name: "BMI Calculator", href: "/calculators/bmi-calculator", description: "Calculate your Body Mass Index." },
];

export default function PercentageCalculatorPage() {
  return (
    <ToolShell icon={<PercentIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Calculators", href: "/calculators" }]}
    >
      <JsonLd data={schemas} />
      <PercentageCalculator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the percentage calculator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose a calculation mode.</li>
            <li>2. Enter the two values (X and Y).</li>
            <li>3. Click Calculate to see the result.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <RelatedToolLinks tools={RELATED} />
      </div>
    </ToolShell>
  );
}

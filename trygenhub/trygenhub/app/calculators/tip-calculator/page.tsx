import type { Metadata } from "next";
import { ReceiptCoinIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { TipCalculator } from "@/components/calculators/TipCalculator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/calculators/tip-calculator";
const NAME = "Tip Calculator";
const SHORT_DESCRIPTION =
  "Calculate tip amount, total bill, and per-person split. Choose a preset tip percentage or enter a custom amount.";

const faqItems: FaqItem[] = [
  {
    question: "What tip percentage is standard?",
    answer:
      "In the US, 15–20% is considered standard for restaurant service. 10% is for average service, 20–25% for excellent service. Customs vary by country.",
  },
  {
    question: "How is the per-person amount calculated?",
    answer:
      "The total bill (including tip) is divided equally by the number of people. This assumes an even split — if people ordered different amounts, you may need to adjust manually.",
  },
  {
    question: "Can I enter a custom tip percentage?",
    answer:
      "Yes. In addition to the preset buttons (10%, 15%, 18%, 20%, 25%), you can type any custom percentage directly in the input field.",
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
  title: "Tip Calculator – Calculate Tip and Split the Bill",
  description:
    "Calculate your tip, total bill, and per-person amount instantly. Choose a preset tip % or enter a custom value. Free online tip calculator.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/kalkulyator-chaevyh" },
  },
  openGraph: {
    title: "Tip Calculator – Calculate Tip and Split the Bill",
    description: "Calculate tip amount and split the bill. Preset or custom tip %. Free and instant.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", description: "Calculate percentages." },
  { name: "Age Calculator", href: "/calculators/age-calculator", description: "Calculate your exact age." },
  { name: "Date Difference Calculator", href: "/calculators/date-difference", description: "Find days between dates." },
  { name: "BMI Calculator", href: "/calculators/bmi-calculator", description: "Calculate your BMI." },
];

export default function TipCalculatorPage() {
  return (
    <ToolShell icon={<ReceiptCoinIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Calculators", href: "/calculators" }]}
    >
      <JsonLd data={schemas} />
      <TipCalculator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the tip calculator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter the bill amount.</li>
            <li>2. Choose a tip percentage or type a custom amount.</li>
            <li>3. Enter the number of people splitting the bill.</li>
            <li>4. The tip, total, and per-person amounts update automatically.</li>
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

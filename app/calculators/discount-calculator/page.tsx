import type { Metadata } from "next";
import { TagPercentIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/calculators/discount-calculator";
const NAME = "Discount Calculator";
const SHORT_DESCRIPTION =
  "Enter the original price and discount percentage to instantly find the sale price, how much you save, and the total after tax.";

const faqItems: FaqItem[] = [
  {
    question: "How do I calculate a discount?",
    answer:
      "Multiply the original price by the discount percentage divided by 100 to get the discount amount, then subtract that from the original price to get the sale price. This calculator does that automatically.",
  },
  {
    question: "Does the tax field apply before or after the discount?",
    answer:
      "Tax is applied to the price after the discount, which matches how most retail checkouts calculate sales tax on a discounted item.",
  },
  {
    question: "Can I use this for stacked or multiple discounts?",
    answer:
      "This calculator applies a single discount percentage. For stacked discounts, calculate the first discount, then use the resulting price as the new 'original price' for the second discount.",
  },
  {
    question: "Is my pricing data stored anywhere?",
    answer:
      "No. All calculations happen locally in your browser — nothing is sent to a server or stored.",
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
  title: "Discount Calculator – Find Sale Price & Savings Instantly",
  description:
    "Free discount calculator. Enter the original price and discount percentage to find the sale price, total savings, and price after tax.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/kalkulyator-skidki" },
  },
  openGraph: {
    title: "Discount Calculator – Find Sale Price & Savings Instantly",
    description: "Calculate sale price, savings, and tax on discounted items. Free, instant, no sign-up.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", description: "Calculate percentages and percent change." },
  { name: "Tip Calculator", href: "/calculators/tip-calculator", description: "Calculate tips and split bills." },
  { name: "Unit Converter", href: "/tools/unit-converter", description: "Convert length, weight, temperature, and volume." },
  { name: "Age Calculator", href: "/calculators/age-calculator", description: "Find your exact age in years, months, and days." },
];

export default function DiscountCalculatorPage() {
  return (
    <ToolShell icon={<TagPercentIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Calculators", href: "/calculators" }]}
    >
      <JsonLd data={schemas} />
      <DiscountCalculator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the discount calculator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Enter the original price of the item.</li>
            <li>2. Enter the discount percentage.</li>
            <li>3. Optionally enter a sales tax percentage.</li>
            <li>4. Click Calculate to see the sale price, savings, and final total.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Who this is useful for</h2>
          <p className="text-sm text-[var(--muted)]">
            Handy for shoppers comparing sale prices, sellers pricing a promotion, or anyone
            who wants to quickly check how much a discount actually saves once tax is included.
          </p>
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

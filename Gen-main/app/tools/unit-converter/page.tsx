import type { Metadata } from "next";
import { SwapRulerIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/tools/unit-converter";
const NAME = "Unit Converter";
const SHORT_DESCRIPTION =
  "Convert between length, weight, temperature, and volume units instantly — no sign-up, works fully in your browser.";

const faqItems: FaqItem[] = [
  {
    question: "Which unit categories are supported?",
    answer:
      "Length (mm, cm, m, km, in, ft, yd, mi), weight (mg, g, kg, oz, lb, st), temperature (°C, °F, K), and volume (mL, L, US gallons, quarts, pints, cups, fluid ounces).",
  },
  {
    question: "How accurate are the conversions?",
    answer:
      "Conversions use standard internationally recognized conversion factors and are shown with up to 6 decimal places of precision.",
  },
  {
    question: "Why is temperature converted differently from the other categories?",
    answer:
      "Length, weight, and volume are simple multiplicative conversions, but temperature scales have different zero points, so Celsius, Fahrenheit, and Kelvin use their own conversion formulas.",
  },
  {
    question: "Is any of my data sent to a server?",
    answer:
      "No. All conversions run locally in your browser using JavaScript — nothing is transmitted anywhere.",
  },
];

const schemas = [
  createWebApplicationSchema({ name: NAME, description: SHORT_DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Unit Converter – Length, Weight, Temperature & Volume",
  description:
    "Free online unit converter. Convert length, weight, temperature, and volume between metric and imperial units instantly.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/konverter-edinic" },
  },
  openGraph: {
    title: "Unit Converter – Length, Weight, Temperature & Volume",
    description: "Convert between metric and imperial units instantly. Free, instant, no sign-up.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Discount Calculator", href: "/calculators/discount-calculator", description: "Find the sale price and savings." },
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", description: "Calculate percentages and percent change." },
  { name: "Word Counter", href: "/tools/word-counter", description: "Count words, characters, and reading time." },
  { name: "BMI Calculator", href: "/calculators/bmi-calculator", description: "Calculate your Body Mass Index." },
];

export default function UnitConverterPage() {
  return (
    <ToolShell icon={<SwapRulerIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Tools", href: "/tools" }]}
    >
      <JsonLd data={schemas} />
      <UnitConverter />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the unit converter</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose a category: length, weight, temperature, or volume.</li>
            <li>2. Select the unit you&apos;re converting from and enter a value.</li>
            <li>3. Select the unit you&apos;re converting to — the result updates instantly.</li>
            <li>4. Use the swap button to quickly reverse the conversion direction.</li>
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

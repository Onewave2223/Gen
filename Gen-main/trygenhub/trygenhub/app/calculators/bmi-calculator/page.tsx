import type { Metadata } from "next";
import { ScaleBodyIcon } from "@/components/icons/ToolIcons";
import { ToolShell } from "@/components/generators/ToolShell";
import { BmiCalculator } from "@/components/calculators/BmiCalculator";
import { RelatedToolLinks } from "@/components/generators/RelatedToolLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/calculators/bmi-calculator";
const NAME = "BMI Calculator";
const SHORT_DESCRIPTION =
  "Calculate your Body Mass Index using metric (kg/cm) or imperial (lbs/ft-in) units. Includes standard BMI categories for general reference.";

const faqItems: FaqItem[] = [
  {
    question: "What is BMI?",
    answer:
      "Body Mass Index (BMI) is a value derived from a person's weight and height. It is a widely used screening tool for weight categories, but it does not directly measure body fat or overall health.",
  },
  {
    question: "What are the standard BMI categories?",
    answer:
      "The standard ranges are: Under 18.5 = Underweight, 18.5–24.9 = Normal weight, 25–29.9 = Overweight, 30 and above = Obese. These are general guidelines and may not apply equally to all individuals.",
  },
  {
    question: "Is BMI an accurate health indicator?",
    answer:
      "BMI is a general screening tool and has limitations. It does not account for age, sex, muscle mass, bone density, or distribution of fat. Consult a healthcare provider for a comprehensive health assessment.",
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
  title: "BMI Calculator – Free Body Mass Index Calculator",
  description:
    "Calculate your BMI in metric or imperial units. See your BMI category. Free online tool — general information only, not medical advice.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/kalkulyator-imt" },
  },
  openGraph: {
    title: "BMI Calculator – Free Body Mass Index Calculator",
    description: "Calculate BMI in metric or imperial units. General reference tool — not medical advice.",
    url: PATH, siteName: siteConfig.name, locale: siteConfig.locale, type: "website",
  },
};

const RELATED = [
  { name: "Age Calculator", href: "/calculators/age-calculator", description: "Calculate your exact age." },
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", description: "Calculate percentages." },
  { name: "Tip Calculator", href: "/calculators/tip-calculator", description: "Calculate tips and split bills." },
  { name: "Date Difference Calculator", href: "/calculators/date-difference", description: "Find days between two dates." },
];

export default function BmiCalculatorPage() {
  return (
    <ToolShell icon={<ScaleBodyIcon className="h-6 w-6" />}
      title={NAME}
      description={SHORT_DESCRIPTION}
      breadcrumbs={[{ label: "Calculators", href: "/calculators" }]}
    >
      <JsonLd data={schemas} />
      <BmiCalculator />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How to use the BMI calculator</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose metric (kg / cm) or imperial (lbs / ft-in).</li>
            <li>2. Enter your weight and height.</li>
            <li>3. Click Calculate BMI to see your result and category.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Important note</h2>
          <p className="text-sm text-[var(--muted)]">
            BMI is a general informational tool, not a medical diagnostic. It does not replace a
            consultation with a qualified healthcare professional. Individual factors such as muscle
            mass, age, and sex significantly affect what constitutes a healthy weight.
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

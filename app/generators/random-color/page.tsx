import type { Metadata } from "next";
import { PaletteIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { RandomColorGenerator } from "@/components/generators/RandomColorGenerator";
import { RelatedGenerators } from "@/components/generators/RelatedGenerators";
import { GeneratorAd } from "@/components/ads/GeneratorAd";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbListSchema,
  createFaqPageSchema,
  createWebApplicationSchema,
  type FaqItem,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const PATH = "/generators/random-color";
const NAME = "Random Color Generator";
const SHORT_DESCRIPTION =
  "Generate random colors and instantly copy their HEX, RGB, and HSL values.";

const faqItems: FaqItem[] = [
  {
    question: "What is a HEX color?",
    answer:
      "A HEX color is a six-digit code, such as #A1B2C3, that represents the red, green, and blue components of a color in hexadecimal notation.",
  },
  {
    question: "What is RGB?",
    answer:
      "RGB stands for red, green, and blue. Each channel ranges from 0 to 255, and combining the three values produces a specific color.",
  },
  {
    question: "What is HSL?",
    answer:
      "HSL stands for hue, saturation, and lightness. It describes a color based on its position on a color wheel (hue), how vivid it is (saturation), and how light or dark it is (lightness).",
  },
  {
    question: "Can I copy the generated color values?",
    answer:
      "Yes. Each format (HEX, RGB, and HSL) has its own copy button so you can grab exactly the value you need.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: "/generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Random Color Generator – Free Online Tool",
  description:
    "Generate random colors instantly and copy their HEX, RGB, and HSL values for design, development, art, and creative projects.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Random Color Generator – Free Online Tool",
    description:
      "Generate random colors instantly and copy their HEX, RGB, and HSL values for design, development, art, and creative projects.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RandomColorPage() {
  return (
    <GeneratorShell icon={<PaletteIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <RandomColorGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the random color generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Generate a random color.</li>
            <li>2. Preview the color in the swatch.</li>
            <li>3. Copy the HEX, RGB, or HSL value you need.</li>
            <li>4. Generate again for a new color at any time.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What are HEX, RGB, and HSL?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            HEX, RGB, and HSL are three common ways to represent the
            same color. HEX uses a six-digit code made of red, green,
            and blue values written in hexadecimal. RGB expresses those
            same red, green, and blue components as numbers from 0 to
            255. HSL describes a color using hue, saturation, and
            lightness instead, which can be more intuitive when
            adjusting a color&apos;s tone.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What can random colors be used for?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Random colors can spark design inspiration, help you pick a
            quick accent color, generate placeholder styles during
            development, or simply provide a starting point for a
            broader color palette.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              What is a HEX color?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              A HEX color is a six-digit code, such as #A1B2C3, that
              represents the red, green, and blue components of a color
              in hexadecimal notation.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              What is RGB?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              RGB stands for red, green, and blue. Each channel ranges
              from 0 to 255, and combining the three values produces a
              specific color.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              What is HSL?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              HSL stands for hue, saturation, and lightness. It
              describes a color based on its position on a color wheel
              (hue), how vivid it is (saturation), and how light or dark
              it is (lightness).
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I copy the generated color values?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Each format (HEX, RGB, and HSL) has its own copy
              button so you can grab exactly the value you need.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="random-color" />
      </div>
    </GeneratorShell>
  );
}

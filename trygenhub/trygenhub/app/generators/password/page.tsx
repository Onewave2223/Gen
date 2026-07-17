import type { Metadata } from "next";
import { LockIcon } from "@/components/icons/ToolIcons";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { PasswordGenerator } from "@/components/generators/PasswordGenerator";
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

const PATH = "/generators/password";
const NAME = "Password Generator";
const SHORT_DESCRIPTION =
  "Create strong random passwords with customizable length and character options using secure browser-based random generation.";

const faqItems: FaqItem[] = [
  {
    question: "How long should my password be?",
    answer:
      "Longer, unique passwords are generally stronger, but exact requirements vary by service. This generator supports lengths from 4 to 128 characters, so you can match the requirements of the account you are creating a password for.",
  },
  {
    question: "Are generated passwords random?",
    answer:
      "Yes. This generator uses the browser Web Crypto API to produce secure random values when selecting characters.",
  },
  {
    question: "Can I exclude confusing characters?",
    answer:
      "Yes. Enabling Exclude similar characters removes 0, O, o, 1, l, and I from the character pool.",
  },
  {
    question: "Does TryGenHub store my generated password?",
    answer:
      "This generator does not send generated passwords to a TryGenHub backend for storage. As with any website, review the site's privacy policy and your browser environment when handling sensitive information.",
  },
  {
    question: "Should I reuse the same password?",
    answer:
      "No. It is best to use a unique password for each important account so that a breach on one service does not put your other accounts at risk.",
  },
];

const schemas = [
  createWebApplicationSchema({
    name: NAME,
    description: SHORT_DESCRIPTION,
    path: PATH,
    category: "SecurityApplication",
  }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Generators", path: "/generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Secure Password Generator – Free Online Tool",
  description:
    "Generate strong and secure random passwords instantly. Customize password length and characters with our free password generator.",
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/instrumenty/generator-paroley" },
  },
  openGraph: {
    title: "Secure Password Generator – Free Online Tool",
    description:
      "Generate strong and secure random passwords instantly. Customize password length and characters with our free password generator.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function PasswordGeneratorPage() {
  return (
    <GeneratorShell icon={<LockIcon className="h-6 w-6" />} title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <PasswordGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the password generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Choose the password length.</li>
            <li>2. Select the character types you want to include.</li>
            <li>3. Optionally exclude visually similar characters.</li>
            <li>4. Generate your password.</li>
            <li>5. Copy it and store it in a trusted password manager.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What makes a strong password?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Longer passwords generally offer more resistance to guessing
            than shorter ones. Using a variety of character types can help
            when a service supports and enforces that variety. Avoiding
            password reuse and choosing a unique password for each
            important account further reduces your exposure if one
            service is compromised.
          </p>
          <p className="text-sm text-[var(--muted)]">
            A password manager can help you store and organize unique
            credentials without needing to remember each one yourself.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How does secure password generation work?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This generator uses the browser&apos;s Web Crypto API to
            produce secure random values, which are used to select
            characters from the character groups you enable. Generation
            happens entirely in your browser. The password is generated
            in your browser by this tool and is not sent to a TryGenHub
            backend for generation.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Why use a unique password for every account?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            If you reuse the same password across multiple accounts, a
            breach at one service can expose your other accounts as
            well. Using a unique password for each account limits the
            impact of any single leak.
          </p>
        </section>

        <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm text-[var(--muted)]">
            Security tip: Save important passwords in a reputable
            password manager and enable multi-factor authentication when
            available.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              How long should my password be?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Longer, unique passwords are generally stronger, but exact
              requirements vary by service. This generator supports
              lengths from 4 to 128 characters, so you can match the
              requirements of the account you are creating a password
              for.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Are generated passwords random?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. This generator uses the browser Web Crypto API to
              produce secure random values when selecting characters.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I exclude confusing characters?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Enabling Exclude similar characters removes 0, O, o,
              1, l, and I from the character pool.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Does TryGenHub store my generated password?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              This generator does not send generated passwords to a
              TryGenHub backend for storage. As with any website, review the
              site&apos;s privacy policy and your browser environment when
              handling sensitive information.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Should I reuse the same password?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              No. It is best to use a unique password for each important
              account so that a breach on one service does not put your
              other accounts at risk.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="password" />
      </div>
    </GeneratorShell>
  );
}

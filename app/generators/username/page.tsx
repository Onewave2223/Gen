import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generators/GeneratorShell";
import { UsernameGenerator } from "@/components/generators/UsernameGenerator";
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

const PATH = "/generators/username";
const NAME = "Username Generator";
const SHORT_DESCRIPTION =
  "Create unique username ideas with optional keywords, multiple styles, numbers, and separators.";

const faqItems: FaqItem[] = [
  {
    question: "Can I add my own keyword?",
    answer:
      "Yes. Enter a word or name in the keyword field and the generator will try to weave it into some of the generated usernames.",
  },
  {
    question: "Can I generate usernames without numbers?",
    answer:
      "Yes. Turn off Include numbers and the generator will not add number suffixes to any results.",
  },
  {
    question: "Does TryGenHub check whether a username is available?",
    answer:
      "No. This tool only generates ideas. Check availability directly on the platform you plan to use.",
  },
  {
    question: "How many usernames can I generate at once?",
    answer:
      "You can generate between 1 and 100 username ideas in a single batch.",
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
    { name: "Generators", path: "/#generators" },
    { name: NAME, path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: "Username Generator – Free Online Tool",
  description:
    "Generate creative, unique username ideas instantly for social profiles, gaming, and online communities with custom keywords and styles.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: "Username Generator – Free Online Tool",
    description:
      "Generate creative, unique username ideas instantly for social profiles, gaming, and online communities with custom keywords and styles.",
    url: PATH,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function UsernameGeneratorPage() {
  return (
    <GeneratorShell title={NAME} description={SHORT_DESCRIPTION}>
      <JsonLd data={schemas} />
      <UsernameGenerator />

      <GeneratorAd />

      <div className="mt-12 flex flex-col gap-10 border-t border-[var(--border)] pt-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            How to use the username generator
          </h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Optionally enter a keyword you want to include.</li>
            <li>2. Choose a style that fits how you plan to use it.</li>
            <li>3. Choose how many username ideas to generate.</li>
            <li>4. Decide whether to allow numbers or separators.</li>
            <li>5. Generate your ideas and copy the ones you like.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            What makes a good username?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            A good username is usually memorable and easy to read and
            type. It helps to keep it short enough to fit comfortably
            in profile fields and mentions, and appropriate for the
            context you plan to use it in, whether that is a gaming
            profile, a community, or a professional account.
          </p>
          <p className="text-sm text-[var(--muted)]">
            It is also worth avoiding unnecessary personal information,
            such as your full name, birth year, or location, in a
            username you plan to use publicly. Before settling on one,
            check the specific rules of the platform you intend to use
            it on, since character limits and allowed symbols vary.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Username styles
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Random
              </span>{" "}
              — a broad mix of everyday adjectives and nouns for
              general-purpose ideas.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Clean
              </span>{" "}
              — shorter, simple combinations that are easy to read.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Gaming
              </span>{" "}
              — words with a gaming-oriented feel for game profiles and
              handles.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Cute
              </span>{" "}
              — softer, playful words for a friendlier tone.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">
                Professional
              </span>{" "}
              — more neutral combinations suited to professional or
              creative-project contexts.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Can TryGenHub check username availability?
          </h2>
          <p className="text-sm text-[var(--muted)]">
            No. This generator creates username ideas locally in your
            browser and does not check whether any particular username
            is already taken on any platform. Once you find an idea you
            like, check its availability directly on the platform where
            you plan to use it.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Frequently asked questions
          </h2>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I add my own keyword?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Enter a word or name in the keyword field and the
              generator will try to weave it into some of the generated
              usernames.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Can I generate usernames without numbers?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Yes. Turn off Include numbers and the generator will not
              add number suffixes to any results.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              Does TryGenHub check whether a username is available?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              No. This tool only generates ideas. Check availability
              directly on the platform you plan to use.
            </p>
          </details>

          <details className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
            <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">
              How many usernames can I generate at once?
            </summary>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You can generate between 1 and 100 username ideas in a
              single batch.
            </p>
          </details>
        </section>

        <RelatedGenerators currentId="username" />
      </div>
    </GeneratorShell>
  );
}

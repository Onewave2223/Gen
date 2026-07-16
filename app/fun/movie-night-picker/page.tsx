import type { Metadata } from "next";
import { ClapperIcon } from "@/components/icons/ToolIcons";
import Link from "next/link";
import { MovieNightPicker } from "@/components/fun/MovieNightPicker";
import { FunShell } from "@/components/fun/FunShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbListSchema, createFaqPageSchema, createWebApplicationSchema } from "@/lib/seo/schema";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { movieGenres, movieEras, movieMoodMap } from "@/data/fun-en";
import { funTools } from "@/data/fun-en";

const PATH = "/fun/movie-night-picker";
const TITLE = "Movie Night Picker – What Should I Watch Tonight?";
const DESCRIPTION =
  "Can't decide what to watch? Pick your mood and audience and get a random genre and era suggestion. Free, instant, no sign-up.";

const faqItems = [
  { question: "Does this recommend specific movies?", answer: "No. It suggests a genre and era combination to help you narrow down what to watch — without using any copyrighted film databases." },
  { question: "Does it use any external API?", answer: "No. Everything is local. No movie database API is needed." },
  { question: "How does it work?", answer: "You pick a mood and audience type. The tool randomly picks a matching genre and era suggestion." },
  { question: "Is this free?", answer: "Yes, completely free. No account needed." },
];

const schemas = [
  createWebApplicationSchema({ name: "Movie Night Picker", description: DESCRIPTION, path: PATH }),
  createBreadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Fun & Random", path: "/fun" },
    { name: "Movie Night Picker", path: PATH },
  ]),
  createFaqPageSchema(faqItems),
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ru: "/ru/razvlecheniya/chto-posmotret" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const moods = [
  { key: "fun", label: "Fun", genres: movieMoodMap.fun },
  { key: "relaxing", label: "Relaxing", genres: movieMoodMap.relaxing },
  { key: "exciting", label: "Exciting", genres: movieMoodMap.exciting },
  { key: "emotional", label: "Emotional", genres: movieMoodMap.emotional },
  { key: "any", label: "Anything", genres: movieMoodMap.any },
];

const audiences = [
  { key: "solo", label: "Solo night" },
  { key: "couple", label: "Date night" },
  { key: "friends", label: "Friends" },
  { key: "family", label: "Family" },
];

const RELATED = funTools.filter((t) => ["what-should-i-eat", "what-to-do", "decision-maker", "daily-idea"].includes(t.id));

export default function MovieNightPickerPage() {
  return (
    <FunShell icon={<ClapperIcon className="h-6 w-6" />}
      title="Movie Night Picker"
      description="Pick your mood and who's watching — get a random genre and era suggestion for tonight."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Fun & Random", href: "/fun" },
        { label: "Movie Night Picker" },
      ]}
    >
      <JsonLd data={schemas} />
      <MovieNightPicker
        genres={movieGenres}
        eras={movieEras}
        moods={moods}
        audiences={audiences}
        labels={{
          pick: "Pick for Me",
          pickAnother: "Pick Another",
          genre: "Genre",
          era: "Era",
          mood: "Mood",
          audience: "Watching with",
          result: "Tonight's pick",
        }}
      />

      <div className="mt-10 flex flex-col gap-8 border-t border-[var(--border)] pt-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">How to use</h2>
          <ol className="flex flex-col gap-2 text-sm text-[var(--muted)]">
            <li>1. Select your current mood.</li>
            <li>2. Select who you&apos;re watching with.</li>
            <li>3. Click Pick for Me to get a genre and era suggestion.</li>
            <li>4. Search that genre on your preferred streaming service.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-4">
              <summary className="cursor-pointer text-sm font-medium text-[var(--foreground)]">{item.question}</summary>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Other fun tools</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {RELATED.map((tool) => (
              <Link key={tool.id} href={tool.href} className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]">
                <span>{tool.emoji}</span>
                <span className="font-medium text-[var(--foreground)]">{tool.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </FunShell>
  );
}

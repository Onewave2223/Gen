import { Hero } from "@/components/home/Hero";
import { RuBanner } from "@/components/home/RuBanner";
import { CategoryPortals, type CategoryPortalItem } from "@/components/home/CategoryPortals";
import { FeaturedExperiences, type FeaturedExperienceItem } from "@/components/home/FeaturedExperiences";
import { PopularTools } from "@/components/home/PopularTools";
import { WhyGenHub } from "@/components/home/WhyGenHub";
import { TrustSection } from "@/components/home/TrustSection";
import { FaqSection } from "@/components/home/FaqSection";
import { GeneratorOfTheDay } from "@/components/home/GeneratorOfTheDay";
import { RecentlyUsedSection } from "@/components/home/RecentlyUsedSection";
import { SiteStatistics } from "@/components/home/SiteStatistics";
import { RandomGeneratorButton } from "@/components/home/RandomGeneratorButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdSlot } from "@/components/ads/AdSlot";
import { createOrganizationSchema, createWebSiteSchema } from "@/lib/seo/schema";
import { env } from "@/lib/env";
import { generators } from "@/data/generators";
import { tools } from "@/data/tools";
import { calculators } from "@/data/calculators";
import { funTools } from "@/data/fun-en";
import { fortuneTools } from "@/data/fortune";
import { TOTAL_TEST_QUESTIONS } from "@/lib/iq-test/questions";

// Order matters: it drives the bento layout in CategoryPortals.
// [ fortune (large) | generators (med) | iq (med) ]
// [ tools (med) | calculators (med) | fun (large) ]
const CATEGORY_ITEMS: readonly CategoryPortalItem[] = [
  {
    id: "fortune",
    href: "/fortune",
    name: "Fortune & Tarot",
    description:
      "Tarot card of the day, daily reading, compatibility, magic ball, and more fortune tools.",
    count: fortuneTools.length,
    countLabel: "fortune tools",
    ctaLabel: "Explore",
    size: "large",
    theme: "fortune",
    quickLinks: [
      { label: "Tarot", href: "/tarot/cards" },
      { label: "Daily Reading", href: "/fortune/daily-reading" },
      { label: "Magic Ball", href: "/fortune/magic-ball" },
    ],
  },
  {
    id: "generators",
    href: "/generators",
    name: "Generators",
    description:
      "Random numbers, passwords, names, teams, UUIDs, wheel spinner, dice roller, and more.",
    count: generators.filter((g) => g.status === "available").length,
    countLabel: "generators",
    ctaLabel: "Explore",
    size: "medium",
    theme: "generators",
  },
  {
    id: "iq-test",
    href: "/iq-test",
    name: "IQ Test",
    description: `${TOTAL_TEST_QUESTIONS} questions across pattern, logic, and spatial reasoning. Instant result.`,
    count: TOTAL_TEST_QUESTIONS,
    countLabel: "questions",
    ctaLabel: "Take the test",
    size: "medium",
    theme: "iq",
  },
  {
    id: "tools",
    href: "/tools",
    name: "Text Tools",
    description: "Word counter, case converter, QR codes, and other text utilities.",
    count: tools.length,
    countLabel: "tools",
    ctaLabel: "Explore",
    size: "medium",
    theme: "text",
  },
  {
    id: "calculators",
    href: "/calculators",
    name: "Calculators",
    description: "Age, BMI, tip, percentage, and discount calculators.",
    count: calculators.length,
    countLabel: "calculators",
    ctaLabel: "Explore",
    size: "medium",
    theme: "calculators",
  },
  {
    id: "fun",
    href: "/fun",
    name: "Fun & Interactive",
    description: "Would You Rather, Truth or Dare, Decision Maker, and more social games.",
    count: funTools.length,
    countLabel: "tools",
    ctaLabel: "Explore",
    size: "large",
    theme: "fun",
    quickLinks: [
      { label: "Would You Rather", href: "/fun/would-you-rather" },
      { label: "Truth or Dare", href: "/fun/truth-or-dare" },
      { label: "Decision Maker", href: "/fun/decision-maker" },
    ],
  },
];

const FEATURED_EXPERIENCES: readonly FeaturedExperienceItem[] = [
  {
    id: "tarot",
    href: "/tarot/cards",
    name: "Tarot Reading",
    description: "Draw from 78 Tarot cards.",
    emoji: "🃏",
  },
  {
    id: "daily-reading",
    href: "/fortune/daily-reading",
    name: "Daily Reading",
    description: "Your message for today.",
    emoji: "🌅",
  },
  {
    id: "compatibility",
    href: "/fortune/compatibility",
    name: "Compatibility",
    description: "See how well you match.",
    emoji: "💞",
  },
  {
    id: "magic-ball",
    href: "/fortune/magic-ball",
    name: "Magic Ball",
    description: "Ask, shake, and reveal.",
    emoji: "🔮",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[createWebSiteSchema(), createOrganizationSchema()]} />
      <RuBanner />
      <Hero
        badge="Free online tools — no sign-up required"
        titleBefore="Generate anything."
        titleAccent="Instantly."
        subtitle="IQ tests, fortune tools, random generators, calculators, and more — all free, all in your browser."
      />
      <CategoryPortals title="Browse by category" items={CATEGORY_ITEMS} />

      <div className="mx-auto flex max-w-6xl justify-center px-4 sm:px-6">
        <RandomGeneratorButton />
      </div>

      {/* 1. Recently Used — moved to top */}
      <RecentlyUsedSection />

      {/* 2. Popular Tools */}
      <PopularTools />

      {/* 3. New Tools (Featured Experiences) */}
      <FeaturedExperiences
        eyebrow="Featured experiences"
        title="Try it right now"
        items={FEATURED_EXPERIENCES}
      />

      {/* 4. Generator of the Day */}
      <GeneratorOfTheDay />

      {/* 5. Statistics */}
      <SiteStatistics />

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot
          slot={env.adsenseSlotHome}
          className="my-4 min-h-[100px] w-full p-4"
        />
      </section>
      <WhyGenHub />
      <TrustSection />
      <FaqSection />
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { PopularGenerators } from "@/components/home/PopularGenerators";
import { GeneratorSearch } from "@/components/home/GeneratorSearch";
import { CategoryOverview } from "@/components/home/CategoryOverview";
import { WhyGenHub } from "@/components/home/WhyGenHub";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdSlot } from "@/components/ads/AdSlot";
import { createOrganizationSchema, createWebSiteSchema } from "@/lib/seo/schema";
import { env } from "@/lib/env";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[createWebSiteSchema(), createOrganizationSchema()]} />
      <Hero />
      <PopularGenerators />
      <GeneratorSearch />
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot
          slot={env.adsenseSlotHome}
          className="my-4 min-h-[100px] w-full p-4"
        />
      </section>
      <CategoryOverview />
      <WhyGenHub />
    </>
  );
}

import type { Metadata } from "next";
import { FavoritesSection } from "@/components/home/FavoritesSection";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Your saved generators and tools for quick access. Favorites are stored locally in your browser.",
  alternates: {
    canonical: absoluteUrl("/favorites"),
  },
  // Personalized, client-side (localStorage) content with no unique
  // indexable value per visitor — keep it out of search results.
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <main className="min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="font-medium text-[var(--foreground)]">Favorites</li>
          </ol>
        </nav>
      </div>
      <FavoritesSection locale="en" />
    </main>
  );
}

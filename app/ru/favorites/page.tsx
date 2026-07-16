"use client";

import { FavoritesSection } from "@/components/home/FavoritesSection";
import Link from "next/link";

export default function FavoritesPageRu() {
  return (
    <main className="min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/ru" className="hover:text-[var(--foreground)] transition-colors">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="font-medium text-[var(--foreground)]">Избранное</li>
          </ol>
        </nav>
      </div>
      <FavoritesSection locale="ru" />
    </main>
  );
}

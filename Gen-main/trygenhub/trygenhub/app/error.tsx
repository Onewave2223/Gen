"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for local/server-side visibility. Never log secrets, and
    // Next.js already strips sensitive details from client-visible
    // error objects in production.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-6 px-4 py-20 sm:px-6">
      <p className="text-sm font-medium text-[var(--primary)]">Error</p>

      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
        Something went wrong
      </h1>

      <p className="text-base text-[var(--muted)]">
        An unexpected error occurred while loading this page. You can try
        again, or head back to the homepage.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

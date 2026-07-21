# TryGenHub — Phase 8 QA Report

**Date:** 2026-07-17
**Environment note:** this session's sandbox has no network access, so
`npm install`, `next build`, `tsc --noEmit`, and `eslint` could not be
executed here (registry requests returned `403`). Everything below was
verified by **static source analysis** (custom Python scripts walking the
actual `app/`/`components/`/`lib/`/`data/` trees), not by a real compiler.
Before deploying, run:

```
npm install
npm run lint
npx tsc --noEmit
npm run build
```

and fix anything those surface — the checks below cannot substitute for
an actual compile.

## What was actually checked

- **Imports**: parsed all 2,043 `import`/`export`/`require` specifiers
  across every `.ts`/`.tsx` file and resolved each `@/`- and relative-path
  import against the filesystem. **0 broken imports.**
- **Internal links**: cross-checked every `href` string found in
  `app/`, `components/`, `lib/`, `data/` against the actual 140 `page.tsx`
  routes (including the two dynamic `[slug]` tarot-card routes).
  **Found and fixed 2 real broken links**: the client-side search index
  (`lib/search/searchIndex.ts`) pointed "Tarot"/"Таро" results at `/tarot`
  and `/ru/tarot`, which don't exist — the real listing pages are
  `/tarot/cards` and `/ru/tarot/cards`. Both fixed.
- **Data catalogs**: `data/generators.ts`, `tools.ts`, `calculators.ts`,
  `fun-en.ts`, `fun-ru.ts`, `gadaniya.ts`, `fortune.ts`, `instrumenty.ts`
  — no duplicate `id`s, no duplicate `href`s, every `href` resolves to a
  real page.
- **Metadata coverage**: every `page.tsx` checked for an exported
  `metadata`/`generateMetadata`. 137/140 had it; the home page correctly
  inherits from the root layout. The two `/favorites` pages (EN + RU) were
  client components with no metadata at all, so they fell back to the
  generic site title and were fully crawlable/indexable despite being
  personalized, localStorage-only content. **Fixed**: converted both to
  server components with proper `title`, `description`, canonical, and
  `robots: { index: false, follow: true }` (their child `FavoritesSection`
  was already its own client component, so no UI or behavior changed).
- **Accessibility**: every `<Image>` usage has `alt`; every icon-only
  `<button>` (no visible text) already has `aria-label`/`aria-labelledby`.
  No `<img>` tags outside `next/image` were found.
- **Hydration safety**: audited every `Math.random()`/`Date.now()`/
  `new Date()` call site (58 hits). All are either inside event handlers
  (safe) or already deliberately deferred to `useEffect`/mount (e.g.
  `GeneratorOfTheDay`, `RuLangSetter`-style patterns) with a comment
  explaining why. No render-time-only Date/random values that could cause
  a server/client markup mismatch were found.
- **SEO files**: `app/sitemap.ts` and `app/robots.ts` reviewed in full —
  sitemap covers all static pages, all data-driven catalog pages (EN+RU),
  and all 78×2 tarot card detail pages; robots allows all crawlers and
  points at the sitemap. `/favorites` correctly stays out of the sitemap.
- **Copyright/legal in code**: no hardcoded secrets, API keys, or
  credentials found anywhere in source.
- **Bundle/perf**: the only heavy npm dependency (`qrcode`) is already
  lazy-loaded via `await import("qrcode")` in both the EN and RU QR
  generators. All `public/` images are small (largest is the 36 KB OG
  image); nothing needs further compression. Each generator/tool lives on
  its own route, so Next's route-level code splitting already keeps
  unrelated JS out of the homepage bundle — no further `next/dynamic`
  splitting looked necessary without restructuring components.

## What was added (infrastructure, not a redesign)

- **`public/sw.js`** — a minimal service worker (network-first for page
  navigations with a cache/offline fallback, cache-first-with-refresh for
  static assets). This is what was actually missing for the "offline
  support" and "install prompt" requirements: the manifest was already
  correct, but Chrome's install-prompt eligibility requires a controlling
  service worker with a `fetch` handler, and without one there was no
  real offline capability despite the manifest suggesting there was.
- **`public/offline.html`** — small fallback page (matches the manifest's
  `#0a0a0a` theme) shown only when a page is requested with no network and
  nothing cached yet.
- **`components/pwa/ServiceWorkerRegister.tsx`** — registers `sw.js` after
  `window.load`, wrapped so any failure or lack of browser support is
  silently a no-op; wired into `app/layout.tsx` once, alongside the other
  post-load scripts. Renders nothing, changes no UI.

## Not independently re-verified this session

The archive already contained a prior `QA_REPORT.md` claiming a full
network-enabled pass (install/tsc/eslint/build all green, 103 routes).
That could not be re-run or confirmed here — treat it as unverified until
you run the commands above yourself.

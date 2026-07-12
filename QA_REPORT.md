# GenHub v1.0 — Launch Candidate QA Report

**Date:** 2026-07-12
**Scope:** Stage 10 — Final QA, Testing & Launch Candidate

## 0. Important limitation — please read first

The environment this audit was performed in has **no network access**. This
means:

- `npm ci` / `npm install` could not be run (the project has **no
  `package-lock.json` in the uploaded archive** — see §2).
- `npm run lint`, `npm run build`, and `npm run start` could **not** be
  executed, because there is no `node_modules` to run them with.
- No HTTP route smoke test, no visual browser test, and no responsive-width
  browser test were performed, for the same reason.

Everything below that is marked "verified" was verified by **static source
review** (reading every relevant file, checking imports, tracing logic,
grepping for known-bad patterns). Anything that required actually executing
Node/npm is marked **NOT RUN** and is listed explicitly in §12 as work you
still need to do — locally or in CI — before this is a confirmed production
build. I did not fabricate any command output.

## 1. Audit scope / files inspected

Full project tree under `GenHub/`, including:

- `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`,
  `tailwind.config.ts`, `postcss.config.mjs`, `.env.example`, `.gitignore`
- All of `app/` (layout, homepage, 10 generator routes, `about`, `privacy`,
  `terms`, `contact`, `robots.ts`, `sitemap.ts`, `ads.txt/route.ts`,
  `not-found.tsx`, `error.tsx`)
- All of `components/` (`layout`, `home`, `generators`, `ads`, `analytics`,
  `seo`, `ui`) — 71 `.ts`/`.tsx` files total across the project
- All of `lib/` (10 generator algorithm modules, `env.ts`, `site.ts`,
  `analytics.ts`, `utils.ts`, `seo/schema.ts`)
- `data/generators.ts` (the tool catalog)
- `README.md`, `DEPLOYMENT.md`

## 2. Issues found

1. **No `package-lock.json` in the archive.** Part 2/39 of the audit spec
   calls for checking this file. It is not present, which means installs
   are not currently reproducible/pinned. This could not be fixed here
   because generating it requires running `npm install` against the real
   npm registry, which this environment cannot reach.
2. **`app/layout.tsx` referenced `/favicon.ico` in `metadata.icons`, but
   there was no `public/` directory and no favicon file anywhere in the
   project.** This would have 404'd in production. Fixed — see §3.
3. No other functional bugs, broken imports, missing files, duplicate
   routes/components, dead code, undeclared dependencies, Server/Client
   boundary violations, `any` usage, `@ts-ignore`/`@ts-nocheck`, `eval`,
   unsafe `dangerouslySetInnerHTML`, hardcoded secrets, fake GA/AdSense IDs,
   or forbidden placeholder patterns were found during source review (see
   checks below for method).

## 3. Issues fixed

- Created `public/favicon.ico` (a simple generated brand-mark icon, 16/32/48px)
  so the existing `metadata.icons` reference in `app/layout.tsx` resolves
  instead of 404ing. No other change was made to `layout.tsx` — it already
  referenced the icon correctly, it just had no file to point to.
- Updated `README.md`: bumped status to "GenHub v1.0 Launch Candidate" and
  added an explicit, honest note that this audit did not include a live
  `npm ci` / `build` / `start` run, per the constraint in §0.
- No other source/logic changes were needed — the codebase was already in
  good shape from prior stages (see §12 for what wasn't checked).

## 4. Commands executed (and exact results)

| Command | Result |
|---|---|
| `node -v` / `npm -v` | Node v22.22.2, npm 10.9.7 |
| `npm ci` | **Failed** — no `package-lock.json` present in the archive |
| `npm install` | **Failed** — `403 Forbidden` fetching packages from the npm registry (this sandbox has no outbound network access) |
| `npm run lint` | **NOT RUN** — no `node_modules` |
| `npm run build` | **NOT RUN** — no `node_modules` |
| `npm run start` | **NOT RUN** — no build output |
| `npm run verify` | Not applicable — no existing test/verify infrastructure in `package.json`, and per the spec, a new one was not force-added just to produce a green checkmark (see §12) |

## 5. Routes verified (by source review only — not HTTP-tested)

Confirmed to exist as real files with a matching `page.tsx`/`route.ts`/handler,
correct exports, and resolvable internal links:

`/`, `/about`, `/privacy`, `/terms`, `/contact`,
`/generators/random-number`, `/generators/password`, `/generators/username`,
`/generators/dice-roller`, `/generators/coin-flip`, `/generators/random-color`,
`/generators/random-date`, `/generators/random-emoji`,
`/generators/company-name`, `/generators/domain-name`,
`/robots.txt` (`app/robots.ts`), `/sitemap.xml` (`app/sitemap.ts`),
`/ads.txt` (`app/ads.txt/route.ts`, returns 404 when unconfigured — by
design, not a bug), custom `app/not-found.tsx`, `app/error.tsx` boundary.

No HTTP status codes were actually requested. **Actual HTTP smoke-testing
(Part 33/34 of the spec) was not performed** — do this after a successful
`npm run build && npm run start` locally.

## 6. Generator checks performed (static/logic review, not a running browser)

For each of the 10 generators I read the full algorithm in `lib/generators/*`
and cross-checked it against the matching UI component in
`components/generators/*`:

- **Random Number** — validated min/max/count bounds, `min === max`,
  `min > max` rejection, negative/zero support, unique-count-exceeds-range
  rejection, and confirmed unique sampling uses Floyd's algorithm (bounded
  by `count`, not by range size — no infinite loop risk even for huge ranges).
- **Password** — confirmed generation uses `crypto.getRandomValues` with
  rejection sampling (no `Math.random` for passwords), guarantees at least
  one char per selected class, validates length 4–128, rejects zero selected
  character classes, and never appears in `lib/analytics.ts` or
  `lib/seo/schema.ts` inputs.
- **Username / Company Name / Domain Name** — all three unique-result
  generators are bounded with a `count * 50` attempt cap plus a bounded
  numeric-suffix fallback loop, so they cannot infinite-loop even at the
  max count of 100. Domain name output is validated against DNS label
  rules (≤63 chars, no leading/trailing/double hyphens, lowercase only).
- **Dice Roller / Coin Flip / Random Color / Random Date / Random Emoji** —
  reviewed for valid ranges, repeated-action state resets, and (for Random
  Date) leap-year and start-after-end validation.

None of the above were exercised by actually running the app in a browser
or executing the TypeScript with a test runner — this is a code-reading
review, not a functional test run. Runtime behavior should still be spot
checked in `npm run dev` before launch.

## 7. SEO checks

Verified in source: `metadataBase`, title template, unique per-page titles
and descriptions, canonical URLs via `alternates.canonical`, Open Graph and
Twitter metadata blocks, conditional `robots` metadata (blocks indexing when
`NEXT_PUBLIC_SITE_URL` is left at its local/example fallback), `robots.ts`
and `sitemap.ts` both driven from `lib/site.ts` and `data/generators.ts`
(no hardcoded domain duplication), and structured data: `WebSite` +
`Organization` on the homepage, `WebApplication` + `BreadcrumbList` +
`FAQPage` on every generator page. `FAQPage` schema only appears alongside a
matching **visible** `<details>` FAQ block on the same page — no
schema/content mismatch found.

## 8. Security checks

- No secrets, API keys, or `.env` files in the archive.
- `next.config.ts` sets `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`, and a production-only
  `Strict-Transport-Security` header.
- The only `dangerouslySetInnerHTML` usage is `components/seo/JsonLd.tsx`,
  which only ever serializes trusted internal data (site config / catalog /
  hardcoded FAQ content) via `JSON.stringify`, with `<` escaped to
  `\u003c`; it does not receive user input anywhere it's called.
- No `eval`, no `new Function(...)`.
- No generated password, username, company name, or domain name is ever
  passed into `trackEvent()` or into any JSON-LD schema — confirmed by
  reading every call site.
- No `localStorage`/persistence of generated passwords found.

## 9. Analytics / AdSense checks

- `lib/env.ts` validates `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`G-...`) and
  `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (`ca-pub-...`) with regexes; invalid or
  missing values simply disable the integration — there is no fallback to a
  fake ID anywhere in the codebase.
- `GoogleAnalytics` and `AdSenseScript` both render `null` outside
  production or without a valid ID — confirmed by reading the components,
  not by observing it live in a browser.
- `AdSlot` pushes to `window.adsbygoogle` at most once per mount
  (`pushedRef`), shows a neutral non-clickable placeholder only in
  development, and renders nothing in production when unconfigured.
- `/ads.txt` returns an honest 404 when no AdSense client ID is configured,
  and a correctly formatted single `DIRECT` line when one is.

## 10. Content / trust checks

`about`, `privacy`, `terms`, and `contact` pages were read in full: no fake
address, phone number, email, company registration, user counts, or
testimonials found. The contact page explicitly states a contact channel is
still being prepared rather than presenting a fake working form.

## 11. Known limitations of this audit

- No live `npm install`/`build`/`start` (see §0) — this is the single
  biggest gap. TypeScript type errors, ESLint issues, and Next.js
  build-time errors that only surface during an actual compile were **not**
  ruled out by source review alone, even though none were spotted by eye.
- No real browser was used, so hydration behavior, responsive layout at
  320–1440px, keyboard navigation, and screen-reader behavior were reviewed
  by reading JSX/Tailwind classes only, not observed.
- No automated test suite exists in this project (none existed before this
  stage, and per the spec a heavy test framework was not force-added). A
  lightweight `scripts/verify-project.mjs` was **not** added in this pass
  either, since it could not be exercised without `node_modules`/network to
  validate it actually works — adding an unverified script would risk
  shipping a broken `npm run verify`. If you want this, it's a reasonable
  small follow-up once you have a working local install.

## 12. Items you still need to do before a real launch

1. Run `npm install` (there is no lockfile yet — this will create one;
   commit it) in an environment with normal npm registry access.
2. Run `npm run lint` and fix anything that comes up.
3. Run `npm run build` and fix any TypeScript/Next.js build errors.
4. Run `npm run start` and manually hit `/`, all 10 generator routes,
   `/about`, `/privacy`, `/terms`, `/contact`, `/robots.txt`, `/sitemap.xml`,
   and a nonexistent route (expect 404).
5. Check the site at 320/375/390/768/1024/1440px widths in a real browser.
6. Only then treat this as launch-ready.

## 13. Final launch candidate status

**Source code: no known bugs found by static review. Build/runtime: not
independently verified in this environment — you must run the commands in
§12 yourself before deploying.**

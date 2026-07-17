# TryGenHub — Phase 9 QA Report

**Date:** 2026-07-17
**Environment note:** this session's sandbox has no network access, so
`npm install`, `next build`, `tsc --noEmit`, and `eslint` could not be
executed here. Everything below was verified by **manual source review**
(reading every changed file in full, cross-checking every id against the
data layer, checking brace/paren balance) — not by a real compiler.
Before deploying, run:

```
npm install
npm run lint
npx tsc --noEmit
npm run build
```

and fix anything those surface.

## Scope

Phase 9 — User Engagement & Discovery. 9 files touched, 3 new, 6 edited.
No files removed, no routes removed, no existing props made required.

**New:**
- `lib/engagement/highlights.ts` — curated pools + deterministic
  weekly-seeded shuffle (reuses `lib/fortune/prng.ts`, no new dependency)
  backing Trending This Week and Recently Added.
- `components/home/TrendingSection.tsx` — 🔥 Trending This Week.
- `components/home/RecentlyAddedSection.tsx` — 🆕 Recently Added.

**Edited:**
- `components/home/RandomGeneratorButton.tsx` — now the premium
  "🎲 Surprise Me" / "🎲 Случайный генератор" button (Feature 1).
- `components/engagement/QuickActions.tsx` — added Copy Link, Generate
  Again, and Share; kept the existing Favorite/Random/Home actions
  (Feature 5).
- `components/home/FavoritesSection.tsx` — added a remove (×) control
  on each favorite card.
- `components/generators/GeneratorCard.tsx` — added a glowing-badge
  variant, gated on the exact strings `"NEW"` / `"НОВОЕ"` only, so every
  pre-existing `badge="New"`/`"Popular"` usage renders unchanged.
- `app/page.tsx`, `app/ru/page.tsx` — wired the two new sections into
  the existing homepage flow (both EN and RU), no other sections moved
  or removed.

## What was checked

- **Ids resolve**: every catalog id referenced in `highlights.ts` (16
  EN trending ids, 13 RU trending ids, 8 EN + 8 RU recently-added ids)
  was grepped against `data/generators.ts`, `data/tools.ts`,
  `data/calculators.ts`, and `data/instrumenty.ts` — all exist, and all
  referenced generators have `status: "available"` (Node script,
  not eyeballed).
- **Recently Added is genuinely recent**: cross-checked against actual
  filesystem mtimes of the `app/ai-*-generator` route folders — the 8
  AI generators are provably the newest content in the repo snapshot,
  not a guess.
- **No badge collision**: the existing `badge` values in
  `data/generators.ts` are `"Popular"` and `"New"` (mixed case). The new
  glow treatment only matches the exact strings `"NEW"` / `"НОВОЕ"`
  (all caps), so no existing card's appearance changes.
- **Brace/paren balance**: every new/edited `.ts`/`.tsx` file checked
  programmatically — all balanced.
- **No new CSS class name collisions**: grepped for pre-existing
  definitions of `.badge-glow-new`, `.surprise-me-btn`, `.motion-ripple`,
  `.motion-float-soft`, `.motion-toast-in` before adding — none existed;
  each new class is now defined exactly once.
- **QuickActions call sites**: `GeneratorShell.tsx`, `ToolShell.tsx`,
  `InstrumentyShell.tsx` all call `<QuickActions />` with zero props, so
  the (unchanged) `QuickActionsProps`-free signature keeps working
  everywhere.
- **RandomGeneratorButton call sites**: only `app/page.tsx` (`<RandomGeneratorButton />`)
  and `app/ru/page.tsx` (`<RandomGeneratorButton locale="ru" />`) use
  this component — no caller depends on the old label text.
- **Reduced motion**: all new animations (badge glow pulse, gradient
  shift, dice shake/spin, ripple, float, toast) are plain CSS
  `animation`/`transition` declarations, so they're automatically
  caught by the existing global `@media (prefers-reduced-motion: reduce)`
  override — no per-animation opt-out needed.
- **CLS**: `RecentlyAddedSection` is a server component with no
  date-dependent state, so it renders fully on first paint (same
  pattern as `PopularGenerators`). `TrendingSection` depends on the
  current ISO week, so — matching the existing `GeneratorOfTheDay`
  convention in this codebase — it resolves client-side on mount, but
  renders 6 fixed-size skeleton cards in the same grid immediately so
  the mount doesn't shift surrounding content.
- **Favorites removal**: `FavoritesSection`'s new × button calls the
  same `toggle()` already exposed by `useFavorites()` — no new storage
  logic, reuses `lib/engagement/store.ts` as-is.

## Not verified (needs a real build)

- TypeScript strict-mode type-checking (`navigator.share`'s DOM types,
  generic inference in `highlights.ts`) — read carefully but not
  compiled.
- ESLint (`react-hooks/exhaustive-deps` etc.) — the existing
  `eslint-disable-next-line` pattern in `QuickActions.tsx` was kept
  as-is from the prior version.
- Actual Lighthouse/CLS measurement — reasoned about, not measured.
- Visual QA of the gradient/glow animations in a real browser.

Run the four commands at the top of this report before shipping.

/**
 * Small, dependency-free deterministic hashing + PRNG helpers shared by
 * the Daily Reading and Compatibility tools.
 *
 * Both tools need "the same input always produces the same output"
 * behavior (a calendar date, or a pair of names) without any
 * server round-trip, fingerprinting, or crypto API — a simple string
 * hash seeding a small PRNG is sufficient and fully deterministic
 * across browsers/devices.
 */

/** FNV-1a 32-bit string hash. Fast, stable, good-enough distribution
 * for picking deterministic indices — not used for anything security
 * sensitive. */
export function fnv1aHash(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32 PRNG — tiny, deterministic, seeded by a 32-bit integer.
 * Returns a function that yields floats in [0, 1) on each call. */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Creates a deterministic PRNG from an arbitrary string seed. */
export function seededRandom(seed: string): () => number {
  return mulberry32(fnv1aHash(seed));
}

/** Picks a deterministic element of `items` using a seeded PRNG. */
export function pick<T>(rng: () => number, items: readonly T[]): T {
  const index = Math.floor(rng() * items.length) % items.length;
  return items[index];
}

/** Deterministic integer in [min, max] (inclusive) from a seeded PRNG. */
export function pickInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

// Deterministic RNG so the garden's wander/work/rest behavior is reproducible
// across runs, dev sessions, and screenshots (per the "seeded random in
// development" requirement). No dependency on Math.random anywhere in the
// behavior loop.

/** 32-bit FNV-1a string hash. Same string always yields the same seed. */
export function hashSeed(text) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32: small, fast, deterministic PRNG. Returns a function () => [0, 1). */
export function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Combines a world seed with a resident id into one reproducible RNG. */
export function residentRng(worldSeed, residentId) {
  return mulberry32((worldSeed ^ hashSeed(residentId)) >>> 0);
}

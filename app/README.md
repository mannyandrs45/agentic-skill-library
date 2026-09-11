# Skill Crossing

An interactive 3D skill garden built on top of `agentic-skill-library`. Every resident here is a
real skill from this repository, each tending one native Florida plant — the same catalog
`../registry/catalog.json` and `../CATALOG.md` already index. Nothing in the 3D world is
invented: a generator script reads the real `SKILL.md` files, validates them against the
registry, and produces the data this app renders. The plant each resident tends is presentation
flavor (see "Original art" below), not generated catalog data.

This app is isolated under `app/` and does not change anything in `../skills/`, `../registry/`,
or the root docs.

## What this is (and isn't)

- Residents "wander," "travel," "tend their plant," and "rest" — these are catalog-browsing
  metaphors on a deterministic schedule, not a live agent doing anything. No LLM calls, no
  provider credentials, no accounts, no GitHub mutations, no real-time activity feed.
- Clicking a resident (in the 3D scene, or the plain-HTML list beside it) shows the real skill's
  description, domain, license, author, and version, with a download of the exact `SKILL.md` and
  a link back to the source on GitHub.
- The accessible 2D list and detail panel carry every important fact on their own — the 3D scene
  is for discovery, not a requirement for using the catalog.
- Continuous animation stops under `prefers-reduced-motion: reduce`; selection, inspection, and
  download all keep working. Drag-to-orbit/scroll-to-zoom (no inertial damping) still works too,
  since it's user-initiated rather than automatic.

## Run it locally

From this directory (`app/`):

```bash
npm install
npm run dev
```

This regenerates `src/generated/residents.json` and the bundled `public/skills/*/SKILL.md`
copies before starting Vite, then serves the app at `http://localhost:5173`.

`npm run build` does the same generation step before a production build into `dist/`, so the
generated data and bundled markdown are always fresh at build time — never hand-edited.

## The generator

```bash
npm run generate
```

`scripts/generate-world.mjs`:

1. Reads `../registry/catalog.json` (the real, already-generated skill index) and cross-checks
   every entry exists on disk — this is a full validation pass over the whole real catalog, not
   just the residents below.
2. For each `{ id, path }` entry in the `RESIDENT_SELECTIONS` list at the top of the script,
   finds the catalog record at that exact path (not by name — two real skills are both literally
   named `no-ai-slop`, one upstream and one personal, so selection is by path and each gets its
   own disambiguated `id`), reads its actual `SKILL.md`, and parses `license` plus the nested
   `metadata:` block (`author`, `version`, `adapted_from`, etc.) that the root catalog builder
   doesn't need but this app's detail panel does.
3. Copies that `SKILL.md` byte-for-byte into `public/skills/<id>/SKILL.md`, so the app's download
   button works with no GitHub API call and no rate limit.
4. Emits `src/generated/residents.json` with one record per resident, including a `sha256`
   content hash of the source file (see `test/generate-world.test.mjs`, which asserts the bundled
   copy, the hash, and the real repo source all agree).

Anything missing, mismatched, or unparsable makes the script exit non-zero with a specific
failure message — it fails loudly rather than emitting a resident from partial data.

**Adding a resident** is adding one `{ id, path }` entry to `RESIDENT_SELECTIONS` in
`scripts/generate-world.mjs`, plus (optionally) a plant/theme entry for it in
`src/residents/stationThemes.js` — the pipeline (validate → copy markdown → emit data) needs no
changes. `RESIDENT_SELECTIONS` is a *selection* into the real catalog, not a second catalog: it
carries no skill content of its own, only a pointer to a real `SKILL.md` and a display id. The
plant a resident tends and its common/scientific name are presentation flavor in
`stationThemes.js`, kept separate from this generated, real-skill-only data on purpose.

Current roster (7, spanning all four collections):

| id | real skill | collection |
| --- | --- | --- |
| `grill-me` | grill-me | personal |
| `tufte-charts` | tufte-charts | personal |
| `skillopt` | skillopt | personal |
| `no-ai-slop-personal` | no-ai-slop | personal |
| `no-ai-slop-community` | no-ai-slop | no-ai-slop (upstream) |
| `ship` | ship | gstack |
| `slideshow` | slideshow | hyperframes |

## Tests

```bash
npm test
```

Runs the generator and asserts its output: the manifest shape, that the full real catalog
(80+ skills) was validated, that the two same-named `no-ai-slop` skills resolved to distinct
residents by path rather than colliding, and that the bundled `grill-me/SKILL.md` is
byte-for-byte identical to `../skills/personal/grill-me/SKILL.md`.

## Layout

```
app/
├── scripts/generate-world.mjs   # world-registry generator (see above)
├── src/
│   ├── core/                    # engine bootstrap, orbit controls, seeded RNG, reduced-motion gate
│   ├── world/                   # garden ground, ring layout, a small kit of plant shapes
│   ├── residents/               # Lumin mesh, deterministic behavior loop, plant/theme map
│   ├── ui/                      # accessible list + detail panel (plain DOM, no 3D dependency)
│   └── generated/residents.json # generator output — not hand-edited
├── public/skills/<id>/SKILL.md  # bundled exact copies for download
└── test/                        # generator smoke test
```

Modeled after Bot Crossing's `core / agents / world / ui` folder separation as a structural
pattern only — no code or art assets were copied from it. See the root `SOURCES.md`-style note
below for why.

## Original art, not reused assets

The "Lumin" resident (`src/residents/lumin.js`) is built entirely from Three.js primitives
authored for this project: a round head on a small standing body, two small glossy dark eyes
(no mouth, no glowing visor), a plain wide gardening hat and waist sash (a generic silhouette,
not any specific costume), and drifting "pollen motes." No geometry, textures, or models were
imported from Bot Crossing, or from any film, show, or other character reference — including one
supplied during development, which was used only to calibrate mood (soft, round-headed, warm-lit
against a cool background), not copied for silhouette, face treatment, material, or proportions.
Bot Crossing's own bundled art (KayKit packs by Kay Lousberg) is CC0, but isn't used here either,
regardless of license, since the brief calls for a visibly original character design.

Each resident's glow color is derived deterministically from its own id (`residentAccentColor` in
`src/residents/resident.js`), not shared by domain, so every Lumin's aura and pollen motes read as
a distinct flower color even when two residents are in the same domain. The plant kit
(`src/world/stations.js`) has three base shapes — an orchid spike, a palm, and a low fan-leaved
plant — reused with different proportions for seven real Florida native species (four orchids:
Ghost, Cowhorn, Butterfly, Clamshell; plus Royal Palm, Saw Palmetto, and Coontie); the models are
stylized primitives, not botanically exact. Which species a resident tends, and its common/
scientific name shown in the detail panel, is a presentation choice in
`src/residents/stationThemes.js`, kept separate from the generator's real skill data.

## Deploying

This is a static Vite app (`npm run build` → `dist/`) with no server-side code, so it deploys to
Vercel (or any static host) as-is: build command `npm run build`, output directory `dist`, root
directory `app`.

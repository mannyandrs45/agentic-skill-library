<picture>
  <source media="(max-width: 640px)" srcset="assets/hero-mobile.png">
  <img src="assets/hero.png" alt="Agentic Skill Library. 93 skills, 13 Personal skills, four collections and two workflow recipes." width="100%">
</picture>

<p align="center">
  <a href="https://github.com/mannyandrs45/agentic-skill-library/actions/workflows/validate.yml"><img alt="validation status" src="https://img.shields.io/github/actions/workflow/status/mannyandrs45/agentic-skill-library/validate.yml?style=flat-square&amp;label=validation&amp;labelColor=1b1b1b&amp;color=525252"></a>
</p>

<p align="center">
  A curated library of executable agent workflows. Browse a skill, inspect its decisions and guardrails, then adapt it to your harness.
</p>

## Personal

The nine new skills live in **[Personal](skills/personal/README.md)** alongside the four original exports. The collection now contains 13 user-owned skills; community snapshots remain separate.

- **Design and engineering:** [brand extraction](skills/personal/brand-extraction-handoff/SKILL.md), [reference-faithful iteration](skills/personal/reference-faithful-interface-iteration/SKILL.md), [implementation handoffs](skills/personal/implementation-handoff-builder/SKILL.md) and [safe system updates](skills/personal/stateful-system-update-guard/SKILL.md).
- **Travel:** [event-anchored trips](skills/personal/event-anchored-trip-planner/SKILL.md), [hotels](skills/personal/hotel-selector/SKILL.md), [restaurants](skills/personal/restaurant-selector/SKILL.md), [bars](skills/personal/bar-selector/SKILL.md) and [nightlife](skills/personal/nightlife-selector/SKILL.md).

## Pick a path

| I want to… | Start here |
| --- | --- |
| Find the right workflow | **[Browse all 93 skills →](CATALOG.md)** |
| Chain skills into a complete job | **[Run a workflow recipe →](docs/WORKFLOWS.md)** |
| Study complete agent systems | **[Explore community collections →](skills/community/)** |
| Reuse Manny's Computer skills | **[Open personal skills →](skills/personal/README.md)** |
| Port a skill to another agent | **[Read the portability guide →](docs/PORTABILITY.md)** |
| Add or update a skill | **[Read the contribution guide →](CONTRIBUTING.md)** |

## One library, three layers

<picture>
  <source media="(max-width: 640px)" srcset="assets/architecture-mobile.png">
  <img src="assets/architecture.png" alt="Find skills in the catalog, execute them from Personal or community, and verify source provenance and integrity." width="100%">
</picture>

Everything runnable lives in `skills/`. Everything discoverable is generated into `CATALOG.md`. Everything needed to keep the library trustworthy lives in `registry/` and `scripts/`.

```text
skills/
├── community/          # Attributed upstream systems
│   ├── gstack/
│   ├── hyperframes/
│   └── no-ai-slop/
└── personal/           # Publication-safe Perplexity Computer skills

CATALOG.md              # The only index
registry/               # Provenance and machine metadata
scripts/                # Import, sync, catalog, validate
```

That is the whole architecture. There is no parallel vault, second atlas, or duplicate navigation hierarchy.

## What is inside

<picture>
  <source media="(max-width: 640px)" srcset="assets/collection-mix-mobile.png">
  <img src="assets/collection-mix.png" alt="Skills by collection: gstack 59, HyperFrames 20, Personal 13 and no-ai-slop 1. Bars share a linear count scale." width="100%">
</picture>

| Collection | Skills | Best for |
| --- | ---: | --- |
| **[gstack](skills/community/gstack/README.md)** | 59 | Product thinking, engineering, QA, release, browser work, and long-running agent operations |
| **[HyperFrames](skills/community/hyperframes/README.md)** | 20 | Video, motion, audio, captions, and media production |
| **[Personal](skills/personal/README.md)** | 13 | Design handoffs, safe updates, travel research, editing, pressure testing, and analytical visualization |
| **[no-ai-slop](skills/community/no-ai-slop/README.md)** | 1 | Detecting and removing synthetic writing patterns without flattening voice |

## What counts as a skill

A skill is an executable operating procedure, not a persona or a bag of tips. Strong entries make six things clear:

1. **Trigger:** when the skill runs, and when it should not.
2. **Inputs:** what context it needs before acting.
3. **Workflow:** the sequence and decision branches.
4. **Tools:** what it may use and where confirmation is required.
5. **Output:** the artifact or action it must produce.
6. **Verification:** how the agent knows the work is done.

## Use the library

```bash
git clone https://github.com/mannyandrs45/agentic-skill-library.git
cd agentic-skill-library

npm ci
npm run validate
npm test
npm run sync:upstreams
npm run import:perplexity -- /path/to/exported/user/skills
```

`sync:upstreams` refreshes pinned community snapshots. `import:perplexity` imports only the publication-safe allowlist, so private Springs Labs operating playbooks remain reference-only.

The README graphics follow the portfolio's [dark visual system](docs/BRAND.md). Run `npm run visuals` to rebuild them after installing the documented graphics dependencies; counts come from the catalog, not an old banner.

The November additions include two [workflow recipes](docs/WORKFLOWS.md): reference-to-implementation and event-anchored travel. Read the [evaluation notes](docs/EVALUATION.md) for the boundary between structural validation and behavioral testing.

## Principles

- **Useful over numerous.** Every skill should change agent behavior.
- **Source stays visible.** Community work keeps its license and exact commit.
- **One front door.** The README explains; the catalog indexes.
- **Portable by design.** Workflow invariants stay separate from harness-specific tools.
- **Private means private.** Client data, credentials, and sensitive operating rules never enter the published tree.

<p align="center">
  <strong>Start with the <a href="CATALOG.md">skill catalog</a>.</strong>
</p>

# Agentic Skill Library

> A curated, inspectable vault of production-grade agent skills, operating systems, and reusable workflows.

This repository is not a list of prompts. It is a working library for studying how strong agent systems route requests, gather context, constrain tools, validate work, and preserve quality across long tasks.

The library combines four layers:

1. **Upstream collections** preserve high-signal, runnable skill systems with their original licenses and provenance.
2. **Perplexity user skills** preserve portable, user-owned skills as they run inside Computer.
3. **The vault** adds human navigation through maps of content, categories, and cross-links.
4. **The registry** provides machine-readable metadata for search, evaluation, installation, and future tooling.

## Start here

- [Atlas](ATLAS.md): the shortest route into the repository.
- [Generated catalog](CATALOG.md): every indexed skill, grouped by domain.
- [Vault](vault/README.md): Obsidian-style navigation and maps of content.
- [Architecture](docs/ARCHITECTURE.md): why the repository is structured this way.
- [Portability](docs/PORTABILITY.md): how to adapt skills across agent harnesses.
- [Sources](SOURCES.md): upstream provenance, licenses, and snapshot policy.
- [Contributing](CONTRIBUTING.md): the acceptance bar for new skills.

## Included collections

| Collection | What it contributes | Import policy |
| --- | --- | --- |
| [gstack](collections/gstack/README.md) | A complete software-building operating system with strategy, design, engineering, QA, release, browsing, and memory workflows | Full source snapshot |
| [no-ai-slop](collections/no-ai-slop/README.md) | A focused editorial skill with explicit detection and rewrite behavior | Full source snapshot |
| [HyperFrames](collections/hyperframes/README.md) | Twenty composable skills for agent-authored video, motion, media, and rendering | Skills-only snapshot |
| [Perplexity user skills](skills/perplexity-user/README.md) | Portable user-scoped skills exported from Perplexity Computer, including a 33-skill marketing system | User-owned snapshot |

## Design principles

- **Skills are executable operating procedures.** A useful skill defines triggers, inputs, tool boundaries, decision points, outputs, and verification.
- **Collections stay attributable.** Vendored upstream work keeps its license and source identity.
- **Navigation is separate from source.** Curated notes can evolve without rewriting imported projects.
- **Human and machine readers are peers.** Markdown maps support browsing; JSON supports automation.
- **Examples must be safe to publish.** Never include client secrets, private work artifacts, credentials, or personal data.
- **Quality beats volume.** A small skill with clear routing and a hard validation loop is more useful than a large prompt with vague advice.

## Repository layout

```text
.
├── collections/        # Preserved upstream source snapshots
├── skills/             # User-owned and first-party portable skills
├── vault/              # Human navigation, maps, and platform notes
├── registry/           # Machine-readable catalog and provenance
├── docs/               # Architecture and portability guidance
├── scripts/            # Catalog, validation, and sync tooling
├── ATLAS.md            # Curated front door
└── CATALOG.md          # Generated full index
```

## Local commands

```bash
npm run catalog
npm run validate
npm run sync:upstreams
npm run import:perplexity -- /path/to/exported/user/skills
```

`npm run catalog` rebuilds the generated Markdown and JSON indexes. `npm run validate` checks manifests, links, licenses, provenance, and generated-file freshness. `npm run sync:upstreams` refreshes the three upstream snapshots and updates their pinned commit identifiers.

`npm run import:perplexity -- <source-directory>` refreshes only the allowlisted, publication-safe Perplexity user skills. Sensitive business playbooks stay reference-only until a redacted public edition exists.

## Status

This is the first foundation commit. The next stage is to add independently authored skills, evaluation fixtures, compatibility adapters, and concise field notes showing why each selected workflow is worth keeping.

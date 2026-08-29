# Repository architecture

The repository separates source, interpretation, and machine metadata. That separation keeps upstream projects updateable while allowing the library to develop its own point of view.

## Collections

`collections/` holds attributable source snapshots. A collection may be an entire agent operating system or a focused skill package. Imported files are not silently normalized because directory structure, helper scripts, templates, and references are often part of the skill's actual behavior.

## Skills

`skills/` is reserved for first-party or materially adapted work. A future skill belongs here when this repository owns its maintenance and can explain its evaluation standard.

## Vault

`vault/` is the human knowledge graph. Maps of content group skills by the job they perform rather than the repository they came from. Notes use normal Markdown links so they work on GitHub and remain compatible with Obsidian.

## Registry

`registry/catalog.json` is generated from every accepted `SKILL.md`. It records name, description, source collection, path, and inferred domain. `registry/sources.json` records upstream commits and import modes. These files are the foundation for a future searchable interface, installer, compatibility matrix, or evaluation dashboard.

## Scripts

- `build-catalog.mjs` scans manifests and generates the catalog and maps.
- `validate.mjs` checks structure, metadata, provenance, licenses, and generated output.
- `sync-upstreams.mjs` refreshes source snapshots and pinned commits.

## Why not submodules?

Submodules preserve history but make casual browsing, cloning, and downstream indexing less reliable. Pinned snapshots make the repository self-contained. Exact source commits retain reproducibility, and the sync script keeps updates deliberate and reviewable.

# Personal skills

This directory contains publication-safe snapshots of user-owned skills exported from Perplexity Computer. Their source of truth is the user's Perplexity skill library rather than a public GitHub repository.

Snapshot date: 2026-08-30.

## Included systems

- **no-ai-slop:** human editing rules that preserve voice
- **grill-me:** one-question-at-a-time pressure testing
- **skillopt:** bounded skill optimization with held-out validation
- **tufte-charts:** analytical chart and table methodology

## Runtime fidelity

Files are copied with their supporting references and scripts intact. Some manifests name Perplexity-specific tools or workspace paths. Read [`docs/PORTABILITY.md`](../../docs/PORTABILITY.md) before using them in another harness.

## Deliberately withheld

The current Springs Labs skills are not committed here. They contain exact pricing, capacity thresholds, contracting terms, private operating rules, and personal business context. Their names and reasons for withholding are tracked in [`registry/perplexity-user-skills.json`](../../registry/perplexity-user-skills.json).

The import script uses an explicit allowlist. A new user skill is never published merely because it appears in the runtime directory.

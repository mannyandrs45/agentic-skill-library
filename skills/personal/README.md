# Personal skills

This directory contains publication-safe snapshots of user-owned skills exported from Perplexity Computer. Their source of truth is the user's Perplexity skill library rather than a public GitHub repository.

Latest addition: 2026-11-12. The four original exports date to 2026-08-30 and remain unchanged.

## Included systems

All 13 skills below belong to the Personal collection, including the nine November additions. The catalog may group them by task domain, but their collection and source directory remain Personal.

### Design and engineering

- **[brand-extraction-handoff](brand-extraction-handoff/SKILL.md):** measured design evidence, CSS tokens and implementation guidance.
- **[reference-faithful-interface-iteration](reference-faithful-interface-iteration/SKILL.md):** scoped visual changes checked against a concrete reference.
- **[implementation-handoff-builder](implementation-handoff-builder/SKILL.md):** complete build contracts and companion coding-agent prompts.
- **[stateful-system-update-guard](stateful-system-update-guard/SKILL.md):** configuration, source, identity and record preservation during updates.

### Travel

- **[event-anchored-trip-planner](event-anchored-trip-planner/SKILL.md):** fixed-event calendars, transport feasibility and normalized group costs.
- **[hotel-selector](hotel-selector/SKILL.md):** preference-weighted lodging comparisons with scoring and JSON references.
- **[restaurant-selector](restaurant-selector/SKILL.md):** editorial discovery, value filters and personalized dining shortlists.
- **[bar-selector](bar-selector/SKILL.md):** drinking shortlists balancing prestige, fit, value and practical access.
- **[nightlife-selector](nightlife-selector/SKILL.md):** date-specific parties, concerts and DJ nights, distinct from venue guides.

### Editing, thinking and visualization

- **[no-ai-slop](no-ai-slop/SKILL.md):** human editing rules that preserve voice.
- **[grill-me](grill-me/SKILL.md):** one-question-at-a-time pressure testing.
- **[skillopt](skillopt/SKILL.md):** bounded skill optimization with held-out validation.
- **[tufte-charts](tufte-charts/SKILL.md):** analytical chart and table methodology.

## Runtime fidelity

Files are copied with their supporting references and scripts intact. Source manifests are preserved, not silently rewritten or installed back into Computer. The November source hashes are recorded in [`registry/personal-snapshots.json`](../../registry/personal-snapshots.json).

Some manifests name Perplexity-specific tools or workspace paths. Read [`docs/PORTABILITY.md`](../../docs/PORTABILITY.md) before using them in another harness. The [workflow recipes](../../docs/WORKFLOWS.md) show how to combine the additions without running every skill on every task.

These are source snapshots, not a claim that every workflow has been exercised end to end in every harness. See [evaluation scope and fixtures](../../docs/EVALUATION.md) before relying on them.

## Deliberately withheld

The current Springs Labs skills are not committed here. They contain exact pricing, capacity thresholds, contracting terms, private operating rules, and personal business context. Their names and reasons for withholding are tracked in [`registry/perplexity-user-skills.json`](../../registry/perplexity-user-skills.json). Workiva-specific material, project credentials, account identifiers and personal travel records are also outside this export.

The import script uses an explicit allowlist. A new user skill is never published merely because it appears in the runtime directory.

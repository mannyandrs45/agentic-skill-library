# Contributing

The goal is not to accumulate every prompt on the internet. The goal is to preserve and study skills that materially improve an agent's judgment, process, or output.

## Acceptance bar

A proposed skill should satisfy most of these criteria:

- **Specific trigger:** it is clear when the skill should and should not run.
- **Procedural depth:** it contains a workflow, not a persona paragraph.
- **Decision structure:** important branches and dependencies are explicit.
- **Tool discipline:** allowed actions and confirmation boundaries are legible.
- **Verification:** the skill defines how the agent knows the work is done.
- **Portability:** harness-specific assumptions are isolated or documented.
- **Provenance:** author, source, version, and license are known.
- **Safe example:** the skill can be demonstrated without private data.

## Add a first-party skill

1. Create `skills/personal/<skill-name>/SKILL.md`.
2. Add YAML frontmatter with at least `name` and `description`.
3. Keep supporting references inside the same skill directory.
4. Add an evaluation note or fixture that exercises both a positive and negative trigger.
5. Run `npm run catalog` and `npm run validate`.

Recommended frontmatter:

```yaml
---
name: example-skill
description: What it does and the concrete situations that should trigger it.
version: 0.1.0
license: MIT
source: first-party
---
```

## Add an upstream collection

1. Confirm the license permits redistribution.
2. Add the source to `registry/sources.json`.
3. Import it under `skills/community/<collection-name>/`.
4. Preserve the upstream license.
5. Extend `scripts/sync-upstreams.mjs`.
6. Explain why the collection earns a place in the vault.

## Pull request checklist

- [ ] No credentials, private URLs, client names, or personal data
- [ ] Provenance and license included
- [ ] Trigger and non-trigger behavior are clear
- [ ] Verification is explicit
- [ ] Generated catalog rebuilt
- [ ] `npm run validate` passes

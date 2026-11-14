---
name: brand-extraction-handoff
description: "Extract website design systems into evidence-backed DESIGN.md, framework-neutral CSS tokens, and an implementation handoff. Use for brand extraction, reverse-engineering a site's visual system, or turning reference URLs into design guidance. Not for building websites, copying proprietary assets, or writing brand strategy."
---

# Brand Extraction + Design Handoff

Turn public website references into an implementable design specification without presenting a reverse-engineered system as official.

## Scope and defaults

- Accept one canonical URL and optionally up to five supporting URLs. Ask for a URL if none is provided. Screenshots may supplement inspection but cannot establish computed CSS values.
- Default to one brand, a framework-neutral handoff, and three files: `DESIGN.md`, `tokens.css`, and `HANDOFF.md`.
- Keep marketing, documentation, and product UI systems separate when their tokens differ. Do not blend multiple brands into one palette.
- Inspect public pages only unless the user explicitly authorizes another source. Do not bypass authentication. Never require a Claude Design subscription for this workflow.
- Extract and prepare a handoff only. Building a website, publishing, modifying a repository, or republishing assets requires a separate request.

## Workflow

1. **Set inspection scope.** Record the canonical URL, supporting pages, final URLs after redirects, extraction date, and intended downstream use when supplied. Select representative marketing, pricing, docs, or public product pages as available. Do not force irrelevant page types.
2. **Collect evidence.** Inspect the rendered site and computed CSS for representative hero, body text, navigation, buttons, cards, and inputs. Use rendered browser inspection when page text or source markup cannot establish the visual system. Never treat fetched HTML alone as computed CSS. Record each measurement's page, selector or element label, viewport, property, value, and interaction state.
3. **Check variation.** Sample widths of 375, 1024, and 1440 CSS pixels where inspection supports viewport changes. Record actual viewport dimensions. Check visible focus/hover states where feasible without submitting forms or triggering transactions. Identify fluid typography and layout transitions; do not claim an exact breakpoint from three samples alone.
4. **Resolve the system.** Separate recurring patterns from exceptions. Create functional token names such as `--color-bg`, `--color-surface`, and `--color-accent`. Preserve distinct page-family namespaces if needed. Classify each finding using the evidence rules below before deriving implementation recommendations.
5. **Write the deliverables.** Follow the output contracts below. Keep the nine main `DESIGN.md` sections to roughly 150 words each, excluding compact tables. Provide useful component recipes rather than exhaustive stylesheet dumps.
6. **Verify consistency.** Cross-check token names and values across all files, source coverage, alpha colors, font availability, responsive claims, and uncertainty labels. Confirm no fabricated values or proprietary assets entered the handoff. Report inaccessible surfaces and untested states.

Completion means all three files agree, every extracted implementation token has traceable evidence, and remaining assumptions are explicit. If inspection cannot support reliable extraction, deliver clearly labeled partial findings and a handoff that requires validation rather than pretending the task is complete.

## Evidence and confidence

Use four evidence labels:

- **Measured:** Computed CSS or rendered geometry observed on a named element at a recorded viewport/state.
- **Declared:** A value found in source CSS or an asset declaration but not verified as applied. A declared font stack does not prove which font rendered.
- **Inferred:** A visual or pattern interpretation, explicitly labeled. Do not guess precise hex colors, dimensions, or font identities from screenshots.
- **Proposed:** A downstream recommendation or adaptation, never described as extracted.

Assign confidence per main section: HIGH for representative measured evidence; MEDIUM for incomplete measurements or strong repeated patterns; LOW for sparse, screenshot-only, declared-only, or inaccessible evidence. Explain the main limitation beside each label.

A font may be declared, loaded, or verified as rendered; report only the status actually established. Preserve fallback stacks. Do not supply font binaries or imply a license.

Convert opaque computed RGB colors to hexadecimal exactly. Preserve transparency with eight-digit hex or separate opacity; do not drop alpha. Keep gradients as gradients, referencing their measured stops. Treat `clamp()`, percentages, and viewport units as fluid rules, not fixed scales.

Record absent components as "not observed," not as invented brand conventions. Patterns not seen in a sample are not proof of an explicit prohibition.

## Output contracts

### DESIGN.md

Header: brand/site label, extraction date, inspected URLs, viewports, scope limits, and "Reverse-engineered from public pages; not an official design system. Trademarks and assets belong to their respective owners."

Use these nine sections:

1. **Visual Theme & Atmosphere:** Concrete observations about hierarchy, density, imagery, rhythm, and visual character. Avoid marketing copy.
2. **Color Palette & Roles:** Functional names, hex values, usage, evidence labels, and evidence IDs.
3. **Typography Rules:** Font stacks and verification status, roles, measured sizes/line heights/weights/tracking, and fluid behavior. Do not invent a modular ratio.
4. **Component Stylings:** Primary/secondary buttons, cards, inputs, and navigation when observed. Include states, radii, padding, borders, and missing coverage.
5. **Layout Principles:** Containers, gutters, grids, spacing patterns, alignment, and density.
6. **Depth & Elevation:** Measured shadows, borders, overlays, and layering; identify absence only within inspected scope.
7. **Do's and Don'ts:** Observed conventions plus clearly labeled implementation guardrails. Tie each guardrail to evidence; never claim the brand explicitly bans an unobserved pattern.
8. **Responsive Behavior:** Measured viewport differences, wrapping, navigation changes, fluid values, and unresolved breakpoints.
9. **Agent Prompt Guide:** A concise preservation/adaptation/rejection brief grounded in findings, not generic anti-AI-design slogans.

End each section with its confidence and limitation. Append:

- `## Inferred vs Observed`: Important assumptions, contradictions, page-family differences, and recommendations requiring validation.
- `## Evidence Register`: IDs with URL, element/selector, viewport/state, property/value, and evidence type. Cite external URLs inline where findings are used; the register supplies element-level traceability.

### tokens.css

- Use framework-neutral CSS custom properties in `:root`, grouped by color, typography, spacing, geometry, and elevation.
- Include measured reusable values only by default. Declared-only values may be included if useful and marked unverified beside their evidence ID.
- Do not place visually guessed exact values or proposed replacement values in the extracted token set.
- Preserve units, alpha, fallbacks, and fluid expressions. Add responsive overrides only when supported; do not invent media-query cutoffs.
- Use separate named scopes for genuinely different page-family systems.
- Add concise comments linking tokens to evidence IDs. This file is a starting token layer, not a complete recreation of the site's CSS.

### HANDOFF.md

Include intended use, file roles, required assets/fonts and their licensing or availability uncertainty, implementation priorities, and validation gaps.

Provide a copyable framework-neutral agent prompt that instructs the next agent to:

- Read `DESIGN.md` and `tokens.css` before implementing.
- Preserve the defining measured hierarchy, typography, color roles, layout rhythm, and component geometry.
- Adapt content and page structure to the new product without assuming all reference-site components are appropriate.
- Keep proposed additions distinct from extracted conventions.
- Use original or properly licensed assets, not copied logos, photography, or proprietary fonts.
- Check desktop/mobile layouts, focus visibility, keyboard behavior, contrast, and long-content wrapping. Flag any accessibility-driven departure from the reference.
- Resolve LOW-confidence findings before claiming reference fidelity.
- Avoid specific mismatched treatments identified in the extraction, without inventing official brand prohibitions.

Do not hard-code a framework, promise pixel-perfect reproduction, or require deployment.

## Failure handling

- **Blocked or inaccessible page:** Report it and use permitted public alternatives or user-supplied screenshots. Downgrade affected confidence; do not claim computed values from screenshots.
- **Dynamic typography:** Retain available fluid expressions and list sizes at inspected widths instead of forcing a modular scale.
- **Auth-gated dashboard:** Keep public marketing findings separate from dashboard unknowns. Marketing screenshots do not verify app interaction states.
- **Conflicting page families:** Split token scopes and document differences rather than averaging values.
- **Uninspectable exact values:** Omit them or state unknown. Propose a fallback only in the handoff and label it Proposed.

## Example

Input: "Extract this site's design system and give me a handoff for another coding agent: [canonical URL]."

Output: `DESIGN.md` with nine sections and an evidence register; `tokens.css` with measured functional tokens; `HANDOFF.md` with a portable implementation prompt and validation checklist. If no input is observed, the report says "Input: not observed"; it does not invent an input style.

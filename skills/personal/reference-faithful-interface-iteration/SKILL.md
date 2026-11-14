---
name: reference-faithful-interface-iteration
description: "Build and revise concrete reference-driven interfaces, diagrams, slides, and graphics through scoped visual changes and target-render QA. Load when the user supplies or iterates on an existing visual, screenshot, video, or named design reference; do not load for generic design ideation without a concrete artifact or reference."
---

# Reference-Faithful Interface Iteration

Translate a concrete visual reference into an interface without replacing its structure with a thematic approximation or disturbing working behavior during revisions.

## Workflow

1. Build a fidelity contract before editing.
   - Inspect every supplied screenshot, video, annotated image, and named visual reference.
   - Record observable constraints for composition and geometry, palette and contrast, typography and copy density, subject treatment, motion and interaction path, target host, and requested viewports.
   - Keep literal invariants in a cumulative keyed ledger: dimensions, displayed values, orientation, asset identity, and target format. Apply each correction to its named key and preserve all other keys; do not infer an unrequested transformation. When the user asks for an exact match, verify every key plus the reference's spatial relationships and density in the render before adding stylistic ideas.
2. Scope the revision.
   - Inventory the content, interactions, and layouts that already work.
   - Map each requested change to its affected visual layer or component.
   - Keep unrelated layers stable. A palette-only pass must not reopen repaired geometry; a copy-density pass must not remove interaction details that remain available on demand.
3. Fix the dominant structure first.
   - Implement the reference-defining silhouette, path, grid, or node geometry before polish.
   - Match the reference's information density. Remove unrequested labels, controls, badges, and explanatory copy when they compete with the primary visual. When diagram columns express the same point in different wording, consolidate it under the component it describes without changing the approved layout.
   - Prefer one legible interaction and progressive disclosure over persistent interface furniture when the reference is sparse.
4. Verify the real target render.
   - Render in the destination environment when its font metrics, asset handling, or viewport can change the result.
   - Capture every requested viewport. For interactive artifacts, exercise the primary interaction, reset state, and content-reveal states.
   - Compare the captures with the fidelity contract in this order: geometry and silhouette, spacing and density, palette and type, then motion and interaction states.
   - Correct the largest visible mismatch and rerender. Do not declare success from source inspection or an isolated asset preview.
5. Close with evidence.
   - Report the requested changes, the preserved behavior, the host or viewports checked, and any remaining mismatch.
   - Keep the report shorter than the artifact review unless the user asks for design rationale.

## Completion check

- Every literal invariant is visible in the target render.
- Every requested edit maps to an observable change.
- Unrequested working behavior remains intact.
- The actual host shows no text collisions, clipping, or overflow at the checked viewports.
- For interactive artifacts, the primary interaction and reset path work on each requested input mode.

## Gotchas

- A web-shaped background is not a web-based layout; when geometry carries the concept, place real elements on that geometry.
- Local SVG or source-file inspection can miss host font substitution. Inspect the rendered destination; for static graphics with unstable text metrics, use conservative fixed spacing and a host-stable rendered asset.
- Do not fill sparse reference art with explanatory copy or controls. Keep details behind hover, selection, or the single interaction the concept needs.
- Once a stable layout passes, map a supplied palette onto explicit visual roles without changing the geometry again.
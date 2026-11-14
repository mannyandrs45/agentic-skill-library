---
name: implementation-handoff-builder
description: "Create self-contained Markdown implementation handoffs and companion prompts from project discussions, repository context, and fixed constraints. Load when the user asks for a build instruction set, architecture handoff, or prompt for a coding agent; do not load when the user wants the code changed directly."
---

# Implementation Handoff Builder

Turn a settled project discussion into an authoritative handoff another implementation agent can execute without re-deriving scope.

## Workflow

1. Reconstruct the settled state before drafting.
   - Read available repository files, artifacts, prior outputs, and corrections.
   - Separate verified current state, user-approved direction, assumptions, and unresolved items.
   - Build a constraint ledger containing the objective, working pieces, in-scope deliverables, non-goals, exact interfaces or values, access boundaries, target environments, packaging requirements, known failures, and deferred decisions.
   - Mark unavailable facts as requiring validation rather than turning them into implementation claims.
2. Freeze scope mechanically.
   - Copy exact names, strings, schemas, paths, and read/write boundaries into the handoff where they determine correctness.
   - Pair each non-negotiable constraint with an observable acceptance check.
   - When a correction supersedes an earlier rule, replace the stale rule throughout the architecture, plan, tests, and companion prompt; do not append a conflicting exception.
3. Design an executable transfer.
   - Explain the architecture and the reason for consequential boundaries.
   - When several deliverables encode the same data or state, name one authoritative source and map each derivative as generated, manually maintained, or written back. Include the rebuild order and a cross-artifact reconciliation check.
   - Order work from the user's verified current state so every prerequisite input, configuration, or object exists before the action that consumes it. Divide the work into reviewable vertical slices; for each phase, name the affected files or systems, concrete deliverable, completion check, and stop or review point.
   - State whether the recipient should execute only the next phase or the full plan.
   - Ask only when the answer would materially change architecture, authorization, or scope. Otherwise choose the smallest reversible option and label the assumption.
4. Close the contract.
   - Map requirements to observable acceptance checks.
   - List requested deliverables and packaging targets. For cross-format deliverables, distinguish editable source, import-ready file, and runtime-native object; preserve the target template in the import file.
   - Separate blocked decisions, intentionally deferred work, and optional follow-ons.
5. Deliver both artifacts in full.
   - Make the handoff the durable source of truth.
   - Add a shorter companion prompt that tells the next agent how to inspect, execute, validate, and report against it.
   - After a correction, reissue the complete affected artifact rather than only a patch unless the user explicitly requests a delta.

## Output contract

```markdown
# [Project] — Implementation Handoff
**Status:** [verified current state]

## 1. Objective and target outcome
## 2. Current state and source artifacts
| Item | State | Source or validation status |
|---|---|---|

## 3. Scope contract
### In scope
### Non-goals
### Fixed interfaces, values, and access boundaries

## 4. Architecture and data flow
## 5. Execution plan
### Phase [N] — [vertical slice]
- Changes:
- Files or systems:
- Completion check:
- Stop or review point:

## 6. Validation and acceptance
| Requirement | Observable check |
|---|---|

## 7. Deliverables and packaging
## 8. Open items and deferred work

# Companion implementation prompt
You are [implementation role].
Read `[handoff path or attachment]` as the authoritative specification.
Before editing, report [current-state findings, planned files, and blockers].
Execution scope: [next phase only / full plan].
Preserve: [fixed contracts].
Do not: [non-goals and prohibited actions].
Validate with: [checks or commands].
Finish with: [files changed, checks and results, unresolved items].
Ask only if an answer would materially change architecture, authorization, or scope.
```

## Gotchas

- Do not rely on labels such as “fixed” or “frozen” alone; preserve literal contracts and add a pass/fail check that detects drift.
- Do not reintroduce an excluded integration, write action, or merged adapter in the execution plan; repeat those boundaries in the companion prompt and acceptance checks.
- Do not return a recap, partial patch, or plan without the requested transfer artifact; provide the complete handoff and companion prompt together.
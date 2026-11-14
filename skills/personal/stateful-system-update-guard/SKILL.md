---
name: stateful-system-update-guard
description: "Preserves configuration, data sources, deployment identity, runtime records, and live behavior while updating deployed apps or automations. Use for an existing system's code change, static-data refresh, or redeploy; do not use for greenfield builds, purely visual edits, or implementation handoffs with no live target."
---

# Stateful System Update Guard

Preserve the operational identity and durable state of an existing system while changing it. Inspect the real source and live target before editing; a merged change or successful local test is not proof that the working system still reads the intended state.

## Workflow

1. **Map the current state.** Inspect both source configuration and the live system. Record each item in this table:

   | Item | Owner / system of record | Read path | Write path | Lifecycle | Must preserve | Live check |
   |---|---|---|---|---|---|---|
   | code or artifact | | | | versioned | | |
   | deployment identity | | | | stable | | |
   | configuration | | | | environment-scoped | | |
   | external data source | | | | live or manual | | |
   | mutable records or logs | | | | durable or ephemeral | | |
   | generated cache or fallback | | | | replaceable | | |

   Include existing file names, public URLs, artifact or service identifiers, environment-key names, refresh behavior, and backing stores. Never copy secret values into the map. Mark anything unverified as `unknown` instead of inferring it from documentation or a completed merge.

2. **Declare the preservation contract.** Assign every row one action: `preserve in place`, `migrate`, `regenerate`, or `retire`. Keep stable names, URLs, identifiers, configuration, and records unchanged unless the requested change requires otherwise. For each mutable item, state whether it survives a process restart and a redeploy. For each external source, state whether it is primary, fallback, or manual and when it refreshes.

3. **Make the narrow change.** Touch only components named in the contract. Keep all readers and writers pointed at the same owner. If ownership or schema must change, migrate existing state before switching the consumer; do not create a parallel version or silently start an empty store.

   When migrating to a serverless runtime with a read-only code directory, route every runtime file producer through the app's writable-data resolver, such as `get_data_dir()`. Include rebuildable caches and derived outputs, not just durable logs; otherwise a refresh can still fail on a repository-relative write.

   If a GitHub push fails to trigger a Vercel build and direct production deployment is forbidden, create an empty commit with `--allow-empty`. Push it to the same production branch to retrigger the existing integration.

4. **Verify the live path.** Confirm the expected revision or artifact is active, stable identities still resolve, configured sources return the intended mode and data, and representative records travel from producer to store to consumer. When durability is part of the request, test a restart or redeploy when feasible; otherwise report that check as pending.

   When a redeploy can erase a cache required for live output, test startup with that cache absent and its upstream unavailable. Exercise a fallback backed by existing source data when available, and report its cutoff instead of implying a fresh upstream read.

5. **Report the result by boundary.** Use this compact shape:

   ```text
   Preserved:
   Changed:
   Live checks:
   Unverified or blocked:
   Rollback point:
   ```

   If an output is empty or stale, name the first failing boundary rather than collapsing generation, persistence, synchronization, and rendering into one diagnosis.

## Gotchas

- Do not treat a successful edit, merge, or local validation as proof of correct live state. Inspect the live consumer and the state source it actually uses.
- If a changed deployment breaks a primary live path, stop planned work and restore availability with the smallest rollback or hotfix that preserves recoverable state. For an outage caused by an unverified-volume gate, separate failed writes from unverified redeploy durability. Require explicit approval before restoring service with temporary local logging. Preserve commit-before-display and block actual write failures. Show unverified durability as a warning instead of blocking successful local writes. Resume only after the live target serves the expected revision and representative routes.
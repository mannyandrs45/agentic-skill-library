# Sources and provenance

The `collections/` directory contains source snapshots from external repositories. Each collection retains its upstream license. The top-level MIT license applies only to original curation, scripts, registry files, and documentation in this repository; it does not replace collection-specific licenses.

## Snapshot policy

- Imported source is kept structurally close to upstream.
- Curated commentary lives outside imported directories whenever possible.
- `registry/sources.json` pins the exact upstream commit used by the current snapshot.
- `npm run sync:upstreams` refreshes snapshots and provenance together.
- Pull requests that change imported files without updating provenance should fail validation.

## Current upstreams

### gstack

- Repository: https://github.com/garrytan/gstack
- License: MIT
- Scope: full repository snapshot, excluding Git metadata
- Local path: `collections/gstack/`

### no-ai-slop

- Repository: https://github.com/petergyang/no-ai-slop
- License: MIT
- Scope: full repository snapshot, excluding Git metadata
- Local path: `collections/no-ai-slop/`

### HyperFrames

- Repository: https://github.com/heygen-com/hyperframes
- License: Apache-2.0
- Scope: `skills/` plus the upstream license
- Local path: `collections/hyperframes/`

## Attribution rules

Do not strip copyright notices, authorship, licenses, or upstream links. Adapted skills should live in a new first-party directory, name the source material, explain the changes, and use a license compatible with the original.

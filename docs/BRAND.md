# Library visual system

The GitHub graphics reuse the portfolio's dark Astryx Neutral direction rather than introducing a separate brand. The reference is the local portfolio revision `38ddf7b`: its oversized Figtree typography, white and gray hierarchy, charcoal surfaces, quiet borders and monochrome voxel office.

## Fixed visual choices

- **Palette:** background `#1b1b1b`, surface `#262626`, primary `#ffffff`, secondary `#9e9e9e`, border `#3b3b3b`.
- **Typography:** Figtree, 400/600/700. Outline the SVG lettering so GitHub cannot substitute a different font.
- **Artwork:** `assets/agentcraft-office.webp` is the same cover used by the portfolio. Do not replace it with generic network nodes, gradients or a new mascot.
- **Charts:** compare actual catalog counts on one shared linear scale. Highlight Personal with white, use neutral gray for community collections, and do not imply quality or adoption from skill counts.
- **GitHub constraints:** the graphics remain dark regardless of the viewer's GitHub theme. Markdown text, tables and navigation retain GitHub's native typography and theme; a README cannot override the surrounding GitHub interface.
- **Responsive output:** each desktop PNG has a separately composed mobile counterpart selected by a `picture` element. Alt text and the native Markdown count table keep the content available without relying on the image.

## Rebuild

Install Node development dependencies with `npm ci` and Python fontTools with `pip install -r scripts/requirements-visuals.txt`. Run `npm run catalog`, then `npm run visuals`; do not hand-edit generated SVG, PNG or `assets/visuals-manifest.json`.

The generator derives collection totals, Personal count, domain count and recipe count from the current repository. After adding/removing skills or recipes, rebuild the visuals and run `npm test`; the visual metadata checks detect stale counts.

Figtree is bundled with its original [SIL Open Font License](../assets/fonts/OFL.txt). The font and license were retrieved from the [Google Fonts Figtree directory](https://github.com/google/fonts/tree/main/ofl/figtree); no portfolio code or design-system package is redistributed here.

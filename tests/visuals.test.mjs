import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { root } from "../scripts/snapshot-personal.mjs";

const json = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));
const catalog = await json("registry/catalog.json");
const visuals = await json("assets/visuals-manifest.json");

test("visual counts match the catalog and workflow recipes", async () => {
  assert.equal(visuals.catalogCount, catalog.count);
  const counts = {};
  for (const skill of catalog.skills) counts[skill.collection] = (counts[skill.collection] ?? 0) + 1;
  assert.deepEqual(visuals.collectionCounts, counts);
  assert.equal(visuals.personalCount, counts["perplexity-user"]);
  assert.equal(visuals.domainCount, new Set(catalog.skills.map((skill) => skill.domain)).size);
  assert.equal(visuals.workflowCount, (await readFile(path.join(root, "docs/WORKFLOWS.md"), "utf8")).match(/\n## /g).length);
});

test("desktop and mobile visual assets exist and declare an accessible description", async () => {
  for (const name of ["hero", "collection-mix", "architecture"]) {
    for (const suffix of ["", "-mobile"]) {
      await access(path.join(root, `assets/${name}${suffix}.png`));
      const svg = await readFile(path.join(root, `assets/${name}${suffix}.svg`), "utf8");
      assert.match(svg, /<title id="title">.+<\/title>/);
      assert.match(svg, /<desc id="desc">.+<\/desc>/);
      assert.match(svg, /#1b1b1b/);
      assert.doesNotMatch(svg, /#F5EBD9|#EC451C|#1A29E1/i);
    }
  }
});

test("portfolio artwork is visible in the rendered hero, not silently dropped", async () => {
  const stats = await sharp(path.join(root, "assets/hero.png"))
    .extract({ left: 900, top: 170, width: 350, height: 300 }).stats();
  assert.ok(stats.channels[0].stdev > 15, "Hero artwork region is blank or nearly flat.");
});

test("the Personal landing page directly links every exported skill", async () => {
  const readme = await readFile(path.join(root, "skills/personal/README.md"), "utf8");
  for (const skill of catalog.skills.filter((item) => item.collection === "perplexity-user")) {
    assert.ok(readme.includes(`](${skill.name}/SKILL.md)`), skill.name);
  }
});

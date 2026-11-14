import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileHashes, root } from "../scripts/snapshot-personal.mjs";
import { frontmatter } from "../scripts/lib/frontmatter.mjs";

const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));
const snapshots = await readJson("registry/personal-snapshots.json");
const fixtures = await readJson("tests/fixtures/personal-skill-evals.json");
const registry = await readJson("registry/perplexity-user-skills.json");
const catalog = await readJson("registry/catalog.json");

test("each reviewed export has fixtures and an allowlist entry", () => {
  const names = snapshots.skills.map((skill) => skill.name).sort();
  assert.equal(names.length, 9);
  assert.equal(new Set(names).size, 9);
  assert.deepEqual(fixtures.cases.map((item) => item.skill).sort(), names);
  for (const name of names) assert.ok(registry.included.includes(name), name);
});

test("new catalog entries belong to the intended task domains", () => {
  const expected = {
    "brand-extraction-handoff": "design",
    "reference-faithful-interface-iteration": "design",
    "implementation-handoff-builder": "engineering",
    "stateful-system-update-guard": "quality-and-release",
    "event-anchored-trip-planner": "travel",
    "hotel-selector": "travel",
    "restaurant-selector": "travel",
    "bar-selector": "travel",
    "nightlife-selector": "travel",
  };
  for (const [name, domain] of Object.entries(expected)) {
    assert.equal(catalog.skills.find((item) => item.path === `skills/personal/${name}/SKILL.md`)?.domain, domain, name);
  }
});

for (const snapshot of snapshots.skills) {
  test(`${snapshot.name}: manifest, complete tree, references and fixture specification`, async () => {
    const directory = path.join(root, snapshot.path);
    assert.deepEqual(await fileHashes(directory), snapshot.sha256,
      "Source changed or a supporting file was added/dropped; review before updating hashes.");
    const source = await readFile(path.join(directory, "SKILL.md"), "utf8");
    const meta = frontmatter(source);
    assert.equal(meta.name, snapshot.name);
    assert.ok(meta.description.length > 30);
    assert.ok(!/^[>|][-+]?$/.test(meta.description));
    const entry = catalog.skills.find((item) => item.path === `${snapshot.path}/SKILL.md`);
    assert.ok(entry, "Missing catalog entry");
    assert.equal(entry.collection, "perplexity-user", "New exports must remain in Personal.");
    assert.equal(entry.description, meta.description);
    for (const match of source.matchAll(/(?:references|scripts|templates|assets)\/[\w./-]+\.[a-z]+/g)) {
      await access(path.resolve(directory, match[0]));
    }
    for (const [relative] of Object.entries(snapshot.sha256)) {
      if (!relative.endsWith(".md")) continue;
      const full = path.join(directory, relative);
      const markdown = await readFile(full, "utf8");
      for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
        if (/^(https?:|mailto:|#)/.test(match[1])) continue;
        await access(path.resolve(path.dirname(full), decodeURIComponent(match[1].split("#")[0])));
      }
    }
    const fixture = fixtures.cases.find((item) => item.skill === snapshot.name);
    assert.equal(fixture.positive.length, 2);
    assert.equal(new Set(fixture.positive).size, 2);
    for (const prompt of fixture.positive) assert.ok(prompt.length > 20);
    assert.ok(fixture.negative.length > 20);
    assert.ok(fixture.expectedOutput.length > 20);
    assert.ok(fixture.mustPreserve.length >= 3);
    assert.ok(fixture.mustStopBefore.length > 20);
  });
}

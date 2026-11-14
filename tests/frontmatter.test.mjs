import assert from "node:assert/strict";
import test from "node:test";
import { frontmatter } from "../scripts/lib/frontmatter.mjs";

test("quoted and unquoted scalar descriptions", () => {
  for (const value of ['"A useful description."', "'A useful description.'", "A useful description."]) {
    assert.equal(frontmatter(`---\nname: example\ndescription: ${value}\n---\nBody`).description,
      "A useful description.");
  }
});

for (const marker of [">", ">-", ">+", "|", "|-", "|+"]) {
  test(`normalizes YAML ${marker} description to a catalog sentence`, () => {
    const meta = frontmatter(`---\nname: example\ndescription: ${marker}\n  First line.\n  Second line.\nlicense: MIT\n---\nBody`);
    assert.equal(meta.description, "First line. Second line.");
    assert.equal(meta.name, "example");
    assert.equal(meta.license, "MIT");
  });
}

test("missing frontmatter does not fabricate fields", () => {
  assert.deepEqual(frontmatter("# Plain Markdown"), {});
  assert.deepEqual(frontmatter("---\nname: unterminated"), {});
});

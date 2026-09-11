import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoRoot = path.dirname(appRoot);

test("generator produces valid, source-identical resident data", async () => {
  execFileSync(process.execPath, ["scripts/generate-world.mjs"], {
    cwd: appRoot,
    stdio: "inherit",
  });

  const manifest = JSON.parse(
    await readFile(path.join(appRoot, "src/generated/residents.json"), "utf8"),
  );

  assert.equal(manifest.schemaVersion, 1);
  assert.ok(manifest.residentCount >= 1, "expected at least one generated resident");
  assert.ok(manifest.catalogSkillCount >= 80, "expected the full real catalog to be validated");

  const grillMe = manifest.residents.find((r) => r.id === "grill-me");
  assert.ok(grillMe, "grill-me resident must be present");
  assert.equal(grillMe.sourcePath, "skills/personal/grill-me/SKILL.md");
  assert.equal(grillMe.markdownAsset, "/skills/grill-me/SKILL.md");
  assert.ok(grillMe.description.length > 0);

  // The bundled public copy must be byte-for-byte identical to the real
  // repo source, and its recorded hash must match both.
  const realSource = await readFile(
    path.join(repoRoot, "skills/personal/grill-me/SKILL.md"),
    "utf8",
  );
  const bundledCopy = await readFile(
    path.join(appRoot, "public/skills/grill-me/SKILL.md"),
    "utf8",
  );
  assert.equal(bundledCopy, realSource, "bundled SKILL.md must be an exact copy of the source");

  const expectedHash = `sha256:${createHash("sha256").update(realSource).digest("hex")}`;
  assert.equal(grillMe.contentHash, expectedHash);
});

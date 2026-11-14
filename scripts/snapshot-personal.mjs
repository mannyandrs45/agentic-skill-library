// Generate integrity metadata for a reviewed export. This does not certify privacy
// or behavior. Review content and source identity before accepting new hashes.
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = fileURLToPath(new URL("../", import.meta.url));

export async function fileHashes(directory) {
  const hashes = {};
  async function visit(current) {
    for (const entry of (await readdir(current, { withFileTypes: true }))
      .sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(current, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Snapshot cannot include symlink: ${full}`);
      if (entry.isDirectory()) await visit(full);
      if (entry.isFile()) {
        const relative = path.relative(directory, full).split(path.sep).join("/");
        hashes[relative] = createHash("sha256").update(await readFile(full)).digest("hex");
      }
    }
  }
  await visit(directory);
  return hashes;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const fixtures = JSON.parse(await readFile(
    path.join(root, "tests/fixtures/personal-skill-evals.json"), "utf8",
  ));
  const registry = JSON.parse(await readFile(
    path.join(root, "registry/perplexity-user-skills.json"), "utf8",
  ));
  const skills = [];
  for (const fixture of fixtures.cases) {
    skills.push({
      name: fixture.skill,
      source: `Perplexity Computer user:${fixture.skill}`,
      path: `skills/personal/${fixture.skill}`,
      sha256: await fileHashes(path.join(root, "skills/personal", fixture.skill)),
    });
  }
  await writeFile(path.join(root, "registry/personal-snapshots.json"), JSON.stringify({
    schemaVersion: 1,
    snapshotDate: registry.snapshotDate,
    policy: "Verbatim user-owned source export; host adapters are documented separately.",
    skills,
  }, null, 2) + "\n");
  console.log(`Recorded source hashes for ${skills.length} reviewed skill snapshots.`);
}

import { access, cp, readFile, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const sourceRoot = process.argv[2];

if (!sourceRoot) {
  console.error("Usage: npm run import:perplexity -- /path/to/exported/user/skills");
  process.exit(1);
}

const registry = JSON.parse(
  await readFile(path.join(root, "registry/perplexity-user-skills.json"), "utf8"),
);
const destinationRoot = path.join(root, "skills/personal");

for (const name of registry.included) {
  const source = path.resolve(sourceRoot, name);
  const destination = path.join(destinationRoot, name);
  try {
    await access(path.join(source, "SKILL.md"));
  } catch {
    throw new Error(`Missing allowlisted skill manifest: ${source}/SKILL.md`);
  }
  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true });
  console.log(`Imported ${name}`);
}

execFileSync(process.execPath, ["scripts/build-catalog.mjs"], {
  cwd: root,
  stdio: "inherit",
});

console.log(
  `Imported ${registry.included.length} publication-safe user skills. ` +
    `${registry.referenceOnly.length} private skills remained reference-only.`,
);

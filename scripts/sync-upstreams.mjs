import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const sourcesPath = path.join(root, "registry/sources.json");
const registry = JSON.parse(await readFile(sourcesPath, "utf8"));
const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agent-skills-sync-"));

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "inherit"] : "inherit",
    env: { ...process.env, GIT_LFS_SKIP_SMUDGE: "1" },
  })?.trim();
}

try {
  for (const source of registry.sources) {
    const checkout = path.join(tempRoot, source.id);
    run("git", ["clone", "--depth", "1", "--branch", source.ref, source.repository, checkout]);
    const commit = run("git", ["-C", checkout, "rev-parse", "HEAD"], { capture: true });
    const destination = path.join(root, source.localPath);
    await rm(destination, { recursive: true, force: true });

    if (source.importMode === "full") {
      await cp(checkout, destination, {
        recursive: true,
        filter: (entry) => !entry.split(path.sep).includes(".git"),
      });
    } else if (source.importMode === "skills-only") {
      await cp(path.join(checkout, "skills"), path.join(destination, "skills"), {
        recursive: true,
      });
      await cp(path.join(checkout, "LICENSE"), path.join(destination, "LICENSE"));
    } else {
      throw new Error(`Unsupported import mode: ${source.importMode}`);
    }

    source.commit = commit;
    console.log(`Updated ${source.id} to ${commit.slice(0, 12)}`);
  }

  registry.updatedAt = new Date().toISOString().slice(0, 10);
  await writeFile(sourcesPath, `${JSON.stringify(registry, null, 2)}\n`);
  run(process.execPath, ["scripts/build-catalog.mjs"]);
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}

import { access, readFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(full)));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

for (const required of [
  "README.md",
  "ATLAS.md",
  "CATALOG.md",
  "CONTRIBUTING.md",
  "SOURCES.md",
  "LICENSE",
  "registry/catalog.json",
  "registry/sources.json",
]) {
  try {
    await access(path.join(root, required));
  } catch {
    fail(`Missing required file: ${required}`);
  }
}

const sources = JSON.parse(
  await readFile(path.join(root, "registry/sources.json"), "utf8"),
);

for (const source of sources.sources) {
  if (!/^[a-f0-9]{40}$/.test(source.commit)) {
    fail(`Invalid commit pin for ${source.id}`);
  }
  try {
    await access(path.join(root, source.localPath, "LICENSE"));
  } catch {
    fail(`Missing upstream license for ${source.id}`);
  }
}

execFileSync(process.execPath, ["scripts/build-catalog.mjs"], {
  cwd: root,
  stdio: "inherit",
});

const catalog = JSON.parse(
  await readFile(path.join(root, "registry/catalog.json"), "utf8"),
);

if (catalog.count < 70) fail(`Unexpectedly small catalog: ${catalog.count}`);

const seen = new Map();
for (const skill of catalog.skills) {
  if (!skill.name || !skill.description || !skill.path) {
    fail(`Incomplete catalog record: ${JSON.stringify(skill)}`);
  }
  const key = `${skill.collection}:${skill.name}`;
  if (seen.has(key) && !skill.path.includes("/openclaw/")) {
    fail(`Duplicate skill identity ${key}: ${seen.get(key)} and ${skill.path}`);
  }
  seen.set(key, skill.path);
  try {
    await access(path.join(root, skill.path));
  } catch {
    fail(`Catalog path does not exist: ${skill.path}`);
  }
}

const authoredMarkdown = [
  ...["README.md", "ATLAS.md", "CONTRIBUTING.md", "SOURCES.md"].map((file) =>
    path.join(root, file),
  ),
  ...(await markdownFiles(path.join(root, "docs"))),
  ...(await markdownFiles(path.join(root, "vault"))),
];

for (const file of authoredMarkdown) {
  const markdown = await readFile(file, "utf8");
  const links = [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(
    (match) => match[1],
  );
  for (const link of links) {
    if (/^(https?:|mailto:|#)/.test(link)) continue;
    const clean = decodeURIComponent(link.split("#")[0]);
    try {
      await access(path.resolve(path.dirname(file), clean));
    } catch {
      fail(`${path.relative(root, file)} has broken link: ${link}`);
    }
  }
}

if (failures.length) {
  console.error("\nValidation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validation passed for ${catalog.count} skills and ${sources.sources.length} sources.`);

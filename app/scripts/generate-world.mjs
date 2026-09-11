// Skill Crossing world-registry generator.
//
// Source of truth is the root repository, never this script:
//   - registry/catalog.json  (name/description/domain/collection/path/version)
//   - skills/**/SKILL.md     (raw frontmatter: license, nested metadata)
//
// This script does NOT invent skill content. It selects a subset of the real
// catalog (RESIDENT_IDS below), validates every selected entry against disk,
// copies each SKILL.md verbatim into public/skills/<id>/SKILL.md so the app
// can offer an exact download with no GitHub API calls, and emits
// src/generated/residents.json for the 3D world to render.

import { createHash } from "node:crypto";
import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoRoot = path.dirname(appRoot);

// World-seed keeps every resident's behavior loop reproducible across runs,
// dev sessions, and screenshots (see src/core/rng.js).
const WORLD_SEED = 20260911;

// Phase 1 vertical slice ships exactly one resident. Extending the world is
// meant to be "add a name here" — no new plumbing required.
const RESIDENT_IDS = ["grill-me"];

function fail(failures, message) {
  failures.push(message);
}

/**
 * Minimal frontmatter reader for this repo's SKILL.md shape:
 *   top-level scalars (name, description, license, version)
 *   an optional one-level-deep `metadata:` block (author, version, ...)
 *   folded `description: >`/`description: |` blocks
 * Not a general YAML parser — deliberately just enough for real SKILL.md files.
 */
function parseFrontmatter(source) {
  if (!source.startsWith("---\n")) return { attrs: {}, metadata: {} };
  const end = source.indexOf("\n---", 4);
  if (end === -1) return { attrs: {}, metadata: {} };
  const block = source.slice(4, end);
  const lines = block.split("\n");

  const attrs = {};
  const metadata = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const topMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!topMatch) {
      i += 1;
      continue;
    }
    const [, key, rawValue] = topMatch;

    if (key === "metadata" && rawValue === "") {
      i += 1;
      while (i < lines.length && /^\s+[a-zA-Z0-9_-]+:/.test(lines[i])) {
        const nested = lines[i].match(/^\s+([a-zA-Z0-9_-]+):\s*(.*)$/);
        if (nested) {
          metadata[nested[1]] = nested[2].replace(/^["']|["']$/g, "").trim();
        }
        i += 1;
      }
      continue;
    }

    if ((rawValue === ">" || rawValue === "|") && key === "description") {
      i += 1;
      const folded = [];
      while (i < lines.length && (lines[i].startsWith("  ") || lines[i] === "")) {
        if (lines[i] !== "") folded.push(lines[i].trim());
        i += 1;
      }
      attrs.description = folded.join(" ");
      continue;
    }

    attrs[key] = rawValue.replace(/^["']|["']$/g, "").trim();
    i += 1;
  }

  return { attrs, metadata };
}

async function loadCatalog(failures) {
  const catalogPath = path.join(repoRoot, "registry/catalog.json");
  try {
    const raw = await readFile(catalogPath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    fail(failures, `Could not read/parse registry/catalog.json: ${error.message}`);
    return { skills: [] };
  }
}

async function validateCatalogAgainstDisk(catalog, failures) {
  for (const skill of catalog.skills ?? []) {
    if (!skill.name || !skill.description || !skill.path) {
      fail(failures, `Incomplete catalog record: ${JSON.stringify(skill)}`);
      continue;
    }
    try {
      await access(path.join(repoRoot, skill.path));
    } catch {
      fail(failures, `Catalog entry "${skill.name}" points to a missing file: ${skill.path}`);
    }
  }
}

function shortSummary(description, maxLength = 140) {
  if (description.length <= maxLength) return description;
  return `${description.slice(0, maxLength - 1).trimEnd()}…`;
}

async function buildResident(catalog, id, failures) {
  const record = catalog.skills?.find((skill) => skill.name === id);
  if (!record) {
    fail(failures, `Resident "${id}" is not present in registry/catalog.json — add the real skill first.`);
    return null;
  }

  const absolutePath = path.join(repoRoot, record.path);
  let source;
  try {
    source = await readFile(absolutePath, "utf8");
  } catch (error) {
    fail(failures, `Resident "${id}" catalog path is unreadable: ${record.path} (${error.message})`);
    return null;
  }

  const { attrs, metadata } = parseFrontmatter(source);
  if (!attrs.name || attrs.name !== id) {
    fail(
      failures,
      `Resident "${id}" frontmatter name mismatch: SKILL.md says "${attrs.name ?? "(none)"}", catalog says "${id}".`,
    );
  }

  const contentHash = `sha256:${createHash("sha256").update(source).digest("hex")}`;
  const description = attrs.description || record.description;

  return {
    id,
    name: attrs.name || record.name,
    summary: shortSummary(description),
    description,
    domain: record.domain,
    collection: record.collection,
    version: metadata.version || record.version || null,
    license: attrs.license || null,
    author: metadata.author || null,
    adaptedFrom: metadata.adapted_from || null,
    sourcePath: record.path,
    sourceUrl: `https://github.com/mannyandrs45/agentic-skill-library/blob/main/${record.path}`,
    markdownAsset: `/skills/${id}/SKILL.md`,
    contentHash,
    _rawSource: source,
  };
}

async function copyMarkdownAsset(id, rawSource) {
  const destDir = path.join(appRoot, "public/skills", id);
  await mkdir(destDir, { recursive: true });
  await writeFile(path.join(destDir, "SKILL.md"), rawSource);
}

async function main() {
  const failures = [];
  const catalog = await loadCatalog(failures);
  await validateCatalogAgainstDisk(catalog, failures);

  const residents = [];
  for (const id of RESIDENT_IDS) {
    const resident = await buildResident(catalog, id, failures);
    if (!resident) continue;
    await copyMarkdownAsset(id, resident._rawSource);
    delete resident._rawSource;
    residents.push(resident);
  }

  if (failures.length) {
    console.error("\nWorld generation failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  const manifest = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    worldSeed: WORLD_SEED,
    catalogSkillCount: catalog.skills?.length ?? 0,
    residentCount: residents.length,
    residents,
  };

  const outPath = path.join(appRoot, "src/generated/residents.json");
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `Generated ${residents.length} resident(s) from a validated catalog of ${manifest.catalogSkillCount} real skills.`,
  );
}

main();

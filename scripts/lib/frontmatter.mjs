// Extract the fields the catalog needs, not a general-purpose YAML parser.
// Imported manifests use both quoted scalars and folded/literal block scalars.
export function frontmatter(source) {
  if (!source.startsWith("---\n")) return {};
  const end = source.indexOf("\n---", 4);
  if (end === -1) return {};
  const block = source.slice(4, end);
  const result = {};
  for (const line of block.split("\n")) {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, raw] = match;
    if (!raw || /^[>|][-+]?$/.test(raw)) continue;
    result[key] = raw.replace(/^["']|["']$/g, "").trim();
  }
  const descriptionMatch = block.match(
    /^description:\s*[>|][-+]?\s*\n((?:[ \t]+.*\n?)*)/m,
  );
  if (descriptionMatch) {
    result.description = descriptionMatch[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ");
  }
  return result;
}

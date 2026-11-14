import { execFileSync } from "node:child_process";
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { root } from "./snapshot-personal.mjs";

// librsvg cannot decode an embedded WebP consistently across hosts.
await sharp(path.join(root, "assets/agentcraft-office.webp"))
  .resize({ width: 800 }).png().toFile(path.join(root, "assets/agentcraft-office.png"));
execFileSync("python", ["scripts/build-visuals.py"], { cwd: root, stdio: "inherit" });
for (const name of await readdir(path.join(root, "assets"))) {
  if (!/^(hero|collection-mix|architecture)(-mobile)?\.svg$/.test(name)) continue;
  await sharp(path.join(root, "assets", name))
    .png().toFile(path.join(root, "assets", name.replace(/\.svg$/, ".png")));
  console.log(`Rendered assets/${name.replace(/\.svg$/, ".png")}`);
}

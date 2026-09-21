// Splits the UI en-US locale file into JSON chunks for parallel translation.
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const sourcePath = join(repoRoot, "packages/ui/src/i18n/locales/en-US.ts");
const outDir = join(repoRoot, ".i18n-chunks/source");

const CHUNK_COUNT = Number(process.env.CHUNK_COUNT ?? 10);
if (!Number.isInteger(CHUNK_COUNT) || CHUNK_COUNT < 1 || CHUNK_COUNT > 200) {
  console.error(`Invalid CHUNK_COUNT: ${process.env.CHUNK_COUNT ?? ""} — expected 1..200`);
  process.exit(1);
}

const raw = await readFile(sourcePath, "utf8");
// Materialize the catalog as an importable ESM module: the source already ends with
// `export default enUS;`, so only the TS type annotation needs to be dropped, then Node
// imports it and handles comments/quote styles for us.
const moduleCode = raw.replace(/const enUS[^=]*=/m, "const enUS =");
const modulePath = join(outDir, "en-US.dynamic.mjs");
await mkdir(outDir, { recursive: true });

// Reruns with a smaller CHUNK_COUNT (or a shrunken catalog) must not leave stale
// higher-numbered chunks behind: assemble reads every chunk-*.json it finds, so a
// leftover file would resurrect removed keys or demand dead translations.
await Promise.all(
  (await readdir(outDir))
    .filter((name) => /^chunk-\d+\.json$/u.test(name) || name === "en-US.dynamic.mjs")
    .map((name) => rm(join(outDir, name))),
);

await writeFile(modulePath, moduleCode);
const entries = Object.entries((await import(pathToFileURL(modulePath).href)).default);
await rm(modulePath);

const size = Math.ceil(entries.length / CHUNK_COUNT);
for (let i = 0; i < CHUNK_COUNT; i++) {
  const slice = entries.slice(i * size, (i + 1) * size);
  if (slice.length === 0) continue;
  await writeFile(
    join(outDir, `chunk-${String(i + 1).padStart(2, "0")}.json`),
    JSON.stringify(slice),
  );
}
console.log(`total entries: ${entries.length}, chunk size: ${size}, chunks: ${CHUNK_COUNT}`);

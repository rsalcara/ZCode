// Splits the UI en-US locale file into JSON chunks for parallel translation.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const sourcePath = join(repoRoot, "packages/ui/src/i18n/locales/en-US.ts");
const outDir = join(repoRoot, ".i18n-chunks/source");

const CHUNK_COUNT = Number(process.env.CHUNK_COUNT ?? 10);

const raw = readFileSync(sourcePath, "utf8");
// Materialize the catalog as an importable ESM module: the source already ends with
// `export default enUS;`, so only the TS type annotation needs to be dropped, then Node
// imports it and handles comments/quote styles for us.
const moduleCode = raw.replace(/const enUS[^=]*=/m, "const enUS =");
const modulePath = join(outDir, "en-US.dynamic.mjs");
mkdirSync(outDir, { recursive: true });
writeFileSync(modulePath, moduleCode);
const entries = Object.entries((await import(pathToFileURL(modulePath))).default);
rmSync(modulePath);

const size = Math.ceil(entries.length / CHUNK_COUNT);
for (let i = 0; i < CHUNK_COUNT; i++) {
  const slice = entries.slice(i * size, (i + 1) * size);
  if (slice.length === 0) continue;
  writeFileSync(join(outDir, `chunk-${String(i + 1).padStart(2, "0")}.json`), JSON.stringify(slice));
}
console.log(`total entries: ${entries.length}, chunk size: ${size}, chunks: ${CHUNK_COUNT}`);

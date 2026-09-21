// Assembles translated chunks into packages/ui/src/i18n/locales/pt-BR.ts and
// validates key parity + placeholder parity against the en-US source.
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(repoRoot, ".i18n-chunks/source");
const outDir = join(repoRoot, ".i18n-chunks/pt-BR");
const targetPath = join(repoRoot, "packages/ui/src/i18n/locales/pt-BR.ts");

const placeholderRe = /\{[A-Za-z0-9_.[\]-]+\}/g;

const sourceFiles = readdirSync(srcDir)
  .filter((f) => f.endsWith(".json"))
  .sort();
const sourceEntries = [];
for (const f of sourceFiles) {
  sourceEntries.push(...JSON.parse(readFileSync(join(srcDir, f), "utf8")));
}

const translated = new Map();
for (const f of sourceFiles) {
  const p = join(outDir, f);
  if (!existsSync(p)) {
    console.error(`MISSING translated chunk: ${f}`);
    process.exit(1);
  }
  for (const [k, v] of JSON.parse(readFileSync(p, "utf8"))) {
    if (typeof v !== "string") {
      console.error(`NON-STRING value for ${k} in ${f}`);
      process.exit(1);
    }
    translated.set(k, v);
  }
}

const problems = [];
const lines = [];
for (const [key, srcVal] of sourceEntries) {
  const val = translated.get(key);
  if (val === undefined) {
    problems.push(`missing key: ${key}`);
    continue;
  }
  const srcPh = (srcVal.match(placeholderRe) ?? []).sort().join(",");
  const outPh = (val.match(placeholderRe) ?? []).sort().join(",");
  if (srcPh !== outPh) {
    problems.push(`placeholder mismatch for ${key}: source=[${srcPh}] translated=[${outPh}]`);
  }
  if (val.trim().length === 0 && srcVal.trim().length > 0) {
    problems.push(`empty translation for ${key}`);
  }
  lines.push(`  ${JSON.stringify(key)}: ${JSON.stringify(val)},`);
}
for (const key of translated.keys()) {
  if (!sourceEntries.some(([k]) => k === key)) {
    problems.push(`extra key: ${key}`);
  }
}

if (problems.length > 0) {
  console.error(`VALIDATION FAILED — ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 50)) console.error(`  - ${p}`);
  process.exit(1);
}

const content = `/** Portuguese (Brazil) translations */
const ptBR: Record<string, string> = {
${lines.join("\n")}
};

export default ptBR;
`;
writeFileSync(targetPath, content);
console.log(
  `OK: wrote ${targetPath} with ${translated.size} entries (${sourceEntries.length} source entries)`,
);

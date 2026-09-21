// Assembles translated chunks into packages/ui/src/i18n/locales/pt-BR.ts and
// validates key parity + placeholder parity against the en-US source.
import { access, readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(repoRoot, ".i18n-chunks/source");
const outDir = join(repoRoot, ".i18n-chunks/pt-BR");
const targetPath = join(repoRoot, "packages/ui/src/i18n/locales/pt-BR.ts");

const placeholderRe = /\{[A-Za-z0-9_.[\]-]+\}/g;

const sourceFiles = (await readdir(srcDir)).filter((f) => f.endsWith(".json")).sort();
const sourceEntries = [];
for (const f of sourceFiles) {
  sourceEntries.push(...JSON.parse(await readFile(join(srcDir, f), "utf8")));
}

const translated = new Map();
const duplicateKeys = new Set();
for (const f of sourceFiles) {
  const p = join(outDir, f);
  try {
    await access(p);
  } catch {
    console.error(`MISSING translated chunk: ${f}`);
    process.exit(1);
  }
  for (const [k, v] of JSON.parse(await readFile(p, "utf8"))) {
    if (typeof v !== "string") {
      console.error(`NON-STRING value for ${k} in ${f}`);
      process.exit(1);
    }
    if (translated.has(k)) {
      duplicateKeys.add(k);
    }
    translated.set(k, v);
  }
}
if (duplicateKeys.size > 0) {
  console.error(
    `DUPLICATE keys across chunks (${duplicateKeys.size}): ${[...duplicateKeys].slice(0, 10).join(", ")}`,
  );
  process.exit(1);
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
await writeFile(targetPath, content);
// Keep the generated catalog formatted so `pnpm fmt:check` stays green after a
// regeneration. A missing oxfmt is tolerable (raw output is still valid TS —
// run `pnpm fmt` before committing); any other failure must propagate, a
// half-formatted catalog must not be committed as "OK".
const { execFile } = await import("node:child_process");
const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
// Windows .cmd launchers only resolve through a shell; on other platforms keep
// the argv-array form so paths with spaces stay intact.
const useShell = process.platform === "win32";
try {
  await new Promise((resolve, reject) => {
    execFile(command, ["exec", "oxfmt", targetPath], { cwd: repoRoot, shell: useShell }, (error) =>
      error ? reject(error) : resolve(undefined),
    );
  });
} catch (error) {
  if (error && typeof error === "object" && error.code === "ENOENT") {
    console.warn("oxfmt unavailable — run `pnpm fmt` before committing the regenerated catalog.");
  } else {
    throw error;
  }
}
console.log(
  `OK: wrote ${targetPath} with ${translated.size} entries (${sourceEntries.length} source entries)`,
);

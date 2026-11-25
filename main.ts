import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I saw the twist coming and I simply could not let you see it first.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (LINE !== LINE.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (/[\u0000-\u001f\u007f]/.test(LINE)) {
    throw new Error("line must not contain control characters");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip read-back mismatch");
  }
}

main();

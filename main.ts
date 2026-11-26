import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The cat's defence, delivered in the five seconds after the glass hit the floor:
// the glass was squatting in the cat's sunbeam without paying rent, so it got evicted.
const sentence =
  "It was squatting in my sunbeam without paying rent, so I evicted it — you can thank me later, preferably in treats.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Self-check: the gate requires 1–200 characters and a single sentence.
// Fail loudly instead of writing an entry the gate would refuse.
if (sentence.length < 1 || sentence.length > 200) {
  throw new Error(`entry is ${sentence.length} characters, must be 1–200`);
}
const sentenceEnders = (sentence.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !/[.!?]$/.test(sentence)) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), sentence, "utf8");

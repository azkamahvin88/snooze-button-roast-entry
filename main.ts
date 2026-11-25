// Snooze Button Roast — a make.fun entry (Node 22+, standard library
// only, no network, no model calls, fully deterministic: the same line
// every run).
//
// The entry is one roast line aimed at an alarm clock that rings at
// 6 AM on a Saturday morning. The line itself is the whole entry: it
// is written to /output/entry.txt.
//
// The line: the clock does not just ring — it preaches. It shows up
// at 6 AM on a Saturday with the swagger of a LinkedIn hustle guru,
// quoting "Rise and grind!" at someone who has nowhere to be. The
// punch lands in the last few words: the only grinding happening is
// the sleeper's teeth. The clock is the butt of the joke, the
// Saturday 6 AM setting is explicit, and the turn — grind the hustle
// vs. grind your teeth — is the laugh.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "My alarm clock went off at 6 AM on a Saturday like a LinkedIn guru: 'Rise and grind!' Buddy, the only thing I'm grinding is my teeth.";

// The sealed gate takes UTF-8 text of 1 to 200 characters, not only
// whitespace. Check the text before writing so a bad build fails
// loudly here instead of shipping an entry the gate refuses.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${chars} characters; the gate needs 1-200`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${chars} characters + newline)`);

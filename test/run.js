// Parses each case in test/*.txt and checks the tree it gives. A case is a
// `# name` line, the Lucy source, a `==>` line and the expected tree, as
// lezer-generator's fileTests reads them. Run `npm run build` first.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
// lezer-generator doesn't export its test helpers, so they are imported by
// path.
import { fileTests } from '../node_modules/lezer-generator/dist/test.js';
import { parser } from '../lib/parser.js';

const dir = fileURLToPath(new URL('.', import.meta.url));
let failed = 0;
for (const file of readdirSync(dir).filter((name) => name.endsWith('.txt'))) {
  for (const { name, run } of fileTests(readFileSync(dir + file, 'utf8'), file)) {
    try {
      run(parser);
      console.log(`ok - ${file}: ${name}`);
    } catch (err) {
      failed++;
      console.log(`FAILED - ${file}: ${name}\n${err.message}`);
    }
  }
}
process.exit(failed ? 1 : 0);

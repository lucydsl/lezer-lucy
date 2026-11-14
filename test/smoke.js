// Checks that the built parser loads and parses a small machine without errors.
import { parser } from '../lib/parser.js';

const source = `
initial state off {
  toggle => on
}

state on {
  toggle => off
}
`;

const tree = parser.parse(source);
const cursor = tree.cursor();
let nodes = 0;
do {
  nodes++;
  if(cursor.type.isError) {
    console.error(`Parse error at ${cursor.from}: ${JSON.stringify(source.slice(cursor.from, cursor.from + 20))}`);
    process.exit(1);
  }
} while(cursor.next());

if(nodes < 10) {
  console.error(`Expected a tree for the machine, got ${nodes} nodes`);
  process.exit(1);
}
console.log(`ok: ${nodes} nodes, no errors`);

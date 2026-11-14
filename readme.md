# @lucy/lezer-lucy

A [Lucy](https://lucy.spooky.click/) grammar for the [lezer](https://lezer.codemirror.net/) parser system.

## Develop

```sh
npm install
npm run build   # src/lucy.grammar into lib/parser.js
npm test        # builds, then parses the cases in test/*.txt
```

A test case is a `# name` line, the Lucy source, a `==>` line and the tree it should parse to.

## License

BSD-2-Clause
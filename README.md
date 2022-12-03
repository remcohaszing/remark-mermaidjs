# remark-mermaidjs

[![github actions](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yml/badge.svg)](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/remcohaszing/remark-mermaidjs/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/remark-mermaidjs)
[![npm](https://img.shields.io/npm/v/remark-mermaidjs)](https://www.npmjs.com/package/remark-mermaidjs)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

A [remark](https://remark.js.org) plugin to render [mermaid](https://mermaid-js.github.io) diagrams
using [puppeteer](https://pptr.dev).

## Installation

```sh
npm install remark-mermaidjs
```

Since this package uses Google Chrome, You have to make sure it’s available on your system. You may
also need to install some additional packages, such as fonts, depending on your system. For more
information, see the Puppeteer
[troubleshooting](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md) guide.

## Usage

This plugin takes all code blocks marked as `mermaid` and renders them as an inline SVG.

```js
import { readFile } from 'node:fs/promises';

import { remark } from 'remark';
import remarkMermaid from 'remark-mermaidjs';

const { value } = await remark()
  .use(remarkMermaid, {
    launchOptions: {
      executablePath: 'path/to/chrome/executable',

      /* More puppeteer launch options */
    },

    /* More options */
  })
  .process(await readFile('readme.md'));

console.log(value);
```

### Options

#### `errorFallback`

Create a fallback node if processing of a mermaid diagram fails. If nothing is returned, the code
block is removed. The function receives the following arguments:

- `node`: The mdast `code` node that couldn’t be rendered.
- `error`: The error message that was thrown.
- `file`: The file on which the error occurred.

#### `launchOptions`

These options are passed to
[`puppeteer.launch()`](https://pptr.dev/#?product=Puppeteer&show=api-puppeteerlaunchoptions).

- **Note**: This options is required in Node.js. In the browser this option is unused.

#### `svgo`

These options are passed to the [SVGO](https://github.com/svg/svgo) constructor. Set to `false` to
disable minifying using SVGO completely.

**Note**: This options is only supported in Node.js. In the browser this option is unused.

#### `mermaidOptions`

The [mermaid options](https://mermaid-js.github.io/mermaid/#/Setup) to use.

**Note**: This options is only supported in Node.js. In the browser this option is unused. If you
use this in a browser, call `mermaid.initialize()` manually.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)

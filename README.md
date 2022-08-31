# remark-mermaidjs

[![github actions](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yml/badge.svg)](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/remcohaszing/remark-mermaidjs/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/remark-mermaidjs)
[![npm](https://img.shields.io/npm/v/remark-mermaidjs)](https://www.npmjs.com/package/remark-mermaidjs)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

A [remark](https://remark.js.org) plugin to render [mermaid](https://mermaid-js.github.io) diagrams
using [puppeteer](https://pptr.dev).

## Installation

```sh
npm install  remark-mermaidjs
```

Since this package uses Google Chrome, You have to make sure it’s available on your system.

## Usage

This plugin takes all code blocks marked as `mermaid` and renders them as an inline SVG.

```js
import { readFile } from 'fs/promises';

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

#### `launchOptions`

These options are passed to
[`puppeteer.launch()`](https://pptr.dev/#?product=Puppeteer&show=api-puppeteerlaunchoptions).

#### `svgo`

These options are passed to the [SVGO](https://github.com/svg/svgo) constructor. Set to `null` to
disable minifying using SVGO completely.

#### `mermaidOptions`

The [mermaid options](https://mermaid-js.github.io/mermaid/#/Setup) to use.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)

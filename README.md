# remark-mermaidjs

[![github actions](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yml/badge.svg)](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/remcohaszing/remark-mermaidjs/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/remark-mermaidjs)
[![npm](https://img.shields.io/npm/v/remark-mermaidjs)](https://www.npmjs.com/package/remark-mermaidjs)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

A [remark](https://remark.js.org) plugin to render [mermaid](https://mermaid-js.github.io) diagrams
using [puppeteer](https://pptr.dev).

## Installation

This package has a peer dependency on `puppeteer`.

```sh
npm install puppeteer remark-mermaidjs
```

Since this package uses Puppeteer, some system dependencies may need to be installed. Typically this
is needed in a CI environment. The simplest way to do this us using
[`install-chrome-dependencies`](https://gitlab.com/appsemble/install-chrome-dependencies)

## Usage

This plugin takes all code blocks marked as `mermaid` and renders them as an inline SVG.

```js
import { readFile } from 'fs/promises';

import { remark } from 'remark';
import remarkMermaid from 'remark-mermaidjs';

const { value } = await remark()
  .use(remarkMermaid, {
    /* Optional options */
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

#### `theme`

The [mermaid theme] to use.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)

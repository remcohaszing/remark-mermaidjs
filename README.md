# remark-mermaidjs

[![github actions][github actions badge]][github actions] [![codecov][codecov badge]][codecov]
[![npm][npm badge]][npm] [![prettier][prettier badge]][prettier] [![jest][jest badge]][jest]

> A [remark][] plugin to render [mermaid][] diagrams using [puppeteer][].

## Installation

This package has a peer dependency on `puppeteer`.

```sh
npm install puppeteer remark-mermaidjs
```

Since this package uses Puppeteer, some system dependencies may need to be installed. Typically this
is needed in a CI environment. The simplest way to do this us using
[`install-chrome-dependencies`][install-chrome-dependencies]

## Usage

This plugin takes all code blocks marked as `mermaid` and renders them as an inline SVG.

```js
const { readFileSync } = require('fs');

const remark = require('remark');
const { remarkMermaid } = require('remark-mermaidjs');

remark()
  .use(remarkMermaid, {
    /* Optional options */
  })
  .process(readFileSync('readme.md'))
  .then((result) => {
    console.log(result.contents);
  });
```

### Options

#### `launchOptions`

These options are passed to [`puppeteer.launch()`][puppeteer.launch].

#### `svgo`

These options are passed to the [SVGO][] constructor. Set to `null` to disable minifying using SVGO
completely.

#### `theme`

The [mermaid theme] to use.

[codecov badge]: https://codecov.io/gh/remcohaszing/remark-mermaidjs/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/remcohaszing/remark-mermaidjs
[github actions badge]: https://github.com/remcohaszing/remark-mermaidjs/workflows/NodeJS/badge.svg
[github actions]: https://github.com/remcohaszing/remark-mermaidjs/actions
[install-chrome-dependencies]: https://gitlab.com/appsemble/install-chrome-dependencies
[jest badge]: https://jestjs.io/img/jest-badge.svg
[jest]: https://jestjs.io
[mermaid theme]: https://mermaid-js.github.io/mermaid/#/theming
[mermaid]: https://mermaid-js.github.io
[npm badge]: https://img.shields.io/npm/v/remark-mermaidjs
[npm]: https://www.npmjs.com/package/remark-mermaidjs
[prettier badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://prettier.io
[puppeteer.launch]: https://pptr.dev/#?product=Puppeteer&show=api-puppeteerlaunchoptions
[puppeteer]: https://pptr.dev
[remark]: https://remark.js.org/
[svgo]: https://github.com/svg/svgo

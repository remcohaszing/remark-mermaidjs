# remark-mermaidjs

[![github actions](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/remark-mermaidjs/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/remark-mermaidjs/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/remark-mermaidjs)
[![npm](https://img.shields.io/npm/v/remark-mermaidjs)](https://www.npmjs.com/package/remark-mermaidjs)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

A [remark](https://remark.js.org) plugin to render [mermaid](https://mermaid-js.github.io) diagrams
using [playwright](https://playwright.dev).

> [!IMPORTANT]
>
> Use cases for this package are rare. You should probably use
> [`rehype-mermaidjs`](https://github.com/remcohaszing/rehype-mermaidjs) instead.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`unified().use(remarkMermaid, options?)`](#unifieduseremarkmermaid-options)
    - [`browser`](#browser)
    - [`css`](#css)
    - [`errorFallback`](#errorfallback)
    - [`launchOptions`](#launchoptions)
    - [`mermaidOptions`](#mermaidoptions)
    - [`prefix`](#prefix)
- [Compatibility](#compatibility)
- [Related Projects](#related-projects)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
npm install remark-mermaidjs
```

In Node.js this package uses [playwright](https://playwright.dev) under the hood. To use it, you may
need to install additional dependencies. These can be installed with:

```sh
npx playwright install --with-deps chromium
```

See the Playwright [Browsers](https://playwright.dev/docs/browsers) documentation for more
information.

## Usage

This plugin takes all code blocks marked as `mermaid` and renders them as an inline SVG.

```js
import { readFile } from 'node:fs/promises'

import { remark } from 'remark'
import remarkMermaid from 'remark-mermaidjs'

const { value } = await remark()
  .use(remarkMermaid, {
    /* Options */
  })
  .process(await readFile('readme.md'))

console.log(value)
```

## API

This package has a default export `remarkMermaid`.

### `unified().use(remarkMermaid, options?)`

#### `browser`

The Playwright browser to use. (`object`, default: chromium)

#### `css`

A URL that points to a custom CSS file to load. Use this to load custom fonts. This option is
ignored in the browser. You need to include the CSS in your build manually. (`string` | `URL`)

#### `errorFallback`

Create a fallback node if processing of a mermaid diagram fails. If nothing is returned, the code
block is removed. The function receives the following arguments:

- `node`: The mdast `code` node that couldn’t be rendered.
- `error`: The error message that was thrown.
- `file`: The file on which the error occurred.

#### `launchOptions`

The options used to launch the browser. (`object`)

- **Note**: This options is required in Node.js. In the browser this option is unused.

#### `mermaidOptions`

The [mermaid options](https://mermaid-js.github.io/mermaid/#/Setup) to use.

**Note**: This options is only supported in Node.js. In the browser this option is unused. If you
use this in a browser, call `mermaid.initialize()` manually.

#### `prefix`

A custom prefix to use for Mermaid IDs. (`string`, default: `mermaid`)

## Compatibility

This project is compatible with Node.js 16 or greater.

## Related Projects

- [`mermaid`](https://mermaid.js.org) is the library that’s used to render the diagrams.
- [`mermaid-isomorphic`](https://github.com/remcohaszing/mermaid-isomorphic) allows this package to
  render Mermaid diagrams in both Node.js and the browser.
- [`rehype-mermaidjs`](https://github.com/remcohaszing/rehype-mermaidjs) is a more powerful plugin
  that does the same, but as a [rehype](https://github.com/rehypejs/rehype) plugin.

## Contributing

Test fixtures are generated and verified using Linux. Rendering on other platforms may yield
slightly different results. Don’t worry about adding new fixtures, but don’t update existing ones
that cause CI to fail. Furthermore see my global
[contributing guidelines](https://github.com/remcohaszing/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)

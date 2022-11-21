import { createRequire } from 'node:module';

import { fromParse5 } from 'hast-util-from-parse5';
import { type Code, type Parent, type Root } from 'mdast';
import { type MermaidConfig } from 'mermaid';
import { parseFragment } from 'parse5';
import puppeteer, { type Browser, type Page, type PuppeteerLaunchOptions } from 'puppeteer-core';
import { type Config, optimize } from 'svgo';
import { type Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const mermaidScript = {
  path: createRequire(import.meta.url).resolve('mermaid/dist/mermaid.min.js'),
};

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
declare const mermaid: typeof import('mermaid').default;

export interface RemarkMermaidOptions {
  /**
   * Launch options to pass to puppeteer.
   *
   * **Note**: This options is required in Node.js. In the browser this option is unused.
   */
  launchOptions: PuppeteerLaunchOptions;

  /**
   * SVGO options used to minify the SVO output.
   *
   * Set to `false` explicitly to disable this.
   *
   * **Note**: This options is only supported in Node.js. In the browser this option is unused.
   *
   * @default defaultSVGOOptions
   */
  svgo?: Config | false;

  /**
   * The mermaid options to use.
   *
   * **Note**: This options is only supported in Node.js. In the browser this option is unused. If
   * you use this in a browser, call `mermaid.initialize()` manually.
   */
  mermaidOptions?: MermaidConfig;
}

/**
 * @param options Options that may be used to tweak the output.
 */
const remarkMermaid: Plugin<[RemarkMermaidOptions?], Root> = (options) => {
  if (!options?.launchOptions?.executablePath) {
    throw new Error('The option `launchOptions.executablePath` is required when using Node.js');
  }

  const { launchOptions, mermaidOptions, svgo } = options;

  let browserPromise: Promise<Browser> | undefined;
  let count = 0;

  return async function transformer(ast) {
    const instances: [string, number, Parent][] = [];

    visit(ast, { type: 'code', lang: 'mermaid' }, (node: Code, index, parent: Parent) => {
      instances.push([node.value, index, parent]);
    });

    // Nothing to do. No need to start puppeteer in this case.
    if (!instances.length) {
      return ast;
    }

    count += 1;
    browserPromise ??= puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ...launchOptions,
    });
    const browser = await browserPromise;
    let page: Page | undefined;
    let results: string[];
    try {
      page = await browser.newPage();
      await page.goto(String(new URL('index.html', import.meta.url)));
      await page.addScriptTag(mermaidScript);
      await page.setViewport({ width: 600, height: 3000 });

      results = await page.evaluate(
        // We can’t calculate coverage on this function, as it’s run by Chrome, not Node.
        /* c8 ignore start */
        (codes, initOptions) => {
          if (initOptions) {
            mermaid.initialize(initOptions);
          }
          return codes.map((code) => {
            const id = 'a';
            const div = document.createElement('div');
            div.innerHTML = mermaid.render(id, code);
            return div.innerHTML;
          });
        },
        /* C8 ignore stop */
        instances.map((instance) => instance[0]),
        mermaidOptions,
      );
    } finally {
      count -= 1;
      await page?.close();
    }

    for (const [i, [, index, parent]] of instances.entries()) {
      let value = results[i];
      if (svgo !== false) {
        value = optimize(value, svgo).data;
      }
      parent.children.splice(index, 1, {
        type: 'paragraph',
        children: [{ type: 'html', value }],
        data: { hChildren: [fromParse5(parseFragment(value))] },
      });
    }
    if (!count) {
      browserPromise = undefined;
      await browser?.close();
    }

    return ast;
  };
};

export default remarkMermaid;

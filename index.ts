import { createRequire } from 'node:module';

import { type BlockContent, type Code, type Root } from 'mdast';
import { type MermaidConfig } from 'mermaid';
import puppeteer, { type Browser, type Page, type PuppeteerLaunchOptions } from 'puppeteer-core';
import { type Plugin } from 'unified';
import { type VFile } from 'vfile';

import { extractCodeBlocks, replaceCodeBlocks, type Result } from './shared.js';

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
  launchOptions?: PuppeteerLaunchOptions;

  /**
   * The mermaid options to use.
   *
   * **Note**: This options is only supported in Node.js. In the browser this option is unused. If
   * you use this in a browser, call `mermaid.initialize()` manually.
   */
  mermaidOptions?: MermaidConfig;

  /**
   * Create a fallback node if processing of a mermaid diagram fails.
   *
   * @param node The mdast `code` node that couldn’t be rendered.
   * @param error The error message that was thrown.
   * @param file The file on which the error occurred.
   * @returns A fallback node to render instead of the invalid diagram. If nothing is returned, the
   *   code block is removed
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  errorFallback?: (node: Code, error: string, file: VFile) => BlockContent | undefined | void;
}

export type RemarkMermaid = Plugin<[RemarkMermaidOptions?], Root>;

/**
 * @param options Options that may be used to tweak the output.
 */
const remarkMermaid: RemarkMermaid = (options) => {
  if (!options?.launchOptions?.executablePath) {
    throw new Error('The option `launchOptions.executablePath` is required when using Node.js');
  }

  const { launchOptions, mermaidOptions } = options;

  let browserPromise: Promise<Browser> | undefined;
  let count = 0;

  return async function transformer(ast, file) {
    const instances = extractCodeBlocks(ast);

    // Nothing to do. No need to start puppeteer in this case.
    if (!instances.length) {
      return;
    }

    count += 1;
    browserPromise ??= puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ...launchOptions,
    });
    const browser = await browserPromise;
    let page: Page | undefined;
    let results: Result[];
    try {
      page = await browser.newPage();
      await page.goto(String(new URL('index.html', import.meta.url)));
      await page.addScriptTag(mermaidScript);

      results = await page.evaluate(
        // We can’t calculate coverage on this function, as it’s run by Chrome, not Node.
        /* c8 ignore start */
        (codes, initOptions) => {
          if (initOptions) {
            mermaid.initialize(initOptions);
          }
          return codes.map((code, index) => {
            try {
              return {
                success: true,
                result: mermaid.render(`remark-mermaid-${index}`, code),
              };
            } catch (error) {
              return {
                success: false,
                result: error instanceof Error ? error.message : String(error),
              };
            }
          });
        },

        /* C8 ignore stop */
        instances.map((instance) => instance[0].value),
        mermaidOptions,
      );
    } finally {
      count -= 1;
      await page?.close();
    }

    replaceCodeBlocks(instances, results, options, file);

    if (!count) {
      browserPromise = undefined;
      await browser?.close();
    }
  };
};

export default remarkMermaid;

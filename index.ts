import { createRequire } from 'node:module';

import { fromParse5 } from 'hast-util-from-parse5';
import { type BlockContent, type Code, type Parent, type Root } from 'mdast';
import { type MermaidConfig } from 'mermaid';
import { parseFragment } from 'parse5';
import puppeteer, { type Browser, type Page, type PuppeteerLaunchOptions } from 'puppeteer-core';
import { type Config, optimize } from 'svgo';
import { type Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { type VFile } from 'vfile';

const mermaidScript = {
  path: createRequire(import.meta.url).resolve('mermaid/dist/mermaid.min.js'),
};

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
declare const mermaid: typeof import('mermaid').default;

interface SuccessResult {
  /**
   * This indicates diagram was rendered succesfully.
   */
  success: true;

  /**
   * The resulting SVG code.
   */
  svg: string;
}

interface ErrorResult {
  /**
   * This indicates diagram wasn’t rendered succesfully.
   */
  success: false;

  /**
   * The error message.
   */
  error: string;
}

export interface RemarkMermaidOptions {
  /**
   * Launch options to pass to puppeteer.
   *
   * **Note**: This options is required in Node.js. In the browser this option is unused.
   */
  launchOptions?: PuppeteerLaunchOptions;

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

  /**
   * Create a fallback node if processing of a mermaid diagram fails.
   *
   * @param node The mdast `code` node that couldn’t be rendered.
   * @param error The error message that was thrown.
   * @param file The file on which the error occurred.
   * @returns A fallback node to render instead of the invalid diagram. If nothing is returned, the
   * code block is removed
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

  const { errorFallback, launchOptions, mermaidOptions, svgo } = options;

  let browserPromise: Promise<Browser> | undefined;
  let count = 0;

  return async function transformer(ast, file) {
    const instances: [Code, number, Parent][] = [];

    visit(ast, { type: 'code', lang: 'mermaid' }, (node: Code, index, parent: Parent) => {
      instances.push([node, index, parent]);
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
    let results: (ErrorResult | SuccessResult)[];
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
          return codes.map((code, index) => {
            try {
              return {
                success: true,
                svg: mermaid.render(`remark-mermaid-${index}`, code),
              } as const;
            } catch (error) {
              return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
              } as const;
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

    for (const [i, [node, index, parent]] of instances.entries()) {
      const result = results[i];
      if (result.success) {
        let value = result.svg;
        if (svgo !== false) {
          value = optimize(value, svgo).data;
        }
        parent.children[index] = {
          type: 'paragraph',
          children: [{ type: 'html', value }],
          data: { hChildren: [fromParse5(parseFragment(value))] },
        };
      } else if (errorFallback) {
        const fallback = errorFallback(node, result.error, file);
        if (fallback) {
          parent.children[index] = fallback;
        } else {
          parent.children.splice(index, 1);
        }
      } else {
        file.fail(result.error, node, 'remark-mermaidjs:remark-mermaidjs');
      }
    }
    if (!count) {
      browserPromise = undefined;
      await browser?.close();
    }

    return ast;
  };
};

export default remarkMermaid;

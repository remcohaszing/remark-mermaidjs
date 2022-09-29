import { createRequire } from 'module';

import { fromParse5 } from 'hast-util-from-parse5';
import { type Code, type Parent, type Root } from 'mdast';
import { type Mermaid } from 'mermaid';
import { parseFragment } from 'parse5';
import puppeteer, { type Browser, type Page, type PuppeteerLaunchOptions } from 'puppeteer-core';
import { optimize, type OptimizedSvg, type OptimizeOptions } from 'svgo';
import { type Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const mermaidScript = {
  path: createRequire(import.meta.url).resolve('mermaid/dist/mermaid.min.js'),
};

declare const mermaid: Mermaid;

export const defaultSVGOOptions: OptimizeOptions = {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  multipass: false,
  plugins: [
    { name: 'addAttributesToSVGElement', active: false },
    { name: 'addClassesToSVGElement', active: false },
    { name: 'cleanupAttrs', active: true },
    { name: 'cleanupEnableBackground', active: false },
    { name: 'cleanupListOfValues', active: false },
    { name: 'cleanupNumericValues', active: true },
    { name: 'convertColors', active: true },
    { name: 'convertEllipseToCircle', active: true },
    { name: 'convertPathData', active: true },
    { name: 'convertShapeToPath', active: false },
    { name: 'convertTransform', active: true },
    { name: 'minifyStyles', active: true },
    { name: 'inlineStyles', active: true, params: { onlyMatchedOnce: false } },
    { name: 'convertStyleToAttrs', active: true },
    { name: 'mergePaths', active: true },
    { name: 'moveElemsAttrsToGroup', active: false },
    { name: 'moveGroupAttrsToElems', active: false },
    { name: 'prefixIds', active: false },
    { name: 'removeAttributesBySelector', active: false },
    { name: 'removeComments', active: true },
    { name: 'removeDesc', active: true },
    { name: 'removeDimensions', active: false },
    { name: 'removeDoctype', active: true },
    { name: 'removeEditorsNSData', active: true },
    { name: 'removeElementsByAttr', active: false },
    { name: 'removeEmptyAttrs', active: false },
    { name: 'removeEmptyContainers', active: true },
    { name: 'removeEmptyText', active: true },
    { name: 'removeHiddenElems', active: true },
    { name: 'removeMetadata', active: true },
    { name: 'removeNonInheritableGroupAttrs', active: true },
    { name: 'removeOffCanvasPaths', active: true },
    { name: 'removeRasterImages', active: true },
    { name: 'removeScriptElement', active: true },
    { name: 'removeStyleElement', active: true },
    { name: 'removeTitle', active: true },
    { name: 'removeUnknownsAndDefaults', active: true },
    { name: 'removeUnusedNS', active: true },
    { name: 'removeUselessDefs', active: true },
    { name: 'removeUselessStrokeAndFill', active: true, params: { removeNone: true } },
    { name: 'removeViewBox', active: true },
    { name: 'removeXMLNS', active: true },
    { name: 'removeXMLProcInst', active: true },
    { name: 'reusePaths', active: true },
    { name: 'removeAttrs', active: true, params: { attrs: ['class'] } },
    { name: 'cleanupIDs', active: true },
    { name: 'sortAttrs', active: true },
    { name: 'sortDefsChildren', active: true },
    { name: 'collapseGroups', active: true },
  ],
};

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
   * Set to `null` explicitly to disable this.
   *
   * **Note**: This options is only supported in Node.js. In the browser this option is unused.
   *
   * @default defaultSVGOOptions
   */
  svgo?: OptimizeOptions | null;

  /**
   * The mermaid options to use.
   *
   * **Note**: This options is only supported in Node.js. In the browser this option is unused. If
   * you use this in a browser, call `mermaid.initialize()` manually.
   */
  mermaidOptions?: Parameters<typeof mermaid['initialize']>[0];
}

/**
 * @param options Options that may be used to tweak the output.
 */
const remarkMermaid: Plugin<[RemarkMermaidOptions?], Root> = (options) => {
  if (!options?.launchOptions?.executablePath) {
    throw new Error('The option `launchOptions.executablePath` is required when using Node.js');
  }

  const { launchOptions, mermaidOptions, svgo = defaultSVGOOptions } = options;

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
      if (svgo) {
        value = (optimize(value, svgo) as OptimizedSvg).data;
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

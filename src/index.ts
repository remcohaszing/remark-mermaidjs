import { resolve } from 'path';
import { pathToFileURL } from 'url';

import * as fromParse5 from 'hast-util-from-parse5';
import { Code, Parent } from 'mdast';
import { Mermaid } from 'mermaid';
import { parseFragment } from 'parse5';
import * as puppeteer from 'puppeteer';
import { optimize, OptimizeOptions } from 'svgo';
import { Attacher } from 'unified';
import * as visit from 'unist-util-visit';

type Theme = 'dark' | 'default' | 'forest' | 'neutral';

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
   * Launc options to pass to puppeteer.
   *
   * @default {}
   */
  launchOptions?: puppeteer.LaunchOptions;

  /**
   * SVGO options used to minify the SVO output.
   *
   * Set to `null` explicitly to disable this.
   *
   * @default defaultSVGOOptions
   */
  svgo?: OptimizeOptions | null;

  /**
   * The Mermaod theme to use.
   *
   * @default 'default'
   */
  theme?: Theme;
}

/**
 * @param options - Options that may be used to tweak the output.
 */
export const remarkMermaid: Attacher<[RemarkMermaidOptions?]> = ({
  launchOptions = { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
  svgo = defaultSVGOOptions,
  theme = 'default',
} = {}) => {
  let browserPromise: Promise<puppeteer.Browser> | undefined;
  let count = 0;

  return async function transformer(ast) {
    const instances: [string, number, Parent][] = [];

    visit<Code>(ast, { type: 'code', lang: 'mermaid' }, (node, index, parent) => {
      instances.push([node.value, index, parent as Parent]);
    });

    // Nothing to do. No need to start puppeteer in this case.
    if (!instances.length) {
      return ast;
    }

    count += 1;
    browserPromise ??= puppeteer.launch(launchOptions);
    const browser = await browserPromise;
    let page: puppeteer.Page | undefined;
    try {
      page = await browser.newPage();
      await page.goto(String(pathToFileURL(resolve(__dirname, '..', 'index.html'))));
      await page.addScriptTag({ path: require.resolve('mermaid/dist/mermaid.min.js') });
      await page.setViewport({ width: 600, height: 3000 });

      const results = await page.evaluate(
        // We can’t calculate coverage on this function, as it’s run by Chrome, not Jest.
        /* istanbul ignore next */
        (codes: string[], t: Theme) =>
          codes.map((code) => {
            const id = 'a';
            mermaid.initialize({ theme: t });
            const div = document.createElement('div');
            div.innerHTML = mermaid.render(id, code);
            return div.innerHTML;
          }),
        instances.map((instance) => instance[0]),
        theme,
      );

      instances.map(([, index, parent], i) => {
        let value = results[i];
        if (svgo) {
          value = optimize(value, svgo).data;
        }
        parent.children.splice(index, 1, {
          type: 'paragraph',
          children: [{ type: 'html', value }],
          data: { hChildren: [fromParse5(parseFragment(value))] },
        });
      });
    } finally {
      count -= 1;
      await page?.close();
    }
    if (!count) {
      browserPromise = undefined;
      await browser?.close();
    }

    return ast;
  };
};

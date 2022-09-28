import { fromParse5 } from 'hast-util-from-parse5';
import { type Code, type Parent, type Root } from 'mdast';
import mermaid from 'mermaid';
import { parseFragment } from 'parse5';
import { type Plugin } from 'unified';
import { visit } from 'unist-util-visit';

// eslint-disable-next-line jsdoc/require-jsdoc
function transformer(ast: Root): void {
  const instances: [string, number, Parent][] = [];

  visit(ast, { type: 'code', lang: 'mermaid' }, (node: Code, index, parent: Parent) => {
    instances.push([node.value, index, parent]);
  });

  // Nothing to do. No need to start puppeteer in this case.
  if (!instances.length) {
    return;
  }

  const results = instances.map(([code], index) =>
    // @ts-expect-error The mermaid types are wrong.
    mermaid.render(`remark-mermaid-${index}`, code),
  );

  for (const [i, [, index, parent]] of instances.entries()) {
    const value = results[i];
    parent.children.splice(index, 1, {
      type: 'paragraph',
      children: [{ type: 'html', value }],
      data: { hChildren: [fromParse5(parseFragment(value))] },
    });
  }
}

const remarkMermaid: Plugin<[], Root> = () => transformer;

export default remarkMermaid;

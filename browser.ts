import { fromDom } from 'hast-util-from-dom';
import { type Code, type Parent } from 'mdast';
import mermaid from 'mermaid';
import type { RemarkMermaid } from 'remark-mermaidjs';
import { visit } from 'unist-util-visit';

const remarkMermaid: RemarkMermaid = (options) => (ast, file) => {
  const instances: [Code, number, Parent][] = [];

  visit(ast, { type: 'code', lang: 'mermaid' }, (node: Code, index, parent: Parent) => {
    instances.push([node, index, parent]);
  });

  // Nothing to do. No need to start puppeteer in this case.
  if (!instances.length) {
    return;
  }

  const results: string[] = [];
  const errors: string[] = [];
  for (const [index, [node]] of instances.entries()) {
    try {
      // @ts-expect-error The mermaid types are wrong.
      results[index] = mermaid.render(`remark-mermaid-${index}`, node.value);
    } catch (error) {
      errors[index] = error instanceof Error ? error.message : String(error);
    }
  }

  const wrapper = document.createElement('div');
  for (const [i, [node, index, parent]] of instances.entries()) {
    if (i in results) {
      const value = results[i];
      wrapper.innerHTML = value;
      parent.children.splice(index, 1, {
        type: 'paragraph',
        children: [{ type: 'html', value }],
        data: { hChildren: [fromDom(wrapper.firstChild!)] },
      });
    } else if (options?.errorFallback) {
      const fallback = options.errorFallback(node, errors[i], file);
      if (fallback) {
        parent.children[index] = fallback;
      } else {
        parent.children.splice(index, 1);
      }
    } else {
      file.fail(errors[i], node, 'remark-mermaidjs:remark-mermaidjs');
    }
  }
};

export default remarkMermaid;

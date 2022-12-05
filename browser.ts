import { fromDom } from 'hast-util-from-dom';
import mermaid from 'mermaid';
import { type RemarkMermaid } from 'remark-mermaidjs';

import { extractCodeBlocks, replaceCodeBlocks } from './shared.js';

const remarkMermaid: RemarkMermaid = (options) => (ast, file) => {
  const instances = extractCodeBlocks(ast);

  // Nothing to do. No need to do further processing.
  if (!instances.length) {
    return;
  }

  const results = instances.map(([node], index) => {
    try {
      return {
        success: true,
        // @ts-expect-error The mermaid types are wrong.
        result: mermaid.render(`remark-mermaid-${index}`, node.value),
      };
    } catch (error) {
      return {
        success: false,
        result: error instanceof Error ? error.message : String(error),
      };
    }
  });

  const wrapper = document.createElement('div');
  replaceCodeBlocks(instances, results, options, file, (value) => {
    wrapper.innerHTML = value;
    return [value, fromDom(wrapper.firstChild!)];
  });
};

export default remarkMermaid;

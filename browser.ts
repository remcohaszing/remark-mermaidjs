import mermaid from 'mermaid';
import { type RemarkMermaid } from 'remark-mermaidjs';

import { extractCodeBlocks, replaceCodeBlocks } from './shared.js';

let counter = 0;
const remarkMermaid: RemarkMermaid = (options) => (ast, file) => {
  const instances = extractCodeBlocks(ast);

  // Nothing to do. No need to do further processing.
  if (!instances.length) {
    return;
  }

  const results = instances.map(([node]) => {
    try {
      // @ts-expect-error The mermaid types are wrong.
      const result = mermaid.render(`remark-mermaid-${counter}`, node.value);
      counter += 1;
      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        result: error instanceof Error ? error.message : String(error),
      };
    }
  });

  replaceCodeBlocks(instances, results, options, file);
};

export default remarkMermaid;

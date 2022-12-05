import type { RemarkMermaidOptions } from 'remark-mermaidjs';

export const options: RemarkMermaidOptions = {
  errorFallback(node, error, vfile) {
    return {
      type: 'code',
      value: `${vfile.basename}\n\n${error}\n\n${JSON.stringify(node, undefined, 2)}`,
    };
  },
};

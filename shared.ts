import { type Node } from 'hast';
import { type Code, type Parent, type Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { type VFile } from 'vfile';

import { type RemarkMermaidOptions } from './index.js';

type CodeInstance = [Code, number, Parent];

/**
 * Extract Mermaid code blocks from the AST.
 *
 * @param ast The markdown AST to extract code blocks from.
 * @returns A list of tuples that represent the code blocks.
 */
export function extractCodeBlocks(ast: Root): CodeInstance[] {
  const instances: CodeInstance[] = [];

  visit(ast, { type: 'code', lang: 'mermaid' }, (node: Code, index, parent: Parent) => {
    instances.push([node, index, parent]);
  });

  return instances;
}

export interface Result {
  /**
   * This indicates diagram was rendered succesfully.
   */
  success: boolean;

  /**
   * Either the resulting SVG code or the error message depending on the success status.
   */
  result: string;
}

/**
 * Replace the code blocks with rendered diagrams.
 *
 * @param instances The code block instances to replace.
 * @param results The diagram rendering results.
 * @param options The `remark-mermaidjs` options as given by the user.
 * @param file The file to report errors on.
 * @param processDiagram Postprocess a diagram.
 */
export function replaceCodeBlocks(
  instances: CodeInstance[],
  results: Result[],
  options: RemarkMermaidOptions | undefined,
  file: VFile,
  processDiagram: (diagram: string) => [string, Node],
): void {
  for (const [i, [node, index, parent]] of instances.entries()) {
    const result = results[i];
    if (result.success) {
      const [value, hChild] = processDiagram(result.result);
      parent.children[index] = {
        type: 'paragraph',
        children: [{ type: 'html', value }],
        data: { hChildren: [hChild] },
      };
    } else if (options?.errorFallback) {
      const fallback = options.errorFallback(node, result.result, file);
      if (fallback) {
        parent.children[index] = fallback;
      } else {
        parent.children.splice(index, 1);
      }
    } else {
      file.fail(result.result, node, 'remark-mermaidjs:remark-mermaidjs');
    }
  }
}

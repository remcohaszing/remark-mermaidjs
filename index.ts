import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { type BlockContent, type Code, type Parent, type Root } from 'mdast'
import {
  createMermaidRenderer,
  type CreateMermaidRendererOptions,
  type RenderOptions
} from 'mermaid-isomorphic'
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { type VFile } from 'vfile'

type CodeInstance = [Code, Parent]

export interface RemarkMermaidOptions
  extends CreateMermaidRendererOptions,
    Omit<RenderOptions, 'screenshot'> {
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
  errorFallback?: (node: Code, error: string, file: VFile) => BlockContent | undefined | void
}

export type RemarkMermaid = Plugin<[RemarkMermaidOptions?], Root>

/**
 * @param options Options that may be used to tweak the output.
 */
const remarkMermaid: RemarkMermaid = (options) => {
  const render = createMermaidRenderer(options)

  return async function transformer(ast, file) {
    const instances: CodeInstance[] = []

    visit(ast, { type: 'code', lang: 'mermaid' }, (node: Code, index, parent: Parent) => {
      instances.push([node, parent])
    })

    // Nothing to do. No need to start a browser in this case.
    if (!instances.length) {
      return
    }

    const results = await render(
      instances.map((instance) => instance[0].value),
      options
    )

    for (const [i, [node, parent]] of instances.entries()) {
      const result = results[i]
      const nodeIndex = parent.children.indexOf(node)

      if (result.status === 'fulfilled') {
        const { svg } = result.value
        const hChildren = fromHtmlIsomorphic(svg, { fragment: true }).children
        parent.children[nodeIndex] = {
          type: 'paragraph',
          children: [{ type: 'html', value: svg }],
          data: { hChildren }
        }
      } else if (options?.errorFallback) {
        const fallback = options.errorFallback(node, result.reason, file)
        if (fallback) {
          parent.children[nodeIndex] = fallback
        } else {
          parent.children.splice(nodeIndex, 1)
        }
      } else {
        file.fail(result.reason, node, 'remark-mermaidjs:remark-mermaidjs')
      }
    }
  }
}

export default remarkMermaid

import { type ElementContent } from 'hast'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { type BlockContent, type Code, type Parent, type Root } from 'mdast'
import {
  createMermaidRenderer,
  type CreateMermaidRendererOptions,
  type RenderOptions
} from 'mermaid-isomorphic'
import { type Plugin } from 'unified'
import { visitParents } from 'unist-util-visit-parents'
import { type VFile } from 'vfile'

type Ancestors = (Code | Parent)[]

export interface RemarkMermaidOptions
  extends CreateMermaidRendererOptions,
    Omit<RenderOptions, 'screenshot'> {
  /**
   * Create a fallback node if processing of a mermaid diagram fails.
   *
   * @param node
   *   The mdast `code` node that couldn’t be rendered.
   * @param error
   *   The error message that was thrown.
   * @param file
   *   The file on which the error occurred.
   * @returns
   *   A fallback node to render instead of the invalid diagram. If nothing is returned, the code
   *   block is removed
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  errorFallback?: (node: Code, error: string, file: VFile) => BlockContent | undefined | void
}

/**
 * @param options
 *   Options that may be used to tweak the output.
 */
const remarkMermaid: Plugin<[RemarkMermaidOptions?], Root> = (options) => {
  const render = createMermaidRenderer(options)

  return function transformer(ast, file) {
    const instances: Ancestors[] = []

    visitParents(ast, { type: 'code', lang: 'mermaid' }, (node: Code, ancestors) => {
      instances.push([...ancestors, node])
    })

    // Nothing to do. No need to start a browser in this case.
    if (!instances.length) {
      return
    }

    return render(
      instances.map((ancestors) => (ancestors.at(-1) as Code).value),
      options
    ).then((results) => {
      for (const [i, ancestors] of instances.entries()) {
        const result = results[i]
        const node = ancestors.at(-1) as Code
        const parent = ancestors.at(-2) as Parent
        const nodeIndex = parent.children.indexOf(node)

        if (result.status === 'fulfilled') {
          const { svg } = result.value
          const hChildren = fromHtmlIsomorphic(svg, { fragment: true }).children as ElementContent[]
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
          const message = file.message(result.reason, {
            ruleId: 'remark-mermaidjs',
            source: 'remark-mermaidjs',
            ancestors
          })
          message.fatal = true
          message.url = 'https://github.com/remcohaszing/remark-mermaidjs'
          throw message
        }
      }
    })
  }
}

export default remarkMermaid

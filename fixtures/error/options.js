/** @type {import('remark-mermaidjs').RemarkMermaidOptions} */
export default {
  errorFallback(node, error, vfile) {
    return {
      type: 'code',
      value: `${vfile.basename}\n\n${error}\n\n${JSON.stringify(node, undefined, 2)}`
    }
  }
}

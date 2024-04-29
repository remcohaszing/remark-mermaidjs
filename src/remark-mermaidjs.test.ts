import assert from 'node:assert/strict'
import { test } from 'node:test'

import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkMermaid, { type RemarkMermaidOptions } from 'remark-mermaidjs'
import remarkRehype from 'remark-rehype'
import { testFixturesDirectory } from 'snapshot-fixtures'
import { VFile } from 'vfile'

testFixturesDirectory<RemarkMermaidOptions>({
  directory: new URL('../fixtures', import.meta.url),
  tests: {
    'expected.md'(input, options) {
      return remark().use(remarkMermaid, options).process(input)
    },

    'expected.html'(input, options) {
      return remark()
        .use(remarkMermaid, options)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(input)
    }
  }
})

test('it should throw a vfile error if a diagram is invalid without error fallback', async () => {
  const processor = remark().use(remarkMermaid)
  const file = new VFile('```mermaid\ninvalid\n```\n')
  await assert.rejects(processor.process(file))
  assert.equal(file.messages.length, 1)
  assert.equal(
    file.messages[0].message,
    'No diagram type detected matching given configuration for text: invalid'
  )
  assert.equal(file.messages[0].source, 'remark-mermaidjs')
  assert.equal(file.messages[0].ruleId, 'remark-mermaidjs')
  assert.equal(file.messages[0].fatal, true)
  assert.deepEqual(file.messages[0].place, {
    start: { offset: 0, line: 1, column: 1 },
    end: { offset: 22, line: 3, column: 4 }
  })
})

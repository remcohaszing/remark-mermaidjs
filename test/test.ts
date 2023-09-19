import { readdir, readFile } from 'node:fs/promises'

import { expect, test } from '@playwright/test'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import { VFile } from 'vfile'

import remarkMermaid, { type RemarkMermaidOptions } from '../index.js'

const fixtures = new URL('fixtures/', import.meta.url)
const fixtureNames = await readdir(fixtures)

test.describe.parallel('node', () => {
  for (const name of fixtureNames) {
    // eslint-disable-next-line no-empty-pattern
    test(name, async ({}, testInfo) => {
      testInfo.snapshotSuffix = 'node'
      const fixture = new URL(`${name}/`, fixtures)
      const value = await readFile(new URL('input.md', fixture))
      let options: RemarkMermaidOptions | undefined
      try {
        ;({ options } = await import(String(new URL('options.ts', fixture))))
      } catch {
        // This test case uses default options.
      }
      const processor = remark().use(remarkMermaid, options)
      const asMarkdown = await processor.process({ path: `${name}/input.md`, value })
      const asHTML = await processor()
        .use(remarkRehype)
        .use(rehypeStringify)
        .process({ path: `${name}/input.md`, value })
      expect(asMarkdown.value).toMatchSnapshot({ name: `${name}.md` })
      expect(asHTML.value).toMatchSnapshot({ name: `${name}.html` })
    })
  }

  test('it should throw a vfile error if a diagram is invalid without error fallback', async () => {
    const processor = remark().use(remarkMermaid)
    const file = new VFile('```mermaid\ninvalid\n```\n')
    await expect(() => processor.process(file)).rejects.toThrowError(
      'No diagram type detected matching given configuration for text: invalid'
    )
    expect(file.messages).toHaveLength(1)
    expect(file.messages[0].message).toBe(
      'No diagram type detected matching given configuration for text: invalid'
    )
    expect(file.messages[0].source).toBe('remark-mermaidjs')
    expect(file.messages[0].ruleId).toBe('remark-mermaidjs')
    expect(file.messages[0].fatal).toBe(true)
    expect(file.messages[0].place).toStrictEqual({
      start: { offset: 0, line: 1, column: 1 },
      end: { offset: 22, line: 3, column: 4 }
    })
  })
})

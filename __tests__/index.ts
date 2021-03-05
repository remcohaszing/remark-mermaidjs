import { promises as fs, readdirSync } from 'fs';
import { join, resolve } from 'path';

import { toMatchFile } from 'jest-file-snapshot';
import * as puppeteer from 'puppeteer';
import * as rehypeStringify from 'rehype-stringify';
import * as remark from 'remark';
import * as remarkRehype from 'remark-rehype';

import { defaultSVGOOptions, remarkMermaid, RemarkMermaidOptions } from '../src';

expect.extend({ toMatchFile });

describe('fixtures', () => {
  const fixtures = resolve(__dirname, '..', '__fixtures__');

  it.each(readdirSync(fixtures))('%s', async (fixture) => {
    const f = join(fixtures, fixture);
    const actual = await fs.readFile(join(f, 'input.md'));
    const expected = join(f, 'output.md');
    let options: RemarkMermaidOptions = {
      svgo: defaultSVGOOptions,
    };
    try {
      options = await import(join(f, 'options'));
    } catch {
      // This test case uses default options.
    }
    const { contents } = await remark().use(remarkMermaid, options).process(actual);
    expect(contents).toMatchFile(expected);
  });
});

const markdown = `
\`\`\`mermaid
graph TD;
  A-->B;
\`\`\`
`;

it('should not launch the browser if no graphs are defined', async () => {
  const processor = remark().use(remarkMermaid);
  jest.spyOn(puppeteer, 'launch');
  await processor.process('```js\n```');
  // eslint-disable-next-line jest/no-restricted-matchers
  expect(puppeteer.launch).not.toHaveBeenCalled();
});

it('should share the browser for concurrent calls', async () => {
  const processor = remark().use(remarkMermaid);
  jest.spyOn(puppeteer, 'launch');
  await Promise.all(
    Array.from<string>({ length: 3 })
      .fill(markdown)
      .map((content) => processor.process(content)),
  );
  expect(puppeteer.launch).toHaveBeenCalledTimes(1);
});

it('should close the browser if no more files are being processed', async () => {
  const processor = remark().use(remarkMermaid);
  jest.spyOn(puppeteer, 'launch');
  for (const content of Array.from<string>({ length: 3 }).fill(markdown)) {
    await processor.process(content);
  }
  expect(puppeteer.launch).toHaveBeenCalledTimes(3);
});

it('should output a remark-rehype compatible ast', async () => {
  const processor = remark().use(remarkMermaid).use(remarkRehype).use(rehypeStringify);
  jest.spyOn(puppeteer, 'launch');
  const { contents } = await processor.process(`
\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
`);
  expect(contents).toMatchFile(join(__dirname, '__snapshots__', 'rehype.html'));
});

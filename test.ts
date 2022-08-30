import { readdir, readFile, writeFile } from 'fs/promises';
import process from 'process';

// Import puppeteer from 'puppeteer';
// import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
// Import remarkRehype from 'remark-rehype';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { defaultSVGOOptions, remarkMermaid, RemarkMermaidOptions } from './index.js';

const fixtures = new URL('__fixtures__/', import.meta.url);

for (const name of await readdir(fixtures)) {
  test(name, async () => {
    const fixture = new URL(`${name}/`, fixtures);
    const actual = await readFile(new URL('input.md', fixture));
    const expectedPath = new URL('output.md', fixture);
    const expected = await readFile(new URL('output.md', fixture), 'utf8');
    let options: RemarkMermaidOptions = {
      svgo: defaultSVGOOptions,
    };
    try {
      options = JSON.parse(await readFile(new URL('options.json', fixture), 'utf8'));
    } catch {
      // This test case uses default options.
    }
    const { value } = await remark().use(remarkMermaid, options).process(actual);
    if (process.argv.includes('--write') && value !== expected) {
      console.log('Updating fixture', expectedPath.pathname);
      await writeFile(expectedPath, value);
    }
    assert.is(value, expected);
  });
}

// Const markdown = `
// \`\`\`mermaid
// graph TD;
//   A-->B;
// \`\`\`
// `;

// Test('should not launch the browser if no graphs are defined', async () => {
//   const processor = remark().use(remarkMermaid);
//   jest.spyOn(puppeteer, 'launch');
//   await processor.process('```js\n```');
//   expect(puppeteer.launch).not.toHaveBeenCalled();
// });

// test('should share the browser for concurrent calls', async () => {
//   const processor = remark().use(remarkMermaid);
//   jest.spyOn(puppeteer, 'launch');
//   await Promise.all(
//     Array.from<string>({ length: 3 })
//       .fill(markdown)
//       .map((content) => processor.process(content)),
//   );
//   expect(puppeteer.launch).toHaveBeenCalledTimes(1);
// });

// test('should close the browser if no more files are being processed', async () => {
//   const processor = remark().use(remarkMermaid);
//   jest.spyOn(puppeteer, 'launch');
//   for (const content of Array.from<string>({ length: 3 }).fill(markdown)) {
//     await processor.process(content);
//   }
//   expect(puppeteer.launch).toHaveBeenCalledTimes(3);
// });

// test('should output a remark-rehype compatible ast', async () => {
//   const processor = remark().use(remarkMermaid).use(remarkRehype).use(rehypeStringify);
//   jest.spyOn(puppeteer, 'launch');
//   const { contents } = await processor.process(`
// \`\`\`mermaid
// graph TD;
//     A-->B;
//     A-->C;
//     B-->D;
//     C-->D;
// \`\`\`
// `);
//   const expected = await readFile(new URL('__snapshots__/rehype.html', import.meta.url), 'utf8');
//   assert.is(contents, expected);
// });

test.run();

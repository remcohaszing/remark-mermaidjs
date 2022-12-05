import { readdir, readFile } from 'node:fs/promises';

import { chromium, expect, test } from '@playwright/test';
import puppeteer from 'puppeteer-core';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import sinon from 'sinon';
import { VFile } from 'vfile';

import remarkMermaid, { type RemarkMermaidOptions } from '../index.js';

const fixtures = new URL('fixtures/', import.meta.url);
const fixtureNames = await readdir(fixtures);
const launchOptions = {
  executablePath: chromium.executablePath(),
};
const markdown = `
\`\`\`mermaid
graph TD;
A-->B;
\`\`\`
`;

test.describe.parallel('browser', () => {
  for (const name of fixtureNames) {
    test(name, async ({ page }, testInfo) => {
      testInfo.snapshotSuffix = 'browser';
      await page.goto('/');

      const result = await page.evaluate(async (fixtureName) => {
        const { processFixture } = await import('./runInBrowser.js');

        return processFixture(fixtureName);
      }, name);

      expect(result[0]).toMatchSnapshot({ name: `${name}.md` });
      expect(result[1]).toMatchSnapshot({ name: `${name}.html` });
    });
  }
});

test.describe.parallel('node', () => {
  for (const name of fixtureNames) {
    // eslint-disable-next-line no-empty-pattern
    test(name, async ({}, testInfo) => {
      testInfo.snapshotSuffix = 'node';
      const fixture = new URL(`${name}/`, fixtures);
      const value = await readFile(new URL('input.md', fixture));
      let options: RemarkMermaidOptions = {
        launchOptions,
      };
      try {
        ({ options } = await import(String(new URL('options.ts', fixture))));
        options.launchOptions = launchOptions;
      } catch {
        // This test case uses default options.
      }
      const processor = remark().use(remarkMermaid, options);
      const asMarkdown = await processor.process({ path: `${name}/input.md`, value });
      const asHTML = await processor()
        .use(remarkRehype)
        .use(rehypeStringify)
        .process({ path: `${name}/input.md`, value });
      expect(asMarkdown.value).toMatchSnapshot({ name: `${name}.md` });
      expect(asHTML.value).toMatchSnapshot({ name: `${name}.html` });
    });
  }
});

test.describe.serial('node', () => {
  test.afterEach(() => {
    sinon.restore();
  });

  test('it should not launch the browser if no graphs are defined', async () => {
    const processor = remark().use(remarkMermaid, { launchOptions });
    const launch = sinon.spy(puppeteer, 'launch');
    await processor.process('```js\n```');
    sinon.assert.notCalled(launch);
  });

  test('it should share the browser for concurrent calls', async () => {
    const processor = remark().use(remarkMermaid, { launchOptions });
    const launch = sinon.spy(puppeteer, 'launch');
    await Promise.all(
      Array.from<string>({ length: 3 })
        .fill(markdown)
        .map((content) => processor.process(content)),
    );
    sinon.assert.calledOnce(launch);
  });

  test('it should close the browser if no more files are being processed', async () => {
    const processor = remark().use(remarkMermaid, { launchOptions });
    const launch = sinon.spy(puppeteer, 'launch');
    for (const content of Array.from<string>({ length: 3 }).fill(markdown)) {
      await processor.process(content);
    }
    sinon.assert.calledThrice(launch);
  });

  test('it should throw an error if no executablePath is given', () => {
    expect(() => remark().use(remarkMermaid).processSync('')).toThrowError(
      'The option `launchOptions.executablePath` is required when using Node.js',
    );
    expect(() => remark().use(remarkMermaid, { launchOptions: {} }).processSync('')).toThrowError(
      'The option `launchOptions.executablePath` is required when using Node.js',
    );
  });

  test('it should throw a vfile error if a diagram is invalid without error fallback', async () => {
    const processor = remark().use(remarkMermaid, { launchOptions });
    const file = new VFile('```mermaid\ninvalid\n```\n');
    await expect(() => processor.process(file)).rejects.toThrowError(
      'No diagram type detected for text: invalid',
    );
    expect(file.messages).toHaveLength(1);
    expect(file.messages[0].message).toBe('No diagram type detected for text: invalid');
    expect(file.messages[0].source).toBe('remark-mermaidjs');
    expect(file.messages[0].ruleId).toBe('remark-mermaidjs');
    expect(file.messages[0].fatal).toBe(true);
    expect(file.messages[0].position).toStrictEqual({
      start: { offset: 0, line: 1, column: 1 },
      end: { offset: 22, line: 3, column: 4 },
    });
  });
});

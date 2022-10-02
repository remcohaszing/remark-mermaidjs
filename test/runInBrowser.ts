import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';

import remarkMermaid from '../browser.js';

/**
 * Process a fixture using remark and remark-mermaidjs.
 *
 * This function is run in the browser.
 *
 * @param name The name of the fixture to process.
 * @returns A tuple of the file processed to both markdown and HTML.
 */
export async function processFixture(name: string): Promise<[string, string]> {
  const response = await fetch(`fixtures/${name}/input.md`);
  const original = await response.text();
  const processor = remark().use(remarkMermaid);
  const asMarkdown = processor.processSync(original);
  const asHTML = processor().use(remarkRehype).use(rehypeStringify).processSync(original);
  return [asMarkdown.value as string, asHTML.value as string];
}

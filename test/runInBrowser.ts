import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import { type RemarkMermaidOptions } from 'remark-mermaidjs';
import remarkRehype from 'remark-rehype';

import { options as error } from './fixtures/error/options.js';
import { options as errorEmpty } from './fixtures/errorEmpty/options.js';
import remarkMermaid from '../browser.js';

const options: Record<string, RemarkMermaidOptions> = { error, errorEmpty };

/**
 * Process a fixture using remark and remark-mermaidjs.
 *
 * This function is run in the browser.
 *
 * @param name The name of the fixture to process.
 * @returns A tuple of the file processed to both markdown and HTML.
 */
export async function processFixture(name: string): Promise<[string, string]> {
  const testOptions = name in options ? options[name] : undefined;
  const path = `fixtures/${name}/input.md`;
  const response = await fetch(path);
  const value = await response.text();
  const processor = remark().use(remarkMermaid, testOptions);
  const asMarkdown = processor.processSync({ path, value });
  const asHTML = processor().use(remarkRehype).use(rehypeStringify).processSync({ path, value });
  return [asMarkdown.value as string, asHTML.value as string];
}

import { promises as fs, readdirSync } from 'fs';
import { join, resolve } from 'path';

import { toMatchFile } from 'jest-file-snapshot';
import * as remark from 'remark';

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

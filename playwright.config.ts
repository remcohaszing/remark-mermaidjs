import { type PlaywrightTestConfig } from '@playwright/test';
import { serve } from 'esbuild';

const { port } = await serve(
  { servedir: 'test' },
  {
    bundle: true,
    entryPoints: ['./test/runInBrowser.ts'],
    format: 'esm',
    platform: 'browser',
  },
);

const config: PlaywrightTestConfig = {
  testMatch: /test\/test\.ts$/,
  metadata: {},
  webServer: {
    command: '',
    port,
    reuseExistingServer: true,
  },
};

export default config;

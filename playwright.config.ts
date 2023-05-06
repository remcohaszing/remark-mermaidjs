import { type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testMatch: /test\/test\.ts$/,
  metadata: {}
}

export default config

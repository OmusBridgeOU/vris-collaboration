// playwright.config.ts（nuxt.config.ts と同じ階層に置く）
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './app/test/e2e',
  snapshotDir: './app/test/e2e/snapshots',
  use: {
    baseURL: 'http://localhost:3000',
  },
})

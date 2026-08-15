import { defineConfig, devices } from '@playwright/test';

import _globalThis from '../src/@types/global-this';

export default defineConfig({
  timeout: 60000, // Timeout is shared between all tests.
  testDir: `${process.cwd()}/src/tests.integration.e2e`,
  outputDir: `${process.cwd()}/src/tests.integration.e2e/results`,
  
  projects: [
    {
      name: 'local-dev',
      use: {
        baseURL: _globalThis.app_url,
        //...devices['Desktop Chrome'],
        ...devices['Desktop Firefox'],
        //...devices['Pixel 5']
      },
      retries: 0
    },
    {
      name: 'main-dev',
      use: {
        baseURL: 'dev.mainframenzo.com',
        //...devices['Desktop Chrome'],
        ...devices['Desktop Firefox'],
        //...devices['Pixel 5']
      },
      retries: 0
    },
    {
      name: 'main-prod',
      use: {
        baseURL: 'mainframenzo.com',
        //...devices['Desktop Chrome'],
        ...devices['Desktop Firefox'],
        //...devices['Pixel 5']
      },
      retries: 0
    }
  ]
});
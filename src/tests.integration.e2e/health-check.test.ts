// This file is responsible for providing a VERY simple "health check" to ensure the website loads properly.
//import _globalThis from '../@types/global-this';

import { test, expect } from '@playwright/test';

test('health check', async ({ page, baseURL }) => {
  await page.goto(baseURL!);

  await page.screenshot({ path: `${process.cwd()}/src/tests.integration.e2e/results/health-check.png`, fullPage: true });

  await expect(page).toHaveTitle('Mainframe Enzo\'s Blog');

  // FIXME /html/body/main/section/div/div[2]/h2 > 1
});

// FIXME validate private files not there.
// Do this here because our list is in Node.js.
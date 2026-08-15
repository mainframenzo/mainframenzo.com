// This file is responsible for checking that no private files made there way into the website build.
import { test, expect } from '@playwright/test';

import { dirsToScrub, filesToScrub } from '../../build-utils/scripts/private-to-public.config';

test('no private info', async ({ page, baseURL }) => {
  for (const dirToScrub of dirsToScrub) {
    const response = await page.goto(`${baseURL}/${dirToScrub}`);
    expect(response?.status()).toBe(404);
  }

  for (const fileToScrub of filesToScrub) {
    const response = await page.goto(`${baseURL}/${fileToScrub}`);
    expect(response?.status()).toBe(404);
  }
});
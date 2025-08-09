// This file is responsible for providing a VERY simple "health check" to ensure the website loads properly.
import _globalThis from '../@types/global-this';

import * as log from 'ts-app-logger';
import { strict as assert } from 'node:assert';
import * as utils from './utils';

export const healthCheckTest = async () => {
  log.trace('healthCheckTest');

  log.debug('visit page', _globalThis.app_url);

  const [browser, page] = await utils.getBrowserPage();

  log.debug('visit page', _globalThis.app_url);
  await page.goto(_globalThis.app_url);
  const pageTitle = await page.title();
  log.debug('saving page screenshot /var/task/mainframenzo.com.png');
  await page.screenshot({ path: _globalThis.app_location === 'local' ? '/tmp/mainframenzo.com.png' : '/var/task/mainframenzo.com.png', fullPage: true });
  
  await browser.close();

  log.debug('assert pageTitle === Mainframe Enzo\'s Blog', pageTitle);
  assert.strictEqual(pageTitle, 'Mainframe Enzo\'s Blog');
}
// This file is responsible for providing clicky-click test utils.
// Note: inside page.evaluate(... you must use "console" and not our logger.
import _globalThis from '../@types/global-this';

import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import { Browser, Dialog, Page, default as puppeteer } from 'puppeteer-core';
import { default as chromium } from '@sparticuz/chromium';

export const getBrowserPage = async (): Promise<[Browser, Page]> => {
  log.trace('getBrowserPage');

  const headless = _globalThis.headless !== undefined ? _globalThis.headless : true;

  chromium.setGraphicsMode = true; // Enable WebGL.

  // This path didn't work for me locally.
  //const executablePath = await chromium.executablePath();

  const executablePath = _globalThis.app_location === 'local' ? '/opt/homebrew/bin/chromium' : await chromium.executablePath('/opt/nodejs/node_modules/@sparticuz/chromium/bin');
  log.debug('executablePath', executablePath);

  //log.debug('chromium.args', chromium.args);
  const chromiumArgs = [
    '--allow-pre-commit-input',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-extensions-with-background-pages',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-popup-blocking',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-sync',
    '--enable-automation',
    '--enable-blink-features=IdleDetection',
    '--export-tagged-pdf',
    '--force-color-profile=srgb',
    '--metrics-recording-only',
    '--no-first-run',
    '--password-store=basic',
    '--use-mock-keychain',
    '--disable-domain-reliability',
    '--disable-print-preview',
    '--disable-speech-api',
    '--disk-cache-size=33554432',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-pings',
    '--single-process',
    '--disable-features=Translate,BackForwardCache,AcceptCHFrame,MediaRouter,OptimizationHints,AudioServiceOutOfProcess,IsolateOrigins,site-per-process',
    '--enable-features=NetworkServiceInProcess2,SharedArrayBuffer',
    '--hide-scrollbars',
    '--ignore-gpu-blocklist',
    '--in-process-gpu',
    '--window-size=1920,1080',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--allow-running-insecure-content',
    '--disable-setuid-sandbox',
    '--disable-site-isolation-trials',
    '--disable-web-security',
    '--no-sandbox',
    '--no-zygote'
    // ^ chromium.args defaults.
  ];

  headless ? chromiumArgs.push('--headless=new') : undefined;
  
  log.debug('chromiumArgs', chromiumArgs);

  const browser = await puppeteer.launch({
    args: chromiumArgs,
    //ignoreHTTPSErrors: true,
    //defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: headless,
    userDataDir: _globalThis.app_location === 'local' ? '/tmp' : '/var/task'
  });

  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true); 
  
  page.setDefaultNavigationTimeout(60 * 1000);

  page
    .on('console', message => log.debug(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    .on('pageerror', ({ message }) => log.debug(message))
    .on('response', response => log.debug(`${response.status()} ${response.url()}`))
    .on('requestfailed', request => log.error(`${request?.failure()?.errorText} ${request.url()}`));

  // The web application shows before unload messages, ignore during test.
  //await page.evaluate(() => { window.onbeforeunload = null; });
  const acceptBeforeUnload = (dialog: Dialog) => {
    dialog.type() === 'beforeunload' && dialog.accept();
  }

  page.on('dialog', acceptBeforeUnload); 

  return [browser, page];
}
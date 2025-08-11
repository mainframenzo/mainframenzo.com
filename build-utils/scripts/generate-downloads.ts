// This file is responsible for generating files in specific non-web formats so they are available for download.
// This is manually run. Update as necessary before deploying.
import _globalThis from '../../src/@types/global-this';

import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import * as fs from 'node:fs';
import * as path from 'node:path';

import * as integrationE2ETestUtils from '../../src/tests.integration.e2e/utils';

// TODO
// resume as png / pdf / docx: https://www.npmjs.com/package/docx
// bom png / pdf / excel / csv: https://www.geeksforgeeks.org/node-js/how-to-convert-csv-to-excel-in-node-js/
// build slideshow zips: https://github.com/shortercode/zip
// 3d slideshows zips: https://github.com/shortercode/zip
export const generateDownloads = async () => {
  await generateResumeDownloads();
  //await generatePostsDownloads();
}

// Generate your resume in these formats:
// * .pdf
// * .docx (be lazy about this: embed pdf in .docx) 
// * .png
const generateResumeDownloads = async () => {
  log.trace('generateResumeDownloads');

  // These aren't _technically_ downloadable via the website but you store them with the private version of this source.
  await generateResumeAsPNGAndPDF(true);
  await generateResumeAsDOCX(true);

  /*
  await generateResumeAsPNGAndPDF(false);
  await generateResumeAsDOCX(false);
  */
}

const generateResumeAsPNGAndPDF = async (isPrivate?: boolean) => {
  log.trace('generateResumeAsPNGAndPDF');

  const [browser, page] = await integrationE2ETestUtils.getBrowserPage();

  log.debug('visit page', `http://localhost:8080/resume${isPrivate ? '-private': ''}.html`);
  await page.goto(`http://localhost:8080/resume${isPrivate ? '-private': ''}.html`);
  log.debug(`saving page screenshot /tmp/mainframenzo.com-resume${isPrivate ? '-private': ''}.png`);
  await page.screenshot({ path: `/tmp/mainframenzo.com-resume${isPrivate ? '-private': ''}.png`, fullPage: true });
  await page.pdf({ path: `/tmp/mainframenzo.com-resume${isPrivate ? '-private': ''}.pdf` });

  await fs.copyFileSync(`/tmp/mainframenzo.com-resume${isPrivate ? '-private': ''}.pdf`, path.join(process.cwd(), `./src/frontend/public/downloads/resume${isPrivate ? '-private': ''}.pdf`));
  await fs.copyFileSync(`/tmp/mainframenzo.com-resume${isPrivate ? '-private': ''}.png`, path.join(process.cwd(), `./src/frontend/public/downloads/resume${isPrivate ? '-private': ''}.png`));

  await browser.close();
}

const generateResumeAsDOCX = async (isPrivate?: boolean) => {
  log.trace('generateResumeAsDOCX');
}

// Generate (blog) posts downloads which are a .zip file that includes:
// * <post-name>-bom.csv
// * A directory, /design-files, which contains all the design files
// * A directory, /build-walkthrough-images, which contains all the build images
const generatePostsDownloads = async () => {
  log.trace('generatePostsDownloads');

  for (const post in []) {
    await generatePostDownloads();
  }
}

const generatePostDownloads = async () => {
  log.trace('generatePostDownloads');

  await addPostBOMCSVToZIP();
  await addPostDesignFilesToZIP();
  await addPostBuildImagesToZIP();
}

const addPostBOMCSVToZIP = async () => {
  log.trace('addPostBOMCSVToZIP');
}

const addPostDesignFilesToZIP = async () => {
  log.trace('addPostDesignFilesToZIP');
}

const addPostBuildImagesToZIP = async () => {
  log.trace('addPostBuildImagesToZIP');
}

await generateDownloads();
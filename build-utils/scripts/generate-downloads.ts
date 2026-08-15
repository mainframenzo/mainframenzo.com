#! node
// This file is responsible for generating files in specific non-web formats so they are available for download.
// This is manually run. Update as necessary before deploying.
import _globalThis from '../../src/@types/global-this';

import * as fs from 'node:fs';
import * as path from 'node:path';
import { spawn, type ChildProcess } from 'node:child_process';
import http from 'node:http';
import process from 'node:process';
import { chromium } from 'playwright';

// FIXME
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
  console.trace('generateResumeDownloads');

  // These aren't _technically_ downloadable via the website but you store them with the private version of this source.
  await generateResumeAsPNGAndPDF();
  await generateResumeAsDOCX(true);

  /*
  await generateResumeAsPNGAndPDF(false);
  await generateResumeAsDOCX(false);
  */
}

const generateResumeAsPNGAndPDF = async (): Promise<void> => {
  console.trace('generateResumeAsPNGAndPDF');

  const options = {
    appPort: 8080,
    apiPort: 8081,
    startupTimeoutMs: 30_1000
  };

  const appUrl = `http://127.0.0.1:${options.appPort}`;

  // FIXME Killing this does not kill the LLM process.
  const app = startProcess('frontend',
    'just', ['-f', './.justfiles/frontend.just', '--working-directory', '.', 'develop-website', '--skip-build-parts-libraries', '--skip-build-one-offs'], {
      VITE_API_PORT: String(options.apiPort),
      VITE_PORT: String(options.appPort)
    }
  );

  let browser;

  try {
    await waitForHttpReady(appUrl, options.startupTimeoutMs);

    // .pdf download support is only chromium :/
    browser = await chromium.launch({ headless: true });

    const context = await browser.newContext({
      viewport: { width: 1600, height: 1100 },
    });

    const page = await context.newPage();

    await page.goto(`http://localhost:8080/resume-private.html`, {
      waitUntil: 'networkidle'
    });
    await page.waitForTimeout(3 * 1000);

    console.debug(`saving page screenshot /tmp/mainframenzo.com-resume-private.png`);
    await page.screenshot({ path: `/tmp/mainframenzo.com-resume-private.png`, fullPage: true });
    await page.pdf({ path: `/tmp/mainframenzo.com-resume-private.pdf` });

    await fs.copyFileSync(`/tmp/mainframenzo.com-resume-private.pdf`, path.join(process.cwd(), `./src/frontend/public/downloads/resume-private.pdf`));
    await fs.copyFileSync(`/tmp/mainframenzo.com-resume-private.png`, path.join(process.cwd(), `./src/frontend/public/downloads/resume-private.png`));

    await browser.close();
  } finally {
    if (browser) {
      await browser.close().catch(() => undefined);
    }

    await stopProcess(app);
  }
};

const startProcess = (
  label: string,
  command: string,
  args: string[],
  extraEnv: Record<string, string> = {},
): ChildProcess => {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    env: { ...process.env, ...extraEnv },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout?.on('data', chunk => process.stdout.write(`[${label}] ${chunk}`));
  child.stderr?.on('data', chunk => process.stderr.write(`[${label}] ${chunk}`));

  return child;
};

const waitForHttpReady = async (
  url: string,
  timeoutMs: number,
): Promise<void> => {
  const start = Date.now();

  await new Promise<void>((resolve, reject) => {
    const attempt = (): void => {
      const request = http.get(url, (response) => {
        response.resume();

        resolve();
      });

      request.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`timed out waiting for ${url}`));

          return;
        }

        setTimeout(attempt, 400);
      });
    };

    attempt();
  });
};

const stopProcess = async (child?: ChildProcess): Promise<void> => {
  if (!child || child.killed) {
    return;
  }

  child.kill('SIGTERM');

  await new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      if (!child.killed) {
        child.kill('SIGKILL');
      }

      resolve();
    }, 3_000);

    child.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
};

const generateResumeAsDOCX = async (isPrivate?: boolean) => {
  console.trace('generateResumeAsDOCX');
}

// Generate (blog) posts downloads which are a .zip file that includes:
// * <post-name>-bom.csv
// * A directory, /design-files, which contains all the design files
// * A directory, /build-walkthrough-images, which contains all the build images
const generatePostsDownloads = async () => {
  console.trace('generatePostsDownloads');

  for (const post in []) {
    await generatePostDownloads();
  }
}

const generatePostDownloads = async () => {
  console.trace('generatePostDownloads');

  await addPostBOMCSVToZIP();
  await addPostDesignFilesToZIP();
  await addPostBuildImagesToZIP();
}

const addPostBOMCSVToZIP = async () => {
  console.trace('addPostBOMCSVToZIP');
}

const addPostDesignFilesToZIP = async () => {
  console.trace('addPostDesignFilesToZIP');
}

const addPostBuildImagesToZIP = async () => {
  console.trace('addPostBuildImagesToZIP');
}

await generateDownloads();

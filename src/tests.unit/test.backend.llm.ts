import assert from 'node:assert/strict';
import { describe, test, before, after } from 'node:test';

import * as utils from './utils';
import { analyzeMetrics, startLlamafile } from '../backend/llm';
import * as lifecycle from '../backend/lifecycle';
import { ChildProcess } from 'node:child_process';

let llamaProcess: ChildProcess | undefined;
describe('backend llm tests', { timeout: 120_1000 }, async () => {
  before(async () => {
    //await utils.testSetup(test);

    llamaProcess = await startLlamafile();

    process.on('SIGINT', async () => { // ctrl + c
      setTimeout(() => { process.exit(0); }, 5 * 1000);

      if (llamaProcess) { lifecycle.shutdown(llamaProcess); }

      process.exit(1);
    });

    process.on('SIGTERM', async () => { // Termination signal.
      setTimeout(() => { process.exit(0); }, 5 * 1000);

      if (llamaProcess) { lifecycle.shutdown(llamaProcess); }

      process.exit(0);
    });
  });

  after(async () => {
    if (llamaProcess) { lifecycle.shutdown(llamaProcess); }
  });

  test('analyze metrics using local model', async (test) => {
    const escalations = await analyzeMetrics();
    console.debug('escalations', escalations);

    assert(escalations.length === 0, 'exepcted no escalations');
  });
});

// This file is responsible for mapping our integration tests to AWS as a Lambda function.
// These run after CICD deploy, but are also scheduled to run 1x a day as canaries.
import _globalThis from '../@types/global-this';

import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import { Handler, Callback, Context } from 'aws-lambda';

import { healthCheckTest } from './test.happy-path.health-check';

export const runIntegrationTests: Handler = async (event: any, _context: Context | null, _callback: Callback) => {
  log.debug('runIntegrationTests', event);

  try {
    await healthCheckTest();
  } catch (error) {
    console.error(error);
    log.error('tests failed', error);
  }
};

export default { runIntegrationTests }
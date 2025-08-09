#! node
// This file is responsible for running integration tests locally.
import _globalThis from '../@types/global-this';

import * as log from 'ts-app-logger';
log.configure({ traceEnabled: true, debugEnabled: true, infoEnabled: true, warningEnabled: true, errorEnabled: true, filters: [] });

import test from 'node:test';
import * as Lambda from 'aws-lambda';

import { runIntegrationTests } from './infra.aws';

test('all', async (_test) => {
  await runIntegrationTests({}, mockLambdaContext, () => {});
});

export const mockLambdaContext: Lambda.Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '',
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  getRemainingTimeInMillis: () => { return 0; },
  done: () => {},
  fail: () => {},
  succeed: () => {}
};

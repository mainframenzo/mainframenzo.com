// This file is responsible for unit testing runtime schema validation.
import _globalThis from '../@types/global-this';

import { describe, it, before } from 'node:test';
import { strict as assert } from 'node:assert';

import * as runtimeSchemaValidator from '../backend/runtime-schema-validator';

describe('test.backend.metrics', { timeout: 120_1000 }, async () => {
  before(async () => { await runtimeSchemaValidator.loadSchemas(); });

  it('test invalid schema', async (_t) => {
    let failed = false;
    try {
      runtimeSchemaValidator.validateSchema('', {});
    } catch (error) {
      failed = true;
    }

    assert.equal(failed === true, 'schema validation expected to fail but did not');
  });

  it('test valid schema', async (_t) => {
    let failed = false;
    try {
      runtimeSchemaValidator.validateSchema('', {});
    } catch (error) {
      failed = true;
    }

    assert.equal(failed === false, 'schema validation not expected to fail but did');
  });
});
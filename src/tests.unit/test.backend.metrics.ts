// This file is responsible for unit testing metrics.
import _globalThis from '../@types/global-this';

import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';

import * as metricsDb from '../backend/metrics.db';
import * as iface from '../backend/iface';

describe('test.backend.metrics', { timeout: 120_1000 }, async () => {
  before(async () => { await metricsDb.getDb(); });
  after(async () => { await metricsDb.closeDb(); });

  it('test insert of raw metrics', async (_t) => {
    const timestamp = new Date();

    await metricsDb.insertMetricDataPoint({
      metricType: 'table',
      metricName: iface.MetricName.arp_cache,
      metricValue: 1,
      timestamp,
      metricMetadata: { 'key': 'value' }
    });

    const result = (await metricsDb.getLastHoursRawMetrics(iface.MetricName.arp_cache))[0] as unknown as iface.IMetricDataPoint;
    console.debug('result', result);

    assert(result.metricType === 'table', 'metricType incorrect');
    assert(result.metricName === iface.MetricName.arp_cache, 'metricName incorrect');
    assert(result.metricValue === 1, 'metricValue incorrect');
    assert(result.timestamp.getTime() === timestamp.getTime(), 'timestamp incorrect');
    assert(result.metricMetadata['key'] === 'value', 'metricMetadata incorrect');

    await metricsDb.insertMetricDataPoint({
      metricType: 'table',
      metricName: iface.MetricName.arp_cache,
      metricValue: 1,
      timestamp,
      metricMetadata: { 'key': 'value' }
    });

    const allMetrics = await metricsDb.getAllRawMetrics();

    assert(allMetrics.length === 2, 'incorrect number of metrics');
  });

  // it('tests metrics aggregation', async (_t) => {
    
  // });
});
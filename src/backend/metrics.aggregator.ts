import * as iface from './iface';
import * as metricsDb from './metrics.db';

class MetricsAggregator {
  private intervalHandle: ReturnType<typeof setInterval> | null = null;

  async start() {
    this.intervalHandle = setInterval(() => {
      this.aggregate().catch(error => {
        console.error('failed to aggregate metrics', error);
      });
    }, 60_000);
  }

  async aggregate() {
    const now = Date.now();

    await metricsDb.aggregateMetrics(now);
    await metricsDb.pruneOldRawData(now);
    await metricsDb.pruneOldAggregateData(now);
  }

  stop() {
    if (this.intervalHandle) { clearInterval(this.intervalHandle); }
  }
}

const metricsAggregator = new MetricsAggregator();
export { metricsAggregator };

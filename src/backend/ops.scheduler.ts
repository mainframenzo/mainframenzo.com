// This file is responsible for managing the 'background' work ops requires:
// * Tailing and parsing log files into metrics
// * Watching VM stats and turning into metrics
// * Pre-rendering the ops dashboard based on raw metrics
// * Metrics aggregation
import _globalThis from '../@types/global-this';

import TailFile from '@logdna/tail-file';
import split2 from 'split2';

import * as logHandlers from './monitoring.log-handlers';
import { renderOpsPage } from './ops.ssr';
import * as metrics from './metrics';
import * as iface from './iface';
import * as metricsDb from './metrics.db';
import { metricsAggregator } from './metrics.aggregator';
import { analyzeMetrics } from './llm';

const tails: TailFile[] = [];
let monitoringDataInterval: NodeJS.Timeout | undefined;
let renderingOpsDashboardInterval: NodeJS.Timeout | undefined;
let analyzeMetricsInterval: NodeJS.Timeout | undefined;

export const startBackgroundWork = async () => {
  console.trace('startBackgroundWork');

  await metricsDb.getDb(); // Init on-box metrics db.

  await monitorLogFiles(); // Turn log files into metrics.
  await scheduleMonitoringDataReader(); // Turn box stats into metrics.
  await scheduleOpsDashboardRender(); // Render metrics to html.
  await scheduleMetricsAggregator(); // Aggregate metrics for windows like 1m, 5m, et. al.
  await scheduleMonitoringAnalyzer(); // Ask an LLM to analyze metrics and return potential "alarms".
}

const monitorLogFiles = async () => {
  console.trace('monitorLogFiles');

  // FIXME Move is_docker to image so it works for VMs, too?
  if (_globalThis.is_docker || _globalThis.app_location === 'hosted') {
    tails.push(await monitorLogFile('/var/log/nginx/access.log', (line: string) => {
      try {
        logHandlers.handleNginxAccessLogEntry(line);
      } catch (error) {
        // FIXME TypeError: Line does not match the schema. line: 16.58.56.214 - - [22/Jul/2026:22:47:09 +0000] "" 400 0 "-" "-"
        console.warn('error parsing line, skipping', error);
      }
    }));

    tails.push(await monitorLogFile('/var/log/nginx/error.log', (line: string) => {
      try {
        logHandlers.handleNginxErrorLogEntry(line);
      } catch (error) {
        console.warn('error parsing line, skipping', error);
      }
    }));
  }
}

const monitorLogFile = async (logFilePath: string, parseFn: LogLineHandler): Promise<TailFile> => {
  const tail = new TailFile(logFilePath);
  tail
    .pipe(split2())
      .on('data', (line: string) => {
        console.debug('log line', logFilePath, line);

        try {
          parseFn(line);
        } catch (error) {
          console.error('failed to parse nginx access log line', line);

          // FIXME Make prefix specific to log file.
          metrics.addMonitorMetric({
            metricType: 'count',
            metricName: iface.MetricName.log_file_monitoring_error,
            metricValue: 1,
            timestamp: new Date()
          });
        }
      })
    .on('tail_error', (error: any) => {
      console.error(`error tailing file ${logFilePath}`, error);

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.log_file_monitoring_error,
        metricValue: 1,
        timestamp: new Date()
      });
    });
  await tail.start();

  return tail;
}

type LogLineHandler = (line: string) => void;

const scheduleMonitoringDataReader = async () => {
  console.trace('scheduleMonitoringDataReader');

  // Every 30 seconds get monitoring data (run each in order rather than at the same time) and cache for SSR.
  let isReadingMonitoringData = false;
  monitoringDataInterval = setInterval(async () => {
    if (isReadingMonitoringData) {
      console.warn('still reading and caching monitoring data, why taking so long?!');

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.stale_monitoring_data,
        metricValue: 1,
        timestamp: new Date()
      });

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.still_getting_monitoring_data,
        metricValue: 1,
        timestamp: new Date()
      });

      return;
    }

    isReadingMonitoringData = true;

    try {
      await metrics.addMonitoringDataMetrics();
    } catch (error) {
      console.error('failed to read and cache monitoring data', error);

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.stale_monitoring_data,
        metricValue: 1,
        timestamp: new Date()
      });

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.failed_to_get_monitoring_data,
        metricValue: 1,
        timestamp: new Date()
      });
    } finally {
      isReadingMonitoringData = false;
    }
  }, 30 * 1000);

  // Do this work immediately, too.
  isReadingMonitoringData = true;
  try {
    await metrics.addMonitoringDataMetrics();
  } catch (error) {
    console.error('failed to read and cache monitoring data', error);
  } finally {
    isReadingMonitoringData = false;
  }
}

const scheduleOpsDashboardRender = async () => {
  console.trace('scheduleOpsDashboardRender');

  // Every 15 seconds pre-render ops page from cached metrics.
  let isRenderingOpsPage = false;
  renderingOpsDashboardInterval = setInterval(async () => {
    if (isRenderingOpsPage) {
      console.warn('still rendering ops page, why taking so long?!');

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.ops_dashboard_rendering_fail,
        metricValue: 1,
        timestamp: new Date()
      });

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.still_rendering_ops_dashboard,
        metricValue: 1,
        timestamp: new Date()
      });

      return;
    }

    isRenderingOpsPage = true;

    try {
      await renderOpsPage(iface.MetricAggregateWindow['1m']);
      await renderOpsPage(iface.MetricAggregateWindow['1d']);
    } catch (error) {
      console.error('failed to render ops pages', error);

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.ops_dashboard_rendering_fail,
        metricValue: 1,
        timestamp: new Date()
      });
    } finally {
      isRenderingOpsPage = false;
    }
  }, 15 * 1000);
}

const scheduleMetricsAggregator = async () => {
  console.trace('scheduleMetricsAggregator');

  await metricsAggregator.start();
}

export const stopBackgroundWork = async () => {
  for (const tail of tails) {
    try {
      await tail.quit();
    } catch (error) {} // Eat.
  }

  if (monitoringDataInterval) { clearInterval(monitoringDataInterval); }
  if (renderingOpsDashboardInterval) { clearInterval(renderingOpsDashboardInterval); }

  metricsAggregator.stop();
}

const scheduleMonitoringAnalyzer = async () => {
  // Every 2 minutes ask an LLM to analyze metrics.
  let isAnalyzing = false;
  analyzeMetricsInterval = setInterval(async () => {
    if (isAnalyzing) {
      console.warn('still analyzing metrics, why taking so long?!');

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.analyze_metrics_fail,
        metricValue: 1,
        timestamp: new Date()
      });

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.still_analyzing_metrics,
        metricValue: 1,
        timestamp: new Date()
      });

      return;
    }

    isAnalyzing = true;

    try {
      const escalations = await analyzeMetrics();
      console.debug('escalations', escalations);

      for (const escalation of escalations) {
        await metrics.addOrUpdateEscalationMetric(escalation);
      }
    } catch (error) {
      console.error('failed to analyze metrics', error);

      metrics.addMonitorMetric({
        metricType: 'count',
        metricName: iface.MetricName.analyze_metrics_fail,
        metricValue: 1,
        timestamp: new Date()
      });
    } finally {
      isAnalyzing = false;
    }
  }, 60 * 2 * 1000);
}

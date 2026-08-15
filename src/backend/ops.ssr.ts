// This file is responsible for handling server-side rendering of the ops dashboard page.
// Monitoring runs about 2x a minute (~2880 metrics per datum per hour), but that doesn't include requests.
import _globalThis from '../@types/global-this';

import * as fs from 'node:fs';
import { globby } from 'globby';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ejs = require('ejs');

import { backendState } from './state';
import * as metricsDb from './metrics.db';
import * as iface from './iface';
import { components } from '../openapi-def/types';

export const renderOpsPage = async (metricAggregateWindow: iface.MetricAggregateWindow) => {
  // This template is stored with the backend so it's not rendered to HTML during the building of this website.
  // It is only accessible via an API request of an authenticated user (you), where a div is updated with this content on success.
  const templateString = fs.readFileSync(`${process.cwd()}/src/backend/ops-dashboard-data.ejs`, 'utf-8');

  // Escalations have nothing to do with the metric window.
  // Whatever is there is something to investigate.
  const escalations = await metricsDb.getEscalations();

  const metricNames = await metricsDb.getRawMetricNames();

  const rawMetrics: Record<string, iface.IMetricDataPoint[]> = {}; // FIXME is it, or any? table data?
  const rawMetricNamesToHighlight: string[] = [];
  const rawMetricNamesForRequestsByUri: string[] = [];
  const metricBucketsByMetricName: Record<string, Record<iface.MetricAggregateWindow, iface.IMetricDataPoint[]>> = {};

  for (const metricName of metricNames) {
    const metricsForSpecifiedWindow = await metricsDb.getAggregateMetricsForWindow(metricName, metricAggregateWindow);
    console.debug('metricsForSpecifiedWindow', metricName, metricsForSpecifiedWindow);

    rawMetrics[metricName] = metricsForSpecifiedWindow;

    // Highlight failures or high error rates.
    if (metricName.includes('_fail') && metricsForSpecifiedWindow.length > 0) {
      rawMetricNamesToHighlight.push(metricName);
    }

    // TODO determine error rates of data..codify in alarms.

    // Each URI + HTTP method is its own metricronJob.
    // FIXME Better way to know requests_by_uri w/o including in metric name?
    if (metricName.includes(iface.MetricPrefixName.requests_by_uri)) {
      rawMetricNamesForRequestsByUri.push(metricName);
    }

    for (const [metricAggregateWindow, _] of Object.entries(iface.aggregateWindowDurationMs)) {
      const metricDataPoints = await metricsDb.getAggregateMetricsForWindow(metricName, metricAggregateWindow as iface.MetricAggregateWindow);

      if (!metricBucketsByMetricName[metricName]) {
        metricBucketsByMetricName[metricName] = {
          '1m': [],
          '5m': [],
          '15m': [],
          '1h': [],
          '3h': [],
          '6h': [],
          '12h': [],
          '1d': [],
          '3d': [],
          '1w': [],
          '2w': [],
          '1mo': []
        };
      }

      // @ts-ignore
      metricBucketsByMetricName[metricName][metricAggregateWindow] = metricDataPoints;
    }
  }

  const rawMetricsToHighlight = getRawMetricsToHighlight(rawMetricNamesToHighlight); // UI data for the metric names to highlight.
  const rawMetricsForRequestsByUri = formatRequestedUrisMetrics(rawMetrics, rawMetricNamesForRequestsByUri); // Table data.

  const browserMetrics = formatBrowserMetrics(rawMetrics);
  const osMetrics = formatOsMetrics(rawMetrics);

  const cpuLoadMetrics = formatCpuLoadMetrics(rawMetrics);
  const cpuUtilizationMetrics = formatCpuUtilizationMetrics(rawMetrics);
  const cpuIntensiveProcesses = formatCpuIntensiveProcesses(rawMetrics);
  const ramUsageMetrics = formatRamUsageMetrics(rawMetrics);
  const ramIntensiveProcesses = formatRamIntensiveProcesses(rawMetrics);
  const diskPartitions = formatDiskPartitions(rawMetrics);

  const uploadTransferRate = formatUploadTransferRate(rawMetrics);
  const downloadTransferRate = formatDownloadTransferRate(rawMetrics);
  const bandwidth = formatBandwidth(rawMetrics);

  const generalInfo = formatGeneralInfo(rawMetrics);
  const machineInfoTable = formatKeyValueTable(iface.MetricName.general_info, rawMetrics);
  const memoryInfoTable = formatKeyValueTable(iface.MetricName.memory_info, rawMetrics);
  const cpuInfoTable = formatKeyValueTable(iface.MetricName.cpu_info, rawMetrics);
  const scheduledCronTable = formatScheduledCrons(rawMetrics);
  const cronHistoryTable = formatCronHistory(rawMetrics);
  const ioStatsTable = formatIoStats(rawMetrics);
  const ipAddressesTable = formatIpAddresses(rawMetrics);
  const arpCacheTable = formatArpCache(rawMetrics);
  const cpuTempMetrics       = formatCpuTemp(rawMetrics);
  const dockerProcessesTable = formatDockerProcesses(rawMetrics);
  const networkConnections   = formatNetworkConnections(rawMetrics);
  const swapUsage            = formatSwap(rawMetrics);

  const templateData = {
    locals: {}, // FIXME functions?
    //app_stage: _globalThis.app_stage,
    //publish_stage: _globalThis.publish_stage,
    //app_location: _globalThis.app_location,
    metricAggregateWindow,

    escalations,
    rawMetrics,
    rawMetricsToHighlight,

    rawMetricsForRequestsByUri,
    browserMetrics,
    osMetrics,

    cpuLoadMetrics,
    cpuUtilizationMetrics,
    cpuIntensiveProcesses,
    ramUsageMetrics,
    ramIntensiveProcesses,
    diskPartitions,

    uploadTransferRate,
    downloadTransferRate,
    bandwidth,

    generalInfo,
    machineInfoTable,
    memoryInfoTable,
    cpuInfoTable,
    scheduledCronTable,
    cronHistoryTable,
    ioStatsTable,
    ipAddressesTable,
    arpCacheTable,
    cpuTempMetrics,
    dockerProcessesTable,
    networkConnections,
    swapUsage
  }
  console.debug('templateString', templateString, 'templateData', templateData);

  const html = ejs.render(templateString, templateData);

  metricAggregateWindow

  let opsHtmlPages = backendState.get().opsHtmlPages;
  opsHtmlPages[metricAggregateWindow] = html;

  backendState.put({ ...backendState.get(), opsHtmlPages });
}

const getRawMetricsToHighlight = (rawMetricNamesToHighlight: string[]): Record<number, { metricName: string; }[]> => {
  const rawMetricsToHighlight: Record<number, { metricName: string; }[]> = {};

  let currentRowNumber = 1;
  let currentColumnNumber = 1;

  rawMetricNamesToHighlight.forEach((metricName: string) => {
    const columnsOfRow = rawMetricsToHighlight[currentRowNumber] || [];
    columnsOfRow.push({ metricName });

    rawMetricsToHighlight[currentRowNumber] = columnsOfRow;

    if (currentColumnNumber === maxNumberOfColumnsInRow) {
      currentRowNumber = currentRowNumber + 1;
      currentColumnNumber = 1;
    } else {
      currentColumnNumber = currentColumnNumber + 1;
    }
  });

  return rawMetricsToHighlight;
}

const maxNumberOfColumnsInRow = 3;

// Format data for table based on this sample format:
// [
//   ["Planet", "Diameter", "Mass", "Moons","Density"],
//   ["Earth", 12756, 5.97, 1, 5514],
//   ["Mars", 6792, 0.642, 2, 3934],
//   ["Saturn", 120536, 568, 82, 687],
//   ["Neptune", 49528, 102, 14, 1638]
// ]
const formatRequestedUrisMetrics = (rawMetrics: Record<string, iface.IMetricDataPoint[]>, rawMetricNamesForRequestsByUri: string[]): string[][] => {
  const data = [['URI', 'Count', 'HTTP Method', 'HTTP Status']];

  for (const metricName of rawMetricNamesForRequestsByUri) {
    const metrics = rawMetrics[metricName];

    const metricNameNoPrefix = metricName.replace(`${iface.MetricPrefixName.requests_by_uri}-`, '');

    const metricNameParts = metricNameNoPrefix.split('-');
    const httpStatusCode = metricNameParts.pop();
    const httpMethod = metricNameParts.pop();
    const uri = decodeURIComponent(metricNameParts.join('-'));

    data.push([uri, `${metrics.length}`, httpMethod || 'N/A', httpStatusCode || 'N/A']);
  }

  // Makes a copy, but oh well.
  return [data[0], ...data.slice(1).sort((metricACount, metricBCount) => Number(metricBCount[1]) - Number(metricACount[1]))];
}

const formatBrowserMetrics = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const labels: string[] = [];
  const data: number[] = [];

  for (const [metricName, points] of Object.entries(rawMetrics)) {
    if (!metricName.startsWith(iface.MetricPrefixName.requests_by_browser)) { continue; }
    const browser = decodeURIComponent(metricName.replace(`${iface.MetricPrefixName.requests_by_browser}-`, ''));
    labels.push(browser);
    data.push(points.length);
  }

  return { labels, data };
};

const formatOsMetrics = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const labels: string[] = [];
  const data: number[] = [];

  for (const [metricName, points] of Object.entries(rawMetrics)) {
    if (!metricName.startsWith(iface.MetricPrefixName.requests_by_operating_system)) { continue; }
    const os = decodeURIComponent(metricName.replace(`${iface.MetricPrefixName.requests_by_operating_system}-`, ''));
    labels.push(os);
    data.push(points.length);
  }

  return { labels, data };
};

const formatCpuLoadMetrics = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.load_avg] ?? [];
  const labels = points.map(p => p.timestamp.toLocaleTimeString());

  return {
    labels,
    datasets: [
      {
        label: '1m',
        data: points.map(p => (p.metricMetadata as components['schemas']['IMonitorLoadAverage'])?.['1_min_avg'] ?? 0),
        borderColor: '#4f46e5'
      },
      {
        label: '5m',
        data: points.map(p => (p.metricMetadata as components['schemas']['IMonitorLoadAverage'])?.['5_min_avg'] ?? 0),
        borderColor: '#7c3aed'
      },
      {
        label: '15m',
        data: points.map(p => (p.metricMetadata as components['schemas']['IMonitorLoadAverage'])?.['15_min_avg'] ?? 0),
        borderColor: '#a855f7'
      },
    ]
  };
};

const formatCpuUtilizationMetrics = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.cpu_utilization] ?? [];
  return {
    labels: points.map(p => p.timestamp.toLocaleTimeString()),
    datasets: [{ label: 'CPU %', data: points.map(p => p.metricValue), borderColor: '#4f46e5' }]
  };
};

const formatCpuIntensiveProcesses = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.cpu_intensive_processes] ?? [];
  const latest = points.at(-1);
  const processes = (latest?.metricMetadata as components['schemas']['IMonitorProcessEntry'][] | undefined) ?? [];
  return {
    labels: processes.map(p => p.cmd),
    data: processes.map(p => p['cpu%'] ?? 0)
  };
};

const formatRamUsageMetrics = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.current_ram] ?? [];
  return {
    labels: points.map(p => p.timestamp.toLocaleTimeString()),
    datasets: [{
      label: 'Used MB',
      data: points.map(p => (p.metricMetadata as components['schemas']['IMonitorRamInfo'])?.used ?? p.metricValue),
      borderColor: '#4f46e5'
    }]
  };
};

const formatRamIntensiveProcesses = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.ram_intensive_processes] ?? [];
  const latest = points.at(-1);
  const processes = (latest?.metricMetadata as components['schemas']['IMonitorProcessEntry'][] | undefined) ?? [];
  return {
    labels: processes.map(p => p.cmd),
    data: processes.map(p => p['mem%'] ?? 0)
  };
};

const formatDiskPartitions = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const labels: string[] = [];
  const data: number[] = [];

  for (const [metricName, points] of Object.entries(rawMetrics)) {
    if (!metricName.startsWith(iface.MetricPrefixName.disk_partitions)) { continue; }

    const latest = points.at(-1);
    if (!latest) { continue; }

    const partition = latest.metricMetadata as components['schemas']['IMonitorDiskPartition'];
    labels.push(partition?.mounted ?? metricName);
    data.push(parseFloat(partition?.['used%'] ?? '0'));
  }

  return { labels, data };
};

const formatUploadTransferRate = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.upload_transfer_rate] ?? [];
  const labels = points.map(p => p.timestamp.toLocaleTimeString());

  const interfaceNames = [...new Set(
    points.flatMap(p => Object.keys(p.metricMetadata as components['schemas']['IMonitorTransferRates'] ?? {}))
  )];

  const datasets = interfaceNames.map(iface => ({
    label: iface,
    data: points.map(p => (p.metricMetadata as components['schemas']['IMonitorTransferRates'])?.[iface] ?? 0),
    borderColor: stringToColor(iface)
  }));

  return { labels, datasets };
};

const formatDownloadTransferRate = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.download_transfer_rate] ?? [];
  const labels = points.map(p => p.timestamp.toLocaleTimeString());

  const interfaceNames = [...new Set(
    points.flatMap(p => Object.keys(p.metricMetadata as components['schemas']['IMonitorTransferRates'] ?? {}))
  )];

  const datasets = interfaceNames.map(iface => ({
    label: iface,
    data: points.map(p => (p.metricMetadata as components['schemas']['IMonitorTransferRates'])?.[iface] ?? 0),
    borderColor: stringToColor(iface)
  }));

  return { labels, datasets };
};

const formatBandwidth = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.bandwidth] ?? [];
  const latest = points.at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorBandwidthEntry'][] | undefined) ?? [];

  return {
    labels: entries.map(e => e.interface),
    datasets: [
      { label: 'TX (bytes)', data: entries.map(e => e.tx), borderColor: '#4f46e5' },
      { label: 'RX (bytes)', data: entries.map(e => e.rx), borderColor: '#7c3aed' },
    ]
  };
};

const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = str.charCodeAt(i) + ((hash << 5) - hash); }

  return `hsl(${hash % 360}, 70%, 55%)`;
};

const formatGeneralInfo = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.general_info] ?? [];
  const latest = points.at(-1);
  const info = (latest?.metricMetadata as components['schemas']['IMonitorGeneralInfo'] | undefined) ?? {};

  const rows = Object.entries(info).map(([key, value]) => [key, value]);
  return [['Property', 'Value'], ...rows];
};

const formatKeyValueTable = (metricName: iface.MetricName, rawMetrics: Record<string, iface.IMetricDataPoint[]>): string[][] => {
  const latest = (rawMetrics[metricName] ?? []).at(-1);
  const info = (latest?.metricMetadata as Record<string, string> | undefined) ?? {};
  return [['Property', 'Value'], ...Object.entries(info).map(([k, v]) => [k, v])];
};

const formatScheduledCrons = (rawMetrics: Record<string, iface.IMetricDataPoint[]>): string[][] => {
  const latest = (rawMetrics[iface.MetricName.scheduled_crons] ?? []).at(-1);
  const cronJobs = (latest?.metricMetadata as components['schemas']['IMonitorScheduledCron'][] | undefined) ?? [];
  return [
    ['Min', 'Hrs', 'Day', 'Month', 'Weekday', 'User', 'CMD'],
    ...cronJobs.map(cronJob => [cronJob.min, cronJob.hrs, cronJob.day, cronJob.month, cronJob.wkday, cronJob.user, cronJob.CMD])
  ];
};

const formatCronHistory = (rawMetrics: Record<string, iface.IMetricDataPoint[]>): string[][] => {
  const latest = (rawMetrics[iface.MetricName.cron_history] ?? []).at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorCronHistoryEntry'][] | undefined) ?? [];
  return [
    ['Time', 'User', 'Message'],
    ...entries.map(e => [e.time, e.user, e.message])
  ];
};

const formatIoStats = (rawMetrics: Record<string, iface.IMetricDataPoint[]>): string[][] => {
  const latest = (rawMetrics[iface.MetricName.io_stats] ?? []).at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorIoStat'][] | undefined) ?? [];

  return [
    ['Device', 'Reads', 'Writes', 'In Progress', 'Time'],
    ...entries.map(e => [e.device, e.reads, e.writes, e.in_prog ?? '0', e.time])
  ];
};

const formatIpAddresses = (rawMetrics: Record<string, iface.IMetricDataPoint[]>): string[][] => {
  const latest = (rawMetrics[iface.MetricName.ip_addresses] ?? []).at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorIpAddress'][] | undefined) ?? [];

  return [
    ['Interface', 'IP'],
    ...entries.map(e => [e.interface, e.ip])
  ];
};

const formatArpCache = (rawMetrics: Record<string, iface.IMetricDataPoint[]>): string[][] => {
  const latest = (rawMetrics[iface.MetricName.arp_cache] ?? []).at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorArpCacheEntry'][] | undefined) ?? [];

  return [
    ['Address', 'HW Type', 'HW Address', 'Mask'],
    ...entries.map(e => [e.addr, e.hw_type, e.hw_addr, e.mask])
  ];
};

const formatCpuTemp = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const points = rawMetrics[iface.MetricName.cpu_temp] ?? [];

  return {
    labels: points.map(p => p.timestamp.toLocaleTimeString()),
    datasets: [{ label: '°C', data: points.map(p => p.metricValue), borderColor: '#ef4444' }]
  };
};

const formatDockerProcesses = (rawMetrics: Record<string, iface.IMetricDataPoint[]>): string[][] => {
  const latest = (rawMetrics[iface.MetricName.docker_processes] ?? []).at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorDockerProcessEntry'][] | undefined) ?? [];

  return [
    ['Container', 'PID', 'User', 'CPU %', 'Mem %', 'RSS', 'VSZ', 'CMD'],
    ...entries.map(e => [e.cname, String(e.pid), e.user, String(e['cpu%'] ?? 0), String(e['mem%'] ?? 0), String(e.rss), String(e.vsz), e.cmd])
  ];
};

const formatNetworkConnections = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const latest = (rawMetrics[iface.MetricName.network_connections] ?? []).at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorNetworkConnection'][] | undefined) ?? [];

  const pie = {
    labels: entries.map(e => e.address),
    data: entries.map(e => e.connections)
  };

  const table: string[][] = [
    ['Address', 'Connections'],
    ...entries.map(e => [e.address, String(e.connections)])
  ];

  return { pie, table };
};

const formatSwap = (rawMetrics: Record<string, iface.IMetricDataPoint[]>) => {
  const latest = (rawMetrics[iface.MetricName.swap] ?? []).at(-1);
  const entries = (latest?.metricMetadata as components['schemas']['IMonitorSwapPartition'][] | undefined) ?? [];

  const pie = {
    labels: entries.map(e => e.filename),
    data: entries.map(e => Number(e.used))
  };

  const table: string[][] = [
    ['Filename', 'Type', 'Size', 'Used', 'Priority'],
    ...entries.map(e => [e.filename, e.type, e.size, e.used, e.priority])
  ];

  return { pie, table };
};

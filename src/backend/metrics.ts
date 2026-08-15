// This file is responsible for providing a queue-backed metrics emitter.
// FIXME Metrics for queue.
import { createQueue, QueueOrder } from 'simple-in-memory-queue';

import * as iface from './iface';
import * as metricsDb from './metrics.db';
import * as monitoringData from './monitoring.data';

const metricsQueue = createQueue<iface.IMetricDataPoint>({
  order: QueueOrder.FIRST_IN_FIRST_OUT,
});
metricsQueue.on.push.subscribe({ consumer: async (event) => {
  console.debug('metrics queue consumer running', event);

  for (const metricDataPoint of event.items) {
    await metricsDb.insertMetricDataPoint(metricDataPoint);
  }
}});

export const addMonitorMetric = (metricDataPoint: iface.IMetricDataPoint) => {
  console.trace('addMonitorMetric', metricDataPoint);

  metricsQueue.push(metricDataPoint);
}

export const addTableMetric = (metricName: string, metricMetadata: object, timestamp: Date) => {
  console.trace('addTableMetric', metricName);

  metricsQueue.push({
		metricType: 'table',
		metricName,
    metricValue: 1,
		timestamp,
    metricMetadata,
    aggregate: false // Just table data - discarded after a configured amount of time.
	});
}

export const addOrUpdateEscalationMetric = (escalation: { metricName: string, reasonForEscalation: string }) => {
  console.trace('addOrUpdateEscalationMetric', escalation);

  try {
    metricsDb.insertOrUpdateEscalation(escalation.metricName, escalation.reasonForEscalation);
  } catch (error) {
    console.error('failed to add escalation', error);
  }
}

export const addMonitoringDataMetrics = async () => {
  console.trace('addMonitoringDataMetrics');

  const start = new Date();

  try {
    const monitorStatArpCacheEntries = await monitoringData.getMonitorStatArpCache();

    addTableMetric(iface.MetricName.arp_cache, monitorStatArpCacheEntries, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.arp_cache_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatBandwidthEntries = await monitoringData.getMonitorStatBandwidth();

    addTableMetric(iface.MetricName.bandwidth, monitorStatBandwidthEntries, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.bandwidth_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatCpuInfo = await monitoringData.getMonitorStatCpuInfo();

    addTableMetric(iface.MetricName.cpu_info, monitorStatCpuInfo, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cpu_info_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatCpuIntensiveProcesses = await monitoringData.getMonitorStatCpuIntensiveProcesses();

    addTableMetric(iface.MetricName.cpu_info, monitorStatCpuIntensiveProcesses, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cpu_intensive_processes_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatCpuTemp = await monitoringData.getMonitorStatCpuTemp();

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cpu_temp,
      metricValue: monitorStatCpuTemp,
      metricMetadata: monitorStatCpuTemp,
      timestamp: start
    });
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cpu_temp_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatCpuUtilization = await monitoringData.getMonitorStatCpuUtilization();

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cpu_utilization,
      metricValue: monitorStatCpuUtilization,
      metricMetadata: monitorStatCpuUtilization,
      timestamp: start
    });
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cpu_utilization_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatCronHistoryEntries = await monitoringData.getMonitorStatCronHistory();

    addTableMetric(iface.MetricName.cron_history, monitorStatCronHistoryEntries, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cron_history_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatCurrentRam = await monitoringData.getMonitorStatCurrentRam();

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.current_ram,
      metricValue: monitorStatCurrentRam.available,
      metricMetadata: monitorStatCurrentRam,
      timestamp: start
    });
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.current_ram_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatDiskPartitions = await monitoringData.getMonitorStatDiskPartitions();

    for (const monitorStatDiskPartition of monitorStatDiskPartitions) {
      addMonitorMetric({
        metricType: 'count',
        metricName: `${iface.MetricPrefixName.disk_partitions}-${encodeURIComponent(monitorStatDiskPartition.mounted)}`,
        metricValue: Number(monitorStatDiskPartition['used%'].replace('%', '')),
        timestamp: start
      });
    }

    addTableMetric(iface.MetricName.disk_partitions, monitorStatDiskPartitions, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.disk_partitions_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatDockerProcesses = await monitoringData.getMonitorStatDockerProcesses();

    addTableMetric(iface.MetricName.docker_processes, monitorStatDockerProcesses, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.docker_processes_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatDownloadTransferRate = await monitoringData.getMonitorStatDownloadTransferRate();

    Object.entries(monitorStatDownloadTransferRate!).forEach(([networkInterface, record]) => {
      addMonitorMetric({
        metricType: 'count',
        metricName: `${iface.MetricPrefixName.download_transfer_rate}-${networkInterface}`,
        metricValue: record,
        timestamp: start
      });
    });

    addTableMetric(iface.MetricName.download_transfer_rate, monitorStatDownloadTransferRate, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.download_transfer_rate_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatGeneralInfo = await monitoringData.getMonitorStatGeneralInfo();

    addTableMetric(iface.MetricName.general_info, monitorStatGeneralInfo, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.general_info_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatIoStats = await monitoringData.getMonitorStatIoStats();

    addTableMetric(iface.MetricName.io_stats, monitorStatIoStats, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.io_stats_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatIpAddresses = await monitoringData.getMonitorStatIpAddresses();

    addTableMetric(iface.MetricName.ip_addresses, monitorStatIpAddresses, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.ip_addresses_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    // FIXME Return type should not be array.
    const monitorStatLoadAverage = await monitoringData.getMonitorStatLoadAvg();

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.load_avg_1m,
      metricValue: monitorStatLoadAverage[0]['1_min_avg'],
      timestamp: start
    });

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.load_avg_5m,
      metricValue: monitorStatLoadAverage[0]['5_min_avg'],
      timestamp: start
    });

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.load_avg_15m,
      metricValue: monitorStatLoadAverage[0]['15_min_avg'],
      timestamp: start
    });

    addTableMetric(iface.MetricName.load_avg, monitorStatLoadAverage, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.load_avg_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatLoggedInUsers = await monitoringData.getMonitorStatLoggedInUsers();

    addTableMetric(iface.MetricName.logged_in_users, monitorStatLoggedInUsers, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.logged_in_users_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatMemoryInfo =await monitoringData.getMonitorStatMemoryInfo();

    addTableMetric(iface.MetricName.memory_info, monitorStatMemoryInfo, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.memory_info_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatNetworkConnections = await monitoringData.getMonitorStatNetworkConnections();

    addTableMetric(iface.MetricName.network_connections, monitorStatNetworkConnections, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.network_connections_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatNumberOfCpuCores = await monitoringData.getMonitorStatNumberOfCpuCores();

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.number_of_cpu_cores,
      metricValue: monitorStatNumberOfCpuCores,
      timestamp: start
    });
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.number_of_cpu_cores_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatRamIntensiveProcesses = await monitoringData.getMonitorStatRamIntensiveProcesses();

    addTableMetric(iface.MetricName.ram_intensive_processes, monitorStatRamIntensiveProcesses, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.cpu_intensive_processes_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatRecentAccountLogins = await monitoringData.getMonitorStatRecentAccountLogins();

    addTableMetric(iface.MetricName.recent_account_logins, monitorStatRecentAccountLogins, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.recent_account_logins_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatScheduledCrons = await monitoringData.getMonitorStatScheduledCrons();

    addTableMetric(iface.MetricName.scheduled_crons, monitorStatScheduledCrons, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.scheduled_crons_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatSwap = await monitoringData.getMonitorStatSwap();

    addTableMetric(iface.MetricName.swap, monitorStatSwap, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.swap_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatUploadTransferRate = await monitoringData.getMonitorStatUploadTransferRate();

    Object.entries(monitorStatUploadTransferRate!).forEach(([networkInterface, record]) => {
      addMonitorMetric({
        metricType: 'count',
        metricName: `${iface.MetricPrefixName.upload_transfer_rate}-${networkInterface}`,
        metricValue: record,
        timestamp: start
      });
    });

    addTableMetric(iface.MetricName.upload_transfer_rate, monitorStatUploadTransferRate, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.upload_transfer_rate_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  try {
    const monitorStatUserAccounts = await monitoringData.getMonitorStatUserAccounts();

    addTableMetric(iface.MetricName.user_accounts, monitorStatUserAccounts, start);
  } catch (error) {
    console.error('failed to add metric', error);

    addMonitorMetric({
      metricType: 'count',
      metricName: iface.MetricName.user_accounts_fail,
      metricValue: 1,
      timestamp: start
    });
  }

  const end = new Date();

  const durationInSeconds = (end.getTime() - start.getTime()) / 1000;
  console.debug(`getting monitoring data took ${durationInSeconds} seconds`);
}

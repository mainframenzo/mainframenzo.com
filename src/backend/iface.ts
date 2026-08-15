export interface IBackendState {
  opsHtmlPages: Record<MetricAggregateWindow, string | undefined>;
}

export interface ISupportedModel {
  readonly id: string;
  readonly provider: TProviderId;
  readonly name: string;
  readonly contextWindow: string;
  readonly owner: string;
  readonly label: string;
  readonly aiSdkModel: string;
  readonly env_api_key_name: string;
  readonly requiresApiKey: boolean;
}

export type TProviderId = 'local';

export interface IMetricDataPoint {
  readonly metricType: 'count' | 'table',
  readonly metricName: string;
  readonly metricValue: number;
  readonly timestamp: Date;
  readonly metricMetadata?: any;
  readonly aggregate?: boolean;
}

export const enum MetricName {
  arp_cache = 'arp_cache',
  bandwidth = 'bandwidth',
  cpu_info = 'cpu_info',
  cpu_intensive_processes = 'cpu_intensive_processes',
  cpu_temp = 'cpu_temp',
  cpu_utilization = 'cpu_utilization',
  cron_history = 'cron_history',
  current_ram = 'current_ram',
  disk_partitions = 'disk_partitions', // Dynamic metric name, but this is used for cache.
  docker_processes = 'docker_processes',
  download_transfer_rate = 'download_transfer_rate', // Dynamic metric name, but this is used for cache.
  general_info = 'general_info',
  io_stats = 'io_stats',
  ip_addresses = 'ip_addresses',
  load_avg = 'load_avg',
  load_avg_1m = 'load_avg_1m',
  load_avg_5m = 'load_avg_5m',
  load_avg_15m = 'load_avg_15m',
  logged_in_users = 'logged_in_users',
  memory_info = 'memory_info',
  network_connections = 'network_connections',
  number_of_cpu_cores = 'number_of_cpu_cores',
  ram_intensive_processes = 'ram_intensive_processes',
  recent_account_logins = 'recent_account_logins',
  scheduled_crons = 'scheduled_crons',
  swap = 'swap',
  upload_transfer_rate = 'upload_transfer_rate', // Dynamic metric name, but this is used for cache.
  user_accounts = 'user_accounts'
}

export const enum MetricName {
  arp_cache_fail = 'arp_cache_fail',
  bandwidth_fail = 'bandwidth_fail',
  cpu_info_fail = 'cpu_info_fail',
  cpu_intensive_processes_fail = 'cpu_intensive_processes_fail',
  cpu_temp_fail = 'cpu_temp_fail',
  cpu_utilization_fail = 'cpu_utilization_fail',
  cron_history_fail = 'cron_history_fail',
  current_ram_fail = 'current_ram_fail',
  disk_partitions_fail = 'disk_partitions_fail',
  docker_processes_fail = 'docker_processes_fail',
  download_transfer_rate_fail = 'download_transfer_rate_fail',
  general_info_fail = 'general_info_fail',
  io_stats_fail = 'io_stats_fail',
  ip_addresses_fail = 'ip_addresses_fail',
  load_avg_fail = 'load_avg_fail',
  logged_in_users_fail = 'logged_in_users_fail',
  memory_info_fail = 'memory_info_fail',
  network_connections_fail = 'network_connections_fail',
  number_of_cpu_cores_fail = 'number_of_cpu_cores_fail',
  ram_intensive_processes_fail = 'ram_intensive_processes_fail',
  recent_account_logins_fail = 'recent_account_logins_fail',
  scheduled_crons_fail = 'scheduled_crons_fail',
  swap_fail = 'swap_fail',
  upload_transfer_rate_fail = 'upload_transfer_rate_fail',
  user_accounts_fail = 'user_accounts_fail'
}

export const enum MetricName {
  log_file_monitoring_error = 'log_file_monitoring_error',

  stale_monitoring_data = 'stale_monitoring_data',
  still_getting_monitoring_data = 'still_getting_monitoring_data',
  failed_to_get_monitoring_data = 'failed_to_get_monitoring_data',

  ops_dashboard_rendering_fail = 'ops_dashboard_rendering_fail',
  still_rendering_ops_dashboard = 'still_rendering_ops_dashboard',

  analyze_metrics_fail = 'analyze_metrics_fail',
  still_analyzing_metrics = 'still_analyzing_metrics'
}

// FIXME Add metrics for:
// * request latency
// * github webhook pushes
// * cicd success/failure
// * new release success/failure
export const enum MetricPrefixName {
  disk_partitions = 'disk_partitions',
  download_transfer_rate = 'download_transfer_rate',
  upload_transfer_rate= 'upload_transfer_rate',

  requests_by_uri = 'requests_by_uri',
  requests_by_browser = 'requests_by_browser',
  requests_by_device = 'requests_by_device',
  requests_by_operating_system = 'requests_by_operating_system',
  requests_by_ip_address = 'requests_by_ip_address',
  responses_by_status_code = 'responses_by_status_code'
}

export const sumAggregatedMetricPrefixes: readonly string[] = [
  MetricPrefixName.requests_by_uri,
  MetricPrefixName.requests_by_browser,
  MetricPrefixName.requests_by_device,
  MetricPrefixName.requests_by_operating_system,
  MetricPrefixName.requests_by_ip_address,
  MetricPrefixName.responses_by_status_code
];

export const isSumAggregatedMetric = (metricName: string): boolean => {
  return sumAggregatedMetricPrefixes.some(prefix => metricName.startsWith(prefix));
}

export const rawMetricsRetentionMs = 24 * 60 * 60 * 1000;

export interface IAggregatedMetrics {
  [metricName: string]: {
    [metricAggregateWindow in MetricAggregateWindow]?: IMetricAggregateWindow[];
  };
}

//export type MetricAggregateWindow = '1m' | '5m' | '15m' | '1h' | '3h' | '6h' | '12h' | '1d' | '3d' | '1w' | '2w' | '1mo';

export interface IMetricAggregateWindow {
  startTime: number;
  endTime: number;
  count: number;
  min: number;
  max: number;
  mean: number;
  p95?: number;
}

export const enum MetricAggregateWindow {
  '1m'  = '1m',
  '5m'  = '5m',
  '15m' = '15m',
  '1h'  = '1h',
  '3h'  = '3h',
  '6h'  = '6h',
  '12h' = '12h',
  '1d'  = '1d',
  '3d'  = '3d',
  '1w'  = '1w',
  '2w'  = '2w',
  '1mo' = '1mo'
}

export const metricAggregateWindows = [
  '1m', '5m', '15m',
  '1h', '3h', '6h', '12h',
  '1d', '3d',
  '1w', '2w',
  '1mo'
];

export type TMetricAggregateWindow = typeof metricAggregateWindows[number];

export const isMetricAggregateWindow = (value: string): value is MetricAggregateWindow => {
  return (metricAggregateWindows as readonly string[]).includes(value);
}

export const toMetricAggregateWindow = (value: string): MetricAggregateWindow => {

  if (!isMetricAggregateWindow(value)) {
    throw new Error(`invalid metric aggregate window: ${value}`);
  }

  return value;
}

export const aggregateWindowDurationMs: Record<MetricAggregateWindow, number> = {
  '1m':   1  * 60 * 1000,
  '5m':   5  * 60 * 1000,
  '15m':  15 * 60 * 1000,
  '1h':   60 * 60 * 1000,
  '3h':   3  * 60 * 60 * 1000,
  '6h':   6  * 60 * 60 * 1000,
  '12h':  12 * 60 * 60 * 1000,
  '1d':   24 * 60 * 60 * 1000,
  '3d':   3  * 24 * 60 * 60 * 1000,
  '1w':   7  * 24 * 60 * 60 * 1000,
  '2w':   14 * 24 * 60 * 60 * 1000,
  '1mo':  30 * 24 * 60 * 60 * 1000,
}

export const aggregateWindowRetentionMs: Record<MetricAggregateWindow, number> = {
  '1m':  6  * 60 * 60 * 1000,               // 6 hours
  '5m':  6  * 60 * 60 * 1000,               // 6 hours
  '15m': 24 * 60 * 60 * 1000,               // 1 day
  '1h':  3  * 24 * 60 * 60 * 1000,          // 3 days
  '3h':  7  * 24 * 60 * 60 * 1000,          // 1 week
  '6h':  15 * 24 * 60 * 60 * 1000,          // 15 days
  '12h': 30 * 24 * 60 * 60 * 1000,          // 30 days
  '1d':  90 * 24 * 60 * 60 * 1000,          // 90 days
  '3d':  180 * 24 * 60 * 60 * 1000,         // ~6 months
  '1w':  365 * 24 * 60 * 60 * 1000,         // 1 year
  '2w':  365 * 24 * 60 * 60 * 1000,         // 1 year
  '1mo': 730 * 24 * 60 * 60 * 1000,         // 2 years
}

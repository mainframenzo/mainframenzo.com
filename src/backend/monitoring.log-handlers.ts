// This file is responsible for monitoring logs, parsing them, and emitting metrics based on parsed data.
// References:
// * https://github.com/madsmtm/nginx-error-log
import { Parser as NginxAccessLogParser } from '@robojones/nginx-log-parser';
import { UAParser } from 'ua-parser-js';

import * as metrics from './metrics';
import * as iface from './iface';

export const handleNginxAccessLogEntry = (line: string) => {
	console.trace('handleNginxAccessLogEntry', line);

	const parser = new NginxAccessLogParser(nginxAccessLogSchema);

	const nginxAccessLogEntry = parser.parseLine(line);
	console.debug('nginxAccessLogEntry', nginxAccessLogEntry);

	const request = parseRequest(nginxAccessLogEntry.request);
	console.debug('request', request);

	const timestamp = parseAccessLogTimestamp(nginxAccessLogEntry.time_local);

  metrics.addMonitorMetric({
    metricType: 'count',
    metricName: `${iface.MetricPrefixName.requests_by_uri}-${encodeURIComponent(request.uri)}-${request.method.toLowerCase()}-${nginxAccessLogEntry.status}`,
    metricValue: 1,
    timestamp
  });

  const { browser, os, device } = UAParser(nginxAccessLogEntry.http_user_agent);

  metrics.addMonitorMetric({
    metricType: 'count',
    metricName: `${iface.MetricPrefixName.requests_by_browser}-${browser.name || 'unknown'}`,
    metricValue: 1,
    timestamp
  });
  metrics.addMonitorMetric({
    metricType: 'count',
    metricName: `${iface.MetricPrefixName.requests_by_device}-${device.vendor || 'unknown'}`,
    metricValue: 1,
    timestamp
  });
  metrics.addMonitorMetric({
    metricType: 'count',
    metricName: `${iface.MetricPrefixName.requests_by_operating_system}-${os.name || 'unknown'}`,
    metricValue: 1,
    timestamp
  });

  metrics.addMonitorMetric({
    metricType: 'count',
    metricName: `${iface.MetricPrefixName.responses_by_status_code}-${nginxAccessLogEntry.status}`,
    metricValue: 1,
    timestamp
  });

  metrics.addMonitorMetric({
		metricType: 'count',
		metricName: `${iface.MetricPrefixName.requests_by_ip_address}-${encodeURIComponent(nginxAccessLogEntry.remote_addr)}`,
    metricValue: 1,
		timestamp
	});

  // FIXME Is referrer even that useful?
	// nginxAccessLogEntry.http_referer;
}

const nginxAccessLogSchema = '$remote_addr - $remote_user [$time_local] "$request" $status $bytes_sent "$http_referer" "$http_user_agent"';

const parseRequest = (request: string): IRequest => {
  const [method, uri, protocol] = request.split(' ');
  const url = new URL(uri, 'http://placeholder');
  const query = Object.fromEntries(url.searchParams.entries());

	return { method, uri, path: url.pathname, query, protocol };
}

interface IRequest {
  readonly method: string;
  readonly uri: string;
  readonly path: string;
  readonly query: Record<string, string>;
  readonly protocol: string;
}

const parseAccessLogTimestamp = (dateString: string): Date => {
  const match = accessLogDatetimeRegex.exec(dateString);

  if (!match || !match.groups) {
    throw new Error(`could not parse ${JSON.stringify(dateString)} as a date`);
  }

  const { year, month, day, hour, minute, second } = match.groups;

  const monthIndex = new Date(`${month} ${day} ${year}`).getMonth(); // For example, "Apr" is 3.

  const date = new Date(
    Number(year),
    monthIndex,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );

  if (isNaN(date.getTime())) {
    throw new Error(`could not parse ${JSON.stringify(dateString)} as a date`);
  }

  return date;
}

// Looks like: [13/Apr/2026:16:06:50 +0000]
const accessLogDatetimeRegex =
  /^(?<day>\d{2})\/(?<month>[A-Za-z]+)\/(?<year>\d{4}):(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2}) [+-]\d{4}$/;

export const handleNginxErrorLogEntry = (line: string) => {
	console.trace('handleNginxErrorLogEntry', line);

	const nginxErrorLogEntry = parseNginxErrorLine(line);
	console.debug('nginxErrorLogEntry', nginxErrorLogEntry);

	// FIXME queue entry for processing.
	// FIXME queue size is metric. cicd too.
}

const parseNginxErrorLine = (line: string): IErrorLogEntry => {
  const match = errorLogLineRegex.exec(line);

	if (!match || !match.groups) {
    throw new Error(`could not parse line: ${JSON.stringify(line)}`);
  }

  const { date_string, level, message, pid, tid, cid } = match.groups;

  return {
    timestamp: parseErrorLogTimestamp(date_string),
    level: parseLevel(level),
    message: message.trim(),
    pid: parseInt(pid, 10),
    tid: parseInt(tid, 10),
    cid: cid !== undefined ? parseInt(cid, 10) : null,
  };
}

interface IErrorLogEntry {
  readonly timestamp: Date;
  readonly level: Level;
  readonly message: string;
  readonly pid: number;
  readonly tid: number;
  readonly cid: number | null;
}

const errorLogLineRegex =
  /^(?<date_string>[\d/: ]{19}) \[(?<level>[a-z]+)\] (?<pid>\d+)#(?<tid>\d+): (?:\*(?<cid>\d+) )?(?<message>[\s\S]*)$/;

const parseErrorLogTimestamp = (dateString: string): Date => {
  const match = errorLogDatetimeRegex.exec(dateString);

  if (!match || !match.groups) {
    throw new Error(`could not parse ${JSON.stringify(dateString)} as a date`);
  }

  const { year, month, day, hour, minute, second } = match.groups;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );

  if (isNaN(date.getTime())) {
    throw new Error(`could not parse ${JSON.stringify(dateString)} as a date`);
  }

  return date;
}

// Looks like: "2026/04/13 16:35:37"
const errorLogDatetimeRegex =
  /^(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2}) (?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})$/;

const parseLevel = (data: string): Level => {
  const level = levelMapping[data];

	if (!level) {
    throw new Error(`could not parse level from line: ${JSON.stringify(data)}`);
  }

  return level;
}

enum Level {
  DEBUG = 10,
  INFO = 20,
  NOTICE = 25,
  WARNING = 30,
  ERROR = 40,
  CRITICAL = 50,
  ALERT = 60,
  EMERGENCY = 70
}

const levelMapping: Record<string, Level> = {
  debug: Level.DEBUG,
  info: Level.INFO,
  notice: Level.NOTICE,
  warn: Level.WARNING,
  error: Level.ERROR,
  crit: Level.CRITICAL,
  alert: Level.ALERT,
  emerg: Level.EMERGENCY
};

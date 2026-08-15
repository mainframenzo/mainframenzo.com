// This file is responsible for handling Monitoring API requests.
import _globalThis from '../@types/global-this';

import type { Context } from 'openapi-backend';
import type { Request, Response } from 'express';

import { components } from '../openapi-def/types';
import * as monitoringData from './monitoring.data';
import { backendState } from './state';
import { renderOpsPage } from './ops.ssr';
import * as iface from './iface';
import { isEqual } from './utils';

const recentMetricWindow = iface.toMetricAggregateWindow('1m');

export const getOpsDashboard = async (_context: Context<{}>, req: Request, res: Response) => {
  console.trace('getOpsDashboard');

  let metricWindow = iface.toMetricAggregateWindow(req.query['metricWindow'] as string);
  const validMetricWindow = validateMetricWindow(req.query['metricWindow'] as string);
  if (!validMetricWindow) {
    metricWindow = iface.toMetricAggregateWindow('1h');
  }

  if (req.query['render'] && req.query['render'] === 'true') {
    console.debug('rendering ops dashboard on-the-fly');

    await renderOpsPage(metricWindow);
  }

  const windowOpsHtmlPage = backendState.get().opsHtmlPages[metricWindow];
  const recentOpsHtmlPage = backendState.get().opsHtmlPages[recentMetricWindow]; // Fallback, always render something.

  if (!windowOpsHtmlPage && !recentOpsHtmlPage) {
    return res.status(200).send('<p>Something went wrong!</p>'); // Unless you can't.
  }

  if (windowOpsHtmlPage) {
    return res.status(200).send(windowOpsHtmlPage);
  }

  return res.status(200).send(recentOpsHtmlPage);
}

const validateMetricWindow = (metricWindow: string): boolean => {
  try {
    return iface.isMetricAggregateWindow(metricWindow);
  } catch (error) {
    return false;
  }
}

export const getMonitorStatArpCache = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatArpCache() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatBandwidth = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatBandwidth() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatCpuInfo = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatCpuInfo() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatCpuIntensiveProcesses = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatCpuIntensiveProcesses() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatCpuTemp = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatCpuTemp() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatCpuUtilization = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatCpuUtilization() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatCronHistory = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatCronHistory() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatCurrentRam = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatCurrentRam() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatDiskPartitions = async (_context: Context<{}>, _req: Request, res: Response) => {
 return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatDiskPartitions() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatDockerProcesses = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatDockerProcesses() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatDownloadTransferRate = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatDownloadTransferRate() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatGeneralInfo = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatGeneralInfo() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatIoStats = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatIoStats() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatIpAddresses = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatIpAddresses() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatLoadAvg = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatLoadAvg() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatLoggedInUsers = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatLoggedInUsers() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatMemoryInfo = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatMemoryInfo() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatNetworkConnections = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatNetworkConnections() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatNumberOfCpuCores = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatNumberOfCpuCores() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatRamIntensiveProcesses = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatRamIntensiveProcesses() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatRecentAccountLogins = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatRecentAccountLogins() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatScheduledCrons = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatScheduledCrons() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatSwap = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatSwap() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatUploadTransferRate = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatUploadTransferRate() } as unknown as components['schemas']['IJSendResponse']);
}

export const getMonitorStatUserAccounts = async (_context: Context<{}>, _req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', message: 'Got monitoring stat.', data: await monitoringData.getMonitorStatUserAccounts() } as unknown as components['schemas']['IJSendResponse']);
}

#! node
// This file is responsible for defining your API.
import _globalThis from '../@types/global-this';

import 'source-map-support/register';
import { OpenAPIBackend } from 'openapi-backend';
import type { Context, Request as OpenAPIRequest } from 'openapi-backend';
import type { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import { components } from '../openapi-def/types';
import * as auth from './auth';
import * as cicd from './cicd';
import * as media from './media';
import * as ops from './ops';
import * as opsScheduler from './ops.scheduler';
import * as lifecycle from './lifecycle';
import * as runtimeSchemaValidator from './runtime-schema-validator';
import { startLlamafile } from './llm';

const app = express();
app.use(express.json({
  verify: (req: Request & { rawBody?: Buffer }, _res, buf) => {
    // Stash the exact raw bytes so webhook signature verification in CICD
    //  can HMAC the same bytes GitHub actually signed, instead of a
    // re-serialized (and potentially byte-different?) JSON.stringify(req.body).
    req.rawBody = Buffer.from(buf);
  }
})); // Parse POST body as JSON.
app.use(express.urlencoded({ extended: true })); // Parse form POST body as JSON.
//app.use(express.static(`${process.cwd()}/dist.frontend`)); nginx handles this.

if (_globalThis.app_location === 'local') {
  app.use(cors());
} else {
  const options: cors.CorsOptions = {
    origin: _globalThis.publish_stage === 'dev' ?
      ['https://dev.mainframenzo.com', 'https://www.dev.mainframenzo.com'] : ['https://mainframenzo.com', 'https://www.mainframenzo.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies.
  };
  app.use(cors(options));
}

const api = new OpenAPIBackend({ definition: `${process.cwd()}/src/openapi-def/_api.yaml` });

// The registration order of handlers seems to matter. See: https://github.com/openapistack/openapi-backend/blob/main/examples/express-jwt-auth/index.js
api.register({
  validationFail: async (context, _req, res) => res.status(400).json({ status: 'error', message: 'Bad request.', data: context.validation.errors } as components['schemas']['IJSendResponse']),
  // They mean "unauthenticated" - you could supply an API key and still not be authorized to do something.
  unauthorizedHandler: async (_context, _req, res) => res.status(401).json({ status: 'error', message: 'Unauthenticated.' } as components['schemas']['IJSendResponse']),
  notFound: async (_context, _req: Request, res: Response) => res.status(404).json({ status: 'error', message: 'Not found.' } as components['schemas']['IJSendResponse']),
});

// https://news.ycombinator.com/item?id=48558147 yea, you know.
// You maybe had a reason for doing this...mobile app configuration of streaming playlists?
api.registerSecurityHandler('bearerAuth', (context: Context, _req: Request, _res: Response) => {
  console.trace('bearerAuth handler');

  const authHeader = context.request.headers['authorization'];
  if (!authHeader) {
    throw new Error('Missing authorization header');
  }

  const token = authHeader.replace('Bearer ', '');

  return jwt.verify(token, _globalThis.jwt_secret!, { algorithms: ['HS256'] });
});

api.register({
  login: auth.login,
  //startCICD: cicd.startOnGitPush,
  downloadPlaylistSong: media.downloadPlaylistSong,
  getOpsDashboard: ops.getOpsDashboard,

  // getMonitorStatArpCache: ops.getMonitorStatArpCache,
  // getMonitorStatBandwidth: ops.getMonitorStatBandwidth,
  // getMonitorStatCpuInfo: ops.getMonitorStatCpuInfo,
  // getMonitorStatCpuIntensiveProcesses: ops.getMonitorStatCpuIntensiveProcesses,
  // getMonitorStatCpuTemp: ops.getMonitorStatCpuTemp,
  // getMonitorStatCpuUtilization: ops.getMonitorStatCpuUtilization,
  // getMonitorStatCronHistory: ops.getMonitorStatCronHistory,
  // getMonitorStatCurrentRam: ops.getMonitorStatCurrentRam,
  // getMonitorStatDiskPartitions: ops.getMonitorStatDiskPartitions,
  // getMonitorStatDockerProcesses: ops.getMonitorStatDockerProcesses,
  // getMonitorStatDownloadTransferRate: ops.getMonitorStatDownloadTransferRate,
  // getMonitorStatGeneralInfo: ops.getMonitorStatGeneralInfo,
  // getMonitorStatIoStats: ops.getMonitorStatIoStats,
  // getMonitorStatIpAddresses: ops.getMonitorStatIpAddresses,
  // getMonitorStatLoadAvg: ops.getMonitorStatLoadAvg,
  // getMonitorStatLoggedInUsers: ops.getMonitorStatLoggedInUsers,
  // getMonitorStatMemoryInfo: ops.getMonitorStatMemoryInfo,
  // getMonitorStatNetworkConnections: ops.getMonitorStatNetworkConnections,
  // getMonitorStatNumberOfCpuCores: ops.getMonitorStatNumberOfCpuCores,
  // getMonitorStatRamIntensiveProcesses: ops.getMonitorStatRamIntensiveProcesses,
  // getMonitorStatRecentAccountLogins: ops.getMonitorStatRecentAccountLogins,
  // getMonitorStatScheduledCrons: ops.getMonitorStatScheduledCrons,
  // getMonitorStatSwap: ops.getMonitorStatSwap,
  // getMonitorStatUploadTransferRate: ops.getMonitorStatUploadTransferRate,
  // getMonitorStatUserAccounts: ops.getMonitorStatUserAccounts
});

api.init();

app.use(morgan('combined')); // Logging.
app.use((req, res) => api.handleRequest(req as OpenAPIRequest, req, res));

// Start your local LLM used for monitoring analysis.
// FIXME Add flag to start/not start. Hetzner availability for cost-optimized servers is limited,
//  and while this runs on a cx33, cx43 might be better, and right now you're on a cx23 because of said availability.
//const llamaProcess = await startLlamafile();

// The monitoring software loads schemas up front for runtime validation of OS-ushered data.
await runtimeSchemaValidator.loadSchemas();

// The ops dashboard requires a bit of monitoring software running in the background to make work.
await opsScheduler.startBackgroundWork();

process.on('SIGINT', async () => { // ctrl + c
  setTimeout(() => { process.exit(0); }, 5 * 1000);

  await opsScheduler.stopBackgroundWork();
  //lifecycle.shutdown(llamaProcess);

  process.exit(0);
});

process.on('SIGTERM', async () => { // Termination signal.
  setTimeout(() => { process.exit(0); }, 5 * 1000);

  await opsScheduler.stopBackgroundWork();
  //lifecycle.shutdown(llamaProcess);

  process.exit(0);
});

app.listen(8081);

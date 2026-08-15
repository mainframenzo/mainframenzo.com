// This file is responsible for handling CICD API requests.
// FIXME CICD + webhooks is still a work in progress as you migrate off AWS.
import _globalThis from '../@types/global-this';

import * as crypto from 'crypto';
import type { Context } from 'openapi-backend';
import type { Request, Response } from 'express';
import spawn from 'spawn-please';
import { createQueue, QueueOrder } from 'simple-in-memory-queue';
import * as types from '../openapi-def/types';

export const startOnGitPush = async (_context: Context<{}>, req: Request, res: Response) => {
  console.trace('startOnGitPush');

  const headers = req.headers;
  const signature = headers['X-Hub-Signature-256'] || headers['x-hub-signature-256'];
  const githubEvent = headers['X-GitHub-Event'] || headers['x-github-event'];
  const id = headers['X-GitHub-Delivery'] || headers['x-github-delivery'];
  const calculatedSha256Signature = signRequestBody(_globalThis.github_webhook_secret!, req.body, 'sha256');

  if (!signature) {
    console.error('starting cicd failed, missing signature in header');

    return res.status(401).json({ status: 'error', message: 'No X-Hub-Signature-256 found in request.', data: { } });
  }
  if (!githubEvent) {
    console.error('starting cicd failed, missing github event in header');

    return res.status(401).json({ status: 'error', message: 'No X-GitHub-Event found in request.', data: { } });
  }
  if (!id) {
    console.error('starting cicd failed, missing github id in header');

    return res.status(401).json({ status: 'error', message: 'No X-GitHub-Delivery found in request.', data: { } });
  }
  if (!calculatedSha256Signature) {
    console.error('starting cicd failed, missing signature in header');

    return res.status(401).json({ status: 'error', message: 'No X-Hub-Signature-256 found in request.', data: { } });
  }

  if (!timingSafeSignatureCompare(signature as string, calculatedSha256Signature)) {
    console.error('starting cicd failed, calculated signature is not equal to signature');

    return res.status(401).json({ status: 'error', message: 'X-Hub-Signature-256 incorrect. Github webhook githubToken doesn\'t match.', data: { } });
  }

  webhookQueue.push(req.body);

  return res.status(200).json({ status: 'ok', message: 'Queued CICD event.', data: { } });
}

// Constant-time comparison of the two "sha256=<hex>" signature strings.
// A plain !== comparison leaks timing information proportional to how many
//  leading bytes match, which can theoretically help an attacker recover a
//  valid signature byte-by-byte.
const timingSafeSignatureCompare = (a: string, b: string): boolean => {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    // Still run a comparison of equal-length buffers so this branch doesn't
    //  itself introduce a length-based timing signal for very short inputs.
    crypto.timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));

    return false;
  }

  return crypto.timingSafeEqual(bufferA, bufferB);
};

export const signRequestBody = (key: string, body: any, algorithm: 'sha1' | 'sha256') => {
  console.trace('signRequestBody', 'key', key);

  return `${algorithm}=${crypto.createHmac(algorithm, key).update(JSON.stringify(body), 'utf-8').digest('hex')}`;
}

const webhookQueue = createQueue({
  order: QueueOrder.LAST_IN_FIRST_OUT
});
webhookQueue.on.push.subscribe({ consumer: async (event) => {
  console.debug('webhook queue consumer running', event);

  for (const item of event.items) {
    if (cicdRunning) {
      console.warn('cicd running, ignoring webhook'); // FIXME OR cancel and restart?

      break;
    }

    const githubWebookPush = item as unknown as types.components['schemas']['IGithubWebhookPush'];
    console.debug('will start cicd', githubWebookPush);

    if (githubWebookPush.ref !== `refs/heads/${_globalThis.publish_stage === 'dev' ? 'main' : 'prod'}`) {
      console.warn('not starting cicd, wrong ref');

      continue;
    }

    await startCICD();
    await monitorCICD(); // FIXME callback?

    // FIXME Ok, now the real fun starts. Here's what you do:
    // * Generate .zip of build folder
    // * Update Github v.0.0.x release for the private or public repository depending on if dev or prod (replace the .zip file)
    // * We'll need to restart backend, nginx, and fail2ban, and basically do everything cloud config did...again, but without rebooting?
  }
}});

let cicdRunning = false;

const startCICD = async () => {
  console.trace('startCICD');

  // FIXME if app location is local, can you test by mounting a temp volume?

  cicdRunning = true;

  if (_globalThis.app_stage === 'local' && _globalThis.app_location === 'local') {
    console.warn('not running cicd, local test running');

    return;
  }

  let dockerRunResponse = '';
  await spawn('just', ['-f', './.justfiles/docker.just', 'cicd', _globalThis.app_stage, _globalThis.publish_stage, _globalThis.app_location], {
    rejectOnError: true,
    stdout: (data) => { dockerRunResponse += Buffer.from(data).toString(); },
    stderr: (data) => { console.error(Buffer.from(data).toString()); }
  }, { cwd: process.cwd() });
  console.debug('dockerRunResponse', dockerRunResponse);
}

const monitorCICD = () => {
  console.trace('monitorCICD');

  const interval = setInterval(async () => {
    cicdRunning = await cicdContainerRunning();

    if (!cicdRunning) {
      console.debug('cicd done');
      // FIXME get status

      clearInterval(interval);

      return;
    }
  }, 10 * 1000);
}

const cicdContainerRunning = async (): Promise<boolean> => {
  console.trace('cicdContainerRunning');

  let dockerListContainersResponse = '';
  await spawn('docker', ['ps'], {
    rejectOnError: true,
    stdout: (data) => { dockerListContainersResponse += Buffer.from(data).toString(); },
    stderr: (data) => { console.error(Buffer.from(data).toString()); }
  }, { cwd: process.cwd() });
  console.debug('dockerListContainersResponse', dockerListContainersResponse);

  return dockerListContainersResponse.includes('meblog');
}

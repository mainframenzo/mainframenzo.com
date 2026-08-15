// This file is responsible for providing test utils.
import { ChildProcess, spawn } from 'node:child_process';
import { TestContext } from 'node:test';

export const testSetup = async (test: TestContext) => {
  console.trace('testSetup');

  test.before(() => { killLlamafileProcesses(); }); // Tests have a hard time killing llamafile processes started with backend.

  const backend = await startBackend();
  const vite = await startVite();
  await waitForBackend(); // Waiting for local llamafile server to come up.

  test.after(() => {
    backend.kill();
    vite.kill();

    killLlamafileProcesses();
  });
};

export const killLlamafileProcesses = (): void => {
  spawn('bash', [
    '-lc',
    `ps -ef | grep -i llamafile | grep -v grep | awk '{print $2}' | xargs -r kill -9`
  ], {
    stdio: 'inherit',
  });
};

const startBackend = async (): Promise<ChildProcess> => {
  const [command, ...args] = 'npx tsx src/backend/index.ts'.split(' ');

  const child = spawn(command, args, {
    env: {
      ...process.env
    },
    stdio: 'inherit',
    shell: true
  });

  return new Promise<ChildProcess>((resolve) => {
    setTimeout(() => {
      resolve(child);
    }, 2_000);
  });
};

const startVite = async (): Promise<ChildProcess> => {
  const [command, ...args] = 'npx vite --host'.split(' ');

  const child = spawn(command, args, {
    env: {
      ...process.env,
    },
    stdio: 'inherit',
    shell: true
  });

  return new Promise<ChildProcess>((resolve) => {
    setTimeout(() => {
      resolve(child);
    }, 2_000);
  });
};

const waitForBackend = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 10_000);
  });
};

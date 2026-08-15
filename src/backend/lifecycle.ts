import { ChildProcess } from 'child_process';

export const shutdown = (childProcess: ChildProcess) => {
  console.trace('[backend] shutdown');

  setTimeout(() => {
    forceKillProcessTree(childProcess);

    process.exit(0);
  }, 2 * 1000);

  killProcessTree(childProcess);
};

const killProcessTree = (child: ChildProcess): void => {
  console.trace('[backend] killProcessTree');

  if (child.pid === undefined) { return; }

  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch { } // Eat.
};

const forceKillProcessTree = (child: ChildProcess): void => {
  console.trace('[backend] forceKillProcessTree');

  if (child.pid === undefined) { return; }

  try {
    process.kill(-child.pid, 'SIGKILL');
  } catch { } // Eat.
};

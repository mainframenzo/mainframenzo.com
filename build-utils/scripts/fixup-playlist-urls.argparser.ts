// This file is responsible for parsing command-line arguments passed to the respectively named CLI program.
import { parse } from 'ts-command-line-args';

class ArgParser {
  readonly args: CLIArgs;

  constructor() {
    this.args = parse<CLIArgs>(
      {
        'playlist-file-path': { type: String, description: 'Absolute file path of playlist.' },
        'dry-run': { type: String, description: 'true|false', defaultValue: 'false' }
      }
    );

    JSON.parse(this.args['dry-run']);
  }
}

interface CLIArgs {
  readonly 'playlist-file-path': string;
  readonly 'dry-run': string;
}

const argparser = new ArgParser();

export { argparser }
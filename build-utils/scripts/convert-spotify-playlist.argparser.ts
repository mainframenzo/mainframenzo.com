// This file is responsible for parsing command-line arguments passed to the respectively named CLI program.
import { parse } from 'ts-command-line-args';

class ArgParser {
  readonly args: CLIArgs;

  constructor() {
    this.args = parse<CLIArgs>(
      {
        'playlist-file-path': { type: String, description: 'Absolute file path of Spotify playlist.' },
        'playlist-output-file-path': { type: String, description: 'Absolute file path of formatted playlist.' },
        'dry-run': { type: String, description: 'true|false', defaultValue: 'true' }
      }
    );

    JSON.parse(this.args['dry-run']);
  }
}

interface CLIArgs {
  readonly 'playlist-file-path': string;
  readonly 'playlist-output-file-path': string;
  readonly 'dry-run': string;
}

const argparser = new ArgParser();

export { argparser }

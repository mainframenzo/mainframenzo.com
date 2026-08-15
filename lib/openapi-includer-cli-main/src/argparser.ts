// This file is responsible for parsing command-line arguments passed to the utility.
import { parse } from 'ts-command-line-args';

class ArgParser {
  readonly args: CLIArgs;
  
  constructor() {
    console.debug('argv', process.argv); 

    this.args = parse<CLIArgs>(
      {
        'absolute-input-openapi-def-path': { type: String, alias: 'i', description: 'Input OpenAPI def YAML path with $includes keyword.' },
        'absolute-output-openapi-def-path': { type: String, alias: 'o', description: 'Output OpenAPI def YAML path with $included YAML from other files.' },

        help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide' },
      },
      {
        helpArg: 'help',
        headerContentSections: [{ header: 'Usage', content: 'npx openapi-includer-cli --absolute-input-openapi-def-path=./src/test/api.yaml --absolute-output-openapi-def-path=/path/to/_api.yaml' }]
      }
    );

    console.debug('args', this.args);
  }
}

interface CLIArgs {
  readonly 'absolute-input-openapi-def-path': string;
  readonly 'absolute-output-openapi-def-path': string;

  readonly help?: boolean;
}

const argparser = new ArgParser();

export { argparser }
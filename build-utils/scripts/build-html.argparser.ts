// This file is responsible for parsing command-line arguments passed to the respectively named CLI program.
import { parse } from 'ts-command-line-args';
//import { TAppLocation, TAppStage, TPublishStage } from './iface';

class ArgParser {
  readonly args: CLIArgs;
  private readonly appStages = ['local', 'main'];
  private readonly appPublishStages = ['dev', 'prod'];
  private readonly appLocations = ['local', 'hosted'];

  constructor() {
    this.args = parse<CLIArgs>(
      {
        // This seems like a lot of configuration! 
        // This allows for you to run the website locally but still rely on infra resources in main, if need be.
        'app-stage': { type: String, description: 'local|main' },
        'publish-stage': { type: String, description: 'dev|prod' },
        'app-location': { type: String, description: 'local|hosted' }
      }
    );

    if (!this.appStages.includes(this.args['app-stage'])) {
      console.error('Invalid app-stage supplied as arg, must be one of: local|main');

      process.exit(1);
    }

    if (!this.appPublishStages.includes(this.args['publish-stage'])) {
      console.error('Invalid publish-stage supplied as arg, must be one of: dev|prod');

      process.exit(1);
    }

    if (!this.appLocations.includes(this.args['app-location'])) {
      console.error('Invalid app-location supplied as arg, must be one of: local|hosted');

      process.exit(1);
    }
  }
}

interface CLIArgs {
  // FIXME Argparser not compatible with types.
  readonly 'app-stage': string; //TAppStage;
  readonly 'publish-stage': string; //TPublishStage;
  readonly 'app-location': string; //TAppLocation;
}

const argparser = new ArgParser();

export { argparser }
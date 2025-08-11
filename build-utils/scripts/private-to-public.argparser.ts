// This file is responsible for parsing command-line arguments passed to the respectively named CLI program.
import { parse } from 'ts-command-line-args';
//import { TAppLocation, TAppStage, TAppPublishStage } from './iface';

class ArgParser {
  readonly args: CLIArgs;
  private readonly appStages = ['local', 'main'];
  private readonly appPublishStages = ['dev', 'prod'];
  private readonly appLocations = ['local', 'aws'];

  constructor() {
    this.args = parse<CLIArgs>(
      {
        // This seems like a lot of configuration! 
        // This allows for you to run the website locally but still rely on AWS resources in main, if need be.
        'stage': { type: String, description: 'local|main' },
        'publish-stage': { type: String, description: 'dev|prod' },
        'app-location': { type: String, description: 'local|aws' }
      }
    );

    if (!this.appStages.includes(this.args.stage)) {
      console.error('Invalid stage supplied as arg, must be one of: local|main');

      process.exit(1);
    }

    if (!this.appPublishStages.includes(this.args['publish-stage'])) {
      console.error('Invalid publish-stage supplied as arg, must be one of: dev|prod');

      process.exit(1);
    }

    if (!this.appLocations.includes(this.args['app-location'])) {
      console.error('Invalid app-location supplied as arg, must be one of: local|aws');

      process.exit(1);
    }
  }
}

interface CLIArgs {
  // FIXME Argparser not compatible with types.
  readonly 'stage': string; //TAppStage;
  readonly 'publish-stage': string; //TAppPublishStage;
  readonly 'app-location': string; // TAppLocation;
}

const argparser = new ArgParser();

export { argparser }
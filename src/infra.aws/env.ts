// This file is responsible for defining common env vars.
import * as Constructs from 'constructs';
import * as constants from './constants';
import { TPublishStage } from './stage';

export default class Env extends Constructs.Construct {
  readonly environment: { [key: string]: string } = {};

  constructor(scope: Constructs.Construct, id: string, props: Props) {
    super(scope, id);
    
    this.environment = {
      ...props.environment,

      app_location: 'aws',
      stage: props.stage.name,
      publish_stage: props.publishStage,
      is_test: 'false',
      is_docker: 'true',
      node_env: 'development',

      aws_resource_prefix: props.stage.getResourcePrefix(),
      aws_resource_suffix: props.stage.deployId,
      aws_cfn_prefix: props.stage.getConfig().cfnPrefix,
      aws_deploy_id: props.stage.getConfig().deployID,
      aws_account_id: props.stage.getConfig().accountID,
  
      // Used by notifier.
      aws_frontend_cfn_stack_suffix: props.stage.getConfig().frontendCfnStackSuffix,
      aws_frontend_website_url_cfn_export_name_suffix: props.stage.getConfig().websiteURLCfnExportNameSuffix,

      NODE_OPTIONS: '--enable-source-maps'
    };
  }
}

interface Props extends constants.CommonProps {
  publishStage: TPublishStage;
  readonly environment?: { [key: string]: string; }
}
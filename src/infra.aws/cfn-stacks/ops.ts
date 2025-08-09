// This file is responsible for defining the ops AWS infra stack.
import * as cdk from 'aws-cdk-lib';
import * as constants from '../constants';
import * as Events from 'aws-cdk-lib/aws-events';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as Constructs from 'constructs';
import * as EventTargets from 'aws-cdk-lib/aws-events-targets';
import TSLambdaFunction from '../lambda.fn';
import MEBLOGOpsDashboard from '../ops/ops-dashboard';
import { MEBLOGFrontendStackCfnExports } from './frontend';
import Env from '../env';
import { TPublishStage } from '../stage';

export class MEBLOGOpsStack extends cdk.Stack {
  readonly exported?: CfnExports;

  constructor(scope: cdk.App, id: string, props: Props) {
    super(scope, id, props.stage.stackProps);

    const frontendStackCfnExports = new MEBLOGFrontendStackCfnExports(this, 'frontend-cfn-exports', props);
    const env = new Env(this, 'env', props);

    const nodeModulesLayer = new Lambda.LayerVersion(this, 'chromium-layer', {
      compatibleRuntimes: [ Lambda.Runtime.NODEJS_20_X ],
      layerVersionName: props.stage.getResourceName({ resourceName: 'chromium' }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      code: Lambda.Code.fromAsset('/tmp/chromium-v132.0.0-layer.zip'), // See "deploy/ops" command in `<meblog-src>/makefile.infrs` for where this gets downloaded.
      compatibleArchitectures: [Lambda.Architecture.X86_64, Lambda.Architecture.ARM_64],
    });

    // "Integration tests" generate baseline metrics and are included in "ops" for this reason.
    const integrationTestsFunction = new TSLambdaFunction(this, 'integ-tests-fn', {
      stage: props.stage,
      env,
      functionName: props.stage.getResourceName({ resourceName: 'integ-tests-fn', publishStage: props.publishStage }),
      code: props.integrationTestsDistDir,
      cmd: `infra_aws_bundle_importified.runIntegrationTests`,
      environment: {
        app_url: `https://${frontendStackCfnExports.cloudfrontDistribution?.distributionDomainName}`
      },
      layers: [nodeModulesLayer],
      exclude: ['node_modules/@sparticuz/chromium'] // Comes from layer.
    });

    // The "integration tests" run as a "canary" every 24 hours.
    const rule = new Events.Rule(this, 'Rule', {
      schedule: Events.Schedule.rate(cdk.Duration.hours(24))
    });
    rule.addTarget(new EventTargets.LambdaFunction(integrationTestsFunction.function));
    
    const functions: Map<string, Lambda.IFunction> = new Map<string, Lambda.IFunction>();
    functions.set('integration-tests', integrationTestsFunction.function);

    const opsDashboard = new MEBLOGOpsDashboard(this, 'ops-dashboard', { 
      ...props,
      cloudfrontDistribution: frontendStackCfnExports.cloudfrontDistribution,
      functions
    });

    this.exported = {
      integrationTestsFunctionARN: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().integrationTestsFunctionARNCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: integrationTestsFunction.function.functionArn,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().integrationTestsFunctionARNCfnExportNameSuffix, publishStage: props.publishStage })
      }),
      opsDashboardARN: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().opsDashboardARNCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: opsDashboard.dashboard.dashboardArn,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().opsDashboardARNCfnExportNameSuffix, publishStage: props.publishStage })
      })
    };
  }
}

interface Props extends constants.CommonProps {
  readonly publishStage: TPublishStage;
  readonly integrationTestsDistDir: string;
}

interface CfnExports {
  readonly integrationTestsFunctionARN: cdk.CfnOutput; // Exported so we can execute from the CLI (locally or during CICD).
  readonly opsDashboardARN: cdk.CfnOutput; // Exported so we can lookup to get ops dashboard URL.
}

// Exported values imported in other cdk cfn constructs.
export class MEBLOGOpsStackCfnExports extends Constructs.Construct {
  constructor(scope: Constructs.Construct, id: string, _props: CfnExportProps) {
    super(scope, id);
  }
}

interface CfnExportProps extends constants.CommonProps {
  publishStage: TPublishStage;
}
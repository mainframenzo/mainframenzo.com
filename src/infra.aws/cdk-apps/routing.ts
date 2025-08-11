#! node
// This file is responsible for defining the CDK app entrypoint which defines routing resources.
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import AppStage from '../stage';
import { MEBLOGRoutingStack } from '../cfn-stacks/routing';
//import { AwsSolutionsChecks } from 'cdk-nag';
import * as cdkContext from '../cdk.context'; 

const app = new cdk.App();

// Provided at runtime.
const cdkAction = cdkContext.getValidContext(app, 'cdk-action')!;
//const cdkNag = (cdkContext.getValidContext(app, 'cdk-nag') === 'true');
const stageName = cdkContext.getValidContext(app, 'stage')!;
const deployId = cdkContext.getValidContext(app, 'deploy-id')!;

// us-east-1 isn't a requirement in this case but since ACM and AWS WAF CloudFormation stacks are deployed there, kind of just makes sense to as well.
const stage = new AppStage(app, 'stage', { name: stageName, deployId, cdkAction, region: 'us-east-1' });

new MEBLOGRoutingStack(app, stage.getResourceName({ resourceName: stage.getConfig().routingCfnStackSuffix }), { stage });

// Add tags to all created resources.
cdk.Tags.of(app).add('cdk-group', stage.getResourcePrefix());
cdk.Tags.of(app).add('cdk-app', stage.getResourceName({ resourceName: stage.getConfig().routingCfnStackSuffix }));

// This library is not worth the effort.
//if (cdkNag) { cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true })); }

app.synth();
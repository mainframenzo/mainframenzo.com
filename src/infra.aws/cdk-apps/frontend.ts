#! node
// This file is responsible for defining the CDK app entrypoint which defines backend resources.
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import AppStage, { TPublishStage } from '../stage';
import { MEBLOGFrontendStack } from '../cfn-stacks/frontend';
//import { AwsSolutionsChecks } from 'cdk-nag';
import * as cdkContext from '../cdk.context';

const app = new cdk.App();

// Provided at runtime.
const cdkAction = cdkContext.getValidContext(app, 'cdk-action')!;
//const cdkNag = (cdkContext.getValidContext(app, 'cdk-nag') === 'true');
const stageName = cdkContext.getValidContext(app, 'stage')!;
const publishStage = (cdkContext.getValidContext(app, 'publish-stage') as TPublishStage)!;
const deployId = cdkContext.getValidContext(app, 'deploy-id')!;

const stage = new AppStage(app, 'stage', { name: stageName, deployId, cdkAction });

new MEBLOGFrontendStack(app, stage.getResourceName({ resourceName: stage.getConfig().frontendCfnStackSuffix, publishStage }), { stage, publishStage });

// Add tags to all created resources.
cdk.Tags.of(app).add('cdk-group', stage.getResourcePrefix());
cdk.Tags.of(app).add('cdk-app', stage.getResourceName({ resourceName: stage.getConfig().frontendCfnStackSuffix, publishStage }));

// This library is not worth the effort.
//if (cdkNag) { cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true })); }

app.synth();
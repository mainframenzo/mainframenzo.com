#! node
// This file is responsible for defining the CDK app entrypoint which defines ops resources.
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import AppStage, { TPublishStage } from '../stage';
import { MEBLOGOpsStack } from '../cfn-stacks/ops';
//import { AwsSolutionsChecks } from 'cdk-nag';
import * as cdkContext from '../cdk.context'; 

const app = new cdk.App();

// Provided at runtime.
const cdkAction = cdkContext.getValidContext(app, 'cdk-action')!;
//const cdkNag = (cdkContext.getValidContext(app, 'cdk-nag') === 'true');
const stageName = cdkContext.getValidContext(app, 'stage')!;
const publishStage = (cdkContext.getValidContext(app, 'publish-stage') as TPublishStage)!;
const deployId = cdkContext.getValidContext(app, 'deploy-id')!;
const integrationTestsDistDir = cdkContext.getValidContext(app, 'integration-tests-dist-dir')!;

const stage = new AppStage(app, 'stage', { name: stageName, deployId, cdkAction });

new MEBLOGOpsStack(app, stage.getResourceName({ resourceName: stage.getConfig().opsCfnStackSuffix, publishStage }), { stage, publishStage, integrationTestsDistDir });

// Add tags to all created resources.
cdk.Tags.of(app).add('cdk-group', stage.getResourcePrefix());
cdk.Tags.of(app).add('cdk-app', stage.getResourceName({ resourceName: stage.getConfig().opsCfnStackSuffix, publishStage }));

// This library is not worth the effort.
//if (cdkNag) { cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true })); }

app.synth();
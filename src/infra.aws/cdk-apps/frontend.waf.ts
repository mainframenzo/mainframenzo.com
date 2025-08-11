#! node
// This file is responsible for defining the CDK app entrypoint which defines frontend WAF resources.
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import AppStage, { TPublishStage } from '../stage';
import { MEBLOGFrontendWAFStack } from '../cfn-stacks/frontend.waf';
//import { AwsSolutionsChecks } from 'cdk-nag';
import * as cdkContext from '../cdk.context'; 

const app = new cdk.App();

// Provided at runtime.
const cdkAction = cdkContext.getValidContext(app, 'cdk-action')!;
//const cdkNag = (cdkContext.getValidContext(app, 'cdk-nag') === 'true');
const stageName = cdkContext.getValidContext(app, 'stage')!;
const publishStage = (cdkContext.getValidContext(app, 'publish-stage') as TPublishStage)!;
const deployId = cdkContext.getValidContext(app, 'deploy-id')!;

// Taken from somewhere: WAF is available globally for CloudFront distributions, 
//  but you must use the Region US East (N. Virginia) to create your web ACL and 
//  any resources used in the web ACL, such as rule groups, IP sets, and regex pattern sets.
const stage = new AppStage(app, 'stage', { name: stageName, deployId, cdkAction, region: 'us-east-1' });

new MEBLOGFrontendWAFStack(app, stage.getResourceName({ resourceName: stage.getConfig().frontendWafCfnStackSuffix, publishStage }), { stage, publishStage });

// Add tags to all created resources.
cdk.Tags.of(app).add('cdk-group', stage.getResourcePrefix());
cdk.Tags.of(app).add('cdk-app', stage.getResourceName({ resourceName: stage.getConfig().frontendWafCfnStackSuffix, publishStage }));

// This library is not worth the effort.
//if (cdkNag) { cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true })); }

app.synth();
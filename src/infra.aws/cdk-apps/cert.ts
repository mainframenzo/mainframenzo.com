#! node
// This file is responsible for defining the CDK app entrypoint which defines cert resources.
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import AppStage, { TPublishStage } from '../stage';
import { MEBLOGCertStack } from '../cfn-stacks/cert';
//import { AwsSolutionsChecks } from 'cdk-nag';
import * as cdkContext from '../cdk.context'; 

const app = new cdk.App();

// Provided at runtime.
const cdkAction = cdkContext.getValidContext(app, 'cdk-action')!;
//const cdkNag = (cdkContext.getValidContext(app, 'cdk-nag') === 'true');
const stageName = cdkContext.getValidContext(app, 'stage')!;
const publishStage = (cdkContext.getValidContext(app, 'publish-stage') as TPublishStage)!;
const deployId = cdkContext.getValidContext(app, 'deploy-id')!;

// Taken from somewhere: To use an ACM certificate with Amazon CloudFront, 
//  you must request or import the certificate in the US East (N. Virginia) region. 
//  ACM certificates in this region that are associated with a CloudFront distribution are 
//  distributed to all the geographic locations configured for that distribution.
const stage = new AppStage(app, 'stage', { name: stageName, deployId, cdkAction, region: 'us-east-1' });

new MEBLOGCertStack(app, stage.getResourceName({ resourceName: stage.getConfig().certCfnStackSuffix, publishStage }), { stage, publishStage });

// Add tags to all created resources.
cdk.Tags.of(app).add('cdk-group', stage.getResourcePrefix());
cdk.Tags.of(app).add('cdk-app', stage.getResourceName({ resourceName: stage.getConfig().certCfnStackSuffix, publishStage }));

// This library is not worth the effort.
//if (cdkNag) { cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true })); }

app.synth();
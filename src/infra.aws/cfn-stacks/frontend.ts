// This file is responsible for defining the frontend AWS infra stack.
import * as cdk from 'aws-cdk-lib';
import * as Constructs from 'constructs';
import * as constants from '../constants';
import * as S3 from 'aws-cdk-lib/aws-s3';
import * as CloudFront from 'aws-cdk-lib/aws-cloudfront';
import MEBLOGWebsite from '../frontend/website';
import Env from '../env';
import { TPublishStage } from '../stage';

export class MEBLOGFrontendStack extends cdk.Stack {
  readonly exported?: CfnExports;

  constructor(scope: cdk.App, id: string, props: Props) {
    super(scope, id, props.stage.stackProps);

    const env = new Env(this, 'env', props);
    const apiAndWebsite = new MEBLOGWebsite(this, 'website', { ...props, env });

    this.exported = {
      cloudFrontDistributionAccessLogsBucketName: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().cloudFrontDistributionAccessLogsBucketNameCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: apiAndWebsite.cloudFrontDistributionAccessLogsBucket.bucket.bucketName,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().cloudFrontDistributionAccessLogsBucketNameCfnExportNameSuffix, publishStage: props.publishStage })
      }),
      websiteBucketName: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().websiteBucketNameCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: apiAndWebsite.websiteBucket.bucket.bucketName,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().websiteBucketNameCfnExportNameSuffix, publishStage: props.publishStage })
      }),

      appURL: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().websiteURLCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: apiAndWebsite.cloudFrontDistribution.distributionDomainName,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().websiteURLCfnExportNameSuffix, publishStage: props.publishStage })
      }),
      distributionId: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().distributionIdCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: apiAndWebsite.cloudFrontDistribution.distributionId,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().distributionIdCfnExportNameSuffix, publishStage: props.publishStage })
      })
    };
  }
}

interface Props extends constants.CommonProps {
  publishStage: TPublishStage;
}

interface CfnExports {
  readonly cloudFrontDistributionAccessLogsBucketName: cdk.CfnOutput; // Exported so we can cleanup.
  readonly websiteBucketName: cdk.CfnOutput; // Exported so we lookup to sync website files during deploy and also cleanup.

  readonly appURL: cdk.CfnOutput; // Exported for debugging.
  readonly distributionId: cdk.CfnOutput; // Exported so we can invalidate CloudFront distribution on website deploy.
}

// Exported values imported in other cdk cfn constructs.
export class MEBLOGFrontendStackCfnExports extends Constructs.Construct {
  readonly websiteBucket: S3.IBucket; // Imported so we can self-mutate CICD pipeline to give it frontend deploy access.

  readonly cloudfrontDistribution: CloudFront.IDistribution; // Imported so we can authorize CICD to invalidate it.

  constructor(scope: Constructs.Construct, id: string, props: CfnExportProps) {
    super(scope, id);

    const websiteBucketName = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().websiteBucketNameCfnExportNameSuffix, publishStage: props.publishStage })).toString();
    console.debug('websiteBucketName', websiteBucketName);
    this.websiteBucket = S3.Bucket.fromBucketAttributes(this, 'imported-website-bucket', {
      bucketName: websiteBucketName
    });
   
    const appURL = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().websiteURLCfnExportNameSuffix, publishStage: props.publishStage })).toString();
    const distributionId = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().distributionIdCfnExportNameSuffix, publishStage: props.publishStage })).toString();
    console.debug('distributionId', distributionId);
    this.cloudfrontDistribution = CloudFront.Distribution.fromDistributionAttributes(this, 'imported-distribution', { domainName: appURL, distributionId });
  }
}

interface CfnExportProps extends constants.CommonProps {
  publishStage: TPublishStage;
}
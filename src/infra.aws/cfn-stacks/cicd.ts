// This file is responsible for defining the cicd AWS infra stack.
import * as cdk from 'aws-cdk-lib';
import * as Constructs from 'constructs';
import * as constants from '../constants';
import AppStage, { TPublishStage } from '../stage';
import CICDPipeline from '../cicd/pipeline';
import * as S3 from 'aws-cdk-lib/aws-s3';
import ContainerImageRepo from '../ecr.repo';

export class MEBLOGCICDStack extends cdk.Stack {
  readonly exported?: CfnExports;

  constructor(scope: cdk.App, id: string, stage: AppStage, publishStage: TPublishStage, selfMutatePipeline: boolean) {
    super(scope, id, stage.stackProps);

    const cicdContainerImageRepo = new ContainerImageRepo(this, 'cicd-image-repo', { 
      repositoryName: stage.getResourceName({ resourceName: 'cicd' }),
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const pipeline = new CICDPipeline(this, 'cicd-pipeline', { stage, publishStage, selfMutatePipeline, cicdContainerImageRepo });

    this.exported = {
      sourceCodeBucketName: new cdk.CfnOutput(this, stage.getResourceName({ resourceName: stage.getConfig().sourceCodeBucketNameCfnExportNameSuffix }), {
        value: pipeline.sourceCodeBucket.bucket.bucketName,
        exportName: stage.getCfnExportResourceName({ resourceName: stage.getConfig().sourceCodeBucketNameCfnExportNameSuffix })
      })
    };
  }
}

interface CfnExports {
  readonly sourceCodeBucketName: cdk.CfnOutput; // Exported so we can try and empty before destroying resources.
}

// Exported values imported in other cdk cfn constructs.
export class MEBLOGCICDStackCfnExports extends Constructs.Construct {
  readonly sourceCodeBucket: S3.IBucket; // Imported so we can grant access to content.

  constructor(scope: Constructs.Construct, id: string, props: constants.CommonProps) {
    super(scope, id);

    const sourceCodeBucketName = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().sourceCodeBucketNameCfnExportNameSuffix })).toString();
    this.sourceCodeBucket = S3.Bucket.fromBucketAttributes(this, 'imported-source-code-bucket', {
      bucketName: sourceCodeBucketName
    });
  }
}
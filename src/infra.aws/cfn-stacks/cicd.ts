// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
//
// This file is responsible for defining the cicd AWS infra stack.
import * as cdk from 'aws-cdk-lib';
import * as Constructs from 'constructs';
import * as constants from '../constants';
import AppStage, { TPublishStage } from '../stage';
import * as S3 from 'aws-cdk-lib/aws-s3';
import * as IAM from 'aws-cdk-lib/aws-iam';
import * as CodeBuild from 'aws-cdk-lib/aws-codebuild';
import Bucket from '../s3.bucket';
import { getRemovalPolicy } from '../resource';
import { MEBLOGFrontendStackCfnExports } from './frontend';
import CICDPipelineIAMPolicies from '../cicd/policies';
import * as cfnNagSuppressions from '../cfn.nag.suppressions';

export class MEBLOGCICDStack extends cdk.Stack {
  readonly exported?: CfnExports;

  constructor(scope: cdk.App, id: string, stage: AppStage, publishStage: TPublishStage, selfMutatePipeline: boolean) {
    super(scope, id, stage.stackProps);

    // Source code gets uploaded here to start CICD.
    const sourceCodeBucket = new Bucket(this, 'source-code', {
      removalPolicy: getRemovalPolicy(stage)
    });

    let devFrontendStackCfnExports: MEBLOGFrontendStackCfnExports | undefined;
    if (selfMutatePipeline && publishStage === 'dev') {
      devFrontendStackCfnExports = new MEBLOGFrontendStackCfnExports(this, 'dev-frontend-cfn-exports', { stage, publishStage: 'dev' });
    }

    let prodFrontendStackCfnExports: MEBLOGFrontendStackCfnExports | undefined;
    if (selfMutatePipeline && publishStage === 'prod') {
      prodFrontendStackCfnExports = new MEBLOGFrontendStackCfnExports(this, 'prod-frontend-cfn-exports', { stage, publishStage: 'prod' });
    }

    const pipelineIAMPolicies = new CICDPipelineIAMPolicies(this, 'iam-policies', { 
      stage,
      devCloudfrontDistribution: devFrontendStackCfnExports?.cloudfrontDistribution,
      cicdSourceBucket: sourceCodeBucket.bucket,
      devWebsiteBucket: devFrontendStackCfnExports?.websiteBucket, // Only exists after CICD deploys this.
      prodWebsiteBucket: prodFrontendStackCfnExports?.websiteBucket, // Only exists after CICD deploys this.
      prodCloudfrontDistribution: prodFrontendStackCfnExports?.cloudfrontDistribution
    });

    // CodeBuild only supports single files as input (you specify a file known to exist),
    //  but you use "s3 sync" to get files to CICD for cost reasons.
    // We'll have to download the actual source manually during a build.
    const buildProject = new CodeBuild.Project(this, 'cicd', {
      projectName: stage.getResourceName({ resourceName: 'cicd' }),
      //environmentVariables: props.environmentVariables,
      source: CodeBuild.Source.s3({ bucket: sourceCodeBucket.bucket, path: 'cicd.zip' }),
      timeout: cdk.Duration.minutes(240), // It takes this long to render .pngs of parts libraries on-the-fly!
      // Based on: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html
      buildSpec: CodeBuild.BuildSpec.fromObject({
        //'run-as': props.runAs,
        env: {
          shell: 'bash',
          variables: {}, // Need empty shell vars to force shell? See: https://github.com/aws/aws-codebuild-docker-images/issues/388
          'exported-variables': []
        },
        version: '0.2',
        phases: { 
          install: { commands: [
            'echo $SHELL',
            'printenv',
            'echo $PATH',
            'pwd',
            'ls',
            'cd $CODEBUILD_SRC_DIR',
            
            // Setup Node.js. See: https://github.com/aws/aws-codebuild-docker-images/issues/580 and https://github.com/aws/aws-codebuild-docker-images/issues/631
            'n 20', // FIXME 24
            
            // Setup Docker. See: https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker-custom-image.html#sample-docker-custom-image-files
            'nohup dockerd --host=unix:///var/run/docker.sock --host=tcp://127.0.0.1:2375 &',
            'timeout 15 sh -c "until docker info; do echo .; sleep 1; done"',
    
            //`aws ecr get-login-password --region ${stage.getConfig().region} | docker login -u AWS --password-stdin "https://$(aws sts get-caller-identity --query 'Account' --output text).dkr.ecr.${stage.getConfig().region}.amazonaws.com"`,
            
            'export PATH=$PATH:/usr/local',
          ]},
          build: { commands: [
            `make -f makefile.infra stage=${stage.name} publish_stage="dev" deploy/from-cicd`,
            `make -f makefile.infra stage=${stage.name} publish_stage="dev" tests/integration`,
            `make -f makefile.infra stage=${stage.name} publish_stage="prod" deploy/from-cicd`,
            `make -f makefile.infra stage=${stage.name} publish_stage="prod" tests/integration`
          ] } 
        }
      }),
      environment: {
        privileged: true,
        buildImage: CodeBuild.LinuxBuildImage.STANDARD_7_0,
        computeType: CodeBuild.ComputeType.SMALL
      }
    });

    pipelineIAMPolicies.getAllAllowed()?.forEach(policyStatement => { 
      buildProject.addToRolePolicy(policyStatement); 
    });

    const cfnRole = buildProject?.role?.node.defaultChild as IAM.CfnRole;
    cfnRole.addMetadata('cfn_nag', {
      'rules_to_suppress': [cfnNagSuppressions.suppressECRAuth]
    });

    this.exported = {
      sourceCodeBucketName: new cdk.CfnOutput(this, stage.getResourceName({ resourceName: stage.getConfig().sourceCodeBucketNameCfnExportNameSuffix }), {
        value: sourceCodeBucket.bucket.bucketName,
        exportName: stage.getCfnExportResourceName({ resourceName: stage.getConfig().sourceCodeBucketNameCfnExportNameSuffix })
      })
    };
  }
}

interface CfnExports {
  readonly sourceCodeBucketName: cdk.CfnOutput; // Exported so you can try and empty before destroying resources.
}

// Exported values imported in other cdk cfn constructs.
export class MEBLOGCICDStackCfnExports extends Constructs.Construct {
  readonly sourceCodeBucket: S3.IBucket; // Imported so you can grant access to content.

  constructor(scope: Constructs.Construct, id: string, props: constants.CommonProps) {
    super(scope, id);

    const sourceCodeBucketName = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().sourceCodeBucketNameCfnExportNameSuffix })).toString();
    this.sourceCodeBucket = S3.Bucket.fromBucketAttributes(this, 'imported-source-code-bucket', {
      bucketName: sourceCodeBucketName
    });
  }
}
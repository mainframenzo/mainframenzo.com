// This file is responsible for defining our CICD pipeline.
import * as CodePipeline from 'aws-cdk-lib/aws-codepipeline';
import * as CodePipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as Constructs from 'constructs';
import { CICDPipelineStepBuilder } from './pipeline-step-builder';
import CICDPipelineIAMPolicies from './policies';
import * as constants from '../constants';
import CICDEnvs from './envs';
import Bucket from '../s3.bucket';
import { getRemovalPolicy } from '../resource';
import * as S3 from 'aws-cdk-lib/aws-s3';
import { MEBLOGFrontendStackCfnExports } from '../cfn-stacks/frontend';
import ContainerImageRepo from '../ecr.repo';
import { TPublishStage } from '../stage';

export default class CICDPipeline extends Constructs.Construct {
  private readonly props: constants.CommonProps;
  private readonly pipeline: CodePipeline.Pipeline;
  private readonly pipelineSteps: CodePipeline.StageProps[] = [] as CodePipeline.StageProps[];
  private readonly triggerSourceCode: CodePipeline.Artifact;
  private readonly pipelineIAMPolicies: CICDPipelineIAMPolicies;
  private readonly envs: CICDEnvs;

  readonly sourceCodeBucket: Bucket;

  constructor(scope: Constructs.Construct, id: string, props: Props) {
    super(scope, id);

    this.props = props;

    // Source code gets uploaded here to start CICD.
    this.sourceCodeBucket = new Bucket(this, 'source-code-bucket', {
      removalPolicy: getRemovalPolicy(props.stage)
    });

    // Not used but needed.
    const artifactBucket = new Bucket(this, 'artifact-bucket', {
      removalPolicy: getRemovalPolicy(props.stage)
    });

    this.pipeline = new CodePipeline.Pipeline(this, 'codepipeline', {
      pipelineName: props.stage.getResourceName({ resourceName: 'pipeline' }),
      restartExecutionOnUpdate: true,
      artifactBucket: artifactBucket.bucket,
      enableKeyRotation: true
    });

    let devFrontendStackCfnExports: MEBLOGFrontendStackCfnExports | undefined;
    if (props.selfMutatePipeline && props.publishStage === 'dev') {
      devFrontendStackCfnExports = new MEBLOGFrontendStackCfnExports(this, 'dev-frontend-cfn-exports', { ...props, publishStage: 'dev' });
    }

    let prodFrontendStackCfnExports: MEBLOGFrontendStackCfnExports | undefined;
    if (props.selfMutatePipeline && props.publishStage === 'prod') {
      prodFrontendStackCfnExports = new MEBLOGFrontendStackCfnExports(this, 'prod-frontend-cfn-exports', { ...props, publishStage: 'prod' });
    }

    this.pipelineIAMPolicies = new CICDPipelineIAMPolicies(this, 'iam-policies', { 
      stage: props.stage, 
      cicdContainerImageRepo: props.cicdContainerImageRepo,
      cicdSourceBucket: this.sourceCodeBucket.bucket,
      devWebsiteBucket: devFrontendStackCfnExports?.websiteBucket, // Only exists after CICD deploys this.
      devCloudfrontDistribution: devFrontendStackCfnExports?.cloudfrontDistribution,
      prodWebsiteBucket: prodFrontendStackCfnExports?.websiteBucket, // Only exists after CICD deploys this.
      prodCloudfrontDistribution: prodFrontendStackCfnExports?.cloudfrontDistribution
    });

    // CodePipeline only supports single files as input (i.e. zip files for groups of files),
    //  but we use "s3 sync" to get files to CICD for cost reasons.
    // We'll have to download the actual source manually once we upload a zip file of minimum size to trigger CICD.
    this.triggerSourceCode = new CodePipeline.Artifact('trigger-source-code');

    // A pipeline and its steps might have different access restrictions.
    // For our purposes, we configure the pipeline and each step to have the _same_ access.
    this.pipelineIAMPolicies.getAllAllowed().forEach(policy => this.pipeline.addToRolePolicy(policy));

    this.envs = new CICDEnvs(this, 'envs', { 
      stage: props.stage, 
      publishStage: props.publishStage,
      sourceCode: this.triggerSourceCode, 
      cicdContainerImageRepo: props.cicdContainerImageRepo
    });

    const pipelineStepBuilder = new CICDPipelineStepBuilder(this, 'pipeline-step', { 
      stage: props.stage, 
      publishStage: props.publishStage,
      sourceCode: this.triggerSourceCode, 
      pipelineIAMPolicies: this.pipelineIAMPolicies.getAllAllowed(),
      envs: this.envs
    });

    this.pipelineSteps.push(this.getSourceCodeStep(this.sourceCodeBucket.bucket));

    this.pipelineSteps.push(pipelineStepBuilder.createStepFromCommands('Deploy-Dev', [
      { actionName: 'Deploy-Dev', exec: `make -f makefile.infra stage=${this.props.stage.name} publish_stage="dev" deploy/from-cicd`, env: 'deploy', runOrder: 1 },
      //{ actionName: 'Integration-Tests-Dev', exec: `make -f makefile.infra stage=${this.props.stage.name} publish_stage="dev" tests/integration`, env: 'integration-tests', runOrder: 2 }
    ]));

    this.pipelineSteps.push(pipelineStepBuilder.createStepFromCommands('Post-Dev-Deploy', [
      { actionName: 'Integration-Tests-Dev', exec: `make -f makefile.infra stage=${this.props.stage.name} publish_stage="dev" tests/integration`, env: 'integration-tests', runOrder: 2 }
    ]));

    const manualApprovalAction = new CodePipelineActions.ManualApprovalAction({
      actionName: 'Approve',
    });
    this.pipelineSteps.push({ stageName: 'OK', actions: [manualApprovalAction] });

    this.pipelineSteps.push(pipelineStepBuilder.createStepFromCommands('Deploy-Prod', [
      { actionName: 'Deploy-Prod', exec: `make -f makefile.infra stage=${this.props.stage.name} publish_stage="prod" deploy/from-cicd`, env: 'deploy', runOrder: 1 },
    ]));
    
    this.pipelineSteps.push(pipelineStepBuilder.createStepFromCommands('Post-Prod-Deploy', [
      { actionName: 'Integration-Tests-Prod', exec: `make -f makefile.infra stage=${this.props.stage.name} publish_stage="prod" tests/integration`, env: 'integration-tests', runOrder: 2 }
    ]));

    this.pipelineSteps.forEach(step => this.pipeline.addStage(step));
  }

  private getSourceCodeStep(bucket: S3.IBucket): CodePipeline.StageProps {
    return { stageName: 'Get-Source', actions: [
      new CodePipelineActions.S3SourceAction({
        actionName: 'Trigger',
        bucket,
        bucketKey: 'cicd-trigger.zip',
        output: this.triggerSourceCode
      })
    ]};
  }
}

interface Props extends constants.CommonProps {
  readonly publishStage: TPublishStage;
  readonly selfMutatePipeline: boolean;
  readonly cicdContainerImageRepo: ContainerImageRepo;
}
import * as CodePipeline from 'aws-cdk-lib/aws-codepipeline';
import * as Constructs from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as CodeBuild from 'aws-cdk-lib/aws-codebuild';
import CICDBuildStep from './build-step';
import { BuildCommand } from './pipeline-step-builder';
import * as constants from '../constants';
import ContainerImageRepo from '../ecr.repo';
import { TPublishStage } from '../stage';

export default class CICDEnvs extends Constructs.Construct implements BuildEnvs {
  private readonly props: Props;

  constructor(scope: Constructs.Construct, id: string, props: Props) {
    super(scope, id);

    this.props = props;
  }

  getEnv(env: Env, buildCommand: BuildCommand): CICDBuildStep {
    if (env === 'deploy') { return this.standardEnv(buildCommand); }
    if (env === 'integration-tests') { return this.standardEnv(buildCommand); }

    return this.standardEnv(buildCommand);
  }

  private standardEnv(buildCommand: BuildCommand): CICDBuildStep {
    return new CICDBuildStep(this, buildCommand.actionName, {
      stage: this.props.stage,
      publishStage: this.props.publishStage,
      actionName: buildCommand.actionName,
      input: this.props.sourceCode,
      osType: 'linux',
      buildImage: CodeBuild.LinuxBuildImage.STANDARD_7_0,
      installCommands: [
        // Setup Node.js. See: https://github.com/aws/aws-codebuild-docker-images/issues/580 and https://github.com/aws/aws-codebuild-docker-images/issues/631
        'n 20',
        
        // Setup Docker. See: https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker-custom-image.html#sample-docker-custom-image-files
        'nohup dockerd --host=unix:///var/run/docker.sock --host=tcp://127.0.0.1:2375 &',
        'timeout 15 sh -c "until docker info; do echo .; sleep 1; done"',
 
        // You don't push changes often enough to make it worth the cost of storing a container image with pre-built dependencies in Amazon ECR,
        //  and I'm not hammering on third-parties, so just download and install them here. 
        // FIXME We could just "docker build" and "docker run" from CICD to build the frontend.
        // Then we could drop these download and installs below (they'd still happen just wouldn't duplicate steps).
        `aws ecr get-login-password --region ${this.props.stage.getConfig().region} | docker login -u AWS --password-stdin "https://$(aws sts get-caller-identity --query 'Account' --output text).dkr.ecr.${this.props.stage.getConfig().region}.amazonaws.com"`,

        // References: 
        // * https://python.plainenglish.io/eureka-i-finally-managed-to-activate-my-conda-environment-in-my-ci-pipeline-a8b578c21f03
        'wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh -q',
        'bash miniconda.sh -b -p $HOME/miniconda',
        '. "$HOME/miniconda/etc/profile.d/conda.sh"',
        'hash -r',
        'conda config --set always_yes yes --set changeps1 no',
        'conda update -q conda',
        'conda info -a',

        // FIXME link checker https://github.com/lycheeverse/lychee/releases/download/nightly/lychee-aarch64-unknown-linux-gnu.tar.gz

        'mkdir -p /usr/local/blender',
        'cd /usr/local/blender',
        'wget https://mirrors.iu13.net/blender/release/Blender4.2/blender-4.2.1-linux-x64.tar.xz',
        'tar -xvf blender-4.2.1-linux-x64.tar.xz -C /usr/local/blender --strip-components=1',
        'rm blender-4.2.1-linux-x64.tar.xz',
        'export PATH=$PATH:/usr/local/blender',
        'export PATH=$PATH:/usr/local'
      ], 
      timeout: cdk.Duration.hours(4),
      buildCommands: [buildCommand.exec],
      environmentVariables: {
        cicd_container_image_repo_name: {
          value: this.props.cicdContainerImageRepo.repo.repositoryName
        }
      },
      outputs: buildCommand.outputs,
      policyStatements: buildCommand.policyStatements // Step inherits the pipeline permissions.
    });
  }
}

interface Props extends constants.CommonProps {
  readonly publishStage: TPublishStage;
  readonly sourceCode: CodePipeline.Artifact;
  readonly cicdContainerImageRepo: ContainerImageRepo;
}

export type Env = 'deploy' | 'integration-tests';

export interface BuildEnvs {
  getEnv(env: string, buildCommand: BuildCommand): CICDBuildStep;
}
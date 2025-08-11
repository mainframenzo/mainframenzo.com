// This file is responsible for defining IAM policies used in deployment of MEBLOG via CICD.
import * as IAM from 'aws-cdk-lib/aws-iam';
import * as Constructs from 'constructs';
import * as policies from '../policies';
import * as constants from '../constants';
import * as S3 from 'aws-cdk-lib/aws-s3';
import * as CloudFront from 'aws-cdk-lib/aws-cloudfront';
import ContainerImageRepo from '../ecr.repo';

export default class CICDPipelineIAMPolicies extends Constructs.Construct {
  readonly props: Props;

  readonly allowCDK: IAM.PolicyStatement;
  readonly allowGetInfoFor: IAM.PolicyStatement;
  readonly allowPushToSSM: IAM.PolicyStatement;
  readonly allowConfigureWafLogging: IAM.PolicyStatement;
  readonly allowInvokeLambda: IAM.PolicyStatement;
  readonly allowSourceCodeBucketAccess: IAM.PolicyStatement;

  readonly allowDevWebsiteBucketAccess?: IAM.PolicyStatement;
  readonly allowDevCloudFrontInvalidationAccess?: IAM.PolicyStatement;
 
  readonly allowProdWebsiteBucketAccess?: IAM.PolicyStatement;
  readonly allowProdCloudFrontInvalidationAccess?: IAM.PolicyStatement;

  constructor(scope: Constructs.Construct, id: string, props: Props) {
    super(scope, id);

    this.props = props;

    // Needed to use the CDK in CodeBuild. 
    // We don't like using saved CDK context.json, but alternatively you can. See: 
    // * https://stackoverflow.com/questions/71836645/cannot-assume-lookup-role
    // * https://stackoverflow.com/questions/68275460/default-credentials-can-not-be-used-to-assume-new-style-deployment-roles
    this.allowCDK = policies.allowCDK(props.stage);

    // Needed to either:
    // * lookup other Cfn stack info and exports
    // * synth or deploy via CDK
    // * manage ECR images via CDK
    this.allowGetInfoFor = new IAM.PolicyStatement({
      actions: [
        'cloudformation:DescribeStacks',
        'ec2:DescribeVpcs', 
        'ec2:DescribeSecurityGroups',
        'ec2:DescribeAvailabilityZones',
        'ecr:DescribeRepositories',
        'ecr:DescribeImages',
        'ecr:GetAuthorizationToken',
        'ssm:GetParameter'
      ],
      resources: ['*']
    });

    // FIXME Scope to the single parameter I use.
    this.allowPushToSSM = new IAM.PolicyStatement({
      actions: ['ssm:PutParameter'],
      resources: ['*']
    });

    // See: https://stackoverflow.com/questions/70829639/awscdk-awswaf-logging-configuration-fails-to-deploy
    this.allowConfigureWafLogging = new IAM.PolicyStatement({
      actions: [
        'wafv2:AssociateWebACL',
        'wafv2:CreateWebACL',
        'wafv2:DeleteWebACL',
        'wafv2:DescribeManagedRuleGroup',
        'wafv2:DisassociateWebACL',
        'wafv2:Get*',
        'wafv2:List*',
        'wafv2:UpdateWebACL',
        'wafv2:GetLoggingConfiguration',
        'wafv2:ListLoggingConfiguration',
        'wafv2:PutLoggingConfiguration',
        'wafv2:DeleteLoggingConfiguration',
        'cloudwatch:DeleteAlarms',
        'cloudwatch:Describe*',
        'cloudwatch:DisableAlarmActions',
        'cloudwatch:EnableAlarmActions',
        'cloudwatch:GetDashboard',
        'cloudwatch:ListDashboards',
        'cloudwatch:PutDashboard',
        'cloudwatch:DeleteDashboards',
        'cloudwatch:GetMetricData',
        'cloudwatch:GetMetricStatistics',
        'cloudwatch:ListMetrics',
        'cloudwatch:PutMetricAlarm',
        'cloudwatch:PutMetricData',
        'iam:CreateServiceLinkedRole'
      ],
      resources: ['*']
    });

    // Needed to invoke Lambdas that run after deployment in pipeline.
    // FIXME We should be able to pass lambdas in since we're self-mutating now, use prefix perhaps otherwise.
    this.allowInvokeLambda = policies.allowInvokeLambdaFunction('*');

    this.allowSourceCodeBucketAccess = policies.allowBucketReadAccess(this.props.cicdSourceBucket.bucketArn);

    // Website S3 bucket gets created after publish stage deploy, 
    //  so pipeline needs to update its permissions after it's created.
    if (props.devWebsiteBucket) {
      console.debug('devWebsiteBucket', props.devWebsiteBucket ? true : false);
      this.allowDevWebsiteBucketAccess = policies.allowBucketReadWriteAccess(this.props.devWebsiteBucket?.bucketArn!);
    }
    // CloudFront distribution gets created after initial publish stage deploy, 
    //  so pipeline needs to update its permissions after it's created.
    console.debug('devCloudfrontDistribution', props.devCloudfrontDistribution ? true : false);
    if (props.devCloudfrontDistribution) {
      this.allowDevCloudFrontInvalidationAccess = new IAM.PolicyStatement({
        actions: [
          'cloudfront:UpdateDistribution',
          'cloudfront:DeleteDistribution',
          'cloudfront:CreateInvalidation'
        ],
        resources: [`arn:aws:cloudfront::${props.stage.getConfig().accountID}:distribution/${this.props.devCloudfrontDistribution?.distributionId}`]
      });
    }

    // Website S3 bucket gets created after publish stage deploy, 
    //  so pipeline needs to update its permissions after it's created.
    if (props.prodWebsiteBucket) {
      console.debug('prodWebsiteBucket', props.prodWebsiteBucket ? true : false);
      this.allowProdWebsiteBucketAccess = policies.allowBucketReadWriteAccess(this.props.prodWebsiteBucket?.bucketArn!);
    }
    // CloudFront distribution gets created after initial publish stage deploy, 
    //  so pipeline needs to update its permissions after it's created.
    console.debug('prodCloudfrontDistribution', props.prodCloudfrontDistribution ? true : false);
    if (props.prodCloudfrontDistribution) {
      this.allowProdCloudFrontInvalidationAccess = new IAM.PolicyStatement({
        actions: [
          'cloudfront:UpdateDistribution',
          'cloudfront:DeleteDistribution',
          'cloudfront:CreateInvalidation'
        ],
        resources: [`arn:aws:cloudfront::${props.stage.getConfig().accountID}:distribution/${this.props.prodCloudfrontDistribution?.distributionId}`]
      });
    }
  }

  getAllAllowed(): IAM.PolicyStatement[] {
    const allowedPolicies = [
      this.allowCDK,
      this.allowGetInfoFor,
      this.allowPushToSSM,
      this.allowConfigureWafLogging,
      this.allowInvokeLambda,
      this.allowSourceCodeBucketAccess
    ];

    if (this.allowDevWebsiteBucketAccess) { allowedPolicies.push(this.allowDevWebsiteBucketAccess); }
    if (this.allowDevCloudFrontInvalidationAccess) { allowedPolicies.push(this.allowDevCloudFrontInvalidationAccess); }

    if (this.allowProdWebsiteBucketAccess) { allowedPolicies.push(this.allowProdWebsiteBucketAccess); }
    if (this.allowProdCloudFrontInvalidationAccess) { allowedPolicies.push(this.allowProdCloudFrontInvalidationAccess); }

    return allowedPolicies;
  }
}

interface Props extends constants.CommonProps {
  readonly cicdSourceBucket: S3.IBucket;
  readonly cicdContainerImageRepo: ContainerImageRepo;
  readonly devWebsiteBucket?: S3.IBucket;
  readonly devCloudfrontDistribution?: CloudFront.IDistribution;
  readonly prodWebsiteBucket?: S3.IBucket;
  readonly prodCloudfrontDistribution?: CloudFront.IDistribution;
}
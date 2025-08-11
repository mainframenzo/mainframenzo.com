// This file is responsible for defining the website infra.
import * as Constructs from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as constants from '../constants';
import * as CloudFront from 'aws-cdk-lib/aws-cloudfront';
import * as CloudFrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as Route53 from 'aws-cdk-lib/aws-route53';
import * as Route53Targets from 'aws-cdk-lib/aws-route53-targets';
import { getRemovalPolicy } from '../resource';
import Bucket from '../s3.bucket';
import Env from '../env';
import { getContentSecurityPolicy } from './content-security-policy';
import { TPublishStage } from '../stage';
import { MEBLOGFrontendWAFStackCfnExports } from '../cfn-stacks/frontend.waf';
import { MEBLOGCertStackCfnExports } from '../cfn-stacks/cert';
import { MEBLOGRoutingStackCfnExports } from '../cfn-stacks/routing';

export default class MEBLOGWebsite extends Constructs.Construct {
  readonly cloudFrontDistributionAccessLogsBucket: Bucket;
  readonly websiteBucket: Bucket;
  readonly cloudFrontDistribution: CloudFront.Distribution;

  constructor(scope: Constructs.Construct, id: string, props: Props) {
    super(scope, id);

    this.cloudFrontDistributionAccessLogsBucket = new Bucket(this, 'access-logs', {
      removalPolicy: getRemovalPolicy(props.stage)
    });

    this.websiteBucket = new Bucket(this, 'website', {
      removalPolicy: getRemovalPolicy(props.stage),
      serverAccessLogsBucket: this.cloudFrontDistributionAccessLogsBucket
    });

    const websiteS3Origin = new CloudFrontOrigins.S3Origin(this.websiteBucket.bucket);

    const domainName =  props.publishStage === 'dev' ? props.stage.getConfig().devDomainName : props.stage.getConfig().domainName;

    const contentSecurityPolicy = getContentSecurityPolicy([
      domainName
    ]);

    const responseHeadersPolicy = new CloudFront.ResponseHeadersPolicy(this, 'response-headers-policy', {
      corsBehavior: {
        // FIXME Validate this config isn't too exposed.
        accessControlAllowCredentials: false,
        accessControlAllowHeaders: ['*'],
        accessControlAllowMethods: ['GET'], //, 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        accessControlAllowOrigins: ['*'],
        accessControlExposeHeaders: ['*'],
        accessControlMaxAge: cdk.Duration.minutes(10),
        originOverride: true
      },
      customHeadersBehavior: {
        customHeaders: [
          { header: 'Permissions-Policy', value: 'fullscreen=(self)', override: true },
          // Required for splat previews to work. See: https://stackoverflow.com/questions/72881660/web-worker-blocked-by-self-crossoriginisolated-on-cypress
          { header: 'Cross-Origin-Opener-Policy', value: 'same-origin', override: true },
          { header: 'Cross-Origin-Embedder-Policy', value: 'require-corp', override: true }
        ],
      },
      securityHeadersBehavior: {
        contentSecurityPolicy: { contentSecurityPolicy, override: true },
        frameOptions: { frameOption: CloudFront.HeadersFrameOption.DENY, override: true },
        referrerPolicy: { referrerPolicy: CloudFront.HeadersReferrerPolicy.NO_REFERRER, override: true },
        strictTransportSecurity: { accessControlMaxAge: cdk.Duration.minutes(10), includeSubdomains: true, override: true },
        xssProtection: { protection: true, modeBlock: true, override: true }
      }
    });

    // We only restrict to IPs for dev publish stage.
    let wafAclAttrArn: string | undefined;
    if (props.publishStage === 'dev') {
      const meblogFrontendWAFStackCfnExports = new MEBLOGFrontendWAFStackCfnExports(this, 'frontend-waf-cfn-exports', props);
      wafAclAttrArn = meblogFrontendWAFStackCfnExports.wafAclAttrArn;
    }

    const meblogCertStackCfnExports = new MEBLOGCertStackCfnExports(this, 'cert-cfn-exports', props);

    this.cloudFrontDistribution = new CloudFront.Distribution(this, 'cloudfront-distribution', {
      webAclId: wafAclAttrArn,
      certificate: meblogCertStackCfnExports.certificate,
      domainNames: [
        domainName,
        `www.${domainName}`
      ],
      priceClass: CloudFront.PriceClass.PRICE_CLASS_100,
      defaultBehavior: { // Cache all static files.
        origin: websiteS3Origin,
        viewerProtocolPolicy: CloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: CloudFront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: CloudFront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy
      },
      defaultRootObject: 'index.html',
      errorResponses: [{
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/404.html'
      }],
      enableLogging: false,
      //logBucket: this.cloudFrontDistributionAccessLogsBucket.bucket,
      //logFilePrefix: 'distribution-access-logs/',
      //logIncludesCookies: true
    });

    const meblogRoutingStackCfnExports = new MEBLOGRoutingStackCfnExports(this, 'routing-cfn-exports', props);

    new Route53.RecordSet(this, 'www-a-record-set', {
      recordType: Route53.RecordType.A,
      zone: meblogRoutingStackCfnExports.hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(this.cloudFrontDistribution)),
      recordName: `www.${domainName}`
    });

    new Route53.RecordSet(this, 'a-record-set', {
      recordType: Route53.RecordType.A,
      zone: meblogRoutingStackCfnExports.hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(this.cloudFrontDistribution)),
      recordName: domainName
    });
  }
}

interface Props extends constants.CommonProps {
  readonly publishStage: TPublishStage;
  readonly env: Env;
}
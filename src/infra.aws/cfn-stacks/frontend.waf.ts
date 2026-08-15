// This file has been @deprecated - you no longer host the website on AWS, and this functionality was moved to nginx et. al.
// This code remains in case you ever want to deploy to AWS again.
//
// This file is responsible for defining the frontend WAF AWS infra stack.
// References:
// * https://gist.github.com/matheushent/1c5a02bac6397209f2fe41c0ab3567a3
import * as cdk from 'aws-cdk-lib';
import * as constants from '../constants';
import * as Constructs from 'constructs';
import * as WAFV2 from 'aws-cdk-lib/aws-wafv2';
import * as LOGS from 'aws-cdk-lib/aws-logs';
import * as SSM from 'aws-cdk-lib/aws-ssm';
import { TPublishStage } from '../stage';

export class MEBLOGFrontendWAFStack extends cdk.Stack {
  readonly exported?: CfnExports;

  private rules: cdk.aws_wafv2.CfnWebACL.RuleProperty[] = [
    // This provides protection against exploitation of a wide range of vulnerabilities, 
    //  including some of the high risk and commonly occurring vulnerabilities described in OWASP publications such as OWASP Top 10. 
    {
      priority: 0,
      overrideAction: { count: {} },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWS-AWSManagedRulesCommonRuleSet'
      },
      name: 'AWS-AWSManagedRulesCommonRuleSet',
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesCommonRuleSet'
        }
      }
    },
    {
      priority: 1,
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWS-AWSManagedRulesBotControlRuleSet'
      },
      overrideAction: { count: {} },
      name: 'AWS-AWSManagedRulesBotControlRuleSet',
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesBotControlRuleSet'
        }
      }
    }
  ];

  constructor(scope: cdk.App, id: string, props: Props) {
    super(scope, id, props.stage.stackProps);

    const restrictToPublicIp = SSM.StringParameter.valueForStringParameter(this, 'restrict_to_public_ip'); 

    const ipSetRestrictions = new WAFV2.CfnIPSet(this, 'ip-set', {
      addresses: [`${restrictToPublicIp}/32`],
      ipAddressVersion: 'IPV4',
      scope: 'CLOUDFRONT',
      name: props.stage.getResourceName({ resourceName: 'ip-set', publishStage: props.publishStage })
    });

    this.rules.push({
      name: props.stage.getResourceName({ resourceName: 'allow', publishStage: props.publishStage }),
      priority: 2,
      statement: {
        ipSetReferenceStatement: {
          arn: ipSetRestrictions.attrArn
        }
      },
      action: { allow: {} },
      visibilityConfig: {
        sampledRequestsEnabled: false,
        cloudWatchMetricsEnabled: false,
        metricName: props.stage.getResourceName({ resourceName: 'allow', publishStage: props.publishStage }),
      }
    });

    const webAcl = new WAFV2.CfnWebACL(this, 'web-acl', {
      customResponseBodies: {
        'restricted': {
          contentType: 'TEXT_PLAIN',
          content: 'Ah ah ah, not without the password!'
        }
      },
      name: props.stage.getResourceName({ resourceName: 'web-acl', publishStage: props.publishStage }),
      // Getting a lot of malicious traffic to try and see dev.mainframenzo.com, but there's nothing there but unfinished posts. Annoying.
      // So instead of returning a reference in the response to Jurassic Park (fun!), redirect these bad actors to John Connor (less fun!).
      // Also, set the status code as permanent - nothing to see here, not the droids you are looking for.
      // Now, if you, sir Mainframe, are on a different IP than when you deployed, don't forget you'll be treated as a bad actor too!
      defaultAction: { block: { customResponse: { responseCode: 308, customResponseBodyKey: 'restricted', responseHeaders: [{ name: 'location', value: 'https://mainframenzo.github.io/john-connor' }]}} },
      rules: this.rules,
      scope: 'CLOUDFRONT',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        sampledRequestsEnabled: false,
        metricName: props.stage.getResourceName({ resourceName: 'waf', publishStage: props.publishStage })
      }
    });

    const webAclLogGroup = new LOGS.LogGroup(this, 'web-acl-log-group', {
      // See: https://stackoverflow.com/questions/75571030/terraform-error-reason-the-arn-isnt-valid-a-valid-arn-begins-with-arn-and
      logGroupName: `aws-waf-logs-for-${props.stage.getResourceName({ resourceName: 'web-acl', publishStage: props.publishStage })}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  
    new WAFV2.CfnLoggingConfiguration(this, 'web-acl-logging-config', {
      logDestinationConfigs: [webAclLogGroup.logGroupArn],
      resourceArn: webAcl.attrArn
    });

    this.exported = {
      ipSetId: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().wafIpSetIdCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: ipSetRestrictions.attrId,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().wafIpSetIdCfnExportNameSuffix, publishStage: props.publishStage })
      }),
      wafAclAttrArn: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().wafAclAttrArnCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: webAcl.attrArn,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().wafAclAttrArnCfnExportNameSuffix, publishStage: props.publishStage })
      })
    };
  }
}

interface Props extends constants.CommonProps {
  publishStage: TPublishStage;
}

interface CfnExports {
  readonly ipSetId: cdk.CfnOutput; // Exported so you can manually update.
  readonly wafAclAttrArn: cdk.CfnOutput; // Exported so you can associate with Amazon CloudFront distribution.
}

// Exported values imported in other cdk cfn constructs.
export class MEBLOGFrontendWAFStackCfnExports extends Constructs.Construct {
  readonly wafAclAttrArn: string; // Imported to so you can associate with Amazon CloudFront distribution.

  constructor(scope: Constructs.Construct, id: string, props: CfnExportProps) {
    super(scope, id);
 
    this.wafAclAttrArn = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().wafAclAttrArnCfnExportNameSuffix, publishStage: props.publishStage })).toString();
  }
}

interface CfnExportProps extends constants.CommonProps {
  publishStage: TPublishStage;
}
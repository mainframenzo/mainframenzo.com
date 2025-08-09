// This file is responsible for defining the routing AWS infra stack.
// This stack is agnostic to publish stage.
import * as cdk from 'aws-cdk-lib';
import * as Constructs from 'constructs';
import * as constants from '../constants';
import * as Route53 from 'aws-cdk-lib/aws-route53';

export class MEBLOGRoutingStack extends cdk.Stack {
  readonly exported?: CfnExports;

  constructor(scope: cdk.App, id: string, props: Props) {
    super(scope, id, props.stage.stackProps);

    if (!props.stage.getConfig().devDomainName || props.stage.getConfig().devDomainName === 'dev.website.com') { 
      console.warn('No dev domain name configured, will not create certificate');

      process.exit(1);
    }

    if (!props.stage.getConfig().domainName || props.stage.getConfig().domainName === 'website.com') { 
      console.warn('No domain name configured, will not create certificate');

      process.exit(1);
    }

    const hostedZone = new Route53.HostedZone(this, 'hosted-zone', { zoneName: props.stage.getConfig().domainName });

    this.exported = {
      hostedZoneId: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().hostedZoneIdCfnExportNameSuffix }), {
        value: hostedZone.hostedZoneId,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().hostedZoneIdCfnExportNameSuffix })
      })
    };
  }
}

interface Props extends constants.CommonProps {}

interface CfnExports {
  readonly hostedZoneId: cdk.CfnOutput; // Exported so we can configure CloudFront and GoDaddy.
}

// Exported values imported in other cdk cfn constructs.
export class MEBLOGRoutingStackCfnExports extends Constructs.Construct {
  readonly hostedZone: Route53.IHostedZone;

  constructor(scope: Constructs.Construct, id: string, props: constants.CommonProps) {
    super(scope, id);

    const hostedZoneId = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().hostedZoneIdCfnExportNameSuffix }));
    this.hostedZone = Route53.PublicHostedZone.fromHostedZoneAttributes(this, 'imported-hosted-zone', {
      zoneName: props.stage.getConfig().domainName,
      hostedZoneId: hostedZoneId
    });
  }
}
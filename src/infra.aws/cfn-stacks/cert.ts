// This file is responsible for defining the cert AWS infra stack.
import * as cdk from 'aws-cdk-lib';
import * as Constructs from 'constructs';
import * as constants from '../constants';
import * as ACM from 'aws-cdk-lib/aws-certificatemanager';
import { TPublishStage } from '../stage';
import { MEBLOGRoutingStackCfnExports } from './routing';
import { CertificateWithCleanup } from '@servicevic-oss/cdk-cleanup-certificate-validation-records';

export class MEBLOGCertStack extends cdk.Stack {
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

    const meblogRoutingStackCfnExports = new MEBLOGRoutingStackCfnExports(this, 'routing-cfn-exports', props);

    const domainName = props.publishStage === 'dev' ? props.stage.getConfig().devDomainName : props.stage.getConfig().domainName;

    // Different certs for dev/prod:
    /*
    The CNAME records make removal of the cfn.
    const certificate = new ACM.Certificate(this, 'Certificate', {
      domainName,
      validation: ACM.CertificateValidation.fromDns(meblogRoutingStackCfnExports.hostedZone),
      subjectAlternativeNames: [
        `www.${domainName}`, 
        domainName
      ]
    });
    */
   
    // FIXME Lowercase.
    const certificate = new CertificateWithCleanup(this, 'Cert', {
      domainName,
      validation: cdk.aws_certificatemanager.CertificateValidation.fromDns(meblogRoutingStackCfnExports.hostedZone),
      subjectAlternativeNames: [
        `www.${domainName}`, 
        domainName
      ],
    });

    this.exported = {
      certificateArn: new cdk.CfnOutput(this, props.stage.getResourceName({ resourceName: props.stage.getConfig().certificateArnCfnExportNameSuffix, publishStage: props.publishStage }), {
        value: certificate.certificateArn,
        exportName: props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().certificateArnCfnExportNameSuffix, publishStage: props.publishStage })
      })
    };
  }
}

interface Props extends constants.CommonProps {
  publishStage: TPublishStage;
}

interface CfnExports {
  readonly certificateArn: cdk.CfnOutput; // Exported so we can configure CloudFront.
}

// Exported values imported in other cdk cfn constructs.
export class MEBLOGCertStackCfnExports extends Constructs.Construct {
  readonly certificate: ACM.ICertificate; // Imported for use in backend  API / CDN configuration.

  constructor(scope: Constructs.Construct, id: string, props: CfnExportProps) {
    super(scope, id);

    const certificateArn = cdk.Fn.importValue(props.stage.getCfnExportResourceName({ resourceName: props.stage.getConfig().certificateArnCfnExportNameSuffix, publishStage: props.publishStage }));
    this.certificate = ACM.Certificate.fromCertificateArn(this, 'imported-certificate', certificateArn);  
  }
}

interface CfnExportProps extends constants.CommonProps {
  publishStage: TPublishStage;
}
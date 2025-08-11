// This file is responsible for defining AWS infra specific dependencies. See: https://github.com/tsapporg/ts-npm/tree/aws-sample
const awsCdkVersion = '2.1019.2';

const npmPackage: any = {
  dependencies: {},
  devDependencies: {
    'aws-cdk-lib': '2.202.0',
    'aws-cdk': awsCdkVersion,
    '@servicevic-oss/cdk-cleanup-certificate-validation-records': '1.1.14',
    //'cdk-nag': '2.36.26', // This tool is annoying and mostly just complains about using AWS' own managed policies. Nope.
    'constructs': '10.1.196',
    'source-map-support': '0.5.21'
  }
}

export default { npmPackage }
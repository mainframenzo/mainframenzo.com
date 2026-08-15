// This file has been @deprecated, and this functionality  is no longer used.
// These dependencies remain so the AWS infra source builds,
//  and also in case you ever want to deploy to AWS again.
//
// This file is responsible for defining AWS infra specific dependencies. See: https://github.com/mainframenzo/ts-npm
const awsCdkVersion = '2.1019.2';

const npmPackage: any = {
  dependencies: {
    // You could not get these to actually work, so you imported the file into <meblog-src>/src/types/aws-cloudfront-function.d.ts .
    //'@types/aws-cloudfront-function': '1.0.5'
  },
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
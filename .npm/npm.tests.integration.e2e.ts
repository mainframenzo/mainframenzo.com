// This file is responsible for defining e2e integration test specific dependencies. See: https://github.com/tsapporg/ts-npm/tree/aws-sample
const npmPackage: any = {
  dependencies: {
    'puppeteer-core': '23.5.0', // Used for running headless browser testing.
    '@sparticuz/chromium': '132.0.0', // ^
    '@types/aws-lambda': '8.10.125' // Used to get AWS Lambda handler types.
  },
  devDependencies: {}
}

export default { npmPackage }
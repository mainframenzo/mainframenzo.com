// This file is responsible for defining auditing specific dependencies. See: https://github.com/tsapporg/ts-npm/tree/aws-sample
const npmPackage: any = {
  dependencies: {},
  devDependencies: {
    'license-checker-rseidelsohn': '4.3.0', // Used to ensure NPM licenses in dependencies are OK to use. 
    'repolinter': 'github:todogroup/repolinter#main', // Need main branch. See: https://github.com/todogroup/repolinter/issues/299
    'license-report': '6.5.0', // Used to generate a license report.
  }
}

export default { npmPackage }
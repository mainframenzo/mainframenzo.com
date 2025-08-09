// This file is responsible for defining the NPM package and the application's common dependencies b/t most packages,
//  which mostly amounts to lots of development-related packages. See: https://github.com/tsapporg/ts-npm/tree/aws-sample
const npmPackage: any = {
  name: 'meblog',
  version: '0.0.1',
  private: false,
  type: 'module',
  engines : { 
    node: '>=20.0.0 <=20.19.3'
  },
  license: 'MIT-0',
  dependencies: {
    // Logging:
    'ts-app-logger': 'github:tsapporg/ts-app-logger#d41dad54c5ad91ca91d22c5467343f194b8d7334',

    'dotenv': '16.4.5', // Used for bringing in data from the `<meblog-src>/config/.env` file.
  },
  devDependencies: {
    'typescript': '5.2.2',
    '@types/node': '20.10.0',
    'ts-node': '10.9.2', // Used for TypeScript execution. Had issues with execution, started to replace with tsx.
    'tsx': '4.19.1', // Used for TypeScript execution, starting to move to this if ts-node fails.
    'tslib': '2.4.0',

    'csv-parse': '5.6.0', // Used to turn BOMs into HTML.
  }
}

export default { npmPackage }
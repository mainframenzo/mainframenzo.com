// This file is responsible for defining the NPM package and the application's common dependencies b/t most packages,
//  which mostly amounts to lots of development-related packages. See: https://github.com/mainframenzo/ts-npm
const npmPackage: any = {
  name: 'meblog',
  version: '0.0.3',
  private: false,
  type: 'module',
  engines : {
    node: '>=24.0.0'
  },
  license: 'MIT-0',
  dependencies: {
    'dotenv': '16.4.5', // Used for bringing in data from the `<meblog-src>/config/.env` file.
  },
  devDependencies: {
    'typescript': '5.2.2',
    '@types/node': '24.12.4',
    //'ts-node': '10.9.2', // Used for TypeScript execution. Had issues with execution, started to replace with tsx.
    'tsx': '4.19.1', // Used for TypeScript execution, starting to move to this if ts-node fails.
    'tslib': '2.4.0',

    'csv-parse': '5.6.0', // Used to turn BOMs into HTML.
  }
}

export default { npmPackage }

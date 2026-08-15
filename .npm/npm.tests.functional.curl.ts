// This file is responsible for defining curl-based functional test specific dependencies. See: https://github.com/mainframenzo/ts-npm
const npmPackage: any = {
  dependencies: {
    'codedown': '3.1.0' // Used for "literate" functional tests which also serve as API usage documentation.
  },
  devDependencies: {}
}

export default { npmPackage }
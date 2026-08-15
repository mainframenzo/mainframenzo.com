// This file is responsible for defining your VSCode extension specific dependencies. See: https://github.com/mainframenzo/ts-npm
const npmPackage: any = {
  dependencies: {},
  devDependencies: {
    '@types/vscode': '1.110.0' // Used for VSCode extension that helps you validate Jekyll-like post definitions.
  }
}

export default { npmPackage }
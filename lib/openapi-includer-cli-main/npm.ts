const npmPackage: any = {
  name: 'openapi-includer-cli',
  version: '0.0.0',
  description: 'Add `$include` keyword support to OpenAPI to include other file content that `$ref` does not support.',
  repository: {
    type: 'git',
    url: 'https://github.com/mainframenzo/openapi-includer-cli'
  },
  private: false,
  license: 'MIT',
  type: 'module',
  dependencies: {
    'ts-command-line-args': '2.5.1',
    'yaml': '2.3.1',
    'flat': 'mainframenzo/forkof.flat#master',
    'ts-deepmerge': '6.2.0'
  },
  devDependencies: {
    '@types/node': '18.11.18',
    'ts-node': '10.9.1',
    'tslib': '2.4.0',
    'typescript': '5.2.2',

    'openapi-typescript': '6.2.8',
    '@openapi-ts/backend': '2.0.5'
  },
  scripts: {},
  bin: {
    'openapi-includer-cli': './openapi-includer-cli.sh'
  },
  files: [
    './src/',
    './dist/',
    './openapi-includer-cli.sh',
    './tsconfig.json',
    './config/'
  ]
}

export default { npmPackage }
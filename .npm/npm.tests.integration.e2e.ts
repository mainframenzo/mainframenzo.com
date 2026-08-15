// This file is responsible for defining e2e integration test specific dependencies. See: https://github.com/mainframenzo/ts-npm
const npmPackage: any = {
  dependencies: {
    'playwright': '1.58.2', // Used for running headless browser testing.
    '@playwright/test': '1.58.2', // ^
    //'@playwright/browser-chromium': '1.58.2', // ^
    //'@playwright/browser-firefox': '1.58.2', // ^
    //'playwright-firefox': '1.58.2', // ^
    '@types/aws-lambda': '8.10.125' // Used to get AWS Lambda handler types.
  },
  devDependencies: {}
}

export default { npmPackage }

// This file provides a work-around for a globalThis issue encountered in Node.js. See: https://stackoverflow.com/questions/77427684/typescript-globalthis-for-browser-and-node-js-element-implicitly-has-an-any-t .
//
// The values in the _globalThis object come from:
//  * <meblog-src>/config/.env
//  * makefile variables (which initially imports <meblog-src>/config/.env)
//  * environment variables (set by either user or makefile locally, or deployment env on AWS (Lambda))
//
// If you import this file like `import _globalThis from './@types/global-this';`,
//  you'll be able to use _globalThis instead of globalThis, and set the variables in that file
//  based on any logic you want.
// 
// The downside of the work-around is that the <meblog-src>/src/@types/index.d.ts file is somewhat duplicated if a backend is required;
//   ideally frontend/backend would share this. Luckily we do not have that problem - this is just a static website w/ no API.
// 
// FIXME Error: Dynamic require of "events" is not supported
import dotenv from 'dotenv'; 

if (!process.env.app_location || process.env.app_location === 'local' || (process.env.is_test === 'true')) {
  // process.env will have the key/values define in the `<meblog-src>/config/.env` file,
  //  but won't override anything set already (e.g. we set env vars when deployed).
  dotenv.config({ path: `${process.cwd()}/./config/.env`, override: false });
}

//console.debug('process.env', JSON.stringify(process.env, null, 2));

const stage = process.env.stage || 'local';
const publish_stage = process.env.publish_stage || 'dev';
const aws_account_id: string | undefined = process.env[`aws_${stage}_account_id`];
const aws_region: string | undefined = process.env[`aws_${stage}_region`];
const aws_cli_profile: string | undefined = process.env[`aws_${stage}_cli_profile`];

const _globalThis = {
  app_location: process.env.app_location || 'local',
  is_test: (process.env.is_test === 'true') || false,
  is_docker: (process.env.is_docker === 'true') || false,
  is_codebuild: (process.env.CODEBUILD_CI === 'true') || false,
  app_url: process.env.app_url || 'http://localhost:8080',
  headless: (process.env.headless === 'true'), // Used in tests.
  stage,
  publish_stage,
  aws_account_id,
  aws_region,
  aws_cli_profile
}

export default _globalThis;
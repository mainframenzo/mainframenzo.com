// This file provides a work-around for a globalThis issue encountered in Node.js. See: https://stackoverflow.com/questions/77427684/typescript-globalthis-for-browser-and-node-js-element-implicitly-has-an-any-t .
//
// The values in the _globalThis object come from:
//  * <meblog-src>/config/.env
//  * justfile variables (which initially imports <meblog-src>/config/.env)
//  * environment variables (set by either user or justfile locally, or hosted environment)
//
// If you import this file like `import _globalThis from './@types/global-this';`,
//  you'll be able to use _globalThis instead of globalThis, and set the variables in that file
//  based on any logic you want.
//
// The downside of the work-around is that the <meblog-src>/src/@types/index.d.ts file is somewhat duplicated when a backend is required;
//  ideally frontend/backend would share this.
//
// FIXME Error: Dynamic require of "events" is not supported when included on frontend, using globalThis there ;/
import dotenv from 'dotenv';

if (!process.env.app_location || process.env.app_location === 'local' || (process.env.is_test === 'true')) {
  // process.env will have the key/values defined in the `<meblog-src>/config/.env` file,
  //  but won't override anything set already (e.g. you set env vars when deployed).
  dotenv.config({ path: `${process.cwd()}/config/.env`, override: false });
}

//console.debug('process.env', JSON.stringify(process.env, null, 2));

// Can be passed in as env vars to program, but defaults to local + dev:
if (!process.env.app_stage) {
  process.env.app_stage = 'local';
  //throw new Error('Missing env var app_stage');
}
if (!process.env.publish_stage) {
  process.env.publish_stage = 'dev';
  //throw new Error('Missing env var publish_stage');
}
if (!process.env.app_location) {
  process.env.app_location = 'local';
  //throw new Error('Missing env var app_location');
}

// Loaded from .env, related to app and maybe publish stage:
if (!process.env[`${process.env.app_stage}_github_webhook_secret`]) {
  throw new Error('Missing env var <app_stage>_github_webhook_secret');
}
if (!process.env[`${process.env.app_stage}_jwt_secret`]) {
  throw new Error('Missing env var <app_stage>_jwt_secret');
}
if (!process.env[`${process.env.app_stage}_your_username`]) {
  throw new Error('Missing env var <app_stage>_your_username');
}
if (!process.env[`${process.env.app_stage}_your_password`]) {
  throw new Error('Missing env var <app_stage>_your_password');
}
if (!process.env[`${process.env.app_stage}_media_directory`]) {
  throw new Error('Missing env var <app_stage>_media_directory');
}

const _globalThis = {
  app_stage: process.env.app_stage || 'local',
  publish_stage: process.env.publish_stage || 'dev',
  app_location: process.env.app_location || 'local',
  github_webhook_secret: process.env[`${process.env.app_stage}_github_webhook_secret`]!,
  jwt_secret: process.env[`${process.env.app_stage}_jwt_secret`]!,
  your_username: process.env[`${process.env.app_stage}_your_username`]!,
  your_password: process.env[`${process.env.app_stage}_your_password`]!,
  media_directory: process.env.media_directory_path,
  app_url: process.env.app_url || 'http://localhost:8080',
  api_url: process.env.app_location === 'local' ? (process.env.is_docker === 'true' ? 'https://localhost:443' : 'http://localhost:8081') : (process.env.publish_stage === 'dev' ? 'https://dev.mainframenzo.com' : 'https://mainframenzo.com'),
  headless: (process.env.headless === 'true'), // Used in tests.
  is_docker: (process.env.is_docker === 'true') || false, // Used mostly to determine monitoring behavior in Docker vs on host OS locally.
  //is_test: (process.env.is_test === 'true') || false, @deprecated, legacy AWS deployments.
  //is_codebuild: (process.env.CODEBUILD_CI === 'true') || false, @deprecated, legacy AWS deployments.
}

export default _globalThis;

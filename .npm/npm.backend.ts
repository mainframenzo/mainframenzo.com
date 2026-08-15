// This file is responsible for defining backend specific dependencies. See: https://github.com/mainframenzo/ts-npm
const npmPackage: any = {
  dependencies: {
    'uuid': '13.0.0',
    'dotenv': '17.2.3',
    'ts-command-line-args': '2.5.1',
    'mime': '4.1.0',
    'express': '5.2.1', // Used as backend server.
    'jsonwebtoken': '9.0.3', // Used for backend auth.
    '@types/jsonwebtoken': '9.0.10', // ^
    'openapi-backend': '5.15.0', // Used to map OpenAPI operations to functions.
    '@nerdware/ts-string-helpers': '1.9.2', // Used to sanitize user input.
    'morgan': '1.10.1', // Used for express backend logging.
    'nodemon': '3.1.14', // Used to monitor and restart backend.
    'simple-in-memory-queue': '1.1.7', // Used to queue lots of push changes from Github.
    'ejs': '3.1.10', // Used to convert EJS template to HTML for server-side rendering of monitoring page.
    'cors': '2.8.6', // Used to allow cross-origin HTTP requests.
    '@types/cors': '2.8.19', // ^
    'ajv': '8.18.0', // Used for runtime schema validation.
    'js-yaml': '4.1.1', // ^
    '@types/js-yaml': '4.0.9',

    // Metrics:
    '@logdna/tail-file': '4.0.2', // Used to tail log files for gathering metrics.
    'split2': '4.2.0', // Used to parse log entries from tailed log stream.
    '@types/split2': '4.2.3', // ^
    '@robojones/nginx-log-parser': '0.0.6', // Used to parse nginx logs.
    'ua-parser-js': '2.0.9', // Used to classify user agents for metrics.
    '@duckdb/node-api': '1.5.1-r.1', // Used to store metrics.

    // Monitoring:
    'ai': '6.0.168', // Used for analyzing metrics.
    'openai': '6.34.0', // ^
    '@ai-sdk-tool/parser': '4.1.21', // ^
    '@ai-sdk/mcp': '1.0.44', // ^
    '@ai-sdk/openai-compatible': '2.0.42', // ^
    'zod': '4.3.6', // ^
    '@modelcontextprotocol/sdk': '1.29.0', // ^
    '@opentelemetry/sdk-node': '0.218.0', // ^
    '@opentelemetry/sdk-trace-base': '2.7.1', // ^
    '@opentelemetry/sdk-trace-node': '2.7.1', // ^

    //'@playwright/mcp': '0.0.70', // Used to give an LLM access to a browser.
  },
  devDependencies: {
    'source-map-support': '0.5.21',
    '@types/express': '5.0.6',
    '@types/uuid': '9.0.7',
    'dotenv-to-json': '0.1.0',
    '@types/morgan': '1.9.10',
    'openapi-typescript': '7.10.1', // Used to generate types from OpenAPI spec.
    'openapi-generator-plus': '2.20.2', // ^
    '@openapi-generator-plus/plain-documentation-generator': '1.10.4', // ^
    'openapi-typescript-fetch': '2.2.1', // Used to generate a client SDK to interact with backend for frontend.
    '@iptv/playlist': '1.2.1' // Used to generate m3u-formatted playlists during build time (at runtime you inject credentials).
  }
}

export default { npmPackage }

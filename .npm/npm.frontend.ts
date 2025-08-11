// This file is responsible for defining frontend specific dependencies. See: https://github.com/tsapporg/ts-npm/tree/aws-sample
const npmPackage: any = {
  dependencies: {
    'normalize.css': '8.0.1', // Used for CSS resets.
    'milligram': '1.4.1', // Used for some layout styles.
    'ts-bus': '2.3.1', // Used for eventing.
    '@google/model-viewer': '4.0.0' // Used for 3D slideshows.
  },
  devDependencies: {
    // Used for mapping Node.js libs to frontend:
    'stream-browserify': '3.0.0',
    'crypto-browserify': '3.12.0',
    'os-browserify': '0.3.0',
    'path-browserify': '1.0.1',

    'showdown': '2.1.0', // Used to convert Markdown-based posts to HTML.
    '@types/showdown': '2.0.6', // ^

    'ejs': '3.1.10', // Used to convert EJS templates to HTML.
    'yaml': '2.7.0', // Used to load build slideshows from YAML files.

    'globby': '14.0.2', // Used to cleanup private files before publishing this source.

    'dotenv-to-json': '0.1.0', // Used to convert our <meblog-src>/config/.env file to JSON for injection in website HTML template.

    'clean-css-cli': '5.6.1', // Used to bundle styles.
    'esbuild': '0.19.2', // Used to bundle scripts and their dependencies.

    // Used to generate .pdf of resume for download:
    'puppeteer-core': '23.5.0', // Used for running headless browser. Same as for integration tests.
    '@sparticuz/chromium': '132.0.0', // ^
    'docx': '9.5.1', // Used to generate .docx of .pdf resume for download.
    '@shortercode/webzip': '1.1.1-0', // Used to generate .zip files of (blog) posts.
    
    'local-web-server': '5.4.0' // Used to serve website locally for development.
  }
}

export default { npmPackage }
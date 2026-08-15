// This file is responsible for defining frontend specific dependencies. See: https://github.com/mainframenzo/ts-npm
const npmPackage: any = {
  dependencies: {
    'normalize.css': '8.0.1', // Used for CSS resets.
    //'milligram': '1.4.1', // Used for some layout styles.
    'localstorage-slim': '2.7.1', // Used for local storage of state.
    'ts-bus': '2.3.1', // Used for eventing.
    '@google/model-viewer': '4.0.0', // Used for 3D slideshows.
    'gridjs': '6.2.0', // Used to upgrade BOM tables from standard HTML tables.
    'audioq': '2.0.0', // Used to upgrade playlists.
    '@webcomponents/webcomponentsjs': '2.8.0', // Used to polyfill web components.
    'chart.js': '4.5.1', // Used for charts on ops dashboard.
    //'@aarongustafson/table-sortable': '2.0.3' // Used for tables on ops dashboard.
    'simple-datatables': '10.3.0', // Replacing active-table wherever js-enabled data tables are needed.
    'active-table': '1.1.8', // Used for betta tables (ops dashboard, and #playlists analyses data).
    'wavesurfer.js': '7.12.11', // Used for rendering #playlists analyses results (essentia).
    'vis-timeline': '8.5.2', // Used for rendering song DAW layout and your automobile timeline.
    'vis-data': '8.0.4', // ^
    '@mozilla/readability': '0.6.0' // Used for reader mode.
  },
  devDependencies: {
    // Used for mapping Node.js libs to frontend:
    // 'stream-browserify': '3.0.0', @deprecated
    // 'crypto-browserify': '3.12.0', @deprecated
    // 'os-browserify': '0.3.0', @deprecated
    // 'path-browserify': '1.0.1', @deprecated

    'showdown': '2.1.0', // Used to convert Markdown-based posts to HTML.
    '@types/showdown': '2.0.6', // ^

    'ejs': '3.1.10', // Used to convert EJS templates to HTML.
    'yaml': '2.8.3', // Used to load build slideshows from YAML files.
    'sharp': '0.35.3', // Used to generate image srcsets.

    'globby': '16.2.0', // Used to cleanup private files before publishing this source, among other things.

    'dotenv-to-json': '0.1.0', // Used to convert our <meblog-src>/config/.env file to JSON for injection in website HTML template.

    //'clean-css-cli': '5.6.1', // Used to bundle styles. @deprecated
    //'esbuild': '0.28.0', // Used to bundle scripts and their dependencies. @deprecated

    'fast-csv': '5.0.5', // Used to parse playlist csvs.
    '@genway-ai/youtube-link-utils': '1.2.0', // Used to validate youtube playlist URLs (I use LLMs more like "better search", and I used one to help furnish the data for collated playlists, some of which is out of date).
    'youtube-search-api': '2.0.1', // Used to search for playlist URLs for the youtube option.
    'spawn-please': '3.0.0', // Used to run "youtube downloader" to download media for streaming playlist songs from your website.

    // Used to generate .pdf of resume for download:
    'playwright': '1.58.2', // Used for running headless browser. Same as for integration tests.
    '@playwright/test': '1.58.2', // ^
    //'@playwright/browser-chromium': '1.58.2', // ^
    //'@playwright/browser-firefox': '1.58.2', // ^
    'playwright-firefox': '1.58.2', // ^

    'docx': '9.5.1', // Used to generate .docx of .pdf resume for download.
    //'@shortercode/webzip': '1.1.1-0', // Used to generate .zip files of (blog) posts.

    // FIXME You removed compress-images and moved to imgsrcsets. Validate no longer needed.
    //'imagemin': '9.0.1', // Used to compress images once the website is built.
    //'@types/imagemin': '9.0.1', // ^
    //'imagemin-jpegtran': '8.0.0', // ^
    //'@types/imagemin-jpegtran': '5.0.4', // ^
    //'imagemin-pngquant': '10.0.0', // ^

    'fluidcad': '0.0.34', // FIXME My fork is being vetted for latest iteration of parts libraries.

    //'local-web-server': '5.4.0' // Used to serve website locally for development. @deprecated
  }
}

export default { npmPackage }

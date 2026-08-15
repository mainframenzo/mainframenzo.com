# This file has been @deprecated - vite is finally good enough to move to.
# This file has been kept around in case someone decides _another_ build tool is needed and there's a gap between decent tooling;
#  the small utils in this "frontend build system" work well enough (but not as good as) something like vite.
# Remember to put back livereload in the ejs templates!
#
# This file is responsible for defining website dev tasks.
import "../.justfiles/common.just"

# This is the lowest supported ES6 target.
supported_esbuild_browser_targets := "chrome60,firefox60,safari11,edge18"

[arg("skip-global-nodejs-installs", long="skip-global-nodejs-installs", value="true")]
setup skip-global-nodejs-installs="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  rm -rf node_modules

  if [[ "{{skip-global-nodejs-installs}}" == "false" ]]; then
    npm uninstall -g ts-npm

    # Use lib dir instead.
    #npm install -g "github:mainframenzo/ts-npm" --loglevel verbose
    npm install -g {{source_dir}}/lib/ts-npm-main
  fi

  # This generates package.json from our ./.npm/npm*.ts files.
  NODE_ENV={{node_env}} ts-npm --action=install --absolute-path-to-dependencies={{source_dir}}/.npm

# This is your "build system".
# You can not find a decent development server that doesn't require "all in" to its tooling, e.g. vite, et. al.
# You are open to something else that lets you use the bare minimum "esbuild"; in the meantime,
#  small tools comprise local the development workflow, and outside of security updates and small tweaks,
#  these haven't failed and you don't have to worry about one project dying and migrating to another (well, outside of esbuild).
[arg("skip-build-parts-libraries", long="skip-build-parts-libraries", value="true")]
[arg("skip-build-one-offs", long="skip-build-one-offs", value="true")]
[arg("no-webserver", long="no-webserver", value="true")]
develop-website skip-build-parts-libraries="false" skip-build-one-offs="false" no-webserver="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  just -f ./.justfiles/frontend.legacy.just --working-directory . build-website {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}} \
    --skip-build-parts-libraries --skip-build-one-offs

  if [[ "{{no-webserver}}" == "true" ]]; then
    npx concurrently --kill-others \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-styles" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-scripts" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-bundle-website" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-html" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-public" \
      "npx livereload --debug --wait 1000 {{frontend_dist_dir}}/" \
      --success "!command-{name}"/"!command-{index}"
  else
    npx concurrently --kill-others \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-styles" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-scripts" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-bundle-website" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-html" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . develop-watch-public" \
      "npx livereload --debug --wait 1000 {{frontend_dist_dir}}/" \
      "just -f ./.justfiles/frontend.legacy.just --working-directory . serve" \
      --success "!command-{name}"/"!command-{index}"
  fi

develop-watch-styles:
  npx onchange -v -k "src/frontend/styles/**/*.css" -- just -f ./.justfiles/frontend.legacy.just --working-directory . build-styles {{node_env}}
develop-watch-scripts:
  just -f ./.justfiles/frontend.legacy.just --working-directory . compile-scripts {{node_env}} --watch
develop-watch-bundle-website:
  just -f ./.justfiles/frontend.legacy.just --working-directory . bundle-scripts-website {{node_env}} --watch
develop-watch-html:
  npx onchange -v -k \
    "src/frontend/**/*.ejs" \
    "src/frontend/**/*.md" \
    "src/frontend/**/*.csv" \
    "src/frontend/**/*.yaml" \
    -- just -f ./.justfiles/frontend.legacy.just --working-directory . build-html {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}}
develop-watch-public:
  npx onchange -v -k "src/frontend/public/**/*" -- just -f ./.justfiles/frontend.legacy.just --working-directory . build-public

serve:
  npx ws --port 8080 --directory {{frontend_dist_dir}} --cors.origin "*" --cors.allow-methods "*" --open

[arg("skip-build-parts-libraries", long="skip-build-parts-libraries", value="true")]
[arg("skip-build-one-offs", long="skip-build-one-offs", value="true")]
[arg("skip-render-images-of-parts", long="skip-render-images-of-parts", value="--skip-render-images-of-parts")]
[arg("fast-render", long="fast-render", value="--fast-render")]
[arg("watch", long="watch", value="--watch")]
build-website node_env app_stage publish_stage app_location watch="" skip-build-parts-libraries="false" skip-build-one-offs="false" skip-render-images-of-parts="" fast-render="":
  #!/usr/bin/env bash
  set -euxo pipefail

  just -f ./.justfiles/frontend.legacy.just --working-directory . clean-website

  if [[ "{{skip-build-parts-libraries}}" == "false" ]]; then
    just -f ./.justfiles/parts-libraries.just --working-directory . build {{skip-render-images-of-parts}} {{fast-render}}
  fi

  if [[ "{{skip-build-one-offs}}" == "false" ]]; then
    just -f ./.justfiles/one-offs.posts.pcsn2.digital-twin.just --working-directory . build
  fi

  just -f ./.justfiles/frontend.legacy.just --working-directory . build-styles {{node_env}}
  just -f ./.justfiles/frontend.legacy.just --working-directory . build-scripts {{node_env}} {{watch}}
  just -f ./.justfiles/frontend.legacy.just --working-directory . build-dependencies-styles {{node_env}}
  just -f ./.justfiles/frontend.legacy.just --working-directory . build-html {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}}
  just -f ./.justfiles/frontend.legacy.just --working-directory . build-public

clean-website:
  rm -rf {{frontend_dist_dir}}; mkdir -p {{frontend_dist_dir}}; mkdir -p {{frontend_dist_dir}}/posts

build-styles node_env:
  npx esbuild ./src/frontend/styles/index.css \
    --external:*.woff \
    --external:*.woff2 \
    --external:*.eot \
    --external:*.ttf \
    --external:*.svg \
    --external:*#iefix \
    --external:*.png \
    --external:*#Roboto \
    --bundle --outfile={{frontend_dist_dir}}/bundle.css;

[arg("watch", long="watch", value="--watch")]
build-scripts node_env watch="":
  cp ./src/frontend/scripts/vendor/* ./{{frontend_dist_dir}}/
  just -f ./.justfiles/frontend.legacy.just --working-directory . compile-scripts {{node_env}} {{watch}}
  just -f ./.justfiles/frontend.legacy.just --working-directory . bundle-scripts-website {{node_env}} {{watch}}

[arg("watch", long="watch", value="--watch ")]
compile-scripts node_env watch="":
  NODE_ENV={{node_env}} npx tsc {{watch}}--project ./config/tsconfig.frontend.json

[arg("watch", long="watch", value="--watch ")]
bundle-scripts-website node_env watch="":
  npx esbuild ./{{frontend_dist_dir}}/frontend/scripts/index.js {{watch}}--bundle \
    --sourcemap \
    --define:global=window \
    --loader:.ttf=file \
    --target={{supported_esbuild_browser_targets}} \
    --outfile=./{{frontend_dist_dir}}/bundle.website.js

build-dependencies-styles node_env:
  npx clean-css-cli --output {{frontend_dist_dir}}/deps.css \
    ./node_modules/normalize.css/normalize.css \
    ./node_modules/milligram/dist/milligram.css

build-html node_env app_stage publish_stage app_location:
  NODE_ENV={{node_env}} node \
    --experimental-specifier-resolution=node \
    --experimental-modules \
    --no-warnings \
    --trace-uncaught \
    --enable-source-maps \
    --import tsx/esm \
    ./build-utils/scripts/build-html.ts \
    --app-stage="{{app_stage}}" \
    --publish-stage="{{publish_stage}}" \
    --app-location="{{app_location}}"

build-public:
  rsync -av --progress ./src/frontend/public/ ./{{frontend_dist_dir}}/

# Generating files in specific non-web formats so they are available for download.
# This is manually run. Update as necessary before deploying. Run `make develop/website` first.
generate-downloads:
  NODE_ENV={{node_env}} node \
    --experimental-specifier-resolution=node \
    --experimental-modules \
    --no-warnings \
    --trace-uncaught \
    --enable-source-maps \
    --import tsx/esm \
    ./build-utils/scripts/generate-downloads.ts

build-audio post_dir:
  #!/usr/bin/env bash
  set -euxo pipefail

  echo "building audio {{post_dir}}"
  rm -f "{{post_dir}}/audio.ogg"
  ogg_files=$(find "{{post_dir}}" -type f -name "*.ogg" ! -name "audio.ogg" -print0 | sort -z | xargs -0)
  echo "ogg_files: $ogg_files"
  ./build-utils/scripts/build-audio.sh "{{post_dir}}" "$ogg_files"

# Used when running local development in Docker to sync the dist.frontend dir to nginx's /var/www/html dir.
sync-dist from_dir to_dir:
  #!/usr/bin/env bash
  set -euxo pipefail

  while true; do
    # Use the inotifywait command to monitor for file changes in the local directory.
    inotifywait -r -e modify,create,delete,move {{from_dir}}

    # FIXME Could be worse, could be better.
    sleep 4

    # Need to handle cases where files changed during rsync, hence the code 24 logic.
    rsync -av --progress {{from_dir}}/ {{to_dir}}/ || [ $? -eq 24 ]
  done

[arg("headed", long="headed", value="--headed")]
[arg("ui", long="ui", value="--ui")]
tests-integration-e2e node_env app_stage publish_stage app_location headed="" ui="":
  npx playwright test --config={{source_dir}}/config/playwright.config.ts --project={{app_stage}}-{{publish_stage}} {{headed}} {{ui}}

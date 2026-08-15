# This file is responsible for defining website dev tasks.
import "../.justfiles/common.just"

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

[arg("skip-build-parts-libraries", long="skip-build-parts-libraries", value="true")]
[arg("skip-build-one-offs", long="skip-build-one-offs", value="true")]
[arg("no-webserver", long="no-webserver", value="true")]
develop-website skip-build-parts-libraries="false" skip-build-one-offs="false" no-webserver="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  npx tsc --noEmit

  just -f ./.justfiles/frontend.just --working-directory . build-website {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}} \
    --skip-build-parts-libraries --skip-build-one-offs

  if [[ "{{no-webserver}}" == "true" ]]; then
    npx concurrently --kill-others \
      "just -f ./.justfiles/frontend.just --working-directory . develop-watch-html" \
      "npx vite --host --config ./config/vite.config.dev.ts"
      --success "!command-{name}"/"!command-{index}"
  else
    npx concurrently --kill-others \
      "just -f ./.justfiles/backend.just --working-directory . run {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}}" \
      "just -f ./.justfiles/frontend.just --working-directory . develop-watch-html" \
      "npx vite --host --config ./config/vite.config.dev.ts"
      --success "!command-{name}"/"!command-{index}"
  fi

[arg("skip-build-parts-libraries", long="skip-build-parts-libraries", value="true")]
[arg("skip-build-one-offs", long="skip-build-one-offs", value="true")]
[arg("skip-render-images-of-parts", long="skip-render-images-of-parts", value="--skip-render-images-of-parts")]
[arg("fast-render", long="fast-render", value="--fast-render")]
build-website node_env app_stage publish_stage app_location watch="" skip-build-parts-libraries="false" skip-build-one-offs="false" skip-render-images-of-parts="" fast-render="":
  #!/usr/bin/env bash
  set -euxo pipefail

  just -f ./.justfiles/frontend.just --working-directory . clean-website

  if [[ "{{skip-build-parts-libraries}}" == "false" ]]; then
    just -f ./.justfiles/parts-libraries.just --working-directory . build
  fi

  # No need to build this yet - WIP.
  # if [[ "{{skip-build-one-offs}}" == "false" ]]; then
  #   just -f ./.justfiles/one-offs.posts.pcsn2.digital-twin.just --working-directory . build
  # fi

  # Compile EJS to HTML.
  just -f ./.justfiles/frontend.just --working-directory . \
    build-html {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}}

  # Overwrite the HTML in the dist.frontend dir.
  npx vite build --config ./config/vite.config.dev.ts

clean-website:
  rm -rf {{frontend_dist_dir}}
  mkdir -p {{frontend_dist_dir}}
  mkdir -p {{frontend_dist_dir}}/posts

develop-watch-html:
  npx onchange -v -e '**/.pixi/*' -k \
    "src/frontend/**/*.ejs" \
    "src/frontend/**/*.md" \
    "src/frontend/**/*.csv" \
    "src/frontend/**/*.yaml" \
    -- just -f ./.justfiles/frontend.just --working-directory . build-html {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}}

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

# Generate files in specific non-web formats so they are available for download.
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

# Vite simplified development but complicated releases.
# Building the website creates a dist.frontend dir with files optimized for local development.
# You need to take that one step further and optimize those files for production.
# Vite sucks at this because it seems to really want a SPA, which meblog is not.
# So the work to be done here amounts to:
# * Bundle scripts and styles for production
# * Sed replace local development .ts/.js/.css paths with production ones in HTML files
# * Oh and do this all with the scrubbed (non-private i.e. public) source
# FIXME vite-plugin-manifest-sri etc. - you had something like this previously
[arg("skip-build-parts-libraries", long="skip-build-parts-libraries", value="--skip-build-parts-libraries")]
[arg("skip-build-one-offs", long="skip-build-one-offs", value="--skip-build-one-offs")]
[arg("skip-render-images-of-parts", long="skip-render-images-of-parts", value="--skip-render-images-of-parts")]
[arg("fast-render", long="fast-render", value="--fast-render")]
build-website-release node_env="production" app_stage="main" publish_stage="prod" app_location="hosted" skip-build-parts-libraries="" skip-build-one-offs="" skip-render-images-of-parts="" fast-render="":
  #!/usr/bin/env bash
  set -euxo pipefail

  # Create a copy of this source code and scrub for public viewing before building the release.
  cwd={{source_dir}}
  tmp_dir=$(mktemp -d -t)
  cd ${tmp_dir}
  mkdir -p mainframenzo.com
  cd ${tmp_dir}/mainframenzo.com;

  rsync -av --progress ${cwd}/ ${tmp_dir}/mainframenzo.com/ \
    --exclude .git \
    --exclude .pixi \
    --exclude node_modules \
    --exclude dist.*

  just -f ./.justfiles/dev.just --working-directory . setup

  npx node \
    --trace-uncaught \
    --enable-source-maps \
    --experimental-specifier-resolution=node --experimental-modules --no-warnings \
    --import tsx/esm ./build-utils/scripts/private-to-public.ts

  just -f ./.justfiles/frontend.just --working-directory . build-website {{node_env}} {{app_stage}} {{publish_stage}} {{app_location}} {{skip-build-parts-libraries}} {{skip-build-one-offs}} {{skip-render-images-of-parts}} {{fast-render}}

  dist_dir="${tmp_dir}/mainframenzo.com/dist.frontend"
  release_dir="${tmp_dir}/mainframenzo.com/dist.frontend.release"

  npx vite build --config ./config/vite.config.release.ts

  manifest_path="${release_dir}/.vite/manifest.json"

  # Pull the hashed JS entry and its associated CSS from the manifest.
  # You need to use the cache-busting filenames vite generates for the sed subs.
  js_file=$(node -e "
    const fs = require('fs');
    const manifest = JSON.parse(fs.readFileSync('${manifest_path}', 'utf-8'));
    console.log(manifest['src/frontend/scripts/index.ts'].file);
  ")
  css_file=$(node -e "
    const fs = require('fs');
    const manifest = JSON.parse(fs.readFileSync('${manifest_path}', 'utf-8'));
    console.log(manifest['src/frontend/styles/index.css'].file);
  ")

  echo "resolved js: ${js_file}"
  echo "resolved css: ${css_file}"

  find "${dist_dir}" -type f | while IFS= read -r src_path; do
    dist_path="${src_path#"${dist_dir}"/}"
    release_path="${release_dir}/${dist_path}"

    if [[ -f "${release_path}" ]]; then
      continue
    fi

    mkdir -p "$(dirname "${release_path}")"

    if [[ "${src_path}" == *.html ]]; then
      sed -E \
        -e "s#<script type=['\"]module['\"] src=['\"]\.\./src/frontend/scripts/index\.ts['\"]></script>#<script type=\"module\" src=\"/${js_file}\"></script>#g" \
        -e "s#<link rel=['\"]stylesheet['\"] href=['\"]\.\./src/frontend/styles/index\.css['\"]/?>#<link rel=\"stylesheet\" href=\"/${css_file}\">#g" \
        -e "s#src=['\"]\.\./src/frontend/scripts/vendor/css-browser-selector\.js['\"]#src=\"/scripts/vendor/css-browser-selector.js\"#g" \
        "${src_path}" > "${release_path}"
    else
      cp "${src_path}" "${release_path}"
    fi
  done

  rm -rf "${release_dir}/.vite"

  actual_release_dir="${cwd}/dist.frontend.release"
  rm -rf ${actual_release_dir}

  mv "${release_dir}" "${actual_release_dir}"
  rm -rf ${tmp_dir}

  echo "release build complete: moved ${release_dir} to ${actual_release_dir}"

preview-website-release:
  npx concurrently --kill-others \
    "just -f ./.justfiles/backend.just --working-directory . run production local prod local" \
    "npx vite preview --host --config ./config/vite.config.preview.ts" \
    --success "!command-{name}"/"!command-{index}"

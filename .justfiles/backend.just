# This file is responsible for defining API dev tasks.
import "../.justfiles/common.just"

[arg("skip-global-nodejs-installs", long="skip-global-nodejs-installs", value="true")]
[arg("skip-download-llm", long="skip-download-llm", value="true")]
setup skip-global-nodejs-installs="false" skip-download-llm="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  # If you are not in container and the LLM model does not exist, download the LLM model.
  if [[ "{{is_docker}}" == "false" && "{{skip-download-llm}}" == "false" && ! -f "{{source_dir}}/src/backend/Qwen3.5-9B-Q5_K_S.llamafile" ]]; then
    wget -P {{source_dir}}/src/backend https://huggingface.co/mozilla-ai/llamafile_0.10.0/resolve/main/Qwen3.5-9B-Q5_K_S.llamafile
    chmod +x {{source_dir}}/src/backend/*.llamafile
  fi

  # If you are in a container, the model was already downloaded during container image build - copy over.
  if [[ "{{is_docker}}" == "true" && "{{skip-download-llm}}" == "false" && ! -f "{{source_dir}}/src/backend/Qwen3.5-9B-Q5_K_S.llamafile" ]]; then
    cp /opt/Qwen3.5-9B-Q5_K_S.llamafile {{source_dir}}/src/backend/Qwen3.5-9B-Q5_K_S.llamafile
  fi

  rm -rf node_modules

  if [[ "{{skip-global-nodejs-installs}}" == "false" ]]; then
    npm uninstall -g ts-npm
    npm uninstall -g openapi-includer-cli

    # Use lib dir instead.
    #npm install -g "github:mainframenzo/ts-npm" --loglevel verbose
    npm install -g {{source_dir}}/lib/ts-npm-main

    # Use lib dir instead.
    # Used to assemble OpenAPI files - using $includes keyword - into one OpenAPI spec. Requires global install ATM.
    #npm install -g "github:mainframenzo/openapi-includer-cli" --loglevel verbose
    npm install -g {{source_dir}}/lib/openapi-includer-cli-main
  fi

  # playwright breaks npm install - this fixes that.
  if [[ "${app_location}" == "hosted" ]]; then
    rm -rf /root/.cache/ms-playwright/__dirlock
  fi

  # This generates package.json from our ./.npm/npm*.ts files.
  NODE_ENV={{node_env}} ts-npm --action=install --absolute-path-to-dependencies="{{source_dir}}/.npm"

build:
  just -f ./.justfiles/backend.just --working-directory . build-openapi-def

build-openapi-def:
  #!/usr/bin/env bash
  set -euxo pipefail

  just -f ./.justfiles/backend.just --working-directory . _clean-openapi-def

  # Assemble OpenAPI YAML definition files into one api.yaml file. Currently need to pass absolute YAML path.
  openapi-includer-cli \
    --absolute-input-openapi-def-path="{{source_dir}}/src/openapi-def/api.yaml" \
    --absolute-output-openapi-def-path="{{source_dir}}/src/openapi-def/_api.yaml"

  # Generate TypeScript interfaces from spec.
  npx openapi-typescript {{source_dir}}/src/openapi-def/_api.yaml --output {{source_dir}}/src/openapi-def/types/index.d.ts

_clean-openapi-def:
  rm -f {{source_dir}}/src/openapi-def/_api.yaml
  rm -f {{source_dir}}/src/openapi-def/types/*.ts

[arg("watch", long="watch", value="watch ")]
run node_env app_stage publish_stage app_location watch="":
  #!/usr/bin/env bash
  set -euxo pipefail

  export app_stage_github_webhook_secret="{{app_stage}}_github_webhook_secret"
  export github_webhook_secret=`echo "${!app_stage_github_webhook_secret}"`

  NODE_ENV={{node_env}} app_stage={{app_stage}} publish_stage={{publish_stage}} app_location={{app_location}} github_webhook_secret="${github_webhook_secret}" \
    npx tsx {{watch}}./src/backend/index.ts

  # NODE_ENV={{node_env}} app_stage={{app_stage}} publish_stage={{publish_stage}} app_location={{app_location}} github_webhook_secret="${github_webhook_secret}" node \
  #   --experimental-specifier-resolution=node \
  #   --experimental-modules \
  #   --no-warnings \
  #   --trace-uncaught \
  #   --enable-source-maps \
  #   --import tsx/esm \
  # 	./src/backend/index.ts

start node_env="production" app_stage="main" publish_stage="prod" app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  export app_stage_github_webhook_secret="{{app_stage}}_github_webhook_secret"
  export github_webhook_secret=`echo "${!app_stage_github_webhook_secret}"`

  npx nodemon --delay 5 --exec "NODE_ENV={{node_env}} app_stage={{app_stage}} publish_stage={{publish_stage}} app_location={{app_location}} github_webhook_secret=${github_webhook_secret} node --experimental-specifier-resolution=node --experimental-modules --no-warnings --trace-uncaught --enable-source-maps --import tsx/esm" ./src/backend/index.ts >> /var/log/meblog-backend.log 2>&1 &

tests-unit test="":
  #!/usr/bin/env bash
  set -euxo pipefail

  if [ ! -z "{{test}}" ]; then
    echo "only running test {{test}}"

    NODE_ENV={{node_env}} app_stage="local" publish_stage="dev" app_location="local" node \
      --experimental-specifier-resolution=node \
      --experimental-modules \
      --no-warnings \
      --trace-uncaught \
      --enable-source-maps \
      --import tsx/esm \
      --test-reporter=spec \
      ./src/tests.unit/{{test}}

    exit 0
  fi

  echo "running all tests"

  # FIXME

# These tests only run with these settings: app_stage="local" publish_stage="dev" app_location="local"
tests-functional-curl test="":
  #!/usr/bin/env bash
  set -euxo pipefail

  function run_test() {
    cat {{source_dir}}/src/tests.functional.curl/${1} | npx codedown bash > {{source_dir}}/src/tests.functional.curl/generated/test.sh

    cat {{source_dir}}/src/tests.functional.curl/test-init.sh <(echo) {{source_dir}}/src/tests.functional.curl/generated/test.sh > {{source_dir}}/src/tests.functional.curl/generated/setup-plus-test.sh
    mv {{source_dir}}/src/tests.functional.curl/generated/setup-plus-test.sh {{source_dir}}/src/tests.functional.curl/generated/test.sh && chmod a+x {{source_dir}}/src/tests.functional.curl/generated/test.sh

    {{source_dir}}/src/tests.functional.curl/generated/test.sh

    if [ -z "{{test}}" ]; then
      sleep 1
    fi
  }

  if [ ! -z "{{test}}" ]; then
    echo "only running test {{test}}"

    if [[ "{{test}}" != "auth.md" ]]; then
      # Auth needed for many tests.
      just -f ./.justfiles/backend.just --working-directory . _test-functional-curl "auth.md"
    fi

    just -f ./.justfiles/backend.just --working-directory . _test-functional-curl "{{test}}"

    exit 0
  fi

  echo "running all tests"

  # FIXME find loop
  just -f ./.justfiles/backend.just --working-directory . _test-functional-curl "auth.md"
  #just -f ./.justfiles/backend.just --working-directory . _test-functional-curl "cicd.md"
  #just -f ./.justfiles/backend.just --working-directory . _test-functional-curl "media.md"
  just -f ./.justfiles/backend.just --working-directory . _test-functional-curl "ops.md"

_test-functional-curl test_name:
  cat {{source_dir}}/src/tests.functional.curl/{{test_name}} | npx codedown bash > {{source_dir}}/src/tests.functional.curl/generated/test.sh

  cat {{source_dir}}/src/tests.functional.curl/test-init.sh <(echo) {{source_dir}}/src/tests.functional.curl/generated/test.sh > {{source_dir}}/src/tests.functional.curl/generated/setup-plus-test.sh
  mv {{source_dir}}/src/tests.functional.curl/generated/setup-plus-test.sh {{source_dir}}/src/tests.functional.curl/generated/test.sh && chmod a+x {{source_dir}}/src/tests.functional.curl/generated/test.sh

  {{source_dir}}/src/tests.functional.curl/generated/test.sh

  sleep 1

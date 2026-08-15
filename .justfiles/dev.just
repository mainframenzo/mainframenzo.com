# This file is responsible for defining developer tasks.
import "../.justfiles/common.just"

[arg("skip-python-deps", long="skip-python-deps", value="true")]
[arg("skip-nodejs-deps", long="skip-nodejs-deps", value="true")]
[arg("skip-global-nodejs-installs", long="skip-global-nodejs-installs", value="--skip-global-nodejs-installs")]
[arg("skip-download-llm", long="skip-download-llm", value="--skip-download-llm")]
setup skip-python-deps="false" skip-nodejs-deps="false" skip-global-nodejs-installs="" skip-download-llm="":
  #!/usr/bin/env bash
  set -euxo pipefail

  if [[ "{{skip-python-deps}}" == "false" ]]; then
    pixi install --all
  fi

  if [[ "{{skip-nodejs-deps}}" == "false" ]]; then
    export node_modules_owner=$(stat -c '%U' $(pwd)/node_modules)

    if [[ "${node_modules_owner}" == "root" ]]; then # You ran this in Docker but now are back on our host OS, there is now a permissions issue, just blow away the deps.
      sudo rm -rf node_modules
    fi

    if [[ "{{skip-global-nodejs-installs}}" == "false" ]]; then
      npm install -g @vscode/vsce
    fi

    # The frontend and backend are both Node.js-based and use a monorepo setup for dependencies,
    #  which means you can - in theory - call either setup task.
    # In reality the backend has some additional OpenAPI dependencies to install,
    #  so you use that one.
    #just -f ./.justfiles/frontend.just --working-directory . setup {{skip-global-nodejs-installs}}
    just -f ./.justfiles/backend.just --working-directory . setup {{skip-global-nodejs-installs}} {{skip-download-llm}}

    just -f ./.justfiles/backend.just --working-directory . build
  fi

install-vscode-extension:
  cd src/vscode-extension && npm run compile && vsce package && code --install-extension {{source_dir}}/src/vscode-extension/meblog-post-header-validator-0.0.1.vsix --force
  code --reuse-window .

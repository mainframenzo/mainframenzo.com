# This file is responsible for defining local infra VM dev tasks.
import "../.justfiles/common.just"

setup:
  echo "nothing to do atm, but there might be soon :)"

[arg("use-prebuilt-development-container-image", long="use-prebuilt-development-container-image", value="--use-prebuilt-development-container-image")]
[arg("force-replace", long="force-replace", value="--force-replace")]
deploy-local use-prebuilt-development-container-image="" force-replace="":
  #!/usr/bin/env bash
  set -euxo pipefail

  just -f ./.justfiles/infra.local.just --working-directory . deploy-publish-stage local dev {{use-prebuilt-development-container-image}} {{force-replace}}
#just -f ./.justfiles/infra.local.just --working-directory . deploy-publish-stage local prod {{use-prebuilt-development-container-image}} {{force-replace}}

[arg("use-prebuilt-development-container-image", long="use-prebuilt-development-container-image", value="--use-prebuilt-development-container-image")]
[arg("force-replace", long="force-replace", value="true")]
deploy-publish-stage app_stage publish_stage use-prebuilt-development-container-image="" force-replace="false" app_location="local":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.local

  # Only maintain one cloud-config file: local is copied from hosted.
  cp {{source_dir}}/src/infra.hetzner/cloud-config-template.server.yaml {{source_dir}}/src/infra.local/
  sed -i '2i # This file is copied during a build process from src/infra.hetzner/cloud-config-template.server.yaml, do not edit directly.' {{source_dir}}/src/infra.local/cloud-config-template.server.yaml

  export TF_VAR_app_stage={{app_stage}}
  export TF_VAR_publish_stage={{publish_stage}}

  # Used to clone this source on the VM.
  if [[ "{{publish_stage}}" == "dev" ]]; then
    export TF_VAR_meblog_private_repo_name=`echo ${meblog_private_repo_name}`
  fi

  if [[ "{{publish_stage}}" == "prod" ]]; then
    export TF_VAR_meblog_private_repo_name=`echo ${meblog_public_repo_name}`
  fi

  # Used to clone this source on the VM.
  export github_token="{{app_stage}}_github_token"
  export TF_VAR_github_token=`echo "${!github_token}"`

  # FIXME You use the "local" stage both locally on our host OS and in a VM.
  # There are 2 .env variables that will not work in the VM,
  #  so just overrwite those for now.
  # You will still need to update the ./config/.env file in the local VM.
  # export stage_registry_directory="{{app_stage}}_registry_directory"
  # export TF_VAR_meblog_registry_directory=`echo "${!stage_registry_directory}"`

  # export stage_media_directory="{{app_stage}}_media_directory"
  # export TF_VAR_meblog_media_directory=`echo "${!stage_media_directory}"`

  export TF_VAR_meblog_registry_directory="/opt/app/meblog-registry"
  export TF_VAR_meblog_media_directory="/opt/app/meblog-media"

  # Usually you can make this == "true" but you pass use-prebuilt-development-container-image to another just task further down.
  if [[ "{{use-prebuilt-development-container-image}}" == "--use-prebuilt-development-container-image" ]]; then
    export TF_VAR_use_prebuilt_development_container_image="true"
  fi

  # Not used by local infra deployment but required because you use the same cloud-init script.
  export TF_VAR_restrict_to_public_ip="0.0.0.0/32"

  # You create "publish stages" in Terraform using their "workspaces".
  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}"
  else
    terraform workspace new "{{app_location}}-{{app_stage}}-{{publish_stage}}" # Create a new workspace and switch to it.
  fi

  terraform init
  terraform plan

  # FIXME The VM comes up and cloud config appears to work. WTF?
  set +e
  if [[ "{{force-replace}}" == "true" ]]; then
    terraform apply -replace="multipass_instance.meblog_server" -auto-approve
  else
    terraform apply -auto-approve
  fi
  set -e

  export meblog_server_ip="$(terraform output -raw meblog_server_ip)"

  # FIXME This is a result of the terraform apply failing but the VM still coming up
  #  and you having to change error handling above.
  if echo "${meblog_server_ip}" | grep -q "No outputs"; then
    exit 1
  fi

  cd ../../

  # Artifact of multipass terraform stupidity.
  rm ~/cloud-config.yaml

  just -f ./.justfiles/infra.local.just --working-directory . _deploy-publish-stage-sync-vm-files "{{app_stage}}" "{{publish_stage}}" "${meblog_server_ip}" {{use-prebuilt-development-container-image}}

  # Curl the VM and wait for the website to be up.
  until curl -X GET "http://${meblog_server_ip}/index.html"; do
    echo "curl failed, website not up yet, retrying in 5 seconds..."
    sleep 5
  done

  echo "website up using latest release"

[arg("use-prebuilt-development-container-image", long="use-prebuilt-development-container-image", value="true")]
_deploy-publish-stage-sync-vm-files app_stage publish_stage meblog_server_ip use-prebuilt-development-container-image="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  # Wait for the source code to be cloned.
  while ! multipass exec {{publish_stage}}-meblog-server -- test -f /opt/app/meblog/config/.env; do
    echo "/opt/app/meblog/config/.env not found, source code not cloned yet"
    sleep 5
  done

  # Sync files the VM needs that are not stored with source code.
  # FIXME You use the "local" stage both locally on our host OS and in a VM, so the .env values are not quite right.
  export stage_media_directory="{{app_stage}}_media_directory"
  export remote_media_directory=/opt/app/meblog-media

  #multipass mount "${local_media_directory}" {{publish_stage}}-meblog-server:${remote_media_directory}
  multipass transfer --recursive ${local_media_directory}/ {{publish_stage}}-meblog-server:${remote_media_directory}/

  if [[ "{{use-prebuilt-development-container-image}}" == "true" ]]; then
    # Sync registry files to VM.
    # FIXME You use the "local" stage both locally on our host OS and in a VM, so the .env values are not quite right.
    export stage_registry_directory="{{app_stage}}_registry_directory"
    export remote_registry_directory=/opt/app/meblog-registry

    #multipass mount "${local_registry_directory}" {{publish_stage}}-meblog-server:${remote_registry_directory}
    multipass transfer --recursive ${local_registry_directory}/ {{publish_stage}}-meblog-server:${remote_registry_directory}
  fi

  # Ensure the secrets file is up to date on the VM as you just created some w/o pushing to our Git remote.
  multipass transfer {{source_dir}}/config/.env {{publish_stage}}-meblog-server:/opt/app/meblog/config/.env

  # Let the VM know it can continue configuration process.
  multipass exec {{publish_stage}}-meblog-server -- touch /tmp/additional-meblog-files-synced-ok

destroy-local:
  #!/usr/bin/env bash
  set -euxo pipefail

  just -f ./.justfiles/infra.local.just --working-directory . destroy-publish-stage local dev
  #just -f ./.justfiles/infra.local.just --working-directory . destroy-publish-stage local prod

  rm -rf ./src/infra.local/terraform.tfstate.d
  rm -rf ./src/infra.local/.terraform
  rm -f ./src/infra.local/.terraform.lock.hcl

cat-cloud-init-output-log publish_stage app_location="local":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.local

  multipass exec {{publish_stage}}-meblog-server -- sudo cat /var/log/cloud-init-output.log
  #multipass exec {{publish_stage}}-meblog-server -- sudo cat /var/log/cloud-init.log
  multipass exec {{publish_stage}}-meblog-server -- cat /var/log/meblog-vm-setup.log

  # FIXME check /var/lib/cloud/instance/boot-finished

ssh-into publish_stage app_location="local":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.local

  multipass shell {{publish_stage}}-meblog-server

destroy-publish-stage app_stage publish_stage app_location="local":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.local

  # Only maintain one cloud-config file: local is copied from hosted.
  # The file needs to exist even during destroy.
  cp {{source_dir}}/src/infra.hetzner/cloud-config-template.server.yaml {{source_dir}}/src/infra.local/
  sed -i '2i # This file is copied during a build process from src/infra.hetzner/cloud-config-template.server.yaml, do not edit directly.' {{source_dir}}/src/infra.local/cloud-config-template.server.yaml

  export TF_VAR_app_stage={{app_stage}}
  export TF_VAR_publish_stage={{publish_stage}}

  # FIXME Not used when destroying, but not sure how to force require in Terraform when creating but not when destroying.
  export TF_VAR_meblog_private_repo_name="i"
  export TF_VAR_github_token="am"
  export TF_VAR_meblog_registry_directory="your"
  export TF_VAR_meblog_media_directory="father"
  export TF_VAR_restrict_to_public_ip="0.0.0.0/32"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}} does not exist!"
    exit 1
  fi

  terraform destroy -auto-approve

  # Needed if terraform deploy takes too long and times out but VM still comes up in multipass.
  set +e
  multipass stop {{publish_stage}}-meblog-server
  multipass delete {{publish_stage}}-meblog-server --purge
  multipass list
  set -e

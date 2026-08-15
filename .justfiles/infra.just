# This file is responsible for defining infra (Hetzner, Porkbun, Github) dev tasks.
# FIXME You just migrated off AWS - things could be a bit tidier.
# References:
# * https://www.the-art-of-web.com/system/fail2ban-log/
# * https://blog.nginx.org/blog/using-nginx-logging-for-application-performance-monitoring
# * https://gist.github.com/KartikTalwar/4393116
import "../.justfiles/common.just"

set allow-duplicate-variables := true
app_stage := "main"
publish_stage := "dev"

create-update-github-webhooks-main:
  #!/usr/bin/env bash
  set -euxo pipefail

  # Create a new Github webhook "secret" that serves as an API key of sorts.
  # While you do have a firewall in place to block non-Github IPs, they may change,
  #  and this provides an additional layer of security.
  export main_github_webhook_secret=$(openssl rand -base64 24)

  sed -i 's/^main_github_webhook_secret=$/main_github_webhook_secret='${main_github_webhook_secret}'/' {{source_dir}}/config/.env

  if [[ "${main_github_dev_webhook_id}" == "" ]]; then
    dev_github_response=$(curl -L -X POST \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer ${main_github_token}" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com/repos/${main_github_username}/${meblog_private_repo_name}/hooks \
      -d '{"name":"web","active":true,"events":["push"],"config":{"url":"https://dev.mainframenzo.com/api/cicd/start","secret":"'${main_github_webhook_secret}'","content_type":"json","insecure_ssl":"0"}}')
    echo ${dev_github_response}
    export main_github_dev_webhook_id=$(echo ${dev_github_response} | jq '.id')

    sed -i 's/^main_github_dev_webhook_id=$/main_github_dev_webhook_id='${main_github_dev_webhook_id}'/' {{source_dir}}/config/.env
  else
    echo "div github webhook already exists"

    dev_github_response=$(curl -L -X PATCH \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer ${main_github_token}" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com/repos/${main_github_username}/${meblog_private_repo_name}/hooks/${main_github_dev_webhook_id} \
      -d '{"name":"web","active":true,"events":["push"],"config":{"url":"https://dev.mainframenzo.com/api/cicd/start","secret":"'${main_github_webhook_secret}'","content_type":"json","insecure_ssl":"0"}}')
    echo ${dev_github_response}
  fi

  # Github does not like back-to-back requests for webhooks.
  sleep 1

  if [[ "${main_github_prod_webhook_id}" == "" ]]; then
    export prod_github_response=$(curl -L -X POST \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer ${main_github_token}" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com/repos/${main_github_username}/${meblog_public_repo_name}/hooks \
      -d '{"name":"web","active":true,"events":["push"],"config":{"url":"https://mainframenzo.com/api/cicd/start","secret":"'${main_github_webhook_secret}'","content_type":"json","insecure_ssl":"0"}}')
    echo ${prod_github_response}
    export main_github_prod_webhook_id=$(echo ${prod_github_response} | jq '.id')

    sed -i 's/^main_github_prod_webhook_id=$/main_github_prod_webhook_id='${main_github_prod_webhook_id}'/' {{source_dir}}/config/.env
  else
    echo "prod github webhook already exists"

    export prod_github_response=$(curl -L -X POST \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer ${main_github_token}" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com/repos/${main_github_username}/${meblog_public_repo_name}/hooks/${main_github_prod_webhook_id} \
      -d '{"name":"web","active":true,"events":["push"],"config":{"url":"https://mainframenzo.com/api/cicd/start","secret":"'${main_github_webhook_secret}'","content_type":"json","insecure_ssl":"0"}}')
    echo ${prod_github_response}
  fi

[arg("use-prebuilt-development-container-image", long="use-prebuilt-development-container-image", value="--use-prebuilt-development-container-image")]
[arg("force-replace", long="force-replace", value="--force-replace")]
[arg("certbot-staging", long="certbot-staging", value="--certbot-staging")]
deploy-main stage="dev" use-prebuilt-development-container-image="" force-replace="" certbot-staging="":
  #!/usr/bin/env bash
  set -euxo pipefail

  # FIXME Could not figure out a better way to do this.
  cp ./src/infra.hetzner/provider.tf ./src/infra.hetzner/server/
  cp ./src/infra.hetzner/variables.tf ./src/infra.hetzner/server/
  cp ./src/infra.hetzner/provider.tf ./src/infra.hetzner/load-test-server/
  cp ./src/infra.hetzner/variables.tf ./src/infra.hetzner/load-test-server/

  # Get the VM up and running or replace it.
  just -f ./.justfiles/infra.just --working-directory . deploy-publish-stage main {{stage}} {{use-prebuilt-development-container-image}} {{force-replace}} {{certbot-staging}} --allow-certbot-traffic
  # Configure A records, upload any files the VM needs, etc.
  just -f ./.justfiles/infra.just --working-directory . post-deploy-publish-stage main {{stage}} {{use-prebuilt-development-container-image}} {{force-replace}}

  # Close off the certbot ports (80 -> in) in dev (TF manages this staying open for prod).
  if [[ "{{stage}}" == "dev" ]]; then
    just -f ./.justfiles/infra.just --working-directory . deploy-publish-stage main {{stage}} {{use-prebuilt-development-container-image}} {{force-replace}} {{certbot-staging}}
  fi

[arg("use-prebuilt-development-container-image", long="use-prebuilt-development-container-image", value="--use-prebuilt-development-container-image")]
[arg("force-replace", long="force-replace", value="true")]
[arg("certbot-staging", long="certbot-staging", value="true")]
[arg("allow-certbot-traffic", long="allow-certbot-traffic", value="true")]
deploy-publish-stage app_stage publish_stage use-prebuilt-development-container-image="" force-replace="false" app_location="hosted" certbot-staging="false" allow-certbot-traffic="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  export TF_VAR_app_stage={{app_stage}}
  export TF_VAR_publish_stage={{publish_stage}}
  export TF_VAR_app_location={{app_location}}

  if [[ "{{certbot-staging}}" == "true" ]]; then
    export TF_VAR_certbot_staging="--staging "
  fi

  if [[ "{{allow-certbot-traffic}}" == "true" ]]; then
    export TF_VAR_allow_certbot_traffic=true
  fi

  export meblog_release_version="{{app_stage}}_meblog_release_version"
  export TF_VAR_meblog_release_version=`echo "${!meblog_release_version}"`

  # Used to clone this source on the VM. Always clone private source.
  export TF_VAR_meblog_private_repo_name=`echo ${meblog_private_repo_name}`

  export hetzner_api_token="{{app_stage}}_hetzner_api_token"
  export TF_VAR_hetzner_api_token=`echo "${!hetzner_api_token}"`

  # Used to clone this source on the VM.
  export github_token="{{app_stage}}_github_token"
  export TF_VAR_github_token=`echo "${!github_token}"`

  export stage_registry_directory="{{app_stage}}_registry_directory"
  export TF_VAR_meblog_registry_directory=`echo "${!stage_registry_directory}"`

  export stage_media_directory="{{app_stage}}_media_directory"
  export TF_VAR_meblog_media_directory=`echo "${!stage_media_directory}"`

  # Generate new backend username/password and jwt secret on each deploy.
  # The config/.env changes get uploaded to the VM after deploy before setup runs.
  export your_username=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 12 | head -n 1)
  export your_password=$(openssl rand -base64 16)
  export jwt_secret=$(openssl rand -base64 16)

  # FIXME These changes never make it to VM because you have already sourced the config/.env file?
  # Strip sed delimiter.
  export your_username=$(echo "${your_username//|}")
  export your_password=$(echo "${your_password//|}")
  export jwt_secret=$(echo "${jwt_secret//|}")

  sed -i 's|^{{app_stage}}_your_username=$|{{app_stage}}_your_username='${your_username}'|' {{source_dir}}/config/.env
  sed -i 's|^{{app_stage}}_your_password=$|{{app_stage}}_your_password='${your_password}'|' {{source_dir}}/config/.env
  sed -i 's|^{{app_stage}}_jwt_secret=$|{{app_stage}}_jwt_secret='${jwt_secret}'|' {{source_dir}}/config/.env

  # FIXME pass github ips for firewall
  # https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-githubs-ip-addresses
  # export github_webhook_ips=$(curl -L \
  #   -H "Accept: application/vnd.github+json" \
  #   -H "X-GitHub-Api-Version: 2022-11-28" \
  #   https://api.github.com/meta | jq '.hooks')

  # jq -c '.[]' input.json | while read -r row; do
  #   # Do stuff with the $row variable, which is a full JSON object on one line
  #   item_name=$(echo "$row" | jq -r '.name')
  #   echo "Processing item: $item_name"
  # done
  # https://gist.github.com/deardooley/f7bdf7e464680abb47faf6f69fc5beea

  # Some firewall rules restricted to public IP.
  export TF_VAR_restrict_to_public_ip=`curl ipinfo.io/ip`
  export TF_VAR_restrict_to_public_ip="${TF_VAR_restrict_to_public_ip}/32"

  # Usually you can make this == "true" but you pass use-prebuilt-development-container-image to another just task further down.
  if [[ "{{use-prebuilt-development-container-image}}" == "--use-prebuilt-development-container-image" ]]; then
    export TF_VAR_use_prebuilt_development_container_image="true"
  fi

  # You create webserver "publish stages" in Terraform using their "workspaces".
  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    terraform workspace new "{{app_location}}-{{app_stage}}-{{publish_stage}}-web" # Create a new workspace and switch to it.
  fi

  terraform init
  terraform plan

  if [[ "{{force-replace}}" == "true" ]]; then
    terraform apply -replace="hcloud_server.meblog_server" -auto-approve
  else
    terraform apply -auto-approve
  fi

_deploy-publish-stage-configure-a-records app_stage publish_stage meblog_server_ip:
  #!/usr/bin/env bash
  set -euxo pipefail

  # Upsert A record(s) using DNS registrar API.
  # Do this immediately so that cert creation works via DNS.
  export porkbun_api_key="{{app_stage}}_porkbun_api_key"
  export meblog_porkbun_api_key=`echo "${!porkbun_api_key}"`

  export porkbun_api_secret="{{app_stage}}_porkbun_api_secret"
  export meblog_porkbun_api_secret=`echo "${!porkbun_api_secret}"`

  export dns_records=$(curl --silent --header "Content-Type: application/json" \
    --request POST \
    --data '{"secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'"}' \
    https://api.porkbun.com/api/json/v3/dns/retrieve/mainframenzo.com | jq .)
  echo $dns_records

  # Presumably one A record existing means all A records exist, cough.
  a_record_with_server_ip=$(echo ${dns_records} | jq -r '.records[] | select(.content == "{{meblog_server_ip}}")')
  echo "a_record_with_server_ip: ${a_record_with_server_ip}"

  if [[ ! -z "${a_record_with_server_ip}" ]]; then
    echo "found {{meblog_server_ip}} in a record already, moving on"
    exit 0
  fi

  if [[ "{{publish_stage}}" == "dev" ]]; then
    a_record=$(echo ${dns_records} | jq -r '.records[] | select(.name == "www.dev")')
    echo "a_record: ${a_record}"

    if [ -n "${a_record}" ]; then
      echo "updating a records"

      # https://dev.mainframenzo.com
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/editByNameType/mainframenzo.com/A/dev

      # https://www.dev.mainframenzo.com
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/editByNameType/mainframenzo.com/A/www.dev
    else
      echo "creating a records"

      # https://dev.mainframenzo.com
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"type":"A","name":"dev","secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/editByNameType/mainframenzo.com/A/dev

      # https://www.dev.mainframenzo.com
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"type":"A","name":"www.dev","secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/editByNameType/mainframenzo.com/A/www.dev
    fi
  fi

  if [[ "{{publish_stage}}" == "prod" ]]; then
    a_record=$(echo ${dns_records} | jq -r '.records[] | select(.name == "www")')
    echo "a_record: ${a_record}"

    if [ -n "${a_record}" ]; then
      echo "updating a records"

      # https://mainframenzo.com - @ is root
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/editByNameType/mainframenzo.com/A/@

      # https://www.mainframenzo.com
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/editByNameType/mainframenzo.com/A/www
    else
      echo "creating a records"

      # https://mainframenzo.com - @ is root
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"type":"A","name":"","secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/create/mainframenzo.com

      # https://www.mainframenzo.com
      curl --fail \
        --header "Content-type: application/json" \
        --request POST \
        --data '{"type":"A","name":"www","secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'","ttl":600,"content":"{{meblog_server_ip}}"}' \
        https://api.porkbun.com/api/json/v3/dns/create/mainframenzo.com
    fi
  fi

  # DNS will just have been updated.
  # You wait until the A records have matriculated so that the cert validation process works.
  # It seems to take a while for Porkbun to reflect these changes and
  #  you are not even sure the Porkbun API works (status says success but no changes show up in GUI).
  # FIXME Submit a ticket.
  # In the meantime, you manually enter the A records in the Porkbun GUI.
  # Also, since Hetzner seems to assign a default (primary?) IP to your VM,
  #  and this IP does not seem to change often (even after delete), this problem may not affect you!
  while :; do
    export dns_records=$(curl --silent --header "Content-Type: application/json" \
      --request POST \
      --data '{"secretapikey":"'${meblog_porkbun_api_secret}'","apikey":"'${meblog_porkbun_api_key}'"}' \
      https://api.porkbun.com/api/json/v3/dns/retrieve/mainframenzo.com | jq .)
    echo $dns_records

    a_record=$(echo ${dns_records} | jq -r '.records[] | select(.content == "{{meblog_server_ip}}")')
    echo "a_record: ${a_record}"

    if [[ ! -z "${a_record}" ]]; then
      echo "found {{meblog_server_ip}} in a record"
      break
    fi

    echo "sleeping 5 minutes waiting for dns changes"

    sleep 300s
  done

[arg("use-prebuilt-development-container-image", long="use-prebuilt-development-container-image", value="true")]
_deploy-publish-stage-sync-vm-files app_stage publish_stage meblog_server_ip use-prebuilt-development-container-image="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  # In Docker, cannot stat /home/root/.ssh/known_hosts: No such file or directory
  set +e
  ssh-keygen -f ~/.ssh/known_hosts -R {{meblog_server_ip}}
  set -e

  until ssh-keyscan -H {{meblog_server_ip}} >> ~/.ssh/known_hosts 2>/dev/null; do
    echo "pre-loading hostkey failed, vm not ready, retrying in 5 seconds..."
    sleep 5
  done

  export ssh_key_name="meblog-{{publish_stage}}-server-ssh-key.pem"

  export stage_registry_directory="{{app_stage}}_registry_directory"
  export remote_registry_directory=`echo "${!stage_registry_directory}"`

  # Wait for the source code to be cloned.
  while ! ssh -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} root@{{meblog_server_ip}} "test -f /opt/app/meblog/config/.env"; do
    echo "/opt/app/meblog/config/.env not found, source code not cloned yet"
    sleep 5
  done

  # Sync files the VM needs that are not stored with source code.
  export stage_media_directory="{{app_stage}}_media_directory"
  export remote_media_directory=`echo "${!stage_media_directory}"`

  until rsync -azPv -e "ssh -o Compression=no -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name}" "${local_media_directory}/" root@{{meblog_server_ip}}:${remote_media_directory}/; do
    echo "rsync failed, vm not ready, retrying in 5 seconds..."
    sleep 5
  done

  if [[ "{{use-prebuilt-development-container-image}}" == "true" ]]; then
    # Sync registry files to VM.
    until rsync -azPv -e "ssh -o Compression=no -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name}" "${local_registry_directory}/" root@{{meblog_server_ip}}:${remote_registry_directory}/; do
      echo "rsync failed, vm not ready, retrying in 5 seconds..."
      sleep 5
    done
  fi

  # Ensure the secrets file is up to date on the VM as you just created some w/o pushing to our Git remote.
  scp -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} -P 22 {{source_dir}}/config/.env "root@{{meblog_server_ip}}:/opt/app/meblog/config/.env"

  # Let the VM know it can continue configuration process.
  touch /tmp/additional-meblog-files-synced-ok
  scp -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} -P 22 /tmp/additional-meblog-files-synced-ok "root@{{meblog_server_ip}}:/root/additional-meblog-files-synced-ok"

[arg("use-prebuilt-development-container-image", long="use-prebuilt-development-container-image", value="--use-prebuilt-development-container-image")]
[arg("force-replace", long="force-replace", value="true")]
[arg("allow-certbot-traffic", long="allow-certbot-traffic", value="true")]
post-deploy-publish-stage app_stage publish_stage use-prebuilt-development-container-image="" force-replace="false" app_location="hosted" allow-certbot-traffic="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-web does not exist!"
    exit 1
  fi

  export meblog_server_ip="$(terraform output -raw meblog_server_ip)"

  cd ../../../

  just -f ./.justfiles/infra.just --working-directory . _deploy-publish-stage-configure-a-records "{{app_stage}}" "{{publish_stage}}" "${meblog_server_ip}"
  just -f ./.justfiles/infra.just --working-directory . _deploy-publish-stage-sync-vm-files "{{app_stage}}" "{{publish_stage}}" "${meblog_server_ip}" {{use-prebuilt-development-container-image}}

  # Curl the VM and wait for the website to be up.
  if [[ "{{publish_stage}}" == "dev" ]]; then
    export meblog_url="https://dev.mainframenzo.com"
  fi

  if [[ "{{publish_stage}}" == "prod" ]]; then
    export meblog_url="https://mainframenzo.com"
  fi

  until curl -k -X GET "${meblog_url}/index.html"; do
    echo "curl failed, website not up yet, retrying in 5 seconds..."
    sleep 5
  done

  echo "website up using latest release"

# This runs on the hosting provider's VM.
# On VM boot, wait for additional files to be synced first (media files, optionally the development container image).
# Once the files are synced, you get the website up as quickly as possible, first installing runtime dependencies,
#  then serving the latest website release.
# VM boot is not tied to website builds.
# When you want to update either stage's website, push to Github -> their webhooks start CICD on the VMs.
# When you want to update runtime dependencies for VMs, replace the VMs.
configure-vm app_stage publish_stage app_location use_prebuilt_development_container_image="false" restrict_to_public_ip="":
  #!/usr/bin/env bash
  set -euxo pipefail

  systemctl stop nginx

  until [ -e "/root/additional-meblog-files-synced-ok" ]; do
    echo "waiting for deploy user to sync media files..."
    sleep 5
  done

  export cert_name={{publish_stage}}-cert

  just -f ./.justfiles/infra.just --working-directory . _configure-vm-ssh
  just -f ./.justfiles/infra.just --working-directory . _configure-vm-docker
  just -f ./.justfiles/infra.just --working-directory . _configure-vm-nodejs
  just -f ./.justfiles/infra.just --working-directory . configure-vm-backend "production" "{{app_stage}}" "{{publish_stage}}" "{{app_location}}"
  just -f ./.justfiles/infra.just --working-directory . _configure-vm-certs "{{publish_stage}}" "${cert_name}"
  just -f ./.justfiles/infra.just --working-directory . update-nginx-conf "{{publish_stage}}" "{{app_location}}" "${cert_name}" "{{restrict_to_public_ip}}"
  just -f ./.justfiles/infra.just --working-directory . configure-nginx --start
  just -f ./.justfiles/infra.just --working-directory . configure-security-tools
  just -f ./.justfiles/infra.just --working-directory . configure-vm-firewall

  # FIXME This is failing.
  #just -f ./.justfiles/infra.just --working-directory . _configure-vm-cicd "{{app_stage}}" "{{publish_stage}}" "{{use_prebuilt_development_container_image}}"

  # Scrub secrets you do not want kept around.
  sed -i '/hetzner_api_token/d' {{source_dir}}/config/.env
  sed -i '/porkbun_api_key/d' {{source_dir}}/config/.env
  sed -i '/porkbun_api_secret/d' {{source_dir}}/config/.env

  sed -i '/hetzner_api_token/d' /opt/app/meblog.env

  history -c

  systemctl restart ssh

_configure-vm-ssh:
  #sed -ie '/^PermitRootLogin/s/^.*$/PermitRootLogin yes/' /etc/ssh/sshd_config
  sed -ie '/^PasswordAuthentication/s/^.*$/PasswordAuthentication no/' /etc/ssh/sshd_config
  sed -ie '/^X11Forwarding/s/^.*$/X11Forwarding no/' /etc/ssh/sshd_config
  sed -ie '/^#MaxAuthTries/s/^.*$/MaxAuthTries 3/' /etc/ssh/sshd_config
  sed -ie '/^#AllowTcpForwarding/s/^.*$/AllowTcpForwarding no/' /etc/ssh/sshd_config
  sed -ie '/^#AllowAgentForwarding/s/^.*$/AllowAgentForwarding no/' /etc/ssh/sshd_config
  #sed -i '$a AllowUsers root' /etc/ssh/sshd_config

# Docker is used to build the website (parts libraries dependencies needed - this is the easiest way).
_configure-vm-docker:
  #!/usr/bin/env bash
  set -euxo pipefail

  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  export ARCH=$(dpkg --print-architecture) # Resolves to "arm64" or "amd64".
  tee /etc/apt/sources.list.d/docker.sources <<EOF
  Types: deb
  URIs: https://download.docker.com/linux/ubuntu
  Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
  Components: stable
  Architectures: ${ARCH}
  Signed-By: /etc/apt/keyrings/docker.asc
  EOF

  apt update -y
  apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Node.js is used to run the backend, which starts CICD based on a Github webhook.
_configure-vm-nodejs:
  apt-get remove -y --purge nodejs libnode-dev

  curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt-get install -y nodejs
  node -v

configure-vm-backend node_env app_stage publish_stage app_location:
  #!/usr/bin/env bash
  set -euxo pipefail

  export backend_logrotate_config_path="/etc/logrotate.d/meblog-backend"
  export backend_log_file_path="/var/log/meblog-backend.log"

  tee "${backend_logrotate_config_path}" > /dev/null <<EOF
  ${backend_log_file_path} {
    su root root
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
    dateext
    dateformat -%Y%m%d
    create 0640 root root
  }
  EOF

  # Verify the config.
  logrotate --debug "${backend_logrotate_config_path}"

  # FIXME You need to create releases of the backend as well and use those instead.
  just -f ./.justfiles/backend.just --working-directory . setup
  just -f ./.justfiles/backend.just --working-directory . build
  just -f ./.justfiles/backend.just --working-directory . start "{{node_env}}" "{{app_stage}}" "{{publish_stage}}" "{{app_location}}"

_configure-vm-certs publish_stage cert_name:
  #!/usr/bin/env bash
  set -euxo pipefail

  # Generate SSL cert if they do not exist, then configure auto-renewal cron job.
  mkdir -p /etc/letsencrypt/live

  if [[ -d {{source_dir}}/config/{{publish_stage}}-cert ]]; then
    cp -r {{source_dir}}/config/{{publish_stage}}-cert /etc/letsencrypt/live/

    ls -al /etc/letsencrypt/live

    # FIXME Enable renew.
    #(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --renew-hook 'systemctl reload nginx'") | crontab -

    exit 0
  fi

  # Running Certbot with the certonly command will obtain a certificate and place it in the directory /etc/letsencrypt/live on your system.
  # If a certificate is requested with certonly specifying a certificate name that already exists,
  #  Certbot updates the existing certificate (this happens when you replace a VM).
  # The "standalone" method is used - it eeds to bind to port 80 in order to perform domain validation,
  #  so you wait to configure and start nginx.
  snap install certbot --classic

  # Letsencrypt has limits, and passing --staging to VM lets us use "staging" certificates when iterating on infra.
  if [[ "{{publish_stage}}" == "dev" ]]; then
    certbot certonly ${certbot_staging}--standalone --force-renewal --register-unsafely-without-email --agree-tos --cert-name="{{cert_name}}" -d dev.mainframenzo.com -d www.dev.mainframenzo.com
  fi

  if [[ "{{publish_stage}}" == "prod" ]]; then
    certbot certonly ${certbot_staging}--standalone --force-renewal --register-unsafely-without-email --agree-tos --cert-name="{{cert_name}}" -d mainframenzo.com -d www.mainframenzo.com
  fi

  ls -al /etc/letsencrypt/live

  # FIXME Enable renew.
  #(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --renew-hook 'systemctl reload nginx'") | crontab -

update-nginx-conf publish_stage app_location cert_name restrict_to_public_ip="":
  #!/usr/bin/env bash
  set -euxo pipefail

  # For nginx, first update the config with some publish stage variables.
  cp {{source_dir}}/config/nginx.meblog.conf "/tmp/nginx.meblog.{{publish_stage}}.conf"

  sed -i 's/PUBLISH_STAGE_CERT/{{cert_name}}/g' "/tmp/nginx.meblog.{{publish_stage}}.conf"

  if [[ "{{publish_stage}}" == "dev" ]]; then
    if [[ "{{app_location}}" == "hosted" ]]; then
      sed -i 's|RESTRICT_TO_PUBLIC_IP|{{restrict_to_public_ip}}|g' "/tmp/nginx.meblog.{{publish_stage}}.conf"

      sed -i 's/PUBLISH_STAGE_DNS_NAME/dev.mainframenzo.com www.dev.mainframenzo.com/g' "/tmp/nginx.meblog.{{publish_stage}}.conf"
    else
      sed -i 's/RESTRICT_TO_PUBLIC_IP/0.0.0.0/g' "/tmp/nginx.meblog.{{publish_stage}}.conf"
      sed -i '/deny all;/d' "/tmp/nginx.meblog.{{publish_stage}}.conf"
      sed -i '0,/deny all;/{/deny all;/d}' "/tmp/nginx.meblog.{{publish_stage}}.conf"

      sed -i 's/PUBLISH_STAGE_DNS_NAME/localhost/g' "/tmp/nginx.meblog.{{publish_stage}}.conf"
    fi
  fi

  if [[ "{{publish_stage}}" == "prod" ]]; then
    sed -i 's/RESTRICT_TO_PUBLIC_IP/0.0.0.0/g' "/tmp/nginx.meblog.{{publish_stage}}.conf"
    sed -i '/deny all;/d' "/tmp/nginx.meblog.{{publish_stage}}.conf"
    sed -i '0,/deny all;/{/deny all;/d}' "/tmp/nginx.meblog.{{publish_stage}}.conf"

    if [[ "{{app_location}}" == "hosted" ]]; then
      sed -i 's/PUBLISH_STAGE_DNS_NAME/mainframenzo.com www.mainframenzo.com/g' "/tmp/nginx.meblog.{{publish_stage}}.conf"
    else
      sed -i 's/PUBLISH_STAGE_DNS_NAME/localhost/g' "/tmp/nginx.meblog.{{publish_stage}}.conf"
    fi
  fi

  if [[ "{{app_location}}" == "hosted" ]]; then
    export vm_ip_address=`curl ipinfo.io/ip`
  else
    export vm_ip_address="localhost"
  fi

  sed -i 's|PUBLISH_STAGE_IP_ADDRESS|'${vm_ip_address}'|g' "/tmp/nginx.meblog.{{publish_stage}}.conf"

  cp "/tmp/nginx.meblog.{{publish_stage}}.conf" /etc/nginx/conf.d/meblog.conf
  cat /etc/nginx/conf.d/meblog.conf

  # FIXME Performance tweaks and fail2ban jails for rate limiting.
  #worker_connections
  #worker_rlimit_nofile

  # Validate the nginx conf.
  nginx -t

[arg("start", long="start", value="true")]
configure-nginx copy_source_from="/opt/app/meblog-release" start="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  # On boot, you download the latest built website - copy it to the nginx www dir.
  # When CICD eventually does run on source change, it will overwrite the www dir with the newly built website.
  rm /etc/nginx/sites-enabled/default
  rm /var/www/html/index.nginx-debian.html
  cp -R {{copy_source_from}}/* /var/www/html/

  # Create gzipped versions of these file types for nginx.
  find /var/www/html -type f \( \
    -name "*.txt" -o \
    -name "*.css" -o \
    -name "*.json" -o \
    -name "*.js" -o \
    -name "*.mjs" -o \
    -name "*.xml" -o \
    -name "*.rss" -o \
    -name "*.svg" -o \
    -name "*.eot" -o \
    -name "*.ttf" -o \
    -name "*.otf" \
  \) -exec gzip -k --best {} \;

  # Ensure proper file permissions for nginx.
  chown -R www-data:www-data /var/www/html
  #chmod -R 755 /var/www/html
  find /var/www/html -type d -exec chmod 755 {} \;
  find /var/www/html -type f -exec chmod 644 {} \;

  if [[ "{{start}}" == "true" ]]; then
    # CICD uses this same just task to replace your nginx config, and nginx will already have been enabled.
    systemctl enable nginx && systemctl start nginx || systemctl restart nginx
  fi

configure-security-tools:
  cp {{source_dir}}/config/fail2ban/filter.d/* /etc/fail2ban/filter.d/
  cp {{source_dir}}/config/fail2ban/jail.local /etc/fail2ban/jail.local
  systemctl enable fail2ban
  systemctl start fail2ban

  sleep 2

  fail2ban-client reload

  # FIXME How to use these to validate? Can you?
  #fail2ban-regex /var/log/nginx/access.log /etc/fail2ban/filter.d/nginx-auth-login.conf
  #fail2ban-regex /var/log/fail2ban.log /etc/fail2ban/filter.d/recidive-nginx.conf
  #fail2ban-regex /var/log/nginx/access.log /etc/fail2ban/filter.d/honeypot.conf

  # FIXME Way to unban?
  #fail2ban-client set honeypot unbanip <IP>

configure-vm-firewall:
  ufw allow 'Nginx Full' # Opens both port 80 and port 443 (TLS/SSL encrypted traffic).
  ufw allow 'OpenSSH'
  ufw enable

_configure-vm-cicd app_stage publish_stage use_prebuilt_development_container_image="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  # Run a Docker registry. You either build a development container image and push to it,
  #  or you rsync an existing development container image to the VM on boot.
  # The development container image is used for CICD:
  #   build the website, update the Github release, and then update /var/www/html.
  nohup docker run --rm -p 5000:5000 \
    --name registry \
    -v /opt/app/meblog-registry:/var/lib/registry \
    -e GENERATE_UNIQUE=false \
    public.ecr.aws/docker/library/registry:2 &

  if [[ "{{use_prebuilt_development_container_image}}" == "true" ]]; then
    # No need to build the development container image for CICD,
    #  just "docker pull" it from the local registry.
    # FIXME I guess you could "docker run" and specify that registry?
    docker ps
    docker logs registry

    just -f ./.justfiles/docker.just --working-directory . pull-latest-development-image-from-local-registry
  else
    echo "building meblog docker image for cicd"

    just -f ./.justfiles/docker.just --working-directory . setup
  fi

# Assumes main app_stage.
cat-cloud-init-output-log publish_stage app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-web does not exist!"
    exit 1
  fi

  export ssh_key_name="meblog-{{publish_stage}}-server-ssh-key.pem"
  export meblog_server_ip="$(terraform output -raw meblog_server_ip)"

  ssh -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} root@${meblog_server_ip} 'cat /var/log/cloud-init-output.log'
  #ssh -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} root@${meblog_server_ip} 'cat /var/log/cloud-init.log'
  ssh -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} root@${meblog_server_ip} 'cat /var/log/meblog-vm-setup.log'

  # FIXME check /var/lib/cloud/instance/boot-finished

# Assumes main app_stage.
ssh-into publish_stage app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-web does not exist!"
    exit 1
  fi

  export ssh_key_name="meblog-{{publish_stage}}-server-ssh-key.pem"
  export meblog_server_ip="$(terraform output -raw meblog_server_ip)"

  ssh -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} root@${meblog_server_ip}

# Assumes main app_stage.
list-banned-ips publish_stage app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-web does not exist!"
    exit 1
  fi

  export ssh_key_name="meblog-{{publish_stage}}-server-ssh-key.pem"
  export meblog_server_ip="$(terraform output -raw meblog_server_ip)"

  ssh -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} root@${meblog_server_ip} bash -s <<'REMOTE'
    for jail in $(fail2ban-client status | awk -F: '/Jail list:/{print $2}' | tr ',' ' '); do
      echo "== $jail =="
      fail2ban-client status "$jail" | awk -F: '/Banned IP list:/{print $2}'
    done
  REMOTE

# Assumes main app_stage.
# Hot-patch a publish stage's VM with the latest release.
# Useful for when you don't want to completely destroy/deploy a VM (you've lost more powerful Hetzner resources this way).
# This only works if your dependency ecosystems haven't changed too much.
# What happens:
# * Pull the latest release or the release version specified
# * Pull the latest source branch for the publish stage (main for dev, prod for prod)
# * Stop backend, nginx, fail2ban
# * Copy latest release to /var/www/html
# * Copy latest source to /opt/app/meblog
# * Copy the latest configs to nginx, fail2ban
# * Restart backend, nginx, fail2ban
[arg("release-version", long="release-version", value="")]
hot-patch publish_stage="dev" app_location="hosted" release-version="":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-web does not exist!"
    exit 1
  fi

  export ssh_key_name="meblog-{{publish_stage}}-server-ssh-key.pem"
  export meblog_server_ip="$(terraform output -raw meblog_server_ip)"

  cd ../../../

  # _hot-patch has to exist on the server...
  ssh -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} root@${meblog_server_ip} bash -s <<REMOTE
    cd /opt/app/meblog
    just -f ./.justfiles/infra.just --working-directory . _hot-patch "{{release-version}}"
  REMOTE

# This runs on the hosting provider's VM.
# It updates all the things!
_hot-patch release-version="":
  #!/usr/bin/env bash
  set -euxo pipefail

  # Source the env variables you need (see the cloud-init server file for details).
  . /opt/app/meblog.env

  if [[ "${publish_stage}" == "dev" ]]; then
    export source_branch="main"
  else
    export source_branch="prod"
  fi

  # Make the VM aware of source/release updates.
  git fetch origin "${source_branch}"

  # Get release info.
  if [[ -z "{{release-version}}" ]]; then
    export release_json=$(curl -s \
      -H "Authorization: Bearer ${github_token}" \
      -H "Accept: application/vnd.github+json" \
      "https://api.github.com/repos/mainframenzo/${meblog_private_repo_name}/releases/latest")
  else
    export release_json=$(curl -s \
      -H "Authorization: Bearer ${github_token}" \
      -H "Accept: application/vnd.github+json" \
      "https://api.github.com/repos/mainframenzo/${meblog_private_repo_name}/releases/tags/v{{release-version}}")
  fi

  export release_tag=$(echo "${release_json}" | jq -r '.tag_name')
  export asset_id=$(echo "${release_json}" | jq -r '.assets[0].id')

  if [[ "${asset_id}" == "null" || -z "${asset_id}" ]]; then
    echo "could not resolve a release asset for tag ${release_tag}"
    exit 1
  fi

  # Download latest release.
  rm -rf /tmp/meblog-release
  rm -f /tmp/meblog-release.zip
  mkdir -p /tmp/meblog-release
  curl -L -o /tmp/meblog-release.zip \
    -H "Authorization: Bearer ${github_token}" \
    -H "Accept: application/octet-stream" \
    "https://api.github.com/repos/mainframenzo/${meblog_private_repo_name}/releases/assets/${asset_id}"
  unzip "/tmp/meblog-release.zip" -d "/tmp/meblog-release"
  rm -rf /opt/app/meblog-release
  mv /tmp/meblog-release /opt/app/meblog-release

  # Download latest changes to /opt/app/meblog.
  # This is an update in place and ignores any changes VM setup made to it.
  git checkout "${source_branch}"
  git reset --hard "origin/${source_branch}"

  # Update backend dependencies and build.
  just -f ./.justfiles/backend.just --working-directory . setup
  just -f ./.justfiles/backend.just --working-directory . build

  # Stop all the softwarez.
  systemctl stop nginx || true
  systemctl stop fail2ban || true
  pkill -f "nodemon.*src/backend/index.ts" || true
  pkill -f "src/backend/index.ts" || true
  sleep 2

  # Run the same configuration scripts you did on VM setup.
  export cert_name="${publish_stage}-cert"
  just -f ./.justfiles/infra.just --working-directory . update-nginx-conf \
    "${publish_stage}" "${app_location}" "${cert_name}" "${restrict_to_public_ip}"
  just -f ./.justfiles/infra.just --working-directory . configure-nginx --start
  just -f ./.justfiles/infra.just --working-directory . configure-security-tools

  just -f ./.justfiles/backend.just --working-directory . start "production" "${app_stage}" "${publish_stage}" "${app_location}"

  echo "done hot-patching VM with frontend release ${release_tag} and latest source from branch ${source_branch}"

# Assumes main app_stage.
download-certs publish_stage="dev" app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-web does not exist!"
    exit 1
  fi

  export ssh_key_name="meblog-{{publish_stage}}-server-ssh-key.pem"
  export meblog_server_ip="$(terraform output -raw meblog_server_ip)"

  scp -i {{source_dir}}/src/infra.hetzner/server/${ssh_key_name} -r \
    root@${meblog_server_ip}:/etc/letsencrypt/live/{{publish_stage}}-cert/ \
    {{source_dir}}/config/{{publish_stage}}-cert/

# Assumes main app_stage.
update-firewall-rules-for-current-ip publish_stage="prod" app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  export TF_VAR_app_stage={{app_stage}}
  export TF_VAR_publish_stage={{publish_stage}}
  export TF_VAR_app_location={{app_location}}

  export meblog_release_version="{{app_stage}}_meblog_release_version"
  export TF_VAR_meblog_release_version=`echo "${!meblog_release_version}"`

  # Used to clone this source on the VM. Always clone private source.
  export TF_VAR_meblog_private_repo_name=`echo ${meblog_private_repo_name}`

  export hetzner_api_token="{{app_stage}}_hetzner_api_token"
  export TF_VAR_hetzner_api_token=`echo "${!hetzner_api_token}"`

  # Used to clone this source on the VM.
  export github_token="{{app_stage}}_github_token"
  export TF_VAR_github_token=`echo "${!github_token}"`

  export stage_registry_directory="{{app_stage}}_registry_directory"
  export TF_VAR_meblog_registry_directory=`echo "${!stage_registry_directory}"`

  export stage_media_directory="{{app_stage}}_media_directory"
  export TF_VAR_meblog_media_directory=`echo "${!stage_media_directory}"`

  # Some firewall rules restricted to public IP.
  export TF_VAR_restrict_to_public_ip=`curl ipinfo.io/ip`
  export TF_VAR_restrict_to_public_ip="${TF_VAR_restrict_to_public_ip}/32"

  # You create webserver "publish stages" in Terraform using their "workspaces".
  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    terraform workspace new "{{app_location}}-{{app_stage}}-{{publish_stage}}-web" # Create a new workspace and switch to it.
  fi

  terraform init
  terraform plan -target=hcloud_firewall.meblog_server_firewall
  terraform apply -auto-approve -target=hcloud_firewall.meblog_server_firewall

destroy-main stage="dev":
  #!/usr/bin/env bash
  set -euxo pipefail

  # FIXME Could not figure out a better way  to reuse Terraform templates.
  # This seems like it should be easier?
  cp ./src/infra.hetzner/provider.tf ./src/infra.hetzner/server/
  cp ./src/infra.hetzner/variables.tf ./src/infra.hetzner/server/
  cp ./src/infra.hetzner/provider.tf ./src/infra.hetzner/load-test-server/
  cp ./src/infra.hetzner/variables.tf ./src/infra.hetzner/load-test-server/

  just -f ./.justfiles/infra.just --working-directory . destroy-publish-stage main {{stage}}

  rm -rf ./src/infra.hetzner/server/terraform.tfstate.d
  rm -rf ./src/infra.hetzner/server/.terraform
  rm -f ./src/infra.hetzner/server/.terraform.lock.hcl

destroy-publish-stage app_stage publish_stage app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd ./src/infra.hetzner/server

  export TF_VAR_app_stage={{app_stage}}
  export TF_VAR_publish_stage={{publish_stage}}
  export TF_VAR_app_location={{app_location}}

  export hetzner_api_token="{{app_stage}}_hetzner_api_token"
  export TF_VAR_hetzner_api_token=`echo "${!hetzner_api_token}"`

  # FIXME Not used when destroying, but not sure how to force require in Terraform when creating but not when destroying.
  export TF_VAR_meblog_private_repo_name="i"
  export TF_VAR_github_token="am"
  export TF_VAR_meblog_release_version="not"
  export TF_VAR_meblog_registry_directory="your"
  export TF_VAR_meblog_media_directory="father"
  export TF_VAR_restrict_to_public_ip="0.0.0.0/32"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-web"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-web does not exist!"
    exit 1
  fi

  terraform destroy -auto-approve

[arg("force-replace", long="force-replace", value="true")]
start-load-test app_stage publish_stage force-replace="false" app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  if [[ "${publish_stage}" != "dev" ]]; then
    echo "only dev publish stage supported for load tests"

    exit 1
  fi

  cd ./src/infra.hetzner/load-test-server

  export TF_VAR_app_stage={{app_stage}}
  export TF_VAR_publish_stage={{publish_stage}}
  export TF_VAR_app_location={{app_location}}

  # Used to clone this source on the VM. Always clone private source.
  export TF_VAR_meblog_private_repo_name=`echo ${meblog_private_repo_name}`

  export hetzner_api_token="{{app_stage}}_hetzner_api_token"
  export TF_VAR_hetzner_api_token=`echo "${!hetzner_api_token}"`

  # Used to clone this source on the VM.
  export github_token="{{app_stage}}_github_token"
  export TF_VAR_github_token=`echo "${!github_token}"`

  # FIXME Not used when deploying load test infra, but do not want to make another variables file.
  export TF_VAR_meblog_registry_directory="not used"
  export TF_VAR_meblog_media_directory="not used"

  # Some firewall rules restricted to public IP.
  export TF_VAR_restrict_to_public_ip=`curl ipinfo.io/ip`
  export TF_VAR_restrict_to_public_ip="${TF_VAR_restrict_to_public_ip}/32"

  # You create load test server "publish stages" in Terraform using their "workspaces".
  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-load-test"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-load-test"
  else
    terraform workspace new "{{app_location}}-{{app_stage}}-{{publish_stage}}-load-test" # Create a new workspace and switch to it.
  fi

  terraform init
  terraform plan

  if [[ "{{force-replace}}" == "true" ]]; then
    terraform apply -replace="hcloud_server.meblog_load_test_server" -auto-approve
  else
    terraform apply -auto-approve
  fi

# This runs on the hosting provider's VM.
# On VM boot, start the load test orchestrator.
# When you want to update runtime dependencies for VMs, replace the VMs.
configure-load-test-vm app_stage publish_stage:
  #!/usr/bin/env bash
  set -euxo pipefail

  if [[ "${publish_stage}" != "dev" ]]; then
    echo "only dev publish stage supported for load tests"

    exit 1
  fi

  just -f ./.justfiles/infra.just --working-directory . _configure-vm-ssh
  just -f ./.justfiles/infra.just --working-directory . _configure-vm-nodejs

  # Scrub secrets you do not want kept around.
  sed -i '/hetzner_api_token/d' {{source_dir}}/config/.env
  sed -i '/porkbun_api_key/d' {{source_dir}}/config/.env
  sed -i '/porkbun_api_secret/d' {{source_dir}}/config/.env

  sed -i '/hetzner_api_token/d' /opt/app/meblog.env

  history -c

  # FIXME start the orchestrator.

  systemctl restart ssh

stop-load-test app_stage publish_stage app_location="hosted":
  #!/usr/bin/env bash
  set -euxo pipefail

  if [[ "${publish_stage}" != "dev" ]]; then
    echo "only dev publish stage supported for load tests"

    exit 1
  fi

  cd ./src/infra.hetzner/load-test-server

  export TF_VAR_app_stage={{app_stage}}
  export TF_VAR_publish_stage={{publish_stage}}
  export TF_VAR_app_location={{app_location}}

  export hetzner_api_token="{{app_stage}}_hetzner_api_token"
  export TF_VAR_hetzner_api_token=`echo "${!hetzner_api_token}"`

  # FIXME Not used when destroying, but not sure how to force require in Terraform when creating but not when destroying.
  export TF_VAR_meblog_private_repo_name="i"
  export TF_VAR_github_token="am"
  export TF_VAR_meblog_registry_directory="your"
  export TF_VAR_meblog_media_directory="father"
  export TF_VAR_restrict_to_public_ip="0.0.0.0/32"

  if terraform workspace list | grep "{{app_location}}-{{app_stage}}-{{publish_stage}}-load-test"; then
    terraform workspace select "{{app_location}}-{{app_stage}}-{{publish_stage}}-load-test"
  else
    echo "{{app_location}}-{{app_stage}}-{{publish_stage}}-load-test does not exist!"
    exit 1
  fi

  terraform destroy -auto-approve

[arg("dry-run", long="dry-run", value="true")]
push-to-public-repo dry-run="false":
  # Push changes of _this_ private repository first in case something breaks.
  git add -A; git commit -m "Pushing to the public repository"; git push origin main

  ./build-utils/infra/github.push-to-public-repo.sh "{{dry-run}}"

[arg("dry-run", long="dry-run", value="true")]
github-release dry-run="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  # Github releases are _only_ pushed to the private Github repository,
  #  even though the releases themselves are built for the prod publish stage.
  # The public source code is NOT correlated with prod...it is just there for visibility.
  github_token="${main_github_token}" github_username="${main_github_username}" meblog_private_repo_name="${meblog_private_repo_name}" \
    ./build-utils/infra/github.update-release.sh "{{dry-run}}"

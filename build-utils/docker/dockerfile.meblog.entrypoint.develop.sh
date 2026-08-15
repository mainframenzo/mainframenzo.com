#!/usr/bin/env bash
# This file is responsible for running local infra for website and api development inside a container.
set -euxo pipefail

export is_docker="true"
# See: https://github.com/ollama/ollama/blob/main/docs/linux.md

ls -al $HOME
ls -al /opt/app
ls -al /opt/app/meblog
cd /opt/app/meblog

sysctl fs.inotify.max_user_watches=524288
sysctl fs.inotify.max_user_instances=1024

# FIXME detect if offline and use the built-in node_modules?
# Install NPM dependencies again because node_modules gets mounted from a potentially different arch.
# Also, there's not that many and it's much faster than re-building our development environment.
rm -rf node_modules
just -f ./.justfiles/dev.just --working-directory . setup --skip-python-deps

# FIXME Moved to pixi...still an issue?
# FIXME Not sure why `pip install bpy` (via conda) does not actually work.
# This lets us "python -c 'import bpy'" rather than "blender -b -p 'import bpy'".
rm -rf /opt/app/meblog/bpy && mkdir -p /opt/app/meblog/bpy && cp -R /usr/local/blender/4.2/python/lib/python3.11/* /opt/app/meblog/bpy/
# /opt/conda/envs/meblog/lib/python3.10/site-packages/bpy

# Update Visual Studio Code Server settings.
cp /opt/app/meblog/build-utils/docker/vscode.settings.json ${HOME}/.local/share/code-server/User/settings.json
cp /opt/app/meblog/build-utils/docker/vscode.launch.json ${HOME}/.local/share/code-server/User/launch.json

# This lets us use OCP CAD Viewer through browser-based Visual Studio Code.
/usr/bin/code-server \
  --bind-addr 0.0.0.0:8082 \
  --config /root/.config/code-server/config.yaml \
  --auth none \
  --disable-workspace-trust \
  --disable-getting-started-override \
  --disable-telemetry \
  --disable-update-check \
  /opt/app/meblog 2>&1 &

# You mimic the hosted environment when using Docker, where nginx, fail2ban, and ufw are involved.
# You can make use of some of the hosted infra setup, but the above softwares require require both local and container-specific config.

# Mimic letsencrypt certs.
mkdir -p /etc/letsencrypt/live/dev-cert
cp /opt/app/meblog/config/local.dev+2.pem /etc/letsencrypt/live/dev-cert/cert.pem
cp /opt/app/meblog/config/local.dev+2-key.pem /etc/letsencrypt/live/dev-cert/privkey.pem
cp /opt/app/meblog/config/local.dev.chain.pem /etc/letsencrypt/live/dev-cert/chain.pem

just -f ./.justfiles/infra.just --working-directory . update-nginx-conf "dev" "local" "dev-cert" "0.0.0.0"

# Override the release dir that gets copied to /var/www/html with your frontend dist.
mkdir -p /opt/app/meblog/dist.frontend # In case the dir doesn't exist yet.
just -f ./.justfiles/infra.just --working-directory . configure-nginx "/opt/app/meblog/dist.frontend"

# Configure fail2ban to use polling instead of systemd.
cp /opt/app/meblog/config/fail2ban/jail.local /tmp/jail.local
sed -i 's/^#\s*backend\s*=\s*polling/backend = polling/' /tmp/jail.local

cp /opt/app/meblog/config/fail2ban/filter.d/* /etc/fail2ban/filter.d/
cp /tmp/jail.local /etc/fail2ban/jail.local
/usr/bin/fail2ban-server -x start 2>&1 &

# You are skipping ufw for these reasons: https://github.com/HexmosTech/udwall
#just -f ./.justfiles/infra.just --working-directory . configure-vm-firewall

nginx -g 'daemon off;' 2>&1 &

# FIXME How does this work with vite now?
# Don't start the webserver, just the processes that watch and build the frontend dist, and livereload.
just -f ./.justfiles/frontend.just --working-directory . develop-website ${skip_build_parts_libraries} ${skip_build_one_offs} --no-webserver 2>&1 &

# You don't use the dist.frontend dir directly in Docker because of nginx.
# The "configure-nginx" command generates gzip files and also changes permissions,
#  and your host OS source is mounted - you don't want to modify anything.
# FIXME can you just change mount to read and then have your changes on host OS make it and prep for nginx also make it?
# Instead run a sync script to use inotifywait to update /var/www/html when dist.frontend changes.
just -f ./.justfiles/frontend.just --working-directory . sync-dist "/opt/app/meblog/dist.frontend" "/var/www/html" &

# Changes made to the backend files restart the Node.js process (wrapped by nodemon).
just -f ./.justfiles/infra.just --working-directory . configure-vm-backend "development" "local" "dev" "local"

# This lets us use the xfce desktop environment through VNC for GUI-based parts library development.
vncserver $DISPLAY -geometry 1280x800 -depth 24 && tail -f $HOME/.vnc/*:1.log

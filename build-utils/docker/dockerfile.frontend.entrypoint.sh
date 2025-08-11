#!/bin/bash
set -ex

# FIXME conda not on PATH without running "source ~/.bash_profile",
#  which activates base conda env, which is not wanted, because then
#  we are running "conda run ..." from inside conda env,
#  and that seems to cause problems sometimes.
# In container, this doesn't actually appear to be an issue?
set +e
conda deactivate
set -e

ls -al $HOME
ls -al /opt/app
ls -al /opt/app/meblog
cd /opt/app/meblog

# FIXME Not sure why `pip install bpy` (via conda) does not actually work.
# This lets us "python -c 'import bpy'" rather than "blender -b -p 'import bpy'".
rm -rf /opt/app/meblog/bpy && mkdir -p /opt/app/meblog/bpy && cp -R /usr/local/blender/4.2/python/lib/python3.11/* /opt/app/meblog/bpy/
# /opt/conda/envs/meblog/lib/python3.10/site-packages/bpy

# Update Visual Studio Code Server settings.
cp /opt/app/meblog/build-utils/docker/vscode.settings.json ${HOME}/.local/share/code-server/User/settings.json
cp /opt/app/meblog/build-utils/docker/vscode.launch.json ${HOME}/.local/share/code-server/User/launch.json

# This lets us use OCP CAD Viewer through browser-based Visual Studio Code.
/usr/bin/code-server \
  --bind-addr 0.0.0.0:8081 \
  --config /root/.config/code-server/config.yaml \
  --auth none \
  --disable-workspace-trust \
  --disable-getting-started-override \
  --disable-telemetry \
  --disable-update-check \
  /opt/app/meblog 2>&1 &

# This serves the website.
make build_parts_libraries="$build_parts_libraries" develop/website test.log 2>&1 &

# This lets us use the xfce desktop environment through VNC for GUI-based parts library development.
vncserver $DISPLAY -geometry 1280x800 -depth 24 && tail -f $HOME/.vnc/*:1.log
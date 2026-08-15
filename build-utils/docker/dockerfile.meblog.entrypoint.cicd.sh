#!/usr/bin/env bash
# This file is responsible for running the build and relase portion of CICD inside a container.
# You can invoke CICD manually, but more than likely it will be running hosted
#  after a "git push" webhook from Github triggers it to start.
# This container just creates artifacts, it doesn't update the website or backend's "content" -
#  that's left to the backend, which is controlling the CICD lifecycle.
set -euxo pipefail

echo "CICD docker entrypoint app_stage=${app_stage} publish_stage=${publish_stage} app_location=${app_location} skip_build_parts_libraries=${skip_build_parts_libraries} skip_build_one_offs=${skip_build_one_offs} skip_render_images_of_parts=${skip_render_images_of_parts}"

ls -al $HOME
ls -al /opt/app
ls -al /opt/app/meblog-cicd-output

# FIXME Updater Docker image.
apt-get update -y
apt-get remove firefox -y
add-apt-repository -y ppa:mozillateam/ppa
echo 'Package: *\nPin: release o=LP-PPA-mozillateam\nPin-Priority: 1001' > /etc/apt/preferences.d/mozilla-ppa
apt-get update -y && apt-get install -y firefox-esr

cd /opt/app/meblog-cicd-output

if [[ "${app_location}" == "hosted" ]]; then
	# Remove any changes that might have been made to the source.
	git reset --hard origin main
	# Get the latest source.
	git pull origin main
fi

# FIXME Moved to pixi...still an issue?
# FIXME Not sure why `pip install bpy` (via conda) does not actually work.
# This lets us "python -c 'import bpy'" rather than "blender -b -p 'import bpy'".
rm -rf /opt/app/meblog-cicd-output/bpy && mkdir -p /opt/app/meblog-cicd-output/bpy && cp -R /usr/local/blender/4.2/python/lib/python3.11/* /opt/app/meblog-cicd-output/bpy/
# /opt/conda/envs/meblog/lib/python3.10/site-packages/bpy

just -f ./.justfiles/dev.just --working-directory . setup
just -f ./.justfiles/auditing.just --working-directory . scan
just -f ./.justfiles/backend.just --working-directory . tests-unit

# FIXME If this is dev CICD, you aren't shipping a release, but for prod, you need to.
just -f ./.justfiles/frontend.just --working-directory . build-website "${NODE_ENV}" "${app_stage}" "${publish_stage}" "${app_location}" ${skip_build_parts_libraries} ${skip_build_one_offs} ${skip_render_images_of_parts} ${fast_render}

# FIXME Get resume download generation working - this requires a built website,
#  after which you add the generated download formats to the build output.
#just -f ./.justfiles/frontend.just --working-directory . generate-downloads

# FIXME The release needs to hold more than the frontend now...it needs a backend.dist.
# You haven't had good luck with packaging Node.js binaries.

# You need to validate the website built as expected.
# Serve the website and backend and run functional and integration tests.
just -f ./.justfiles/frontend.just --working-directory . serve &
just -f ./.justfiles/backend.just --working-directory . run development local dev local &

sleep 10

just -f ./.justfiles/backend.just --working-directory . tests-functional-curl
just -f ./.justfiles/frontend.just --working-directory . tests-integration-e2e "${NODE_ENV}" "${app_stage}" "${publish_stage}" "${app_location}"

# FIXME pen-test
#just -f ./.justfiles/dev.just --working-directory . pen-test "${app_stage}" "${publish_stage}" "${app_location}" "owasp-asvs"
#just -f ./.justfiles/dev.just --working-directory . pen-test "${app_stage}" "${publish_stage}" "${app_location}" "ai"

#!/usr/bin/env bash
# This file is responsible for building and pushing the dist.frontend.release dir as a Github release to the private repository.
# The release is always meant for the _prod_ stage, i.e. it is pruned of "private" stuff.
set -euxo pipefail

dry_run="$1"
cwd=$(pwd)
tmp_dir=$(mktemp -d -t)

# Package the build output into the asset we'll attach to the release.
zip_file_path="${tmp_dir}/dist.frontend.release.zip"
cd ${cwd}/dist.frontend.release
zip -r "${zip_file_path}" .
cd ${cwd}

if [[ "${dry_run}" == "true" ]]; then
  echo "dry run complete"

  exit 0
fi

# Push a release to the private repository.
# The version you are releasing is specified in package.json (by way of ./.npm/npm.ts).
version=$(jq -r '.version' "${cwd}/package.json")
tag="v${version}"
asset_name="mainframenzo.com-${tag}.zip"
release_title="${tag}"
release_body="Latest public release: $(date +%s)"

github_api_url="https://api.github.com"
github_uploads_url="https://uploads.github.com"
github_api_version="2022-11-28"
owner="${github_username}"
repo="${meblog_private_repo_name}"
github_headers=(
  -H "Accept: application/vnd.github+json"
  -H "Authorization: Bearer ${github_token}"
  -H "X-GitHub-Api-Version: ${github_api_version}"
)

# Is there an existing release? 404 or non-200 === no.
release_lookup_file="${tmp_dir}/release-lookup.json"
release_http_status=$(curl -s -o "${release_lookup_file}" -w '%{http_code}' "${github_headers[@]}" \
  "${github_api_url}/repos/${owner}/${repo}/releases/tags/${tag}")

if [[ "${release_http_status}" == "200" ]]; then
  release_id=$(jq -r '.id' "${release_lookup_file}")

  # Update the release metadata.
  # It shouldn't change, but just in case you chnage title/body, it can.
  release_update_file="${tmp_dir}/release-update.json"
  release_update_status=$(curl -s -o "${release_update_file}" -w '%{http_code}' -X PATCH "${github_headers[@]}" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg name "${release_title}" --arg body "${release_body}" '{name: $name, body: $body}')" \
    "${github_api_url}/repos/${owner}/${repo}/releases/${release_id}")

  if [[ "${release_update_status}" != "200" ]]; then
    echo "Failed to update release '${tag}', status code is ${release_update_status}"
    cat "${release_update_file}"

    exit 1
  fi

  # Delete the existing asset. It no longer matters. Be done with it. Bye.
  existing_asset_id=$(jq -r --arg name "${asset_name}" '.assets[]? | select(.name == $name) | .id' "${release_lookup_file}")

  if [[ -n "${existing_asset_id}" ]]; then
    asset_delete_file="${tmp_dir}/asset-delete.json"
    asset_delete_status=$(curl -s -o "${asset_delete_file}" -w '%{http_code}' -X DELETE "${github_headers[@]}" \
      "${github_api_url}/repos/${owner}/${repo}/releases/assets/${existing_asset_id}")

    if [[ "${asset_delete_status}" != "204" ]]; then
      echo "Failed to delete existing asset '${asset_name}', status code is ${asset_delete_status}"
      cat "${asset_delete_file}"

      exit 1
    fi
  fi
elif [[ "${release_http_status}" == "404" ]]; then
  # No release exists yet! Create a release.
  release_create_file="${tmp_dir}/release-create.json"

  curl -s -o "${release_create_file}" -X POST "${github_headers[@]}" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg tag "${tag}" --arg name "${release_title}" --arg body "${release_body}" '{tag_name: $tag, name: $name, body: $body}')" \
    "${github_api_url}/repos/${owner}/${repo}/releases"

  release_id=$(jq -r '.id' "${release_create_file}")
else
  echo "Something went really wrong for release '${tag}', status code is ${release_http_status}"
  cat "${release_lookup_file}"

  exit 1
fi

# Upload the zip file as an asset to the release.
encoded_asset_name=$(jq -rn --arg name "${asset_name}" '$name | @uri')
upload_response_file="${tmp_dir}/release-upload.json"
curl -s -o "${upload_response_file}" -X POST "${github_headers[@]}" \
  -H "Content-Type: application/zip" \
  --data-binary "@${zip_file_path}" \
  "${github_uploads_url}/repos/${owner}/${repo}/releases/${release_id}/assets?name=${encoded_asset_name}"

cat "${upload_response_file}"

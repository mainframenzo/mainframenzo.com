# This file is responsible for defining utility dev tasks.
import "../.justfiles/common.just"

fixup-images image_dir_path:
  ./build-utils/scripts/fixup-images.sh "{{source_dir}}/{{image_dir_path}}"

fixup-videos:
  echo "FIXME"

fixup-video input_file output_file:
  ffmpeg -i {{input_file}} -c:v libx265 -preset fast -crf 28 -tag:v hvc1 -c:a eac3 -b:a 224k {{output_file}}

[arg("dry-run", long="dry-run", value="true")]
convert-spotify-playlists dry-run="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  rm -rf {{source_dir}}/src/frontend/playlists/converted
  mkdir -p {{source_dir}}/src/frontend/playlists/converted

  for playlist_file_path in $(find src/frontend/playlists/sources -name '*.csv'); do
    playlist_name=$(basename "$playlist_file_path" .csv)

    NODE_ENV={{node_env}} node \
      --experimental-specifier-resolution=node \
      --experimental-modules \
      --no-warnings \
      --trace-uncaught \
      --enable-source-maps \
      --import tsx/esm \
      ./build-utils/scripts/convert-spotify-playlist.ts \
      --playlist-file-path="${playlist_file_path}" \
      --playlist-output-file-path="{{source_dir}}/src/frontend/playlists/converted/${playlist_name}.csv" \
      --dry-run={{dry-run}}
  done

[arg("dry-run", long="dry-run", value="true")]
fixup-playlist-urls playlist_file_path dry-run="false":
  NODE_ENV={{node_env}} node \
    --experimental-specifier-resolution=node \
    --experimental-modules \
    --no-warnings \
    --trace-uncaught \
    --enable-source-maps \
    --import tsx/esm \
    ./build-utils/scripts/fixup-playlist-urls.ts \
    --playlist-file-path="{{playlist_file_path}}" \
    --dry-run={{dry-run}}

[arg("dry-run", long="dry-run", value="true")]
download-playlist-media playlist_file_path dry-run="false":
  NODE_ENV={{node_env}} node \
    --experimental-specifier-resolution=node \
    --experimental-modules \
    --no-warnings \
    --trace-uncaught \
    --enable-source-maps \
    --import tsx/esm \
    ./build-utils/scripts/download-playlist-media.ts \
    --playlist-file-path="{{playlist_file_path}}" \
    --dry-run={{dry-run}}

test:
  # Backup the tests dir.
  cp -R {{source_dir}}/src/tests.unit /tmp/tests.unit

  identify -verbose ./src/tests.unit/IMG_1001.JPEG
  identify -verbose ./src/tests.unit/IMG_1254.PNG

  just -f ./.justfiles/utils.just --working-directory . fixup-images "src/tests.unit"

  # Validate exif scrubbed and renamed.
  ls -al {{source_dir}}/src/tests.unit
  identify -verbose ./src/tests.unit/img_1.jpg | grep -q "exif" && { echo "Test failed, image still contains exif metadata"; rm -rf {{source_dir}}/src/tests.unit && mv /tmp/tests.unit {{source_dir}}/src/; exit 1; } || true
  identify -verbose ./src/tests.unit/img_2.jpg | grep -q "exif" && { echo "Test failed, image still contains exif metadata"; rm -rf {{source_dir}}/src/tests.unit && mv /tmp/tests.unit {{source_dir}}/src/; exit 1; } || true

  rm -rf {{source_dir}}/src/tests.unit && mv /tmp/tests.unit {{source_dir}}/src/

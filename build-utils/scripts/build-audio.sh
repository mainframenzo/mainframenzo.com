#!/bin/bash
# This file is responsible for combining all .ogg audio files for a post into a single mp3 file.
set -ex

if [ -z "$2" ]; then
  echo "Please supply <post_dir> and <ogg_files>."
  exit 1
fi

post_dir="$1"
ogg_files="$2"

IFS=' ' read -r -a array <<< "$ogg_files"

ffmpeg_command="ffmpeg -i \"concat:"

for ogg_file_path in "${array[@]}"; do
  echo "ogg_file_path=$ogg_file_path"
  ffmpeg_command="$ffmpeg_command|$ogg_file_path"
done

ffmpeg_command="$ffmpeg_command\" -c copy ${post_dir}/audio.ogg"

ffmpeg_command=$(echo $ffmpeg_command | sed "s/:|/:/g")

echo "ffmpeg_command=$ffmpeg_command"
eval $ffmpeg_command
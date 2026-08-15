# This file is responsible for defining one-off dev tasks for the playlist analyzer.
import "../.justfiles/common.just"

src_root := "./src/frontend/one-offs/playlist-analyzer"

setup:
  cd {{src_root}} && pixi install

run-all-in-one-infer-analyzer app_stage="local" playlist-path="":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd {{src_root}}

  if [[ "{{playlist-path}}" == "" ]]; then
    echo "specify path to playlist"
    exit 1
  fi

  export stage_media_directory="{{app_stage}}_media_directory"
  export meblog_media_directory=`echo "${!stage_media_directory}"`

  # Grab the media path on disk from the YouTube video ID of each song.
  youtube_video_ids=()
  while IFS= read -r id; do
    youtube_video_ids+=("${id}")
  done < <(
    grep -oE '(v=|youtu\.be/)[A-Za-z0-9_-]{6,}' "{{playlist-path}}" \
      | sed -E 's#^(v=|youtu\.be/)##'
  )

  echo "downloaded_youtube_video_ids video ids: ${#youtube_video_ids[@]}"

  downloaded_youtube_video_ids=()
  missing_youtube_video_ids=()

  for id in "${youtube_video_ids[@]}"; do
    file="${meblog_media_directory}/${id}.webm"
    echo "testing ${file}"

    if [[ -f "${file}" ]]; then
      downloaded_youtube_video_ids+=("${file}")
    else
      missing_youtube_video_ids+=("${id}")
    fi
  done

  if [[ ${#missing_youtube_video_ids[@]} -gt 0 ]]; then
    echo "missing ${#missing_youtube_video_ids[@]} file(s):"
    echo "- ${missing_youtube_video_ids[@]}"
  fi

  if [[ ${#downloaded_youtube_video_ids[@]} -eq 0 ]]; then
    echo "nothing to analyze, exiting"
    exit 0
  fi

  mkdir -p "{{source_dir}}/src/frontend/public/playlist-analyzer/all-in-one-infer/data"

  # Generate the JSON analyses.
  #pixi run all-in-one-infer -o "{{source_dir}}/src/frontend/public/playlist-analyzer/all-in-one-infer/data" -d "cpu" "${downloaded_youtube_video_ids[@]}"

  # FIXME One day you will get this to work with a GPU.
  # A playlist of songs takes too long ATM,
  #  so generate 1 analyses at a time.
  for file_path in "${downloaded_youtube_video_ids[@]}"; do
    echo ""
    echo "analyzing ${file_path}"

    HF_HUB_OFFLINE=1 pixi run all-in-one-infer -o "{{source_dir}}/src/frontend/public/playlist-analyzer/all-in-one-infer/data" -d "cpu" ${file_path}
  done

  # Render the visualization images.
  pixi run python all1infer_renderer.py --csv {{playlist-path}}

run-essentia-analyzer app_stage="local" playlist-path="":
 #!/usr/bin/env bash
  set -euxo pipefail

  cd {{src_root}}

  if [[ "{{playlist-path}}" == "" ]]; then
    echo "specify path to playlist"
    exit 1
  fi

  export stage_media_directory="{{app_stage}}_media_directory"
  export meblog_media_directory=`echo "${!stage_media_directory}"`

  # Grab the media path on disk from the YouTube video ID of each song.
  youtube_video_ids=()
  while IFS= read -r id; do
    youtube_video_ids+=("${id}")
  done < <(
    grep -oE '(v=|youtu\.be/)[A-Za-z0-9_-]{6,}' "{{playlist-path}}" \
      | sed -E 's#^(v=|youtu\.be/)##'
  )

  echo "downloaded_youtube_video_ids video ids: ${#youtube_video_ids[@]}"

  downloaded_youtube_video_ids=()
  missing_youtube_video_ids=()

  for id in "${youtube_video_ids[@]}"; do
    file="${meblog_media_directory}/${id}.webm"
    echo "testing ${file}"

    if [[ -f "${file}" ]]; then
      downloaded_youtube_video_ids+=("${file}")
    else
      missing_youtube_video_ids+=("${id}")
    fi
  done

  if [[ ${#missing_youtube_video_ids[@]} -gt 0 ]]; then
    echo "missing ${#missing_youtube_video_ids[@]} file(s):"
    echo "- ${missing_youtube_video_ids[@]}"
  fi

  if [[ ${#downloaded_youtube_video_ids[@]} -eq 0 ]]; then
    echo "nothing to analyze, exiting"
    exit 0
  fi

  mkdir -p "{{source_dir}}/src/frontend/public/playlist-analyzer/essentia"

  pixi run python essentia_analyzer.py "${downloaded_youtube_video_ids[@]}"

# Generate a CSV file from all analyses that contains summarized data
#  used to render analyses tables of playlists.
summarize playlist-path="":
  #!/usr/bin/env bash
  set -euxo pipefail

  cd {{src_root}}

  pixi run python summarize.py --csv "{{playlist-path}}"

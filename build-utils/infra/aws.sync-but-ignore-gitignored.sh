#!/bin/bash
# This file is responsible for syncing files needed for CICD to a bucket.
set -e

exclude_args=""
while read -r line; do
  if [[ "$line" =~ ^#.*$ ]]; then
    echo "ignore $line" # Removes comments.
  else 
    if [[ ! -z "$line" ]]; then
      exclude_args="$exclude_args --exclude '$line'"
    fi
  fi
done < ".gitignore"

exclude_args=$(echo $exclude_args | sed "s/--exclude ''//g") # Removes --exclude '' from unscrubbed newlines if there are any.
cmd="aws s3 sync ./ $1 --delete --region $2 $3 $exclude_args --exclude '*.git/*'"
echo "$cmd"
eval $cmd
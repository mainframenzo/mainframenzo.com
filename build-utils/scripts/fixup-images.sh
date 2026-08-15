#!/usr/bin/env bash
# This file is responsible for "fixing up" images and covers most of my use-cases.
# Fixing up means:
# * Renaming to lowercase
# * Converting heic/png/jpeg to jpg
# * Scrubbing metadata
# * For files prefixed with img_<number>.jpg, order them from 1 to N (they get pulled off the phone in the format IMG_<number>.HEIC). 
set -euxo pipefail

if [ -z "$1" ]; then
  echo "Please supply <image_dir>."
  exit 1
fi

image_dir="$1"

to_lowercase_filenames() {
  echo "to_lowercase_filenames"

  for file_path in "$image_dir"/*; do 
    dir_name=$(dirname "$file_path")
    file_name=$(basename "$file_path")
    new_name=$(echo "$file_name" | tr '[:upper:]' '[:lower:]')
    
    if [ "$file_name" != "$new_name" ]; then
      echo "existing file name: $file_name"
      echo "new file name: $new_name"
      mv "$file_path" "$dir_name/$new_name"
    fi
  done
}

heic_to_jpg() {
  echo "heic_to_jpg"

  set +e
  magick mogrify -monitor -format jpg $image_dir/img_*.heic
  set -e
}

png_to_jpg() {
  echo "png_to_jpg"

  set +e
  magick mogrify -monitor -format jpg $image_dir/img_*.png
  set -e
}

jpeg_to_jpg() {
  echo "jpeg_to_jpg"
  find $image_dir/ -name "img_*.jpeg" -print0 | sort -rz | while read -d $'\0' f; do mv -v "$f" "$(dirname "$f")/$(basename "${f//.jpeg/.jpg}")"; done
}

scrub_metadata() {
	echo "scrub_metadata"

  find $image_dir/ -name "img_*.jpg" -print0 | sort -rz | while read -d $'\0' f; do jpegtran -copy none -optimize "$f" > /tmp/noexif.jpg && mv /tmp/noexif.jpg "$f"; done
}

to_incremented_imgs() {
  echo "to_incremented_imgs"

  ls -al $image_dir
  cd $image_dir
  ls -v | egrep '\.jpg$' | cat -n | while read n f; do rename_image "$f" "$n"; done
}

rename_image() {
  echo "rename_image $1 $2"

  f="$1"
  n="$2"

  filename=$(basename -- "$f")
  extension="${filename##*.}"
  
  echo "extension: $extension"

  # FIXME includes img_ and .jpg
  if [[ $f == *"img_"* ]] && [[ "$extension" -eq "jpg" ]]; then
    mv -n "$f" "img_$n.jpg"
  fi
}

to_lowercase_filenames
heic_to_jpg
png_to_jpg
jpeg_to_jpg
scrub_metadata
to_incremented_imgs
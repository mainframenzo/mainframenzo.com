#!/bin/bash
# This file is responsible for "fixing up" images and covers most of my use-cases.
set -ex

if [ -z "$1" ]; then
  echo "Please supply <image_dir>."
  exit 1
fi

image_dir="$1"

to_lowercase_filenames() {
  echo "to_lowercase_filenames"

  for f in $image_dir/*; do new_name=$(echo "$f" | tr '[:upper:]' '[:lower:]'); mv "$f" "$new_name"; done
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
  # FIXME Remove metadata (we'll add descriptions to metadata after this and keep them, though).
  # brew install jpegtran
  #https://stackoverflow.com/questions/2654281/how-to-remove-exif-data-without-recompressing-the-jpeg
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

  file_extension="todo"

  filename=$(basename -- "$f")
  extension="${filename##*.}"
  
  echo "extension: $extension"

  # TODO includes img_ and .jpg
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
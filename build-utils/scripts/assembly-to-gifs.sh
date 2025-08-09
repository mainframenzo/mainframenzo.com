#!/bin/bash
set -ex

source activate base
conda activate meblog
blender -noaudio -b -P ./src/parts-library-tools/assembly-to-gifs.py -- "$1" "$2" "$3" &> blender.txt
conda deactivate
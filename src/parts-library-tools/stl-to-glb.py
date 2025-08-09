
# This file is responsible for converting .stl files to .glb files.
import sys
from meblog.build123d_utils import from_assembly_file, render_assembly_to_png
import trimesh

argv = sys.argv
argv = argv[argv.index('--') + 1:] # Get all args after "--".
input_file = argv[0]
output_file = argv[1]

def main():
  print('main')

  trimesh.util.attach_to_log()

  _stl_to_glb(input_file, output_file)

def _stl_to_glb(input_file, output_file):
  print('_stl_to_glb', input_file, output_file)

  scene = trimesh.load(input_file, force='scene')
  scene.export(output_file)

if __name__ == '__main__':
  main()
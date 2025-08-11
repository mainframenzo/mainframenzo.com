
# This file is responsible for rendering build123d assemblies as .png files.
import sys
from meblog.build123d_utils import from_assembly_file, render_assembly_to_png

argv = sys.argv
argv = argv[argv.index('--') + 1:] # Get all args after "--".
input_file = argv[0]
output_file = argv[1]

def main():
  print('main')

  assembly, _locals = from_assembly_file(input_file)

  # TODO More angles.
  render_assembly_to_png(assembly, output_file)

if __name__ == '__main__':
  main()

# This file is responsible for exporting all parts in a build123d assembly as individual .stl files.
import sys
from meblog.build123d_utils import from_assembly_file, assembly_parts_to_stls

argv = sys.argv
argv = argv[argv.index('--') + 1:] # Get all args after "--".
input_file = argv[0]
output_dir = argv[1]

def main():
  print('main')

  assembly, _locals = from_assembly_file(input_file)
  assembly_parts_to_stls(assembly, output_dir)

if __name__ == '__main__':
  main()
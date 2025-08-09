
# This file is responsible for converting all .dxfs to .stl files.
import sys
from meblog.build123d_utils import dxf_to_svg

argv = sys.argv
argv = argv[argv.index('--') + 1:] # Get all args after "--".
input_file = argv[0]
output_file = argv[1]

def main():
  print('main')

  dxf_to_svg(input_file, output_file)

if __name__ == '__main__':
  main()
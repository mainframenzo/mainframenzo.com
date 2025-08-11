# This file is responsible for providing a simple sanity check you can run inside an activated conda environment. 
# build123d dependencies often give us trouble.
# References:
# * https://build123d.readthedocs.io/en/latest/introductory_examples.html#simple-rectangular-plate
from build123d import *

length, width, thickness = 80.0, 60.0, 10.0

with BuildPart() as ex1:
  Box(length, width, thickness)

print(ex1.part.show_topology())
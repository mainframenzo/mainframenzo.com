import unittest
import sys
import os
import bpy
from build123d import *
import tempfile
from pathlib import Path

# Add tests to PYTHONPATH.
sys.path.append(f"{os.getcwd()}/src/parts-library-tools")

from meblog import utils
from meblog import blender_utils
from meblog import blender_camera_utils

class TestUtils(unittest.TestCase):
  def test_load_build123d_assembly_in_blender(self):
    box = Box(1, 1, 1)
    assembly = Compound(label='assembly', children=[box])

    # Our assembly contract expects these.
    assembly.units = Unit.IN
    assembly.tolerance = 0.01
    assembly.angular_tolerance = 0.01

    blender_utils.init_scene()

    utils.load_build123d_assembly_in_blender(assembly, {})

    _, png_file_path = tempfile.mkstemp(suffix = '.png')

    _scene_to_png(png_file_path)

    #self.assertEqual(build123d_utils.test, 10)

def _scene_to_png(png_file_path: str):
  print('_scene_to_png', png_file_path)

  # Create parent directories if they don't exist.
  output_directory = os.path.dirname(png_file_path)
  path = Path(output_directory)
  path.mkdir(parents=True, exist_ok=True)

  # Lights.
  bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
  light = bpy.context.active_object
  light.data.energy = 5

  for obj in bpy.context.visible_objects:
    if not (obj.hide_get() or obj.hide_render) and obj.name == 'assembly':
      obj.select_set(True)

      bpy.ops.view3d.camera_to_view_selected()

      blender_camera_utils.zoom_extents(obj)

  bpy.ops.render.render(write_still=True) # Tell Blender to render an image.

if __name__ == '__main__':
  unittest.main()
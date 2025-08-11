
# This file is responsible for rendering build123d assemblies as .gif files, but with physics.
# A .gif is created based on each unique load scenario defined by the assembly.
import sys
import bpy
import os
from pathlib import Path
from mathutils import Vector

from meblog.utils import load_build123d_assembly_in_blender
from meblog.build123d_utils import from_assembly_file, assembly_to_stl
from meblog.blender_utils import init_scene, load_assembly_rididbody_simulation
from meblog.blender_camera_utils import zoom_extents

argv = sys.argv
argv = argv[argv.index('--') + 1:] # Get all args after "--".
input_file = argv[0]
output_file = argv[1]
print('blender args', argv)
print('input_file', input_file)
print('output_file', output_file)

def main():
  print('main')

  assembly, locals = from_assembly_file(input_file)
  assembly_to_stl(assembly, output_file)
  load_build123d_assembly_in_blender(assembly, locals)

  # Create parent directories if they don't exist.
  output_directory = os.path.dirname(output_file)
  path = Path(output_directory)
  path.mkdir(parents=True, exist_ok=True)

  init_scene()

  # Lights.
  bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
  light = bpy.context.active_object
  light.data.energy = 5

  bpy.ops.rigidbody.world_add()
  bpy.context.scene.rigidbody_world.gravity = (0, 0, -9.81)

  bpy.context.scene.render.image_settings.file_format = 'PNG'
  #bpy.context.scene.render.filepath = f"{output_directory}/frame_"
  bpy.context.scene.render.resolution_x = 800
  bpy.context.scene.render.resolution_y = 600
  bpy.context.scene.frame_start = 0
  bpy.context.scene.frame_end = 60

  #bpy.ops.wm.stl_import(filepath=input_file) # Add stl file to scene.
  #bpy.context.scene.render.filepath = output_file # Set save path for thumbnail images.
  #bpy.context.scene.render.image_settings.file_format = 'PNG' # Set file format.

  for obj in bpy.context.visible_objects:
    if not (obj.hide_get() or obj.hide_render) and obj.name == 'assembly':
      obj.select_set(True)

      bpy.ops.view3d.camera_to_view_selected()

      zoom_extents(obj)

  load_assembly_rididbody_simulation(assembly.animation_file_path)

  # Render animation frame-by-frame.
  for frame in range(bpy.context.scene.frame_start, bpy.context.scene.frame_end + 1):
    bpy.context.scene.frame_set(frame)
    bpy.context.scene.render.filepath = f"{output_directory}/frame_{frame:03d}"
    bpy.ops.render.render(write_still=True)

    # TODO locals?
    #on_rigidbody_simulation_frame()

  # Convert .png files to .gif.
  os.system(f"magick convert -delay 3.33 frame_*.png {output_file}")

  # Cleanup.
  os.system(f"rm {output_directory}/frame_*.png")

if __name__ == '__main__':
  main()
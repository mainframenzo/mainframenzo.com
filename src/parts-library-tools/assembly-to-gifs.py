# This file is responsible for rendering build123d assemblies as .gif files.
# A .gif is created based for each animation scenario defined by the assembly.
import sys
import bpy
import os
from pathlib import Path
import tempfile
import platform

# FIXME blender needs python3.11
#sys.path.append('/usr/local/blender/4.2/python/lib')

# Add Python modules provided by conda env.
if platform.system() == 'Darwin':
  sys.path.append('/usr/local/lib')
  sys.path.append('/opt/app/meblog')
  sys.path.append('/opt/homebrew/anaconda3/envs/meblog/lib/python311.zip')
  sys.path.append('/opt/homebrew/anaconda3/envs/meblog/lib/python3.11')
  sys.path.append('/opt/homebrew/anaconda3/envs/meblog/lib/python3.11/lib-dynload')
  sys.path.append('/opt/homebrew/anaconda3/envs/meblog/lib/python3.11/site-packages')

if platform.system() == 'Linux':
  sys.path.append('/usr/local/lib')
  sys.path.append('/opt/app/meblog')
  sys.path.append('/opt/conda/envs/meblog/lib/python311.zip')
  sys.path.append('/opt/conda/envs/meblog/lib/python3.11')
  sys.path.append('/opt/conda/envs/meblog/lib/python3.11/lib-dynload')
  sys.path.append('/opt/conda/envs/meblog/lib/python3.11/site-packages')

# Add "meblog" Python module.
modules_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(modules_dir)

from meblog.utils import load_build123d_assembly_in_blender
from meblog.build123d_utils import from_assembly_file, assembly_to_stl
from meblog.blender_utils import init_scene, load_assembly_animation
from meblog.blender_camera_utils import zoom_extents

# Set from argv:
input_file = None
output_directory = None
output_file = None
#stl_metadata_file = None
#stl_metadata = {}

def main():
  print('main')

  _validate_dependencies()
  _parse_args()
  _try_create_output_directory()
  init_scene()
  _configure_output_settings()
  _render()

def _validate_dependencies():
  try:
    os.system('convert --version')
  except Exception as exception:
    raise Exception('imagemagick not installed or convert not on PATH')

def _parse_args():
  print('_parse_args')

  global input_file
  global output_directory
  global output_file
  #global stl_metadata_file
  #global stl_metadata

  argv = sys.argv
  argv = argv[argv.index('--') + 1:] # Get all args after "--".
  input_file = argv[0] # The .stl file.
  output_directory = argv[1]
  output_file = argv[2]
  
  print('blender args', argv)
  print('input_file', input_file)
  print('output_directory', output_directory)
  print('output_file', output_file)

  if input_file == None or output_directory == None or output_file == None:
    raise Exception('input_file or output_directory or output_file not specified')

def _try_create_output_directory():
  print('_try_create_output_directory', output_directory)

  path = Path(output_directory)
  path.mkdir(parents=True, exist_ok=True)

def _configure_output_settings():
  print('_configure_output_settings')

  bpy.context.scene.render.engine = 'CYCLES'
  bpy.context.scene.render.image_settings.color_mode = 'RGBA'
  bpy.context.scene.render.image_settings.file_format = 'PNG'
  bpy.context.scene.render.resolution_x = 1400 # FIXME Pass in.
  bpy.context.scene.render.resolution_y = 1400 # FIXME Pass in.
  bpy.context.scene.render.resolution_percentage = 100
  bpy.context.scene.render.film_transparent = True

  bpy.context.scene.cycles.device = 'CPU' # FIXME Allow GPU if have one
  #bpy.context.scene.cycles.filter_width = 0.01
  #FIXME Not high enough fidelity.
  bpy.context.scene.cycles.diffuse_bounces = 1
  bpy.context.scene.cycles.glossy_bounces = 1
  bpy.context.scene.cycles.transparent_max_bounces = 3
  bpy.context.scene.cycles.transmission_bounces = 3
  bpy.context.scene.cycles.samples = 32
  bpy.context.scene.cycles.use_denoising = True

  # FIXME If GPU...
  #enable_cuda_devices()

def _render():
  print('_render')

  assembly, locals = from_assembly_file(input_file)

  #_, stl_file_path = tempfile.mkstemp(suffix = '.stl')
  #assembly_to_stl(assembly, stl_file_path)
  load_build123d_assembly_in_blender(assembly, locals)

  for blender_object in bpy.data.objects:
    print('blender objects after scene loaded', blender_object.name)

  # Lights.
  bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
  light = bpy.context.active_object
  light.data.energy = 5

  bpy.context.scene.render.image_settings.file_format = 'PNG'
  #bpy.context.scene.render.filepath = f"{output_directory}/frame_"
  bpy.context.scene.render.resolution_x = 800
  bpy.context.scene.render.resolution_y = 800
  bpy.context.scene.frame_start = 0
  bpy.context.scene.frame_end = 1 # 60

  for obj in bpy.context.visible_objects:
    if not (obj.hide_get() or obj.hide_render) and obj.name == 'assembly':
      obj.select_set(True)

      bpy.ops.view3d.camera_to_view_selected()

      zoom_extents(obj)

  load_assembly_animation(assembly.animation_file_path)

  # Render animation frame-by-frame.
  for frame in range(bpy.context.scene.frame_start, bpy.context.scene.frame_end + 1):
    bpy.context.scene.frame_set(frame)
    bpy.context.scene.render.filepath = f"{output_directory}/frame_{frame:03d}"
    bpy.ops.render.render(write_still=True)

    # TODO locals?
    #on_animation_frame()

  # Convert .png files to .gif.
  os.system(f"convert -delay 3.33 {output_directory}/frame_*.png {output_file}")

  # Cleanup.
  #os.system(f"rm {output_directory}/frame_*.png")

if __name__ == '__main__':
  main()
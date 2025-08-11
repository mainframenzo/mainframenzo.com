# This file is responsible for rendering .stl files with Blender as .pngs (4 .pngs each configured view, which also includes depth, normal, and albedo maps).
# FIXME Special license consideration
# References:
# * https://github.com/anton325/PythonBlenderRender/tree/main
# * https://artisticrender.com/blender-a-cycles-render-settings-guide/
import sys
import bpy
import os
from pathlib import Path
import numpy as np
import math
import json
import platform

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

from meblog.blender_utils import init_scene, enable_cuda_devices
from meblog.blender_lighting_utils import create_spot_light, reposition_light_source, sample_hemisphere_around_object, carthesian_to_euler, angular_distance
from meblog.materials.material_list import materials

# Set from argv:
input_file = None
output_directory = None
stl_metadata_file = None # Assemblies do not have these currently.
stl_metadata = {} # Assemblies do not have this currently.

# Output constants.
color_depth = '16' # Important for albedo and depth.
number_of_views = 5
rotation_angle_list = np.linspace(0, 360, number_of_views) # One full rotation around input.
elevation_angle_list = np.linspace(0, 60, number_of_views)

def main():
  print('main')

  _parse_args()
  _try_create_output_directory()
  init_scene()
  depth_file_output, normal_file_output, albedo_file_output = _configure_output_settings()
  imported_stl_object = _import_stl()
  _scale_stl_to_render_camera(imported_stl_object)
  _center_stl(imported_stl_object)
  _configure_stl_materials(imported_stl_object)
  _configure_scene_lighting(imported_stl_object)
  camera = _configure_output_camera()
  _render(camera, depth_file_output, normal_file_output, albedo_file_output)

def _parse_args():
  print('_parse_args')

  global input_file
  global output_directory
  global stl_metadata_file
  global stl_metadata

  argv = sys.argv
  argv = argv[argv.index('--') + 1:] # Get all args after "--".
  input_file = argv[0] # The .stl file.
  output_directory = argv[1]
  if len(argv) == 3: stl_metadata_file = argv[2] # Optional. The .stl.json file containing metadata used in rendering (.stl format no good for this).
  
  print('blender args', argv)
  print('input_file', input_file)
  print('output_directory', output_directory)
  print('stl_metadata_file', stl_metadata_file)

  if input_file == None or output_directory == None:
    raise Exception('input_file or output_directory not specified')
  
  try:
    with open(stl_metadata_file, 'r') as file:
      stl_metadata = json.load(file)
  except Exception as exception:
    print('stl_metadata_file does not exist (probably an assembly), igoring')
  
  print('stl_metadata', stl_metadata)
 
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
  # FIXME Not high enough fidelity.
  # bpy.context.scene.cycles.diffuse_bounces = 1
  # bpy.context.scene.cycles.glossy_bounces = 1
  # bpy.context.scene.cycles.transparent_max_bounces = 3
  # bpy.context.scene.cycles.transmission_bounces = 3
  # bpy.context.scene.cycles.samples = 32
  # bpy.context.scene.cycles.use_denoising = True

  # FIXME If GPU...
  #enable_cuda_devices()

  return _configure_output_for_depth_albedo_normal()

def _configure_output_for_depth_albedo_normal():
  print('_configure_output_for_depth_albedo_normal')

  bpy.context.scene.use_nodes = True

  active_view_layer = bpy.context.view_layer

  if not active_view_layer:
    raise Exception('view layer not found: neither depth, albdedo nor normal pass can be enabled')

  nodes = bpy.context.scene.node_tree.nodes
  links = bpy.context.scene.node_tree.links

  # Clear default nodes.
  for n in nodes:
    nodes.remove(n)

  # Create input render layer node.
  render_layers = nodes.new('CompositorNodeRLayers')

  depth_file_output = _configure_depth_output(active_view_layer, nodes, links, render_layers)
  normal_file_output = _configure_normal_output(active_view_layer, nodes, links, render_layers)
  albedo_file_output = _configure_albedo_output(active_view_layer, nodes, links, render_layers)

  return [depth_file_output, normal_file_output, albedo_file_output]

def _configure_depth_output(active_view_layer, nodes, links, render_layers):
  print('_configure_depth_output')
  active_view_layer.use_pass_z = True

  depth_file_output = nodes.new(type='CompositorNodeOutputFile')
  depth_file_output.label = 'Depth Output'
  depth_file_output.base_path = '/'
  depth_file_output.file_slots[0].use_node_format = True
  depth_file_output.format.file_format = 'PNG'
  depth_file_output.format.color_depth = color_depth
  depth_file_output.format.color_mode = 'BW'

  # Remap as other types can not represent the full range of depth.
  map = nodes.new(type='CompositorNodeMapValue')

  # These values parametrize the resulting depth map:
  map.offset = [-1] # Only objects that are at least 1 blender unit away from the camera are recognoized for the depth. Every closer object is ignored.

  # It takes a depth difference of 1 blender unit to go from 0 to 255 (or 65.536, depending on 8 or 16 bit) in the depth map.
  # So in the case of offset = -1 and size = 1, the depth map will be completely black for everything closer than 1.
  # Objects that are between 1 and 2 blender units away will be represented by a gradient from black to white. 
  # Everything further away than 2 blender units will be completely white.
  #
  # In the case of size = 0.5, it takes a depth difference of 2 blender units to go from 0 to 255 (or 65.536, depending on 8 or 16 bit) in the depth map.
  # So in the case of offset = -1 and size = 2, the depth map will be completely black for everything closer than 1. 
  # Objects that are between 1 and 3 blender units away will be represented by a gradient from black to white. 
  # Everything further away than 3 blender units will be completely white.
  map.size = [0.7]

  map.use_min = True
  map.min = [0] # If you want another distance-delay in the range where the depth map is actually neither black nor white.

  links.new(render_layers.outputs['Depth'], map.inputs[0])
  links.new(map.outputs[0], depth_file_output.inputs[0])

  return depth_file_output

def _configure_normal_output(active_view_layer, nodes, links, render_layers):
  print('_configure_normal_output')

  active_view_layer.use_pass_normal = True

  scale_node = nodes.new(type='CompositorNodeMixRGB')
  scale_node.blend_type = 'MULTIPLY'
  scale_node.inputs[2].default_value = (0.5, 0.5, 0.5, 1)
  links.new(render_layers.outputs['Normal'], scale_node.inputs[1])

  bias_node = nodes.new(type='CompositorNodeMixRGB')
  bias_node.blend_type = 'ADD'
  bias_node.inputs[2].default_value = (0.5, 0.5, 0.5, 0)
  links.new(scale_node.outputs[0], bias_node.inputs[1])

  normal_file_output = nodes.new(type='CompositorNodeOutputFile')
  normal_file_output.label = 'Normal Output'
  normal_file_output.base_path = '/'
  normal_file_output.file_slots[0].use_node_format = True
  normal_file_output.format.file_format = 'PNG'

  links.new(bias_node.outputs[0], normal_file_output.inputs[0])

  return normal_file_output

def _configure_albedo_output(active_view_layer, nodes, links, render_layers):
  print('_configure_albedo_output')

  active_view_layer.use_pass_diffuse_color = True

  alpha_albedo = nodes.new(type='CompositorNodeSetAlpha')
  links.new(render_layers.outputs['DiffCol'], alpha_albedo.inputs['Image'])
  links.new(render_layers.outputs['Alpha'], alpha_albedo.inputs['Alpha'])

  albedo_file_output = nodes.new(type='CompositorNodeOutputFile')
  albedo_file_output.label = 'Albedo Output'
  albedo_file_output.base_path = '/'
  albedo_file_output.file_slots[0].use_node_format = True
  albedo_file_output.format.file_format = 'PNG'
  albedo_file_output.format.color_mode = 'RGBA'
  albedo_file_output.format.color_depth = color_depth

  links.new(alpha_albedo.outputs['Image'], albedo_file_output.inputs[0])

  return albedo_file_output

def _import_stl():
  print('_import_stl')

  bpy.ops.wm.stl_import(filepath=input_file) # Add stl file to scene.

  # Get the input .stl and make it active.
  imported_stl_object = bpy.context.scene.objects[-1]
  imported_stl_object.name = 'assembly'
  bpy.context.view_layer.objects.active = imported_stl_object

  return imported_stl_object

def _scale_stl_to_render_camera(imported_stl_object):
  print('_scale_stl_to_render_camera')

  # Get the dimensions of the bounding box.
  bbox_dimensions = imported_stl_object.dimensions

  # Find the maximum dimension.
  max_dimension = max(bbox_dimensions)

  # Calculate the scale factor to fit within a 1x1x1 cube.
  # Scale such that proportions stay the same.
  scale_factor = 1.0 / (max_dimension)

  # Scale the object uniformly.
  imported_stl_object.scale = (scale_factor, scale_factor, scale_factor)
  bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

def _center_stl(imported_stl_object):
  print('_center_stl')

  # After scaling, also try to set center of object.
  bpy.ops.object.origin_set(type='ORIGIN_CENTER_OF_MASS', center='BOUNDS')
  imported_stl_object.location = (0, 0, 0)
  bpy.context.view_layer.update()

def _configure_stl_materials(imported_stl_object):
  print('_configure_stl_materials')

  if 'material' not in stl_metadata:
    print('no material configured in stl_metadata')

    return

  material_file_path = f"{modules_dir}/meblog/materials/{stl_metadata['material']}"
  print('loading material from disk', material_file_path)

  with bpy.data.libraries.load(material_file_path) as (data_from, data_to):
    print('data_from.materials', data_from.materials)
    data_to.materials = data_from.materials

  material_id = stl_metadata['material']
  print('material_id', material_id)

  if material_id not in materials:
    print(f"material_id {material_id} not found in materials list, will not use it", materials)

    return
  
  if 'blender_name' not in materials[material_id]:
    print(f"material_id {material_id} has no blender material, will not use it", materials)

    return

  material_name = materials[material_id]['blender_name']
  print('material_name', material_name)

  material = bpy.data.materials.get(material_name)

  imported_stl_object.data.materials.append(material)

  # Make object shiny to allow for non-Lambertian effects.

  # Set up material to make it shiny.
  material.use_nodes = False # Disable node-based material for simplicity

  # Set specular reflection intensity.
  material.specular_intensity = 1.0 # Adjust as needed.

  # Set glossiness (shininess).
  material.roughness = 0.2 # Adjust as needed.

  # Set the material to use the Principled BSDF shader for more control.
  # FIXME  key "Principled BSDF" not found'.
  # https://blenderartists.org/t/blender-python-key-principled-bsdf-not-found/1486800/2
  # https://github.com/carson-katri/dream-textures/issues/601
  #material.use_nodes = True
  #material.node_tree.nodes['Principled BSDF'].inputs['Specular IOR Level'].default_value = 1.0 # Adjust as needed.
  #material.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value = 0.1 # Adjust as needed.

def _configure_scene_lighting(imported_stl_object):
  print('_configure_scene_lighting')

  sun_data = bpy.data.lights.new(name='sun-data', type='SUN')
  sun_data.energy = 30.0 # Adjust the strength as needed.

  sun = bpy.data.objects.new(name='sun', object_data=sun_data)
  sun_fixed_position = (0,3,10)
  sun.rotation_euler = carthesian_to_euler(sun_fixed_position)

  bpy.context.scene.collection.objects.link(sun)

  bpy.context.scene.world.use_nodes = False # Disable nodes for simplicity.
  bpy.context.scene.world.color = (0, 0, 0) # No ambient lightning, adjust the RGB values as needed.

  # Three spotlights, sampled. 
  spot_objects = []

  spot_object1 = create_spot_light()
  theta, phi, new_location = list(sample_hemisphere_around_object(imported_stl_object))
  reposition_light_source(spot_object1, new_location)
  spot_objects.append(spot_object1)

  spot_object2 = create_spot_light()
  theta2, phi2 = theta, phi
  while angular_distance(phi, theta, phi2, theta2) < 60:
    theta2, phi2, new_location2 = list(sample_hemisphere_around_object(imported_stl_object))
  reposition_light_source(spot_object2, new_location2)
  spot_objects.append(spot_object2)

  spot_object_3 = create_spot_light()
  theta3, phi3 = theta, phi
  while angular_distance(phi, theta, phi3, theta3) < 30 or angular_distance(phi2,theta2,phi3,theta3) < 30:
    theta3, phi3, new_location3 = list(sample_hemisphere_around_object(imported_stl_object))
      
  reposition_light_source(spot_object_3, new_location3)
  spot_objects.append(spot_object_3)

def _configure_output_camera():
  print('_configure_output_camera')

  cam_data = bpy.data.cameras.new(name='camera-data')
  cam = bpy.data.objects.new(name='render-camera', object_data=cam_data)
  cam.location = (0,2.3,0) # This controls the distance - we later only rotate this camera, but the distance stays the same.
  cam.data.lens = 35
  cam.data.sensor_width = 32

  cam_constraint = cam.constraints.new(type='TRACK_TO')
  cam_constraint.track_axis = 'TRACK_NEGATIVE_Z'

  cam_empty = bpy.data.objects.new('empty-camera', None)
  cam_empty.location = (0, 0, 0)
  cam.parent = cam_empty # The camera will follow the movements and transformations of the cam_empty object.

  bpy.context.scene.collection.objects.link(cam_empty) # The cam_empty camera becomes visible as it is added to this scenes collection.
  bpy.context.view_layer.objects.active = cam_empty
  cam_constraint.target = cam_empty
  bpy.context.scene.camera = cam

  return cam_empty

def _render(camera, depth_file_output, normal_file_output, albedo_file_output):
  print('_render')

  for view_number in range(number_of_views):
    _render_pngs_at_view(camera, view_number, depth_file_output, normal_file_output, albedo_file_output)

    bpy.context.view_layer.update() # FIXME May not need this.

def _render_pngs_at_view(camera, view_number, depth_file_output, normal_file_output, albedo_file_output):
  print('_render_pngs_at_view')

  camera.rotation_euler[2] = math.radians(rotation_angle_list[view_number])
  camera.rotation_euler[0] = math.radians(elevation_angle_list[view_number])

  render_file_prefix = f"{output_directory}/{os.path.basename(input_file)}-{str(view_number)}"
  bpy.context.scene.render.filepath = f"{render_file_prefix}.png"

  depth_file_output.file_slots[0].path = f"{render_file_prefix}-depth"
  normal_file_output.file_slots[0].path = f"{render_file_prefix}-albedo"
  albedo_file_output.file_slots[0].path = f"{render_file_prefix}-normal"
      
  bpy.ops.render.render(write_still=True)

if __name__ == '__main__':
  main()
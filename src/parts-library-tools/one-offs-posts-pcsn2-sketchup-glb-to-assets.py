# This file is responsible for converting the first-light.glb file exported using a SketchUp 2016 extension into "instanced" scene assets for your Rust-based digital twin application.
# Your goal is to be able to load two files for each asset on application start: a .glb file for each type of geometry instance, and a corresponding file with a list of instance coordinates.
# (You didn't quite get to two files because of various unique geometry variations, but what you arrived at works.)
# This allows you to take advantage of GPU instancing to "clone" the geometry at each coordinate.
# To boot, you can also apply nicer textures to the instanced geometry with a hard-coded lookup map.
# This is preferred to your original approach, which was just to load a single .glb file straight-up into the Rust application - it was hella slow.
# You thought maybe there would be a "smart" asset loader for GLTF which could find similar geometry and handle instancing for similar meshes, but not the case.
# So you rolled your own gonzo process. Yuck.
# In order to make this work properly, the first-light.skp file is expected to contain certain information:
# * Each SketchUp entity you want to export should be prefixed with "pcsn2_"
# * For Component entities, they should be named e.g. "pcsn2_component_xps_insulation"
# * For Group entities, they should be named e.g. "pcsn2_group_exterior_xps_insulation"
# * For Group entities, they should be comprised of similar Components, or Components derived from the same Cpmponent,
#    e.g. Group "pcsn2_group_exterior_xps_insulation" should contain all "pcsn2_component_xps_insulation" Components,
#    and/or "unique" Components derived from them, which SketchUp 2016 will name e.g. "pcsn2_component_xps_insulation#1", "pcsn2_component_xps_insulation#2",
#    where those derived Components will be treated as unique instances because their geometries are actually different (IRL: you cut one of the 4'x8' xps insulation panels to fit the 3'x8' gap)
# This allows you to export geometries and coordinates of each to files named <group name without the prefix>.glb and <group name without the prefix>.json in our Rust application.
# (The SketchUp 2016 extension which does the exporting is only capable of exporting SketchUp Components as Groups, so you have to make sure the .skp is labeled properly).
# Our Rust application can then take advantage of loading geometries "instanced" using both files. It also loads the assets in "layers",
#  so a user of the application (or the application itself) can toggle parts on off to make it easier to see various parts.
# The Rust application will probably treat layers as the SketchUp Groups, but TBD.
# And no, you do not want to modify the SketchUp 2016 extension to do this:
# * The entities in the scene need to be labeled anyways to relate to pricing data in BOMs for a feature in the Rust application (raycast-for-cost),
#    which is the actual tedious part (BOM "Name" field corresponds to SketchUp Component name)
# * The .glb that the extension generates is useful for debugging
# * No need to write software for a now-bullshit ecosystem where owning a grandfathered-in license means nothing
# Exporting a SketchUp "Group" as a scene asset for our Rust-based digital twin amounts to:
# Export glb from sketchup with groups intact.

# import into blender and modify the glb groups to have specific assets.

# export to a blend file and also glb files fpcsn2_component_xps_insulation#1or isntancding

# export instancing data (coordinates and what) so you can use in bevy.

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
# if platform.system() == 'Darwin':
#   sys.path.append('/usr/local/lib')
#   sys.path.append('/opt/app/meblog')
#   sys.path.append('/opt/homebrew/anaconda3/envs/meblog-one-offs-personal-case-study-number-2/lib/python311.zip')
#   sys.path.append('/opt/homebrew/anaconda3/envs/meblog-one-offs-personal-case-study-number-2/lib/python3.11')
#   sys.path.append('/opt/homebrew/anaconda3/envs/meblog-one-offs-personal-case-study-number-2/lib/python3.11/lib-dynload')
#   sys.path.append('/opt/homebrew/anaconda3/envs/meblog-one-offs-personal-case-study-number-2/lib/python3.11/site-packages')

# if platform.system() == 'Linux':
#   sys.path.append('/usr/local/lib')
#   sys.path.append('/opt/app/meblog')
#   sys.path.append('/opt/conda/envs/meblog-one-offs-personal-case-study-number-2/lib/python311.zip')
#   sys.path.append('/opt/conda/envs/meblog-one-offs-personal-case-study-number-2/lib/python3.11')
#   sys.path.append('/opt/conda/envs/meblog-one-offs-personal-case-study-number-2/lib/python3.11/lib-dynload')
#   sys.path.append('/opt/conda/envs/meblog-one-offs-personal-case-study-number-2/lib/python3.11/site-packages')

# Add "meblog" Python module.
modules_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(modules_dir)

# from meblog.blender_utils import init_scene, enable_cuda_devices
# from meblog.blender_lighting_utils import create_spot_light, reposition_light_source, sample_hemisphere_around_object, carthesian_to_euler, angular_distance
# from meblog.materials.material_list import materials

# FIXME https://blender.stackexchange.com/questions/215658/glb-import-error-due-to-idproperty-limitation
input_file = f"{os.getcwd()}/src/frontend/one-offs/posts/personal_case_study_number_2/digital-twin/assets/scene_assets/first-light.glb"
output_directory = f"{os.getcwd()}/src/frontend/one-offs/posts/personal_case_study_number_2/digital-twin/assets/scene_assets/generated"

sketchup_group_prefix = "pcsn2_group_"
sketchup_component_prefix = "pcsn2_component_"

texture_map = {
    #'exterior_cladding': '', # group, has unique components
    'shake': '',  # component
    'exterior_xps_insulation': 'FIXME path to blender kit texture',  # group, has unique components
    'xps_insulation': '',  # component
}

# from meblog.materials.material_list import materials
# material_name = materials[material_id]['blender_name']
# print('material_name', material_name)

# material = bpy.data.materials.get(material_name)

# imported_stl_object.data.materials.append(material)

# # Make object shiny to allow for non-Lambertian effects.

# # Set up material to make it shiny.
# material.use_nodes = False # Disable node-based material for simplicity

# # Set specular reflection intensity.
# material.specular_intensity = 1.0 # Adjust as needed.

# # Set glossiness (shininess).
# material.roughness = 0.2 # Adjust as needed.


def main():
  print('main')

  #_try_create_output_directory()
  #init_scene()

  bpy.ops.import_scene.gltf(filepath=input_file)

  for obj in bpy.context.scene.objects:
    #print(f".glb object name: {obj.name}")
    if (obj.name.startswith(sketchup_group_prefix)):
      print(f"exporting group: {obj.name}")
      export_sketchup_group_as_instanced_scene_asset(obj)
      #export_sketchup_group_as_instanced_scene_assets(obj)

  # import into blender and modify the glb groups to have specific assets.

  # export to a blend file and also glb files for isntancding

  # export instancing data (coordinates and what) so you can use in bevy.


def export_sketchup_group_as_instanced_scene_asset(obj: bpy.types.Object):
  bpy.ops.object.select_all(action='DESELECT')
  bpy.data.objects[obj.name].select_set(True)
  bpy.context.view_layer.objects.active = obj

  select_children_recursive(obj)

  bpy.ops.export_scene.gltf(
      filepath=f"{output_directory}/{obj.name.replace(sketchup_group_prefix, '')}.glb",
      export_format='GLB',
      use_selection=True
  )


def select_children_recursive(parent_obj: bpy.types.Object):
  for child in parent_obj.children:
    child.select_set(True)
    select_children_recursive(child)


# This many generate many .glb/.json pairs since some groups may have one-off geoemtries where say
#  some pieces of insulation had to be cut to different sizes.
def export_sketchup_group_as_instanced_scene_assets(obj: bpy.types.Object):
  bpy.ops.object.select_all(action='DESELECT')
  bpy.data.objects[obj.name].select_set(True)
  bpy.context.view_layer.objects.active = obj

  scene_asset_instance_coordinates = {}

  for child_obj in obj.children:
    #child_obj.select_set(True)
    print(f"{child_obj.name}")

    # The "obj" will only ever be a SketchUp Group (only care about labeled ones),
    #  and currently it should only contain SketchUp Components (only care about labled ones).

    if child_obj.name.startswith(sketchup_component_prefix):  # This is its own geometry instance.
      if '.' in child_obj.name and not '#' in child_obj.name:  # Variation of component, treat as own geometry, e.g. pcsn2_component_xps_insulation, not pcsn2_component_xps_insulation.010.
        print(f"got component, save as instance: {child_obj.name}")
      else:
        print(
            f"got component variation, treat as own geometry and save separately: {child_obj.name}"
        )

      # FIXME if no number, pcsn2_component_xps_insulation.010, a unique compoentn?
      # FIXME if a child component in group has # and is a component, that means it is its _own_ scene_asset?

    if obj.name not in scene_asset_instance_coordinates:
      scene_asset_instance_coordinates[child_obj.name] = []

    scene_asset_instance_coordinates[child_obj.name].append(child_obj.location)

    # Calculate the local bounding box center
    #local_bbox_center = sum((Vector(b) for b in obj.bound_box), Vector()) / 8
    # Convert local center to global coordinates
    #global_bbox_center = obj.matrix_world @ local_bbox_center
    #print(f"Global Bounding Box Center: {global_bbox_center}")

    scene_asset_instance_coordinates_file_suffix = obj.name.replace(sketchup_group_prefix, '')
    scene_asset_instance_coordinates_file_name = f"{output_directory}/{scene_asset_instance_coordinates_file_suffix}.json"

    print(f"writing file: {scene_asset_instance_coordinates_file_name}")
    #with open(scene_asset_instance_coordinates_file_name, 'w') as file:
    #  json.dump(scene_asset_instance_coordinates, file, indent=2)

  # FIXME This saves a Group as a single .glb file. Backup plan!
  # exported_glb_file_name = obj.name.replace(sketchup_group_prefix, '')
  #
  # bpy.ops.export_scene.gltf(
  #   filepath=f"{output_directory}/{exported_glb_file_name}",
  #   export_format='GLB',
  #   use_selection=True
  # )


# def _try_create_output_directory():
#   print('_try_create_output_directory', output_directory)

#   path = Path(output_directory)
#   path.mkdir(parents=True, exist_ok=True)

if __name__ == '__main__':
  main()

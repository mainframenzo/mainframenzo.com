# This file installs Blender add-ons needed.
# References:
# * https://gist.github.com/david-blg/907685fb9eef21d4215f04fc3d26d396
import sys
import bpy
from pathlib import Path

argv = sys.argv
argv = argv[argv.index('--') + 1:] # Get all args after "--".
path_to_src = argv[0]
print('blender args', argv)
print('path_to_src', path_to_src)

# On MacOS, these get installed to: /Users/mainframenzo/Library/Application Support/Blender/4.2/scripts/addons/<add_on_file>
def install_addon(add_on_name, add_on_file):
  try:
    bpy.ops.preferences.addon_install(filepath=f"{path_to_src}/src/parts-library-tools/blender-add-ons/{add_on_file}")
    bpy.ops.preferences.addon_enable(module=add_on_name)
    bpy.ops.wm.save_userpref()
    
    print(f"installed blender add-on {add_on_name}")

    return True
  except Exception as e:
    print(f"failed to install blender add-on: {e}")
   
    return False

install_addon("render_freestyle_svg", "render_freestyle_svg.py")
install_addon("scene_to_svg", "scene_to_svg.py")
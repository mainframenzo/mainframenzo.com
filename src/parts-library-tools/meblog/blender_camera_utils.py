# This file is responsible for providing meblog Blender camera utilities.
def zoom_extents(obj):
  print('zoom_extents', obj.name)

  # Get object dimensions.
  bounding_box_corners = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
  
  # Calculate bounding box center and size.
  bounding_box_center = sum(bounding_box_corners, Vector()) / 8
  bounding_box_size = max((max(corner) - min(corner) for corner in zip(*bounding_box_corners)))
  
  # Get the active 3D view.
  for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
      space = area.spaces[0]
      rv3d = space.region_3d
      
      # Set view location to bounding box center (look at).
      rv3d.view_location = bounding_box_center
      
      # Calculate and set appropriate distance based on object size.
      rv3d.view_distance = bounding_box_size * 10 # Adjust multiplier as needed.
      
      # Update view.
      bpy.context.view_layer.update()
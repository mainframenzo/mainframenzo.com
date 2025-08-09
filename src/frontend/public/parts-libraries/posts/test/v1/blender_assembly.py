
# Create box
def create_box():
  # Base
  bpy.ops.mesh.primitive_cube_add(size=2)
  base = bpy.context.active_object
  base.scale = (1, 1, 0.2)
  base.location = (0, 0, 0)
  
  # Walls
  wall_thickness = 0.1
  wall_height = 0.5
  
  # Front wall
  bpy.ops.mesh.primitive_cube_add(size=1)
  front = bpy.context.active_object
  front.scale = (2, wall_thickness, wall_height)
  front.location = (0, -1 + wall_thickness/2, wall_height/2)
  
  # Back wall
  bpy.ops.mesh.primitive_cube_add(size=1)
  back = bpy.context.active_object
  back.scale = (2, wall_thickness, wall_height)
  back.location = (0, 1 - wall_thickness/2, wall_height/2)
  
  # Left wall
  bpy.ops.mesh.primitive_cube_add(size=1)
  left = bpy.context.active_object
  left.scale = (wall_thickness, 2 - wall_thickness*2, wall_height)
  left.location = (-1 + wall_thickness/2, 0, wall_height/2)
  
  # Right wall
  bpy.ops.mesh.primitive_cube_add(size=1)
  right = bpy.context.active_object
  right.scale = (wall_thickness, 2 - wall_thickness*2, wall_height)
  right.location = (1 - wall_thickness/2, 0, wall_height/2)
  
  # Lid
  bpy.ops.mesh.primitive_cube_add(size=2)
  lid = bpy.context.active_object
  lid.scale = (1, 1, 0.1)
  lid.location = (0, 0, wall_height + 0.1)
  
  # Create empty object for hinge
  bpy.ops.object.empty_add(location=(0, 1, wall_height))
  hinge = bpy.context.active_object
  
  # Parent lid to hinge
  lid.parent = hinge
  
  return hinge, lid

# Set up scene
def setup_scene():
  # Light
  bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
  light = bpy.context.active_object
  light.data.energy = 5
  
  # Camera
  bpy.ops.object.camera_add(location=(5, -5, 4))
  camera = bpy.context.active_object
  camera.rotation_euler = (math.radians(60), 0, math.radians(45))
  
  # Make camera active
  bpy.context.scene.camera = camera
  
  # Set up rendering
  bpy.context.scene.render.image_settings.file_format = 'PNG'
  bpy.context.scene.render.filepath = '//frame_'
  bpy.context.scene.render.resolution_x = 800
  bpy.context.scene.render.resolution_y = 800

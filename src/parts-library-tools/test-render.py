import bpy
import math
from mathutils import Vector

# Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# Create box
def create_box():
  bpy.ops.mesh.primitive_cube_add(size=2)
  box = bpy.context.active_object
  box.location = (0, 0, 0)
  box.scale = (1.5, 1, 0.5)
  box.name = "Box"
  # Add rigid body
  bpy.ops.rigidbody.object_add()

  box.rigid_body.type = 'PASSIVE'

  return box

# Create hinge parts
def create_hinge():
  # Create cylinder for hinge pin
  bpy.ops.mesh.primitive_cylinder_add(radius=0.1, depth=2.2)
  pin = bpy.context.active_object
  pin.location = (-1.5, 0, 0)
  pin.rotation_euler.x = math.radians(90)
  pin.name = "Pin"
  
  # Create hinge arm
  bpy.ops.mesh.primitive_cube_add(size=1)
  arm = bpy.context.active_object
  arm.scale = (1.5, 0.3, 0.5)
  arm.location = (-0.75, 0, 0)
  arm.name = "Arm"
  
  # Add rigid body to arm
  bpy.ops.rigidbody.object_add()
  arm.rigid_body.mass = 1.0
  
  return pin, arm

# Create objects
box = create_box()
pin, arm = create_hinge()

# Create rigid body constraint (joint)
bpy.ops.rigidbody.constraint_add()
constraint = bpy.context.object
constraint.empty_display_type = 'PLAIN_AXES'
constraint.location = (-1.5, 0, 0)
constraint.rotation_euler.x = math.radians(90)

# Set up constraint properties
constraint.rigid_body_constraint.type = 'HINGE'
constraint.rigid_body_constraint.object1 = arm
constraint.rigid_body_constraint.object2 = box

# Set up animation
scene = bpy.context.scene
scene.frame_start = 0
scene.frame_end = 60
scene.rigidbody_world.point_cache.frame_end = 60

# Animate the arm
arm.animation_data_create()
arm.animation_data.action = bpy.data.actions.new(name="HingeAction")

# Create keyframes for rotation
arm.rotation_euler = (0, 0, 0)
arm.keyframe_insert(data_path="rotation_euler", frame=0)

arm.rotation_euler = (0, 0, math.radians(-90))
arm.keyframe_insert(data_path="rotation_euler", frame=30)

arm.rotation_euler = (0, 0, 0)
arm.keyframe_insert(data_path="rotation_euler", frame=60)

# Set up camera
bpy.ops.object.camera_add(location=(5, -5, 3))
camera = bpy.context.active_object
camera.rotation_euler = (math.radians(60), 0, math.radians(45))
scene.camera = camera

# Add light
bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))

# Set render properties
scene.render.engine = 'CYCLES'
scene.render.film_transparent = True
scene.cycles.samples = 3
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080

# Render animation
bpy.ops.render.render(animation=True)
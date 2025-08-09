# This file is responsible for defining our assembly's animation(s).
import bpy 

load_constraints = {} # TODO

def setup_animation():
  print('setup_animation')

  hinge = bpy.data.objects['hinge']

  # TODO starting position - define based on supplied joints?
  bpy.context.scene.frame_set(0)
  hinge.rotation_euler.x = 0
  hinge.keyframe_insert(data_path='rotation_euler', frame=0)
  
  # TODO end position - define based on supplied joints?
  bpy.context.scene.frame_set(30)
  hinge.rotation_euler.x = -math.radians(90)
  hinge.keyframe_insert(data_path='rotation_euler', frame=30)
  
  # Return to closed position
  bpy.context.scene.frame_set(60)
  hinge.rotation_euler.x = 0
  hinge.keyframe_insert(data_path='rotation_euler', frame=60)

def on_animation_frame():
  print('on_animation_frame') 
# This file is responsible for defining our assembly's rigidbody simulation(s).
import bpy 

load_constraints = {} # TODO

def setup_rigidbody_simulation():
  print('setup_rigidbody_simulation')

  # Make base static (non-moving)
  box_base.rigid_body.type = 'PASSIVE'
  box_base.rigid_body.collision_shape = 'BOX'

  # Make lid dynamic (affected by physics)
  box_lid.rigid_body.type = 'ACTIVE'
  box_lid.rigid_body.collision_shape = 'BOX'
  box_lid.rigid_body.mass = 1.0

  # Create hinge constraint
  bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 1, 0.2))
  hinge = bpy.context.active_object
  hinge.name = 'Hinge'

  bpy.ops.rigidbody.constraint_add()
  hinge.rigid_body_constraint.type = 'HINGE'
  hinge.rigid_body_constraint.object1 = box_base
  hinge.rigid_body_constraint.object2 = box_lid

def on_rigidbody_simulation_frame():
  print('on_rigidbody_simulation_frame')
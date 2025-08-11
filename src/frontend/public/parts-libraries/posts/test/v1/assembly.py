from build123d import *
from ocp_vscode import * 
import os

from bd_warehouse.fastener import CounterSunkScrew
from hinge import Hinge
from box import box
from lid import lid
 
hinge_inner = Hinge(
  width=5 * CM,
  length=12 * CM,
  barrel_diameter=1 * CM,
  thickness=2 * MM,
  pin_diameter=4 * MM
)

hinge_outer = Hinge(
  width=5 * CM,
  length=12 * CM,
  barrel_diameter=1 * CM,
  thickness=2 * MM,
  pin_diameter=4 * MM,
  inner=False
)

m6_screw = CounterSunkScrew(fastener_type='iso7046', size='M6-1', length=12 * MM)
m6_joint = RigidJoint('head', m6_screw, Location((0, 0, 0), (0, 0, 0)))

box.joints['hinge_attachment'].connect_to(hinge_outer.joints['leaf'])
hinge_outer.joints['hinge_axis'].connect_to(hinge_inner.joints['hinge_axis'], angle=120)
hinge_inner.joints['leaf'].connect_to(lid.joints['hinge_attachment'])
#hinge_outer.joints['hole1'].connect_to(m6_joint, position=5 * MM, angle=30)
hinge_outer.joints['hole2'].connect_to(m6_joint, position=5 * MM, angle=30)
#hinge_outer.joints['hole3'].connect_to(m6_joint, position=5 * MM, angle=30)

assembly = Compound(label='test', children=[
  box, 
  lid,
  m6_screw,
  hinge_inner,
  hinge_outer
]) 

# We can load this assembly file dynamically by just passing the file path around.
# In order to do that, we need some baseline assembly config. Specify that here.
assembly.units = Unit.CM
assembly.tolerance = 0.01
assembly.angular_tolerance = 0.01

# This is not the path you're looking for.
# assembly_dir = os.path.dirname(os.path.realpath(__file__))
assembly_dir = f"{os.getcwd()}/src/frontend/public/parts-libraries/posts/test"

assembly.animation_file_path = f"{assembly_dir}/blender_animation.py"
assembly.rigidbody_simulation_file_path = f"{assembly_dir}/blender_rigidbody_simulation.py"

show(assembly) 
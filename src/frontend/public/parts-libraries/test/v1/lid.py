from build123d import *

with BuildPart() as sketch:
  Box(30 * CM, 30 * CM, 1 * CM, align=(Align.MIN, Align.CENTER, Align.MIN))
  with Locations((2 * CM, 0, 0)):
    with GridLocations(0, 40 * MM, 1, 3):
      Hole(3 * MM, 1 * CM)
  RigidJoint(
    'hinge_attachment',
    joint_location=Location((0, 0, 0), (0, 0, 180)),
  )
  
lid = sketch.part
lid.material = 'aluminium-used_b9ea184e-b387-485c-afed-296336cfa001.blend'
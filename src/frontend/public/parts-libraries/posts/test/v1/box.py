from build123d import *

with BuildPart() as sketch:
  box = Box(30 * CM, 30 * CM, 10 * CM)
  offset(amount=-1 * CM, openings=sketch.faces().sort_by(Axis.Z)[-1])

  # Create a notch for the hinge.
  with Locations((-15 * CM, 0, 5 * CM)):
    Box(2 * CM, 12 * CM, 4 * MM, mode=Mode.SUBTRACT)
  bbox = box.bounding_box()

  with Locations(Plane(origin=(bbox.min.X, 0, bbox.max.Z - 30 * MM), z_dir=(-1, 0, 0))):
    with GridLocations(0, 40 * MM, 1, 3):
      Hole(3 * MM, 1 * CM)

  RigidJoint(
    'hinge_attachment',
    joint_location=Location((-15 * CM, 0, 4 * CM), (180, 90, 0)),
  )

box = sketch.part.moved(Location((0, 0, 5 * CM)))
box.material = 'aluminium-used_b9ea184e-b387-485c-afed-296336cfa001.blend'
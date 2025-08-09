# References:
# * https://build123d.readthedocs.io/en/latest/tutorial_joints.html
from build123d import *

class Hinge(Compound):
    """Hinge

    Half a simple hinge with several joints. The joints are:
    - "leaf": RigidJoint where hinge attaches to object
    - "hinge_axis": RigidJoint (inner) or RevoluteJoint (outer)
    - "hole0", "hole1", "hole2": CylindricalJoints for attachment screws

    Args:
        width (float): width of one leaf
        length (float): hinge length
        barrel_diameter (float): size of hinge pin barrel
        thickness (float): hinge leaf thickness
        pin_diameter (float): hinge pin diameter
        inner (bool, optional): inner or outer half of hinge . Defaults to True.
    """

    def __init__(
      self,
      width: float,
      length: float,
      barrel_diameter: float,
      thickness: float,
      pin_diameter: float,
      inner: bool = True
    ):
      
      # The profile of the hinge used to create the tabs.
      with BuildPart() as hinge_profile:
        with BuildSketch():
          for i, loc in enumerate(
            GridLocations(0, length / 5, 1, 5, align=(Align.MIN, Align.MIN))
          ):
            if i % 2 == inner:
              with Locations(loc):
                Rectangle(width, length / 5, align=(Align.MIN, Align.MIN))
          Rectangle(
            width - barrel_diameter,
            length,
            align=(Align.MIN, Align.MIN),
          )
        extrude(amount=-barrel_diameter)

      # The hinge pin.
      with BuildPart() as pin:
        Cylinder(
          radius=pin_diameter / 2,
          height=length,
          align=(Align.CENTER, Align.CENTER, Align.MIN),
        )
        with BuildPart(pin.part.faces().sort_by(Axis.Z)[-1]) as pin_head:
          Cylinder(
            radius=barrel_diameter / 2,
            height=pin_diameter,
            align=(Align.CENTER, Align.CENTER, Align.MIN),
          )
        fillet(
          pin_head.edges(Select.LAST).filter_by(GeomType.CIRCLE),
          radius=pin_diameter / 3,
        )

      # Either the external and internal leaf with joints
      with BuildPart() as leaf_builder:
        with BuildSketch():
          with BuildLine():
            l1 = Line((0, 0), (width - barrel_diameter / 2, 0))
            l2 = RadiusArc(
              l1 @ 1,
              l1 @ 1 + Vector(0, barrel_diameter),
              -barrel_diameter / 2,
            )
            l3 = RadiusArc(
              l2 @ 1,
              (
                  width - barrel_diameter,
                  barrel_diameter / 2,
              ),
              -barrel_diameter / 2,
            )
            l4 = Line(l3 @ 1, (width - barrel_diameter, thickness))
            l5 = Line(l4 @ 1, (0, thickness))
            Line(l5 @ 1, l1 @ 0)
          make_face()
          with Locations(
            (width - barrel_diameter / 2, barrel_diameter / 2)
          ) as pin_center:
            Circle(pin_diameter / 2 + 0.1 * MM, mode=Mode.SUBTRACT)
        extrude(amount=length)
        add(hinge_profile.part, rotation=(90, 0, 0), mode=Mode.INTERSECT)

        # Create holes for fasteners
        with Locations(leaf_builder.part.faces().filter_by(Axis.Y)[-1]):
          with GridLocations(0, length / 3, 1, 3):
            holes = CounterSinkHole(3 * MM, 5 * MM)

        # Add the hinge pin to the external leaf
        if not inner:
          with Locations(pin_center.locations[0]):
            add(pin.part)

        # Leaf attachment.
        RigidJoint(
          label='leaf',
          joint_location=Location(
            (width - barrel_diameter, 0, length / 2), (90, 0, 0)
          ),
        )

        # [Hinge Axis] (fixed with inner).
        if inner:
          RigidJoint(
            'hinge_axis',
            joint_location=Location(
                (width - barrel_diameter / 2, barrel_diameter / 2, 0)
            ),
          )
        else:
          RevoluteJoint(
            'hinge_axis',
            axis=Axis(
              (width - barrel_diameter / 2, barrel_diameter / 2, 0), (0, 0, 1)
            ),
            angular_range=(90, 270),
          )

        hole_locations = [hole.location for hole in holes]
        for hole, hole_location in enumerate(hole_locations):
          CylindricalJoint(
            label="hole" + str(hole),
            axis=hole_location.to_axis(),
            linear_range=(-2 * CM, 2 * CM),
            angular_range=(0, 360),
          )

      super().__init__(leaf_builder.part.wrapped, joints=leaf_builder.part.joints)

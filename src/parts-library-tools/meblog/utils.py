# This file is responsible for providing meblog utilities.
from typing import Union

import cadquery
import build123d
from build123d import *

from meblog.types import ParametricObjectNode, ParametricShape, ParametricObject
from meblog.blender_utils import load_parametric_objects

def load_build123d_assembly_in_blender(assembly, locals):
  print('load_build123d_assembly_in_blender', assembly.label, locals)

  parametric_objects = []
  for child in assembly.children:
    # Filter out all non-constructive and hidden objects (those prefixed with '_').
    if isinstance(child, ParametricObject) and not child.label.startswith('_'):
      print('converting', child.label, 'value', child)

      parametric_object = _parse_parametric_object(assembly, child, child.label, None)
 
      parametric_objects.append(parametric_object)

  load_parametric_objects(parametric_objects)

def _parse_parametric_object(assembly, object: ParametricObject, name: str, material: Union[str, None]) -> ParametricObjectNode:
  print('_parse_parametric_object', name)

  # Use object properties, otherwise inherit them from parent.
  name = object.name if (hasattr(object, 'name') and object.name) else name
  print('name', name)
  material = object.material if (hasattr(object, 'material') and object.material) else material

  # Do we really need to support per-child assemblies? Could we just get CadQuery to flatten into a shape for us?
  if isinstance(object, cadquery.Assembly):
    print('found build123d assembly')

    children = []
    for child in [object.shapes + object.children]:
      print('child', child.name)
      children.append(_parse_parametric_object(child, name, material))

    return ParametricObjectNode(
      name=name, 
      material=material,
      children=children
    )

  if isinstance(object, ParametricShape):
    print('found build123d object')

    shape = object
  elif isinstance(object, cadquery.Workplane):
    print('found build123d shape')

    # TODO `object.val().wrapped` is not guaranteed to be `Shape`.
    shape = build123d.Shape(object.val().wrapped)
  elif isinstance(object, build123d.Builder):
    print('found build123d builder')

    shape = object._obj
  else:
    raise BlendQueryBuildException('Failed to parse parametric object; Unsupported object type (' + str(type(object)) + ').')
  
  print('tesselate', assembly.tolerance, 'assembly.angular_tolerance')
  vertices, faces = shape.tessellate(assembly.tolerance, assembly.angular_tolerance)

  mapped_vertices = []
  for vertex in vertices:
    if hasattr(vertex, 'toTuple'):
      mapped_vertices.append(vertex.toTuple())
    else:
      mapped_vertices.append(vertex.to_tuple())

  return ParametricObjectNode(
    name=name,
    material=material,
    vertices=mapped_vertices,
    faces=faces
  )
# This file is responsible for providing meblog build123d utilities.
# References:
# * https://github.com/uki-dev/blendquery
# * https://stackoverflow.com/questions/77707978/render-views-from-an-object-with-pyrender
from build123d import *
import sys
import trimesh
import os
from pathlib import Path
import pyrender
from PIL import Image
import tempfile
import json
import matplotlib.pyplot as plt
import ezdxf 
from ezdxf.addons.drawing import RenderContext, Frontend, layout, svg
from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
from ezdxf.addons.drawing.config import HatchPolicy, Configuration, LineweightPolicy, ColorPolicy, BackgroundPolicy

def from_assembly_file(file_path: str):
  print('from_assembly_file', file_path)

  with open(file_path) as file:
    build123d_script_contents = file.read()

  print('build123d_script_contents', build123d_script_contents)

  # For dynamic assembly import to work, the Python modules it relies on from its own directory need to be appended to our PYTHONPATH.
  # We use the parent directory of the assembly as the root Python module directory.
  assembly_file_path = Path(file_path)
  print('adding to sys.path', assembly_file_path.parent.absolute())
  sys.path.append(str(assembly_file_path.parent.absolute()))

  # Dynamically run code to import build123d file from disk. Oy!
  locals = {}
  exec(build123d_script_contents, globals(), locals)

  print('assembly', locals['assembly'].show_topology())

  return locals['assembly'], locals

def assembly_to_stl(assembly, output_stl_path: str):
  print('assembly_to_stl', assembly.label)

  stl_exporter = Mesher(unit=assembly.units)
  stl_exporter.add_shape(assembly, part_number=assembly.label)
  stl_exporter.write(output_stl_path)

def render_assembly_to_svg(assembly, output_svg_path: str):
  print('render_assembly_to_svg', assembly.label)

  # Generate a projection: The project_to_viewport() method can be used to create a 2D projection of a 3D scene. 
  # Similar to a camera, the viewport_origin defines the location of camera, the viewport_up defines the orientation of the camera, 
  #  and the look_at parameter defined where the camera is pointed. 
  # By default, viewport_up is the positive z axis and look_up is the center of the shape. 
  # The return value is a tuple of lists of edges, the first the visible edges and the second the hidden edges.
  # See: https://build123d.readthedocs.io/en/latest/import_export.html#d-to-2d-projection
  view_port_origin=(100, 50, 30)
  visible, hidden = assembly.project_to_viewport(view_port_origin)
  max_dimension = max(*Compound(children=visible + hidden).bounding_box().size)
  svg_exporter = ExportSVG(scale=100 / max_dimension)
  svg_exporter.add_layer('visible')
  svg_exporter.add_layer('hidden', line_color=(99, 99, 99), line_type=LineType.ISO_DOT)
  svg_exporter.add_shape(visible, layer='visible')
  svg_exporter.add_shape(hidden, layer='hidden')
  svg_exporter.write(output_svg_path)

def render_assembly_to_png(assembly, output_png_path: str):
  print('render_assembly_to_png', assembly.label)

  _, stl_file_path = tempfile.mkstemp(suffix = '.stl')

  assembly_to_stl(assembly, stl_file_path)

  trimesh.util.attach_to_log()
  trimesh_mesh = trimesh.load(stl_file_path, force='mesh') #force='scene'
  print('loaded trimesh mesh')

  mesh = pyrender.Mesh.from_trimesh(trimesh_mesh)
  scene = pyrender.Scene()
  scene.add(mesh)
  print('loaded pyrender scene')

  pixels, _ = pyrender.OffscreenRenderer(viewport_width=640, viewport_height=480, point_size=1.0)
  print('headless render ok')

  # Create parent directories if they don't exist.
  path = Path(os.path.dirname(output_png_path))
  path.mkdir(parents=True, exist_ok=True)

  png = Image.fromarray(pixels)
  png.save(output_png_path)

def assembly_parts_to_stls(assembly, output_dir: str):
  print('assembly_parts_to_stls', assembly.label)

  for child in assembly.children:
    _assembly_part_to_stl(assembly, output_dir, child)

def _assembly_part_to_stl(assembly, output_dir: str, build123d_object):
  print('_assembly_part_to_stl', build123d_object.label)

  if build123d_object.children:
    for child in build123d_object.children:
      _assembly_part_to_stl(assembly, output_dir, child)
  else:
    stl_exporter = Mesher(unit=assembly.units)
    stl_exporter.add_shape(build123d_object, part_number=build123d_object.label)
    stl_exporter.write(f"{output_dir}/{build123d_object.label}.stl")

    # FIXME For lack of a better solution currently, 
    #  also export additional metadata used by software that needs the .stl and python-defined metadata.
    # This is currently used for materials lookup when rendering .stl files,
    #  but more may be added later.
    _write_assembly_part_metadata(output_dir, build123d_object)

def _write_assembly_part_metadata(output_dir: str, build123d_object):
  print('_write_assembly_part_metadata')

  part_metadata = {}

  if build123d_object.material:
    part_metadata['material'] = build123d_object.material

  json_part_metadata = json.dumps(part_metadata, indent=4)

  with open(f"{output_dir}/{build123d_object.label}.stl.json", 'w') as file:
    file.write(json_part_metadata)
        
def assembly_parts_to_svgs(assembly, output_dir: str):
  print('assembly_parts_to_svgs', assembly.label)

  for child in assembly.children:
    _assembly_part_to_svg(assembly, output_dir, child)

def _assembly_part_to_svg(assembly, output_dir: str, build123d_object):
  print('_assembly_part_to_svg', build123d_object.label)

  if build123d_object.children:
    for child in build123d_object.children:
      _assembly_part_to_svg(assembly, output_dir, child)
  else:
    view_port_origin=(100, 50, 30)
    visible, hidden = assembly.project_to_viewport(view_port_origin)
    max_dimension = max(*Compound(children=visible + hidden).bounding_box().size)
    svg_exporter = ExportSVG(scale=100 / max_dimension)
    svg_exporter.add_layer('visible')
    svg_exporter.add_layer('hidden', line_color=(99, 99, 99), line_type=LineType.ISO_DOT)
    svg_exporter.add_shape(visible, layer='visible')
    svg_exporter.add_shape(hidden, layer='hidden')
    svg_exporter.write(f"{output_dir}/{build123d_object.label}.svg")

# See: https://github.com/gumyr/build123d/issues/874
from os import PathLike, fsdecode

from OCP.RWStl import RWStl
from OCP.gp import gp_Pnt, gp_Trsf
from OCP.Poly import Poly_Triangulation
from OCP.TopoDS import TopoDS_Face
from OCP.BRep import BRep_Builder
from OCP.TColgp import TColgp_Array1OfPnt

def import_stl_jdegenstein(file_name: PathLike | str | bytes, model_unit: Unit = Unit.MM) -> Face:
  """import_stl

  Extract shape from an STL file and return it as a Face reference object.

  Note that importing with this method and creating a reference is very fast while
  creating an editable model (with Mesher) may take minutes depending on the size
  of the STL file.

  Args:
    file_name (Union[PathLike, str, bytes]): file path of STL file to import
    model_unit (Unit, optional): the default unit used when creating the model. For
        example, Blender defaults to Unit.M. Defaults to Unit.MM.

  Raises:
    ValueError: Could not import file
    ValueError: Invalid model_unit

  Returns:
    Face: STL model
  """
  # Read STL file
  reader = RWStl.ReadFile_s(fsdecode(file_name))
  
  # Check for any required scaling
  if model_unit == Unit.MM:
    pass
  else:
    conversion_factor = {
      # Unit.MC: MC,  # MICRO
      Unit.MM: MM,  # MILLIMETER
      Unit.CM: CM,  # CENTIMETER
      Unit.M: M,  # METER
      Unit.IN: IN,  # INCH
      Unit.FT: FT,  # FOOT
    }

    try:
      scale_factor = conversion_factor[model_unit]
    except KeyError:
      raise ValueError(
        f"model_scale must one a valid unit: {Unit._member_names_}"
      )

    transformation = gp_Trsf()
    transformation.SetScaleFactor(scale_factor)
    
    node_arr = reader.InternalNodes()

    for i in range(reader.NbNodes()):
      node_arr.SetValue(i, node_arr.Value(i).Transformed(transformation))

  face = TopoDS_Face()
  BRep_Builder().MakeFace(face, reader)
  
  return Face.cast(face)

# See: https://github.com/gumyr/build123d/issues/817
import math
import warnings
import ezdxf
from build123d.objects_curve import (
  CenterArc,
  EllipticalCenterArc,
  Line,
  Polyline,
  SagittaArc,
  Spline,
  ThreePointArc,
)
from build123d.drafting import Arrow
from build123d.build_enums import Align
from build123d.objects_sketch import Circle, Polygon, Text
from build123d.geometry import Axis, Pos, TOLERANCE, Vector
from build123d.operations_generic import scale
from build123d.topology import ShapeList, Vertex, Wire

def import_dxf(filename: str):
  """Import shapes from a DXF file

  Args:
    filename (str): dxf file

  Raises:
    DXFStructureError: file not found

  Returns:
    ShapeList: build123d objects
  """
  try:
    doc = ezdxf.readfile(filename)
  except ezdxf.DXFStructureError:
    raise ValueError(f"Failed to read {filename}")
  
  build123d_objects = []

  # Iterate over all entities in the model space
  for entity in doc.modelspace():
    dxftype = entity.dxftype()
    print(f"{dxftype=}")
    
    if dxftype in entity_dispatch:
      new_object = entity_dispatch[dxftype](entity)
      print(f"{new_object=}")
      if isinstance(new_object, list):
        build123d_objects.extend(new_object)
      else:
        build123d_objects.append(new_object)
    else:
      warnings.warn(f"Unable to convert {dxftype}")

  return ShapeList(build123d_objects)

def _process_arc(entity):
  """Convert ARC"""

  start, mid, end = entity.angles(3)
  arc_center = Vector(*entity.dxf.center)
  radius_vec = Vector(entity.dxf.radius, 0, 0)
  pnts = [arc_center + radius_vec.rotate(Axis.Z, a) for a in [start, mid, end]]

  return ThreePointArc(*pnts)

def _process_circle(entity):
  """Convert CIRCLE"""

  return Pos(*entity.dxf.center) * Circle(entity.dxf.radius).edge()

def _process_ellipse(entity):
  """Convert ELLIPSE"""

  center = entity.dxf.center
  major_axis = entity.dxf.major_axis
  x_radius = (major_axis[0] ** 2 + major_axis[1] ** 2) ** 0.5
  y_radius = x_radius * entity.dxf.ratio
  rotation = math.degrees(math.atan2(major_axis[1], major_axis[0]))
  start_angle = math.degrees(entity.dxf.start_param)
  end_angle = math.degrees(entity.dxf.end_param)

  return EllipticalCenterArc(
    center=center,
    x_radius=x_radius,
    y_radius=y_radius,
    start_angle=start_angle,
    end_angle=end_angle,
    rotation=rotation
  )

def _process_insert(entity, doc):
  """Process INSERT by referencing block definition and applying transformations."""

  block_name = entity.dxf.name
  # insert_point = (entity.dxf.insert.x, entity.dxf.insert.y, entity.dxf.insert.z)
  insert_point = entity.dxf.insert
  scale_factors = (entity.dxf.xscale, entity.dxf.yscale, entity.dxf.zscale)
  rotation_angle = entity.dxf.rotation

  # Retrieve the block definition
  block = doc.blocks.get(block_name)
  transformed_entities = []

  # Process each entity in the block definition
  for block_entity in block:
    dxftype = block_entity.dxftype()
    if dxftype in entity_dispatch:
      # Process the entity and apply transformations
      entity_object = entity_dispatch[dxftype](block_entity)
      transformed_entity = scale(entity_object, scale_factors)
      transformed_entity = transformed_entity.rotate(Axis.Z, rotation_angle)
      transformed_entity.position = insert_point
      transformed_entities.append(transformed_entity)
  else:
    warnings.warn(f"Unhandled block entity type: {dxftype}")

  return ShapeList(transformed_entities)

def _process_leader(entity):
  """Convert LEADER entity to a Wire with an Arrow at the endpoint."""
  # Extract the vertices of the LEADER as (x, y) points
  vertices = [Vector(x, y) for x, y, *_ in entity.vertices]

  # Create a series of lines for the leader segments
  edges = [
    Line(start=vertices[i], end=vertices[i + 1]) for i in range(len(vertices) - 1)
  ]

  # Calculate arrow size based on leader length or use a default
  leader_length = sum(
    Line(start=vertices[i], end=vertices[i + 1]).length()
    for i in range(len(vertices) - 1)
  )
  arrow_size = (
    leader_length * 0.05 if leader_length > 0 else 1.0
  )  # Default size if leader is very short

  # Create an arrow at the end of the leader
  direction = vertices[-1] - vertices[-2]
  # arrow = Pos(*vertices[-1]) * Arrow(
  #     direction=direction.normalize(), size=arrow_size
  # )

  # Return the combined Wire (leader line) and Arrow (arrowhead)
  # return Wire(edges=edges), arrow
  return Wire(edges)

def _process_line(entity):
  """Convert LINE"""
  start, end = Vector(*entity.dxf.start), Vector(*entity.dxf.end)

  if (start - end).length < TOLERANCE:
    warnings.warn("Skipping degenerate LINE")
  else:
    return Line(start, end)

def _process_lwpolyline(entity):
  """Convert LWPOLYLINE"""

  # (LWPolyline.dxf.elevation is the z-axis value).
  # Can contain arcs
  return Polyline(*entity.get_points("xy"))

def _process_point(entity):
  """Convert POINT"""

  point = entity.dxf.location
  
  return Vertex(point[0], point[1], point[2])

def _process_polyline(entity):
  """Convert POLYLINE - a collection of LINE and ARC segments."""

  edges = []
  points = entity.get_points("xyb")  # Extracts x, y, and bulge (if available)

  for i in range(len(points) - 1):
    start_point = points[i][:2]
    end_point = points[i + 1][:2]
    bulge = points[i][2] if len(points[i]) > 2 else 0

    if bulge == 0:
      # Straight segment: create a Line
      edge = Line(start_point, end_point)
    else:
      # Curved segment: create a SagittaArc using the bulge as the sagitta
      sagitta = bulge * math.dist(start_point, end_point) / 2
      edge = SagittaArc(start_point, end_point, sagitta)

    edges.append(edge)

  return Wire(edges=edges)

def _process_solid_trace_3dface(entity):
  """Convert filled objects - i.e. Faces"""

  # Gather vertices as a list of (x, y, z) tuples
  vertices = []
  for i in range(4):
    # Some entities like SOLID or TRACE may define only 3 vertices, repeating the last one
    # if the fourth vertex is not defined.
    try:
      vertex = entity.dxf.get(f"v{i}")
      vertices.append((vertex.x, vertex.y, vertex.z))
    except AttributeError:
      break

  # Create the Polygon object
  polygon_obj = Polygon(*vertices)

  return polygon_obj

def _process_spline(entity):
  """Convert SPLINE"""
  # Get the control points as a list of (x, y) tuples
  control_points = [(point[0], point[1]) for point in entity.control_points]

  # Retrieve start and end tangents if available
  start_tangent = entity.dxf.get("start_tangent")  # May return None if not defined
  end_tangent = entity.dxf.get("end_tangent")  # May return None if not defined

  if any(t is None for t in [start_tangent, end_tangent]):
     tangents = ()
  else:
    tangents = (start_tangent, end_tangent)

  # Create the Spline object
  spline_obj = Spline(*control_points, tangents=tangents)

  return spline_obj

def _process_text(entity):
  """Convert TEXT"""

  # Convert alignments
  v_alignment = {0: None, 1: Align.MIN, 2: Align.CENTER, 3: Align.MAX}
  h_alignment = {0: Align.MIN, 1: None, 4: Align.CENTER, 2: Align.MAX}

  # Extract common attributes for both TEXT and MTEXT
  position = entity.dxf.insert  # Starting position
  content = (
    entity.dxf.text if entity.dxftype() == "TEXT" else entity.text
  )  # Text content
  height = (
    entity.dxf.height if entity.dxftype() == "TEXT" else entity.dxf.char_height
  )  # Text height
  rotation = (
    entity.dxf.rotation
    if entity.dxftype() == "TEXT"
    else entity.dxf.get("rotation", 0)
  )  # Rotation angle

  # Create the Text object
  text_obj = Pos(*position) * Text(
    content,
    font_size=height,
    rotation=rotation,
    align=(h_alignment[entity.dxf.halign], v_alignment[entity.dxf.valign]),
  )

  return text_obj

# Dispatch dictionary mapping entity types to processing functions
entity_dispatch = {
  "3DFACE": _process_solid_trace_3dface,
  "ARC": _process_arc,
  "CIRCLE": _process_circle,
  "ELLIPSE": _process_ellipse,
  "INSERT": _process_insert,
  # "LEADER": process_leader,
  "LINE": _process_line,
  "LWPOLYLINE": _process_lwpolyline,
  # "MTEXT": process_text,
  "POINT": _process_point,
  "POLYLINE": _process_polyline,
  "SOLID": _process_solid_trace_3dface,
  "SPLINE": _process_spline,
  "TEXT": _process_text,
  "TRACE": _process_solid_trace_3dface
}
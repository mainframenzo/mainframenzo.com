# This file is responsible for providing meblog Blender utilities.
# FIXME Special license consideration
# References:
# * https://github.com/anton325/PythonBlenderRender/tree/main
from typing import List
import bpy 
from mathutils import Vector
from meblog.types import ParametricObjectNode

def init_scene():
  print('init_scene')

  # Just use bpy.context.scene.
  #scene = bpy.data.scenes.new(name='scene')

  # Link the new scene to the context.
  #bpy.context.window.scene = scene

  print('removing default cube from scene')
  # FIXME Better way to get rid of default cube?
  #bpy.ops.wm.read_factory_settings(use_empty=True) # Removes camera...
  bpy.ops.object.select_all(action='DESELECT')
  bpy.data.objects['Cube'].select_set(True)
  bpy.ops.object.delete() 
  bpy.ops.object.select_all(action='DESELECT')

  for blender_object in bpy.data.objects:
    print('blender object in init scene', blender_object.name)

  #return scene

def enable_cuda_devices():
  print('enable_cuda_devices')

  prefs = bpy.context.preferences
  cprefs = prefs.addons['cycles'].preferences
  cprefs.get_devices()

  # Attempt to set GPU device types if available
  for compute_device_type in ('CUDA', 'OPENCL', 'NONE'):
    try:
      cprefs.compute_device_type = compute_device_type
      print("Compute device selected: {0}".format(compute_device_type))
      break
    except TypeError:
      pass

  # Any CUDA/OPENCL devices?
  acceleratedTypes = ['CUDA', 'OPENCL']
  accelerated = any(device.type in acceleratedTypes for device in cprefs.devices)
  # print('Accelerated render = {0}'.format(accelerated))

  # If we have CUDA/OPENCL devices, enable only them, otherwise enable
  for device in cprefs.devices:
    device.use = not accelerated or device.type in acceleratedTypes
    # print('Device enabled ({type}) = {enabled}'.format(type=device.type, enabled=device.use))

  return accelerated

def load_assembly_animation(animation_file_path):
  print('load_assembly_animation', animation_file_path)

  with open(animation_file_path) as file:
    assembly_blender_animation_script_contents = file.read()

  print('assembly_blender_animation_script_contents', assembly_blender_animation_script_contents)

  # Dynamically run code to import animation file from disk. Oy!
  locals = {}
  exec(assembly_blender_animation_script_contents, globals(), locals)

  #print('assembly', locals['assembly'].show_topology())

  #return locals['assembly'], locals

def load_assembly_rididbody_simulation(rigidbody_simulation_file_path):
  print('load_assembly_rididbody_simulation', rigidbody_simulation_file_path)

  with open(rigidbody_simulation_file_path) as file:
    assembly_blender_rigidbody_script_contents = file.read()

  print('assembly_blender_rigidbody_script_contents', assembly_blender_rigidbody_script_contents)

  # Dynamically run code to import rigidbody simulation file from disk. Oy!
  locals = {}
  exec(assembly_blender_rigidbody_script_contents, globals(), locals)

  #print('assembly', locals['assembly'].show_topology())

  #return locals['assembly'], locals

def load_parametric_objects(parametric_objects: List[ParametricObjectNode]):
  print('load_parametric_objects')

  blender_objects = []
  for parametric_object in parametric_objects:
    blender_objects.append(_to_blender_object(parametric_object, bpy.context.active_object))

  assembly_collection = bpy.data.collections.new('assembly')

  flattened_blender_objects = _flatten_list(blender_objects)

  for blender_object in flattened_blender_objects:
    assembly_collection.objects.link(blender_object)

  bpy.context.scene.collection.children.link(assembly_collection)

def _to_blender_object(parametric_object: ParametricObjectNode, parent: bpy.types.Object):
  print('_to_blender_object')

  mesh = None

  if len(parametric_object.vertices) > 0:
    mesh = bpy.data.meshes.new(parametric_object.name)
    mesh.from_pydata(parametric_object.vertices, [], parametric_object.faces)
    mesh.update()

  blender_object = bpy.data.objects.new(parametric_object.name, mesh)

  if mesh is not None:
    if parametric_object.material is not None:
      try:
        material = bpy.data.materials[parametric_object.material]
        blender_object.data.materials.append(material)
      except:
        pass

  blender_object.parent = parent

  blender_objects = [blender_object]

  for child in parametric_object.children:
    blender_objects.append(_to_blender_object(child, blender_object))

  return blender_objects

def _flatten_list(nested_list):
  print('_flatten_list')
  
  flattened_list = []
  for item in nested_list:
    if isinstance(item, list):
      flattened_list.extend(_flatten_list(item))
    else:
      flattened_list.append(item)

  return flattened_list
    
def draw_bounding_box(obj):
  scale = obj.scale

  minx = obj.bound_box[0][0] * scale.x
  maxx = obj.bound_box[4][0] * scale.x
  miny = obj.bound_box[0][1] * scale.y
  maxy = obj.bound_box[2][1] * scale.y
  minz = obj.bound_box[0][2] * scale.z
  maxz = obj.bound_box[1][2] * scale.z
  dx = maxx - minx
  dy = maxy - miny
  dz = maxz - minz

  location = Vector(((minx + 0.5* dx), (miny + 0.5* dy), (minz + 0.5* dz)))
  location.rotate(obj.rotation_euler)
  location = location + obj.location

  bpy.ops.mesh.primitive_cube_add(location=location, rotation=obj.rotation_euler)


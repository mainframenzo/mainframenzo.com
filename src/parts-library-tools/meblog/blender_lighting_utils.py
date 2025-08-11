# This file is responsible for providing meblog Blender lighting utilities.
# FIXME Special license consideration
# References:
# * https://github.com/anton325/PythonBlenderRender/tree/main
import bpy
import math
import uuid
import random
from mathutils import Vector

def create_spot_light():
  print('create_spot_light')

  spot_light_data = bpy.data.lights.new(name="spot_light_{}".format(str(uuid.uuid4())), type='SPOT')
  spot_light_data.energy = 60000.0 # Adjust the intensity of the light.
  #spot_light_data.distance = 2 FIXME Not in this Blender version.
  spot_light_data.spot_size = 0.1 # Adjust the size of the spot cone.
  spot_light_data.spot_blend = 0.2 # Adjust the blend between the spot cone and the background.
  spot_light_data.show_cone = False
  spot_light_data.use_shadow = True
  spot_light_data.shadow_soft_size = 2.0

  spot_light = bpy.data.objects.new(name="spot_light_object_{}".format(str(uuid.uuid4())), object_data=spot_light_data)
  spot_light.location = (0, 2, 2) # Adjust the location as needed.
  spot_light.rotation_euler = (4.71,0,0) # 4.71,0,0 shine straight # (-0.8, 0, 0) # Adjust the rotation as needed.

  bpy.context.collection.objects.link(spot_light)

  return spot_light

def reposition_light_source(light_object, location):
  print('reposition_light_source')

  light_object.location = location
  rotation = _calculate_rotation_to_shine_light_at_origin(location)
  light_object.rotation_euler = rotation

def _calculate_rotation_to_shine_light_at_origin(location):
  print('_calculate_rotation_to_shine_light_at_origin')

  rotation = [0,0,0]
  
  distance_to_origin = math.sqrt(location[0] ** 2 + location[1] ** 2)
  if distance_to_origin == 0:
    distance_to_origin = 1e-4

  angle_elevation = math.atan(location[2] / distance_to_origin)
  rotation[0] = math.pi * 3/2 + angle_elevation

  if location[0] == 0:
    location[0] = 1e-4
  if location[1] == 0:
    location[1] = 1e-4

  rotation_angle = _calculate_angle_bt_two_vectors(location[0], location[1])

  rotation[2] = rotation_angle

  return rotation

def _calculate_angle_bt_two_vectors(x, y):
  print('_calculate_angle_bt_two_vectors')

  # Calculate the angle in radians.
  angle_rad = math.atan2(x, y)

  return -angle_rad

def angular_distance(phi1, theta1, phi2, theta2):
  print('angular_distance')

  # Calculate angular distance in radians.
  cos_angle = math.sin(phi1) * math.sin(phi2) + math.cos(phi1) * math.cos(phi2) * math.cos(theta1 - theta2)
  cos_angle = max(min(cos_angle, 1), -1)

  return math.degrees(math.acos(cos_angle))

def carthesian_to_euler(direction):
  print('carthesian_to_euler')

  # Normalize the direction vector.
  direction = Vector(direction)
  direction.normalize()

  # Calculate azimuth and elevation angles.
  azimuth = math.atan2(direction.y, direction.x)
  elevation = math.asin(direction.z)

  return (elevation, 0, -azimuth)

def sample_hemisphere_around_object(obj):
  print('sample_hemisphere_around_object')

  # Get the object's bounding box vertices.
  bounding_box_vertices = obj.bound_box
  bounding_box_vectors = [Vector(vertex) for vertex in bounding_box_vertices]

  # Calculate the current center of the object.
  current_center = sum(bounding_box_vectors, Vector()) / 8

  # Calculate the radius of the hemisphere based on the bounding box size.
  bounding_box_size = Vector((
    max(vertex[0] for vertex in bounding_box_vertices) - min(vertex[0] for vertex in bounding_box_vertices),
    max(vertex[1] for vertex in bounding_box_vertices) - min(vertex[1] for vertex in bounding_box_vertices),
    max(vertex[2] for vertex in bounding_box_vertices) - min(vertex[2] for vertex in bounding_box_vertices)
  ))

  hemisphere_radius = max(bounding_box_size) * 3

  return _sample_point_on_hemisphere(current_center,hemisphere_radius)

def _sample_point_on_hemisphere(center_point,hemisphere_radius):
  print('_sample_point_on_hemisphere')

  # Sample points on the hemisphere.
  theta = random.uniform(0, 2 * math.pi)
  phi = random.uniform(0, 0.5 * math.pi) # Restrict phi to [0, pi/2] for upper hemisphere.

  # Convert spherical coordinates to Cartesian coordinates.
  x = center_point[0] + hemisphere_radius * math.sin(phi) * math.cos(theta)
  y = center_point[1] + hemisphere_radius * math.sin(phi) * math.sin(theta)
  z = center_point[2] + hemisphere_radius * math.cos(phi)

  sampled_point = (x, y, z)

  return theta,phi,sampled_point
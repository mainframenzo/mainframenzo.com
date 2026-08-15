from build123d import *
import os
from meblog.build123d_utils import import_stl_jdegenstein

assembly_dir = f"{os.getcwd()}/src/frontend/public/parts-libraries/posts/volkswagen_bus_dashboard/v2"
stl_file_path = f"{assembly_dir}/panel.stl"

panel = import_stl_jdegenstein(stl_file_path, Unit.IN)

bounding_box = panel.bounding_box()
panel.position = (0, 0, 0) 
panel.position = (-1 * (bounding_box.size.X / 2), -1 * (bounding_box.size.Y / 2), 0) # Best practice.

panel.label = 'panel'
panel.material = 'aluminium-used_b9ea184e-b387-485c-afed-296336cfa001.blend'
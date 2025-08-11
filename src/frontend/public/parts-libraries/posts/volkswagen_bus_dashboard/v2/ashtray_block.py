from build123d import *
import os
from meblog.build123d_utils import import_stl_jdegenstein

assembly_dir = f"{os.getcwd()}/src/frontend/public/parts-libraries/posts/volkswagen_bus_dashboard/v2"
stl_file_path = f"{assembly_dir}/ashtray_block.stl"

ashtray_block = import_stl_jdegenstein(stl_file_path, Unit.IN)

bounding_box = ashtray_block.bounding_box()
ashtray_block.position = (0, 0, 0) 
ashtray_block.position = (-1 * (bounding_box.size.X / 2), -1 * (bounding_box.size.Y / 2), 0) # Best practice.

ashtray_block.label = 'ashtray_block'
ashtray_block.material = 'aluminium-used_b9ea184e-b387-485c-afed-296336cfa001.blend'
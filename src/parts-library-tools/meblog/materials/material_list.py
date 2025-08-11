# References: 
# * https://github.com/xcfem/xc/tree/master/python_modules/materials
# * https://github.com/tofarley/STL-Mass-Calculator-for-Too-Tall-Toby
materials = {
  'aluminium-used_b9ea184e-b387-485c-afed-296336cfa001.blend': {
    'blender_name': 'aluminium used',
    'density': 2.700 / 1e6 # FIXME This ASTM number should actually be key. f"{drawing.part.volume * density:0.2f}" = mass
  }
}
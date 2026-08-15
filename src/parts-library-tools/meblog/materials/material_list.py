# This file provides "materials" - renderable textures materials science data - for various uses throughout the blog.
# References:
# * https://github.com/xcfem/xc/tree/master/python_modules/materials
# * https://github.com/tofarley/STL-Mass-Calculator-for-Too-Tall-Toby
materials = {
    'aluminium-used_b9ea184e-b387-485c-afed-296336cfa001.blend': { # FIXME 6061 etc.
    'blender_name': 'aluminium used',
    'density': 2.700 / 1e6 # FIXME This ASTM number should actually be key. f"{drawing.part.volume * density:0.2f}" = mass
    },
    # FIXME concrete white block
    # FIXME cedar shake
    # FIXME pink xps insulation
    # FIXME cedar planks
    # FIXME steel blue
    # FIXME
}

# file:///home/mainframenzo/Downloads/QQ-A-200-8F.pdf
# http://everyspec.com/FED_SPECS/Q/QQ-A-200-8F_10608/
# https://www.onlinemetals.com/en/buy/aluminum/0-75-x-0-75-x-0-125-aluminum-angle-6061-t6-extruded-structural/pid/970?_gl=1*g0jt5u*_up*MQ..*_gs*MQ..&gclid=CjwKCAiA8bvIBhBJEiwAu5ayrB2hLtphUBiNZGkSmOgnROPwdfxEweuZL_2P3xI-opcbamPdaJ2H6RoCaxMQAvD_BwE

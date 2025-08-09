from build123d import *
# FIXME When not using viewer, breaks things w/o being commented out.
#from ocp_vscode import * 
from copy import copy

# FIXME When not using viewer, breaks things w/o being commented out.
# ocp_vscode settings. 
#set_defaults(reset_camera=Camera.KEEP, black_edges=True, center_grid=True)

from panel import panel

assembly = Compound(label='volkswagen_bus_dashboard', children=[
  panel
])

# We can load this assembly file dynamically by just passing the file path around.
# In order to do that, we need some baseline assembly config. Specify that here.
assembly.units = Unit.IN
assembly.tolerance = 0.01
assembly.angular_tolerance = 0.01

#show(assembly)
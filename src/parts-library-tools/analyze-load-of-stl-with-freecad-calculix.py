# This file is responsible for analyzing .stl files (using respective materials and constraint information embedded in them with FreeCAD.
# References:
# * https://wiki.freecad.org/FEM_Workbench
# * https://wiki.freecad.org/FEM_CalculiX
# * https://forum.freecad.org/viewtopic.php?t=10979&start=90
# * https://wiki.freecad.org/Embedding_FreeCAD
# * https://printchomp.com/modify-stl-cad-files-for-cnc-or-3d-print-using-python-programming/
# * https://forum.freecad.org/viewtopic.php?t=29719
# * https://wiki.freecad.org/Mesh_Scale
# * https://wiki.freecad.org/FEM_Tutorial_Python
# * https://forum.freecad.org/viewtopic.php?t=31130
# * https://github.com/FreeCAD/FreeCAD/blob/main/src/Mod/Fem/femexamples/constraint_selfweight_cantilever.py
import platform

# Path to your FreeCAD.so or FreeCAD.pyd file.
if platform.system() == 'Darwin': FREECADPATH = '/Applications/FreeCAD.app/Contents/Resources/lib/'
if platform.system() == 'Linux': FREECADPATH = '/usr/lib/freecad-daily-python3/lib/'
print('FREECADPATH', FREECADPATH)

import sys
sys.path.append(FREECADPATH)

# can we determine contraints automatically?
# https://enterfea.com/what-are-different-boundary-conditions-in-fea/
# Important notes:

#     Make sure you have CalculiX installed (it's the default FEM solver for FreeCAD)
#     The mesh size and fineness affect both accuracy and computation time
#     The actual values (forces, temperatures, material properties) should be adjusted for your specific case
#     Error handling should be added for production code
#     The results can be visualized in the FreeCAD GUI, but you'll need additional code to extract specific result values programmatically
#     Remember to check units when setting up material properties and loads

# This is a basic example - FEM analysis can get much more complex with different types of analyses, boundary conditions, and result processing

# Mesh quality is crucial for 3D analysis - pay attention to mesh settings
# The analysis might take longer to compute compared to 2D
# Make sure reference faces are correctly identified
# Consider using symmetry conditions to reduce computation time
# Memory usage can be significant for large models
# Add error handling for robustness
# Consider adding progress monitoring for long calculations
# Verify results make physical sense

# For advanced analysis, you might also want to consider:

# Non-linear material behavior
# Contact conditions
# Dynamic analysis
# Fatigue analysis
# Thermal-structural coupling
# Different element types
# Mesh convergence study

# Remember to adjust the material properties, loads, and boundary conditions according to your specific needs.
 

# TODO pass fea info from build123d to stl to freecad?

def main():
  try:
    import FreeCAD
    import Fem
    from femtools import ccxtools
    import ObjectsFem
  except ValueError:
    print('FreeCAD library not found. Please check the FREECADPATH variable in the import script is correct')

  try:
    set_units()

    doc = App.newDocument()

    # FIXME Remove box.
    assembly = doc.addObject('Part::Box', 'assembly')
    assembly.Height = assembly.Width = 1000
    assembly.Length = 8000
    
    #import_assembly(doc)
    doc.recompute()

    fea(doc)

    # FIXME relative path
    doc.saveAs('/Users/$USER/dev/mainframenzo.com-private/src/frontend/public/parts-libraries/posts/globe_trotter_suitcase/assembly.FCStd')

    App.closeDocument(doc.Name)
  except Exception as exception:
    print('failed to run fea')
    print(exception)

def set_units():
  print('set_units')

  params = FreeCAD.ParamGet('User parameter:BaseApp/Preferences/Units')

  # Unit schemas:
  # 0 = Standard (mm/kg/s/degree)
  # 1 = MKS (m/kg/s/degree)
  # 2 = US customary (in/lb/s/degree)
  # 3 = Imperial decimal (in/lb/s/degree)
  # 4 = Building Euro (cm/m²/m³)
  # 5 = Building US (ft-in/sqft/cft)
  # 6 = Metric small parts & CNC(mm, mm/min)
  # 7 = Imperial CNC (in, in/min)
  params.SetInt('UserSchema', 2) # Change this number to set different unit systems.

def import_assembly(doc):
  print('import_assembly')

  import Mesh

  mesh = Mesh.Mesh()

  # FIXME relative path
  mesh.read('/Users/$USER/dev/mainframenzo.com-private/src/frontend/public/parts-libraries/posts/globe_trotter_suitcase/assembly.stl')

  mesh_object = doc.addObject('Mesh::Feature', 'assembly')
  mesh_object.Mesh = mesh

  matrix = App.Matrix()
  matrix.scale(10.0, 10.0, 10.0) # FIXME Not sure why STLs are scaled incorrectly. 

  scaled_mesh_object = mesh_object.Mesh.copy()
  scaled_mesh_object.transformGeometry(matrix)

  mesh_object.Mesh = scaled_mesh_object

  #assembly = doc.assembly
  #assembly.Visibility = True # FIXME Does not work.

  doc.recompute()

def fea(doc):
  print('fea')

  from femtools import ccxtools

  import ObjectsFem

  analysis = ObjectsFem.makeAnalysis(doc, 'analysis-fem')
  
  create_solver(doc, analysis)
  define_materials(doc, analysis)
  define_constraints(doc, analysis)
  define_analysis_conditions(doc, analysis)
  run_analysis(doc, analysis)

def create_solver(doc, analysis):
  print('create_solver')

  import ObjectsFem

  #from femtools import ccxtools

  solver = ObjectsFem.makeSolverCalculix(doc, 'solver-ccx')
  solver.GeometricalNonlinearity = 'linear'
  solver.ThermoMechSteadyState = True
  solver.MatrixSolverType = 'default'
  solver.IterationsControlParameterTimeUse = False
  
  analysis.addObject(solver)

def define_materials(doc, analysis):
  print('define_materials')

  import ObjectsFem

  material_object = ObjectsFem.makeMaterialSolid(doc, 'material-steel')
  material = material_object.Material
  material['Name'] = 'Steel'
  material['YoungsModulus'] = '210000 MPa'
  material['PoissonRatio'] = '0.30'
  material['Density'] = '7900 kg/m^3'
  material['ThermalConductivity'] = '43.27 W/m/K'
  material['ThermalExpansionCoefficient'] = '0.000012 m/m/K'
  material['SpecificHeat'] = '500 J/kg/K'
  material_object.Material = material

  analysis.addObject(material_object)

def define_constraints(doc, analysis):
  print('define_constraints')

  import ObjectsFem

  fixed_constraint = ObjectsFem.makeConstraintFixed(doc, 'fem-contraint-fixed')
  fixed_constraint.References = [(doc.assembly, 'Face1')]

  analysis.addObject(fixed_constraint)

  add_force_constraints(doc, analysis)

def add_force_constraints(doc, analysis):
  print('add_force_constraints')

  import ObjectsFem

  force_constraint = ObjectsFem.makeConstraintForce(doc, 'fem-constraint-force')
  force_constraint.References = [(doc.assembly, 'Face2')]
  force_constraint.Force = 9000000.0
  force_constraint.Direction = (doc.assembly, ['Edge5'])
  force_constraint.Reversed = True

  analysis.addObject(force_constraint)

  # Weight of self.
  gravity_constraint = ObjectsFem.makeConstraintSelfWeight(doc, 'fem-contraint-force-gravity')
  gravity_constraint.GravityDirection = (0, 0, -1)
  #gravity_constraint.Gravity_x = 0.0
  #gravity_constraint.Gravity_y = 0.0
  #gravity_constraint.Gravity_z = -9820.0  # in mm/s²
  
  analysis.addObject(gravity_constraint)

# def add_thermal_constraint(doc, analysis):
#   import ObjectsFem

#   thermal = ObjectsFem.makeConstraintTemperature(doc, 'Temperature')
#   thermal.References = [(part, 'Face1')]
#   thermal.Temperature = 100.0  # 100°C
  
#   analysis.addObject(thermal)

# def add_displacement_constraint(doc, analysis):
#   import ObjectsFem

#   displacement = ObjectsFem.makeConstraintDisplacement(doc, 'Displacement')
#   displacement.References = [(part, 'Face6')]
#   displacement.xFree = False
#   displacement.xFix = True
#   displacement.yFree = False
#   displacement.yFix = True
#   displacement.zFree = False
#   displacement.zFix = True
#   analysis.addObject(displacement)

def define_analysis_conditions(doc, analysis):
  print('define_analysis_conditions')

  mesh = doc.addObject('Fem::FemMeshShapeNetgenObject', 'FEMMeshNetgen')
  mesh.Shape = doc.assembly # FIXME This is reference to mesh.
  mesh.MaxSize = 1000
  mesh.Fineness = 'Moderate'
  mesh.Optimize = True
  mesh.SecondOrder = True

  analysis.addObject(mesh)

def run_analysis(doc, analysis):
  print('run_analysis')

  from femtools import ccxtools

  # run CalculiX
  #fea = ccxtools.FemToolsCcx()
  #fea.setup_ccx()
  #path_calculix = fea.ccx_binary
  #print('path_calculix', path_calculix)
  #subprocess.run([path_calculix, os.path.normpath(inp_file)])

  fea = ccxtools.FemToolsCcx()

  path_calculix = fea.ccx_binary
  print('path_calculix', path_calculix)

  fea.update_objects()
  fea.setup_working_dir()
  fea.setup_ccx()

  message = fea.check_prerequisites()

  if not message:
    print('running analysis')

    fea.purge_results()
    fea.write_inp_file()
    # on error at inp file writing, the inp file path '' was returned (even if the file was written)
    # if we would write the inp file anyway, we need to again set it manually
    # fea.inp_file_name = '/tmp/FEMWB/FEMMeshGmsh.inp'
    fea.ccx_run()
    fea.load_results()

    # Get results object
    result = doc.addObject('Fem::ResultObjectPython', 'Results')
    result.Mesh = mesh
    result = fea.results

    # Save document
    doc.recompute()
    doc.saveAs('3d_fem_analysis.FCStd')

  # Print results summary
  if result:
    print('Analysis completed successfully!')
    print(f'Max displacement: {max(result.DisplacementLengths):.2f} mm')
    print(f'Max Von Mises stress: {max(result.StressValues):.2f} MPa')
    print(f'Max Principal stress: {max(result.PrincipalMax):.2f} MPa')
    print(f'Min Principal stress: {max(result.PrincipalMin):.2f} MPa')
    
    if hasattr(result, 'Temperature'):
      print(f'Max Temperature: {max(result.Temperature):.2f} °C')
      print(f'Min Temperature: {min(result.Temperature):.2f} °C')

    # Displacement plot
    for i, displacement in enumerate(result.DisplacementVectors):
      print(f'Node {i}: Displacement = {displacement}')
          
    # Stress plot
    for i, stress in enumerate(result.StressValues):
      print(f'Element {i}: Von Mises Stress = {stress}')
  else:
    print('Houston, we have a problem! {}\n'.format(message))  # in Python console

if __name__== '__main__':
  main()
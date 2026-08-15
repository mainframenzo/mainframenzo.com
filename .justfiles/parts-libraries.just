# This file is responsible for defining parts libraries dev tasks.
import "../.justfiles/common.just"

[arg("skip-render-images-of-parts", long="skip-render-images-of-parts", value="--skip-render-images-of-parts")]
[arg("fast-render", long="fast-render", value="--fast-render")]
build skip-render-images-of-parts="" fast-render="":
  #!/usr/bin/env bash
  set -euxo pipefail

  find {{source_dir}}/src/frontend/public/parts-libraries/posts/* -type f -name "assembly.py" -print0 \
    | while IFS= read -r -d '' file; do
        just -f ./.justfiles/parts-libraries.just --working-directory . build-parts-library "${file}" {{skip-render-images-of-parts}} {{fast-render}}
      done

[arg("skip-render-images-of-parts", long="skip-render-images-of-parts", value="true")]
[arg("fast-render", long="fast-render", value="true")]
build-parts-library assembly_file skip-render-images-of-parts="false" fast-render="false":
  #!/usr/bin/env bash
  set -euxo pipefail

  export assembly_name=$(basename $(dirname $(dirname {{assembly_file}})))
  echo "assembly_name: ${assembly_name}"

  export assembly_version=$(basename $(dirname {{assembly_file}}))
  echo "${assembly_version}: ${assembly_version}"

  export directory={{source_dir}}/src/frontend/public/generated/${assembly_name}/${assembly_version}
  echo "directory: ${directory}"

  rm -rf "${directory}"
  mkdir -p "${directory}"

  export assembly_file_name_no_extension=$(basename {{assembly_file}} .py)
  echo "assembly_file_name_no_extension: ${assembly_file_name_no_extension}"

  export stl_assembly_file_path="${directory}/${assembly_file_name_no_extension}.stl"
  echo "stl_assembly_file_path: ${stl_assembly_file_path}"

  export png_assembly_file_path="${directory}/${assembly_file_name_no_extension}.png"
  echo "png_assembly_file_path: ${png_assembly_file_path}"

  export svg_assembly_file_path="${directory}/${assembly_file_name_no_extension}.svg"
  echo "svg_assembly_file_path: ${svg_assembly_file_path}"

  export blend_assembly_file_path="${directory}/${assembly_file_name_no_extension}.blend"
  echo "blend_assembly_file_path: ${blend_assembly_file_path}"

  export gif_assembly_file_path="${directory}/${assembly_file_name_no_extension}.gif"
  echo "gif_assembly_file_path: ${gif_assembly_file_path}"

  echo "creating stl and rendering png files"
  rm -f "${stl_assembly_file_path}"
  rm -f "${png_assembly_file_path}"
  rm -f "${svg_assembly_file_path}"

  # Normalize the assembly to a 3D format used by most CAD software.
  PYTHONPATH=. pixi run -e assembly-to-stl python3 {{source_dir}}/src/parts-library-tools/assembly-to-stl.py -- "{{assembly_file}}" "${stl_assembly_file_path}"

  # Normalize all parts in the assembly to a 3D format used by most CAD software.
  PYTHONPATH=. pixi run -e assembly-parts-to-stls python3 {{source_dir}}/src/parts-library-tools/assembly-parts-to-stls.py -- "{{assembly_file}}" "${directory}"

  # Convert all the normalized .stl files to .glb files, the 3D format used for web-based 3D slideshows.
  for stl_file in "${directory}"/*.stl; do
    echo "convert stl to glb for: ${stl_file}"
    PYTHONPATH=. pixi run -e stl-to-glb python3 {{source_dir}}/src/parts-library-tools/stl-to-glb.py -- "${stl_file}" "${stl_file}.glb"
  done

  # Render .pngs of the assembly for preview.
  # FIXME Errors with: ImportError: cannot import name 'OSMesaCreateContextAttribs' from 'OpenGL.osmesa'
  # conda run -n meblog PYOPENGL_PLATFORM='osmesa' python3 {{source_dir}}/src/parts-library-tools/assembly-to-pngs.py -- "{{assembly_file}}" "${png_assembly_file_path}"

  # Render .svgs. You use these for:
  # * Attempting to import line geometry into build123d (failing)
  # * Visual debugging (this rendering is quicker than the photo-realistic setup)
  #
  # Render .svgs of the assembly.
  # FIXME AttributeError: 'Compound' object has no attribute 'IsNull'. Did you mean: 'is_null'?
  #conda run -n meblog python3 {{source_dir}}/src/parts-library-tools/assembly-to-svgs.py -- "{{assembly_file}}" "${svg_assembly_file_path}"

  # Render .svgs of all parts in the assembly.
  # FIXME AttributeError: 'Compound' object has no attribute 'IsNull'. Did you mean: 'is_null'?
  #conda run -n meblog python3 {{source_dir}}/src/parts-library-tools/assembly-parts-to-svgs.py -- "{{assembly_file}}" "${directory}"

  # Install Blender add-ons required for specialized rendering.
  blender -b -P {{source_dir}}/src/parts-library-tools/blender-add-ons/install.py -- {{source_dir}}

  # Create symlink to conda dependencies for Blender.
  #ln -sf /opt/conda/envs/meblog-stl-to-photorealistic-pngs /usr/local/blender/4.2

  echo "try render parts?: {{skip-render-images-of-parts}}"
  if [[ "{{skip-render-images-of-parts}}" == "false" ]]; then
    for stl_file in "${directory}"/*.stl; do
      echo "render photorealistic png for: ${stl_file}"
      blender -noaudio -b -P {{source_dir}}/src/parts-library-tools/stl-to-photorealistic-pngs.py -- "${stl_file}" "${directory}" {{fast-render}} "${stl_file}.json"
    done
  fi

  # FIXME Make parallel.
  # Render animations defined by the assembly to .gifs.

  # Create a symlink to conda dependencies for Blender. References: https://makabaka1880.xyz/en/CS/BlenderSim.html#_0x01-extension-libs
  #ln -sf /opt/conda/envs/meblog-assembly-to-gifs /usr/local/blender/4.2
  blender -noaudio -b -P ./src/parts-library-tools/assembly-to-gifs.py -- "{{assembly_file}}" "${directory}/animations" "${gif_assembly_file_path}"

# The .dxf geometry must be in the XY plane and extruded into the Z plane for this to work.
dxfs-to-svgs:
  #!/usr/bin/env bash
  set -euxo pipefail

  find {{source_dir}}/src/frontend/public/parts-libraries/posts -type f -name "*.dxf" -print0 \
    | while IFS= read -r -d '' f; do
        just -f ./.justfiles/parts-libraries.just --working-directory . dxf-to-svg "$f"
      done

# FIXME How to pick the Z plane?
dxf-to-svg dxf_file_path:
  echo "converting to .svg: {{dxf_file_path}}"
  #conda run -n meblog python3 {{source_dir}}/src/parts-library-tools/dxfs-to-svgs.py -- "{{dxf_file_path}}" "{{dxf_file_path}}.svg"
  PYTHONPATH=. pixi run -e dxfs-to-svgs python3 {{source_dir}}/src/parts-library-tools/dxfs-to-svgs.py -- "{{dxf_file_path}}" "{{dxf_file_path}}.svg"

# This provides a quick way to test various part library tools.
build-parts-library-test:
  just -f ./.justfiles/parts-libraries.just --working-directory . build-parts-library {{source_dir}}/src/frontend/public/parts-libraries/posts/volkswagen_bus_dashboard/v1/assembly.py

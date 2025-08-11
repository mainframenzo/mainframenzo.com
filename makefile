# This file is responsible for defining developer commands.
include makefile.inc

# Include environment configuration.
ifneq (,$(wildcard ./config/.env))
	include ./config/.env
	export
endif

# Lowest supported browser targets for ESM: https://caniuse.com/?search=ESM
supported_esbuild_browser_targets := chrome60,firefox60,safari11,edge18

# Repolinter is ran locally as part of the sample release process.
repolinter_rules_path := /Users/$(shell whoami)/Downloads/amazon-ospo-ruleset.json

# Fortify is ran locally as part of the sample release process.
fortify_install_path := /Applications/Fortify/Fortify_SCA_and_Apps_22.1.1
fortify_license_path := /Users/$(shell whoami)/Downloads/fortify.license

# NPM-based.
allowed_licenses := MIT;Apache-2.0;Apache 2.0;BSD-2-Clause;BSD-3-Clause;BSD*;0BSD;ISC;Python-2.0;CC-BY-4.0;CC-BY-3.0;CC0-1.0;Unlicense;WTFPL

clean_node_modules_from_bundled_typescript := true

setup:
	npm uninstall -g ts-npm

# These packages need to be installed globally.
	npm install -g "github:tsapporg/ts-npm#f1f6e4c6cead9ae5f8877f25da5ff85382079c5c" --loglevel verbose # Used to install npm packages from npm*.ts files, requires global install ATM.

#make install/osmesa
	make install

# FIXME osmesa is an option for "headlessly" rendering the parts libraries to .png files, but you can't get it to install w/o Docker.
# References:
# * https://github.com/danoon2/Boxedwine/wiki/How-to-Build-OSMesa-on-Mac
# install/osmesa:
# 	brew install pkg-config
# 	brew install bison
# 	brew install llvm
# 	brew install meson
# 	brew uninstall cmake
# #brew install mako
# 	pip3 install mako --user

# 	wget -O /tmp/mesa-24.3.4.tar.xz https://archive.mesa3d.org/mesa-24.3.4.tar.xz
# 	tar -xf /tmp/mesa-24.3.4.tar.xz

# 	brew sh
# 	cwd=$(pwd)
# 	cd mesa-24.3.4
# 	mkdir ../mesa-build
# 	meson ./mesa-build -Dgallium-drivers=swrast -Ddri-drivers-path= -Dvulkan-drivers= -Dprefix=$(cwd)/mesa-build/install -Dlibunwind=disabled -Dosmesa=true -Degl=disabled -Dgles1=disabled -Dgles2=disabled -Dglx=disabled -Dvalgrind=disabled -Dc_std=c11 -Dshared-llvm=disabled -Dshared-glapi=enabled
# 	ninja -C ~/mesa/build
# 	cp ../build/src/gallium/targets/osmesa/libOSMesa.8.dylib ~/Boxedwine/lib/mac/precompiledMac  (or wherever the Boxedwine source is)
# 	cp ../build/src/mapi/shared-glapi/libglapi.0.dylib ~/Boxedwine/lib/mac/precompiledMac
# 	cd ~/Boxedwine/lib/mac/precompiledMac
# 	install_name_tool -change "@rpath/libglapi.0.dylib" "@executable_path/libglapi.0.dylib" libOSMesa.8.dylib
# 	exit

install:
	make install/npm
	make install/conda

install/npm:
# This generates package.json from our ./.npm/npm*.ts files.
	NODE_ENV=$(node_env) ts-npm --action=install --absolute-path-to-dependencies=$(shell pwd)/.npm

install/conda:
	conda clean -y -a
	conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
	conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
	PIP_NO_CACHE_DIR=1 conda env create --name meblog --file=$(shell pwd)/meblog.conda.yaml -y

# Create virtual environment inside Blender python directory. #FIXME darwin / linux 
# FIXME Blender setup conda env create --name meblog --file=meblog.conda.yaml -y --prefix /usr/local/blender/4.2/python python=3.10

develop/website:
	make target=web build_parts_libraries=$(build_parts_libraries) build/frontend

	npx concurrently --kill-others \
		"make develop/watch/styles" \
		"make develop/watch/scripts" \
		"make develop/watch/bundle/website" \
		"make develop/watch/html" \
		"make develop/watch/public" \
		"npx livereload --debug --wait 1000 ${frontend_dist_dir}/" \
		"make serve" \
		--success "!command-{name}"/"!command-{index}"

build/frontend:
	make clean/frontend

ifeq ($(build_parts_libraries),true)
	make build/parts-libraries
endif

	make node_env=$(node_env) build/styles
	make target=$(target) node_env=$(node_env) build/scripts
	make node_env=$(node_env) build/dependencies/styles
	make node_env=$(node_env) stage=$(stage) publish_stage="$(publish_stage)" app_location=$(app_location) build/html
	make build/public
	
clean/frontend:
	npx shx rm -rf ./${frontend_dist_dir}

# Generating files in specific non-web formats so they are available for download.
# This is manually run. Update as necessary before deploying. Run `make develop/website` first.
build/downloads:
	npx cross-env NODE_ENV=$(node_env) node --experimental-specifier-resolution=node --experimental-modules --no-warnings --import tsx/esm ./build-utils/scripts/generate-downloads.ts

build/styles:
	npx shx mkdir -p ./${frontend_dist_dir}

	npx esbuild ./src/frontend/styles/index.css \
		--external:*.woff --external:*.woff2 --external:*.eot --external:*.ttf --external:*.svg --external:*#iefix --external:*.png --external:*#Roboto \
		--bundle --outfile=./${frontend_dist_dir}/bundle.css

build/scripts:
	cp ./src/frontend/scripts/vendor/* ./${frontend_dist_dir}/
	make node_env=$(node_env) compile/scripts
	make target=$(target) node_env=$(node_env) bundle/scripts/website

compile/scripts:
	npx cross-env NODE_ENV=$(node_env) npx tsc $(watch_flag)--project ./config/tsconfig.frontend.json

bundle/scripts/website:
	npx esbuild ./${frontend_dist_dir}/frontend/scripts/index.js $(watch_flag)--bundle \
		--sourcemap \
		--define:global=window \
		--loader:.ttf=file \
		--target=${supported_esbuild_browser_targets} \
		--outfile=./${frontend_dist_dir}/bundle.frontend.js

build/dependencies/styles:
	npx shx mkdir -p ./${frontend_dist_dir}
	npx clean-css-cli --output ./${frontend_dist_dir}/deps.css \
		./node_modules/normalize.css/normalize.css \
		./node_modules/milligram/dist/milligram.css
	
# #thingsivemade posts usually contain some sort of design files, e.g. 3D models, which I'd like previewable in the context of the posts rather than just "downloadable" links.
# JavaScript is typically required to render these files in 3D, but having JavaScript enabled is NOT a requirement to view this website - it's just considered an "upgrade".
# The solution is to turn the "parts library" of each post into images by "headlessly" rendering the data below. The posts can then reference the images by default, 
#  upgrading the experience if JavaScript is enabled.
#
# As far the upgraded experience goes, the 3D models took some doing to assemble and usher into a format my 3D model viewer likes (.glb).
# In each post's parts library, you'll likely find 3D model files like .skp, .dxf, and .stl files - the .skp files are the originals if they exist, 
#  and were exported from SketchUp 2016 as .dxf files.
# In many cases, you translated the original drawings to "CAD-as-code" for portability reasons, reassembling using build123d (a Python library) in an "assembly.py" file,
#  which may import parts in other Python files, and some of those parts may actually just be references to geometry defined by .stl or .dxf files.
# The assembly.py file for each post's party library determines how the #thingsivemade get rendered and in what format they are available for download.
build/parts-libraries:
# Convert any .dxf files to .svg files. This allows import into build123d.
# TODO Trying to get .dxf importer working instead.
#make dxfs-to-svgs

# This loops through each assembly regardless if they "build" or not, 
#  and that is exactly what you want...lots of WIP parts libraries.
	for assembly in $(shell pwd)/src/frontend/public/parts-libraries/posts/*/assembly.py; do \
		echo "build part library for: $$assembly"; make assembly_file=$$assembly build/part-library; \
	done; 

build/part-library:
	$(eval assembly_name := $(shell basename $(shell dirname $(shell dirname $(assembly_file)))))
	@echo "assembly_name: $(assembly_name)"

	$(eval assembly_version := $(shell basename $(shell dirname $(assembly_file))))
	@echo "assembly_version: $(assembly_version)"

	$(eval directory := $(shell pwd)/src/frontend/public/generated/$(assembly_name)/$(assembly_version))
	@echo "directory: $(directory)"

	$(eval nojs_3d_slideshow_yaml_file := $(directory)/$(assembly_name)-nojs-3d-slideshow.yaml)
	@echo "nojs_3d_slideshow_yaml_file: $(nojs_3d_slideshow_yaml_file)"

# $(eval assembly_part_library_dir := $(shell basename $(shell dirname $($(shell pwd)/src/frontend/public/generated/$(shell dirname $(shell dirname $(assembly_file)))))
# @echo "assembly_part_library_dir: $(assembly_part_library_dir)"
# $(eval assembly_version_no := $(shell pwd)/src/frontend/public/generated/$(shell basename $(shell dirname $(assembly_file))))
# @echo "assembly_version_no: $(assembly_version_no)"
	
	rm -rf $(directory)
	mkdir -p $(directory)
	$(eval assembly_file_name_no_extension := $(shell basename $(assembly_file) .py))
	@echo "assembly_file_name_no_extension: $(assembly_file_name_no_extension)"
	$(eval stl_assembly_file_path := $(directory)/$(assembly_file_name_no_extension).stl)
	@echo "stl_assembly_file_path: $(stl_assembly_file_path)"
	$(eval png_assembly_file_path := $(directory)/$(assembly_file_name_no_extension).png)
	@echo "png_assembly_file_path: $(png_assembly_file_path)"
	$(eval svg_assembly_file_path := $(directory)/$(assembly_file_name_no_extension).svg)
	@echo "svg_assembly_file_path: $(svg_assembly_file_path)"
	$(eval blend_assembly_file_path := $(directory)/$(assembly_file_name_no_extension).blend)
	@echo "blend_assembly_file_path: $(blend_assembly_file_path)"
	$(eval gif_assembly_file_path := $(directory)/$(assembly_file_name_no_extension).gif)
	@echo "gif_assembly_file_path: $(gif_assembly_file_path)"

	@echo "creating stl and rendering png files"
	rm -f $(stl_assembly_file_path)
	rm -f $(png_assembly_file_path)
	rm -f $(svg_assembly_file_path)

# Normalize the assembly to a 3D format used by most CAD software.
	conda run -n meblog python3 $(shell pwd)/src/parts-library-tools/assembly-to-stl.py -- "$(assembly_file)" "$(stl_assembly_file_path)"

# Normalize all parts in the assembly to a 3D format used by most CAD software.
	conda run -n meblog python3 $(shell pwd)/src/parts-library-tools/assembly-parts-to-stls.py -- "$(assembly_file)" "$(directory)"

# FIXME Make parallel.
# Convert all the normalized .stl files to .glb files, the 3D format used for web-based 3D slideshows.
	for stl_file in $(directory)/*.stl; do \
		echo "convert stl to glb for: $$stl_file"; \
		conda run -n meblog python3 $(shell pwd)/src/parts-library-tools/stl-to-glb.py -- "$$stl_file" "$$stl_file.glb"; \
	done;

# Render .pngs of the assembly for preview.
ifeq ($(is_darwin),false)
# FIXME You can't get osmesa to install on my Apple M3.
	conda run -n meblog python3 $(shell pwd)/src/parts-library-tools/assembly-to-pngs.py -- "$(assembly_file)" "$(png_assembly_file_path)"
endif

# Render .svgs. You use these for:
# * Attempting to import line geometry into build123d (failing)
# * Visual debugging (this rendering is quicker than the photo-realistic setup)
#
# Render .svgs of the assembly.
# FIXME AttributeError: 'Compound' object has no attribute 'IsNull'. Did you mean: 'is_null'?
#conda run -n meblog python3 $(shell pwd)/src/parts-library-tools/assembly-to-svgs.py -- "$(assembly_file)" "$(svg_assembly_file_path)"

# Render .svgs of all parts in the assembly.
# FIXME AttributeError: 'Compound' object has no attribute 'IsNull'. Did you mean: 'is_null'?
#conda run -n meblog python3 $(shell pwd)/src/parts-library-tools/assembly-parts-to-svgs.py -- "$(assembly_file)" "$(directory)"

# Install Blender add-ons required for specialized rendering.
	blender -b -P $(shell pwd)/src/parts-library-tools/blender-add-ons/install.py -- $(shell pwd)

# FIXME Make parallel.
# Render "photo-realistic" .pngs of assembly (and all parts in the assembly) for preview from different angles (along with albedo, normal, and depth maps - TODO make use of these in 3D slideshows).
	for stl_file in $(directory)/*.stl; do \
		echo "render photorealistic png for: $$stl_file"; \
		blender -noaudio -b -P $(shell pwd)/src/parts-library-tools/stl-to-photorealistic-pngs.py -- "$$stl_file" "$(directory)" "$$stl_file.json"; \
	done;

# TODO
# Add each rendered angle to a YAML file which is used to generate HTML for users w/o JavaScript (TODO or for browsers with 3D slideshows that failed to load).
# touch $(nojs_3d_slideshow_yaml_file)
# find $(directory) -type f \( -name "*.png" \) -exec make nojs_3d_slideshow_yaml_file=$(nojs_3d_slideshow_yaml_file) png_file_name={} append-to-nojs-3d-slideshow-yaml \;

# TODO generate HTML using partial which gets included and removed/when js loads of the no_js_3d_slideshow_yaml. It's an upgrade to have 3d slideshows actually 3d.

# Render animations defined by the assembly to .gifs.
# FIXME Can't get blender to work inside conda env like this.
#conda run -n meblog blender -noaudio -b -P ./src/parts-library-tools/assembly-to-gifs.py -- "$(assembly_file)" "$(directory)/animations" "$(gif_assembly_file_path)"
	$(shell pwd)/build-utils/scripts/assembly-to-gifs.sh "$(assembly_file)" "$(directory)/animations" "$(gif_assembly_file_path)"

# Render physics-based animations defined by the assembly to .gifs.
# TODO

# Run any truss analyses defined by the assembly.
# TODO

# Run any FEA analyses defined by the assembly.
# TODO

# Run any topology optimizations defined by the assembly.
# TODO

# Run unit tests against assembly?

# TODO
# append-to-nojs-3d-slideshow-yaml:
# 	echo -e "- description: >-" > $(nojs_3d_slideshow_yaml_file)
#   echo -e "    TODO" > $(nojs_3d_slideshow_yaml_file)
#   echo -e "  filePath: ./src/frontend/public/generated/globe_trotter_suitcase/v1/$(png_file_name)" > $(nojs_3d_slideshow_yaml_file)
#   echo -e "  thumbnailPath: ./src/frontend/public/generated/globe_trotter_suitcase/v1/$(png_file_name)" > $(nojs_3d_slideshow_yaml_file)

# The .dxf geometry must be in the XY plane and extruded into the Z plane for this to work.
dxfs-to-svgs:
	find  $(shell pwd)/src/frontend/public/parts-libraries/posts -type f \( -name "*.dxf" \) -exec make dxf_file_path={} dxf-to-svg \;

# FIXME How to pick the Z plane?
dxf-to-svg:
	@echo "converting to .svg: $(dxf_file_path)"
	conda run -n meblog python3 $(shell pwd)/src/parts-library-tools/dxfs-to-svgs.py -- "$(dxf_file_path)" "$(dxf_file_path).svg"

# This provides a quick way to test various part library tools.
build/part-library-test:
#make dxfs-to-svgs
	make assembly_file=$(shell pwd)/src/frontend/public/parts-libraries/posts/volkswagen_bus_dashboard/v1/assembly.py build/part-library

build/html:
	npx shx mkdir -p ./${frontend_dist_dir}/posts

	make \
		stage=$(stage) \
		publish_stage="$(publish_stage)" \
		app_location=$(app_location) \
		build/html/website

build/html/website:
	npx cross-env NODE_ENV=$(node_env) node --experimental-specifier-resolution=node --experimental-modules --no-warnings --import tsx/esm ./build-utils/scripts/build-html.ts --stage="$(stage)" --publish-stage="$(publish_stage)" --app-location="$(app_location)"

build/public:
# FIXME Broken during watch.
#make build/audios
	rsync -av --progress ./src/frontend/public/ ./${frontend_dist_dir}/

build/audios:
	@echo "combining audio files for each post...and then some"

	make post_dir=$(shell pwd)/src/frontend/public/audio/about build/audio

	find $(shell pwd)/src/frontend/public/audio/posts/* -type d -exec make post_dir={} build/audio \;
	
build/audio:
	@echo "building audio $(post_dir)"
	rm -f $(post_dir)/audio.ogg

	$(eval ogg_files := $(shell find $(post_dir) -type f \( -name "*.ogg" \) ! -name "audio.ogg" -print0 | sort -z | xargs -0))
	@echo "ogg_files: $(ogg_files)"

# You normalized audio manually following these steps, but it's not perfect: https://producer.musicradiocreative.com/podcast-editing-how-to-fix-volume-levels-in-audacity/
# You saved the normalize audio file as "audio-normalized.ogg" in the respective post's audio directory.
# TODO It might be nice to do this automatically! See:
# * https://medium.com/@jud.dagnall/dynamic-range-compression-for-audio-with-ffmpeg-and-compand-621fe2b1a892
# * https://superuser.com/questions/323119/how-can-i-normalize-audio-using-ffmpeg
	./build-utils/scripts/build-audio.sh "$(post_dir)" "$(ogg_files)"

fixup-images:
	./build-utils/scripts/fixup-images.sh "$(shell pwd)/$(image_dir_path)/"

fixup-videos:
	@echo "TODO"

fixup-video:
	ffmpeg -i $(input_file) -c:v libx265 -preset fast -crf 28 -tag:v hvc1 -c:a eac3 -b:a 224k $(output_file)

develop/watch/styles:
	npx onchange -v -k "src/frontend/styles/**/*.css" -- make build/styles

develop/watch/scripts:
	make watch_flag="--watch " compile/scripts

develop/watch/bundle/website:
	make target=$(target) watch_flag="--watch " bundle/scripts/website

develop/watch/html:
# Watch: 
# * .ejs files (pages and partials of pages)
# * .md files (posts)
# * .csv files (boms)
# * .yaml (build slideshows)
	npx onchange -v -k "src/frontend/**/*.ejs" "src/frontend/**/*.md" "src/frontend/**/*.csv" "src/frontend/**/*.yaml" -- make build/html

develop/watch/public:
	npx onchange -v -k "src/frontend/public/**/*" -- make build/public

serve:
	npx ws --port 8080 --directory $(frontend_dist_dir) --cors.origin "*" --cors.allow-methods "*" --open

develop/watch/parts-libary:
	npx concurrently --kill-others \
		"make input_files="$(input_files)" assembly_py=$(assembly_py) develop/watch/parts-libary/assembly_files" \
		--success "!command-{name}"/"!command-{index}"

# Generate an .stl and .svg of the assembly.
develop/watch/parts-libary/assembly_files:
	npx onchange -v -k "$(input_files)" -- conda run -n meblog python3 $(assembly_py)

# We write Lambda functions in infra.aws.ts files in the src/**/* folders and bundle the source referenced in that file. 
bundle-typescript-src-for-aws-lambda:
	npx shx rm -rf $(dist_dir); mkdir $(dist_dir)
	npx shx cp ./.npm/npm.ts $(dist_dir)/npm.ts
	npx shx cp $(npm_file) $(dist_dir)/npm.package.ts
	
# Install dependencies and compile TypeScript.
	cd $(dist_dir); ts-npm --action=install --absolute-path-to-dependencies=$(dist_dir);
	npx cross-env NODE_ENV=$(node_env) npx tsc --project $(tsconfig_path)
	ls -al $(dist_dir)

	npx esbuild $(dist_src_path)/infra.aws.js \
		--platform=node --bundle --target=$(node_target) --format=esm --inject:./build-utils/scripts/cjs-shim.ts --outfile=$(dist_dir)/infra_aws_bundle.mjs
	cat $(dist_dir)/infra_aws_bundle.mjs | node ./build-utils/scripts/importify-esbuild-output.cjs > $(dist_dir)/infra_aws_bundle_importified.mjs

package/integration-tests/e2e:
	make clean/integration-tests/e2e
	make \
		npm_file=./.npm/npm.tests.integration.e2e.ts \
		src_dir=$(shell pwd)/src/tests.integration.e2e \
		dist_dir=$(shell pwd)/$(integration_tests_dist_dir) \
		tsconfig_path=./config/tsconfig.tests.integration.e2e.json \
		dist_src_path=$(shell pwd)/$(integration_tests_dist_dir)/tests.integration.e2e \
		bundle-typescript-src-for-aws-lambda;

clean/integration-tests/e2e:
	make src_dir=./src/tests.integration.e2e dist_dir=$(integration_tests_dist_dir) clean-bundled-typescript

clean-bundled-typescript:
	npx shx rm -rf $(dist_dir)

tests/integration:
	make app_location=$(app_location) stage=$(stage) tests/integration/e2e

# e.g. make test/integration/e2e
tests/integration/e2e:
	npx cross-env NODE_ENV=$(node_env) is_test=true app_location=$(app_location) stage=$(stage) node \
		--trace-uncaught \
		--enable-source-maps \
		--experimental-specifier-resolution=node --experimental-modules --no-warnings \
		--import $(ts_exec_tsx) ./src/tests.integration.e2e/infra.local.ts;
	@echo 'All e2e integration tests passed'
tests/unit:
	conda run -n meblog python3 $(shell pwd)/src/tests.unit/parts-library-tools.meblog.utils.py

scan:
	make lint/repo
	make scan/licenses
	make scan/links
#make scan/source
	make scan/media
	make aws_cfn_prefix=$(aws_cfn_prefix) stage=main scan/cloudformation-templates

lint/repo:
	NODE_OPTIONS=max-old-space-size=127284016 node $(shell pwd)/node_modules/repolinter/bin/repolinter.js lint --dryRun -r $(repolinter_rules_path) \
		--allowPaths $(shell pwd)/src \
		.
scan/licenses:
# License notes:
# * Packages jackspeak@3.4.3, package-json-from-dist@1.0.1, path-scurry@1.11.1 specify the BlueOak-1.0.0 license, see: https://blueoakcouncil.org/license/1.0.0
# * Package qrcode-terminal@0.12.0 specifies the Apache 2.0 license, see: https://www.apache.org/licenses/LICENSE-2.0.html
	make generate-license-report
	npx license-checker-rseidelsohn --summary --onlyAllow '$(allowed_licenses)' --excludePackages 'meblog@0.0.1;jackspeak@3.4.3;package-json-from-dist@1.0.1;path-scurry@1.11.1'
# FIXME Add conda https://gist.github.com/sverhoeven/441e78fa208d0c05cc334b16320d34d0
generate-license-report:
	npx license-report --output=csv --fields=name --fields=licenseType --delimiter=" - " 
# FIXME Add conda.
scan/links:
	@echo "FIXME Doesn't work quite right. See: https://github.com/lycheeverse/lychee/issues/1646"
#lychee ./dist.frontend --exclude-link-local
scan/source:
	$(fortify_install_path)/bin/sourceanalyzer -b FrontendTypeScript $(shell pwd)/src/frontend/**/*.ts --exclude node_modules --verbose
	$(fortify_install_path)/bin/sourceanalyzer -b InfraTypeScript $(shell pwd)/src/infra.aws/**/*.ts --exclude node_modules --verbose
scan/cloudformation-templates:
# FIXME See CICD stack definition for why it's not getting scanned.
	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="dev" deploy/cicd

	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" deploy/routing

	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="dev" deploy/cert
	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="dev" deploy/frontend-waf
	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="dev" deploy/frontend
	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="dev" deploy/ops

	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="prod" deploy/cert
	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="prod" deploy/frontend
	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="prod" deploy/frontend-waf
	make -f makefile.infra cdk_action=synth cdk_nag=true stage="$(stage)" publish_stage="prod" deploy/ops
scan/media:
	@echo "FIXME scan media for unwanted metadata"
# TODO metascan --dir $(pwd)/src --r
# https://github.com/maccali/Metascan.CLI
# locations=$(shell cat file_metadata_report.csv | grep "https://www.google.com" | wc -l)
# TODO expect to be "       0"

# If we shared this as a zip file, what would we need to remove?
superclean:
	make clean/frontend
	make clean/integration-tests/e2e
	make -f makefile.infra clean/infra
	rm *.log; rm ./build-utils/logs/*.log
	rm -rf ./node_modules
	conda remove --name meblog --all -y
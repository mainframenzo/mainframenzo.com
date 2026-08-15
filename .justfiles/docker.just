# This file is responsible for defining Docker dev tasks.
import "../.justfiles/common.just"

base_image := "public.ecr.aws/ubuntu/ubuntu:24.04_stable"
meblog_image_name := "meblog"

# On MacOS - required. FIXME buildx required?
#platform_flag := "--platform linux/amd64"

# Used locally to push the development container image to a local container registry.
# You sync this registry to hosted infra for your cloud-based CICD environment.
start-local-registry:
	#!/usr/bin/env bash
	set -euxo pipefail

	# /tmp has a cap!
	#mkdir -p /tmp/meblog-registry
	mkdir -p ~/Desktop/dev/meblog-registry

	docker kill registry || true && docker rm registry || true

	docker run -d -p 5000:5000 \
		--name registry \
		-e GENERATE_UNIQUE=false \
		-v ~/Desktop/dev/meblog-registry:/var/lib/registry \
		public.ecr.aws/docker/library/registry:2

# Used to build the development container image.
setup:
	docker pull "{{base_image}}"

	# You use the .gitignore file as a common "dockerignore" file.
	# This occasionaly bites us, but more pros than cons.
	cp .gitignore ./build-utils/docker/dockerfile.meblog.dockerignore

	DOCKER_BUILDKIT=1 docker build --no-cache --pull -f ./build-utils/docker/dockerfile.meblog --progress=plain \
		--build-arg EXTEND="{{base_image}}" -t "{{meblog_image_name}}:latest" . &> ./build-utils/logs/docker.build.meblog.log

push-latest-development-image-to-local-registry:
	#!/usr/bin/env bash
	set -euxo pipefail

	docker tag "{{meblog_image_name}}:latest" "localhost:5000/{{meblog_image_name}}:latest"
	docker push "localhost:5000/{{meblog_image_name}}:latest"

# Used during CICD to pull the development container image from a "local" registry running in your cloud-based CICD environment.
pull-latest-development-image-from-local-registry:
	docker pull "localhost:5000/{{meblog_image_name}}:latest"

# You specify the entrypoint so you can use your updated one if changes have been made since you last built the container image.
# Locally you have a GPU but not when deployed to infra.
[arg("skip-build-parts-libraries", long="skip-build-parts-libraries", value="--skip-build-parts-libraries")]
[arg("skip-build-one-offs", long="skip-build-one-offs", value="--skip-build-one-offs")]
develop-website skip-build-parts-libraries="" skip-build-one-offs="":
  docker run -it --rm \
    --ipc=host \
    --shm-size=8g \
    -v {{source_dir}}/:/opt/app/meblog/:rw \
    --ulimit memlock=-1 \
    --ulimit stack=67108864 \
    --memory=24g \
    --memory-swap=32g \
    --privileged \
    --network host \
    -e GENERATE_UNIQUE=false -e app_stage="local" -e publish_stage="dev" -e app_location="local" -e skip_build_parts_libraries="{{skip-build-parts-libraries}}" -e skip_build_one_offs="{{skip-build-one-offs}}" \
    --entrypoint /opt/app/meblog/build-utils/docker/dockerfile.meblog.entrypoint.develop.sh \
    "localhost:5000/{{meblog_image_name}}:latest"

# You specify the entrypoint so you can piggy-back off the same development container image.
# Allow no outbound ports so you do not interfere with any infra ports.
[arg("skip-build-parts-libraries", long="skip-build-parts-libraries", value="--skip-build-parts-libraries")]
[arg("skip-build-one-offs", long="skip-build-one-offs", value="--skip-build-one-offs")]
[arg("skip-render-images-of-parts", long="skip-render-images-of-parts", value="--skip-render-images-of-parts")]
[arg("fast-render", long="fast-render", value="--fast-render")]
start-cicd app_stage publish_stage app_location skip-build-parts-libraries="" skip-build-one-offs="" skip-render-images-of-parts="" fast-render="":
	#!/usr/bin/env bash
	set -euxo pipefail

	# FIXME If root, do not need sudo.
	sudo rm -rf ~/meblog-cicd-output && mkdir -p ~/meblog-cicd-output

	# You mount the source as a volume to /opt/app/meblog,
	#  but do not make changes to it directly (do not mess with Git!).
	# Copy it to another volume that gets mounted that is a safe place to work in.
	cp -a {{source_dir}}/. ~/meblog-cicd-output/

	docker run -it --rm \
		-v {{source_dir}}/:/opt/app/meblog/:rw \
		-v ~/meblog-cicd-output/:/opt/app/meblog-cicd-output/:rw \
		--privileged \
		-e GENERATE_UNIQUE=false -e app_stage="{{app_stage}}" -e publish_stage="{{publish_stage}}" -e app_location="{{app_location}}" -e skip_build_parts_libraries="{{skip-build-parts-libraries}}" -e skip_build_one_offs="{{skip-build-one-offs}}" -e skip_render_images_of_parts="{{skip-render-images-of-parts}}" -e fast_render="{{fast-render}}" \
		--entrypoint /opt/app/meblog/build-utils/docker/dockerfile.meblog.entrypoint.cicd.sh \
		"localhost:5000/{{meblog_image_name}}:latest"

[arg("force-replace", long="force-replace", value="--force-replace")]
deploy-main force-replace="":
	just -f ./.justfiles/docker.just --working-directory . deploy-publish-stage main dev {{force-replace}}
	just -f ./.justfiles/docker.just --working-directory . deploy-publish-stage main prod {{force-replace}}

# You specify the entrypoint so you can piggy-back off the same development container image.
# FIXME The args don't quite have parity with the host OS commands, you're missing some.
[arg("force-replace", long="force-replace", value="--force-replace")]
deploy-publish-stage app_stage publish_stage force-replace="":
	docker run -it --rm \
		-v {{source_dir}}/:/opt/app/meblog/:rw \
		--privileged \
		-e GENERATE_UNIQUE=false -e app_stage="{{app_stage}}" -e publish_stage="{{publish_stage}}" -e app_location="{{app_location}}" -e force_replace="{{force-replace}}" \
		--entrypoint /opt/app/meblog/build-utils/docker/dockerfile.meblog.entrypoint.deploy.sh \
		"localhost:5000/{{meblog_image_name}}:latest"

pen-test app_stage publish_stage app_location type="owasp-asvs":
	docker run -it --rm \
		-v {{source_dir}}/:/opt/app/meblog/:rw \
		--privileged \
		-e GENERATE_UNIQUE=false -e app_stage="{{app_stage}}" -e publish_stage="{{publish_stage}}" -e app_location="{{app_location}}" -e pen_test_type={{type}} \
		--entrypoint /opt/app/meblog/build-utils/docker/dockerfile.meblog.entrypoint.pen-test.sh \
		"localhost:5000/{{meblog_image_name}}:latest"

destroy-main:
	just -f ./.justfiles/docker.just --working-directory . destroy-publish-stage main dev
	just -f ./.justfiles/docker.just --working-directory . destroy-publish-stage main prod

# You specify the entrypoint so you can piggy-back off the same development container image.
destroy-publish-stage app_stage publish_stage:
	docker run -it --rm \
		-v {{source_dir}}/:/opt/app/meblog/:rw \
		--privileged \
		-e GENERATE_UNIQUE=false -e app_stage="{{app_stage}}" -e publish_stage="{{publish_stage}}" -e app_location="{{app_location}}" \
		--entrypoint /opt/app/meblog/build-utils/docker/dockerfile.meblog.entrypoint.destroy.sh \
		"localhost:5000/{{meblog_image_name}}:latest"

# Used to debug the development container image build when you update it.
shell:
	docker run -it --rm \
		-v {{source_dir}}/:/opt/app/meblog/:rw \
		-p 5901:5901 \
		-p 8080:8080 \
		-p 8081:8081 \
		-p 8082:8082 \
		--privileged \
		-e GENERATE_UNIQUE=false -e app_location="local" \
		--entrypoint /bin/bash \
		"localhost:5000/{{meblog_image_name}}:latest"

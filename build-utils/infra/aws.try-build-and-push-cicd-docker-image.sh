#!/bin/bash
# This file is responsible for managing a Docker image used by CICD for running unit and functional tests. 
# The image should not be built every time CICD runs! Decide if we need to build below.
set -x

if [ -z "$1" ]; then
  echo "Please supply <aws region>."
  exit 1
fi

if [ -z "$2" ]; then
  echo "Please supply <aws account id>."
  exit 1
fi

if [ -z "$3" ]; then
  echo "Please supply <cicd container image repo name> (should be created in Amazon ECR)."
  exit 1
fi

if [ -z "$CODEBUILD_CI" ]; then
  if [ -z "$4" ]; then
    echo "Please supply <aws cli profile arg>."
    exit 1
  fi
fi

try_build_and_push_cicd_docker_image() {
  image="$(aws ecr describe-images --repository-name=$3 --output text --region $1 $4)"

  if [[ $? == 0 ]]; then
    echo "$3:latest found"

    # FIXME Should decide here if any files changed that require rebuilding. 
    # Manual toggle currently.
    #build_and_push_cicd_docker_image "$1" "$2" "$3"
    pull_cicd_docker_image "$1" "$2" "$3"
  else  
    echo "$3:latest not found"

    build_and_push_cicd_docker_image "$1" "$2" "$3"
  fi
}

pull_cicd_docker_image() {
  aws ecr get-login-password --region $1 | docker login --username AWS --password-stdin "$2.dkr.ecr.$1.amazonaws.com"
  docker pull "$2.dkr.ecr.$1.amazonaws.com/$3:latest"
  
  docker images
}

build_and_push_cicd_docker_image() {
  image="$(aws ecr describe-images --repository-name=$3 --output text --region $1 $4)"

  DOCKER_BUILDKIT=1 docker build -f ./build-utils/docker/dockerfile.cicd --progress=plain --platform linux/amd64 \
    --build-arg EXTEND="public.ecr.aws/ubuntu/ubuntu:22.04_stable" -t "$3:latest" .

  docker images

  aws ecr get-login-password --region $1 | docker login --username AWS --password-stdin "$2.dkr.ecr.$1.amazonaws.com"
  docker tag $3:latest "$2.dkr.ecr.$1.amazonaws.com/$3:latest"
  docker push "$2.dkr.ecr.$1.amazonaws.com/$3:latest"
}

try_build_and_push_cicd_docker_image "$1" "$2" "$3"
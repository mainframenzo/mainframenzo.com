#!/usr/bin/env bash
# This file has been @deprecated - there is a non AWS version that does not use Amazon S3 that is currently in use.
# This code remains in case you ever want to deploy to AWS again.
#
# This file is responsible for running our Docker Registry. It's used during CICD. You prefer this over Amazon ECR for cost reasons.
# Locally: It's backed by an Amazon S3 bucket. 
# AWS: Backed by filesystem, technically. The data still comes from the same bucket. Not easy to pass AWS credentials to Docker container in AWS CodeBuild environment? 
#  Just sync the Docker Registry files (i.e. our development container image) to AWS CodeBuild instance.
# See:
# * https://ochagavia.nl/blog/using-s3-as-a-container-registry/
# * https://www.docker.com/blog/how-to-use-your-own-registry-2/ 
# * https://www.artofcode.org/blog/aws-s3-docker-registry/
set -euxo pipefail

if [ "$#" -lt 3 ]; then
  echo "Must pass region, bucket_name, app_location, exiting"
  exit 1
fi

region=$1
bucket_name=$2
app_location=$3
aws_cli_profile_arg=$4

if [[ "$app_location" == "hosted" ]]; then
  mkdir -p /tmp/registry 
  aws s3 sync "s3://$bucket_name/registry" /tmp/registry --region "$region"
  nohup docker run --rm -p 5000:5000 \
    --name registry \
    -v /tmp/registry:/var/lib/registry \
    -e GENERATE_UNIQUE=false \
    public.ecr.aws/docker/library/registry:2 &
else
  set +e
  container_id=$(docker ps --filter name=registry -a -q)
  docker stop $container_id
  sleep 1
  docker rm $container_id
  sleep 1
  set -e

  # If you are starting the container registry, it also means we're going to be building and pushing to it.
  # In order to limit the space on disk of the registry (and therefore the AWS CodeBuild env size), empty the bucket first.
  # You get failures using a smallish AWS CodeBuild env if you don't do this, and you'll also be charged for storage you don't use.
  # You'll need to build and push the development container image before deploying the website again, because w/o it CICD will fail.
  aws s3 rm "s3://$bucket_name/registry" $aws_cli_profile_arg --region "$region" --recursive

  docker run -d -p 5000:5000 \
    --name registry \
    -e GENERATE_UNIQUE=false \
    -e REGISTRY_STORAGE=s3 \
    -e "REGISTRY_STORAGE_S3_REGION=$region" \
    -e "REGISTRY_STORAGE_S3_BUCKET=$bucket_name" \
    -e "REGISTRY_STORAGE_S3_ACCESSKEY=$(aws configure get aws_access_key_id ${aws_cli_profile_arg})" \
    -e "REGISTRY_STORAGE_S3_SECRETKEY=$(aws configure get aws_secret_access_key ${aws_cli_profile_arg})" \
    -e "REGISTRY_STORAGE_S3_SESSIONTOKEN=$(aws configure get aws_session_token ${aws_cli_profile_arg})" \
    -e "REGISTRY_STORAGE_S3_ROOTDIRECTORY=/registry" \
    public.ecr.aws/docker/library/registry:2
fi
#!/usr/bin/env bash
# This script is prepended to generated bash scripts (which are generated from bash snippets in markdown docs).
set -euxo pipefail

export app_stage="local"
export publish_stage="dev"
export app_location="local"

echo "test running, app_stage: ${app_stage}, publish_stage: ${publish_stage}, app_location: ${app_location}"

printenv
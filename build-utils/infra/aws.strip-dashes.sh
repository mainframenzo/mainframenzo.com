#!/usr/bin/env bash
# This file has been @deprecated.
# This code remains in case you ever want to deploy to AWS again.
#
# This file is responsible for removing dashes from input.
# It's used to lookup CloudFormation export keys when they have dashes in them,
#  since CloudFormation strips them automatically.
set -e

input=$1
output="${input//-/}"
echo "$output"
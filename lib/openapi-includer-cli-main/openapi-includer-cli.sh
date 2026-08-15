#!/usr/bin/env bash

cwd=$(pwd)
echo "Running openapi-includer-cli in $cwd, got args:"
printf '%s\n' "$*"

bin_dir=$( cd -- "$(dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
echo "npm bin dir: $bin_dir"

# TODO doesn't exist if not installed globally.
lib_dir=$(echo $bin_dir | sed s/bin/lib/g)
lib_dir="$lib_dir/node_modules/openapi-includer-cli"
echo "npm lib dir: $lib_dir"

# TODO this can not be how global install works.
cd $lib_dir
#npm install $lib_dir
cd $cwd 

cwd=$(pwd)

$lib_dir/dist/index-linux-x64 $@

# node --experimental-specifier-resolution=node \
#   --experimental-modules --no-warnings \
#   --loader "ts-node/esm/transpile-only" \
#   $lib_dir/src/main.ts $@

#node --experimental-specifier-resolution=node \
#  --experimental-modules --no-warnings \
#  --loader ts-node/esm $lib_dir/src/main.ts $@
#$lib_dir/node_modules/ts-node/esm
#npm_config_yes=true npx ts-node --esm --project "$lib_dir/tsconfig.json" "$lib_dir/src/main.ts" $@

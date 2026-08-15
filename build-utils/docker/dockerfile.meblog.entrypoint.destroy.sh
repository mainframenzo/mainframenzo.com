#!/usr/bin/env bash
# This file is responsible for destroying infra from a container.
set -euxo pipefail

ls -al $HOME
ls -al /opt/app
ls -al /opt/app/meblog
cd /opt/app/meblog

# Install NPM dependencies again because node_modules gets mounted from a potentially different arch.
# Also, there's not that many and it's much faster than re-building our development environment.
rm -rf node_modules
just -f ./.justfiles/dev.just --working-directory . setup --skip-python-deps
just -f ./.justfiles/infra.just --working-directory . destroy-main
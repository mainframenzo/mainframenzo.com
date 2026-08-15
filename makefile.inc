# This file has been @deprecated, and most of this functionality has been moved to a justfile.
# This code remains in case you ever want to deploy to AWS again, 
#  because the AWS infra dev tasks were not migrated from make to just.
#
# This file is responsible for shared makefile stuff.
.NOTPARALLEL:
.DEFAULT_GOAL: null
null: 
	@echo 'Nothing to see here.'

OS := $(shell uname -s)

ifeq ($(OS),Windows_NT) 
  SHELL := powershell
	detected_os := Windows
else
  SHELL := /bin/bash
	detected_os := $(shell sh -c 'uname 2>/dev/null || @echo Unknown')
endif

# Include environment configuration.
ifneq (,$(wildcard ./config/.env))
	include ./config/.env
	export
endif

# See ./config/.env file for AWS stage configuration.
# local | main
stage ?= local

# Publish stage.
# Options: dev | prod
publish_stage := dev

# Use this flag to set or determine where software is running.
# local | aws
app_location ?= local

# Use this flag to determine if JavaScript/CSS is minified.
node_env ?= development

# Use this flag to bundle JavaScript with esbuild targeting "node" (backend) or "web" frontend.
# web | node
target ?= web

# Pass Node.js target version When bundling Node.js files using esbuild.
node_target=node20

# Moved to tsx because of globalThis issue, but ts-node/esm still used to invoke CDK apps.
ts_exec_ts_node = ts-node/esm
ts_exec_tsx = tsx/esm

# Configure path variables without "./" in front since some CLI programs don't like relative paths.
frontend_dist_dir := dist.frontend
middleware_aunty_bots_dist_dir := dist.middleware.aunty-bots
integration_tests_dist_dir := dist.tests.integration.e2e

# Use this flag to determine how website integration tests are run (headlessly or available to watch in the browser).
# You can't run them non-headlessly in the meblog container environment.
headless := true

# Some utils allow passing an extra flag, i.e. -w, to watch files for changes. 
# By default just run website build utils w/o this flag.
build_parts_libraries := false
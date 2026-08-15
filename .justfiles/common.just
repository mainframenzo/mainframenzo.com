# This file is responsible for defining common build task variables.
# You might say, shouldn't these be in ./config/.env?, to which you'd answer, no!
set shell := ["bash", "-c"]

set dotenv-path := "./config/.env"
set dotenv-required := true
set dotenv-load := true

export source_dir := invocation_directory()

# Use this flag to determine if we're running in Docker.
# Deployed we'll always be in Docker - this is purely for local development.
# Make sure this is set to false if it is not set (no unbound vars allowed in most tasks).
is_docker := env("is_docker", "false")

# Use this flag to determine if JavaScript/CSS is minified.
export node_env := env("node_env", "development")

# Use this flag to determine what website host to deploy to.
# See ./config/.env file for AWS stage configuration.
# local | main
export app_stage := env("app_stage", "local")

# Use this flag to publish to the dev or prod website.
# dev | prod
export publish_stage := env("publish_stage", "dev")

# Use this flag to let the software know where it's hosted so it can change business logic.
# local | aws
export app_location := env("app_location", "local")

# Use this flag to bundle JavaScript with esbuild targeting "node" (backend) or "web" frontend.
# web | node
export target := "web"

# Use this flag to Node.js target version When bundling Node.js files using esbuild.
export node_target := "node20"

# Configure path variables without "./" in front since some CLI programs don't like relative paths.
export frontend_dist_dir := "dist.frontend"
export middleware_aunty_bots_dist_dir := "dist.middleware.aunty-bots"
export integration_tests_dist_dir := "dist.tests.integration.e2e"

# Use this flag to determine how website integration tests are run (headlessly or available to watch in the browser).
# You can't run them non-headlessly in the meblog container environment.
export headless := "true"

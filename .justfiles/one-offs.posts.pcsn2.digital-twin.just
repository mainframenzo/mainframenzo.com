# This file is responsible for defining one-off dev tasks for the digital twin in the post "Personal Case Study Nº 2".
import "../.justfiles/common.just"

src_root := "./src/frontend/one-offs/posts/personal_case_study_number_2/digital-twin"

sketchup-glb-to-assets:
  # FIXME Rename.
  # FIXME active conda env
  blender -b -P ./src/parts-library-tools/one-offs-posts-pcsn2-sketchup-glb-to-assets.py
  # conda run -n meblog-one-offs-personal-case-study-number-2 python3 ./src/parts-library-tools/one-offs-posts-pcsn2-sketchup-glb-to-assets.py

setup:
  cd ./src/frontend/one-offs/posts/personal_case_study_number_2/digital-twin && cargo install --path . && cargo build

docs:
  cd {{src_root}} && cargo doc --open --no-deps --workspace

lint:
  cd {{src_root}} && cargo clippy -- -D warnings
  cd {{src_root}} && cargo fmt --all -- --check
  cd {{src_root}} && cargo machete

build-dev-clean:
  cd {{src_root}} && cargo clean && just -f ./.justfiles/one-offs.posts.pcsn2.digital-twin.just --working-directory . build-dev && just -f ./.justfiles/one-offs.posts.pcsn2.digital-twin.just --working-directory . lint && just -f ./.justfiles/one-offs.posts.pcsn2.digital-twin.just --working-directory . check-web

build-dev:
  cd {{src_root}} && cargo build

build:
  cd {{src_root}} && cargo build --release

develop-watch:
  cd {{src_root}} && BEVY_ASSET_ROOT="." dx serve --hot-patch

run:
  cd {{src_root}} && cargo run

check-web:
  cd {{src_root}} && cargo check --profile ci --no-default-features --features web --target wasm32-unknown-unknown

build-web:
  cd {{src_root}} && cargo binstall --locked -y --force wasm-bindgen-cli
  cd {{src_root}} && cargo binstall --locked -y --force wasm-opt
  cd {{src_root}} && bevy build --locked --release --features=web --yes web --bundle

run-web:
  cd {{src_root}} && bevy run web --headers="Cross-Origin-Opener-Policy:same-origin" --headers="Cross-Origin-Embedder-Policy:credentialless"
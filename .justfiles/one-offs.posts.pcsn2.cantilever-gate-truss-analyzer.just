# This file is responsible for defining one-off dev tasks for the cantilever gate truss analyzer in the post "Personal Case Study Nº 2".
import "../.justfiles/common.just"

src_root := "./src/frontend/one-offs/posts/personal_case_study_number_2/cantilever-gate-truss-analyzer"

setup:
  cd {{src_root}} && pixi install

run:
  cd {{src_root}} && pixi run python main.py

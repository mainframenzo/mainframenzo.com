#!/bin/bash
# This file is responsible for pushing my private source to the public repository.
# Purge anything you want removed here!
# References:
# * https://gist.github.com/spenserhale/19a2abd03c0558449202a1d7bcc64ed7
set -ex

cwd=$(pwd)
batch_size=250
tmp_dir=$TMPDIR

# Setup an empty Git repository with our public remote configured.
cd ${tmp_dir}; rm -rf ${tmp_dir}mainframenzo.com; mkdir -p mainframenzo.com; cd ${tmp_dir}mainframenzo.com; git init; git remote add origin git@github.com:mainframenzo/mainframenzo.com.git

# YOu work on a computer with "Git Defender" automatically installed.
# This is how you get around Git Defender requiring you to ask permission to work on your blog on this computer.
cd ${tmp_dir}mainframenzo.com; git config --local "core.hookspath" ".git/hooks"

git config --local user.name "mainframenzo"
git config --local user.email "67568925+mainframenzo@users.noreply.github.com"

# Needs to run after "Git Defender".
git lfs install

# Copy the contents of _this_ private repository to the public repository.
rsync -av --progress $cwd/ ${tmp_dir}mainframenzo.com/ --exclude .git --exclude node_modules --exclude dist.*

# Prepare the private version of this source code for public viewing.
cd ${tmp_dir}mainframenzo.com; rm -rf node_modules; ls -al; make install/npm; npx node \
  --trace-uncaught \
  --enable-source-maps \
  --experimental-specifier-resolution=node --experimental-modules --no-warnings \
  --import tsx/esm ./build-utils/scripts/private-to-public.ts --stage=local --publish-stage=prod --app-location=local

# Push changes to the public repository, but make sure history is always "First commit.".
# (It's too easy to push private information so you are creating some guardrails this way).
# Problem: Github has a 2 GB push limit per commit: https://docs.github.com/en/enterprise-cloud@latest/get-started/using-git/troubleshooting-the-2-gb-push-limit
# We'll need to push 1x1. Our commit history will look like:
# * First commit.
# * First commit. Previous commits possibly chunked. Added <> .
# * First commit. Previous commits chunked. Added everything else.
# ... etc.
cd ${tmp_dir}mainframenzo.com
git checkout --orphan new-main; git branch -m main
git add readme.md; git commit -m "First commit."; git push origin main --force

# The public dirs hold the largest files. Add each one as a separate commit so we can commit in batches.
ls -al ${tmp_dir}mainframenzo.com
cd ${tmp_dir}mainframenzo.com; find src/frontend/public ! -path src/frontend/public -type d -maxdepth 3 -exec bash -c 'git add ${1}/\*; git commit -m "First commit. Previous commits possibly chunked. Added ${1} .";' sh {} \;

# Add the rest.
git add -A
git commit -m "First commit. Previous commits chunked. Added everything else."

for commit in $(git rev-list --date-order --reverse main); do
  echo "git pushing ${commit}: $(git log --format=%B -n 1 ${commit})"
  git push origin ${commit}:refs/heads/main
done
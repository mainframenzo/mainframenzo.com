# This file is responsible for defining auditing dev tasks.
# This is run before deploying and also before pushing to the public repo.
# FIXME You haven't quite migrated this from make to just yet, so it's not in use ATM.
import "../.justfiles/common.just"

allowed_licenses := "MIT;Apache-2.0;Apache 2.0;BSD-2-Clause;BSD-3-Clause;BSD*;0BSD;ISC;Python-2.0;CC-BY-4.0;CC-BY-3.0;CC0-1.0;Unlicense;WTFPL"

# FIXME check for exif data JIC
# FIXME check for secrets
# FIXME check for private info?
scan:
  # FIXME How to ignore legacy packages like AWS dependencies?
  npm audit --audit-level=high

  just -f ./.justfiles/auditing.just --working-directory . lint-repo
  just -f ./.justfiles/auditing.just --working-directory . scan-licenses
  just -f ./.justfiles/auditing.just --working-directory . scan-links
  just -f ./.justfiles/auditing.just --working-directory . scan-media

lint-repo:
  NODE_OPTIONS=max-old-space-size=127284016 node {{source_dir}}/node_modules/repolinter/bin/repolinter.js lint --dryRun -r "{{source_dir}}/config/amazon-ospo-ruleset.json" --allowPaths {{source_dir}}/src .

scan-licenses:
  # License notes:
  # * Packages glob@13.0.3, lru-cache@11.2.6, minimatch@10.2.0, minimatch@10.2.4, @isaacs/cliui@9.0.0, jackspeak@3.4.3, jackspeak@4.2.3, package-json-from-dist@1.0.1, path-scurry@2.0.1, path-scurry@1.11.1 specify the BlueOak-1.0.0 license, see: https://blueoakcouncil.org/license/1.0.0
  # * Package qrcode-terminal@0.12.0 specifies the Apache 2.0 license, see: https://www.apache.org/licenses/LICENSE-2.0.html
  # * Package event-stream-pubsub@0.1.3 specifies the UNKNOWN license
  # * FIXME pngquant-bin@9.0.0 GPL-3.0
  just -f ./.justfiles/auditing.just --working-directory .  generate-license-report
  npx license-checker-rseidelsohn --summary --onlyAllow '{{allowed_licenses}}' --excludePackages 'pngquant-bin@9.0.0;meblog@0.0.1;glob@13.0.3;lru-cache@11.2.6;minimatch@10.2.0;minimatch@10.2.4;@isaacs/cliui@9.0.0;jackspeak@3.4.3;jackspeak@4.2.3;package-json-from-dist@1.0.1;path-scurry@2.0.1;path-scurry@1.11.1;event-stream-pubsub@0.1.3'
  # FIXME Add conda check

generate-license-report:
  npx license-report --output=csv --fields=name --fields=licenseType --delimiter=" - "
  # FIXME conda failing in cicd: conda: error: unrecognized arguments:
  # conda list | awk '{if(NR>3) printf("%s=%s\n", $1, $2)}' | xargs conda info | grep 'name\|version\|license'

scan-links:
	echo "FIXME Doesn't work quite right. See: https://github.com/lycheeverse/lychee/issues/1646"
#lychee ./dist.frontend --exclude-link-local

scan-media:
	echo "FIXME scan media for unwanted metadata"
# FIXME metascan --dir $(pwd)/src --r
# https://github.com/maccali/Metascan.CLI
# locations=$(shell cat file_metadata_report.csv | grep "https://www.google.com" | wc -l)
# FIXME expect to be "       0"

# You use this to roughly gauge how many LOC can be attributed to an LLM.
# Also, is the LOC 100% attributable to the LLM if it built on _your_ previous work?
# KISS for now:
# * If you didn't refactor it, it's an LLM, if you did, it's you.
# * Percentage is always rounded up for the loosely determined llm_percentage_by_file_path .
#
# To gauge LOC, first you listed all file extensions in the project via:
# ```bash
# tree -P '*.*' --prune -fFi --noreport | grep -v '/$' | grep '\.' | sed 's/.*\.//' | sort -u
# ```
# ...filtering the ones that were not important. This got you a list of extensions you cared about.
#
# To get a list of files in a directory that you used an LLM with:
# ```bash
# find ./src/vscode-extension/ \( -path '*/.git' -o -path '*/node_modules' -o -path '*/.pixi' -o -path '*/bpy' -o -path '*/dist*' -o -path '*/lib' -o -path '*/target' \) -prune -o \
#   type f \( \
#   -name '*.ts'  -o -name '*.json' -o -name '*.js'   -o \
#   -name '*.yaml' -o -name '*.yml' -o -name '*.py'   -o \
#   -iname 'justfile' -o -name '*.justfile' -o -name '*.just' -o \
#   -name '*.sh'  -o -name '*.xml'  -o -name '*.tf'   -o \
#   -name '*.css' -o -name '*.md'   -o -name '*.ejs'  -o \
#   -name '*.html' -o -name '*.htm' -o -name '*.csv' \
# \) -print
# ```
#
# This info was then used that to build this LOC script below.
#
# The output reports what was you (or another human), and what was an LLM.
loc project_dir=".":
  #!/usr/bin/env bash
  set -euo pipefail

  # All the extensions you have touched...probably.
  extensions=(ts json js yaml py justfile sh xml tf css md ejs html csv)

  # All the files with LLM code and how much.
  # See readme.md for details.
  declare -A llm_percentage_by_file_path=(
    [src/openapi-def/github.webhook.push.schema.yaml]=100

    [src/vscode-extension/.vscode/launch.json]=100
    [src/vscode-extension/.vscode/tasks.json]=100
    [src/vscode-extension/readme.md]=2
    [src/vscode-extension/tsconfig.json]=98
    [src/vscode-extension/syntaxes/post-header.tmLanguage.json]=100
    [src/vscode-extension/src/extension.ts]=90
    [src/vscode-extension/package.json]=100

    [src/openapi-def/monitor.arp-cache-entry.schema.yaml]=98
    [src/openapi-def/monitor.cpuinfo.schema.yaml]=98
    [src/openapi-def/monitor.load-average.schema.yaml]=98
    [src/openapi-def/monitor.logged-in-user.schema.yaml]=98
    [src/openapi-def/monitor.docker-process-entry.schema.yaml]=98
    [src/openapi-def/monitor.transfer-rates.schema.yaml]=98
    [src/openapi-def/monitor.ram-info.schema.yaml]=98
    [src/openapi-def/monitor.user-account.schema.yaml]=98
    [src/openapi-def/monitor.io-stat.schema.yaml]=98
    [src/openapi-def/monitor.swap-partition.schema.yaml]=98
    [src/openapi-def/monitor.disk-partition.schema.yaml]=98
    [src/openapi-def/monitor.application-entry.schema.yaml]=98
    [src/openapi-def/monitor.recent-login.schema.yaml]=98
    [src/openapi-def/monitor.memory-info.schema.yaml]=98
    [src/openapi-def/monitor.process-entry.schema.yaml]=98
    [src/openapi-def/monitor.cron-history-entry.schema.yaml]=98
    [src/openapi-def/monitor.scheduled-cron.schema.yaml]=98
    [src/openapi-def/monitor.general-info.schema.yaml]=98
    [src/openapi-def/monitor.network-connection.schema.yaml]=98
    [src/openapi-def/monitor.ip-address.schema.yaml]=98
    [src/openapi-def/monitor.bandwidth-entry.schema.yaml]=98

    [src/frontend/scripts/ops.chart.bar.ts]=80
    [src/frontend/scripts/ops.chart.line.ts]=80
    [src/frontend/scripts/ops.chart.pie.ts]=80

    [src/backend/metrics.db.ts]=80
    [src/backend/metrics.ts]=50

    [src/frontend/styles/framework.css]=98
    [.justfiles/frontend.just]=5

    [src/frontend/one-offs/posts/personal_case_study_number_2/cantilever-gate-truss-analyzer/main.py]=98
    [src/frontend/one-offs/posts/personal_case_study_number_2/cantilever-gate-truss-analyzer/docs/math.md]=100
    [src/frontend/one-offs/posts/personal_case_study_number_2/cantilever-gate-truss-analyzer/docs/trussme_fem_internals.html]=100
    [src/frontend/one-offs/posts/personal_case_study_number_2/cantilever-gate-truss-analyzer/docs/fem_hand_calc_gate_truss.html]=100
    [src/frontend/one-offs/posts/personal_case_study_number_2/cantilever-gate-truss-analyzer/tests/tests.py]=98

    [build-utils/scripts/fixup-playlist-urls.ts]=20

    [src/frontend/one-offs/playlist-analyzer/summarize.py]=80
    [src/frontend/one-offs/playlist-analyzer/allin1infer_renderer.py]=80
    [src/frontend/one-offs/playlist-analyzer/essentia_analyzer.py]=80

    [build-utils/scripts/image-srcsets.ts]=20

    [.justfiles/auditing.just]=30
  )

  declare -A loc_by_extension loc_by_extension_for_human loc_by_extension_for_llm
  declare -A loc_percentage_by_file_path_attributed_to_llm

  total_loc=0
  total_human_loc=0
  total_llm_loc=0

  project_dir="{{source_dir}}"

  init_counters() {
    local extension

    for extension in "${extensions[@]}"; do
      loc_by_extension[$extension]=0
      loc_by_extension_for_human[$extension]=0
      loc_by_extension_for_llm[$extension]=0
    done
  }

  calculate_loc() {
    local file extension loc relative_file_path percent llm_lines human_lines

    while IFS= read -r -d '' file; do
      extension="$(classify_extension "$file")"
      [[ -z "$extension" ]] && continue

      loc="$(grep -c '[^[:space:]]' "$file" || true)"
      [[ -z "$loc" ]] && loc=0

      relative_file_path="${file#"$project_dir"/}"
      relative_file_path="${relative_file_path#./}"

      percent=0
      if [[ -n "${llm_percentage_by_file_path[$relative_file_path]:-}" ]]; then
        percent="${llm_percentage_by_file_path[$relative_file_path]}"
        loc_percentage_by_file_path_attributed_to_llm["$relative_file_path"]=1
      fi

      llm_lines=$(( (loc * percent + 50) / 100 ))
      human_lines=$(( loc - llm_lines ))

      loc_by_extension[$extension]=$(( loc_by_extension[$extension] + loc ))
      loc_by_extension_for_human[$extension]=$(( loc_by_extension_for_human[$extension] + human_lines ))
      loc_by_extension_for_llm[$extension]=$(( loc_by_extension_for_llm[$extension] + llm_lines ))

      total_loc=$(( total_loc + loc ))
      total_human_loc=$(( total_human_loc + human_lines ))
      total_llm_loc=$(( total_llm_loc + llm_lines ))
    done < <(find "$project_dir" \( -path '*/.git' -o -path '*/node_modules' -o -path '*/.pixi' -o -path '*/bpy' -o -path '*/dist*' -o -path '*/lib' -o -path '*/target' \) -prune -o -type f -print0)
  }

  classify_extension() {
    local file_name="$1"
    local base
    base="$(basename "$file_name")"
    case "$base" in
      *.ts) echo ts ;;
      *.json) echo json ;;
      *.js) echo js ;;
      *.yaml|*.yml) echo yaml ;;
      *.py) echo py ;;
      *.sh) echo sh ;;
      [Jj]ustfile|*.justfile) echo justfile ;;
      *.xml) echo xml ;;
      *.tf) echo tf ;;
      *.css) echo css ;;
      *.md) echo md ;;
      *.ejs) echo ejs ;;
      *.html|*.htm) echo html ;;
      *.csv) echo csv ;;
      *) echo "" ;;
    esac
  }

  percent_of() {
    local part="$1" whole="$2"

    if [[ "$whole" -eq 0 ]]; then
      echo "0.0"
    else
      awk -v p="$part" -v w="$whole" 'BEGIN { printf "%.1f", (p / w) * 100 }'
    fi
  }

  print_loc_report() {
    local ext loc h l hp lp

    printf "\n%-10s %10s %12s %12s %8s %8s\n" "EXT" "TOTAL" "HUMAN" "LLM" "HUMAN%" "LLM%"
    echo "------------------------------------------------------------------"
    for ext in "${extensions[@]}"; do
      loc=${loc_by_extension[$ext]}
      [[ "$loc" -eq 0 ]] && continue
      h=${loc_by_extension_for_human[$ext]}
      l=${loc_by_extension_for_llm[$ext]}
      hp=$(percent_of "$h" "$loc")
      lp=$(percent_of "$l" "$loc")
      printf "%-10s %10d %12d %12d %7s%% %7s%%\n" "$ext" "$loc" "$h" "$l" "$hp" "$lp"
    done

    echo "------------------------------------------------------------------"
    local total_hp total_lp
    total_hp=$(percent_of "$total_human_loc" "$total_loc")
    total_lp=$(percent_of "$total_llm_loc" "$total_loc")
    printf "%-10s %10d %12d %12d %7s%% %7s%%\n" "TOTAL" "$total_loc" "$total_human_loc" "$total_llm_loc" "$total_hp" "$total_lp"
  }

  warn_unmatched_map_entries() {
    local path

    for path in "${!llm_percentage_by_file_path[@]}"; do
      if [[ -z "${loc_percentage_by_file_path_attributed_to_llm[$path]:-}" ]]; then
        echo "warning: '$path' declared was not counted, not found" >&2
      fi
    done
  }

  init_counters
  calculate_loc
  print_loc_report
  warn_unmatched_map_entries

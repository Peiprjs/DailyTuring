#!/usr/bin/env bash
set -euo pipefail

yesterday="$(date -u -d 'yesterday' +'%Y-%m-%d')"
tmp_today_dir="$(mktemp -d)"

cleanup() {
  rm -rf "$tmp_today_dir"
}
trap cleanup EXIT

if [ -d "today" ]; then
  mkdir -p "archive/$yesterday"
  shopt -s dotglob nullglob
  for entry in today/*; do
    mv -f "$entry" "archive/$yesterday/"
  done
  shopt -u dotglob nullglob
  rmdir today || true
  echo "Moved yesterday's puzzle to $yesterday"
fi

mkdir -p today

run_scraper() {
  local label="$1"
  local script="$2"
  local target="$3"
  local tmp_file="$tmp_today_dir/$target"

  echo "Getting $label"
  node "scrapers/$script" > "$tmp_file"

  if [ ! -s "$tmp_file" ]; then
    echo "Error: $label output is empty." >&2
    exit 1
  fi

  mv "$tmp_file" "today/$target"
  echo "$label run successfully"
}

#-------------------------------------#
run_scraper "Criteria" "criteria.js" "criteria"
#-------------------------------------#
run_scraper "Solution" "solution.js" "solution"
#-------------------------------------#
run_scraper "Verifiers" "verifiers.js" "verifiers"
#-------------------------------------#
run_scraper "Hash" "hash.js" "hash"
#-------------------------------------#
run_scraper "Score" "score.js" "score"

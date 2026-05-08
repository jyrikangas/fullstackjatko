#!/usr/bin/env bash
# Auto-commit on file save using inotifywait (inotify-tools)
# Usage: ./autocommit.sh [path]
# Requires: inotifywait (package: inotify-tools)

set -eu
WATCH_DIR="${1:-.}"
DEBOUNCE=0.8

echo "[autocommit.sh] watching: $WATCH_DIR (requires inotifywait)"

while true; do
  # Wait for a file to be closed after writing (typical editor save)
  changed_file=$(inotifywait -e close_write,modify -r --format '%w%f' --exclude '(^|/)\.git|node_modules' "$WATCH_DIR" 2>/dev/null)
  if [ -z "$changed_file" ]; then
    continue
  fi
  # Debounce quick successive saves
  sleep "$DEBOUNCE"

  # Only commit when there are changes
  if [ -n "$(git -C "$WATCH_DIR" status --porcelain)" ]; then
    echo "[autocommit.sh] changes detected; staging and committing"
    git -C "$WATCH_DIR" add -A
    git -C "$WATCH_DIR" commit -m "Auto-save: $(date --iso-8601=seconds)" || true
  else
    echo "[autocommit.sh] no changes"
  fi
done

#!/usr/bin/env python3
"""
Simple autocommit script that polls `git status` and commits changes shortly
after they appear. No external Python packages required.

Usage: python3 autocommit.py [path]

The optional path can be any file or directory inside the repository.
The script always stages changes from the repository root.
"""
import os
import sys
import subprocess
import time
from datetime import datetime
from zoneinfo import ZoneInfo


HELSINKI_TZ = ZoneInfo("Europe/Helsinki")
MIN_SECONDS_BETWEEN_COMMITS = 61


def resolve_repo_root(path):
    start_dir = os.path.dirname(path) if os.path.isfile(path) else path
    p = subprocess.run(
        ["git", "-C", start_dir, "rev-parse", "--show-toplevel"],
        capture_output=True,
        text=True,
    )
    return p.stdout.strip() if p.returncode == 0 else start_dir


def has_changes(repo_root):
    p = subprocess.run(["git", "status", "--porcelain"], cwd=repo_root, capture_output=True, text=True)
    return bool(p.stdout.strip())


def changed_files(repo_root):
    p = subprocess.run(
        ["git", "diff", "--cached", "--name-only", "--diff-filter=ACMRTUXB"],
        cwd=repo_root,
        capture_output=True,
        text=True,
    )
    return [line for line in p.stdout.splitlines() if line.strip()]


def file_change_score(repo_root, path):
    p = subprocess.run(
        ["git", "diff", "--cached", "--numstat", "--", path],
        cwd=repo_root,
        capture_output=True,
        text=True,
    )
    for line in p.stdout.splitlines():
        parts = line.split("\t")
        if len(parts) < 3:
            continue
        added, deleted = parts[0], parts[1]
        if added == "-" or deleted == "-":
            return 1
        return int(added) + int(deleted)
    return 1


def primary_changed_file(repo_root):
    files = changed_files(repo_root)
    if not files:
        return "changes"

    return max(files, key=lambda path: (file_change_score(repo_root, path), len(path)))


def commit_message(repo_root):
    timestamp = datetime.now(HELSINKI_TZ).strftime("%A %H:%M")
    filename = os.path.basename(primary_changed_file(repo_root))
    return f"autocom {timestamp} {filename}"


def do_commit(repo_root):
    subprocess.run(["git", "add", "-A", ":/"], cwd=repo_root)
    msg = commit_message(repo_root)
    # commit may fail if no changes remain; ignore nonzero
    subprocess.run(["git", "commit", "-m", msg], cwd=repo_root)
    print("[autocommit.py] committed:", msg)


def main():
    start_path = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
    repo_root = resolve_repo_root(start_path)
    poll_interval = 0.8
    debounce = 0.5
    last_commit_at = 0.0
    last_seen = False
    pending = False
    print(f"[autocommit.py] polling git status in {repo_root}")
    try:
        while True:
            changed = has_changes(repo_root)
            if changed and not last_seen:
                # first time we detect changes, start debounce timer
                pending = True
                debounce_until = time.time() + debounce
            if pending and time.time() >= debounce_until:
                now = time.time()
                if has_changes(repo_root) and now - last_commit_at >= MIN_SECONDS_BETWEEN_COMMITS:
                    do_commit(repo_root)
                    last_commit_at = now
                elif now - last_commit_at < MIN_SECONDS_BETWEEN_COMMITS:
                    debounce_until = last_commit_at + MIN_SECONDS_BETWEEN_COMMITS
                    pending = True
                    time.sleep(poll_interval)
                    continue
                pending = False
            last_seen = changed
            time.sleep(poll_interval)
    except KeyboardInterrupt:
        print('\n[autocommit.py] stopped')


if __name__ == '__main__':
    main()

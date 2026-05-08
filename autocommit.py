#!/usr/bin/env python3
"""
Simple autocommit script that polls `git status` and commits changes shortly
after they appear. No external Python packages required.

Usage: python3 autocommit.py [path]
"""
import os
import sys
import subprocess
import time
from datetime import datetime


def has_changes(cwd):
    p = subprocess.run(["git", "status", "--porcelain"], cwd=cwd, capture_output=True, text=True)
    return bool(p.stdout.strip())


def do_commit(cwd):
    msg = f"Auto-save: {datetime.utcnow().isoformat()}Z"
    subprocess.run(["git", "add", "-A"], cwd=cwd)
    # commit may fail if no changes remain; ignore nonzero
    subprocess.run(["git", "commit", "-m", msg], cwd=cwd)
    print("[autocommit.py] committed:", msg)


def main():
    cwd = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd()
    poll_interval = 0.8
    debounce = 0.5
    last_seen = False
    pending = False
    print(f"[autocommit.py] polling git status in {cwd}")
    try:
        while True:
            changed = has_changes(cwd)
            if changed and not last_seen:
                # first time we detect changes, start debounce timer
                pending = True
                debounce_until = time.time() + debounce
            if pending and time.time() >= debounce_until:
                if has_changes(cwd):
                    do_commit(cwd)
                pending = False
            last_seen = changed
            time.sleep(poll_interval)
    except KeyboardInterrupt:
        print('\n[autocommit.py] stopped')


if __name__ == '__main__':
    main()

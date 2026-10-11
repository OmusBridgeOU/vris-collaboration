#!/usr/bin/env python3
"""Match an uploaded local receipt to a Vris deploy source commit."""
import argparse
import hashlib
import json
import runpy
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = [(cwd, name, command) for cwd, name, command in runpy.run_path(str(ROOT / 'scripts/local-quality.py'))['CHECKS']]


def sha(value):
    return isinstance(value, str) and len(value) == 64 and all(char in '0123456789abcdef' for char in value)


def verify(path, expected_hash, commit):
    raw = path.read_bytes()
    if hashlib.sha256(raw).hexdigest() != expected_hash:
        raise ValueError('Uploaded evidence hash differs from reviewed local receipt')
    proof = json.loads(raw)
    head = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    tree = subprocess.check_output(['git', 'rev-parse', 'HEAD^{tree}'], cwd=ROOT, text=True).strip()
    if head != commit or proof['identity']['commit'] != commit or proof['identity']['tree'] != tree:
        raise ValueError('Deploy commit/tree differs from local checks')
    lockfiles = {str(file.relative_to(ROOT)): hashlib.sha256(file.read_bytes()).hexdigest()
                 for file in (ROOT / 'bun.lock', ROOT / 'layers/badge_system/frontend/pnpm-lock.yaml')}
    if proof['identity']['lockfiles'] != lockfiles:
        raise ValueError('Deploy lockfiles differ from local checks')
    checks = proof['checks']
    if [(check['cwd'], check['name']) for check in checks] != [(cwd, name) for cwd, name, _ in EXPECTED]:
        raise ValueError('Required local checks are missing')
    for check, (_, name, command) in zip(checks, EXPECTED):
        if name.endswith('test:coverage'):
            if check['command'][:6] != ['bunx', 'vitest', 'run', '--dir', './app/test', '--coverage'] \
               or check.get('test_count', 0) < 1 or not sha(check.get('artifact', {}).get('sha256')):
                raise ValueError(f'Fresh coverage receipt missing: {name}')
        elif check['command'] != command:
            raise ValueError(f'Unexpected local command: {name}')
        if check['exit_code'] != 0 or not sha(check['log_sha256']):
            raise ValueError(f'Local check failed or lacks a log hash: {name}')
    build = next(check for check in checks if check['name'] == 'frontend-build')
    if not sha(build.get('artifact', {}).get('sha256')):
        raise ValueError('Badge deployment artifact identity missing')
    print(f'Valid Vris local deployment proof: {commit}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('evidence', type=Path)
    parser.add_argument('evidence_sha256')
    parser.add_argument('source_commit')
    args = parser.parse_args()
    verify(args.evidence, args.evidence_sha256, args.source_commit)

#!/usr/bin/env python3
"""Run the former CI quality checks locally and bind evidence to a commit."""
import hashlib
import json
import re
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHECKS = [
    (f'layers/{layer}', f'{layer}:{name}', ['bun', 'run', name])
    for layer in ('base', 'derived-main', 'main', 'showcases')
    for name in ('lint', 'typecheck', 'test:coverage')
] + [
    ('layers/badge_system', name, command)
    for name, command in (
        ('share-audit', ['npm', 'run', 'share:audit']),
        ('deployment-test', ['npm', 'run', 'deployment:test']),
        ('format', ['pnpm', '--dir', 'frontend', 'format:check']),
        ('frontend-lint', ['pnpm', '--dir', 'frontend', 'lint']),
        ('frontend-typecheck', ['pnpm', '--dir', 'frontend', 'typecheck']),
        ('frontend-test', ['pnpm', '--dir', 'frontend', 'test']),
        ('mobile-e2e', ['pnpm', '--dir', 'frontend', 'test:e2e']),
        ('worker-typecheck', ['npm', 'run', 'worker:typecheck']),
        ('worker-test', ['npm', 'run', 'worker:test']),
        ('frontend-build', ['pnpm', '--dir', 'frontend', 'build']),
        ('worker-dry-run', ['npm', 'run', 'worker:dry-run']),
        ('production-config-dry-run', ['npm', 'run', 'production:dry-run']),
    )
] + [
    ('layers/visitor-counter', 'visitor-counter:check', ['bun', 'run', 'check']),
    ('layers/vris-26autumn-access-manager', 'access-manager:check', ['bun', 'run', 'check']),
]

def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT, text=True).strip()

def digest(path):
    if path.is_dir():
        manifest = [(str(item.relative_to(path)), digest(item)) for item in sorted(path.rglob('*')) if item.is_file()]
        return hashlib.sha256(json.dumps(manifest).encode()).hexdigest()
    return hashlib.sha256(path.read_bytes()).hexdigest()

def identity():
    lockfiles = [ROOT / 'bun.lock', ROOT / 'layers/badge_system/frontend/pnpm-lock.yaml']
    return {'commit': git('rev-parse', 'HEAD'), 'tree': git('rev-parse', 'HEAD^{tree}'),
            'lockfiles': {str(p.relative_to(ROOT)): digest(p) for p in lockfiles}}

def verify(path):
    record = json.loads(path.read_text())
    if record['identity'] != identity() or git('status', '--porcelain'):
        raise ValueError('Evidence is stale or checkout is dirty')
    if [(c['cwd'], c['name']) for c in record['checks']] != [(cwd, name) for cwd, name, _ in CHECKS]:
        raise ValueError('Required checks are missing')
    for check, (_, _, expected_command) in zip(record['checks'], CHECKS):
        if check['name'].endswith('test:coverage'):
            if check['command'][:6] != ['bunx', 'vitest', 'run', '--dir', './app/test', '--coverage'] or not check.get('test_count', 0):
                raise ValueError(f"No fresh tests ran: {check['name']}")
        elif check['command'] != expected_command:
            raise ValueError(f"Unexpected command: {check['name']}")
        if check['exit_code'] != 0 or digest(Path(check['log'])) != check['log_sha256']:
            raise ValueError(f"Failed or changed check: {check['name']}")
        artifact = check.get('artifact')
        if (check['name'].endswith('test:coverage') or check['name'] == 'frontend-build') and not artifact:
            raise ValueError(f"Missing coverage artifact: {check['name']}")
        if artifact and digest(Path(artifact['path'])) != artifact['sha256']:
            raise ValueError(f"Changed coverage artifact: {check['name']}")
    print(f"Valid local evidence for {record['identity']['commit']}")

def run():
    if git('status', '--porcelain'):
        raise ValueError('Commit changes before running the exact-tree checks')
    out = ROOT.parent / 'local-quality-evidence' / ROOT.name
    out.mkdir(parents=True, exist_ok=True)
    record = {'identity': identity(), 'created_at': datetime.now(timezone.utc).isoformat(),
              'platform': sys.platform,
              'tools': {tool: subprocess.check_output([tool, '--version'], text=True, cwd=ROOT / cwd).strip()
                        for tool, cwd in (('bun', '.'), ('pnpm', 'layers/badge_system'), ('node', '.'))},
              'checks': []}
    evidence = out / f"{record['identity']['commit']}.json"
    for index, (cwd, name, command) in enumerate(CHECKS):
        coverage_dir = None
        if name.endswith('test:coverage'):
            coverage_dir = Path(tempfile.mkdtemp(prefix=f'{name.replace(":", "-")}-', dir=out))
            command = ['bunx', 'vitest', 'run', '--dir', './app/test', '--coverage', '--maxWorkers=2', '--hookTimeout=60000', '--coverage.reportsDirectory', str(coverage_dir)]
        log = out / f"{record['identity']['commit']}-{index}.log"
        print(f"{name}: {' '.join(command)}", flush=True)
        started_ns = time.time_ns()
        with log.open('wb') as stream:
            result = subprocess.run(command, cwd=ROOT / cwd, stdout=stream, stderr=subprocess.STDOUT, check=False)
        record['checks'].append({'cwd': cwd, 'name': name, 'command': command,
                                 'exit_code': result.returncode, 'log': str(log), 'log_sha256': digest(log)})
        if name.endswith('test:coverage') and result.returncode == 0:
            artifact = coverage_dir / 'coverage-final.json'
            counts = re.search(r'Tests\s+(\d+)\s+passed', log.read_text(errors='replace'))
            if artifact.is_file() and counts and int(counts.group(1)) > 0:
                record['checks'][-1]['test_count'] = int(counts.group(1))
                record['checks'][-1]['artifact'] = {'path': str(artifact), 'sha256': digest(artifact)}
            else:
                record['checks'][-1]['exit_code'] = result.returncode = 1
        if name == 'frontend-build' and result.returncode == 0:
            dist = ROOT / 'layers/badge_system/frontend/dist'
            index_file = dist / 'index.html'
            if index_file.is_file() and index_file.stat().st_mtime_ns >= started_ns:
                record['checks'][-1]['artifact'] = {'path': str(dist), 'sha256': digest(dist)}
            else:
                record['checks'][-1]['exit_code'] = result.returncode = 1
        evidence.write_text(json.dumps(record, indent=2) + '\n')
        if result.returncode:
            raise ValueError(f'Check failed: {log}')
    verify(evidence)
    print(evidence)

if __name__ == '__main__':
    try:
        if len(sys.argv) == 3 and sys.argv[1] == '--verify':
            verify(Path(sys.argv[2]))
        elif len(sys.argv) == 1:
            run()
        else:
            raise ValueError('Usage: local-quality.py [--verify PATH]')
    except (ValueError, OSError, subprocess.CalledProcessError) as error:
        print(error, file=sys.stderr)
        sys.exit(1)

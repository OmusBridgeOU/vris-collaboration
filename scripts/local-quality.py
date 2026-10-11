#!/usr/bin/env python3
"""Run the former CI quality checks locally and bind evidence to a commit."""
import hashlib
import json
import shutil
import subprocess
import sys
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
    return hashlib.sha256(path.read_bytes()).hexdigest()

def identity():
    lockfiles = [ROOT / 'bun.lock', ROOT / 'layers/badge_system/frontend/pnpm-lock.yaml']
    return {'commit': git('rev-parse', 'HEAD'), 'tree': git('rev-parse', 'HEAD^{tree}'),
            'lockfiles': {str(p.relative_to(ROOT)): digest(p) for p in lockfiles}}

def verify(path):
    record = json.loads(path.read_text())
    if record['identity'] != identity() or git('status', '--porcelain'):
        raise ValueError('Evidence is stale or checkout is dirty')
    if [(c['cwd'], c['name'], c['command']) for c in record['checks']] != CHECKS:
        raise ValueError('Required checks are missing')
    for check in record['checks']:
        if check['exit_code'] != 0 or digest(Path(check['log'])) != check['log_sha256']:
            raise ValueError(f"Failed or changed check: {check['name']}")
        artifact = check.get('artifact')
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
        log = out / f"{record['identity']['commit']}-{index}.log"
        print(f"{name}: {' '.join(command)}", flush=True)
        with log.open('wb') as stream:
            result = subprocess.run(command, cwd=ROOT / cwd, stdout=stream, stderr=subprocess.STDOUT, check=False)
        record['checks'].append({'cwd': cwd, 'name': name, 'command': command,
                                 'exit_code': result.returncode, 'log': str(log), 'log_sha256': digest(log)})
        if name.endswith('test:coverage') and result.returncode == 0:
            source = ROOT / 'layers/coverage/coverage-final.json'
            artifact = out / f"{record['identity']['commit']}-{index}-coverage-final.json"
            if source.is_file():
                shutil.copyfile(source, artifact)
                record['checks'][-1]['artifact'] = {'path': str(artifact), 'sha256': digest(artifact)}
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

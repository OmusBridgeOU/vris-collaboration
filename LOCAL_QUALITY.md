# Local quality checks

Install Bun 1.4.0 dependencies with `bun install --frozen-lockfile` at the root.
For the Badge System, run `pnpm --dir frontend install --frozen-lockfile`
inside `layers/badge_system` and install Playwright Chromium and WebKit there.
No production credentials are needed for the local quality checks.

Commit the change and run `python3 scripts/local-quality.py` on a clean tree.
It runs the four Nuxt layers' lint, typecheck, and coverage tests, then the
Badge frontend/Worker and D1 local checks. Evidence under
`../local-quality-evidence/vris-collaboration/` records the commit, tree,
lockfiles, tool versions, commands, exit codes, and log hashes. Use `--verify
PATH_TO_JSON` before relying on it. A source or lockfile change needs a new run.

GitHub Actions still builds and deploys production artifacts on the configured
main-branch/dispatch paths. D1 remote migration and Worker deployment remain
explicit `workflow_dispatch` operations requiring `deploy_remote`.

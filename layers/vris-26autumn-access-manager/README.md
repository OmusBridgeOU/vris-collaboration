# vris-26autumn-access-manager D1

This layer owns the Cloudflare D1 schema migrations for the VRIS 2026 autumn
access manager.

Application developers should normally work against a local D1 database and
submit migration files by pull request. Remote D1 changes are applied by GitHub
Actions after merge.

## Database

| Item | Value |
| --- | --- |
| D1 database name | `vris-26autumn-access-manager` |
| D1 database ID | `7dd96a71-ddea-44b3-bc4d-4989bee2c35b` |
| Wrangler binding | `DB` |
| Migration directory | `migrations/` |

The binding is defined in `wrangler.toml`.

## Access Model

Developers do not need a personal Cloudflare account, Wrangler login, or
Cloudflare API token for ordinary schema development.

Use local D1 for:

- creating migration files
- applying migrations locally
- testing SQL and application code locally
- opening pull requests

Only CI or maintainers should apply migrations to the remote D1 database.

Do not share:

- personal Cloudflare API tokens
- Wrangler OAuth credentials
- Cloudflare Global API Keys
- decrypted `.env` files or secrets

## Setup

From the repository root:

```sh
bun install
```

Then move into this layer:

```sh
cd layers/vris-26autumn-access-manager
```

## Create a Migration

Create a new migration file with a short snake_case description:

```sh
bun run d1:create-migration -- create_access_tables
```

Wrangler creates a numbered SQL file under `migrations/`, for example:

```text
migrations/0001_create_access_tables.sql
```

Edit that file and write normal SQLite-compatible DDL/DML.

Example:

```sql
CREATE TABLE access_tokens (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Validate Locally

Apply unapplied migrations to your local D1 database:

```sh
bun run d1:migrate:local
```

List unapplied local migrations:

```sh
bun run d1:list:local
```

Local D1 state is stored under `.wrangler/` and is intentionally ignored by git.

## Pull Request Flow

Include these files in your PR:

- new or edited files under `migrations/`
- any application code that depends on the schema
- tests or local verification notes when relevant

PRs that touch this layer run a migration validation workflow. That workflow
checks local migration configuration only. It does not modify the remote D1
database.

## Remote Apply

Remote migrations are applied by GitHub Actions after changes are merged to
`main`, or by manually running the workflow.

Workflow:

```text
.github/workflows/vris-26autumn-access-manager-d1-migrations.yml
```

Required GitHub Actions secret:

```text
CLOUDFLARE_API_TOKEN
```

The token should be a CI-only Cloudflare API token with D1 edit access for the
target Cloudflare account. Do not put this token in source code, `.env`, issue
comments, or pull request comments.

Maintainers can register the token from a terminal. Paste the token when
prompted:

```sh
printf 'Paste CLOUDFLARE_API_TOKEN: '
stty -echo
IFS= read -r CLOUDFLARE_API_TOKEN
stty echo
printf '\n'
printf '%s' "$CLOUDFLARE_API_TOKEN" \
  | gh -R OmusBridgeOU/vris-collaboration secret set CLOUDFLARE_API_TOKEN
unset CLOUDFLARE_API_TOKEN
gh -R OmusBridgeOU/vris-collaboration secret list
```

Maintainers can manually apply remote migrations when necessary:

```sh
bun run d1:migrate:remote
```

This command requires Cloudflare authentication and should not be part of the
ordinary developer workflow.

## Useful Commands

```sh
# Create a new migration file
bun run d1:create-migration -- <migration_name>

# Apply local migrations
bun run d1:migrate:local

# List unapplied local migrations
bun run d1:list:local

# List unapplied remote migrations, maintainers only
bun run d1:list:remote

# Apply remote migrations, maintainers/CI only
bun run d1:migrate:remote
```

## Troubleshooting

If `bun run d1:migrate:local` reports no migrations, confirm that your SQL file
is inside `migrations/` and has not already been applied to your local D1 state.

If local state gets confusing, remove the local D1 state and reapply:

```sh
rm -rf .wrangler
bun run d1:migrate:local
```

If CI fails with an authentication error during remote apply, ask a maintainer
to verify that the repository has the `CLOUDFLARE_API_TOKEN` GitHub Actions
secret configured.

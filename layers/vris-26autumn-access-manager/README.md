# vris-26autumn-access-manager

VRIS 2026 Autumn access manager 用の Cloudflare D1 と、そのD1を操作する
Cloudflare Worker APIを管理するレイヤーです。

このレイヤーに以下をまとめています。

- D1 schema migrations
- D1 binding付きWorker API
- API key / admin API key based access control
- GitHub Actionsによる検証と、手動dispatchでのremote D1 migration / Worker deploy

## 対象リソース

| 項目 | 値 |
| --- | --- |
| D1 database name | `vris-26autumn-access-manager` |
| D1 database ID | `7dd96a71-ddea-44b3-bc4d-4989bee2c35b` |
| Wrangler binding | `DB` |
| Migration directory | `migrations/` |
| Worker name | `vris-26autumn-access-api` |
| Worker URL | `https://vris-26autumn-access-api.skmt3p.workers.dev` |

binding と Worker 設定は `wrangler.jsonc` に定義されています。レイヤー名は
`access-manager` ですが、既存URLを維持するためWorker名は
`vris-26autumn-access-api` のままです。

## Security Model

- Browser requests must come from `ALLOWED_ORIGINS`.
- Every `/v1/*` request must include `x-api-key: <key>` or
  `Authorization: Bearer <key>`.
- Row CRUD and table reads require `API_KEYS` or `ADMIN_API_KEYS`.
- Table create/drop requires `ADMIN_API_KEYS`.
- Raw SQL is not exposed.
- SQLite/Cloudflare internal tables such as `sqlite_*`, `_cf_*`, and
  `d1_migrations` are rejected.

Origin checks are useful for browsers, but they are not authentication. Keep the
API key requirement enabled for every CRUD request.

Allowed browser origins are configured as a comma-separated list:

```jsonc
{
  "ALLOWED_ORIGINS": "https://vris.jp,https://archived.vris.jp,https://example.com"
}
```

Use exact origins including the scheme. Do not use bare domains such as
`vris.jp`.

## Initial Setup

```sh
bun install
cd layers/vris-26autumn-access-manager
```

For local Worker testing, create `.dev.vars` without committing it:

```text
API_KEYS=local-development-key
ADMIN_API_KEYS=local-admin-development-key
```

The deployed Worker secrets are:

```text
API_KEYS
ADMIN_API_KEYS
```

Do not commit API keys, OAuth tokens, Cloudflare API tokens, or decrypted env
files.

## D1 Migrations

Create a migration:

```sh
bun run d1:create-migration -- create_access_tables
```

Apply migrations locally:

```sh
bun run d1:migrate:local
```

List local migrations:

```sh
bun run d1:list:local
```

Apply remote migrations only from CI or by a maintainer:

```sh
bun run d1:migrate:remote
```

Local D1 state is stored in `.wrangler/`, which is not committed.

## Worker API

```text
GET    /health
GET    /v1/tables
GET    /v1/tables/:table
POST   /v1/tables
DELETE /v1/tables/:table?confirm=:table
GET    /v1/:table
POST   /v1/:table
GET    /v1/:table/:id
PATCH  /v1/:table/:id
DELETE /v1/:table/:id
```

List query params:

- `limit`: default `50`, max `200`
- `offset`: default `0`
- `orderBy`: table column, default primary key
- `orderDirection`: `asc` or `desc`

Create and update row bodies must be JSON objects with primitive values.
Unknown or non-writable fields are ignored.

Create table body:

```json
{
  "name": "engineer_notes",
  "columns": [
    { "name": "id", "type": "TEXT", "primaryKey": true },
    { "name": "title", "type": "TEXT", "notNull": true },
    { "name": "body", "type": "TEXT" },
    { "name": "status", "type": "TEXT", "default": "draft" }
  ]
}
```

Allowed column types:

```text
TEXT, INTEGER, REAL, NUMERIC, BLOB
```

Table and column names must match `[A-Za-z_][A-Za-z0-9_]*`.

Deleting a table requires `confirm` to match the table name:

```sh
curl -X DELETE \
  -H 'x-api-key: <admin-key>' \
  'https://vris-26autumn-access-api.skmt3p.workers.dev/v1/tables/engineer_notes?confirm=engineer_notes'
```

## Local Worker Development

```sh
bun run types
bun run typecheck
bun run d1:migrate:local
bun run dev
```

Example request:

```sh
curl -H 'x-api-key: local-development-key' \
  'http://127.0.0.1:8787/v1/access_tokens?limit=20'
```

## CI and Deploy

Workflow:

```text
.github/workflows/vris-26autumn-access-manager-d1-migrations.yml
```

On pull requests, CI runs:

```sh
bun run check
```

On `main` pushes, CI runs the same validation only:

```sh
bun run check
```

On manual dispatch with `deploy_remote=true`, CI runs in this order:

1. Validate Worker and D1 config
2. Apply remote D1 migrations
3. Deploy Worker

Required GitHub Actions secrets:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

Required Worker secrets:

```sh
bunx wrangler@4.98.0 secret put API_KEYS --config wrangler.jsonc
bunx wrangler@4.98.0 secret put ADMIN_API_KEYS --config wrangler.jsonc
```

## Troubleshooting

If `bun run d1:migrate:local` reports no migrations, check whether SQL files are
under `migrations/` or already applied locally.

If local D1 state is unclear:

```sh
rm -rf .wrangler
bun run d1:migrate:local
```

If remote migration or deploy CI fails with an authentication error, check
`CLOUDFLARE_API_TOKEN` and its D1/Workers permissions.

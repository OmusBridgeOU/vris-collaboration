# vris-26autumn-access-api

Cloudflare Worker API for controlled CRUD and table management access to the
`vris-26autumn-access-manager` D1 database.

The API intentionally does not expose raw SQL. It introspects D1 table schemas
and only generates bounded CRUD/DDL statements from validated identifiers and
column definitions.

## Security model

- Browser requests must come from `ALLOWED_ORIGINS`.
- Every `/v1/*` request must include `x-api-key: <key>` or
  `Authorization: Bearer <key>`.
- API keys are stored as the Worker secret `API_KEYS`.
- Table create/drop requests also require the Worker secret `ADMIN_API_KEYS`.
- `TABLE_CONFIG` can override a table policy, but ordinary D1 tables are usable
  without adding them there.

Origin checks are useful for browsers, but they are not authentication. Keep the
API key requirement enabled for every CRUD request.

## Configuration

`wrangler.jsonc` binds the existing D1 database:

```jsonc
{
  "binding": "DB",
  "database_name": "vris-26autumn-access-manager",
  "database_id": "7dd96a71-ddea-44b3-bc4d-4989bee2c35b"
}
```

Allowed browser origins are configured as a comma-separated list:

```jsonc
{
  "ALLOWED_ORIGINS": "https://vris.jp,https://archived.vris.jp,https://example.com"
}
```

Use exact origins including the scheme. Do not use bare domains such as
`vris.jp`.

Optional table policy override:

```json
{
  "access_tokens": {
    "primaryKey": "id",
    "columns": ["id", "label", "created_at"],
    "writableColumns": ["id", "label"]
  }
}
```

Use `TABLE_CONFIG` only when a table needs explicit readable/writable columns.
Otherwise the Worker uses `PRAGMA table_info` to discover table columns and the
first primary-key column.

## Local development

```sh
cd layers/vris-26autumn-access-api
bun run types
bun run typecheck
bun run d1:migrate:local
bun run dev
```

For local testing, create `.dev.vars` without committing it:

```text
API_KEYS=local-development-key
ADMIN_API_KEYS=local-admin-development-key
```

Example request:

```sh
curl -H 'x-api-key: local-development-key' \
  'http://127.0.0.1:8787/v1/access_tokens?limit=20'
```

## API

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
- `orderBy`: allowlisted column, default primary key
- `orderDirection`: `asc` or `desc`

Create and update bodies must be JSON objects with primitive values. Unknown or
non-writable fields are ignored.

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

Table and column names must match `[A-Za-z_][A-Za-z0-9_]*`. Reserved/internal
SQLite and Cloudflare table names are rejected.

Create/drop table requests require `ADMIN_API_KEYS`. Deleting a table requires
`confirm` to match the table name:

```sh
curl -X DELETE \
  -H 'x-api-key: <admin-key>' \
  'https://vris-26autumn-access-api.skmt3p.workers.dev/v1/tables/engineer_notes?confirm=engineer_notes'
```

## Deploy

Set the API key secret first:

```sh
cd layers/vris-26autumn-access-api
bunx wrangler@4.98.0 secret put API_KEYS --config wrangler.jsonc
bunx wrangler@4.98.0 secret put ADMIN_API_KEYS --config wrangler.jsonc
```

Then deploy:

```sh
bun run deploy
```

# VRIS Cloud

会場の混雑度を公開するための Cloudflare Workers + D1 パッケージです。

オンプレミスサーバーから送られた会場ごとの `crowd_level` をD1に履歴として保存し、一般公開用APIでは内部の会場名を隠して `value1` / `value2` として返します。

## API

### `POST /api/v1/venue-status-write`

オンプレミスサーバーから混雑度を書き込むAPIです。

`VRIS-visitor-counter-APIKEY` ヘッダーの値が、Worker secret の `CLOUD_INGEST_API_KEY` と一致する必要があります。

リクエスト例:

```json
{
  "venue": "main",
  "crowd_level": 2
}
```

有効な `venue` は `main` と `dtc` です。有効な `crowd_level` は `1`、`2`、`3` です。

各リクエストは `crowd_status_history` に新しい履歴行として追加されます。

### `GET /api/v1/crowd-status`

一般公開用の混雑度APIです。内部の会場名は返しません。

レスポンス例:

```json
{
  "value1": 2,
  "value2": 1,
  "updated_at": "2026-05-21 10:00:00"
}
```

`value1` は `main` の最新混雑度、`value2` は `dtc` の最新混雑度です。まだデータがない会場は `-1` を返します。

### `DELETE /api/v1/test/crowd-status-history`

テスト用に履歴を全削除するAPIです。

`ENABLE_TEST_API = "true"` が設定されている環境でのみ有効です。本番環境では `404` を返します。

## 開発

Node.js 18以上を使用してください。

```bash
npm install
npm run typecheck
npm test
npm run dev
```

## デプロイ

Cloudflareにログインします。

```bash
npx wrangler login
```

D1データベースを作成します。

```bash
npx wrangler d1 create vris-26autumn-visitor-counter
```

表示された `database_id` を `wrangler.toml` に設定します。

```toml
database_id = "your-d1-database-id"
```

D1 migrationを手動で適用します。

```bash
npx wrangler d1 migrations apply vris-26autumn-visitor-counter
```

書き込みAPI用のsecretを登録します。

```bash
npx wrangler secret put CLOUD_INGEST_API_KEY
```

デプロイします。

```bash
npm run deploy
```

## デプロイ後の確認

公開API:

```bash
curl https://<your-worker-url>/api/v1/crowd-status
```

初期状態の例:

```json
{
  "value1": -1,
  "value2": -1,
  "updated_at": null
}
```

書き込みAPI:

```bash
curl -X POST https://<your-worker-url>/api/v1/venue-status-write \
  -H "Content-Type: application/json" \
  -H "VRIS-visitor-counter-APIKEY: <CLOUD_INGEST_API_KEY>" \
  -d "{\"venue\":\"main\",\"crowd_level\":2}"
```

## D1

本番環境のmigrationは自動実行せず、対象環境を確認してから手動で適用してください。

ローカルD1の履歴を削除する例:

```bash
npx wrangler d1 execute vris-26autumn-visitor-counter --local --command "DELETE FROM crowd_status_history"
```

デプロイ済みD1の履歴を削除する場合は、対象環境を確認してから実行してください。

```bash
npx wrangler d1 execute vris-26autumn-visitor-counter --remote --command "DELETE FROM crowd_status_history"
```

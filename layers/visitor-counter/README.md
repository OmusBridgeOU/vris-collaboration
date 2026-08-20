# VRIS Visitor Counter API

会場の混雑度を公開するCloudflare Workers + D1パッケージです。

オンプレミスサーバーから送信された会場ごとの`crowd_level`を履歴として保存し、公開APIでは内部会場名を隠して`value1` / `value2`として返します。

## API

### `POST /api/v1/venue-status-write`

`VRIS-visitor-counter-APIKEY`ヘッダーがWorker secretの`CLOUD_INGEST_API_KEY`と一致する場合のみ書き込みます。

```json
{
  "venue": "main",
  "crowd_level": 2
}
```

- `venue`: `main`または`dtc`
- `crowd_level`: `1`、`2`、`3`

### `GET /api/v1/crowd-status`

```json
{
  "value1": 2,
  "value2": 1,
  "updated_at": "2026-08-20 10:00:00"
}
```

`value1`は`main`、`value2`は`dtc`の最新値です。未登録の場合は`-1`を返します。

本番Workerには履歴削除APIを実装していません。テストの初期化はローカルD1 bindingへ直接行います。

## ローカル開発

リポジトリルートで依存関係を導入します。

```bash
bun install --frozen-lockfile
```

このディレクトリで検証します。

```bash
bun run d1:migrate:local
bun run check
bun run dev
```

`check`はWrangler型生成、TypeScript、ESLint、ローカルmigration状態、Workersランタイム上のD1統合テストを実行します。

## Cloudflare構成

- アカウント: `layers/main`と同じCloudflareアカウント
- Worker: `vris-26autumn-visitor-counter-api`
- D1: `vris-26autumn-visitor-counter`
- D1 binding: `DB`
- 認証: GitHub Secretsの`CLOUDFLARE_ACCOUNT_ID`と`CLOUDFLARE_API_TOKEN`
- Worker secret: `CLOUD_INGEST_API_KEY`
- ローカル引き渡し: macOS Keychain service `vris-visitor-counter-ingest-api-key`

設定の正本は`wrangler.jsonc`です。Dashboard側だけでbindingを変更しないでください。

## デプロイ

通常はGitHub Actionsの`<Visitor Counter> D1 and API`を使用します。

- pull request / main push: `validate`のみ
- 手動実行で`deploy_remote=true`: remote migration後にWorkerをデプロイ

初回構築または緊急時のローカル実行:

```bash
export CLOUDFLARE_ACCOUNT_ID='<mainと同じアカウントID>'
bun run d1:migrate:remote
bun run deploy
bunx wrangler secret put CLOUD_INGEST_API_KEY --config wrangler.jsonc
```

secretはソース、`.env`、`wrangler.jsonc`へ保存しません。

現在のオンプレミス連携用キーはmacOS Keychainに保存されています。取得時はKeychain Accessを使用し、チャット、Issue、ログへ貼り付けないでください。

## デプロイ後の非破壊確認

```bash
curl --fail-with-body https://vris-26autumn-visitor-counter-api.<workers-subdomain>.workers.dev/api/v1/crowd-status
curl -i -X POST https://vris-26autumn-visitor-counter-api.<workers-subdomain>.workers.dev/api/v1/venue-status-write \
  -H 'Content-Type: application/json' \
  -d '{"venue":"main","crowd_level":2}'
```

1つ目は`200`、2つ目はAPIキーなしのため`401`であることを確認します。本番smoke testでは履歴を書き込みません。

## Rollback

WorkerコードはCloudflare DashboardのDeploymentsから直前の正常バージョンへrollbackします。

D1 migrationは前方修正を原則とします。破壊的migrationを適用する前は次でバックアップします。

```bash
bunx wrangler d1 export vris-26autumn-visitor-counter --remote \
  --config wrangler.jsonc \
  --output ./vris-26autumn-visitor-counter-backup.sql
```

migration失敗時はWorkerをデプロイせず停止し、schemaと`d1_migrations`を確認して修正migrationを追加します。既存migrationファイルは適用後に書き換えません。

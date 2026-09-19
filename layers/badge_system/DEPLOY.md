# VRIS Original Badge System - Deployment

Badge System の本番デプロイ手順です。

このシステムは以下に配置されています。

```text
vris-collaboration/layers/badge_system
```

本番環境は以下で構成します。

* Cloudflare Worker
* Workers Static Assets
* Cloudflare D1
* private Cloudflare R2

Cloudflare Pages は使用しません。

## 作業ディレクトリ・依存関係

この文書のコマンドは、リポジトリルートから `cd layers/badge_system` した状態で実行します。Node.js 22 系と pnpm 11.7.0 を使用してください。

```sh
npm run install:frontend
npm run build
```

frontend は専用の pnpm workspace と `frontend/pnpm-lock.yaml` で管理します。ルートの Bun による Nuxt アプリのビルド・デプロイとは独立しています。ローカル開発は [README.md](README.md) を参照してください。

## 1. Cloudflare Resources

本番用に以下を用意します。

* Worker
* D1 Database
* private R2 Bucket
* Cloudflare API Token
* 本番 HTTPS URL

Worker Binding 名：

```text
DB
ORDER_IMAGES
```

注文画像用 R2 Bucket は非公開にし、`r2.dev` や Public Access を有効にしないでください。

## 2. GitHub Environment

GitHub Repository の

```text
Settings
→ Environments
```

から以下を作成します。

```text
badge-system
```

### Variables

```text
WORKER_NAME
APP_BASE_URL
PRODUCTION_CUSTOM_DOMAIN
D1_DATABASE_NAME
ORDER_IMAGES_BUCKET
STAFF_ACCESS_USERNAME
```

例：

```text
WORKER_NAME=vris-badge
APP_BASE_URL=https://badge.example.com
PRODUCTION_CUSTOM_DOMAIN=true
D1_DATABASE_NAME=vris-badge-production
ORDER_IMAGES_BUCKET=vris-badge-order-images
STAFF_ACCESS_USERNAME=staff
```

### Secrets

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
D1_DATABASE_ID
PUBLIC_TOKEN_SECRET
STAFF_ACCESS_PASSWORD
```

`PUBLIC_TOKEN_SECRET` と `STAFF_ACCESS_PASSWORD` は32文字以上の異なるランダム値を使用してください。

`APP_BASE_URL` は実際の本番 HTTPS origin（パス・クエリーなし）に置き換えます。設定生成スクリプトは上記の `example.com` のままではエラーになります。独自ドメインでは `PRODUCTION_CUSTOM_DOMAIN=true` とし、Cloudflare で管理するドメインを指定してください。`false` または未設定の場合は、Worker名とアカウントのサブドメインに一致する `workers.dev` の origin が必要です。

## 3. Repository Variable

GitHub の

```text
Settings
→ Secrets and variables
→ Actions
→ Variables
```

に以下を作成します。

```text
BADGE_SYSTEM_PRODUCTION_DEPLOY_ENABLED
```

通常：

```text
BADGE_SYSTEM_PRODUCTION_DEPLOY_ENABLED=false
```

本番デプロイを有効にする場合：

```text
BADGE_SYSTEM_PRODUCTION_DEPLOY_ENABLED=true
```

## 4. GitHub Actions

Workflow：

```text
.github/workflows/badge-system-ci.yml
```

Pull Request と `main` への push では、次のパスの変更を対象にCIを実行します。Actions の `workflow_dispatch` から手動実行することもできます。

```text
layers/badge_system/**
.github/workflows/badge-system-ci.yml
```

deploy job では以下の Environment を使用します。

```yaml
environment: badge-system
```

本番デプロイは以下をすべて満たした場合のみ実行されます。

```text
main ブランチ
Pull Request ではない
BADGE_SYSTEM_PRODUCTION_DEPLOY_ENABLED == true
```

この条件は手動実行にも適用されます。検証 job が成功した後、その job でビルドした `frontend/dist` を deploy job が取得します。GitHub Environment に承認ルールを設定している場合は、その承認も必要です。

## 5. D1 Migration

本番用の Variables と `CLOUDFLARE_ACCOUNT_ID`・`D1_DATABASE_ID` を、作業するシェルの環境変数にも設定します。GitHub Environment の値はローカルには自動反映されません。Cloudflare の操作には `CLOUDFLARE_API_TOKEN` も必要です。

設定ファイルを生成します。引数を省略すると本番設定だけを生成し、認証用の secrets ファイルは生成しません。

```sh
node scripts/production_config.mjs
```

出力先は `layers/badge_system/wrangler.production.json` です。設定内の Worker ソース、静的ファイル、マイグレーションのパスは、このファイルが置かれたディレクトリを基準にします。生成ファイルを別の場所へ移動しないでください。

Migration 状態を確認します。

```sh
pnpm --dir frontend exec wrangler d1 migrations list DB --remote --config ../wrangler.production.json
```

Migration 適用：

```sh
pnpm --dir frontend exec wrangler d1 migrations apply DB --remote --config ../wrangler.production.json
```

Migration は GitHub Actions の通常のデプロイでは自動実行しません。

`0002_remove_unused_workflows.sql` は旧認証・監査などの未使用テーブルとカラムを削除します。既存の本番DBへ適用する場合は対象DBとバックアップを確認し、注文データを保持する移行として実施してください。ローカルDBの初期化には、`--remote` を使わず README の `npm run worker:migrate:local` を使用します。

## 6. Deployment

本番環境の準備が完了したら、

```text
BADGE_SYSTEM_PRODUCTION_DEPLOY_ENABLED=true
```

に変更し、GitHub Actions の **Badge System CI** を `main` を選択して手動実行できます。対象ファイルの変更が `main` に反映された場合も実行されます。

GitHub Actions がテスト、ビルド、本番設定生成、Cloudflare へのデプロイを実行します。独自ドメイン設定時は `workers_dev=false` となり、スタッフ画面を含めて Worker 経由で SPA を配信します。

CI 内のデプロイコマンド：

```bash
pnpm --dir frontend exec wrangler deploy \
  --config ../wrangler.production.json \
  --secrets-file "$RUNNER_TEMP/deployment_secrets.json"
```

## 7. Post-deployment Check

本番デプロイ後：

```bash
curl https://<production-domain>/api/health
curl https://<production-domain>/api/ready
```

さらに以下を確認します。

* 来場者画面
* 注文作成
* 5桁受付番号
* QRコード
* `/staff` の Basic 認証
* 受付番号検索
* 注文画像表示
* 印刷

## 8. Required Files

以下はデプロイ処理で使用するため削除しないでください。

```text
.github/workflows/badge-system-ci.yml

layers/badge_system/wrangler.example.toml
layers/badge_system/wrangler.production.example.json

layers/badge_system/scripts/production_config.mjs
layers/badge_system/scripts/production_config.test.mjs
layers/badge_system/scripts/production_dry_run.mjs

layers/badge_system/worker/migrations/
```

以下は Git にコミットしないでください。

```text
.env
.env.*
wrangler.production.json
deployment_secrets.json
```

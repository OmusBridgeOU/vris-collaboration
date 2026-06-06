# vris-26autumn-access-manager D1

このレイヤーは、VRIS 2026 Autumn access manager 用の Cloudflare D1
スキーママイグレーションを管理します。

通常の開発者は Cloudflare の管理画面や API トークンを使わず、ローカル D1
でDB開発を行い、マイグレーションファイルを Pull Request で提出します。
remote D1 への反映は、`main` へのマージ後に GitHub Actions から実行します。

English summary: application developers work against local D1 and submit
migrations by pull request. Remote D1 migrations are applied by GitHub Actions
after merge.

## 対象DB

| 項目 | 値 |
| --- | --- |
| D1 database name | `vris-26autumn-access-manager` |
| D1 database ID | `7dd96a71-ddea-44b3-bc4d-4989bee2c35b` |
| Wrangler binding | `DB` |
| Migration directory | `migrations/` |

binding は `wrangler.toml` に定義されています。

## 権限方針

通常のDB開発だけであれば、開発者個人には以下は不要です。

- Cloudflare アカウントへの招待
- `wrangler login`
- Cloudflare API token
- Cloudflare の Global API Key

開発者が行うこと:

- マイグレーションファイルを作る
- ローカル D1 にマイグレーションを適用する
- SQL とアプリケーションコードをローカルで確認する
- Pull Request を出す

remote D1 に反映するのは CI またはメンテナだけです。

共有してはいけないもの:

- 個人の Cloudflare API token
- Wrangler の OAuth 認証情報
- Cloudflare Global API Key
- 復号済みの `.env` や secret

## 初回セットアップ

リポジトリルートで依存関係を入れます。

```sh
bun install
```

このレイヤーへ移動します。

```sh
cd layers/vris-26autumn-access-manager
```

## マイグレーションを作る

短い `snake_case` の説明名でマイグレーションを作ります。

```sh
bun run d1:create-migration -- create_access_tables
```

Wrangler が `migrations/` 配下に番号付きSQLファイルを作ります。

```text
migrations/0001_create_access_tables.sql
```

作成されたSQLファイルを編集し、SQLite互換のDDL/DMLを書きます。

```sql
CREATE TABLE access_tokens (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## ローカルで確認する

未適用のマイグレーションをローカル D1 に適用します。

```sh
bun run d1:migrate:local
```

ローカルで未適用のマイグレーションを確認します。

```sh
bun run d1:list:local
```

ローカル D1 の状態は `.wrangler/` に保存されます。このディレクトリは git
管理しません。

## Pull Request の出し方

PRには必要に応じて以下を含めます。

- `migrations/` 配下の新規または編集されたSQLファイル
- そのスキーマに依存するアプリケーションコード
- テストやローカル確認結果のメモ

このレイヤーに触れるPRでは、マイグレーション検証用の GitHub Actions
が走ります。この検証はローカル設定の確認だけを行い、remote D1
は変更しません。

## remote D1 への反映

remote D1 へのマイグレーション適用は、変更が `main` にマージされた後、
またはワークフローを手動実行したときに GitHub Actions から行います。

Workflow:

```text
.github/workflows/vris-26autumn-access-manager-d1-migrations.yml
```

必要な GitHub Actions secret:

```text
CLOUDFLARE_API_TOKEN
```

この token は CI 専用の Cloudflare API token にしてください。対象
Cloudflare account の D1 edit 権限だけを持たせ、ソースコード、`.env`、Issue、
Pull Request コメントには書かないでください。

メンテナはターミナルから secret を登録できます。実行後、token を貼り付けて
Enter を押します。

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

メンテナが必要に応じて手元から remote D1 に反映する場合は、以下を使います。

```sh
bun run d1:migrate:remote
```

このコマンドには Cloudflare 認証が必要です。通常の開発者フローでは使いません。

## よく使うコマンド

```sh
# 新しいマイグレーションファイルを作る
bun run d1:create-migration -- <migration_name>

# ローカル D1 にマイグレーションを適用する
bun run d1:migrate:local

# ローカル D1 の未適用マイグレーションを見る
bun run d1:list:local

# remote D1 の未適用マイグレーションを見る。メンテナ向け
bun run d1:list:remote

# remote D1 にマイグレーションを適用する。CIまたはメンテナ向け
bun run d1:migrate:remote
```

## トラブルシュート

`bun run d1:migrate:local` でマイグレーションがないと表示される場合は、
SQLファイルが `migrations/` 配下にあるか、すでにローカル D1
へ適用済みではないかを確認してください。

ローカル D1 の状態が分からなくなった場合は、ローカル状態を削除してから
再適用できます。

```sh
rm -rf .wrangler
bun run d1:migrate:local
```

remote apply のCIが認証エラーで失敗する場合は、メンテナに
`CLOUDFLARE_API_TOKEN` GitHub Actions secret が設定されているか確認して
もらってください。

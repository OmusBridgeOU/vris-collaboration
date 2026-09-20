# VRIS Original Badge System

VRIS 会場向けのオリジナル缶バッジ作成システムです。来場者は写真を編集し、5桁の受付番号とQRコードを発行できます。スタッフは注文を検索し、缶バッジ製作用のはがきレイアウトを印刷できます。

## リポジトリ内の位置づけ

`vris-collaboration/layers/badge_system` に配置された独立アプリです。React / TypeScript / Vite / Tailwind CSS の frontend と、Cloudflare Workers / D1 / private R2 の Worker で構成します。本番では Workers Static Assets から frontend を配信します。

`layers/base`・`layers/main`・`layers/vris` などの Nuxt レイヤーとはビルドとデプロイを分離しています。Nuxt の `extends`、レイヤーエイリアス、`VITE_OUTPUT_ENV` は使用しません。

```text
vris-collaboration/
├── package.json                         # Bun workspace: layers/*
├── .github/workflows/badge-system-ci.yml
└── layers/badge_system/
    ├── package.json                     # workspace 名: vris-original-badge-system
    ├── README.md
    ├── DEPLOY.md
    ├── frontend/                        # 独立した pnpm workspace
    │   ├── package.json
    │   ├── pnpm-workspace.yaml
    │   ├── pnpm-lock.yaml
    │   ├── src/
    │   └── tests/e2e/
    ├── worker/
    │   ├── src/
    │   ├── tests/
    │   └── migrations/
    ├── scripts/                         # 本番設定生成・検証
    ├── wrangler.example.toml            # ローカル開発用
    └── wrangler.production.example.json # 本番設定生成用テンプレート
```

リポジトリ全体のパッケージマネージャーは Bun です。ただし frontend はルートの `layers/*` workspace に含まれないため、既存CIと同じ **pnpm 11.7.0** と専用ロックファイルで依存関係を管理します。ルートの `bun install` だけでは frontend の依存関係はインストールされません。

整形ルールはこのディレクトリの `.prettierrc.json` で定義し、既存の React / Worker コードに合わせてセミコロンとダブルクォートを使用します。

## ローカル開発

Node.js 22 系と pnpm 11.7.0 を使用します。以下は最初の `cd` を除き、すべて `layers/badge_system` で実行します。pnpm は `--dir frontend` を指定し、ルートの Bun 設定と混在させないでください。

```sh
cd layers/badge_system
npm run install:frontend
npm run build
```

このディレクトリに `.dev.vars` を作成し、ローカル専用の値を設定します。ファイルは既存の ignore 設定の対象です。本番の値は使用しないでください。

```dotenv
PUBLIC_TOKEN_SECRET=local-only-public-token-secret-change-me
STAFF_ACCESS_PASSWORD=local-only-staff-password-change-me
```

`STAFF_AUTH_MODE=shared_basic`、`STAFF_ACCESS_USERNAME=staff`、`APP_BASE_URL=http://localhost:5173` は `wrangler.example.toml` に設定されています。D1 / R2 の名前・IDはローカル開発用の仮設定です。

ローカルD1へマイグレーションを適用し、Worker を起動します。

```sh
npm run worker:migrate:local
npm run worker:dev
```

別のターミナルを同じディレクトリで開き、frontend を起動します。

```sh
npm run dev
```

- 編集画面: `http://localhost:5173/`
- スタッフ画面: `http://localhost:5173/staff`
- Worker API: `http://127.0.0.1:8787/api/ready`

Vite は `/api` を Worker の `127.0.0.1:8787` へ転送します。転送先を変更する場合は、frontend 起動時の環境変数 `VITE_API_PROXY_TARGET` を設定してください。5173番ポートが使用中の場合は別ポートへ自動変更せずエラーになります。

Vite は画面を直接配信するため、ページ自体への Basic 認証を含む確認には `http://127.0.0.1:8787/staff` を使います。Wrangler では本番と同様に全リクエストを Worker に通し、SPA の画面を配信します。Wrangler が配信する静的ファイルはビルド済みの `frontend/dist` なので、変更を反映するには再ビルドしてください。

## 検証コマンド

`layers/badge_system` で実行します。

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test:ut
npm run build
npm run worker:dry-run
npm run production:dry-run
```

- `typecheck`: frontend と Worker の型検査。
- `test:ut`: frontend、Worker、本番設定・共有ファイル監査関数のテスト。
- `test` / `worker:test` / `deployment:test`: 各テストを個別実行。
- `worker:dry-run` / `production:dry-run`: ローカルでのバンドル検証。事前に `build` が必要です。本番設定の dry-run はダミー値を使い、デプロイやマイグレーションは行いません。

ルートの Bun からも実行できます。先に frontend の依存関係をインストールしてください。

```sh
bun --filter vris-original-badge-system typecheck
bun --filter vris-original-badge-system test:ut
bun --filter vris-original-badge-system lint
bun --filter vris-original-badge-system build:local
```

ルートの `bun typecheck`、`bun test:ut`、`bun run build:local` の再帰実行にも参加します。ルートの `build` は既存の Nuxt アプリ向けです。バッジ単体のビルドには上記の専用コマンドを使ってください。

E2E は別途ブラウザをインストールして実行します。

```sh
pnpm --dir frontend exec playwright install chromium webkit
npm run test:e2e
```

`npm run share:audit` は Git のファイル一覧を読み取る監査です。Git 操作を禁止している作業では実行しないでください。`deployment:test` は監査関数のテストのみで、Git コマンドを実行しません。

## 素材・スタッフ運用

- [提供フレーム](frontend/src/assets/frames/README.md): `frontend/src/assets/frames/`
- [提供スタンプ](frontend/src/assets/stamps/README.md): `frontend/src/assets/stamps/`
- スタンプのクレジット: `frontend/src/assets/stamps/credits.json`

来場者がアップロードした画像や、利用許諾のない素材は配置しないでください。

スタッフ画面は共有 HTTP Basic 認証を使用します。注文は5桁の受付番号、または受付番号のみを含むQRコードから検索します。注文1個につき 100 × 148 mm のはがき1ページを生成し、同じ70 mm画像を2枚配置します。標準単価は税込500円で、`worker/src/badge_pricing.json` に定義されています。

## CI・本番デプロイ

専用CIは [badge-system-ci.yml](../../.github/workflows/badge-system-ci.yml) です。frontend の pnpm ロックファイルを使い、検証済みのビルド成果物を deploy job に渡します。実行条件、GitHub Environment、D1の手動マイグレーションは [DEPLOY.md](DEPLOY.md) を参照してください。

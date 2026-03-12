# 推奨コマンド集

## 開発サーバー起動
```bash
# 開発サーバー起動（base layer）
cd layers/base && bun dev:local

# 環境指定での開発サーバー起動
cd layers/base && bun dev  # $target環境変数使用
```

## ビルド・生成
```bash
# ローカル環境でのビルド
cd layers/base && bun build:local

# 静的サイト生成
cd layers/base && bun generate:local

# プレビュー
cd layers/base && bun preview
```

## 品質チェック（重要）
```bash
# 型チェック
cd layers/base && bun typecheck

# リント実行
cd layers/base && bun lint

# ESLintのみ
cd layers/base && bun lint:eslint

# Stylelintのみ  
cd layers/base && bun lint:stylelint

# バンドル分析
cd layers/base && bun analyze
```

## テスト実行
```bash
# 単体テスト実行
cd layers/base && bun test:ut

# テストウォッチモード
cd layers/base && bun test:watch

# テストUI
cd layers/base && bun test:ui

# カバレッジ付きテスト
cd layers/base && bun test:coverage
```

## セットアップ・メンテナンス
```bash
# 依存関係インストール
bun install

# Nuxt準備（型生成・layers準備）
bun nuxi prepare

# パッケージ更新
bun package-update

# Husky準備
bun prepare

# repomix実行
bun repomix
```

## macOS（Darwin）システムコマンド
```bash
# ファイル一覧
ls -la

# ディレクトリ移動
cd path/to/directory

# パターン検索（ripgrepが推奨）
rg "pattern" --type ts

# ファイル検索
find . -name "*.vue" -type f

# Git操作
git status
git add .
git commit -m "message"
git push origin main
```

## レイヤー別作業

### base layer（基盤）
```bash
cd layers/base
bun dev:local      # 開発サーバー
bun typecheck      # 型チェック
bun lint          # リント
bun test:ut       # テスト
```

### main layer（メインアプリ）
```bash
cd layers/main
bun dev:local
bun build:local
```

### showcases layer（サンプル）
```bash  
cd layers/showcases
bun dev:local
```

## 重要な作業フロー
1. 実装前: `bun nuxi prepare`で環境準備
2. 実装中: リアルタイム型チェック
3. 実装後: `bun typecheck && bun lint && bun test:ut`
4. コミット前: すべての品質チェックパス確認
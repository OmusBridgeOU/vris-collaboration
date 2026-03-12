# プロジェクト概要

## プロジェクト名
vket-boilerplate-nuxt（VKETのNuxtボイラープレート）

## プロジェクトの目的
VKETプロジェクト用のNuxt3ベースのフロントエンドボイラープレート。レイヤーベースアーキテクチャを採用し、再利用可能なコンポーネントとアーキテクチャを提供する。

## 技術スタック

### フレームワーク・ライブラリ
- **Nuxt 4.0.3** - メタフレームワーク
- **Vue 3.5.18** - UIフレームワーク（Composition API）
- **TypeScript 5.9.2** - 型付きJavaScript
- **Bun** - パッケージマネージャー・実行環境

### UI・スタイリング
- **SCSS/Sass** - CSSプリプロセッサー
- **RSCSS** - CSS命名規約（Ha/Hm/Ho/Htプレフィックス）
- **@headlessui/vue** - アクセシブルUIコンポーネント
- **vue-advanced-cropper** - 画像クロップ機能
- **@nuxtjs/google-fonts** - Webフォント

### 開発・品質管理
- **ESLint** - コードリンター
- **Stylelint** - CSSリンター
- **Vitest** - テストフレームワーク
- **@playwright/test** - E2Eテスト
- **@testing-library/vue** - コンポーネントテスト

### 状態管理・ユーティリティ
- **@vueuse/nuxt** - Vue用ユーティリティライブラリ
- **dayjs** - 日付ライブラリ
- **zod 4.0.17** - スキーマバリデーション
- **universal-cookie** - Cookie管理
- **@nuxtjs/i18n** - 国際化

### その他
- **@nuxtjs/device** - デバイス検知
- **@nuxtjs/robots** - robots.txt生成
- **@gtm-support/vue-gtm** - Google Tag Manager

## アーキテクチャ特徴

### レイヤーベース構造
- **base layer**: 基盤コンポーネント・共通機能
- **main layer**: メインアプリケーション実装
- **showcases layer**: コンポーネントショーケース・サンプル
- **open-api layer**: API関連機能

### コンポーネント命名規則（アトミックデザイン）
- **Ha**: ベース要素（HaButton, HaContainer等）
- **Hm**: インタラクティブ・分子コンポーネント（HmInputText等）
- **Ho**: 有機体・レイアウトコンポーネント（HoTheHeader等）
- **Ht**: テンプレート（HtTop等）

## 環境設定
- **local**: 開発環境
- **staging**: ステージング環境  
- **production**: 本番環境
- `VITE_OUTPUT_ENV` 環境変数で環境切り替え
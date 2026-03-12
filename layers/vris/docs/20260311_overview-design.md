# layers/vris 新規イベントページ 概要設計書

## 1. 文書の目的

本書は `2026EarlySpring` 実装をベースとして、次のイベントページを `layers/vris` 上で開発する際の構成方針、責務分離、更新ポイント、注意点を整理する。

## 2. 設計方針

### 2.1 基本方針

- 2026 実装の「1ページ完結型イベント LP」をベースにする
- 共有 shell とイベント固有実装を分離する
- 新規イベントの追加時に、既存イベントの公開状態を壊さない
- 2026 実装に残る年次固定・slug 固定・meta 固定を減らす

### 2.2 設計対象

- ページルーティング
- レイアウト
- セクションコンポーネント
- 画像・文書・i18n テキスト
- 共通ヘッダー / フッター
- metadata / GTM / structured data

## 3. 現行ベースラインの全体像

### 3.1 現行ルーティング

| ルート | 現行役割 | 主実装 |
| --- | --- | --- |
| `/` | 2026 Early Spring トップ | `app/pages/index.vue` |
| `/2025Summer` | 旧イベントトップ | `app/pages/2025Summer/index.vue` |
| `/docs/[...slug]` | Markdown 文書表示 | `app/pages/docs/[...slug].vue` |

### 3.2 現行トップページ描画フロー

現行 `/` は以下の流れで描画される。

1. `app/pages/index.vue`
2. `useNuxtContentDocs()` を生成
3. `fetchCards()` を呼ぶ
4. composable を provide
5. `definePageMeta({ layout: '2025-winter-teaser' })`
6. `Ht2026EarlyspringTop.vue` を描画

### 3.3 現行レイアウト

| レイアウト | 用途 | 備考 |
| --- | --- | --- |
| `2025WinterTeaser.vue` | 現行 `/` | 名称は旧いが 2026 でも使用中 |
| `2025WinterTop.vue` | `/2025Summer` | 旧イベント用 |
| `default.vue` | docs ページ | 通常ヘッダー / 通常フッター |

## 4. 推奨ディレクトリ構成

新規イベントページは、2026 に倣って以下の構造で追加するのが望ましい。

```text
layers/vris
├── app
│   ├── components
│   │   ├── ht
│   │   │   └── Ht<NewEvent>Top.vue
│   │   └── ho/sections/<NewEvent>/
│   │       ├── Ho<NewEvent>HeroSection.vue
│   │       ├── Ho<NewEvent>TicketSection.vue
│   │       ├── Ho<NewEvent>IntroSection.vue
│   │       ├── Ho<NewEvent>ScheduleSection.vue
│   │       ├── Ho<NewEvent>HighlightsSection.vue
│   │       ├── Ho<NewEvent>AccessSection.vue
│   │       ├── Ho<NewEvent>DocumentsSection.vue
│   │       ├── Ho<NewEvent>CorporateSection.vue
│   │       ├── Ho<NewEvent>MemberSection.vue
│   │       └── ...
│   └── pages
│       └── <new-route>/index.vue または index.vue 切替
├── content/docs/<new-event-slug>/*.md
└── public/images/<NewEvent>/*
```

## 5. コンポーネント責務設計

### 5.1 ページコンポーネント

#### `app/pages/<route>/index.vue`

責務:

- ルートエントリ
- 必要な composable 初期化
- `definePageMeta()` によるレイアウト指定
- トップコンポーネント描画

#### `app/components/ht/Ht<NewEvent>Top.vue`

責務:

- セクション順序定義
- イベント共通スタイル定義
- セクション背景演出
- ページ全体のラッパー

2026 現行では `SECTIONS_CONFIG` で以下を定義している。

- `id`
- `name`
- `description`
- `component`
- `cssClass`
- `backgroundColor`

新規イベントでもこの構成を基本踏襲する。

### 5.2 セクションコンポーネント

2026 現行でライブ採用されているセクションは以下。

| 現行コンポーネント | 現行役割 | 新規イベントでの扱い |
| --- | --- | --- |
| `Ho2026EarlyspringHeroSection.vue` | メインコピー、日時、会場、CTA | 必須で新規作成または流用改修 |
| `Ho2026EarlyspringTicketSection.vue` | 価格、購入導線 | 必須 |
| `Ho2026EarlyspringIntroSection.vue` | イベント趣旨説明 | 必須 |
| `Ho2026EarlyspringScheduleSection.vue` | 時間表 + 画像 | 必須 |
| `Ho2026EarlyspringHighlightsSection.vue` | 企画カード + カルーセル | 推奨 |
| `Ho2026EarlyspringCircleSection.vue` | 出展サークル一覧 | イベント内容次第 |
| `Ho2026EarlyspringLtSection.vue` | 登壇者一覧 | イベント内容次第 |
| `Ho2026EarlyspringAccessSection.vue` | 会場情報 + 地図 | 必須 |
| `Ho2026EarlyspringArtSection.vue` | ビジュアル紹介 | 推奨 |
| `Ho2026EarlyspringDocumentsSection.vue` | docs 導線一覧 | 必須 |
| `Ho2026EarlyspringCorporateSection.vue` | 協力企業ロゴカード | 必須 |
| `Ho2026EarlyspringMemberSection.vue` | スタッフ / デザイン / PR | 必須 |
| `Ho2026EarlyspringHistorySection.vue` | 前回実績紹介 | 推奨 |

### 5.3 未採用だが再利用可能なセクション

2026 ディレクトリには存在するが、現行トップでは `SECTIONS_CONFIG` に含まれていないセクションがある。

| コンポーネント | 用途 |
| --- | --- |
| `Ho2026EarlyspringEventInfoSection.vue` | 基本情報カード表示 |
| `Ho2026EarlyspringExhibitorsSection.vue` | 出展者向け情報 |
| `Ho2026EarlyspringLightningTalkSection.vue` | LT 制度説明 |
| `Ho2026EarlyspringFaqSection.vue` | FAQ 抜粋 |

新規イベントでは、これらを「ライブ採用するか」「docs 側へ寄せるか」を設計時に判断する。

## 6. 共通部品設計

### 6.1 `HoTheHeader.vue`

責務:

- ロゴ表示
- 言語切替
- メニュー開閉
- docs / 外部リンク導線
- ガイドバー表示

新規イベント対応時の更新ポイント:

- `navigationItems`
- `guideBarText`
- `guidePath`
- 旧イベント導線の残し方

設計上の注意:

- 現状は `2026early-spring` 固定の docs リンクを持つ
- guide bar も `/docs/2026early-spring/event-notification` 固定

### 6.2 `HoTheFooter.vue`

責務:

- 問い合わせ導線
- SNS / プレスリリース / privacy 導線
- コピーライト表示

設計上の注意:

- コピーライトが 2025 固定
- イベント年次を共通設定へ寄せる余地がある

### 6.3 `HtDocs.vue` と docs ページ

責務:

- `ContentRenderer` による Markdown レンダリング
- Markdown の見た目調整

新規イベントでも docs ルート構造は継続利用する。

## 7. コンテンツ設計

### 7.1 Nuxt Content

`content.config.ts` は以下の 2 collection を持つ。

- `docs`: `content/docs/**/*.md`
- `cards`: `content/cards/*.md`

### 7.2 新規イベントで必要な docs

2026 実装の運用を踏まえ、新規イベントでは少なくとも以下の文書群を準備する設計とする。

- `event-notification.md`
- `faq.md`
- `exhibition-guideline.md`
- `exhibition-terms.md`
- `lt-guideline.md`
- `guide-circle-exhibition.md`
- `guide-company-exhibition.md`

### 7.3 docs 表示フロー

1. `app/pages/docs/[...slug].vue` が slug を解決
2. `useNuxtContentDocs().fetchContentDocs('/docs/${slug}')`
3. state に保存
4. `HtDocs` に渡す
5. `ContentRenderer` で描画

## 8. i18n 設計

### 8.1 現行方式

- 各 SFC に `<i18n lang="yaml">` を直接埋め込む
- `useI18n()` で翻訳キーを取得する
- セクションごとに文言を内包する

### 8.2 新規イベントでも継承する点

- トップページの主要 UI は日英対応する
- セクション単位で翻訳文脈を閉じる

### 8.3 改善推奨点

- イベント共通情報を複数コンポーネントで重複定義しない
- 日英の意味差や数字差をレビュー対象に含める

現行ソースから確認できる具体例:

- `Ho2026EarlyspringAccessSection.vue` で JA は「徒歩約2分」、EN は「5-minute walk」

## 9. ビジュアル設計

### 9.1 現行 2026 の特徴

- 背景に固定キービジュアル
- 各セクションにガラス風背景
- 淡いブルー / ピンク / 白のグラデーション
- 丸みの強いカード
- 画像カルーセル + ダイアログ拡大

### 9.2 新規イベントでの継承方針

- UI パターンは継承する
- 配色と画像はイベント世界観に応じて差し替える
- 画像フォルダはイベント単位で切る

## 10. 外部連携設計

### 10.1 GTM

`app/plugins/gtm.client.ts`

- `runtimeConfig.public.gtmId` を使用して初期化

### 10.2 structured data

`app/plugins/structured-data.client.ts`

現状:

- Event / Website / Organization を head に注入
- ただし内容は 2025 Summer 固定

新規イベント設計:

- イベント名
- 開催日時
- 会場
- URL
- OGP 画像

を新イベントに差し替える。

### 10.3 外部リンク群

現行で利用している外部リンク種別:

- LivePocket
- Google Forms
- X
- PressWalker
- Google Maps
- 協力企業サイト
- 会場公式サイト

新規イベントでは、リンク種別は継承しつつ URL を差し替える。

## 11. metadata 設計

### 11.1 現行実装

`nuxt.config.ts` でグローバル head を設定している。

主な項目:

- title
- description
- robots
- og:title
- og:description
- og:image
- twitter:* 系

### 11.2 新規イベント設計

最低でも以下を更新対象とする。

- title
- description
- keywords
- og image
- twitter card
- site name
- `runtimeConfig.public.url`

## 12. 技術的負債と新規開発時の対処方針

### 12.1 現行負債

- レイアウト名が実用途と一致していない
- ヘッダー / フッター / meta / structured data が年次固定
- 2026 用 page でも 2025 由来コードが残る
- `useSectionState.ts` が 2026 に未対応
- `cards` 取得が未活用
- 画像参照の不整合がある
- 日英文言の意味差がある

### 12.2 新規開発時の対処

- 新規イベント追加前に「イベント固有値」を洗い出す
- ハードコードを最小限にする
- 旧イベント用導線を残すなら、shared component の責務を明確化する
- 画像存在確認とリンク確認を実施する

## 13. 実装更新ポイント一覧

新規イベントページ追加時に必ず確認するファイルは以下。

| ファイル / 位置 | 更新内容 |
| --- | --- |
| `app/pages/index.vue` または新規 route | どのイベントを公開するか |
| `app/components/ht/Ht<NewEvent>Top.vue` | セクション順序、背景、共通スタイル |
| `app/components/ho/sections/<NewEvent>/*.vue` | イベント固有テキスト、画像、リンク |
| `app/components/ho/HoTheHeader.vue` | docs slug、guide bar、導線 |
| `app/components/ho/HoTheFooter.vue` | コピーライト、必要に応じて導線 |
| `content/docs/<new-event-slug>/*.md` | 文書本文 |
| `public/images/<NewEvent>/*` | アセット配置 |
| `nuxt.config.ts` | title / meta / og |
| `config/runtimeConfig.ts` | URL、環境値 |
| `app/plugins/structured-data.client.ts` | 構造化データ |

## 14. 受入観点

- 新規イベントのページ構成が 2026 ベースで一貫していること
- docs、header、footer、guide bar、external links が新イベント向けに更新されていること
- 共有実装に旧イベント文言が残っていないこと
- 画像パス切れと文言不整合が修正されていること
- 旧イベントページが必要なら継続閲覧できること

## 15. 作成後セルフレビュー結果

本書は以下の観点で自己点検した。

- 現行ライブ採用セクションと未採用補助セクションを混同していない
- 2026 docs 実在ファイルに基づいて文書群を列挙している
- 新規イベント開発時に更新が必要な shared file を漏らしていない
- 実装確認で判明した不整合
  - `utage.jpeg` 参照ミス
  - `Access` の日英差
  - `structured data` の 2025 固定
  - `Footer` の 2025 固定
  
  を設計上の注意として明記している

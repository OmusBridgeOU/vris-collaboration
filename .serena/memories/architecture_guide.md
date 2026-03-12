# アーキテクチャガイド

## レイヤーベースアーキテクチャ

### 1. レイヤー構造と責務

#### base layer (`layers/base/`)
- **役割**: 基盤となるコンポーネント、スタイル、ユーティリティ
- **特徴**: 他のlayerから継承される基盤
- **内容**: 
  - 基本コンポーネント（Ha, Hm, Ho, Ht）
  - 共通スタイル（SCSS変数、mixin）
  - ユーティリティ関数
  - Zodスキーマ定義
  - 基本composables

#### main layer (`layers/main/`)
- **役割**: 実際のアプリケーション実装
- **特徴**: base layerを継承してビジネスロジック実装
- **内容**:
  - ページコンポーネント
  - ビジネスロジック固有のcomposables
  - API通信ロジック
  - アプリケーション固有の状態管理

#### showcases layer (`layers/showcases/`)
- **役割**: コンポーネントのサンプル・デモ
- **特徴**: コンポーネントの使用例とドキュメント
- **内容**:
  - コンポーネントショーケース
  - 使用例・サンプルコード
  - スタイルガイド
  - デザインシステムドキュメント

#### open-api layer (`layers/open-api/`)
- **役割**: API関連機能
- **特徴**: API通信とデータ処理に特化
- **内容**:
  - API通信ロジック
  - リポジトリパターン実装
  - データモデル定義

### 2. モノレポ構造の利点
- 各レイヤーは独立して動作
- base layerを継承して機能拡張
- レイヤー間の責務が明確
- 再利用性とメンテナンス性向上

## コンポーネント設計原則（アトミックデザイン）

### Ha (Atoms) - ベース要素
- **役割**: 最小単位のUI要素
- **例**: HaButton, HaInput, HaContainer, HaIcon
- **特徴**: 
  - 他のコンポーネントの基盤
  - propsによる設定可能
  - 再利用性を重視

### Hm (Molecules) - 分子コンポーネント  
- **役割**: インタラクティブ・複雑なコンポーネント
- **例**: HmInputText, HmFormField, HmCard
- **特徴**:
  - 複数のAtomを組み合わせ
  - ビジネスロジック含有可能
  - 状態管理を持つ

### Ho (Organisms) - 有機体コンポーネント
- **役割**: レイアウト・大きな機能ブロック
- **例**: HoTheHeader, HoTheFooter, HoNavigation
- **特徴**:
  - 複数のMoleculesを組み合わせ
  - ページレベルの機能提供
  - レスポンシブ対応

### Ht (Templates) - テンプレート
- **役割**: ページテンプレート・レイアウト構造
- **例**: HtTop, HtDashboard, HtUserProfile
- **特徴**:
  - ページ全体の構造定義
  - 複数のOrganismsを組み合わせ
  - SEOとメタ情報管理

## 設計パターンとベストプラクティス

### 1. コンポーネント設計
```typescript
// 最も具体的なコンポーネントを使用
// 悪い例：汎用的すぎる
<HaButton>クリック</HaButton>

// 良い例：具体的な用途
<HmSubmitButton :loading="isSubmitting">送信</HmSubmitButton>
```

### 2. Props設計
```typescript
// 設定可能性を重視
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
)
```

### 3. Slot活用
```vue
<template>
  <HmCard>
    <template #header>
      <slot name="header" />
    </template>
    <template #content>  
      <slot />
    </template>
    <template #footer>
      <slot name="footer" />  
    </template>
  </HmCard>
</template>
```

## API通信アーキテクチャ

### 1. リポジトリパターン
```typescript
// repositories/todoRepository.ts
export default {
  get: {
    async getExample() {
      const response = await defaultApi('get', `${prefix}/example`)
      return requireValueOf(getExampleResponseSchema, response)
    },
  } as const,
}
```

### 2. 自動ケース変換
- リクエスト: camelCase → snake_case  
- レスポンス: snake_case → camelCase
- Zodスキーマでレスポンス検証

### 3. エラーハンドリング
```typescript
// エラーの一貫した処理
try {
  const data = await todoRepository.get.getExample()
  return data
} catch (error) {
  raiseError('データ取得に失敗しました', error)
}
```

## 状態管理戦略

### 1. 状態の分類と管理手法
- **ローカル状態**: Composition API（ref, reactive）
- **グローバル状態**: `useState`（Nuxt）
- **永続化状態**: Cookie, LocalStorage
- **サーバー状態**: API通信 + Zodスキーマ

### 2. Composables設計
```typescript
// useAuth.ts
export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null)
  
  const login = async (credentials: LoginCredentials) => {
    const response = await authRepository.post.login(credentials)
    user.value = response.user
    return response
  }
  
  return {
    user: readonly(user),
    login,
  }
}
```

## パフォーマンス最適化

### 1. 動的インポート活用
```typescript
// 重いコンポーネントの遅延ロード
const HeavyComponent = defineAsyncComponent(() => 
  import('~/components/ho/HoHeavyComponent.vue')
)
```

### 2. バンドルサイズ監視
```bash
# バンドル分析
bun analyze
```

### 3. 画像最適化
- WebP形式の使用
- レスポンシブ画像
- 遅延読み込み

## セキュリティ考慮事項

### 1. 秘密情報管理
- 秘密情報のハードコーディング禁止
- 環境変数での管理
- runtimeConfigでの型安全な管理

### 2. XSS対策
- v-htmlの慎重な使用
- ユーザー入力のサニタイズ
- CSP（Content Security Policy）設定

### 3. CSRF対策
- SameSite Cookie設定
- CSRFトークンの実装
# コーディング規約・スタイルガイド

## TypeScript規約

### 型定義
- `any`型の使用は厳禁
- `as unknown`や`as 任意の型`の使用は厳禁  
- interfaceよりtype aliasを優先
- 型定義にはZodスキーマを使用：`type Todo = z.infer<typeof todoSchema>`
- is型ガードの使用は最低限に抑制

### strict設定
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

## Vue/Nuxtコンポーネント規約

### コンポーネント構造テンプレート
```vue
<template>
  <HaBaseButton
    :class="['hm-button', `-${color}`, `-${size}`]"
    @click="onClick"
  >
    <slot />
  </HaBaseButton>
</template>

<script lang="ts">
export default defineComponent({
  name: 'HmButton',
})
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: ButtonType
    disabled?: boolean
    size?: 'md' | 'sm'
    color?: 'primary' | 'secondary'
  }>(),
  {
    type: 'button',
    disabled: false,
    size: 'md',
    color: 'primary',
  },
)

const emit = defineEmits<{
  click: [MouseEvent]
}>()
</script>
```

### Props定義ルール
- `withDefaults`を使用してデフォルト値設定必須
- 型定義は明示的に行う
- オプショナルプロパティには`?`を使用
- Zodスキーマベースの型定義を推奨

### 国際化（i18n）規約
```vue
<i18n lang="yaml">
ja:
  title: タイトル
  description: 説明文
  button:
    submit: 送信
    cancel: キャンセル
en:
  title: Title
  description: Description
  button:
    submit: Submit
    cancel: Cancel
</i18n>

<template>
  <div>
    <h1>{{ i18n.t('title') }}</h1>
    <p>{{ i18n.t('description') }}</p>
    <button>{{ i18n.t('button.submit') }}</button>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()
</script>
```

## SCSS/CSS規約

### RSCSS命名規則
```scss
.hm-button {
  // ベーススタイル
  
  &.-md { /* サイズ修飾子 */ }
  &.-primary { /* カラー修飾子 */ }
  &.-disabled { /* 状態修飾子 */ }
  
  &.-primary.-outline { /* 複合修飾子 */ }
}
```

### レスポンシブデザイン
```scss
// モバイルファースト
@include m.sp {
  // モバイルスタイル
}

@include m.pc {
  // デスクトップスタイル
}
```

### 変数命名
```scss
// $役割-要素-状態-色
$primary-button-default-color: $orange;
$primary-button-active-color: $yellow;
```

## ファイル命名規約

### 命名パターン
- **コンポーネント**: PascalCase + プレフィックス
  - `HaButton.vue`, `HmInputText.vue`
- **コンポーザブル**: camelCase + `use`プレフィックス  
  - `useValidationRules.ts`, `useDefaultApi.ts`
- **ユーティリティ**: kebab-case
  - `default-api.ts`, `date-control.ts`
- **モデル**: camelCase
  - `todo.ts`, `vketSso.ts`
- **テスト**: 同名 + `.spec.ts`
  - `HmButton.spec.ts`

### ディレクトリ構造
```
/app/
  /components/
    /ha/  # ベース要素
    /hm/  # 分子コンポーネント
    /ho/  # 有機体コンポーネント
    /ht/  # テンプレート
  /composables/
  /utils/
  /models/
  /repositories/
```

## インポート/エクスポート規約

### パスエイリアス使用
```typescript
import { todoSchema } from '#base/app/models/todo'
import defaultApi from '#base/app/utils/default-api'
```

### エクスポートパターン
```typescript
// 型は名前付きエクスポート
export type ButtonType = 'button' | 'submit' | 'reset'

// コンポーネントはデフォルトエクスポート
export default defineComponent({
  name: 'ComponentName',
})

// オブジェクトは as const
export default {
  get: { /* methods */ } as const,
}
```

## Zod使用規約

### スキーマ定義
```typescript
export const todoSchema = z.object({
  userId: integral, // 柔軟な整数型
  id: integral,
  title: z.string(),
  completed: z.boolean(),
})

// レスポンススキーマ
export const getExampleResponseSchema = z.object({
  status: statusSchema,
  data: z.object({
    todos: z.array(todoSchema),
  }),
})
```

### カスタムユーティリティ
```typescript
// 型ガード
isValueOf(schema, value)
ensureValueOf(schema, value)  
requireValueOf(schema, value)

// 柔軟な整数型
const integral = z.number().or(z.string())
```

## コーディング方針
1. 既存のアーキテクチャに従うこと
2. コード実装前に方針提案・承認を取ること
3. SCSS変数は既存のvariables.scssを使用
4. 実装後は必ず品質チェック実行（typecheck/lint/test）
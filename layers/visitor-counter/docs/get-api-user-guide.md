# Visitor Counter API GET利用者マニュアル

## 対象者

Webサイトや表示システムで会場の最新混雑度を取得する担当者向けです。GET APIは公開読み取り専用で、APIキーは不要です。

## 接続情報

| 項目 | 値 |
| --- | --- |
| Method | `GET` |
| URL | `https://vris-26autumn-visitor-counter-api.skmt3p.workers.dev/api/v1/crowd-status` |
| 認証 | 不要 |

## curlで確認する

```bash
curl --fail-with-body \
  'https://vris-26autumn-visitor-counter-api.skmt3p.workers.dev/api/v1/crowd-status'
```

レスポンス例:

```json
{
  "value1": 2,
  "value2": 1,
  "updated_at": "2026-08-20 10:00:00"
}
```

| フィールド | 型 | 意味 |
| --- | --- | --- |
| `value1` | number | `main`会場の最新混雑度。未登録時は`-1` |
| `value2` | number | `dtc`会場の最新混雑度。未登録時は`-1` |
| `updated_at` | string \| null | 2会場の最新更新のうち新しい時刻。未登録時は`null` |

通常の混雑度は`1`、`2`、`3`です。各数値をどの文言・色・アイコンで表示するかは、会場運用責任者が定めた対応表に従ってください。`-1`や`null`を「空いている」や`0`として扱わず、「情報なし」などの未取得状態として表示します。

`updated_at`はD1が記録したUTCの`YYYY-MM-DD HH:mm:ss`形式です。JST表示が必要な場合は、UTCとして解釈して表示側で変換してください。

## JavaScriptで取得する

```javascript
const endpoint =
  'https://vris-26autumn-visitor-counter-api.skmt3p.workers.dev/api/v1/crowd-status'

const response = await fetch(endpoint)
if (!response.ok) {
  throw new Error(`Visitor Counter API: HTTP ${response.status}`)
}

const status = await response.json()
console.log(status.value1, status.value2, status.updated_at)
```

TypeScriptで扱う場合のレスポンス型:

```typescript
type CrowdStatus = {
  value1: number
  value2: number
  updated_at: string | null
}
```

外部入力として扱うため、本番実装ではJSONの実行時バリデーションも推奨します。

## ブラウザから利用する場合

CORSで許可されているOriginは次の2つです。

- `https://vris.jp`
- `https://archived.vris.jp`

別Originのブラウザから直接取得する場合は、事前にCloudflare管理担当者へ許可Originの追加とデプロイを依頼してください。サーバー間通信やcurlはブラウザのCORS制約を受けません。

## ポーリングと障害時の扱い

- 初期値として30〜60秒間隔を推奨します。画面描画ごとや秒単位で取得しないでください。
- HTTPエラーやネットワークエラー時は、最後に正常取得した値を「最終更新時刻」付きで保持するか、「取得できません」と表示してください。
- 障害時に値を`0`へ置き換えたり、空いている状態として表示したりしないでください。
- `400`台はURL・メソッドなど実装を確認し、`500`台は間隔を空けて限定回数だけ再試行してください。

GET利用者にPOST用APIキーは不要です。また、本番に`DELETE` APIはありません。表示側から書き込みや削除を行わないでください。

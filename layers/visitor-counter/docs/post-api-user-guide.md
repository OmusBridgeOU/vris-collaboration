# Visitor Counter API POST利用者マニュアル

## 対象者

会場の混雑度をオンプレミス機器や連携サーバーから送信する担当者向けです。
閲覧側の実装担当者は[GET利用者マニュアル](./get-api-user-guide.md)を参照してください。

## 接続情報

| 項目 | 値 |
| --- | --- |
| Method | `POST` |
| URL | `https://vris-26autumn-visitor-counter-api.skmt3p.workers.dev/api/v1/venue-status-write` |
| Content-Type | `application/json` |
| 認証ヘッダー | `VRIS-visitor-counter-APIKEY: <発行されたAPIキー>` |

APIキーはCloudflare管理担当者から安全な経路で受け取ってください。ソースコード、Git、チャット、Issue、通常ログへ記録しないでください。漏えいが疑われる場合は、送信を止めてCloudflare管理担当者へローテーションを依頼します。

## リクエスト

```json
{
  "venue": "main",
  "crowd_level": 2
}
```

| フィールド | 型 | 許可値 | 意味 |
| --- | --- | --- | --- |
| `venue` | string | `main`, `dtc` | 更新する会場 |
| `crowd_level` | number | `1`, `2`, `3` | 会場側で判定した混雑度 |

未定義のフィールドを追加したリクエストは受け付けません。混雑度の業務上の意味（例: 空き・通常・混雑）は、会場運用責任者が定めた対応表を正本としてください。

## curlで送信する

APIキーをコマンド履歴へ残さないため、プロンプトから一時的な環境変数へ読み込みます。

```bash
read -rs 'VRIS_VISITOR_COUNTER_API_KEY?API key: '
echo

curl --fail-with-body \
  -X POST \
  'https://vris-26autumn-visitor-counter-api.skmt3p.workers.dev/api/v1/venue-status-write' \
  -H 'Content-Type: application/json' \
  -H "VRIS-visitor-counter-APIKEY: ${VRIS_VISITOR_COUNTER_API_KEY}" \
  --data '{"venue":"main","crowd_level":2}'

unset VRIS_VISITOR_COUNTER_API_KEY
```

成功時はHTTP `200`と次のJSONが返ります。

```json
{"status":"ok"}
```

## 送信後の確認

公開GET APIで最新値を確認できます。`main`は`value1`、`dtc`は`value2`に対応します。

```bash
curl --fail-with-body \
  'https://vris-26autumn-visitor-counter-api.skmt3p.workers.dev/api/v1/crowd-status'
```

## エラー対応

| HTTP | 主な原因 | 対応 |
| --- | --- | --- |
| `200` | 登録成功 | GETで必要な会場の最新値を確認する |
| `400` | JSON不正、会場名・混雑度・フィールドが不正 | 内容を修正してから再送する |
| `401` | APIキーがない、誤っている、失効している | ヘッダー名を確認し、解決しなければ管理担当者へ連絡する |
| `404` | URLまたはパスが違う | 本書の本番URLと完全一致するか確認する |
| `500`台 | APIまたはD1の一時障害 | 間隔を空けて限定回数だけ再試行し、継続時は管理担当者へ連絡する |

ネットワーク切断やタイムアウトでは、サーバー側で登録済みでも応答だけ受け取れていない可能性があります。このAPIには冪等性キーがなく、再送すると同じ内容が履歴へ複数回登録される場合があります。再試行は指数バックオフなどで限定回数にし、送信時刻・会場・結果をAPIキー抜きで記録してください。`400`と`401`は内容を直さず自動再試行しないでください。

## 運用上の禁止事項

- APIキーをフロントエンドや公開リポジトリへ埋め込まない
- GET利用者へAPIキーを渡さない
- 混雑度以外の個人情報を送信しない
- 履歴削除をAPIで試みない（本番に`DELETE` APIはありません）

誤送信やデータ修正が必要な場合は、自分で削除せずCloudflare/D1管理担当者へ対象会場・送信時刻・送信値を連絡してください。

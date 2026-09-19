# 提供スタンプ

このディレクトリへPNG画像を追加すると、ビルド時にスタンプ一覧へ自動追加されます。

同じファイル名をキーとして `credits.json` に表示名、制作者、権利管理用のライセンス、任意のSNS・Web URLを記録してください。画面には画像、表示名、制作者、SNS・Web URLを表示し、ライセンスは表示しません。

```json
{
  "sample.png": {
    "label": "サンプル",
    "creator": "制作者名",
    "license": "利用許諾の名称",
    "source_url": "https://example.com/creator"
  }
}
```

ファイル名は重複しない `snake_case` を使用し、公開・印刷利用の許諾を確認した素材だけを追加してください。

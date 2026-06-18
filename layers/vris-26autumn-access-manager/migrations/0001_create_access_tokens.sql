CREATE TABLE IF NOT EXISTS access_tokens (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_access_tokens_created_at
  ON access_tokens (created_at);

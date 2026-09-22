CREATE TABLE IF NOT EXISTS order_sequences (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  next_value INTEGER NOT NULL
);

INSERT OR IGNORE INTO order_sequences (id, next_value) VALUES (1, 1);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

INSERT OR IGNORE INTO roles (name) VALUES
  ('reception'),
  ('production'),
  ('delivery'),
  ('admin');

CREATE TABLE IF NOT EXISTS user_roles (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS login_attempts (
  username TEXT PRIMARY KEY,
  failure_count INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS order_batches (
  id TEXT PRIMARY KEY,
  reception_number TEXT NOT NULL UNIQUE,
  public_token_hash TEXT NOT NULL UNIQUE,
  client_request_id_hash TEXT UNIQUE,
  status TEXT NOT NULL,
  total_item_types INTEGER NOT NULL,
  total_quantity INTEGER NOT NULL,
  terms_version TEXT NOT NULL,
  ownership_confirmed INTEGER NOT NULL,
  portrait_confirmed INTEGER NOT NULL,
  copyright_confirmed INTEGER NOT NULL,
  buyer_confirmed_at TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  accepted_at TEXT,
  production_started_at TEXT,
  ready_at TEXT,
  delivered_at TEXT,
  rejected_at TEXT,
  cancelled_at TEXT,
  accepted_by TEXT,
  production_by TEXT,
  delivered_by TEXT,
  rejection_reason TEXT,
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  batch_id TEXT NOT NULL REFERENCES order_batches(id) ON DELETE CASCADE,
  item_code TEXT NOT NULL UNIQUE,
  local_project_code TEXT NOT NULL,
  status TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  print_object_key TEXT NOT NULL,
  thumbnail_object_key TEXT NOT NULL,
  width_px INTEGER NOT NULL,
  height_px INTEGER NOT NULL,
  file_size_bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  production_started_at TEXT,
  ready_at TEXT,
  delivered_at TEXT,
  rejected_at TEXT,
  rejection_reason TEXT,
  reprint_count INTEGER NOT NULL DEFAULT 0,
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  old_value TEXT,
  new_value TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_order_batches_created_at ON order_batches(created_at);
CREATE INDEX IF NOT EXISTS idx_order_batches_status ON order_batches(status);
CREATE INDEX IF NOT EXISTS idx_order_batches_expires_at ON order_batches(expires_at);
CREATE INDEX IF NOT EXISTS idx_order_items_batch_id ON order_items(batch_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

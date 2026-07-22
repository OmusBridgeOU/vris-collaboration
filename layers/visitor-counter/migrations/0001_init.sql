CREATE TABLE IF NOT EXISTS crowd_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  venue TEXT NOT NULL CHECK (venue IN ('main', 'dtc')),
  crowd_level INTEGER NOT NULL CHECK (crowd_level IN (1, 2, 3)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_crowd_status_history_venue_created_at
  ON crowd_status_history (venue, created_at DESC);

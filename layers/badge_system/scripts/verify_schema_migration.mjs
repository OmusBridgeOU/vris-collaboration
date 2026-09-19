// Manual, opt-in test. Never connects to Cloudflare or opens a database file.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

if (process.argv[2] !== "--allow-disposable-database") {
  throw new Error(
    "Explicit approval is required before testing migrations. Pass --allow-disposable-database after approval.",
  );
}
const { DatabaseSync } = await import("node:sqlite");
const db = new DatabaseSync(":memory:");
const migration = (name) =>
  readFileSync(
    new URL(`../worker/migrations/${name}`, import.meta.url),
    "utf8",
  );
try {
  db.exec("PRAGMA foreign_keys = ON");
  db.exec(migration("0001_create_order_batches.sql"));
  const batch_columns =
    "id,reception_number,public_token_hash,client_request_id_hash,status,total_item_types,total_quantity,terms_version,ownership_confirmed,portrait_confirmed,copyright_confirmed,created_at,deleted_at";
  const item_columns =
    "id,batch_id,item_code,local_project_code,status,quantity,print_object_key,thumbnail_object_key,width_px,height_px,file_size_bytes,created_at,deleted_at";
  for (let i = 0; i < 3; i++) {
    const state = ["UPLOADED", "DELIVERED", "EXPIRED"][i];
    const deleted = i === 2 ? "2025-01-01" : null;
    db.prepare(
      `INSERT INTO order_batches (${batch_columns},expires_at,accepted_by,rejection_reason) VALUES (${Array(16).fill("?").join(",")})`,
    ).run(
      `batch-${i}`,
      `4831${i}`,
      `hash-${i}`,
      `request-${i}`,
      state,
      1,
      i + 1,
      "1.1",
      1,
      1,
      1,
      "2025-01-01",
      deleted,
      "2025-01-02",
      "retired-staff",
      "retired-reason",
    );
    db.prepare(
      `INSERT INTO order_items (${item_columns},reprint_count) VALUES (${Array(14).fill("?").join(",")})`,
    ).run(
      `item-${i}`,
      `batch-${i}`,
      `4831${i}-01`,
      "001",
      state,
      i + 1,
      `private/${i}/print.png`,
      `private/${i}/thumbnail.jpg`,
      1200,
      1200,
      1234,
      "2025-01-01",
      deleted,
      2,
    );
  }
  db.exec(
    "INSERT INTO users VALUES ('retired-staff','fixture','fixture-hash','fixture',1,'2025-01-01','2025-01-01'); INSERT INTO user_roles SELECT 'retired-staff',id FROM roles LIMIT 1; INSERT INTO login_attempts VALUES ('fixture',2,NULL,'2025-01-01'); INSERT INTO audit_logs (action,entity_type,created_at) VALUES ('fixture','fixture','2025-01-01');",
  );
  const read_batches = () =>
    db.prepare(`SELECT ${batch_columns} FROM order_batches ORDER BY id`).all();
  const read_items = () =>
    db.prepare(`SELECT ${item_columns} FROM order_items ORDER BY id`).all();
  const before = { batches: read_batches(), items: read_items() };
  db.exec("BEGIN");
  db.exec(migration("0002_remove_unused_workflows.sql"));
  db.exec("COMMIT");
  assert.deepEqual({ batches: read_batches(), items: read_items() }, before);
  assert.deepEqual(db.prepare("PRAGMA foreign_key_check").all(), []);
  for (const [table, columns] of [
    ["order_batches", batch_columns],
    ["order_items", item_columns],
  ]) {
    assert.deepEqual(
      db
        .prepare(`PRAGMA table_info(${table})`)
        .all()
        .map((c) => c.name)
        .sort(),
      columns.split(",").sort(),
    );
  }
  for (const table of [
    "users",
    "roles",
    "user_roles",
    "login_attempts",
    "order_sequences",
    "audit_logs",
  ]) {
    assert.equal(
      db
        .prepare(
          "SELECT count(*) AS n FROM sqlite_master WHERE type='table' AND name=?",
        )
        .get(table).n,
      0,
    );
  }
  // Verify the exact current repository INSERTs against the resulting schema.
  const repository = readFileSync(
    new URL("../worker/src/repositories/order_repository.ts", import.meta.url),
    "utf8",
  );
  for (const table of ["order_batches", "order_items"]) {
    const query = repository.match(
      new RegExp("`(INSERT INTO " + table + "[\\s\\S]*?)`"),
    )?.[1];
    assert.ok(query);
    const row = table === "order_batches" ? before.batches[0] : before.items[0];
    const columns = query
      .slice(query.indexOf("(") + 1, query.indexOf(")"))
      .split(",")
      .map((c) => c.trim());
    const values = columns.map(
      (c) =>
        ({
          id: table === "order_batches" ? "new-batch" : "new-item",
          batch_id: "new-batch",
          reception_number: "99999",
          item_code: "99999-01",
          public_token_hash: "new-hash",
          client_request_id_hash: "new-request",
        })[c] ?? row[c],
    );
    db.prepare(query.replace(/\?\d+/g, "?")).run(...values);
  }
  assert.equal(read_batches().length, 4);
  assert.equal(read_items().length, 4);
  assert.equal(
    db.prepare("PRAGMA integrity_check").get().integrity_check,
    "ok",
  );
  console.log(
    "PASS: retained order values, legacy deletion markers, foreign keys, removed schema and current repository inserts; disposable memory DB only.",
  );
} finally {
  db.close();
}

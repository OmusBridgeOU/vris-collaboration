import type {
  D1Database,
  D1PreparedStatement,
  D1Result,
} from "../cloudflare_types";
import type {
  BatchWithItems,
  OrderBatchRow,
  OrderItemRow,
} from "./order_repository";

export class StaffOrderRepository {
  constructor(private readonly db: D1Database) {}

  async get_by_id(batch_id: string): Promise<BatchWithItems | null> {
    return this.get_batch("id", batch_id);
  }

  async get_by_reception_number(
    reception_number: string,
  ): Promise<BatchWithItems | null> {
    return this.get_batch("reception_number", reception_number);
  }

  async get_by_public_token_hash(
    token_hash: string,
  ): Promise<BatchWithItems | null> {
    return this.get_batch("public_token_hash", token_hash);
  }

  async list(status: string | null): Promise<BatchWithItems[]> {
    const statement = status
      ? this.db
          .prepare(
            "SELECT * FROM order_batches WHERE status = ?1 ORDER BY created_at DESC",
          )
          .bind(status)
      : this.db.prepare("SELECT * FROM order_batches ORDER BY created_at DESC");
    const result = await statement.all<OrderBatchRow>();
    return Promise.all(
      (result.results ?? []).map(async (batch) => ({
        batch,
        items: await this.list_items(batch.id),
      })),
    );
  }

  async get_item(item_id: string): Promise<OrderItemRow | null> {
    return this.db
      .prepare("SELECT * FROM order_items WHERE id = ?1 LIMIT 1")
      .bind(item_id)
      .first<OrderItemRow>();
  }

  async accept(
    batch: OrderBatchRow,
    actor_id: string,
    timestamp: string,
  ): Promise<boolean> {
    return this.run_batch_transition(
      this.db
        .prepare(
          `UPDATE order_batches SET
             status = 'ACCEPTED', buyer_confirmed_at = ?2,
             accepted_at = ?2, accepted_by = ?3
           WHERE id = ?1 AND status = 'UPLOADED'`,
        )
        .bind(batch.id, timestamp, actor_id),
      this.db
        .prepare(
          `UPDATE order_items SET status = 'ACCEPTED'
           WHERE batch_id = ?1 AND status = 'UPLOADED'
             AND EXISTS (
               SELECT 1 FROM order_batches
               WHERE id = ?1 AND status = 'ACCEPTED'
                 AND accepted_at = ?2 AND accepted_by = ?3
             )`,
        )
        .bind(batch.id, timestamp, actor_id),
      this.audit_statement(
        actor_id,
        "staff.order_batch.accepted",
        "order_batch",
        batch.id,
        batch.status,
        "ACCEPTED",
        timestamp,
        "accepted_at",
      ),
    );
  }

  async reject(
    batch: OrderBatchRow,
    actor_id: string,
    reason: string,
    timestamp: string,
  ): Promise<boolean> {
    return this.run_batch_transition(
      this.db
        .prepare(
          `UPDATE order_batches SET
             status = 'REJECTED', rejected_at = ?2, rejection_reason = ?3
           WHERE id = ?1 AND status IN ('UPLOADED', 'ACCEPTED')`,
        )
        .bind(batch.id, timestamp, reason),
      this.db
        .prepare(
          `UPDATE order_items SET
             status = 'REJECTED', rejected_at = ?2, rejection_reason = ?3
           WHERE batch_id = ?1 AND status IN ('UPLOADED', 'ACCEPTED')
             AND EXISTS (
               SELECT 1 FROM order_batches
               WHERE id = ?1 AND status = 'REJECTED' AND rejected_at = ?2
             )`,
        )
        .bind(batch.id, timestamp, reason),
      this.audit_statement(
        actor_id,
        "staff.order_batch.rejected",
        "order_batch",
        batch.id,
        batch.status,
        "REJECTED",
        timestamp,
        "rejected_at",
        { reason },
      ),
    );
  }

  async start_production(
    batch: OrderBatchRow,
    actor_id: string,
    timestamp: string,
  ): Promise<boolean> {
    return this.run_batch_transition(
      this.db
        .prepare(
          `UPDATE order_batches SET
             status = 'IN_PRODUCTION', production_started_at = ?2, production_by = ?3
           WHERE id = ?1 AND status = 'ACCEPTED'`,
        )
        .bind(batch.id, timestamp, actor_id),
      this.db
        .prepare(
          `UPDATE order_items SET status = 'IN_PRODUCTION', production_started_at = ?2
           WHERE batch_id = ?1 AND status = 'ACCEPTED'
             AND EXISTS (
               SELECT 1 FROM order_batches
               WHERE id = ?1 AND status = 'IN_PRODUCTION'
                 AND production_started_at = ?2 AND production_by = ?3
             )`,
        )
        .bind(batch.id, timestamp, actor_id),
      this.audit_statement(
        actor_id,
        "staff.order_batch.production_started",
        "order_batch",
        batch.id,
        batch.status,
        "IN_PRODUCTION",
        timestamp,
        "production_started_at",
      ),
    );
  }

  async mark_ready(
    batch: OrderBatchRow,
    actor_id: string,
    timestamp: string,
  ): Promise<boolean> {
    return this.run_batch_transition(
      this.db
        .prepare(
          `UPDATE order_batches SET status = 'READY', ready_at = ?2
           WHERE id = ?1 AND status = 'IN_PRODUCTION'`,
        )
        .bind(batch.id, timestamp),
      this.db
        .prepare(
          `UPDATE order_items SET status = 'READY', ready_at = ?2
           WHERE batch_id = ?1 AND status = 'IN_PRODUCTION'
             AND EXISTS (
               SELECT 1 FROM order_batches
               WHERE id = ?1 AND status = 'READY' AND ready_at = ?2
             )`,
        )
        .bind(batch.id, timestamp),
      this.audit_statement(
        actor_id,
        "staff.order_batch.ready",
        "order_batch",
        batch.id,
        batch.status,
        "READY",
        timestamp,
        "ready_at",
      ),
    );
  }

  async deliver(
    batch: OrderBatchRow,
    actor_id: string,
    timestamp: string,
  ): Promise<boolean> {
    return this.run_batch_transition(
      this.db
        .prepare(
          `UPDATE order_batches SET
             status = 'DELIVERED', delivered_at = ?2, delivered_by = ?3
           WHERE id = ?1 AND status = 'READY'`,
        )
        .bind(batch.id, timestamp, actor_id),
      this.db
        .prepare(
          `UPDATE order_items SET status = 'DELIVERED', delivered_at = ?2
           WHERE batch_id = ?1 AND status = 'READY'
             AND EXISTS (
               SELECT 1 FROM order_batches
               WHERE id = ?1 AND status = 'DELIVERED'
                 AND delivered_at = ?2 AND delivered_by = ?3
             )`,
        )
        .bind(batch.id, timestamp, actor_id),
      this.audit_statement(
        actor_id,
        "staff.order_batch.delivered",
        "order_batch",
        batch.id,
        batch.status,
        "DELIVERED",
        timestamp,
        "delivered_at",
      ),
    );
  }

  async reprint(
    item: OrderItemRow,
    batch: OrderBatchRow,
    actor_id: string,
    reason: string,
    timestamp: string,
  ): Promise<boolean> {
    const results = await this.db.batch([
      this.db
        .prepare(
          `UPDATE order_batches SET
             status = 'IN_PRODUCTION', production_started_at = ?2,
             ready_at = NULL, production_by = ?3
           WHERE id = ?1 AND status = 'READY'
             AND EXISTS (
               SELECT 1 FROM order_items
               WHERE id = ?4 AND batch_id = ?1 AND status = 'READY'
             )`,
        )
        .bind(batch.id, timestamp, actor_id, item.id),
      this.db
        .prepare(
          `UPDATE order_items SET
             status = 'IN_PRODUCTION', production_started_at = ?2,
             ready_at = NULL, delivered_at = NULL, reprint_count = reprint_count + 1
           WHERE id = ?1 AND batch_id = ?3 AND status = 'READY'
             AND EXISTS (
               SELECT 1 FROM order_batches
               WHERE id = ?3 AND status = 'IN_PRODUCTION'
                 AND production_started_at = ?2 AND production_by = ?4
             )`,
        )
        .bind(item.id, timestamp, batch.id, actor_id),
      this.db
        .prepare(
          `INSERT INTO audit_logs (
             user_id, action, entity_type, entity_id, old_value, new_value, created_at
           )
           SELECT ?1, 'staff.order_item.reprinted', 'order_item', ?2, ?3, ?4, ?5
           WHERE EXISTS (
             SELECT 1 FROM order_items
             WHERE id = ?2 AND status = 'IN_PRODUCTION'
               AND production_started_at = ?5
           )`,
        )
        .bind(
          actor_id,
          item.id,
          JSON.stringify({
            status: item.status,
            reprintCount: item.reprint_count,
          }),
          JSON.stringify({
            status: "IN_PRODUCTION",
            reprintCount: item.reprint_count + 1,
            reason,
          }),
          timestamp,
        ),
    ]);
    return changed_rows(results[0]) === 1 && changed_rows(results[1]) === 1;
  }

  private async get_batch(
    column: "id" | "reception_number" | "public_token_hash",
    value: string,
  ): Promise<BatchWithItems | null> {
    const batch = await this.db
      .prepare(`SELECT * FROM order_batches WHERE ${column} = ?1 LIMIT 1`)
      .bind(value)
      .first<OrderBatchRow>();
    if (!batch) {
      return null;
    }
    return { batch, items: await this.list_items(batch.id) };
  }

  private async list_items(batch_id: string): Promise<OrderItemRow[]> {
    const result = await this.db
      .prepare(
        "SELECT * FROM order_items WHERE batch_id = ?1 ORDER BY item_code",
      )
      .bind(batch_id)
      .all<OrderItemRow>();
    return result.results ?? [];
  }

  private async run_batch_transition(
    batch_update: D1PreparedStatement,
    item_update: D1PreparedStatement,
    audit_insert: D1PreparedStatement,
  ): Promise<boolean> {
    const results = await this.db.batch([
      batch_update,
      item_update,
      audit_insert,
    ]);
    return changed_rows(results[0]) === 1;
  }

  private audit_statement(
    actor_id: string,
    action: string,
    entity_type: string,
    entity_id: string,
    old_status: string,
    new_status: string,
    timestamp: string,
    timestamp_column: string,
    additional_new_value: Record<string, unknown> = {},
  ): D1PreparedStatement {
    const allowed_timestamp_columns = new Set([
      "accepted_at",
      "rejected_at",
      "production_started_at",
      "ready_at",
      "delivered_at",
    ]);
    if (!allowed_timestamp_columns.has(timestamp_column)) {
      throw new Error("Invalid audit timestamp column");
    }
    return this.db
      .prepare(
        `INSERT INTO audit_logs (
           user_id, action, entity_type, entity_id, old_value, new_value, created_at
         )
         SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7
         WHERE EXISTS (
           SELECT 1 FROM order_batches
           WHERE id = ?4 AND status = ?8 AND ${timestamp_column} = ?7
         )`,
      )
      .bind(
        actor_id,
        action,
        entity_type,
        entity_id,
        JSON.stringify({ status: old_status }),
        JSON.stringify({ status: new_status, ...additional_new_value }),
        timestamp,
        new_status,
      );
  }
}

function changed_rows(result: D1Result | undefined): number {
  return result?.meta?.changes ?? result?.meta?.rows_written ?? 0;
}

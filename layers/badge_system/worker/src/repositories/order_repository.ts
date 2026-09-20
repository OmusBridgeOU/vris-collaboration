import type { D1Database } from "../cloudflare_types";

export type OrderBatchRow = {
  id: string;
  reception_number: string;
  public_token_hash: string;
  client_request_id_hash: string | null;
  status: string;
  total_item_types: number;
  total_quantity: number;
  terms_version: string;
  ownership_confirmed: number;
  portrait_confirmed: number;
  copyright_confirmed: number;
  buyer_confirmed_at: string | null;
  created_at: string;
  expires_at: string;
  accepted_at: string | null;
  production_started_at: string | null;
  ready_at: string | null;
  delivered_at: string | null;
  rejected_at: string | null;
  cancelled_at: string | null;
  accepted_by: string | null;
  production_by: string | null;
  delivered_by: string | null;
  rejection_reason: string | null;
  deleted_at: string | null;
};

export type OrderItemRow = {
  id: string;
  batch_id: string;
  item_code: string;
  local_project_code: string;
  status: string;
  quantity: number;
  print_object_key: string;
  thumbnail_object_key: string;
  width_px: number;
  height_px: number;
  file_size_bytes: number;
  created_at: string;
  production_started_at: string | null;
  ready_at: string | null;
  delivered_at: string | null;
  rejected_at: string | null;
  rejection_reason: string | null;
  reprint_count: number;
  deleted_at: string | null;
};

export type CreateBatchRecord = {
  batch: OrderBatchRow;
  items: OrderItemRow[];
};

export type BatchWithItems = {
  batch: OrderBatchRow;
  items: OrderItemRow[];
};

export class OrderRepository {
  constructor(private readonly db: D1Database) {}

  async exists_client_request_id_hash(hash: string): Promise<boolean> {
    const row = await this.db
      .prepare(
        "SELECT id FROM order_batches WHERE client_request_id_hash = ?1 LIMIT 1",
      )
      .bind(hash)
      .first<{ id: string }>();
    return row !== null;
  }

  async create_batch(record: CreateBatchRecord): Promise<void> {
    const statements = [
      this.db
        .prepare(
          `INSERT INTO order_batches (
            id, reception_number, public_token_hash, client_request_id_hash,
            status, total_item_types, total_quantity, terms_version,
            ownership_confirmed, portrait_confirmed, copyright_confirmed,
            buyer_confirmed_at, created_at, expires_at, accepted_at,
            production_started_at, ready_at, delivered_at, rejected_at,
            cancelled_at, accepted_by, production_by, delivered_by,
            rejection_reason, deleted_at
          ) VALUES (
            ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13,
            ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25
          )`,
        )
        .bind(
          record.batch.id,
          record.batch.reception_number,
          record.batch.public_token_hash,
          record.batch.client_request_id_hash,
          record.batch.status,
          record.batch.total_item_types,
          record.batch.total_quantity,
          record.batch.terms_version,
          record.batch.ownership_confirmed,
          record.batch.portrait_confirmed,
          record.batch.copyright_confirmed,
          record.batch.buyer_confirmed_at,
          record.batch.created_at,
          record.batch.expires_at,
          record.batch.accepted_at,
          record.batch.production_started_at,
          record.batch.ready_at,
          record.batch.delivered_at,
          record.batch.rejected_at,
          record.batch.cancelled_at,
          record.batch.accepted_by,
          record.batch.production_by,
          record.batch.delivered_by,
          record.batch.rejection_reason,
          record.batch.deleted_at,
        ),
      ...record.items.map((item) =>
        this.db
          .prepare(
            `INSERT INTO order_items (
              id, batch_id, item_code, local_project_code, status, quantity,
              print_object_key, thumbnail_object_key, width_px, height_px,
              file_size_bytes, created_at, deleted_at
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`,
          )
          .bind(
            item.id,
            item.batch_id,
            item.item_code,
            item.local_project_code,
            item.status,
            item.quantity,
            item.print_object_key,
            item.thumbnail_object_key,
            item.width_px,
            item.height_px,
            item.file_size_bytes,
            item.created_at,
            item.deleted_at,
          ),
      ),
    ];
    await this.db.batch(statements);
  }

  async get_by_public_token_hash(
    token_hash: string,
  ): Promise<BatchWithItems | null> {
    const batch = await this.db
      .prepare("SELECT * FROM order_batches WHERE public_token_hash = ?1")
      .bind(token_hash)
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
}

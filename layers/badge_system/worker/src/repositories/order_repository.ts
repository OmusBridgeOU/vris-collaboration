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
  created_at: string;
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
            created_at, deleted_at
          ) VALUES (
            ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13
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
          record.batch.created_at,
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

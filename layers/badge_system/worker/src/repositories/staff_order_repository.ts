import type { D1Database } from "../cloudflare_types";
import type {
  BatchWithItems,
  OrderBatchRow,
  OrderItemRow,
} from "./order_repository";

export class StaffOrderRepository {
  constructor(private readonly db: D1Database) {}

  async get_by_reception_number(
    reception_number: string,
  ): Promise<BatchWithItems | null> {
    const batch = await this.db
      .prepare(
        "SELECT * FROM order_batches WHERE reception_number = ?1 LIMIT 1",
      )
      .bind(reception_number)
      .first<OrderBatchRow>();
    if (!batch) return null;
    const result = await this.db
      .prepare(
        "SELECT * FROM order_items WHERE batch_id = ?1 ORDER BY item_code",
      )
      .bind(batch.id)
      .all<OrderItemRow>();
    return { batch, items: result.results ?? [] };
  }

  async get_item(item_id: string): Promise<OrderItemRow | null> {
    return this.db
      .prepare("SELECT * FROM order_items WHERE id = ?1 LIMIT 1")
      .bind(item_id)
      .first<OrderItemRow>();
  }
}

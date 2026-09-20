import { describe, expect, it } from "vitest";

import type { Env } from "../src/cloudflare_types";
import type { AuthenticatedUser } from "../src/repositories/auth_repository";
import type {
  BatchWithItems,
  OrderBatchRow,
  OrderItemRow,
} from "../src/repositories/order_repository";
import {
  StaffOrderService,
  type StaffOrderRepositoryPort,
} from "../src/services/staff_order_service";

class MemoryStaffOrderRepository implements StaffOrderRepositoryPort {
  constructor(readonly record: BatchWithItems) {}

  async get_by_id(batch_id: string) {
    return this.record.batch.id === batch_id ? this.record : null;
  }

  async get_by_reception_number(reception_number: string) {
    return this.record.batch.reception_number === reception_number
      ? this.record
      : null;
  }

  async get_by_public_token_hash() {
    return this.record;
  }

  async list(status: string | null) {
    return !status || this.record.batch.status === status ? [this.record] : [];
  }

  async get_item(item_id: string) {
    return this.record.items.find((item) => item.id === item_id) ?? null;
  }

  async accept(batch: OrderBatchRow, actor_id: string, timestamp: string) {
    if (batch.status !== "UPLOADED") return false;
    batch.status = "ACCEPTED";
    batch.accepted_by = actor_id;
    batch.accepted_at = timestamp;
    batch.buyer_confirmed_at = timestamp;
    this.set_items("ACCEPTED");
    return true;
  }

  async reject(
    batch: OrderBatchRow,
    _actor_id: string,
    reason: string,
    timestamp: string,
  ) {
    if (!["UPLOADED", "ACCEPTED"].includes(batch.status)) return false;
    batch.status = "REJECTED";
    batch.rejected_at = timestamp;
    batch.rejection_reason = reason;
    this.set_items("REJECTED");
    return true;
  }

  async start_production(
    batch: OrderBatchRow,
    actor_id: string,
    timestamp: string,
  ) {
    if (batch.status !== "ACCEPTED") return false;
    batch.status = "IN_PRODUCTION";
    batch.production_by = actor_id;
    batch.production_started_at = timestamp;
    this.set_items("IN_PRODUCTION");
    return true;
  }

  async mark_ready(batch: OrderBatchRow, _actor_id: string, timestamp: string) {
    if (batch.status !== "IN_PRODUCTION") return false;
    batch.status = "READY";
    batch.ready_at = timestamp;
    this.set_items("READY");
    return true;
  }

  async deliver(batch: OrderBatchRow, actor_id: string, timestamp: string) {
    if (batch.status !== "READY") return false;
    batch.status = "DELIVERED";
    batch.delivered_by = actor_id;
    batch.delivered_at = timestamp;
    this.set_items("DELIVERED");
    return true;
  }

  async reprint(
    item: OrderItemRow,
    batch: OrderBatchRow,
    actor_id: string,
    _reason: string,
    timestamp: string,
  ) {
    if (item.status !== "READY" || batch.status !== "READY") return false;
    item.status = "IN_PRODUCTION";
    item.reprint_count += 1;
    item.production_started_at = timestamp;
    batch.status = "IN_PRODUCTION";
    batch.production_by = actor_id;
    batch.production_started_at = timestamp;
    return true;
  }

  private set_items(status: string) {
    for (const item of this.record.items) item.status = status;
  }
}

describe("worker staff order service", () => {
  it("returns current server prices for ID and token lookup without changing quantities", async () => {
    const record = make_record();
    record.batch.total_quantity = 3;
    record.items[0].quantity = 3;
    const service = new StaffOrderService(
      test_env(),
      new MemoryStaffOrderRepository(record),
    );
    expect(
      await service.find_by_reception_number(user("reception"), "A-0001"),
    ).toMatchObject({
      totalQuantity: 3,
      unitPriceYen: 500,
      totalPriceYen: 1500,
    });
    expect(
      await service.find_by_token(user("reception"), "test-token"),
    ).toMatchObject({
      totalQuantity: 3,
      unitPriceYen: 500,
      totalPriceYen: 1500,
    });
    expect(record.items[0].quantity).toBe(3);
    const overridden = new StaffOrderService(
      { ...test_env(), BADGE_UNIT_PRICE_YEN: "700" },
      new MemoryStaffOrderRepository(record),
    );
    expect(
      await overridden.find_by_reception_number(user("reception"), "A-0001"),
    ).toMatchObject({
      unitPriceYen: 700,
      totalPriceYen: 2100,
    });
  });

  it("requires buyer confirmation and the reception role without expiring orders", async () => {
    const repository = new MemoryStaffOrderRepository(make_record());
    const service = new StaffOrderService(test_env(), repository);

    await expect(
      service.accept(user("reception"), "batch-1", false),
    ).rejects.toMatchObject({ status: 400 });
    await expect(
      service.accept(user("production"), "batch-1", true),
    ).rejects.toMatchObject({ status: 403 });

    repository.record.batch.expires_at = "2026-08-25T00:00:00.000Z";
    await expect(
      service.accept(
        user("reception"),
        "batch-1",
        true,
        new Date("2026-08-26T00:00:00.000Z"),
      ),
    ).resolves.toMatchObject({ status: "ACCEPTED", expiresAt: null });
  });

  it("accepts an order once and prevents duplicate acceptance", async () => {
    const repository = new MemoryStaffOrderRepository(make_record());
    const service = new StaffOrderService(test_env(), repository);
    const now = new Date("2026-08-26T00:00:00.000Z");

    const accepted = await service.accept(
      user("reception"),
      "batch-1",
      true,
      now,
    );

    expect(accepted.status).toBe("ACCEPTED");
    expect(accepted.items.map((item) => item.status)).toEqual(["ACCEPTED"]);
    await expect(
      service.accept(user("reception"), "batch-1", true, now),
    ).rejects.toMatchObject({
      status: 409,
      details: { currentStatus: "ACCEPTED" },
    });
  });

  it("records production, ready, delivery, and reprint transitions", async () => {
    const repository = new MemoryStaffOrderRepository(make_record("ACCEPTED"));
    const service = new StaffOrderService(test_env(), repository);

    await service.start_production(user("production"), "batch-1");
    await service.mark_ready(user("production"), "batch-1");
    const reprinted = await service.reprint(
      user("production"),
      "item-1",
      "Print quality issue",
    );
    expect(reprinted.status).toBe("IN_PRODUCTION");
    expect(repository.record.items[0].reprint_count).toBe(1);

    await service.mark_ready(user("production"), "batch-1");
    const delivered = await service.deliver(user("delivery"), "batch-1");
    expect(delivered.status).toBe("DELIVERED");
  });
});

function user(role: string): AuthenticatedUser {
  return {
    id: `${role}-user`,
    username: role,
    display_name: role,
    roles: [role],
  };
}

function test_env(): Env {
  return { PUBLIC_TOKEN_SECRET: "public-secret" } as Env;
}

function make_record(status = "UPLOADED"): BatchWithItems {
  const now = "2026-08-26T00:00:00.000Z";
  return {
    batch: {
      id: "batch-1",
      reception_number: "A-0001",
      public_token_hash: "token-hash",
      client_request_id_hash: null,
      status,
      total_item_types: 1,
      total_quantity: 1,
      terms_version: "1.1",
      ownership_confirmed: 1,
      portrait_confirmed: 1,
      copyright_confirmed: 1,
      buyer_confirmed_at: null,
      created_at: now,
      expires_at: "2026-08-27T00:00:00.000Z",
      accepted_at: null,
      production_started_at: null,
      ready_at: status === "READY" ? now : null,
      delivered_at: null,
      rejected_at: null,
      cancelled_at: null,
      accepted_by: null,
      production_by: null,
      delivered_by: null,
      rejection_reason: null,
      deleted_at: null,
    },
    items: [
      {
        id: "item-1",
        batch_id: "batch-1",
        item_code: "A-0001-01",
        local_project_code: "B-001",
        status,
        quantity: 1,
        print_object_key: "private-print-key",
        thumbnail_object_key: "private-thumbnail-key",
        width_px: 1200,
        height_px: 1200,
        file_size_bytes: 100,
        created_at: now,
        production_started_at: null,
        ready_at: status === "READY" ? now : null,
        delivered_at: null,
        rejected_at: null,
        rejection_reason: null,
        reprint_count: 0,
        deleted_at: null,
      },
    ],
  };
}

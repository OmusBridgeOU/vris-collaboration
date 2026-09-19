import { describe, expect, it, vi } from "vitest";
import type { Env } from "../src/cloudflare_types";
import type {
  BatchWithItems,
  OrderItemRow,
} from "../src/repositories/order_repository";
import { StaffOrderService } from "../src/services/staff_order_service";

const record = {
  batch: {
    id: "batch",
    reception_number: "48317",
    status: "UPLOADED",
    total_item_types: 1,
    total_quantity: 2,
    ownership_confirmed: 1,
    portrait_confirmed: 1,
    copyright_confirmed: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
  items: [
    {
      id: "item",
      item_code: "48317-01",
      local_project_code: "001",
      quantity: 2,
      status: "UPLOADED",
      print_object_key: "private-print",
      thumbnail_object_key: "private-thumbnail",
      width_px: 1200,
      height_px: 1200,
      deleted_at: null,
    },
  ],
} as BatchWithItems;

describe("read-only staff order lookup", () => {
  it("returns quantities and current price without private keys or workflow fields", async () => {
    const repository = {
      get_by_reception_number: vi.fn(async () => record),
      get_item: vi.fn(),
    };
    const service = new StaffOrderService(
      { BADGE_UNIT_PRICE_YEN: "700" } as Env,
      repository,
    );
    const result = await service.find_by_reception_number("48317");
    expect(result).toMatchObject({
      receptionNumber: "48317",
      totalQuantity: 2,
      unitPriceYen: 700,
      totalPriceYen: 1400,
    });
    expect(repository.get_by_reception_number).toHaveBeenCalledWith("48317");
    expect(JSON.stringify(result)).not.toContain("private-print");
    for (const field of [
      "acceptedAt",
      "productionStartedAt",
      "readyAt",
      "deliveredAt",
      "rejectedAt",
      "expiresAt",
    ])
      expect(result).not.toHaveProperty(field);
  });
  it.each(["00123", "1234", "123456", "token", "https://example.com/o/token"])(
    "rejects non-reception-number input: %s",
    async (input) => {
      const repository = {
        get_by_reception_number: vi.fn(),
        get_item: vi.fn(),
      };
      await expect(
        new StaffOrderService({} as Env, repository).find_by_reception_number(
          input,
        ),
      ).rejects.toMatchObject({ status: 422 });
      expect(repository.get_by_reception_number).not.toHaveBeenCalled();
    },
  );
  it("does not expose missing orders or missing/deleted images", async () => {
    const repository = {
      get_by_reception_number: vi.fn(async () => null),
      get_item: vi.fn(async () => null as OrderItemRow | null),
    };
    const get = vi.fn(async () => null);
    const service = new StaffOrderService(
      { ORDER_IMAGES: { get } } as unknown as Env,
      repository,
    );
    await expect(
      service.find_by_reception_number("48317"),
    ).rejects.toMatchObject({ status: 404 });
    await expect(service.get_item_image("item", "print")).rejects.toMatchObject(
      { status: 404 },
    );
    expect(get).not.toHaveBeenCalled();
    repository.get_item.mockResolvedValue({
      ...record.items[0],
      deleted_at: "2025-01-01",
    });
    await expect(service.get_item_image("item", "print")).rejects.toMatchObject(
      { status: 404 },
    );
    expect(get).not.toHaveBeenCalled();
    repository.get_item.mockResolvedValue(record.items[0]);
    await expect(service.get_item_image("item", "print")).rejects.toMatchObject(
      { status: 404 },
    );
  });
});

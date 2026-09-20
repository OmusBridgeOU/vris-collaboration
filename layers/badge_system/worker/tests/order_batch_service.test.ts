import { describe, expect, it } from "vitest";

import type {
  D1Database,
  D1PreparedStatement,
  D1Result,
  Env,
  R2Bucket,
  R2Object,
} from "../src/cloudflare_types";
import type { AppConfig } from "../src/config";
import {
  map_order_error,
  OrderBatchService,
  reception_number_attempt_limit,
} from "../src/services/order_batch_service";

class MemoryStatement implements D1PreparedStatement {
  readonly values: unknown[] = [];

  constructor(readonly query: string) {}

  bind(...values: unknown[]): D1PreparedStatement {
    this.values.push(...values);
    return this;
  }

  async first<T = unknown>(): Promise<T | null> {
    return null;
  }

  async all<T = unknown>(): Promise<D1Result<T>> {
    return { results: [], success: true };
  }

  async run(): Promise<D1Result> {
    return { success: true };
  }
}

class CollisionDatabase implements D1Database {
  readonly attempts: MemoryStatement[][] = [];

  constructor(private collisions_remaining: number) {}

  prepare(query: string): D1PreparedStatement {
    return new MemoryStatement(query);
  }

  async batch<T = unknown>(
    statements: D1PreparedStatement[],
  ): Promise<D1Result<T>[]> {
    const memory_statements = statements as MemoryStatement[];
    this.attempts.push(memory_statements);
    if (this.collisions_remaining > 0) {
      this.collisions_remaining -= 1;
      throw new Error(
        "D1_ERROR: UNIQUE constraint failed: order_batches.reception_number: SQLITE_CONSTRAINT",
      );
    }
    return memory_statements.map(() => ({ success: true }));
  }
}

class MemoryBucket implements R2Bucket {
  readonly objects = new Map<string, Uint8Array>();
  readonly deleted: string[][] = [];

  async get(key: string): Promise<R2Object | null> {
    const bytes = this.objects.get(key);
    return bytes
      ? { body: new Blob([bytes]).stream(), size: bytes.byteLength }
      : null;
  }

  async put(
    key: string,
    value: ArrayBuffer | ArrayBufferView | ReadableStream<Uint8Array>,
  ): Promise<void> {
    if (value instanceof ReadableStream) throw new Error("Unexpected stream");
    const bytes =
      value instanceof ArrayBuffer
        ? new Uint8Array(value)
        : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    this.objects.set(key, bytes);
  }

  async delete(keys: string | string[]): Promise<void> {
    const deleted_keys = Array.isArray(keys) ? keys : [keys];
    this.deleted.push(deleted_keys);
    deleted_keys.forEach((key) => this.objects.delete(key));
  }
}

describe("order batch reception allocation", () => {
  it("retries a reception-number collision in atomic D1 batches", async () => {
    const database = new CollisionDatabase(1);
    const bucket = new MemoryBucket();
    const numbers = ["48317", "60421"];
    const service = new OrderBatchService(
      test_env(database, bucket),
      test_config,
      () => numbers.shift() ?? "99999",
    );

    const response = await service.create_order_batch(order_form());

    expect(response).toMatchObject({
      receptionNumber: "60421",
      expiresAt: null,
      publicUrl: expect.stringMatching(/^\/o\//),
      items: [{ itemCode: "60421-01" }],
    });
    expect(database.attempts).toHaveLength(2);
    expect(database.attempts[0]).toHaveLength(2);
    expect(database.attempts[0][0].values[1]).toBe("48317");
    expect(database.attempts[0][1].values[2]).toBe("48317-01");
    expect(database.attempts[1][0].values[1]).toBe("60421");
    expect(database.attempts[1][0].values[13]).toBe(
      "9999-12-31T23:59:59.999Z",
    );
    expect(database.attempts[1][1].values[2]).toBe("60421-01");
    expect(bucket.objects.size).toBe(2);
    expect(bucket.deleted).toEqual([]);
  });

  it("removes all staged images after exhausting the collision bound", async () => {
    const database = new CollisionDatabase(reception_number_attempt_limit);
    const bucket = new MemoryBucket();
    const service = new OrderBatchService(
      test_env(database, bucket),
      test_config,
      () => "48317",
    );

    let caught: unknown;
    try {
      await service.create_order_batch(order_form());
    } catch (error) {
      caught = error;
    }

    expect(map_order_error(caught)).toEqual({
      status: 503,
      code: "reception_number_unavailable",
      message: "Could not allocate a unique reception number",
    });
    expect(database.attempts).toHaveLength(reception_number_attempt_limit);
    expect(database.attempts.every((attempt) => attempt.length === 2)).toBe(
      true,
    );
    expect(bucket.objects.size).toBe(0);
    expect(bucket.deleted).toHaveLength(1);
    expect(bucket.deleted[0]).toHaveLength(2);
  });
});

function test_env(database: D1Database, bucket: R2Bucket): Env {
  return {
    DB: database,
    ORDER_IMAGES: bucket,
    PUBLIC_TOKEN_SECRET: "test-public-token-secret",
  };
}

const test_config: AppConfig = {
  app_base_url: "https://badge.example",
  app_timezone: "Asia/Tokyo",
  terms_version: "1.1",
  max_upload_bytes_per_item: 1_024,
  max_batch_upload_bytes: 2_048,
  max_items_per_batch: 10,
  max_quantity_per_item: 10,
  canvas_size_px: 1_200,
  finish_diameter_ratio: 0.92,
  safe_area_ratio: 0.7,
  x_share_text: "test",
  x_hashtags: ["test"],
};

function order_form(): FormData {
  const form = new FormData();
  form.set(
    "metadata",
    JSON.stringify({
      termsVersion: "1.1",
      ownershipConfirmed: true,
      portraitConfirmed: true,
      copyrightConfirmed: true,
      items: [{ clientKey: "item-1", localProjectCode: "B-001", quantity: 2 }],
    }),
  );
  const png = make_png_header(1_200, 1_200);
  form.set(
    "item-1.print_image",
    new File([png], "print.png", { type: "image/png" }),
  );
  form.set(
    "item-1.thumbnail",
    new File([png], "thumbnail.png", { type: "image/png" }),
  );
  return form;
}

function make_png_header(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(33);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  bytes.set([0x00, 0x00, 0x00, 0x0d], 8);
  bytes.set([0x49, 0x48, 0x44, 0x52], 12);
  const view = new DataView(bytes.buffer);
  view.setUint32(16, width);
  view.setUint32(20, height);
  return bytes;
}

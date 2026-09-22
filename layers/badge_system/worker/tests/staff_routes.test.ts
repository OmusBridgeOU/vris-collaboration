import { describe, expect, it, vi } from "vitest";

import type { Env } from "../src/cloudflare_types";
import type { OrderItemRow } from "../src/repositories/order_repository";
import { StaffOrderRepository } from "../src/repositories/staff_order_repository";
import { route_staff_request } from "../src/routes/staff_routes";

describe("worker staff routes", () => {
  it.each(["print-image", "thumbnail"])(
    "preserves the R2 prototype body getter when serving %s",
    async (kind) => {
      // Native workerd R2 bodies use prototype accessors, not own properties.
      const bytes = Uint8Array.from(
        atob(
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aS1kAAAAASUVORK5CYII=",
        ),
        (char) => char.charCodeAt(0),
      );
      class NativeLikeR2Object {
        get body() {
          return new Blob([bytes]).stream();
        }
        get size() {
          return bytes.length;
        }
        get httpMetadata() {
          return { contentType: "image/png" };
        }
      }
      const get_item = vi
        .spyOn(StaffOrderRepository.prototype, "get_item")
        .mockResolvedValue({
          print_object_key: "private-print",
          thumbnail_object_key: "private-thumb",
          deleted_at: null,
        } as OrderItemRow);
      try {
        const get = vi.fn(async () => new NativeLikeR2Object());
        const request = new Request(
          `https://example.com/api/staff/order-items/item-1/${kind}`,
          {
            headers: {
              authorization: `Basic ${btoa("staff:test-only-password")}`,
            },
          },
        );
        const response = await route_staff_request(
          request,
          new URL(request.url),
          {
            STAFF_AUTH_MODE: "shared_basic",
            STAFF_ACCESS_USERNAME: "staff",
            STAFF_ACCESS_PASSWORD: "test-only-password",
            ORDER_IMAGES: { get },
          } as unknown as Env,
        );
        expect(response?.status).toBe(200);
        expect(response?.headers.get("content-type")).toBe("image/png");
        expect(response?.headers.get("cache-control")).toBe(
          "no-store, private",
        );
        expect(response?.headers.get("content-disposition")).toBe("inline");
        expect(new Uint8Array(await response!.arrayBuffer())).toEqual(bytes);
        expect(get).toHaveBeenCalledWith(
          kind === "print-image" ? "private-print" : "private-thumb",
        );
      } finally {
        get_item.mockRestore();
      }
    },
  );

  it("rejects unauthenticated staff API calls before accessing D1", async () => {
    const request = new Request("https://example.com/api/staff/order-batches");
    const response = await route_staff_request(request, new URL(request.url), {
      SESSION_SECRET: "test-session-secret",
      DB: new Proxy(
        {},
        {
          get() {
            throw new Error("D1 must not be accessed without a session");
          },
        },
      ),
    } as Env);

    expect(response?.status).toBe(401);
    expect(response?.headers.get("cache-control")).toBe("no-store, private");
    await expect(response?.json()).resolves.toMatchObject({
      error: { code: "authentication_required" },
    });
  });
});

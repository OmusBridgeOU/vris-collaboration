import type { Env, R2Object } from "../cloudflare_types";
import type { BatchWithItems } from "../repositories/order_repository";
import { StaffOrderRepository } from "../repositories/staff_order_repository";
import { order_pricing } from "./order_pricing";

export class StaffOrderError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export class StaffOrderService {
  private readonly repository: Pick<
    StaffOrderRepository,
    "get_by_reception_number" | "get_item"
  >;
  constructor(
    private readonly env: Env,
    repository?: Pick<
      StaffOrderRepository,
      "get_by_reception_number" | "get_item"
    >,
  ) {
    this.repository = repository ?? new StaffOrderRepository(env.DB);
  }

  async find_by_reception_number(reception_number: string) {
    if (!/^[1-9]\d{4}$/.test(reception_number))
      throw new StaffOrderError(
        422,
        "validation_error",
        "Reception number must contain five digits",
      );
    const record =
      await this.repository.get_by_reception_number(reception_number);
    if (!record)
      throw new StaffOrderError(
        404,
        "order_batch_not_found",
        "Order was not found",
      );
    return {
      ...serialize_batch(record),
      ...order_pricing(
        record.batch.total_quantity,
        this.env.BADGE_UNIT_PRICE_YEN,
      ),
    };
  }

  async get_item_image(
    item_id: string,
    kind: "print" | "thumbnail",
  ): Promise<{ body: NonNullable<R2Object["body"]>; content_type: string }> {
    const item = await this.repository.get_item(item_id);
    if (!item || item.deleted_at)
      throw new StaffOrderError(404, "image_not_found", "Image was not found");
    const object = await this.env.ORDER_IMAGES.get(
      kind === "print" ? item.print_object_key : item.thumbnail_object_key,
    );
    if (!object?.body)
      throw new StaffOrderError(404, "image_not_found", "Image was not found");
    return {
      body: object.body,
      content_type:
        object.httpMetadata?.contentType ??
        (kind === "print" ? "image/png" : "image/jpeg"),
    };
  }
}

export function serialize_batch({ batch, items }: BatchWithItems) {
  return {
    id: batch.id,
    receptionNumber: batch.reception_number,
    status: batch.status,
    totalItemTypes: batch.total_item_types,
    totalQuantity: batch.total_quantity,
    ownershipConfirmed: batch.ownership_confirmed === 1,
    portraitConfirmed: batch.portrait_confirmed === 1,
    copyrightConfirmed: batch.copyright_confirmed === 1,
    createdAt: batch.created_at,
    items: items.map((item) => ({
      id: item.id,
      itemCode: item.item_code,
      localProjectCode: item.local_project_code,
      status: item.status,
      quantity: item.quantity,
      imageUrl: "/api/staff/order-items/" + item.id + "/print-image",
      thumbnailUrl: "/api/staff/order-items/" + item.id + "/thumbnail",
      widthPx: item.width_px,
      heightPx: item.height_px,
    })),
  };
}

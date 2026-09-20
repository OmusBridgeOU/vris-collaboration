import { order_pricing } from "./order_pricing";
import type { Env, R2Object } from "../cloudflare_types";
import { hmac_sha256_hex } from "../crypto";
import type { AuthenticatedUser } from "../repositories/auth_repository";
import type {
  BatchWithItems,
  OrderBatchRow,
  OrderItemRow,
} from "../repositories/order_repository";
import { StaffOrderRepository } from "../repositories/staff_order_repository";
import { has_role, type StaffRole } from "../security/roles";

const order_statuses = new Set([
  "UPLOADED",
  "ACCEPTED",
  "IN_PRODUCTION",
  "READY",
  "DELIVERED",
  "REJECTED",
  "EXPIRED",
  "CANCELLED",
]);

export class StaffOrderError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
  }
}

export type StaffOrderRepositoryPort = Pick<
  StaffOrderRepository,
  | "get_by_id"
  | "get_by_reception_number"
  | "get_by_public_token_hash"
  | "list"
  | "get_item"
  | "accept"
  | "reject"
  | "start_production"
  | "mark_ready"
  | "deliver"
  | "reprint"
>;

export class StaffOrderService {
  private readonly repository: StaffOrderRepositoryPort;

  constructor(
    private readonly env: Env,
    repository?: StaffOrderRepositoryPort,
  ) {
    this.repository = repository ?? new StaffOrderRepository(env.DB);
  }

  async list(user: AuthenticatedUser, status: string | null) {
    this.require_staff(user);
    if (status && !order_statuses.has(status)) {
      throw new StaffOrderError(
        422,
        "validation_error",
        "Invalid order status",
      );
    }
    return {
      orderBatches: (await this.repository.list(status)).map((record) =>
        this.serialize_batch(record),
      ),
    };
  }

  async find_by_token(user: AuthenticatedUser, token_or_url: string) {
    this.require_staff(user);
    const token = extract_public_token(token_or_url);
    if (!token) {
      throw new StaffOrderError(
        422,
        "validation_error",
        "Public token is required",
      );
    }
    const record = await this.repository.get_by_public_token_hash(
      await hmac_sha256_hex(this.env.PUBLIC_TOKEN_SECRET, token),
    );
    return this.serialize_batch(this.require_batch(record));
  }

  async find_by_reception_number(
    user: AuthenticatedUser,
    reception_number: string,
  ) {
    this.require_staff(user);
    return this.serialize_batch(
      this.require_batch(
        await this.repository.get_by_reception_number(reception_number.trim()),
      ),
    );
  }

  async accept(
    user: AuthenticatedUser,
    batch_id: string,
    buyer_confirmed: boolean,
    now = new Date(),
  ) {
    this.require_role(user, "reception");
    if (!buyer_confirmed) {
      throw new StaffOrderError(
        400,
        "buyer_confirmation_required",
        "Buyer confirmation is required",
      );
    }
    const record = this.require_batch(
      await this.repository.get_by_id(batch_id),
    );
    this.ensure_status(record.batch, ["UPLOADED"]);
    await this.ensure_transition(
      await this.repository.accept(record.batch, user.id, now.toISOString()),
      batch_id,
    );
    return this.serialize_batch(
      this.require_batch(await this.repository.get_by_id(batch_id)),
    );
  }

  async reject(
    user: AuthenticatedUser,
    batch_id: string,
    reason: string,
    now = new Date(),
  ) {
    this.require_role(user, "reception");
    const normalized_reason = reason.trim();
    if (!normalized_reason || normalized_reason.length > 500) {
      throw new StaffOrderError(
        422,
        "validation_error",
        "Rejection reason must contain 1 to 500 characters",
      );
    }
    const record = this.require_batch(
      await this.repository.get_by_id(batch_id),
    );
    this.ensure_status(record.batch, ["UPLOADED", "ACCEPTED"]);
    await this.ensure_transition(
      await this.repository.reject(
        record.batch,
        user.id,
        normalized_reason,
        now.toISOString(),
      ),
      batch_id,
    );
    return this.serialize_batch(
      this.require_batch(await this.repository.get_by_id(batch_id)),
    );
  }

  async start_production(
    user: AuthenticatedUser,
    batch_id: string,
    now = new Date(),
  ) {
    return this.transition(
      user,
      "production",
      batch_id,
      ["ACCEPTED"],
      (batch) =>
        this.repository.start_production(batch, user.id, now.toISOString()),
    );
  }

  async mark_ready(
    user: AuthenticatedUser,
    batch_id: string,
    now = new Date(),
  ) {
    return this.transition(
      user,
      "production",
      batch_id,
      ["IN_PRODUCTION"],
      (batch) => this.repository.mark_ready(batch, user.id, now.toISOString()),
    );
  }

  async deliver(user: AuthenticatedUser, batch_id: string, now = new Date()) {
    return this.transition(user, "delivery", batch_id, ["READY"], (batch) =>
      this.repository.deliver(batch, user.id, now.toISOString()),
    );
  }

  async reprint(
    user: AuthenticatedUser,
    item_id: string,
    reason: string,
    now = new Date(),
  ) {
    this.require_role(user, "production");
    const normalized_reason = reason.trim();
    if (!normalized_reason || normalized_reason.length > 500) {
      throw new StaffOrderError(
        422,
        "validation_error",
        "Reprint reason must contain 1 to 500 characters",
      );
    }
    const item = await this.repository.get_item(item_id);
    if (!item) {
      throw new StaffOrderError(
        404,
        "order_item_not_found",
        "Order item not found",
      );
    }
    const record = this.require_batch(
      await this.repository.get_by_id(item.batch_id),
    );
    this.ensure_status(record.batch, ["READY"]);
    if (item.status !== "READY") {
      throw this.transition_error(item.status);
    }
    if (
      !(await this.repository.reprint(
        item,
        record.batch,
        user.id,
        normalized_reason,
        now.toISOString(),
      ))
    ) {
      throw this.transition_error(
        (await this.repository.get_item(item_id))?.status ?? item.status,
      );
    }
    return this.serialize_batch(
      this.require_batch(await this.repository.get_by_id(item.batch_id)),
    );
  }

  async get_item_image(
    user: AuthenticatedUser,
    item_id: string,
    image_kind: "print" | "thumbnail",
  ): Promise<R2Object & { content_type: string }> {
    this.require_staff(user);
    const item = await this.repository.get_item(item_id);
    if (!item || item.deleted_at) {
      throw new StaffOrderError(
        404,
        "order_image_not_found",
        "Order image not found",
      );
    }
    const object = await this.env.ORDER_IMAGES.get(
      image_kind === "print"
        ? item.print_object_key
        : item.thumbnail_object_key,
    );
    if (!object) {
      throw new StaffOrderError(
        404,
        "order_image_not_found",
        "Order image not found",
      );
    }
    return {
      // R2 exposes body via a prototype getter; object spread drops the stream.
      body: object.body,
      size: object.size,
      httpMetadata: object.httpMetadata,
      content_type:
        object.httpMetadata?.contentType ??
        (image_kind === "print" ? "image/png" : "image/jpeg"),
    };
  }

  private serialize_batch(record: BatchWithItems) {
    return {
      ...serialize_batch(record),
      ...order_pricing(
        record.batch.total_quantity,
        this.env.BADGE_UNIT_PRICE_YEN,
      ),
    };
  }

  private async transition(
    user: AuthenticatedUser,
    role: StaffRole,
    batch_id: string,
    allowed_statuses: string[],
    apply: (batch: OrderBatchRow) => Promise<boolean>,
  ) {
    this.require_role(user, role);
    const record = this.require_batch(
      await this.repository.get_by_id(batch_id),
    );
    this.ensure_status(record.batch, allowed_statuses);
    await this.ensure_transition(await apply(record.batch), batch_id);
    return this.serialize_batch(
      this.require_batch(await this.repository.get_by_id(batch_id)),
    );
  }

  private async ensure_transition(
    changed: boolean,
    batch_id: string,
  ): Promise<void> {
    if (changed) {
      return;
    }
    const current = await this.repository.get_by_id(batch_id);
    throw this.transition_error(current?.batch.status ?? "missing");
  }

  private require_batch(record: BatchWithItems | null): BatchWithItems {
    if (!record) {
      throw new StaffOrderError(
        404,
        "order_batch_not_found",
        "Order batch not found",
      );
    }
    return record;
  }

  private require_staff(user: AuthenticatedUser): void {
    if (user.roles.length === 0) {
      throw new StaffOrderError(403, "role_not_allowed", "Role is not allowed");
    }
  }

  private require_role(user: AuthenticatedUser, role: StaffRole): void {
    if (!has_role(user.roles, role)) {
      throw new StaffOrderError(403, "role_not_allowed", "Role is not allowed");
    }
  }

  private ensure_status(
    batch: OrderBatchRow,
    allowed_statuses: string[],
  ): void {
    if (!allowed_statuses.includes(batch.status)) {
      throw this.transition_error(batch.status);
    }
  }

  private transition_error(current_status: string): StaffOrderError {
    return new StaffOrderError(
      409,
      "invalid_state_transition",
      "Order cannot transition from its current status",
      { currentStatus: current_status },
    );
  }
}

export function serialize_batch(record: BatchWithItems) {
  const { batch } = record;
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
    expiresAt: null,
    acceptedAt: batch.accepted_at,
    productionStartedAt: batch.production_started_at,
    readyAt: batch.ready_at,
    deliveredAt: batch.delivered_at,
    rejectedAt: batch.rejected_at,
    rejectionReason: batch.rejection_reason,
    items: record.items.map(serialize_item),
  };
}

function serialize_item(item: OrderItemRow) {
  return {
    id: item.id,
    itemCode: item.item_code,
    localProjectCode: item.local_project_code,
    status: item.status,
    quantity: item.quantity,
    imageUrl: `/api/staff/order-items/${item.id}/print-image`,
    thumbnailUrl: `/api/staff/order-items/${item.id}/thumbnail`,
    widthPx: item.width_px,
    heightPx: item.height_px,
  };
}

function extract_public_token(token_or_url: string): string {
  const candidate = token_or_url.trim();
  try {
    const url = new URL(candidate);
    const parts = url.pathname.split("/").filter(Boolean);
    const order_index = parts.lastIndexOf("o");
    if (order_index >= 0 && parts[order_index + 1]) {
      return parts[order_index + 1];
    }
  } catch {
    // The input may be a raw token rather than a URL.
  }
  const parts = candidate.replace(/\/+$/, "").split("/");
  return parts.at(-1) ?? "";
}

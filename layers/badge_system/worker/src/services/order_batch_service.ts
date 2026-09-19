import type { Env } from "../cloudflare_types";
import {
  format_item_code,
  generate_reception_number,
} from "../code_generation";
import type { AppConfig } from "../config";
import { hmac_sha256_hex, random_token } from "../crypto";
import type {
  BatchWithItems,
  OrderBatchRow,
  OrderItemRow,
} from "../repositories/order_repository";
import { OrderRepository } from "../repositories/order_repository";
import { ImageStorageService, ImageValidationError } from "./image_service";

export class OrderBatchError extends Error {}
export class DuplicateClientRequestError extends OrderBatchError {}
export class OrderNotFoundError extends OrderBatchError {}
export class ReceptionNumberUnavailableError extends OrderBatchError {}

export const reception_number_attempt_limit = 10;

type OrderBatchItemInput = {
  clientKey: string;
  localProjectCode: string;
  quantity: number;
};

type OrderBatchMetadataInput = {
  clientRequestId?: string | null;
  termsVersion: string;
  ownershipConfirmed: boolean;
  portraitConfirmed: boolean;
  copyrightConfirmed: boolean;
  items: OrderBatchItemInput[];
};

type OrderImageUploads = {
  print_image: File;
  thumbnail: File;
};

export class OrderBatchService {
  private readonly repository: OrderRepository;
  private readonly image_storage: ImageStorageService;

  constructor(
    private readonly env: Env,
    private readonly config: AppConfig,
    private readonly reception_number_generator = generate_reception_number,
  ) {
    this.repository = new OrderRepository(env.DB);
    this.image_storage = new ImageStorageService(env.ORDER_IMAGES);
  }

  async create_order_batch(form: FormData) {
    const metadata = parse_metadata(form.get("metadata"));
    this.validate_metadata(metadata);
    const uploads = parse_uploads(metadata, form);
    await this.validate_batch_upload_size(uploads);

    const client_request_id_hash = metadata.clientRequestId
      ? await this.hash_secret(metadata.clientRequestId)
      : null;
    if (
      client_request_id_hash &&
      (await this.repository.exists_client_request_id_hash(
        client_request_id_hash,
      ))
    ) {
      throw new DuplicateClientRequestError(
        "A batch with this client request ID already exists",
      );
    }

    const batch_id = crypto.randomUUID();
    const public_token = random_token();
    const public_token_hash = await this.hash_secret(public_token);
    const now = new Date();
    const created_at = now.toISOString();
    const stored_object_keys: string[] = [];
    const stored_items: Omit<OrderItemRow, "item_code">[] = [];

    try {
      for (const item of metadata.items) {
        const item_id = crypto.randomUUID();
        const upload = uploads.get(item.clientKey);
        if (!upload) {
          throw new OrderBatchError(
            `Missing image files for ${item.clientKey}`,
          );
        }
        const print_key = order_object_key(batch_id, item_id, "print.png");
        const thumbnail_key = order_object_key(
          batch_id,
          item_id,
          "thumbnail.jpg",
        );
        const print_image =
          await this.image_storage.validate_and_store_print_image(
            upload.print_image,
            print_key,
            this.print_limits(),
          );
        stored_object_keys.push(print_key);
        const thumbnail = await this.image_storage.validate_and_store_thumbnail(
          upload.thumbnail,
          thumbnail_key,
          this.thumbnail_limits(),
        );
        stored_object_keys.push(thumbnail_key);

        stored_items.push({
          id: item_id,
          batch_id,
          local_project_code: item.localProjectCode,
          status: "UPLOADED",
          quantity: item.quantity,
          print_object_key: print_image.object_key,
          thumbnail_object_key: thumbnail.object_key,
          width_px: print_image.width_px,
          height_px: print_image.height_px,
          file_size_bytes: print_image.file_size_bytes,
          created_at,
          deleted_at: null,
        });
      }

      for (
        let attempt = 1;
        attempt <= reception_number_attempt_limit;
        attempt += 1
      ) {
        const reception_number = this.reception_number_generator();
        const items = stored_items.map((item, index) => ({
          ...item,
          item_code: format_item_code(reception_number, index + 1),
        }));
        const batch: OrderBatchRow = {
          id: batch_id,
          reception_number,
          public_token_hash,
          client_request_id_hash,
          status: "UPLOADED",
          total_item_types: metadata.items.length,
          total_quantity: metadata.items.reduce(
            (total, item) => total + item.quantity,
            0,
          ),
          terms_version: metadata.termsVersion,
          ownership_confirmed: metadata.ownershipConfirmed ? 1 : 0,
          portrait_confirmed: metadata.portraitConfirmed ? 1 : 0,
          copyright_confirmed: metadata.copyrightConfirmed ? 1 : 0,
          created_at,
          deleted_at: null,
        };

        try {
          await this.repository.create_batch({ batch, items });
          return created_response(batch, items, public_token);
        } catch (error) {
          if (!is_reception_number_conflict(error)) {
            throw error;
          }
          if (attempt === reception_number_attempt_limit) {
            throw new ReceptionNumberUnavailableError(
              "Could not allocate a unique reception number",
            );
          }
        }
      }

      throw new ReceptionNumberUnavailableError(
        "Could not allocate a unique reception number",
      );
    } catch (error) {
      await this.image_storage.delete_images(stored_object_keys);
      throw error;
    }
  }

  async get_public_status(
    token: string,
  ): Promise<ReturnType<typeof public_status_response>> {
    const batch = await this.get_public_batch(token);
    return public_status_response(batch, token);
  }

  async get_public_image(
    token: string,
    item_code: string,
    image_kind: "print" | "thumbnail",
  ) {
    const batch = await this.get_public_batch(token);
    const item = batch.items.find((entry) => entry.item_code === item_code);
    if (!item || item.deleted_at) {
      throw new OrderNotFoundError("Order image was not found");
    }
    const object_key =
      image_kind === "print"
        ? item.print_object_key
        : item.thumbnail_object_key;
    const image = await this.image_storage.get_image(object_key);
    if (!image || !image.body) {
      throw new OrderNotFoundError("Order image was not found");
    }
    return image;
  }

  private async get_public_batch(token: string): Promise<BatchWithItems> {
    const batch = await this.repository.get_by_public_token_hash(
      await this.hash_secret(token),
    );
    if (!batch) {
      throw new OrderNotFoundError("Order batch was not found");
    }
    return batch;
  }

  private validate_metadata(metadata: OrderBatchMetadataInput): void {
    if (metadata.termsVersion !== this.config.terms_version) {
      throw new OrderBatchError("Terms version is not current");
    }
    if (
      !metadata.ownershipConfirmed ||
      !metadata.portraitConfirmed ||
      !metadata.copyrightConfirmed
    ) {
      throw new OrderBatchError("All rights confirmations are required");
    }
    if (metadata.items.length === 0) {
      throw new OrderBatchError("Order must contain at least one item");
    }
    if (metadata.items.length > this.config.max_items_per_batch) {
      throw new OrderBatchError(
        `Order can include at most ${this.config.max_items_per_batch} designs. Remove one or more designs and try again.`,
      );
    }
    const client_keys = new Set<string>();
    for (const item of metadata.items) {
      if (!item.clientKey || !item.localProjectCode) {
        throw new OrderBatchError("Order item metadata is invalid");
      }
      if (client_keys.has(item.clientKey)) {
        throw new OrderBatchError("Item client keys must be unique");
      }
      client_keys.add(item.clientKey);
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        throw new OrderBatchError("Item quantity is invalid");
      }
      if (item.quantity > this.config.max_quantity_per_item) {
        throw new OrderBatchError(
          `Each design can have at most ${this.config.max_quantity_per_item} items. Reduce the quantity and try again.`,
        );
      }
    }
  }

  private async validate_batch_upload_size(
    uploads: Map<string, OrderImageUploads>,
  ): Promise<void> {
    let total_size = 0;
    for (const upload of uploads.values()) {
      total_size += upload.print_image.size + upload.thumbnail.size;
    }
    if (total_size > this.config.max_batch_upload_bytes) {
      throw new OrderBatchError(
        "Order batch upload exceeds the configured size limit",
      );
    }
  }

  private async hash_secret(value: string): Promise<string> {
    return hmac_sha256_hex(this.env.PUBLIC_TOKEN_SECRET, value);
  }

  private print_limits() {
    return {
      max_upload_bytes: this.config.max_upload_bytes_per_item,
      canvas_size_px: this.config.canvas_size_px,
    };
  }

  private thumbnail_limits() {
    return {
      max_upload_bytes: this.config.max_upload_bytes_per_item,
      canvas_size_px: this.config.canvas_size_px,
    };
  }
}

export function map_order_error(error: unknown): {
  status: number;
  code: string;
  message: string;
} {
  if (error instanceof DuplicateClientRequestError) {
    return {
      status: 409,
      code: "duplicate_client_request",
      message: error.message,
    };
  }
  if (error instanceof OrderNotFoundError) {
    return { status: 404, code: "order_not_found", message: error.message };
  }
  if (error instanceof ReceptionNumberUnavailableError) {
    return {
      status: 503,
      code: "reception_number_unavailable",
      message: error.message,
    };
  }
  if (error instanceof ImageValidationError) {
    return {
      status: 422,
      code: "image_validation_error",
      message: error.message,
    };
  }
  if (error instanceof OrderBatchError) {
    return {
      status: 422,
      code: "order_validation_error",
      message: error.message,
    };
  }
  return { status: 500, code: "order_error", message: "Order request failed" };
}

function is_reception_number_conflict(error: unknown): boolean {
  let current: unknown = error;
  while (current instanceof Error) {
    if (
      /UNIQUE constraint failed:\s*order_batches\.reception_number/i.test(
        current.message,
      )
    ) {
      return true;
    }
    current = current.cause;
  }
  return false;
}

function parse_metadata(
  value: FormDataEntryValue | null,
): OrderBatchMetadataInput {
  if (typeof value !== "string") {
    throw new OrderBatchError("Multipart metadata field is required");
  }
  try {
    const metadata = JSON.parse(value) as OrderBatchMetadataInput;
    if (!Array.isArray(metadata.items)) {
      throw new OrderBatchError("Multipart metadata field is invalid");
    }
    return metadata;
  } catch (error) {
    if (error instanceof OrderBatchError) {
      throw error;
    }
    throw new OrderBatchError("Multipart metadata field is invalid");
  }
}

function parse_uploads(
  metadata: OrderBatchMetadataInput,
  form: FormData,
): Map<string, OrderImageUploads> {
  const uploads = new Map<string, OrderImageUploads>();
  for (const item of metadata.items) {
    const print_image = form.get(`${item.clientKey}.print_image`);
    const thumbnail = form.get(`${item.clientKey}.thumbnail`);
    if (!(print_image instanceof File) || !(thumbnail instanceof File)) {
      throw new OrderBatchError(`Missing image files for ${item.clientKey}`);
    }
    uploads.set(item.clientKey, { print_image, thumbnail });
  }
  return uploads;
}

function order_object_key(
  batch_id: string,
  item_id: string,
  filename: string,
): string {
  return `orders/${batch_id}/${item_id}/${filename}`;
}

function created_response(
  batch: OrderBatchRow,
  items: OrderItemRow[],
  token: string,
) {
  return {
    receptionNumber: batch.reception_number,
    publicToken: token,
    status: batch.status,
    totalItemTypes: batch.total_item_types,
    totalQuantity: batch.total_quantity,
    createdAt: batch.created_at,
    expiresAt: null,
    publicUrl: `/o/${token}`,
    items: items.map((item) => ({
      itemCode: item.item_code,
      localProjectCode: item.local_project_code,
      quantity: item.quantity,
    })),
  };
}

function public_status_response(batch: BatchWithItems, token: string) {
  return {
    receptionNumber: batch.batch.reception_number,
    status: batch.batch.status,
    totalItemTypes: batch.batch.total_item_types,
    totalQuantity: batch.batch.total_quantity,
    createdAt: batch.batch.created_at,
    expiresAt: null,
    items: batch.items.map((item) => ({
      itemCode: item.item_code,
      localProjectCode: item.local_project_code,
      status: item.status,
      quantity: item.quantity,
      widthPx: item.deleted_at ? null : item.width_px,
      heightPx: item.deleted_at ? null : item.height_px,
      printImageUrl: item.deleted_at
        ? null
        : `/api/order-batches/public/${token}/items/${item.item_code}/print-image`,
      thumbnailUrl: item.deleted_at
        ? null
        : `/api/order-batches/public/${token}/items/${item.item_code}/thumbnail`,
      imageDeleted: item.deleted_at !== null,
    })),
  };
}

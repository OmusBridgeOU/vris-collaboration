import type {
  ApiErrorResponse,
  OrderBatchCreatedResponse,
  PublicConfig,
} from "../types/api_types";
import {
  canvas_to_blob,
  render_badge_design,
} from "../features/editor/editor_renderer";
import { full_bleed_diameter_ratio } from "../features/editor/editor_constants";
import type { BadgeDesign } from "../features/editor/editor_types";
import type { PurchaseListEntry } from "../features/projects/project_types";

export type OrderConfirmations = {
  ownership_confirmed: boolean;
  portrait_confirmed: boolean;
  copyright_confirmed: boolean;
};

export type CreateOrderBatchInput = {
  entries: PurchaseListEntry[];
  config: PublicConfig;
  confirmations: OrderConfirmations;
};

export async function create_order_batch({
  entries,
  config,
  confirmations,
}: CreateOrderBatchInput): Promise<OrderBatchCreatedResponse> {
  const form = new FormData();
  const metadata = {
    clientRequestId: create_client_request_id(),
    termsVersion: config.termsVersion,
    ownershipConfirmed: confirmations.ownership_confirmed,
    portraitConfirmed: confirmations.portrait_confirmed,
    copyrightConfirmed: confirmations.copyright_confirmed,
    items: entries.map((entry) => ({
      clientKey: entry.project_id,
      localProjectCode: entry.project.local_project_code,
      quantity: entry.quantity,
    })),
  };

  form.append("metadata", JSON.stringify(metadata));

  for (const entry of entries) {
    const { print_canvas, thumbnail_canvas } = await render_order_images(
      entry,
      config,
    );
    const print_image = await canvas_to_blob(print_canvas, "image/png");
    const thumbnail = await canvas_to_blob(
      thumbnail_canvas,
      "image/jpeg",
      0.84,
    );

    form.append(
      `${entry.project_id}.print_image`,
      print_image,
      `${entry.project.local_project_code}-print.png`,
    );
    form.append(
      `${entry.project_id}.thumbnail`,
      thumbnail,
      `${entry.project.local_project_code}-thumbnail.jpg`,
    );
  }

  const response = await fetch("/api/order-batches", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: form,
  });

  if (!response.ok) {
    const body = (await response
      .json()
      .catch(() => null)) as ApiErrorResponse | null;
    throw new Error(body?.error.message ?? "注文を作成できませんでした");
  }

  return (await response.json()) as OrderBatchCreatedResponse;
}

async function render_order_images(
  entry: PurchaseListEntry,
  config: PublicConfig,
) {
  if (entry.project.editor_design) {
    const design = design_from_entry(entry);
    return {
      print_canvas: await render_badge_design(design, {
        canvas_size_px: config.canvasSizePx,
        finish_diameter_ratio: full_bleed_diameter_ratio,
        safe_area_ratio: config.safeAreaRatio,
        include_guides: false,
        extend_frame_to_bleed: true,
      }),
      thumbnail_canvas: await render_data_url_to_canvas(
        entry.project.thumbnail_data_url,
        360,
      ),
    };
  }

  return {
    print_canvas: await render_data_url_to_canvas(
      entry.project.editor_state.edited_image_data_url,
      config.canvasSizePx,
    ),
    thumbnail_canvas: await render_data_url_to_canvas(
      entry.project.thumbnail_data_url,
      360,
    ),
  };
}

function design_from_entry(entry: PurchaseListEntry): BadgeDesign {
  return {
    ...JSON.parse(JSON.stringify(entry.project.editor_design)),
    project_id: entry.project.project_id,
    local_project_code: entry.project.local_project_code,
    ordered: entry.project.ordered,
  } as BadgeDesign;
}

async function render_data_url_to_canvas(data_url: string, size: number) {
  const image = await load_image(data_url);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvasを初期化できませんでした");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);
  context.drawImage(image, 0, 0, size, size);
  return canvas;
}

function load_image(data_url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("注文画像を読み込めませんでした"));
    image.src = data_url;
  });
}

function create_client_request_id() {
  if (crypto.randomUUID) {
    return `order-${crypto.randomUUID()}`;
  }

  return `order-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

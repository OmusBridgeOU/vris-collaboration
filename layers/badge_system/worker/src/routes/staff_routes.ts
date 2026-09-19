import type { Env } from "../cloudflare_types";
import { no_store_headers, private_json_response } from "../http";
import {
  StaffOrderError,
  StaffOrderService,
} from "../services/staff_order_service";

// The Worker authenticates every /api/staff request before entering this router.
export async function route_staff_request(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/staff/")) return null;
  const reception = url.pathname.match(
    /^\/api\/staff\/order-batches\/by-reception-number\/([^/]+)$/,
  );
  const image = url.pathname.match(
    /^\/api\/staff\/order-items\/([^/]+)\/(print-image|thumbnail)$/,
  );
  if (!reception && !image) return failure(404, "not_found", "Route not found");
  if (request.method !== "GET")
    return failure(405, "method_not_allowed", "Method not allowed");
  try {
    const service = new StaffOrderService(env);
    if (reception)
      return private_json_response(
        await service.find_by_reception_number(
          decodeURIComponent(reception[1]),
        ),
      );
    const found = await service.get_item_image(
      decodeURIComponent(image![1]),
      image![2] === "print-image" ? "print" : "thumbnail",
    );
    const headers = no_store_headers(found.content_type);
    headers.set("content-disposition", "inline");
    return new Response(found.body, { headers });
  } catch (error) {
    if (error instanceof StaffOrderError)
      return failure(error.status, error.code, error.message);
    return failure(500, "internal_error", "Internal server error");
  }
}
function failure(status: number, code: string, message: string): Response {
  return private_json_response({ error: { code, message } }, { status });
}

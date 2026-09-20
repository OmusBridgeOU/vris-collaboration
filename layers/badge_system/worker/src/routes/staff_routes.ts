import type { Env } from "../cloudflare_types";
import { no_store_headers, private_json_response } from "../http";
import { AuthError, AuthService } from "../services/auth_service";
import {
  StaffOrderError,
  StaffOrderService,
} from "../services/staff_order_service";

export async function route_staff_request(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/staff/")) {
    return null;
  }
  try {
    const user = await new AuthService(env).authenticate(request);
    const service = new StaffOrderService(env);

    if (url.pathname === "/api/staff/order-batches") {
      ensure_method(request, "GET");
      return private_json_response(
        await service.list(user, url.searchParams.get("status")),
      );
    }

    const token_match = url.pathname.match(
      /^\/api\/staff\/order-batches\/by-token\/(.+)$/,
    );
    if (token_match) {
      ensure_method(request, "GET");
      return private_json_response(
        await service.find_by_token(user, decodeURIComponent(token_match[1])),
      );
    }

    const reception_match = url.pathname.match(
      /^\/api\/staff\/order-batches\/by-reception-number\/([^/]+)$/,
    );
    if (reception_match) {
      ensure_method(request, "GET");
      return private_json_response(
        await service.find_by_reception_number(
          user,
          decodeURIComponent(reception_match[1]),
        ),
      );
    }

    const transition_match = url.pathname.match(
      /^\/api\/staff\/order-batches\/([^/]+)\/(accept|reject|start-production|ready|deliver)$/,
    );
    if (transition_match) {
      ensure_method(request, "POST");
      const batch_id = decodeURIComponent(transition_match[1]);
      const action = transition_match[2];
      if (action === "accept") {
        const payload = await object_payload(request, ["buyerConfirmed"]);
        if (typeof payload.buyerConfirmed !== "boolean") {
          throw validation_error("buyerConfirmed must be a boolean");
        }
        return private_json_response(
          await service.accept(user, batch_id, payload.buyerConfirmed),
        );
      }
      if (action === "reject") {
        const payload = await object_payload(request, ["reason"]);
        if (typeof payload.reason !== "string") {
          throw validation_error("reason must be a string");
        }
        return private_json_response(
          await service.reject(user, batch_id, payload.reason),
        );
      }
      if (action === "start-production") {
        return private_json_response(
          await service.start_production(user, batch_id),
        );
      }
      if (action === "ready") {
        return private_json_response(await service.mark_ready(user, batch_id));
      }
      return private_json_response(await service.deliver(user, batch_id));
    }

    const reprint_match = url.pathname.match(
      /^\/api\/staff\/order-items\/([^/]+)\/reprint$/,
    );
    if (reprint_match) {
      ensure_method(request, "POST");
      const payload = await object_payload(request, ["reason"]);
      if (typeof payload.reason !== "string") {
        throw validation_error("reason must be a string");
      }
      return private_json_response(
        await service.reprint(
          user,
          decodeURIComponent(reprint_match[1]),
          payload.reason,
        ),
      );
    }

    const image_match = url.pathname.match(
      /^\/api\/staff\/order-items\/([^/]+)\/(print-image|thumbnail)$/,
    );
    if (image_match) {
      ensure_method(request, "GET");
      const image = await service.get_item_image(
        user,
        decodeURIComponent(image_match[1]),
        image_match[2] === "print-image" ? "print" : "thumbnail",
      );
      const headers = no_store_headers(image.content_type);
      headers.set("content-disposition", "inline");
      return new Response(image.body, { headers });
    }

    return staff_error(404, "not_found", "Route not found");
  } catch (error) {
    if (error instanceof AuthError || error instanceof StaffOrderError) {
      return staff_error(
        error.status,
        error.code,
        error.message,
        error instanceof StaffOrderError ? error.details : undefined,
      );
    }
    return staff_error(500, "internal_error", "Internal server error");
  }
}

function ensure_method(request: Request, expected: string): void {
  if (request.method !== expected) {
    throw new StaffOrderError(405, "method_not_allowed", "Method not allowed");
  }
}

async function object_payload(
  request: Request,
  allowed_keys: string[],
): Promise<Record<string, unknown>> {
  let value: unknown;
  try {
    value = await request.json();
  } catch {
    throw validation_error("Request body must be JSON");
  }
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    Object.keys(value).some((key) => !allowed_keys.includes(key))
  ) {
    throw validation_error("Invalid request body");
  }
  return value as Record<string, unknown>;
}

function validation_error(message: string): StaffOrderError {
  return new StaffOrderError(422, "validation_error", message);
}

function staff_error(
  status: number,
  code: string,
  message: string,
  details?: unknown,
): Response {
  return private_json_response(
    { error: { code, message, ...(details === undefined ? {} : { details }) } },
    { status },
  );
}

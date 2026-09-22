import type { Env } from "./cloudflare_types";
import { get_config, public_config_response } from "./config";
import {
  error_response,
  json_response,
  method_not_allowed,
  no_store_headers,
  not_found,
} from "./http";
import {
  map_order_error,
  OrderBatchService,
} from "./services/order_batch_service";
import { test_access_response } from "./test_access";
import { route_auth_request } from "./routes/auth_routes";
import { route_staff_request } from "./routes/staff_routes";
import {
  is_staff_path,
  shared_staff_access_response,
  shared_staff_enabled,
} from "./security/shared_staff_access";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const shared_staff_route =
        shared_staff_enabled(env) &&
        is_staff_path(new URL(request.url).pathname);
      let access_response = shared_staff_route
        ? await shared_staff_access_response(request, env)
        : await test_access_response(request, env);
      // Staff credentials must also load the shared frontend assets without a visitor prompt.
      if (access_response && !shared_staff_route && shared_staff_enabled(env)) {
        if ((await shared_staff_access_response(request, env)) === null) {
          access_response = null;
        }
      }
      if (access_response) {
        return access_response;
      }
      const response = await route_request(request, env);
      if (shared_staff_route) {
        const headers = new Headers(response.headers);
        headers.set("cache-control", "no-store, private");
        headers.append("vary", "Authorization");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }
      return response;
    } catch {
      return error_response(500, "internal_error", "Internal server error");
    }
  },
};

async function route_request(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) {
    return env.ASSETS ? env.ASSETS.fetch(request) : not_found();
  }

  const auth_response = await route_auth_request(request, url, env);
  if (auth_response) {
    return auth_response;
  }

  const staff_response = await route_staff_request(request, url, env);
  if (staff_response) {
    return staff_response;
  }

  if (url.pathname === "/api/config") {
    if (request.method !== "GET") {
      return method_not_allowed();
    }
    return json_response(public_config_response(get_config(env)));
  }

  if (url.pathname === "/api/health") {
    if (request.method !== "GET") {
      return method_not_allowed();
    }
    return health_response(env, false);
  }

  if (url.pathname === "/api/ready") {
    if (request.method !== "GET") {
      return method_not_allowed();
    }
    return health_response(env, true);
  }

  if (url.pathname === "/api/order-batches") {
    if (request.method !== "POST") {
      return method_not_allowed();
    }
    return create_order_batch(request, env);
  }

  const public_order_match = url.pathname.match(
    /^\/api\/order-batches\/public\/([^/]+)$/,
  );
  if (public_order_match) {
    if (request.method !== "GET") {
      return method_not_allowed();
    }
    return get_public_order(env, decodeURIComponent(public_order_match[1]));
  }

  const public_image_match = url.pathname.match(
    /^\/api\/order-batches\/public\/([^/]+)\/items\/([^/]+)\/(print-image|thumbnail)$/,
  );
  if (public_image_match) {
    if (request.method !== "GET") {
      return method_not_allowed();
    }
    return get_public_image(
      env,
      decodeURIComponent(public_image_match[1]),
      decodeURIComponent(public_image_match[2]),
      public_image_match[3] === "print-image" ? "print" : "thumbnail",
    );
  }

  return not_found();
}

async function health_response(env: Env, ready: boolean): Promise<Response> {
  let database = "ok";
  let storage = "ok";
  try {
    await env.DB.prepare("SELECT 1").first();
  } catch {
    database = "unavailable";
  }
  try {
    await env.ORDER_IMAGES.get("__healthcheck__");
  } catch {
    storage = "unavailable";
  }

  const status = database === "ok" && storage === "ok" ? "ok" : "degraded";
  if (ready && status !== "ok") {
    return error_response(503, "service_not_ready", "Service is not ready", {
      database,
      storage,
    });
  }
  return json_response({
    status,
    database,
    storage,
    time: new Date().toISOString(),
  });
}

async function create_order_batch(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const form = await request.formData();
    const service = new OrderBatchService(env, get_config(env));
    return json_response(await service.create_order_batch(form), {
      status: 201,
    });
  } catch (error) {
    const mapped = map_order_error(error);
    return error_response(mapped.status, mapped.code, mapped.message);
  }
}

async function get_public_order(env: Env, token: string): Promise<Response> {
  try {
    const service = new OrderBatchService(env, get_config(env));
    return json_response(await service.get_public_status(token));
  } catch (error) {
    const mapped = map_order_error(error);
    return error_response(mapped.status, mapped.code, mapped.message);
  }
}

async function get_public_image(
  env: Env,
  token: string,
  item_code: string,
  image_kind: "print" | "thumbnail",
): Promise<Response> {
  try {
    const service = new OrderBatchService(env, get_config(env));
    const image = await service.get_public_image(token, item_code, image_kind);
    return new Response(image.body, {
      headers: no_store_headers(
        image.httpMetadata?.contentType ??
          (image_kind === "print" ? "image/png" : "image/jpeg"),
      ),
    });
  } catch (error) {
    const mapped = map_order_error(error);
    return error_response(mapped.status, mapped.code, mapped.message);
  }
}

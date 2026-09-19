import type { Env } from "../cloudflare_types";
import { private_json_response } from "../http";

// Staff authentication is enforced by the Worker before routing.
export async function route_auth_request(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/auth/")) return null;
  if (url.pathname !== "/api/auth/me")
    return private_json_response(
      { error: { code: "not_found", message: "Route not found" } },
      { status: 404 },
    );
  if (request.method !== "GET")
    return private_json_response(
      { error: { code: "method_not_allowed", message: "Method not allowed" } },
      { status: 405 },
    );
  return private_json_response({
    username: env.STAFF_ACCESS_USERNAME,
    displayName: "共有スタッフ",
  });
}

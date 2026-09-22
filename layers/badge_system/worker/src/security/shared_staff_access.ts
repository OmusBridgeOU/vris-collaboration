import type { Env } from "../cloudflare_types";
import { private_json_response } from "../http";
import type { AuthenticatedUser } from "../repositories/auth_repository";
import { matches_basic_credentials } from "./basic_auth";

export function shared_staff_enabled(env: Env): boolean {
  return env.STAFF_AUTH_MODE === "shared_basic";
}

export function is_staff_path(pathname: string): boolean {
  return (
    pathname.startsWith("/staff") ||
    pathname === "/api/staff" ||
    pathname.startsWith("/api/staff/") ||
    pathname === "/api/auth" ||
    pathname.startsWith("/api/auth/")
  );
}

export async function shared_staff_access_response(
  request: Request,
  env: Env,
): Promise<Response | null> {
  if (
    !shared_staff_enabled(env) ||
    !env.STAFF_ACCESS_PASSWORD ||
    env.STAFF_ACCESS_PASSWORD === env.TEST_ACCESS_PASSWORD
  ) {
    return rejection(503, "staff_access_not_configured");
  }
  const authorized = await matches_basic_credentials(
    request,
    env.STAFF_ACCESS_USERNAME ?? "staff",
    env.STAFF_ACCESS_PASSWORD,
  );
  if (!authorized) {
    const response = rejection(401, "staff_authentication_required");
    response.headers.set(
      "www-authenticate",
      'Basic realm="VRIS staff", charset="UTF-8"',
    );
    return response;
  }
  // Basic credentials are sent automatically by browsers, so mutations need CSRF protection.
  if (
    !["GET", "HEAD", "OPTIONS"].includes(request.method) &&
    request.headers.get("origin") !== new URL(request.url).origin
  ) {
    return rejection(403, "same_origin_required");
  }
  return null;
}

export function shared_staff_user(env: Env): AuthenticatedUser {
  return {
    id: "00000000-0000-4000-8000-000000000001",
    username: env.STAFF_ACCESS_USERNAME ?? "staff",
    display_name: "共有スタッフ",
    roles: ["reception", "production", "delivery"],
    auth_mode: "shared_basic",
  };
}

function rejection(status: number, code: string): Response {
  return private_json_response(
    { error: { code, message: "Staff access denied" } },
    { status },
  );
}

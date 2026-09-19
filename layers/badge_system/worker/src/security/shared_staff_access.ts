import type { Env } from "../cloudflare_types";
import { private_json_response } from "../http";
import { matches_basic_credentials } from "./basic_auth";

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
  if (!env.STAFF_ACCESS_USERNAME || !env.STAFF_ACCESS_PASSWORD)
    return rejection(503, "staff_access_not_configured");
  if (
    await matches_basic_credentials(
      request,
      env.STAFF_ACCESS_USERNAME,
      env.STAFF_ACCESS_PASSWORD,
    )
  )
    return null;
  const response = rejection(401, "staff_authentication_required");
  response.headers.set(
    "www-authenticate",
    'Basic realm="VRIS staff", charset="UTF-8"',
  );
  return response;
}

function rejection(status: number, code: string): Response {
  return private_json_response(
    { error: { code, message: "Staff access denied" } },
    { status },
  );
}

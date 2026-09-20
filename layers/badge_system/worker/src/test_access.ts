import type { Env } from "./cloudflare_types";
import { matches_basic_credentials } from "./security/basic_auth";

const default_username = "vris";

export async function test_access_response(
  request: Request,
  env: Env,
): Promise<Response | null> {
  if (env.TEST_ACCESS_REQUIRED !== "true") {
    return null;
  }

  if (!env.TEST_ACCESS_PASSWORD) {
    return new Response("Test access is not configured", {
      status: 503,
      headers: private_text_headers(),
    });
  }

  const expected_username = env.TEST_ACCESS_USERNAME ?? default_username;
  const authorized = await matches_basic_credentials(
    request,
    expected_username,
    env.TEST_ACCESS_PASSWORD,
  );

  if (authorized) {
    return null;
  }

  const headers = private_text_headers();
  headers.set("www-authenticate", 'Basic realm="VRIS test", charset="UTF-8"');
  return new Response("Authentication required", { status: 401, headers });
}

function private_text_headers(): Headers {
  return new Headers({
    "cache-control": "no-store, private",
    "content-type": "text/plain; charset=utf-8",
    "x-content-type-options": "nosniff",
  });
}

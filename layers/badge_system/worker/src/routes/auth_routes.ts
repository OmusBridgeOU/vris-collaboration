import type { Env } from "../cloudflare_types";
import { private_json_response } from "../http";
import {
  AuthError,
  AuthService,
  session_user_response,
} from "../services/auth_service";
import { expired_session_cookie, session_cookie } from "../security/sessions";
import { shared_staff_enabled } from "../security/shared_staff_access";

export async function route_auth_request(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/auth/")) {
    return null;
  }
  const service = new AuthService(env);
  try {
    if (
      shared_staff_enabled(env) &&
      ["/api/auth/login", "/api/auth/logout"].includes(url.pathname)
    ) {
      return auth_error(
        405,
        "shared_auth_uses_browser",
        "Use browser authentication",
      );
    }
    if (url.pathname === "/api/auth/login") {
      if (request.method !== "POST") {
        return auth_error(405, "method_not_allowed", "Method not allowed");
      }
      const payload = await login_payload(request);
      const result = await service.login(payload.username, payload.password);
      return private_json_response(session_user_response(result.user), {
        headers: {
          "set-cookie": session_cookie(
            result.session_token,
            secure_cookie(request, env),
          ),
        },
      });
    }

    if (url.pathname === "/api/auth/logout") {
      if (request.method !== "POST") {
        return auth_error(405, "method_not_allowed", "Method not allowed");
      }
      try {
        await service.audit_logout(await service.authenticate(request));
      } catch (error) {
        if (!(error instanceof AuthError) || error.status >= 500) {
          throw error;
        }
      }
      return private_json_response(
        { status: "ok" },
        {
          headers: {
            "set-cookie": expired_session_cookie(secure_cookie(request, env)),
          },
        },
      );
    }

    if (url.pathname === "/api/auth/me") {
      if (request.method !== "GET") {
        return auth_error(405, "method_not_allowed", "Method not allowed");
      }
      return private_json_response(
        session_user_response(await service.authenticate(request)),
      );
    }

    return auth_error(404, "not_found", "Route not found");
  } catch (error) {
    if (error instanceof AuthError) {
      return auth_error(error.status, error.code, error.message);
    }
    return auth_error(500, "internal_error", "Internal server error");
  }
}

function auth_error(status: number, code: string, message: string): Response {
  return private_json_response({ error: { code, message } }, { status });
}

async function login_payload(
  request: Request,
): Promise<{ username: string; password: string }> {
  let value: unknown;
  try {
    value = await request.json();
  } catch {
    throw new AuthError(422, "validation_error", "Request body must be JSON");
  }
  if (!is_record(value)) {
    throw new AuthError(422, "validation_error", "Invalid login request");
  }
  const keys = Object.keys(value);
  if (
    keys.some((key) => !["username", "password"].includes(key)) ||
    typeof value.username !== "string" ||
    typeof value.password !== "string"
  ) {
    throw new AuthError(422, "validation_error", "Invalid login request");
  }
  return { username: value.username, password: value.password };
}

function secure_cookie(request: Request, env: Env): boolean {
  return (
    env.APP_ENV === "production" || new URL(request.url).protocol === "https:"
  );
}

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

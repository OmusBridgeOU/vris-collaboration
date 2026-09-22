export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function json_response(
  body: unknown,
  init: ResponseInit = {},
): Response {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { ...init, headers });
}

export function error_response(
  status: number,
  code: string,
  message: string,
  details?: unknown,
): Response {
  return json_response(
    {
      error: {
        code,
        message,
        details,
      },
    } satisfies ApiErrorBody,
    { status },
  );
}

export function method_not_allowed(): Response {
  return error_response(405, "method_not_allowed", "Method not allowed");
}

export function not_found(): Response {
  return error_response(404, "not_found", "Route not found");
}

export function no_store_headers(content_type: string): Headers {
  const headers = new Headers();
  headers.set("content-type", content_type);
  headers.set("cache-control", "no-store, private");
  headers.set("x-content-type-options", "nosniff");
  return headers;
}

export function private_json_response(
  body: unknown,
  init: ResponseInit = {},
): Response {
  const headers = no_store_headers("application/json; charset=utf-8");
  new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  return new Response(JSON.stringify(body), { ...init, headers });
}

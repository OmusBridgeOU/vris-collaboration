import {
  base64url_decode,
  base64url_encode,
  hmac_sha256_bytes,
} from "../crypto";

export const session_cookie_name = "vris_staff_session";
export const session_ttl_seconds = 8 * 60 * 60;

type SessionClaims = {
  sub: string;
  iat: number;
  exp: number;
};

export async function create_session_token(
  user_id: string,
  secret: string,
  now = new Date(),
): Promise<string> {
  const issued_at = Math.floor(now.getTime() / 1000);
  const claims: SessionClaims = {
    sub: user_id,
    iat: issued_at,
    exp: issued_at + session_ttl_seconds,
  };
  const payload = base64url_encode(
    new TextEncoder().encode(JSON.stringify(claims)),
  );
  const signature = base64url_encode(await hmac_sha256_bytes(secret, payload));
  return `${payload}.${signature}`;
}

export async function read_session_token(
  token: string,
  secret: string,
  now = new Date(),
): Promise<SessionClaims | null> {
  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length > 0) {
    return null;
  }
  const expected = await hmac_sha256_bytes(secret, payload);
  let actual: Uint8Array;
  try {
    actual = base64url_decode(signature);
  } catch {
    return null;
  }
  if (!constant_time_equal(expected, actual)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      new TextDecoder().decode(base64url_decode(payload)),
    ) as Partial<SessionClaims>;
    const now_seconds = Math.floor(now.getTime() / 1000);
    if (
      typeof parsed.sub !== "string" ||
      typeof parsed.iat !== "number" ||
      typeof parsed.exp !== "number" ||
      parsed.exp <= now_seconds ||
      parsed.iat > now_seconds + 60
    ) {
      return null;
    }
    return parsed as SessionClaims;
  } catch {
    return null;
  }
}

export function read_session_cookie(request: Request): string | null {
  const cookie_header = request.headers.get("cookie");
  if (!cookie_header) {
    return null;
  }
  for (const entry of cookie_header.split(";")) {
    const separator = entry.indexOf("=");
    if (separator < 0) {
      continue;
    }
    const name = entry.slice(0, separator).trim();
    if (name === session_cookie_name) {
      return entry.slice(separator + 1).trim() || null;
    }
  }
  return null;
}

export function session_cookie(token: string, secure: boolean): string {
  return [
    `${session_cookie_name}=${token}`,
    "Path=/",
    `Max-Age=${session_ttl_seconds}`,
    "HttpOnly",
    "SameSite=Lax",
    secure ? "Secure" : null,
  ]
    .filter(Boolean)
    .join("; ");
}

export function expired_session_cookie(secure: boolean): string {
  return [
    `${session_cookie_name}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "SameSite=Lax",
    secure ? "Secure" : null,
  ]
    .filter(Boolean)
    .join("; ");
}

function constant_time_equal(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) {
    return false;
  }
  let difference = 0;
  for (let index = 0; index < left.byteLength; index += 1) {
    difference |= left[index] ^ right[index];
  }
  return difference === 0;
}

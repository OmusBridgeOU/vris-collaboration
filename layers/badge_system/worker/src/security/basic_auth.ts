export async function matches_basic_credentials(
  request: Request,
  username: string,
  password: string,
): Promise<boolean> {
  const authorization = request.headers.get("authorization");
  if (!authorization || authorization.length > 4096) {
    return false;
  }
  const match = /^Basic ([A-Za-z0-9+/]+={0,2})$/i.exec(authorization);
  if (!match) {
    return false;
  }
  try {
    const bytes = Uint8Array.from(atob(match[1]), (value) =>
      value.charCodeAt(0),
    );
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    const separator = decoded.indexOf(":");
    if (separator < 0) {
      return false;
    }
    const results = await Promise.all([
      secure_equal(decoded.slice(0, separator), username),
      secure_equal(decoded.slice(separator + 1), password),
    ]);
    return results.every(Boolean);
  } catch {
    return false;
  }
}

async function secure_equal(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [left_hash, right_hash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const left_bytes = new Uint8Array(left_hash);
  const right_bytes = new Uint8Array(right_hash);
  let difference = 0;
  for (let index = 0; index < left_bytes.length; index += 1) {
    difference |= left_bytes[index] ^ right_bytes[index];
  }
  return difference === 0;
}

import { base64url_decode, base64url_encode } from "../crypto";

const password_algorithm = "PBKDF2";
const password_hash_name = "SHA-256";
const default_iterations = 210_000;
const salt_bytes = 16;
const derived_key_bits = 256;

export async function hash_password(
  password: string,
  iterations = default_iterations,
): Promise<string> {
  if (!password) {
    throw new Error("Password must not be empty");
  }
  const salt = crypto.getRandomValues(new Uint8Array(salt_bytes));
  const derived = await derive_password(password, salt, iterations);
  return [
    "pbkdf2_sha256",
    iterations.toString(),
    base64url_encode(salt),
    base64url_encode(derived),
  ].join("$");
}

export async function verify_password(
  password: string,
  encoded_hash: string,
): Promise<boolean> {
  const [algorithm, raw_iterations, raw_salt, raw_expected, ...extra] =
    encoded_hash.split("$");
  const iterations = Number.parseInt(raw_iterations ?? "", 10);
  if (
    algorithm !== "pbkdf2_sha256" ||
    extra.length > 0 ||
    !Number.isSafeInteger(iterations) ||
    iterations < 1 ||
    !raw_salt ||
    !raw_expected
  ) {
    return false;
  }

  try {
    const actual = await derive_password(
      password,
      base64url_decode(raw_salt),
      iterations,
    );
    const expected = base64url_decode(raw_expected);
    return constant_time_equal(actual, expected);
  } catch {
    return false;
  }
}

async function derive_password(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    password_algorithm,
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: password_algorithm,
      hash: password_hash_name,
      salt: new Uint8Array(salt).buffer,
      iterations,
    },
    key,
    derived_key_bits,
  );
  return new Uint8Array(bits);
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

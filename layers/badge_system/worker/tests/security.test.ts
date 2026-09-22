import { describe, expect, it } from "vitest";

import { hash_password, verify_password } from "../src/security/passwords";
import { has_role } from "../src/security/roles";
import {
  create_session_token,
  read_session_token,
  session_ttl_seconds,
} from "../src/security/sessions";

describe("worker staff security", () => {
  it("hashes passwords without storing plaintext", async () => {
    const encoded = await hash_password("correct horse battery staple", 1_000);

    expect(encoded).toMatch(/^pbkdf2_sha256\$1000\$/);
    expect(encoded).not.toContain("correct horse battery staple");
    await expect(
      verify_password("correct horse battery staple", encoded),
    ).resolves.toBe(true);
    await expect(verify_password("wrong", encoded)).resolves.toBe(false);
  });

  it("signs sessions and rejects tampering and expiration", async () => {
    const issued_at = new Date("2026-08-26T00:00:00.000Z");
    const token = await create_session_token(
      "user-1",
      "test-session-secret",
      issued_at,
    );

    await expect(
      read_session_token(
        token,
        "test-session-secret",
        new Date(issued_at.getTime() + 60_000),
      ),
    ).resolves.toMatchObject({ sub: "user-1" });
    await expect(
      read_session_token(
        `${token}tampered`,
        "test-session-secret",
        new Date(issued_at.getTime() + 60_000),
      ),
    ).resolves.toBeNull();
    await expect(
      read_session_token(
        token,
        "test-session-secret",
        new Date(issued_at.getTime() + session_ttl_seconds * 1_000),
      ),
    ).resolves.toBeNull();
  });

  it("allows administrators to perform every staff role", () => {
    expect(has_role(["admin"], "reception")).toBe(true);
    expect(has_role(["production"], "production")).toBe(true);
    expect(has_role(["reception"], "delivery")).toBe(false);
  });
});

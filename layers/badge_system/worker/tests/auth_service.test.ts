import { describe, expect, it } from "vitest";

import type { Env } from "../src/cloudflare_types";
import type {
  AuthenticatedUser,
  LoginAttempt,
} from "../src/repositories/auth_repository";
import { hash_password } from "../src/security/passwords";
import {
  AuthError,
  AuthService,
  type AuthRepositoryPort,
} from "../src/services/auth_service";

class MemoryAuthRepository implements AuthRepositoryPort {
  user:
    | (AuthenticatedUser & { password_hash: string; is_active: boolean })
    | null = null;
  attempt: LoginAttempt | null = null;
  audits: string[] = [];

  async find_user_by_username(username: string) {
    return this.user?.username === username ? this.user : null;
  }

  async find_active_user_by_id(user_id: string) {
    return this.user?.id === user_id && this.user.is_active ? this.user : null;
  }

  async create_initial_admin(
    username: string,
    password_hash: string,
    _timestamp: string,
  ) {
    this.user = {
      id: "admin-1",
      username,
      password_hash,
      display_name: username,
      is_active: true,
      roles: ["admin"],
    };
  }

  async get_login_attempt() {
    return this.attempt;
  }

  async record_login_failure(
    _username: string,
    failure_count: number,
    locked_until: string | null,
    _timestamp: string,
  ) {
    this.attempt = { failure_count, locked_until };
  }

  async clear_login_failures() {
    this.attempt = null;
  }

  async write_audit_log(
    _user_id: string | null,
    action: string,
    _entity_type: string,
    _entity_id: string | null,
    _old_value: unknown,
    _new_value: unknown,
    _timestamp: string,
  ) {
    this.audits.push(action);
  }
}

describe("worker auth service", () => {
  it("logs in an active staff user and clears failures", async () => {
    const repository = new MemoryAuthRepository();
    repository.user = {
      id: "staff-1",
      username: "staff",
      password_hash: await hash_password("secret-password", 1_000),
      display_name: "受付スタッフ",
      is_active: true,
      roles: ["reception"],
    };
    repository.attempt = { failure_count: 2, locked_until: null };
    const service = new AuthService(test_env(), repository);

    const result = await service.login(
      "staff",
      "secret-password",
      new Date("2026-08-26T00:00:00.000Z"),
    );

    expect(result.user.roles).toEqual(["reception"]);
    expect(result.session_token).not.toContain("secret-password");
    expect(repository.attempt).toBeNull();
    expect(repository.audits).toContain("auth.login");
  });

  it("locks an account for five minutes after five failures", async () => {
    const repository = new MemoryAuthRepository();
    repository.user = {
      id: "staff-1",
      username: "staff",
      password_hash: await hash_password("correct", 1_000),
      display_name: "Staff",
      is_active: true,
      roles: ["reception"],
    };
    const service = new AuthService(test_env(), repository);
    const now = new Date("2026-08-26T00:00:00.000Z");

    for (let count = 1; count <= 4; count += 1) {
      await expect(service.login("staff", "wrong", now)).rejects.toMatchObject({
        status: 401,
      });
    }
    await expect(service.login("staff", "wrong", now)).rejects.toMatchObject({
      status: 429,
      code: "account_locked",
    } satisfies Partial<AuthError>);
    expect(repository.attempt?.failure_count).toBe(5);
    expect(repository.attempt?.locked_until).toBe("2026-08-26T00:05:00.000Z");
  });

  it("bootstraps the configured initial administrator without storing plaintext", async () => {
    const repository = new MemoryAuthRepository();
    const env = test_env();
    env.INITIAL_ADMIN_USERNAME = "admin";
    env.INITIAL_ADMIN_PASSWORD = "initial-secret";
    const service = new AuthService(env, repository);

    const result = await service.login("admin", "initial-secret");

    expect(result.user.roles).toEqual(["admin"]);
    expect(repository.user?.password_hash).not.toContain("initial-secret");
  });
});

function test_env(): Env {
  return {
    SESSION_SECRET: "test-session-secret",
  } as Env;
}

import type { D1Database } from "../cloudflare_types";

export type AuthenticatedUser = {
  id: string;
  username: string;
  display_name: string;
  roles: string[];
  auth_mode?: "shared_basic";
};

type UserRow = {
  id: string;
  username: string;
  password_hash: string;
  display_name: string;
  is_active: number;
};

export type LoginAttempt = {
  failure_count: number;
  locked_until: string | null;
};

export class AuthRepository {
  constructor(private readonly db: D1Database) {}

  async find_user_by_username(
    username: string,
  ): Promise<
    (AuthenticatedUser & { password_hash: string; is_active: boolean }) | null
  > {
    const user = await this.db
      .prepare(
        `SELECT id, username, password_hash, display_name, is_active
         FROM users WHERE username = ?1 LIMIT 1`,
      )
      .bind(username)
      .first<UserRow>();
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      password_hash: user.password_hash,
      display_name: user.display_name,
      is_active: user.is_active === 1,
      roles: await this.list_roles(user.id),
    };
  }

  async find_active_user_by_id(
    user_id: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.db
      .prepare(
        `SELECT id, username, password_hash, display_name, is_active
         FROM users WHERE id = ?1 AND is_active = 1 LIMIT 1`,
      )
      .bind(user_id)
      .first<UserRow>();
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      roles: await this.list_roles(user.id),
    };
  }

  async create_initial_admin(
    username: string,
    password_hash: string,
    timestamp: string,
  ): Promise<void> {
    const user_id = crypto.randomUUID();
    await this.db.batch([
      this.db
        .prepare(
          `INSERT OR IGNORE INTO users (
            id, username, password_hash, display_name, is_active, created_at, updated_at
          ) VALUES (?1, ?2, ?3, ?4, 1, ?5, ?5)`,
        )
        .bind(user_id, username, password_hash, username, timestamp),
      this.db
        .prepare(
          `INSERT OR IGNORE INTO user_roles (user_id, role_id)
           SELECT users.id, roles.id FROM users, roles
           WHERE users.username = ?1 AND roles.name = 'admin'`,
        )
        .bind(username),
    ]);
  }

  async get_login_attempt(username: string): Promise<LoginAttempt | null> {
    return this.db
      .prepare(
        "SELECT failure_count, locked_until FROM login_attempts WHERE username = ?1",
      )
      .bind(username)
      .first<LoginAttempt>();
  }

  async record_login_failure(
    username: string,
    failure_count: number,
    locked_until: string | null,
    timestamp: string,
  ): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO login_attempts (username, failure_count, locked_until, updated_at)
         VALUES (?1, ?2, ?3, ?4)
         ON CONFLICT(username) DO UPDATE SET
           failure_count = excluded.failure_count,
           locked_until = excluded.locked_until,
           updated_at = excluded.updated_at`,
      )
      .bind(username, failure_count, locked_until, timestamp)
      .run();
  }

  async clear_login_failures(username: string): Promise<void> {
    await this.db
      .prepare("DELETE FROM login_attempts WHERE username = ?1")
      .bind(username)
      .run();
  }

  async write_audit_log(
    user_id: string | null,
    action: string,
    entity_type: string,
    entity_id: string | null,
    old_value: unknown,
    new_value: unknown,
    timestamp: string,
  ): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO audit_logs (
          user_id, action, entity_type, entity_id, old_value, new_value, created_at
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`,
      )
      .bind(
        user_id,
        action,
        entity_type,
        entity_id,
        old_value === null ? null : JSON.stringify(old_value),
        new_value === null ? null : JSON.stringify(new_value),
        timestamp,
      )
      .run();
  }

  private async list_roles(user_id: string): Promise<string[]> {
    const result = await this.db
      .prepare(
        `SELECT roles.name AS name
         FROM roles
         JOIN user_roles ON user_roles.role_id = roles.id
         WHERE user_roles.user_id = ?1
         ORDER BY roles.name`,
      )
      .bind(user_id)
      .all<{ name: string }>();
    return (result.results ?? []).map((entry) => entry.name);
  }
}

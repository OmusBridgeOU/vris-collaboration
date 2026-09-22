import type { Env } from "../cloudflare_types";
import {
  AuthRepository,
  type AuthenticatedUser,
} from "../repositories/auth_repository";
import { hash_password, verify_password } from "../security/passwords";
import { is_staff } from "../security/roles";
import {
  shared_staff_access_response,
  shared_staff_enabled,
  shared_staff_user,
} from "../security/shared_staff_access";
import {
  create_session_token,
  read_session_cookie,
  read_session_token,
} from "../security/sessions";

const max_login_failures = 5;
const login_lockout_ms = 5 * 60 * 1000;

export class AuthError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export type LoginResult = {
  user: AuthenticatedUser;
  session_token: string;
};

export type AuthRepositoryPort = Pick<
  AuthRepository,
  | "find_user_by_username"
  | "find_active_user_by_id"
  | "create_initial_admin"
  | "get_login_attempt"
  | "record_login_failure"
  | "clear_login_failures"
  | "write_audit_log"
>;

export class AuthService {
  private readonly repository: AuthRepositoryPort;

  constructor(
    private readonly env: Env,
    repository?: AuthRepositoryPort,
  ) {
    this.repository = repository ?? new AuthRepository(env.DB);
  }

  async login(
    username: string,
    password: string,
    now = new Date(),
  ): Promise<LoginResult> {
    const normalized_username = username.trim();
    if (!normalized_username || !password) {
      throw new AuthError(
        422,
        "validation_error",
        "Username and password are required",
      );
    }
    const secret = this.session_secret();
    const timestamp = now.toISOString();
    const attempt =
      await this.repository.get_login_attempt(normalized_username);
    if (
      attempt?.locked_until &&
      new Date(attempt.locked_until).getTime() > now.getTime()
    ) {
      throw new AuthError(
        429,
        "account_locked",
        "Account is temporarily locked",
      );
    }

    let user = await this.repository.find_user_by_username(normalized_username);
    if (!user) {
      await this.maybe_create_initial_admin(normalized_username, timestamp);
      user = await this.repository.find_user_by_username(normalized_username);
    }

    const password_matches =
      user !== null &&
      user.is_active &&
      (await verify_password(password, user.password_hash));
    if (!password_matches || !user || !is_staff(user.roles)) {
      const failure_count =
        attempt?.locked_until &&
        new Date(attempt.locked_until).getTime() <= now.getTime()
          ? 1
          : (attempt?.failure_count ?? 0) + 1;
      const locked_until =
        failure_count >= max_login_failures
          ? new Date(now.getTime() + login_lockout_ms).toISOString()
          : null;
      await this.repository.record_login_failure(
        normalized_username,
        failure_count,
        locked_until,
        timestamp,
      );
      throw new AuthError(
        locked_until ? 429 : 401,
        locked_until ? "account_locked" : "invalid_credentials",
        locked_until
          ? "Account is temporarily locked"
          : "Invalid username or password",
      );
    }

    await this.repository.clear_login_failures(normalized_username);
    await this.repository.write_audit_log(
      user.id,
      "auth.login",
      "user",
      user.id,
      null,
      { status: "success" },
      timestamp,
    );
    return {
      user,
      session_token: await create_session_token(user.id, secret, now),
    };
  }

  async authenticate(
    request: Request,
    now = new Date(),
  ): Promise<AuthenticatedUser> {
    if (shared_staff_enabled(this.env)) {
      const rejection = await shared_staff_access_response(request, this.env);
      if (rejection) {
        throw new AuthError(
          rejection.status,
          "staff_access_denied",
          "Staff access denied",
        );
      }
      return shared_staff_user(this.env);
    }
    const raw_token = read_session_cookie(request);
    if (!raw_token) {
      throw new AuthError(
        401,
        "authentication_required",
        "Authentication required",
      );
    }
    const claims = await read_session_token(
      raw_token,
      this.session_secret(),
      now,
    );
    if (!claims) {
      throw new AuthError(401, "invalid_session", "Invalid or expired session");
    }
    const user = await this.repository.find_active_user_by_id(claims.sub);
    if (!user || !is_staff(user.roles)) {
      throw new AuthError(
        401,
        "authentication_required",
        "Authentication required",
      );
    }
    return user;
  }

  async audit_logout(user: AuthenticatedUser, now = new Date()): Promise<void> {
    await this.repository.write_audit_log(
      user.id,
      "auth.logout",
      "user",
      user.id,
      null,
      { status: "success" },
      now.toISOString(),
    );
  }

  private session_secret(): string {
    if (!this.env.SESSION_SECRET || this.env.SESSION_SECRET === "change-me") {
      throw new AuthError(
        503,
        "service_not_configured",
        "Staff authentication is not configured",
      );
    }
    return this.env.SESSION_SECRET;
  }

  private async maybe_create_initial_admin(
    username: string,
    timestamp: string,
  ): Promise<void> {
    if (
      !this.env.INITIAL_ADMIN_USERNAME ||
      !this.env.INITIAL_ADMIN_PASSWORD ||
      username !== this.env.INITIAL_ADMIN_USERNAME
    ) {
      return;
    }
    await this.repository.create_initial_admin(
      username,
      await hash_password(
        this.env.INITIAL_ADMIN_PASSWORD,
        password_iterations(this.env.PASSWORD_PBKDF2_ITERATIONS),
      ),
      timestamp,
    );
  }
}

export function session_user_response(user: AuthenticatedUser) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    roles: [...user.roles].sort(),
    authMode: user.auth_mode ?? "session",
  };
}

function password_iterations(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isSafeInteger(parsed) && parsed >= 100_000 ? parsed : 210_000;
}

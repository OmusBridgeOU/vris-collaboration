import assert from "node:assert/strict";
import { test } from "node:test";
import { audit_file } from "./share_audit.mjs";

test("rejects runtime files, env variants, databases, and private configs", () => {
  for (const path of [
    ".git/config",
    ".env.production",
    ".envrc",
    "frontend/.dev.vars",
    ".pnpm-store/index.db",
    "backup.sqlite",
    "key.pem",
    "wrangler.production.json",
    "deployment_secrets.json",
    ".codex-vite.out.log",
  ]) {
    assert.ok(audit_file(path, Buffer.from("")).length, path);
  }
});

test("finds sensitive material without returning its value", () => {
  const samples = [
    "https://private.account." + "workers.dev",
    "https://private." + "pages.dev",
    "-----BEGIN " + "PRIVATE KEY-----",
    "ghp_" + "a".repeat(36),
    ["C:", "Users", "private", "source"].join("/"),
    ["vris", "badge", "test"].join("-"),
  ];
  for (const value of samples) {
    const findings = audit_file("sample.txt", Buffer.from(value));
    assert.ok(findings.length);
    assert.ok(!findings.join().includes(value));
  }
});

test("retains public example configuration and synthetic test fixtures", () => {
  assert.deepEqual(
    audit_file(
      "wrangler.production.example.json",
      Buffer.from('{"APP_BASE_URL":"https://badge.example.com"}'),
    ),
    [],
  );
  assert.deepEqual(
    audit_file(
      "worker/tests/example.test.ts",
      Buffer.from('const password = "synthetic-test-only";'),
    ),
    [],
  );
});

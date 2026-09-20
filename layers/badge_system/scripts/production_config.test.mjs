import assert from "node:assert/strict";
import { test } from "node:test";
import { production_config, deployment_secrets } from "./production_config.mjs";

export const fixture = {
  WORKER_NAME: "badge-fixture",
  CLOUDFLARE_ACCOUNT_ID: "0".repeat(32),
  APP_BASE_URL: "https://badge.example.test",
  PRODUCTION_CUSTOM_DOMAIN: "true",
  D1_DATABASE_NAME: "badge_fixture",
  D1_DATABASE_ID: "00000000-0000-4000-8000-000000000000",
  ORDER_IMAGES_BUCKET: "fixture-order-images",
  STAFF_ACCESS_USERNAME: "fixture-staff",
};

test("production protects staff assets and requires separate secrets", () => {
  const config = production_config(fixture);
  assert.equal(config.assets.run_worker_first, true);
  assert.equal(config.assets.not_found_handling, "single-page-application");
  assert.equal(config.workers_dev, false);
  assert.equal(config.preview_urls, false);
  assert.deepEqual(config.routes, [
    { pattern: "badge.example.test", custom_domain: true },
  ]);
  assert.deepEqual(config.secrets.required, [
    "PUBLIC_TOKEN_SECRET",
    "STAFF_ACCESS_PASSWORD",
  ]);
  assert.equal(config.vars.STAFF_ACCESS_PASSWORD, undefined);
  assert.equal(config.vars.STAFF_AUTH_MODE, "shared_basic");
  assert.equal(config.triggers, undefined);
  assert.equal(config.r2_buckets.length, 1);
  assert.equal(config.r2_buckets[0].binding, "ORDER_IMAGES");
});

test("missing production inputs fail without printing their contents", () => {
  for (const key of Object.keys(fixture).filter(
    (key) => key !== "PRODUCTION_CUSTOM_DOMAIN",
  )) {
    assert.throws(
      () => production_config({ ...fixture, [key]: "" }),
      new RegExp(key),
    );
  }
  assert.throws(
    () => production_config({ ...fixture, WORKER_NAME: "private\nvalue" }),
    { message: "Missing or invalid WORKER_NAME" },
  );
});

test("unsafe or placeholder origins and config injection are rejected", () => {
  for (const origin of [
    "http://badge.example.test",
    "https://badge.example.com",
    "https://user:password@badge.example.test",
    "https://badge.example.test/path",
    "https://badge.example.test?secret=value",
  ]) {
    assert.throws(() =>
      production_config({ ...fixture, APP_BASE_URL: origin }),
    );
  }
  assert.throws(() =>
    production_config({
      ...fixture,
      ORDER_IMAGES_BUCKET: 'bucket", "public": true',
    }),
  );
});

test("Workers hostname must match the configured Worker", () => {
  const origin = "https://badge-fixture.account." + "workers.dev";
  const config = production_config({
    ...fixture,
    APP_BASE_URL: origin,
    PRODUCTION_CUSTOM_DOMAIN: "false",
  });
  assert.equal(config.workers_dev, true);
  assert.equal(config.routes, undefined);
  assert.throws(() =>
    production_config({
      ...fixture,
      APP_BASE_URL: origin,
      WORKER_NAME: "other",
      PRODUCTION_CUSTOM_DOMAIN: "false",
    }),
  );
});

test("secrets must be long and different, and never become config vars", () => {
  const secrets = {
    PUBLIC_TOKEN_SECRET: "a".repeat(40),
    STAFF_ACCESS_PASSWORD: "b".repeat(40),
  };
  assert.deepEqual(deployment_secrets(secrets), secrets);
  assert.throws(() =>
    deployment_secrets({ ...secrets, STAFF_ACCESS_PASSWORD: "short" }),
  );
  assert.throws(() =>
    deployment_secrets({
      ...secrets,
      STAFF_ACCESS_PASSWORD: secrets.PUBLIC_TOKEN_SECRET,
    }),
  );
  assert.throws(() => deployment_secrets({}));
  assert.ok(
    !JSON.stringify(production_config({ ...fixture, ...secrets })).includes(
      secrets.PUBLIC_TOKEN_SECRET,
    ),
  );
});

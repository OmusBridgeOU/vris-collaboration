import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const template_url = new URL(
  "../wrangler.production.example.json",
  import.meta.url,
);

function required(env, name, pattern) {
  const value = env[name];
  if (!value || !pattern.test(value)) {
    throw new Error(`Missing or invalid ${name}`);
  }
  return value;
}

export function production_config(env) {
  const config = JSON.parse(readFileSync(template_url, "utf8"));
  config.name = required(env, "WORKER_NAME", /^[a-z][a-z0-9-]{0,62}$/);
  config.account_id = required(env, "CLOUDFLARE_ACCOUNT_ID", /^[a-f0-9]{32}$/i);
  const base_url = required(env, "APP_BASE_URL", /^https:\/\/[a-z0-9.-]+\/?$/);
  const url = new URL(base_url);
  if (
    !url.hostname.includes(".") ||
    /(^|\.)example\.(com|net|org)$/.test(url.hostname)
  ) {
    throw new Error("APP_BASE_URL must be the actual production HTTPS origin");
  }
  config.vars.APP_BASE_URL = url.origin;
  config.vars.STAFF_ACCESS_USERNAME = required(
    env,
    "STAFF_ACCESS_USERNAME",
    /^[a-zA-Z0-9_.-]{1,64}$/,
  );
  config.d1_databases[0].database_name = required(
    env,
    "D1_DATABASE_NAME",
    /^[a-zA-Z0-9_-]{1,64}$/,
  );
  config.d1_databases[0].database_id = required(
    env,
    "D1_DATABASE_ID",
    /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i,
  );
  config.r2_buckets[0].bucket_name = required(
    env,
    "ORDER_IMAGES_BUCKET",
    /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/,
  );
  if (env.PRODUCTION_CUSTOM_DOMAIN === "true") {
    config.workers_dev = false;
    config.routes = [{ pattern: url.hostname, custom_domain: true }];
  } else {
    if (
      env.PRODUCTION_CUSTOM_DOMAIN &&
      env.PRODUCTION_CUSTOM_DOMAIN !== "false"
    ) {
      throw new Error("PRODUCTION_CUSTOM_DOMAIN must be true or false");
    }
    const hostname_parts = url.hostname.split(".");
    if (
      hostname_parts.length !== 4 ||
      hostname_parts[0] !== config.name ||
      hostname_parts.slice(-2).join(".") !== "workers.dev"
    ) {
      throw new Error(
        "APP_BASE_URL must match WORKER_NAME and the account Workers subdomain, or enable PRODUCTION_CUSTOM_DOMAIN",
      );
    }
  }
  return config;
}

export function deployment_secrets(env) {
  const secrets = {};
  for (const key of ["PUBLIC_TOKEN_SECRET", "STAFF_ACCESS_PASSWORD"]) {
    secrets[key] = required(env, key, /^[^\r\n]{32,}$/);
  }
  if (secrets.PUBLIC_TOKEN_SECRET === secrets.STAFF_ACCESS_PASSWORD) {
    throw new Error("Production secrets must be different");
  }
  return secrets;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  try {
    const config = production_config(process.env);
    const secret_path = process.argv[2];
    const secrets = secret_path ? deployment_secrets(process.env) : undefined;
    writeFileSync(
      new URL("../wrangler.production.json", import.meta.url),
      `${JSON.stringify(config, null, 2)}\n`,
      { mode: 0o600 },
    );
    if (secret_path) {
      writeFileSync(secret_path, JSON.stringify(secrets), {
        mode: 0o600,
        flag: "wx",
      });
    }
    console.log("Production configuration prepared; values omitted.");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

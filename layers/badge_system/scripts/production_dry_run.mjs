import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { production_config } from "./production_config.mjs";

// Synthetic values only; no account access or migration is performed.
const config = production_config({
  WORKER_NAME: "badge-fixture",
  CLOUDFLARE_ACCOUNT_ID: "0".repeat(32),
  APP_BASE_URL: "https://badge.example.test",
  PRODUCTION_CUSTOM_DOMAIN: "true",
  D1_DATABASE_NAME: "badge_fixture",
  D1_DATABASE_ID: "00000000-0000-4000-8000-000000000000",
  ORDER_IMAGES_BUCKET: "fixture-order-images",
  STAFF_ACCESS_USERNAME: "fixture-staff",
});
const project_root = fileURLToPath(new URL("../", import.meta.url));
config.main = resolve(project_root, config.main);
config.assets.directory = resolve(project_root, config.assets.directory);
config.d1_databases[0].migrations_dir = resolve(
  project_root,
  config.d1_databases[0].migrations_dir,
);
const temporary_root = resolve(project_root, ".wrangler");
mkdirSync(temporary_root, { recursive: true });
const scratch = mkdtempSync(join(temporary_root, "badge_dry_run_"));
if (!resolve(scratch).startsWith(temporary_root + sep)) {
  throw new Error("Dry-run directory is outside the temporary root");
}
const config_path = join(scratch, "wrangler.json");
try {
  writeFileSync(config_path, JSON.stringify(config), { flag: "wx" });
  execFileSync(
    process.execPath,
    [
      resolve(project_root, "frontend/node_modules/wrangler/bin/wrangler.js"),
      "deploy",
      "--dry-run",
      "--config",
      config_path,
      "--outdir",
      scratch,
    ],
    {
      cwd: project_root,
      stdio: "inherit",
      env: {
        ...process.env,
        CLOUDFLARE_API_TOKEN: "",
        CLOUDFLARE_ACCOUNT_ID: "",
        WRANGLER_SEND_METRICS: "false",
        WRANGLER_LOG_PATH: join(scratch, "wrangler.log"),
      },
    },
  );
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

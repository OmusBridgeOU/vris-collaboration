import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import sharedConfig, { basicConfig } from "../../eslint.config.shared.mjs";

export default defineConfig(
  ...sharedConfig,
  ...tseslint.configs.recommended,
  basicConfig,
);

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const api_proxy_target =
  process.env.VITE_API_PROXY_TARGET ?? "http://127.0.0.1:8787";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": api_proxy_target,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup_tests.ts",
    exclude: ["tests/e2e/**", "node_modules/**", "dist/**"],
  },
});

/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      include: ["app/**/*.{ts,tsx}"],
      reportsDirectory: "./vitest/coverage",
    },
  },
});

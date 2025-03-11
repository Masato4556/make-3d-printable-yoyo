import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  base: "/",
  plugins: [reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ["react-use"],
  },
});

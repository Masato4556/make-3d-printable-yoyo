import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@react-router/node" {
  // or cloudflare, deno, etc.
}

export default defineConfig({
  base: "/",
  plugins: [reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ["react-use"],
  },
});

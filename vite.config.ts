import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";

import { copyFileSync } from "node:fs";
import { join } from "node:path";

installGlobals();

export default defineConfig({
  base: "/",
  plugins: [
    remix({
      presets: [vercelPreset()],
      ssr: false,
      basename: "/",
      buildEnd: (args) => {
        if (!args.viteConfig.isProduction) return;
        const buildPath = args.viteConfig.build.outDir;
        copyFileSync(
          join(buildPath, "index.html"),
          join(buildPath, "404.html") // 全てが index.html に行かない場合があるので、念の為
        );
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ["react-use"],
  },
});

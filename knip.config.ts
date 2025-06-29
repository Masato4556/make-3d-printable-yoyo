import type { KnipConfig } from "knip";
const config: KnipConfig = {
  entry: ["app/routes/**/*.tsx"],

  project: [
    "app/**/*.ts",
    "app/**/*.tsx",
    "app/**/*.scss",
    "public/**/*.json",
    "public/**/*.svg",
  ],

  /**
   * Exclude files or directories from being analyzed.
   */
  ignore: [
    "node_modules",
    "build",
    ".git",
    ".vercel",
    ".react-router",
    "dependency-graph.svg",
    "package-lock.json",
  ],
};

export default config;

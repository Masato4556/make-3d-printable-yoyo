import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import pluginImport from "eslint-plugin-import";

const cleanCodeRules = {
  "no-constant-binary-expression": "error",
  "no-constructor-return": "error",
  "no-self-compare": "error",
  "no-template-curly-in-string": "error",
  "no-unmodified-loop-condition": "error",
  "arrow-body-style": ["error", "as-needed"],
  complexity: ["error", 8],
  "default-case": "error",
  "default-case-last": "error",
  eqeqeq: ["error", "always"],
  // 最終的にはfunction宣言かアロー関数のどちらかに統一する
  "func-style": ["error", "declaration", { allowArrowFunctions: true }],
  "max-classes-per-file": ["error", 1],
  "max-lines": [
    "error",
    { max: 200, skipComments: false, skipBlankLines: false },
  ],
  "max-lines-per-function": [
    "error",
    { max: 70, skipComments: false, skipBlankLines: false },
  ],
  "max-params": ["error", 4],
  "no-alert": "error",
  "no-else-return": ["error", { allowElseIf: false }],
  "no-eval": "error",
  "no-floating-decimal": "error",
  "no-inline-comments": "error",
  "no-multi-assign": "error",
  "no-nested-ternary": "error",
  "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
  "no-unneeded-ternary": "error",

  "object-shorthand": "error",
  "prefer-arrow-callback": "error",
  "prefer-destructuring": "error",
  "prefer-object-spread": "error",
  "prefer-template": "error",
  yoda: "error",

  // 貧血オブジェクト対策
  "class-methods-use-this": "warn",
  "no-empty-function": "warn",
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "!**/.server",
      "!**/.client",
      ".react-router/**/*",
      ".dependency-cruiser.cjs",
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  { files: ["**/*.{js,jsx,ts,tsx}"], rules: cleanCodeRules },

  // React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
    plugins: {
      react: pluginReact,
      "jsx-a11y": pluginJsxA11y,
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,

      "react/no-unknown-property": "off",
    },
  },

  // Typescript
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": pluginTypeScript,
      import: pluginImport,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,
      ...pluginImport.configs.typescript.rules,
    },
  },
];

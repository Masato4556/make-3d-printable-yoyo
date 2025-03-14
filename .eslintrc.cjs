/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/no-unknown-property": [
      "error",
      { ignore: ["css", "args", "wireframe"] },
    ],
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
    "func-style": ["error", "declaration", { allowArrowFunctions: true }], // 最終的にはfunction宣言かアロー関数のどちらかに統一する
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
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ["!**/.server", "!**/.client", ".react-router/**/*"],

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
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
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "react/no-unknown-property": "off",
      },
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};

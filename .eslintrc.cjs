// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unsafe-return": [
      "warn",
      { argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-unsafe-assignment": [
      "warn",
      { argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-unsafe-member-access": [
      "warn",
      { argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-unsafe-call": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/restrict-template-expressions": [
      "warn",
      { argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/restrict-plus-operands": [
      "warn",
      { argsIgnorePattern: "^_" },
    ],
  },
};

module.exports = config;

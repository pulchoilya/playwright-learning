module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // для TS
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended", // базовые правила JS
    "plugin:@typescript-eslint/recommended", // правила TS
    "plugin:playwright/playwright-test", // правила Playwright
    "plugin:prettier/recommended", // Prettier интеграция
  ],
  plugins: ["@typescript-eslint", "prettier", "playwright"],
  rules: {
    "no-console": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  ignorePatterns: [
    "node_modules/",
    "test-results/",
    "playwright-report/",
    "**/*.snap",
  ],
};
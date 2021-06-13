module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:jest/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    "no-tabs": 2,
    quotes: ["warn", "single"],
    "no-useless-constructor": 0,
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
  },
  ignorePatterns: [".eslintrc.js"],
};

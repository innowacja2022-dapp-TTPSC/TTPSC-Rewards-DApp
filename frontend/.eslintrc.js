/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:testing-library/react",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:typescript-sort-keys/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: ["tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [],
  rules: {
    "no-await-in-loop": "error",
    "no-constant-binary-expression": "error",
    "no-duplicate-imports": "error",
    "no-self-compare": "error",
    "no-use-before-define": "error",
    curly: "error",
    eqeqeq: ["error", "smart"],
    "max-params": ["error", 3],
    "no-console": "warn",
    "no-lonely-if": "error",
    "no-else-return": "error",
    "no-unneeded-ternary": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "require-await": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
        custom: {
          regex: "^(I|T|E)[A-Z]",
          match: false,
        },
      },
    ],
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { enforceForJSX: true },
    ],
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-sort-props": "error",
    "react/no-multi-comp": "error",
    "react/jsx-boolean-value": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

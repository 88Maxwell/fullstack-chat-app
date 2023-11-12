module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    project: ["./tsconfig.json"],
  },
  plugins: ["react-refresh"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/no-cycle": 0,
    "import/extensions": 0,
    "react/react-in-jsx-scope": 0,
    "no-console": "error",
    "react/jsx-filename-extension": 0,
    "linebreak-style": 0,
    "space-infix-ops": [
      2,
      {
        int32Hint: true,
      },
    ],
    "key-spacing": [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
        multiLine: {
          beforeColon: true,
          afterColon: true,
          align: "colon",
        },
      },
    ],
    "react/jsx-indent": ["error", 2],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "react/jsx-indent-props": ["error", 2],
    "@typescript-eslint/quotes": [
      2,
      "double",
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/indent": ["error", 2],
    "object-curly-spacing": ["warn", "always"],
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none",
      },
    ],
    "@typescript-eslint/no-explicit-any": [
      "error",
      {
        ignoreRestArgs: true,
      },
    ],
    "max-len": [
      "warn",
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*", "!@mui/material/test-utils/*"],
      },
    ],
    "import/no-extraneous-dependencies": 0,
    "react/jsx-key": "error",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/jsx-boolean-value": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-wrap-multilines": "off",
    "react/destructuring-assignment": "off",
    "no-console": "warn"
  },
};

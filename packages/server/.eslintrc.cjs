module.exports = {
  extends        : ["airbnb-base", "airbnb-typescript/base"],
  ignorePatterns : ["dist", ".eslintrc.cjs"],
  parser         : "@typescript-eslint/parser",
  parserOptions  : {
    project : ["./packages/server/tsconfig.json"],
  },
  rules : {
    "import/no-cycle"   : 0,
    "import/extensions" : 0,
    "linebreak-style"   : 0,
    "space-infix-ops"   : [
      2,
      {
        int32Hint : true,
      },
    ],
    "key-spacing" : [
      2,
      {
        singleLine : {
          beforeColon : false,
          afterColon  : true,
        },
        multiLine : {
          beforeColon : true,
          afterColon  : true,
          align       : "colon",
        },
      },
    ],
    "@typescript-eslint/quotes" : [
      2,
      "double",
      {
        avoidEscape : true,
      },
    ],
    "@typescript-eslint/indent" : ["error", 2],
    "object-curly-spacing"      : ["warn", "always"],
    "no-unused-vars"            : [
      "warn",
      {
        vars : "all",
        args : "none",
      },
    ],
    "@typescript-eslint/no-unused-vars" : [
      "warn",
      {
        vars : "all",
        args : "none",
      },
    ],
    "@typescript-eslint/no-explicit-any" : [
      "error",
      {
        ignoreRestArgs : true,
      },
    ],
    "max-len" : [
      "warn",
      {
        code                   : 120,
        ignoreStrings          : true,
        ignoreTemplateLiterals : true,
        ignoreComments         : true,
      },
    ],
    "no-shadow"                    : "off",
    "@typescript-eslint/no-shadow" : "error",
    "no-plusplus"                  : [
      "error",
      {
        allowForLoopAfterthoughts : true,
      },
    ],
    "no-restricted-imports" : [
      "error",
      {
        patterns : ["@mui/*/*/*", "!@mui/material/test-utils/*"],
      },
    ],
    "import/no-extraneous-dependencies" : 0,
    "import/prefer-default-export"      : "off",
    "no-console"                        : "warn",
  },
};

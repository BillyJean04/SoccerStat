module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ["react", "react-refresh", "simple-import-sort", "import"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/react-in-jsx-scope": [
      "off"
    ],
    "react/require-render-return": [
      "error"
    ],
    "react/self-closing-comp": [
      "error"
    ],
    "react/no-array-index-key": [
      "error"
    ],
    "react/jsx-sort-props": [
      "error",
      {
        "callbacksLast": true,
        "shorthandFirst": true,
        "ignoreCase": true,
        "multiline": "last",
        "reservedFirst": true
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
}

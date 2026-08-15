export default [
  {
    ignores: ["assets/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        IntersectionObserver: "readonly",
        window: "readonly",
      },
    },
    rules: {
      eqeqeq: "error",
      "no-undef": "error",
      "no-unused-vars": "warn",
      "prefer-const": "warn",
    },
  },
];

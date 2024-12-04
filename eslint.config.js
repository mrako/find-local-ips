module.exports = [
  {
    files: ["**/*.js"], // Define file patterns
    languageOptions: {
      ecmaVersion: "latest", // Enable modern ECMAScript features
      sourceType: "module", // Enable ES modules
    },
    rules: {
      semi: ["error", "always"], // Enforce semicolons
      "comma-dangle": ["error", "always-multiline"], // Enforce dangling commas
    },
  },
];

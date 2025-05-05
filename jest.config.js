module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/tests/**/*.test.js"],
  moduleNameMapper: {
    "^~/(.*)": "<rootDir>/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@rn-primitives|react-native-.*)/)",
  ],
  setupFiles: ["./tests/setup.js"],
};

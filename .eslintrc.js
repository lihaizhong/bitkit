module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true
  },
  sourceType: "module",
  extends: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  plugins: ["html", "jest", "node"],
  rules: {}
}

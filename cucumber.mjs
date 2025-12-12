export default {
  paths: ["tests/features/**/*.feature"],
  import: [
    "tests/steps/**/*.js",
    "tests/support/**/*.js"
  ],
  format: ["progress"],
  parallel: 1,
  timeout: 60000
};

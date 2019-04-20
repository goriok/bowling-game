module.exports = function(config) {
  config.set({
    mutate: ['bowling.js'],
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text", "progress", "dashboard"],
    testRunner: "jest"
  });
};

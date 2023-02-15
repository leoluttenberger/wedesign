const { config } = require("./wdio.shared.conf.ts");

exports.config = {
  /**
   * base config
   */
  ...config,
  /**
   * config for local testing
   */
  maxInstances: 1,
  services: ["chromedriver", "geckodriver"],
  capabilities: [
    {
      browserName: "chrome",
      acceptInsecureCerts: true,
    },
    {
      browserName: "firefox",
      acceptInsecureCerts: true,
    },
  ],
};

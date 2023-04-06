import { defineConfig } from "cypress";
const cypressSplit = require("cypress-split");

require("dotenv").config();

const setEnvironment = () => {
  const baseEnvironment = {
    TEST_AUTOMATION_USERNAME: process.env.TEST_AUTOMATION_USERNAME,
    TEST_AUTOMATION_PASSWORD: process.env.TEST_AUTOMATION_PASSWORD,
    region: process.env.region || "us-west-2",
    userPoolId: process.env.userPoolId,
    userPoolWebClientId: process.env.userPoolWebClientId,
  };

  switch (process.env.ENVIRONMENT) {
    case "production":
      return {
        ...baseEnvironment,
        environmentUrl: "https://dash.prod.postsalez.com",
      };

    case "staging":
      return {
        ...baseEnvironment,
        environmentUrl: "https://dash.staging.postsalez.com",
      };

    case "local":
      return {
        ...baseEnvironment,
        environmentUrl: "https://dash.dev.postsalez.com",
      };

    default:
      return {
        ...baseEnvironment,
        environmentUrl: "https://dash.dev.postsalez.com",
      };
  }
};

export default defineConfig({
  env: setEnvironment(),
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      return config
    },
  },
});

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
        environmentUrl: "https://app.prod.postsalez.com",
      };

    case "staging":
      return {
        ...baseEnvironment,
        environmentUrl: "https://app.staging.postsalez.com",
      };

    case "local":
      return {
        ...baseEnvironment,
        environmentUrl: "https://app.dev.magnify.io",
      };

    default:
      return {
        ...baseEnvironment,
        environmentUrl: "https://app.dev.magnify.io",
      };
  }
};

export default defineConfig({
  env: setEnvironment(),
  viewportWidth: 1920,
  viewportHeight: 1080,
  ...(process.env.CYPRESS_PROJECT_ID && {
    projectId: process.env.CYPRESS_PROJECT_ID,
  }),
  e2e: {
    setupNodeEvents(on, config) {
      cypressSplit(on, config);
      return config;
    },
  },
  video: true,
  // to avoid false positive tests because of lazy back-end response
  defaultCommandTimeout: 15000,
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 3,
  },
});

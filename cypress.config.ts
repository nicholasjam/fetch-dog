import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  allowCypressEnv: false,

  expose: {
    apiUrl: 'https://petstore.swagger.io/v2',
  },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/results',
    reportFilename: 'report.html',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    quiet: false,
  },

  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {},
    screenshotOnRunFailure: true,
    video: false,
  },
});

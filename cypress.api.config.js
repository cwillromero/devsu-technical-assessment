const { defineConfig } = require('cypress');

module.exports = defineConfig({
    allowCypressEnv: false,
    e2e: {
        baseUrl: 'https://petstore.swagger.io/v2',
        specPattern: 'cypress/api/**/*.cy.js',
        supportFile: 'cypress/support/e2e.js',
        setupNodeEvents(on, config) {
            return config;
        },
    },
});

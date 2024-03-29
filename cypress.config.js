const {defineConfig} = require('cypress');
const {config} = require('./package.json');

module.exports = defineConfig({
  videosFolder: 'test/cypress/videos',
  video: false,
  screenshotsFolder: 'test/cypress/screenshots',
  fixturesFolder: 'test/cypress/fixtures',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./test/cypress/plugins/index.js')(on, config)
    },
    specPattern: 'test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/cypress/support/index.js',
    baseUrl: 'http://localhost:' + config.testPort,
    testIsolation: false
  },
});

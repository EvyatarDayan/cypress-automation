const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1400,
  viewportHeight: 1000,
  scrollBehavior: false,
  failOnStatusCode: false,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  video: false,
  waitForAnimations: false,
  videoUploadOnPasses: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: '/usr/share/nginx/reports',
    html: true,
    toConsole: true,
  },
  projectId: '9zx4si',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})

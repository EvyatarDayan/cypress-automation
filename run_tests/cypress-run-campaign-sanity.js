// cypress-run-campaign-sanity.js

const cypress = require('cypress');

cypress.run({

  spec: './cypress/integration/tests/sanity/campaign/**/*.spec.js',
  reporter: 'junit',
  browser: 'chrome',
  // headed: true,

  config: {
    video: true,
  },

})
  .catch((err) => {
    console.error(err);
  });

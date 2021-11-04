// cypress-run-interaction-sanity.js

const cypress = require('cypress');

cypress.run({

  spec: './cypress/integration/tests/sanity/portal/media/sanity-portal-interactions.spec.js',
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

// cypress-run-users-sanity.js

const cypress = require('cypress');

cypress.run({

  spec: './cypress/integration/tests/playground/CICD/*.spec.js',
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

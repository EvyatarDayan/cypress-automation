// cypress-run-users-sanity.js

const cypress = require('cypress');

cypress.run({

  spec: './cypress/integration/tools/ynet/*.js',
  reporter: 'junit',
  browser: 'chrome',
  headed: false,

  config: {
    video: false,
  },

})

  .catch((err) => {
    console.error(err);
  });

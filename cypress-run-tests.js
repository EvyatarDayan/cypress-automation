// cypress-run-users-sanity.js

const cypress = require('cypress');

const [service, cla] = process.argv.slice(-2);
const testMapping = require('./service-test-mapping');

if (!service) {
  console.error('No service provided');
  process.exit(1);
}
const testsToRun = testMapping[service];
if (!testMapping[service]) {
  console.error('No tests for provided service');
  process.exit(1);
}

cypress.run({
  spec: './cypress/integration/tests/CICD/*.spec.js',
  // browser: 'chrome',
  config: {
    baseUrl: 'https://portal.apester.com',
    video: true,
  },
  env: {
    login_url: '/auth/login',
  },
})

  .catch((err) => {
    console.error(err);
  });

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
  spec: testsToRun,
  // browser: 'chrome'  ,
  headless: true,

  config: {
    baseUrl: 'https://portal.apester.com',
    video: false,
  },
  env: {
    login_url: '/auth/login',
  },
  exit: true
}).then((results) => {
  if (results.totalFailed > 0) {
    process.exit(2);
  }
  process.exit(0);
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

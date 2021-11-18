// cypress-run-users-sanity.js

const cypress = require('cypress');
const marge = require('mochawesome-report-generator');
const { merge } = require('mochawesome-merge');

const [service] = process.argv.slice(-2);
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
const dateString = (new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '').replace(/[ |/]/g, '-');
const randomTestNum = Math.round(Math.random() * 100000);
const currentDirName = `${dateString}-${randomTestNum}`;
const testDirName = `/usr/share/nginx/reports/${currentDirName}/`;
// const testDirName = `./to_delete/cypress-tests/${currentDirName}/`;
const logTestsResult = (result) => {
  console.log(`${result.totalTests} Tests ran.\n
${result.totalPassed} passed!\n
${result.totalFailed} failed!
 Full report - ${process.env.CYPRESS_REPORTS_PUBLIC_URL}/${currentDirName}/mochawesome.html
`);
};
const generateReport = async (options) => merge(options).then(async (report) => {
  try {
    await marge.create(report, { reportDir: testDirName,
      json: false,
      html: true,
      toConsole: false,
      consoleReporter: 'none'

    });
  } catch (e) {
    console.log(e);
  }
});
cypress.run({
  spec: testsToRun,
  // browser: 'chrome',
  quiet: false,
  config: {
    baseUrl: process.env.PORTAL_PUBLIC_URL,
    video: false,
    viewportWidth: 1400,
    viewportHeight: 1000,
    scrollBehavior: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    chromeWebSecurity: false,
    reporter: 'mochawesome',
    reporterOptions: {
      // reportDir: '/usr/share/nginx/reports',
      reportDir: testDirName,
      json: true,
      html: false,
      toConsole: false,
      overwrite: false,
      quiet: false,
      consoleReporter: 'none'
    },
  },

}).then(async (result) => {
  if (result.failures) {
    console.log('Could not execute tests');
    console.log(result.message);
    process.exit(result.failures);
  }
  await generateReport({ files: [`${testDirName}/*.json`] });
  logTestsResult(result);
  // print test results and exit
  // with the number of failed tests as exit code
  // std output link to report + descriptive msg.
  process.exit(result.totalFailed);
})
  .catch(async (err) => {
    console.log(err);
    console.log('Failed to run tests');
    await generateReport({ files: [`${testDirName}/*.json`] });
    process.exit(1);
  });

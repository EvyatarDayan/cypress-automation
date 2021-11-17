// cypress-run-users-sanity.js

const {
  open,
} = require('fs/promises');
const cypress = require('cypress');
const { Reporter } = require('./src/reporter/reporter');

const [jobName] = process.argv.slice(-1);
const jobsMapping = require('./jobs-mapping');

const slack = process.env.CYPRESS_JOBS_SLACK_URL ? { url: process.env.CYPRESS_JOBS_SLACK_URL } : undefined;

const reporter = new Reporter({ slack });
if (!jobName) {
  console.error('No job provided');
  process.exit(1);
}
const jobToRun = jobsMapping[jobName];
if (!jobsMapping[jobName]) {
  console.error('No tests for provided service');
  process.exit(1);
}

const dateString = (new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(',', '').replace(/[ |/]/g, '-');
const reportDir = `${jobName}__${dateString}`;

const dateStringWithHour = (new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' }).replace(',', '').replace(/[ |/]/g, '-');
const randomJobNum = Math.round(Math.random() * 100000);

const reportName = `${jobName}__${dateStringWithHour}__${randomJobNum}.txt`;
// const testDirName = `./to_delete/cypress-tests/${currentDirName}/`;
const reportPath = `./jobs-results/${reportDir}/${reportName}`;
cypress.run({
  spec: jobToRun,
  // browser: 'chrome',
  quiet: true,
  config: {
    env: {
      reportPath
    },
    video: false,
    viewportWidth: 1400,
    viewportHeight: 1000,
    scrollBehavior: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    chromeWebSecurity: false,
    reporterOptions: {
      // reportDir: '/usr/share/nginx/reports',
      // reportDir: testDirName,
      json: true,
      html: false,
      toConsole: false,
      overwrite: false,
      quiet: true,
      consoleReporter: 'none'
    },
  },

}).then(async () => {
  const file = await open(reportPath);
  const result = await file.readFile('utf8');
  // report to slack / email / whatever
  await reporter.report(result);
  await file.close();
  // print test results and exit
  // with the number of failed tests as exit code
  // std output link to report + descriptive msg.
  process.exit(result.totalFailed);
})
  .catch(async (err) => {
    console.log(err);
    console.log('Failed to run tests');

    process.exit(1);
  });
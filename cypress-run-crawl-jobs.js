// cypress-run-users-sanity.js

const {
  open,
} = require('fs/promises');
const cypress = require('cypress');
const { Reporter } = require('./src/reporter/reporter');

const [jobName] = process.argv.slice(-1);
const jobsMapping = require('./jobs-mapping');

console.log('Starting to run crawl job updated');

const slack = process.env.CYPRESS_JOBS_SLACK_URL ? { url: process.env.CYPRESS_JOBS_SLACK_URL } : undefined;

const reporter = new Reporter({ slack });
if (!jobName) {
  console.error('No job provided ');
  process.exit(1);
}
const jobToRun = jobsMapping[jobName];
if (!jobsMapping[jobName]) {
  console.error('No tests for provided service');
  process.exit(1);
}

console.log('Starting to run crawl job');
const dateString = (new Date()).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Jerusalem' }).replace(',', '').replace(/[ |/]/g, '-');
const reportDir = `${jobName}__${dateString}`;

const dateStringWithHour = (new Date()).toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', timeZone: 'Asia/Jerusalem' }).replace(',', '').replace(/[ |/]/g, '-');
const randomJobNum = Math.round(Math.random() * 100000);

const reportName = `${jobName}__${dateStringWithHour}__${randomJobNum}.txt`;
// const testDirName = `./to_delete/cypress-tests/${currentDirName}/`;
const reportPath = `./jobs-results/${reportDir}/${reportName}`;
console.log(`The spec to run ${jobToRun}`);
// console.log(`Aniview email - ${process.env.CYPRESS_ANIVIEW_EMAIL}, Aniview pass - ${process.env.CYPRESS_ANIVIEW_PASSWORD}`,);

cypress.run({
  spec: jobToRun,
  // browser: 'chrome',
  quiet: true,
  // noExit: true,
  config: {
    env: {
      REPORT_PATH: reportPath,
      PORTAL_PUBLIC_URL: 'https://portal.apester.com',
      CAMPAIGN_MANAGER_PUBLIC_URL: 'https://campaign.apester.com',
      CAMPAIGN_PUBLIC_URL: 'https://campaign-api.apester.com',
      USERS_PUBLIC_URL: 'https://users.apester.com'
    },
    video: false,
    viewportWidth: 1400,
    viewportHeight: 1000,
    scrollBehavior: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    chromeWebSecurity: false,
    // reporter: 'mochawesome',

    reporterOptions: {
      // reportDir: '/usr/share/nginx/reports',
      // reportDir: testDirName,
      json: true,
      html: false,
      toConsole: true,
      overwrite: false,
      quiet: true,
    },
  },

});
.then(async () => {
  try {
    console.log('Finished running');
    const file = await open(reportPath);
    const result = await file.readFile('utf8');
    // report to slack / email / whatever
    await reporter.report(result);
    await file.close();
  // print test results and exit
  // with the number of failed tests as exit code
  // std output link to report + descriptive msg.
  } catch (e) {
    console.log('Failed to run task 1');
    console.log(e);
    await reporter.report('Failed to run task');
  }
  process.exit(0);
})
  .catch(async (err) => {
    console.log('Failed to run task');
    console.log(err);
    await reporter.report('Failed to run task');
    process.exit(1);
  });

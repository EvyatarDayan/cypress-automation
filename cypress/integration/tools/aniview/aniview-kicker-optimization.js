const dayjs = require('dayjs');
// const res = require('../../../support/res');
console.log('start running kicker optimization job 1');

const reportPath = Cypress.env('REPORT_PATH');
const aniviewEmail = Cypress.env('ANIVIEW_EMAIL');
const aniviewPass = Cypress.env('ANIVIEW_PASSWORD');

const apesterAdminEmail = Cypress.env('APESTER_ADMIN_EMAIL');
const apesterAdminPassword = Cypress.env('APESTER_ADMIN_PASSWORD');

const reportName = 'Kicker Ver. 2';
const currentDate = (new Date()).toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'Asia/Jerusalem' });
const currentDateForReport = (new Date()).toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' }).replace(',', '');
const selectedTime = dayjs().format('HH') - 4; // Current time - 4 (considering time difference)

const timeframe = `${currentDate} ${selectedTime}:00 - ${currentDate} ${selectedTime}:00`;
const percentageDIffAllowed = 10;
const isNullish = (val) => typeof val === 'null' || val === '' || typeof val === 'undefined';
describe('Aniview kicker optimization', () => {
  before(() => {
    Cypress.Cookies.defaults({
      preserve: ['userSession', 'qmerceSession'],
    });
  });
  beforeEach(() => {

  });

  it('Step 1 - Aniview - Login', { retries: { runMode: 3, } }, () => {
    cy
      .goto('https://manage.aniview.com/login?redirectTo=%2F&accessRedirect=true')
      .waitForVisibleElement('#id', 20000)
      .typeValue('#id', aniviewEmail)
      .typeValue('#password', aniviewPass)
      .clickOn('button')
      .waitForVisibleElement(':nth-child(6) > a > .text', 70000);
    Cypress.Cookies.preserveOnce('token');
    cy.log('Login to aniview was successful!');
  });

  it('Step 2 - Aniview - Navigate to the report', { retries: { runMode: 3, } }, () => {
    cy
      .clickOn(':nth-child(6) > a > .text') // Click on reports in the menu
      .typeValue('.sb-search-input', reportName).waitFor(3000) // Add value in the search field
      .clickOn('.icon-edit') // Click on edit report
      .scrollToElement('#custom-range')
      .clearValue('#custom-range')
      .typeValue('#custom-range', timeframe) // Add the timeframe
      .scrollToElement('.button-save')
      .clickOn('.button-save')
      .waitFor(1000)
      .clickOn('.icon-viewReport')
    // Wait for the results to display
      .waitForVisibleElement('.table > :nth-child(2) > :nth-last-child(2) > :nth-child(3)', 120000);
  });

  it('Step 3 - Aniview - Get the revenues', { retries: { runMode: 3, } }, () => {
    // Viewability with No SC
    cy.get('body').find('.table > :nth-child(2) > :nth-last-child(2) > :nth-child(3)').invoke('text').then((noSCRevenue) => {
      cy.task('log', 'Got aniview report without Smartclip');
      const isRevenueValid = noSCRevenue !== '' && noSCRevenue !== null && !Number.isNaN(Number(noSCRevenue));
      if (!isRevenueValid) {
        cy.task('log', 'ERROR: Fail to get aniview report.');
        return;
      }
      // Remove decimal and round
      const sanitizeNoSCRevenue = Number(noSCRevenue);
      // Push results to "task" container
      cy.task('setNOSCRevenue', sanitizeNoSCRevenue);
    });

    // Viewability with SC
    cy.get('body').find('.table > :nth-child(2) > :nth-last-child(1) > :nth-child(3)').invoke('text').then((SCRevenue) => {
      cy.task('log', 'Got aniview report with smartclip');
      const isRevenueValid = SCRevenue !== '' && SCRevenue !== null && !Number.isNaN(Number(SCRevenue));
      if (!isRevenueValid) {
        cy.task('log', 'ERROR: Fail to get aniview report.');
        return;
      }
      // Remove decimal and round
      const SCSanitizeRevnue = Number(SCRevenue);
      // Push results to "task" container
      cy.task('setWithSCRevenue', SCSanitizeRevnue);
    });
  });
  // // ---------------------------------------------------------------------------------------------------------

  it('step 4 - Apester - Login', { retries: { runMode: 3, } }, () => {
    // cy.log(`Login to Apester ${apesterAdminEmail} ${apesterAdminPassword}`);
    // cy.log(`is production ${isProduction}`);
    // cy.task('log', `is production? ${isProduction}`);
    cy.task('log', `portal url ${Cypress.env('PORTAL_PUBLIC_URL')}`);
    cy.loginWithNoUI(apesterAdminEmail, apesterAdminPassword);
  });

  const campaignId = '614b2ebb9b24bb000c77652b';

  it('step 5 - Apester - Get the campaign percentage split via API', { retries: { runMode: 3, } }, () => {
    // Get the response body (including the Alternative B percentage value)
    cy.intercept({
      method: 'GET',
      url: `campaigns/${campaignId}`,
      hostname: `${Cypress.env('CAMPAIGN_PUBLIC_URL').replace('https://', '')}`,
    }, (req) => {
      req.alias = campaignId;
      console.log(req.body);
    });

    // Open the campaign editor
    cy.goto(`${Cypress.env('CAMPAIGN_MANAGER_PUBLIC_URL')}/#/video-campaign/${campaignId}`)
      .waitForVisibleElement('[model="collapsableUI.video"] > .header > .title', 20000).clickOn('[model="collapsableUI.video"] > .header > .title')
      .waitFor(500)
      .scrollToPosition(0, 300);

    // Get the Alternative B percentage value
    cy.wait(`@${campaignId}`).then((interception) => {
      const altBValue = interception.response.body.payload.campaignOptions.videoOptions.players[0].alternativePlayers[0].percentage;
      // Push results to "task" container
      cy.task('setAlternativeB', altBValue);

      // Calculate Alternative A base on alternative B.
      const altA = (100 - altBValue);
      // Push results to "task" container
      cy.task('setAlternativeA', altA);
    });
  });

  it('step 6 - Apester - Revenue report before count (the alternative %) and round (to integer)', () => {
    cy.task('getAllSavedValues').then((vals) => {
      const NormaliseRevenueWithoutSC = (vals.NOSCRevenue / vals.alternativeA);
      const NormaliseRevWithSC = (vals.withSCRevenue / vals.alternativeB);

      const inputsForCalculation = `=Calculation Logic= \n
      NO Smartclip revenue is: ${vals.NOSCRevenue}
      WIth Smartclip revenue is: ${vals.withSCRevenue}
      Apester Campaign alternativeA(%) - without Smartclip is: ${vals.alternativeA}
      Apester Campaign alternativeB(%) - with Smartclip is: ${vals.alternativeB}
      Apester Normalised revenue without Smartclip: ${NormaliseRevenueWithoutSC}
      Apester Normalised revenue with Smartclip: ${NormaliseRevWithSC}
      \n=Calculation Logic End= \n\n`;

      cy.writeFile(reportPath, `${inputsForCalculation}`, { flag: 'a+' });

      cy.task('setNormaliseRevenueWithoutSC', NormaliseRevenueWithoutSC); // NOSCRevenueAfterCountAndRound
      cy.task('setNormaliseRevWithSC', NormaliseRevWithSC); // withSCRevenueAfterCountAndRound

      cy.task('log', `=myLog= NOSCRevenue is: ${JSON.stringify(vals.NOSCRevenue)}`);
      cy.task('log', `=myLog= withSCRevenue is: ${JSON.stringify(vals.withSCRevenue)}`);
      cy.task('log', `=myLog= alternativeA(%) is: ${JSON.stringify(vals.alternativeA)}`);
      cy.task('log', `=myLog= alternativeB(%) is: ${JSON.stringify(vals.alternativeB)}`);
    });
  });

  // it('step 7 - Apester - revenue count (alternative %) and round (to integer)', () => {
  //   // NOSCRevenue
  //   cy.task('getAllSavedValues').then((vals) => {
  //     const NOSCRevenueAfterCount = (vals.NOSCRevenue / vals.alternativeA);
  //     const NOSCRevenueAfterCountAndRound = Number(NOSCRevenueAfterCount);
  //     // cy.log(`=myLog= NOSCRevenue after count and round: ${NOSCRevenueAfterCountAndRound}`);
  //     // Push results to "task" container
  //     cy.task('setNOSCRevenueAfterCountAndRound', NOSCRevenueAfterCountAndRound); // NOSCRevenueAfterCountAndRound
  //   });

  //   // withSCRevenue
  //   cy.task('getAllSavedValues').then((vals) => {
  //     const withSCRevenueAfterCount = (vals.withSCRevenue / vals.alternativeB);
  //     const withSCRevenueAfterCountAndRound = Math.round(withSCRevenueAfterCount);
  //     cy.task('log', `=myLog= withSCRevenue after count and round: ${withSCRevenueAfterCountAndRound}`);

  //     // Push results to "task" container
  //     cy.task('setwithSCRevenueAfterCountAndRound', withSCRevenueAfterCountAndRound); // withSCRevenueAfterCountAndRound
  //   });
  // });

  it('step 7 - Apester - Update campaign allocation', { retries: { runMode: 3, } }, () => {
    // -------------------------------------------- Calculate the difference -------------------------------------------
    cy.task('getAllSavedValues').then(({ normaliseRevWithSC, normaliseRevenueWithoutSC }) => {
      // const sum = vals.normaliseRevenueWithoutSC + vals.normaliseRevWithSC; // sum of both numbers
      // const diff = Math.abs(vals.normaliseRevenueWithoutSC - vals.normaliseRevWithSC); // absolute difference between both numbers
      const precentageDiffBetweenSCandNoSC = Math.round(((normaliseRevWithSC / normaliseRevenueWithoutSC) - 1) * 100);

      cy.task('log', `=myLog=: Percentage difference is: ${precentageDiffBetweenSCandNoSC}%`);
      // Push results to "task" container
      cy.task('setPrecentageDiffBetweenSCandNoSC', precentageDiffBetweenSCandNoSC);
    });
    // -----------------------------------------------------------------------------------------------------------------

    cy.task('getAllSavedValues').then(({
      NOSCRevenue,
      withSCRevenue,
      alternativeA,
      alternativeB,
      normaliseRevWithSC,
      normaliseRevenueWithoutSC,
      precentageDiffBetweenSCandNoSC
    } = {}) => {
      const isInvalid = isNullish(NOSCRevenue)
      || isNullish(withSCRevenue)
      || isNullish(alternativeA)
      || isNullish(alternativeB)
      || isNullish(normaliseRevWithSC)
      || isNullish(normaliseRevenueWithoutSC)
      || isNullish(precentageDiffBetweenSCandNoSC)
      || isNullish(NOSCRevenue) || isNullish(withSCRevenue) || isNullish(withSCRevenue);

      cy.writeFile(reportPath, '\n==== Decision (Virtual, no real change) ===\n', { flag: 'a+' });

      if (isInvalid) {
        cy.writeFile(reportPath, 'Issue with one of the report values, aborting..', { flag: 'a+' });
        return;
      }
      // -------------------------------------------- Case 1 -----------------------------------------------------------
      // When "NOSCRevenue" is lower than "withSCRevenue" and difference between both is higher than percentageDIffAllowed (20%)
      cy.task('log', `=myLog=: NOSCRevenue : ${NOSCRevenue}`);
      cy.task('log', `=myLog=: withSCRevenue : ${withSCRevenue}`);
      cy.task('log', `=myLog=: alternativeA: ${alternativeA}`);
      cy.task('log', `=myLog=: alternativeB: ${alternativeB}`);
      cy.task('log', `=myLog=: Normielized revnue without Smartclip: ${normaliseRevenueWithoutSC}`);
      cy.task('log', `=myLog=:  Normielized revnue with Smartclip: ${normaliseRevWithSC}`);
      if (precentageDiffBetweenSCandNoSC > (100 + percentageDIffAllowed)) {
        // SC is better.

        const alternativeBUpdatedValue = 90;
        cy.task('log', '=myLog=: Using case 1');
        // Update alternativeB% value
        // cy.clearValue('#input_48')
        //   .typeValue('#input_48', alternativeBUpdatedValue);
        // // Scroll down and save the campaign
        // cy.scrollToPosition(0, 5000)
        //   .clickOn('[ng-disabled="form.$invalid || (!onlyBottomEnabled && invalidNoYieldStrategy)"]') // Click on save campaign
        //   .waitForVisibleElement('[ng-if=success]', 10000); // Validate success message

        //  Report
        const latestResults = `${currentDateForReport}: [INFO] "NO SC Revenue" (${normaliseRevenueWithoutSC}) is lower than "with SC Revenue" (${normaliseRevWithSC}) -> Alternative B updated to: ${alternativeBUpdatedValue}%`;
        const PercentageDiffForLog = `${currentDateForReport}: [INFO] SC is perfroming ${Math.abs(precentageDiffBetweenSCandNoSC) - 100}% better than without SC.\n`;
        cy.writeFile(reportPath, `\n${PercentageDiffForLog}`, { flag: 'a+' });
        cy.writeFile(reportPath, `\n${latestResults}`, { flag: 'a+' });
        cy.task('log', `=myLog=: saving file to path  - ${reportPath}`);

        // -------------------------------------------- Case 2 -----------------------------------------------------------
        // When "NOSCRevenue" is higher than "withSCRevenue" and difference between both is higher than percentageDIffAllowed (20%)
      } else if (precentageDiffBetweenSCandNoSC < (100 - percentageDIffAllowed)) {
        // No SC is better

        const alternativeBUpdatedValue = 10;
        cy.task('log', '=myLog=: Using case 2');
        // Update alternativeB% value
        // cy.clearValue('#input_48')
        //   .typeValue('#input_48', alternativeBUpdatedValue);
        // // Scroll down and save the campaign
        // cy.scrollToPosition(0, 5000)
        //   .clickOn('[ng-disabled="form.$invalid || (!onlyBottomEnabled && invalidNoYieldStrategy)"]') // Click on save campaign
        //   .waitForVisibleElement('[ng-if=success]', 10000); // Validate success message

        //  Report
        const latestResults = `${currentDateForReport}: [INFO] "NO SC Revenue" (${normaliseRevenueWithoutSC}) is higher than "with SC Revenue" (${normaliseRevWithSC}) -> Alternative B updated to: ${alternativeBUpdatedValue}%`;
        const PercentageDiffForLog = `${currentDateForReport}: [INFO] SC is perfroming ${100 - Math.abs(precentageDiffBetweenSCandNoSC)}% worse than without SC.\n`;
        cy.writeFile(reportPath, `\n${PercentageDiffForLog}`, { flag: 'a+' });
        cy.writeFile(reportPath, `${latestResults}`, { flag: 'a+' });
        cy.task('log', `=myLog=: saving file to path  - ${reportPath}`);
        // eslint-disable-next-line brace-style
      }

      // -------------------------------------------- Case 3 -----------------------------------------------------------
      // When "diffAsPercentageAfterRound" is lower or equal to "percentageDIffAllowed"
      else if ((precentageDiffBetweenSCandNoSC - 100) <= percentageDIffAllowed) {
        // SC and no SC is equal

        const alternativeBUpdatedValue = 50;
        cy.task('log', '=myLog=: Using case 3');
        // Update alternativeB% value
        // cy.clearValue('#input_48')
        //   .typeValue('#input_48', alternativeBUpdatedValue);
        // // Scroll down and save the campaign
        // cy.scrollToPosition(0, 5000)
        //   .clickOn('[ng-disabled="form.$invalid || (!onlyBottomEnabled && invalidNoYieldStrategy)"]') // Click on save campaign
        //   .waitForVisibleElement('[ng-if=success]', 10000); // Validate success message

        //  Report
        const latestResults = `${currentDateForReport}: [INFO] "Without Smartclip Revenue" (${normaliseRevenueWithoutSC}) is pretty equal to "with Smartclip revenue" (${normaliseRevWithSC}) -> Alternative B updated to: ${alternativeBUpdatedValue}%\n`;
        const PercentageDiffForLog = `${currentDateForReport}: [INFO] Revenue difference between Smartclip and no Smartclip is ${100 - Math.abs(precentageDiffBetweenSCandNoSC)}%\n`;
        // cy.log(latestResults);
        cy.writeFile(reportPath, `${latestResults}`, { flag: 'a+' });
        cy.writeFile(reportPath, `\n${PercentageDiffForLog}`, { flag: 'a+' });
        cy.task('log', `=myLog=: saving file to path  - ${reportPath}`);
      }
    });
  });
});

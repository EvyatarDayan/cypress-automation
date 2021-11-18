const dayjs = require('dayjs');
// const res = require('../../../support/res');

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
const percentageDIffAllowed = 20;
let isProduction;

describe('Aniview kicker optimization', () => {
  before(() => {
    isProduction = Cypress.env('NODE_ENV') === 'production';
  });

  it('Step 1 - Aniview - Login', () => {
    cy.log(`Login to Aniview ${aniviewEmail} ${aniviewPass}`);

    cy
      .goto('https://manage.aniview.com/login?redirectTo=%2F&accessRedirect=true')
      .waitForVisibleElement('#id', 20000)
      .typeValue('#id', aniviewEmail)
      .typeValue('#password', aniviewPass)
      .clickOn('button');
    Cypress.Cookies.preserveOnce('token');

    cy.log('Logged into Aniview');
  });

  it('Step 2 - Aniview - Navigate to the report', () => {
    cy
      .waitForVisibleElement(':nth-child(6) > a > .text', 20000)
      .clickOn(':nth-child(6) > a > .text') // Click on reports in the menu
      .typeValue('.sb-search-input', reportName).waitFor(2000) // Add value in the search field
      .clickOn('.icon-edit') // Click on edit report
      .scrollToElement('#custom-range')
      .clearValue('#custom-range')
      .typeValue('#custom-range', timeframe) // Add the timeframe
      .scrollToElement('.button-save')
      .clickOn('.button-save')
      .waitFor(1000)
      .clickOn('.icon-viewReport')
    // Wait for the results to display
      .waitForVisibleElement('.table > :nth-child(2) > :nth-last-child(2) > :nth-child(3)', 30000);

    // todo: Need to kill the test in case "NO DATA" report return from kicker

    cy.log('Navigated to report on Aniview');

    // cy.get('body').then((body) => {                              // it exist do...
    //     if (body.find('.table > :nth-child(2) > :nth-last-child(2) > :nth-child(3)').length <= 0) {
    //         cy.pauseHere()
    //     }
    // });

    // if (section > h3 exist){
    //     throw Error("Fail to display aniview report, aborting...")
    // }
  });

  it('Step 3 - Aniview - Get the revenues', () => {
    // Viewability with No SC
    cy.get('body').find('.table > :nth-child(2) > :nth-last-child(2) > :nth-child(3)').invoke('text').then((viewabilityWithNoSC) => {
      // Remove decimal and round
      const viewabilityWithNoSCFinal = Math.round(viewabilityWithNoSC);
      // Push results to "task" container
      cy.task('setNOSCRevenue', viewabilityWithNoSCFinal);
    });

    // Viewability with SC
    cy.get('body').find('.table > :nth-child(2) > :nth-last-child(1) > :nth-child(3)').invoke('text').then((viewabilityWithSC) => {
      // Remove decimal and round
      const viewabilityWithSCFinal = Math.round(viewabilityWithSC);
      // Push results to "task" container
      cy.task('setWithSCRevenue', viewabilityWithSCFinal);
    });
  });

  // ---------------------------------------------------------------------------------------------------------

  it('step 4 - Apester - Login', () => {
    cy.log(`Login to Apester ${apesterAdminEmail} ${apesterAdminPassword}`);
    cy.log(`is production ${isProduction}`);

    cy
      .loginToPortal(apesterAdminEmail, apesterAdminPassword)
      .preserveCookie(isProduction ? 'userSession' : 'automationApesterSession');
  });

  const campaignId = isProduction ? '614b2ebb9b24bb000c77652b' : '616d2fffbe0dfc002afbec0c';

  it('step 5 - Apester - Get the campaign percentage split via API', () => {
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
    cy.goto(`${Cypress.env('CAMPAIGN_MANAGER_PUBLIC_URL')}/#/video-campaign/${campaignId}`);

    // Click on the video title
    cy.clickOn('[model="collapsableUI.video"] > .header > .title')
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
      cy.log(`=myLog= NOSCRevenue is: ${JSON.stringify(vals.NOSCRevenue)}`);
      cy.log(`=myLog= withSCRevenue is: ${JSON.stringify(vals.withSCRevenue)}`);
      cy.log(`=myLog= alternativeA(%) is: ${JSON.stringify(vals.alternativeA)}`);
      cy.log(`=myLog= alternativeB(%) is: ${JSON.stringify(vals.alternativeB)}`);
    });
  });

  it('step 7 - Apester - revenue count (alternative %) and round (to integer)', () => {
    // NOSCRevenue
    cy.task('getAllSavedValues').then((vals) => {
      const NOSCRevenueAfterCount = (vals.NOSCRevenue / vals.alternativeA);
      const NOSCRevenueAfterCountAndRound = Math.round(NOSCRevenueAfterCount);
      cy.log(`=myLog= NOSCRevenue after count and round: ${NOSCRevenueAfterCountAndRound}`);
      // Push results to "task" container
      cy.task('setNOSCRevenueAfterCountAndRound', NOSCRevenueAfterCountAndRound); // NOSCRevenueAfterCountAndRound
    });

    // withSCRevenue
    cy.task('getAllSavedValues').then((vals) => {
      const withSCRevenueAfterCount = (vals.withSCRevenue / vals.alternativeB);
      const withSCRevenueAfterCountAndRound = Math.round(withSCRevenueAfterCount);
      cy.log(`=myLog= withSCRevenue after count and round: ${withSCRevenueAfterCountAndRound}`);
      // Push results to "task" container
      cy.task('setwithSCRevenueAfterCountAndRound', withSCRevenueAfterCountAndRound); // withSCRevenueAfterCountAndRound
    });
  });

  it('step 8 - Apester - Update campaign allocation', () => {
    // -------------------------------------------- Calculate the difference -------------------------------------------
    cy.task('getAllSavedValues').then((vals) => {
      const sum = vals.NOSCRevenueAfterCountAndRound + vals.withSCRevenueAfterCountAndRound; // sum of both numbers
      const diff = Math.abs(vals.NOSCRevenueAfterCountAndRound - vals.withSCRevenueAfterCountAndRound); // absolute difference between both numbers

      // eslint-disable-next-line no-mixed-operators
      const diffAsPercentage = diff * 100 / sum;
      const diffAsPercentageAfterRound = Math.round(diffAsPercentage); // Round the decimal number to integer
      cy.log(`=myLog= Percentage difference is: ${diffAsPercentageAfterRound}%`);
      // Push results to "task" container
      cy.task('setDiffAsPercentageAfterRound', diffAsPercentageAfterRound);
    });
    // -----------------------------------------------------------------------------------------------------------------

    cy.task('getAllSavedValues').then((vals) => {
      // -------------------------------------------- Case 1 -----------------------------------------------------------
      // When "NOSCRevenue" is lower than "withSCRevenue" and difference between both is higher than percentageDIffAllowed (20%)
      if (vals.NOSCRevenueAfterCountAndRound < vals.withSCRevenueAfterCountAndRound && vals.diffAsPercentageAfterRound > percentageDIffAllowed) {
        const alternativeBUpdatedValue = 90;
        cy
        // Update alternativeB% value
          .clearValue('#input_48')
          .typeValue('#input_48', alternativeBUpdatedValue);
        // Scroll down and save the campaign
        // .scrollToPosition(0, 1000)
        // .clickOn('[ng-disabled="form.$invalid || (!onlyBottomEnabled && invalidNoYieldStrategy)"]')  // Click on save campaign

        //  Report
        const latestResults = `${currentDateForReport}: [INFO] "NO SC Revenue" (${vals.NOSCRevenueAfterCountAndRound}) is lower than "with SC Revenue" (${vals.withSCRevenueAfterCountAndRound}) -> Alternative B updated to: ${alternativeBUpdatedValue}%`;
        cy.log(latestResults);
        cy.writeFile(reportPath, `\n${latestResults}`, { flag: 'a+' });

      // -------------------------------------------- Case 2 -----------------------------------------------------------
      // When "NOSCRevenue" is higher than "withSCRevenue" and difference between both is higher than percentageDIffAllowed (20%)
      } else if (vals.NOSCRevenueAfterCountAndRound > vals.withSCRevenueAfterCountAndRound && vals.diffAsPercentageAfterRound > percentageDIffAllowed) {
        const alternativeBUpdatedValue = 10;
        cy
          // Update alternativeB% value
          .clearValue('#input_48')
          .typeValue('#input_48', alternativeBUpdatedValue);
        // Scroll down and save the campaign
        // .scrollToPosition(0, 1000)
        // .clickOn('[ng-disabled="form.$invalid || (!onlyBottomEnabled && invalidNoYieldStrategy)"]')  // Click on save campaign

        //  Report
        const latestResults = `${currentDateForReport}: [INFO] "NO SC Revenue" (${vals.NOSCRevenueAfterCountAndRound}) is higher than "with SC Revenue" (${vals.withSCRevenueAfterCountAndRound}) -> Alternative B updated to: ${alternativeBUpdatedValue}%`;
        cy.log(`=myLog= ${latestResults}`);
        cy.writeFile(reportPath, `\n${latestResults}`, { flag: 'a+' });
        // eslint-disable-next-line brace-style
      }

      // -------------------------------------------- Case 3 -----------------------------------------------------------
      // When "diffAsPercentageAfterRound" is lower or equal to "percentageDIffAllowed"
      else if (vals.diffAsPercentageAfterRound <= percentageDIffAllowed) {
        const alternativeBUpdatedValue = 50;
        cy
        // Update alternativeB% value
          .clearValue('#input_48')
          .typeValue('#input_48', alternativeBUpdatedValue);
        // Scroll down and save the campaign
        // .scrollToPosition(0, 1000)
        // .clickOn('[ng-disabled="form.$invalid || (!onlyBottomEnabled && invalidNoYieldStrategy)"]')  // Click on save campaign

        //  Report
        const latestResults = `${currentDateForReport}: [INFO] "NO SC Revenue" (${vals.NOSCRevenueAfterCountAndRound}) is pretty equal to "with SC Revenue" (${vals.withSCRevenueAfterCountAndRound}) -> Alternative B updated to: ${alternativeBUpdatedValue}%`;
        const PercentageDiffForLog = `${currentDateForReport}: [INFO] Revenue difference between the channels is ${vals.diffAsPercentageAfterRound}%`;
        cy.log(latestResults);
        cy.writeFile(reportPath, `\n${latestResults}`, { flag: 'a+' });
        cy.writeFile(reportPath, `\n${PercentageDiffForLog}`, { flag: 'a+' });
      }
    });
  });
});

// todo: can't save the campaign in the automation (error 401) - Irrelevant for production

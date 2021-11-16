const dayjs = require('dayjs');
const res = require('../../../support/res');

const reportPath = Cypress.env('reportPath');

const reportName = 'Kicker Ver. 2';
const currentDate = dayjs().format('DD/MM/YYYY');
const currentDateForReport = dayjs().format('DD/MM/YYYY HH:mm');
const selectedTime = dayjs().format('HH') - 4; // Current time - 4 (considering time difference)

const timeframe = `${currentDate} ${selectedTime}:00 - ${currentDate} ${selectedTime}:00`;
const percentageDIffAllowed = 20;

describe('Aniview kicker optimization', () => {
  it('Step 1 - Aniview - Login', () => {
    cy
      .goto('https://manage.aniview.com')
      .waitForVisibleElement('#id', 20000)
      .typeValue('#id', res.prodUsers.aniview.email)
      .typeValue('#password', res.prodUsers.aniview.password)
      .clickOn('button');
    Cypress.Cookies.preserveOnce('token');
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

    // todo: aniview "NO DATA" report - kill the test with message

    // cy.log('------- ANIVIEW RETURN NO DATA, Contact your admin -------')

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
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
      .preserveCookie('automationApesterSession');
  });

  it('step 5 - Apester - Get the campaign percentage split via API', () => {
    // Get the response body (including the Alternative B percentage value)
    cy.intercept({
      method: 'GET',
      url: 'campaigns/616d2fffbe0dfc002afbec0c',
      hostname: 'campaign-api.automation.apester.dev',
    }, (req) => {
      req.alias = '616d2fffbe0dfc002afbec0c';
      console.log(req.body);
    });

    // Open the campaign editor
    cy.goto('https://campaign.automation.apester.dev/#/video-campaign/616d2fffbe0dfc002afbec0c');
    // Click on the video title
    cy.clickOn('[model="collapsableUI.video"] > .header > .title')
      .waitFor(500)
      .scrollToPosition(0, 300);

    // Get the Alternative B percentage value
    cy.wait('@616d2fffbe0dfc002afbec0c').then((interception) => {
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
// 4 cases where revenue deviation is clear:
//  1. If A > B revenue and A > B percentage - do nothing
//  2. If A > B revenue and A < B percentage - switch percentage 90%-10%
//  3. If A < B revenue and A > B percentage- switch percentage 10%-90%
//  4. If A < B revenue and A < B percentage - do nothing
//
// 3 cases where revenue match*
// We define what deviation will consider = (e.g 200 and 189 will consider as =)
//  1. If A = B revenue and A = B percentage - do nothing
//  2. If A = B revenue and A > B percentage - switch percentage 50%-50%
//  3. If A = B revenue and A < B percentage - switch percentage 50%-50%
// todo: can't save the campaign in the automation (error 401)

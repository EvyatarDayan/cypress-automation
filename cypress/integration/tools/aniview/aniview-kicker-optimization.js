const dayjs = require('dayjs');
const res = require('../../../support/res');

const firstLine = [];
const secondLine = [];

const reportName = 'Kicker Ver. 2';

const currentDate = dayjs().format('DD/MM/YYYY');
const selectedTime = dayjs().format('HH') - 4; // Current time - 4 (considering time difference)

const timeframe = `${currentDate} ${selectedTime}:00 - ${currentDate} ${selectedTime}:00`;

describe('Stage 1 - aniview update', () => {
  it('Step 1 - Login', () => {
    cy
      .goto(res.prodUrls.aniview)
      .typeValue('#id', res.prodUsers.aniview.email)
      .typeValue('#password', res.prodUsers.aniview.password)
      .clickOn('button')
      .waitFor(6000);
    Cypress.Cookies.preserveOnce('token');
  });

  it('Step 2 - Navigate to the report', () => {
    cy
      .clickOn(':nth-child(6) > a > .text') // Click on reports in the menu
      .typeValue('.sb-search-input', reportName).waitFor(2000) // Add value in the search field
      .clickOn('.icon-edit') // Click on edit report
      .scrollToElement('#custom-range')
      .clearValue('#custom-range')
      .typeValue('#custom-range', timeframe)
      .pauseHere()
      .scrollToElement('.button-save')
      .clickOn('.button-save')
      .waitFor(1000)
      .clickOn('.icon-viewReport')
      .pauseHere();
  });

  it('Step 3 - Get the numbers', () => {
    const viewabilityNoSC = cy.getText('.table > :nth-child(2) > :nth-last-child(2) > :nth-child(3)');
    firstLine.push(viewabilityNoSC);

    const viewabilityWithSC = cy.getText('.table > :nth-child(2) > :nth-last-child(1) > :nth-child(3)');
    secondLine.push(viewabilityWithSC);

    cy
      .log(firstLine);
  });
});

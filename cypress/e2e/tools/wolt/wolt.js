/// <reference path="../support/index.d.ts" />

const woltRes = require('./woltRes');

const numberOfTimes = 100;
const refreshInterval = 20000;
const placeClosedLabel = '.VenueStickyHeader-module__right___AMg3W > div > .CheckoutButton-module__offlineButton___Y91IQ > span';
const urlToCheck = woltRes.urls.Lila;
const successSound = woltRes.sounds.dua;
// eslint-disable-next-line import/order
const dayjs = require('dayjs');

const currentDate = dayjs().format('MMM DD HH:mm');
const report = 'cypress/integration/tools/wolt/woltReport.txt';

describe('Wolt availability', () => {
  it('Navigate to URL', () => {
    cy.visit(urlToCheck);
    cy.clickIfExist('.dHPeSQ > .Button__Content-a3fg5q-3');
  });

  it('Check availability', () => {
    for (let i = 0; i < numberOfTimes; i++) {
      cy.get('body').then((body) => {
        if (body.find(placeClosedLabel).length > 0) {
          // eslint-disable-next-line no-mixed-operators
          const howLong = ((refreshInterval) / 1000 * [i] / 60);
          const howLongRound = Math.round(howLong);

          cy.clickIfExist('.cFhxTZ > .Button__SpinnerContainer-sc-a3fg5q-4');
          cy.refresh();
          cy.log(`---- Number of attempts:${[i + 1]} (${howLongRound} minutes passed) ----`);
          cy.writeFile(report, `\n${currentDate}: [info] Number of attempts:${[i + 1]} (${howLongRound} minutes passed)`, { flag: 'a+' });
          cy.wait(refreshInterval);
        } else {
          cy.visit(successSound).waitFor(2000);
          cy.clickIfExist('.cFhxTZ > .Button__SpinnerContainer-sc-a3fg5q-4');
          cy.clickIfExist('#onetrust-accept-btn-handler');
          cy.log('---- You can order your pizza, you fat bastard! ----');
          cy.writeFile(report, `\n${currentDate}: [info] You can order your pizza, you fat bastard!`, { flag: 'a+' });
          cy.wait(180000);
          cy.clickOn('.soundTitle__playButton > .snippetUXPlayButton');
          cy.pause();
        }
      });
    }
  });
});

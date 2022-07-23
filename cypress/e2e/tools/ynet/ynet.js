const cyTools = require('randomstring');
const dayjs = require('dayjs');
const ynetRes = require('./ynetRes');

const currentDate = dayjs().format('MMM DD HH:mm');
const reportPath = 'cypress/integration/tools/ynet/ynetReport.txt';

const randomNumber = cyTools.generate({ length: 3, charset: '1234567890' });
const randomForName = cyTools.generate({ length: 1, charset: '0123456' });
const numberOfCycles = 1;
const numberOfRuns = 200;

describe('Ynet quiz', () => {
  for (let i = 0; i < numberOfCycles; i++) {
    it('Login', { retries: { openMode: 6, runMode: 6, },
    }, () => {
      cy.visit('https://quiz.ynet.co.il/?externalurl=true#/')
        // .clearLocalStorage()
        .clearCookies()
        .typeValue('#FullName', ynetRes.names[randomForName])
          // .typeValue('#FullName', 'גורדון פיצ׳ג׳רלד')
          .waitFor(500)
        .typeValue('#Email', `gordon.${randomNumber}@yopmail.com`)
        .waitFor(1000)
        .clickOn('#TOS') // checkbox
        .waitFor(500)
        .clickOn(':nth-child(2) > .text') // start quiz button
        .waitForVisibleElement('.correct > .answer-text', 5000);
    });

    it('Select answers', () => {
      for (let y = 0; y < numberOfRuns; y++) {
        cy.get('body').then((body) => {
          if (body.find('.correct > .answer-text').length > 0) {
            cy.get('.correct > .answer-text').eq(0).click({ force: true });
          }
        });
      }
    });

    it('Report', () => {
      // wait for position number to appear (anything but 0)
      cy.get('.star').contains(/[1-9]/g);
      // collect time
      cy.get('body').find('.tags > .record').invoke('text').then((timer) => {
        cy.task('setTimer', timer.replace(' דקות', ''));
      });
      // collect position
      cy.get('body').find('.star').invoke('text').then((position) => {
        cy.task('setPosition', position.replace('מיקומך ', ''));
      });

      cy.task('getAllSavedValues').then((vals) => {
        cy.log(`Time is: ${vals.timer}`);
        cy.log(`Position is: ${vals.position}`);
        cy.writeFile(reportPath, `\n${currentDate} [INFO] ===== Time is: ${vals.timer} ===== Position is: ${vals.position}`, { flag: 'a+' });
        if (vals.position === '1') {
          cy.writeFile(reportPath, '  ====== NUMBER ONE BABY!!! ======', { flag: 'a+' });
        }
        if (vals.position > 50) {
          cy.writeFile(reportPath, '  ====== SUCH A LOSER!!! ======', { flag: 'a+' });
        }
      });
    });
  }
});

const res = require('../../../support/res');

const searchEngines = 'Automation engine:';
const numberOfEngines = 30;

describe('Stage 1 - delete engines', () => {
  it('Step 1 - Login as admin', () => {
    cy
      .goto(res.automationUrls.login)
      .login(res.automationUsers.admin1.email, res.automationUsers.admin1.password);
  });

  // it('Step 2 - Archive all engines', () => {
  //
  //     cy
  //         .typeValue('.search-filter > .ng-pristine', searchEngines)
  //         .clickOn('.circle-search-btn > .ic')
  //         .waitFor(1000)
  //
  //             for (let i = 0; i < numberOfEngines; i++) {
  //                 cy.get('.icon-archive').eq(0).click({force: true})
  //                     .clickOn('.warning-popup__container--accept-btn')
  //                         .waitFor(2000)
  //             }
  // })
  //
  // it('Step 3 - Delete all engines', () => {
  //
  //             cy
  //                 .clickOn('.filters-header').waitFor(500)
  //                 .hoverElement('.filters-state').waitFor(500)
  //                 .clickOn(':nth-child(5) > .ui-select-choices-row-inner').waitFor(500)
  //
  //                     for (let i=0 ; i < numberOfEngines ;i++){
  //                         cy.get('.icon-trash-2').eq(0).click({force: true})
  //                             .waitFor(500)
  //                         }
  // })
});

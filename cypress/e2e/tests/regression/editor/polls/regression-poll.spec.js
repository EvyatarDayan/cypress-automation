const res = require('../../../../../support/res');

describe('Edit poll', () => {
  it('loginToPortal', () => {
    cy
      .loginToPortal(res.automationUsers.user1.email, res.automationUsers.user1.password);
    cy.goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=60e7098e5d57eb00181def6a`);
  });

  // it('Navigate to edit page', () => {
  //     cy.typeValue('.search-filter > .ng-pristine' ,'Poll')
  //     .clickOn('.circle-search-btn > .ic')
  //     cy.wait(1000)
  //     .openInCurrentTab('.icon-edit')
  // })
});

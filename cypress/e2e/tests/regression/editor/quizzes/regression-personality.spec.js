const res = require('../../../../../support/res');

describe('Edit personality', () => {
  it('loginToPortal', () => {
    cy
      .loginToPortal(res.automationUsers.user1.email, res.automationUsers.user1.password);
  });

  it('Navigate to edit page', () => {
    cy.typeValue('.search-filter > .ng-pristine', 'Personality')
      .clickOn('.circle-search-btn > .ic');
    cy.wait(1000)
      .openInCurrentTab('.icon-edit');
  });
});

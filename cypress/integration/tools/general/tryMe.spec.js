// const res = require('../../../support/res');

describe('Edit gallery', () => {
  it('measures page load on the home page', () => {
    cy.goto('https://portal.apester.com/auth/login')
      .typeValue('[style="grid-row:1"] > .InputField_input__1JpI-', 'test+goldstar-best-beer-ever-123456789000@apester.com')
      .typeValue('[style="grid-row:3"] > .InputField_input__1JpI-', 'SqVACeh4M')
      .clickOn('.apeButton');
  });
});

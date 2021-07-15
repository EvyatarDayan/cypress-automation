
// const apesterRes = require("../../apester/apesterRes");

describe('Get text from element', () => {

  it('Step 1 - Navigate to element page', () => {
    cy.visit("https://admin.bold360.com")

  })

  it('Step 2 - Get text', () => {
    cy
        .openInCurrentTab('.lineBig')
  })
});


/// this is new

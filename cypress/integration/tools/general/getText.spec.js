
/**
 * After run click on the invoke line in the log, open the console and check "Yielded" value .
 */

describe('Get text from element', () => {

  it('Step 1 - Navigate to element page', () => {
    cy.visit('http://wolt.com/he/isr/tel-aviv/restaurant/lila-pizza')                     // Add all steps to navigate to the page
  })

  it('Step 2 - Get text', () => {

    let text = cy.getText('.CheckoutButton-module__button___1rZB-')           // Add the element selector
    cy.log(text)
  })

});
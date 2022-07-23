/**
 * After run click on the invoke line in the log, open the console and check "Yielded" value .
 */

describe('Get text from element', () => {
  it('Step 1 - Navigate to element page', () => {
    cy.goto('http://wolt.com/he/isr/tel-aviv/restaurant/lila-pizza'); // Add all steps to navigate to the page
    cy.clickIfExist('.dHPeSQ > .Button__Content-a3fg5q-3')
      .waitFor(5000);
  });

  it('Step 2 - Get text', () => {
    cy.getText('.VenueStickyHeader-module__right___CBSY0 > div > .CheckoutButton-module__offlineButton___14GlP > span');

    // let text = cy.get('.RatingsButton-module__score___1Nclh').invoke('text')
    //
    // cy.log('>>>>>>>>>>>>> '+text)
  });
});

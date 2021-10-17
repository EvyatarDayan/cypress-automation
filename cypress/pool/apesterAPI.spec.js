// const res = require("../../apester/res");

describe('API Test', () => {

  it('cy.request() - pass result to the second request', () => {
    // first, let's find out the userId of the first user we have
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
        .its('body') // yields the response object
        .its('0') // yields the first element of the returned list
  })

});


/// this is new

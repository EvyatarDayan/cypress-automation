'use strict';

const res = require("../../../../../support/res");

describe('Edit poll', () => {

    it('Login', () => {
        cy
        .goto(res.automationUrls.login)
        .login(res.automationUsers.user1.email, res.automationUsers.user1.password)
    })

    // it('Navigate to edit page', () => {
    //     cy.typeValue('.search-filter > .ng-pristine' ,'Poll')
    //     .clickOn('.circle-search-btn > .ic')
    //     cy.wait(1000)
    //     .openInCurrentTab('.icon-edit')
    // })
});

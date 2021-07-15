'use strict';

const apesterRes = require("../../../../support/resources");

describe('Edit video quiz', () => {

    it('Login', () => {
        cy.visit(apesterRes.stageUrls.login)
        cy.login(apesterRes.stageUsers.user1.email, apesterRes.stageUsers.user1.password)
    })

    it('Navigate to edit page', () => {
        cy.typeValue('.search-filter > .ng-pristine' ,'Video quiz')
        .clickOn('.circle-search-btn > .ic')
        cy.wait(1000)
        .openInCurrentTab('.icon-edit')
    })
});

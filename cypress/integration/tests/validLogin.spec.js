'use strict';

const apesterRes = require("../../support/resources");

describe('Login', () => {

  it('Navigate to URL', () => {
    cy.visit(apesterRes.stageUrls.login)
  })

  it('Step 1 - Forgot password - none existing email', () => {
    cy
        .login(apesterRes.stageUsers.user1.email, apesterRes.stageUsers.user1.password)  // Login

        .clickOn('.selected > .main-button > .textContainer')   // Switch to Media tab
        .wait(2000)
        .openInCurrentTab('.icon-edit') // Click on edit on the (open in current tab)

        .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]') // Switch to Media section
        .wait(1000)
        .clickOnText('Gifs')    // Click on gif button
        .wait(2000)
        .typeValue('.ape-search-form__input', 'The office') // Type value in the search
        .clickOn('.ape-search-form__icon')                  // Click on search button
        .doubleClickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[2]/media')   // Select the first gif
        cy.pause()
  })
})

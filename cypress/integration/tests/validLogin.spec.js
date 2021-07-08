/// <reference path="../support/index.d.ts" />
/// <reference types="Cypress" />


const apesterRes = require("./apesterRes");

describe('Login', () => {

  it('Navigate to URL', () => {
    cy.visit(apesterRes.stageUrls.login)

  })

  it('Step 1 - Forgot password - none existing email', () => {
      cy
          .typeValue('[style="grid-row:1"] > .InputField_input__1JpI-', apesterRes.stageUsers.user2.email)
          .typeValue('[style="grid-row:3"] > .InputField_input__1JpI-', apesterRes.stageUsers.user2.password)

          .clickOn('.apeButton')
  })
})
'use strict';

const res = require("../../../support/res");
let finalUsers = []

// ----------------------------------------
const numberOfUsers = 2
// ----------------------------------------

describe('Register new users', () => {

  for (let i = 0; i < numberOfUsers; i++) {

      let cyTools = require("randomstring");
      let randomNumber = cyTools.generate({length:4, charset: '1234567890'})
      let randomAnswer = cyTools.generate({length:1, charset: '123456789'})

      it('Navigate to registration url', () => {
              cy.goto(res.automationUrls.register)
          })

          it('Step 1 - Registration form', () => {
                  let name = 'Name-'+randomNumber
                  let LastName = 'LastName-'+randomNumber
                  let email = 'automation.'+randomNumber+'@yopmail.com'
            cy
                // Name
                .typeValue('[name=given-name]', name)
                // Last name
                .typeValue('[name=family-name]', LastName)
                // Email
                .typeValue('[name=email]', email)
                // Password
                .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
                // Confirm password
                .typeValue('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
                // Click on create account button
                .clickOn('.apeButton')

                finalUsers.push('User'+[i+1]+': '+email+'\n')
          })

          it('Step 2 - Profile questions', () => {
            cy
                // Company name
                .typeValue(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input', 'Automation - company name')
                // Job title
                .typeValue(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input', 'Automation - job title')
                // Number of people
                .clickOn('#simple-select').clickOn('[data-value="11-50"]')
                // Next button
                .clickOn('.apeButton')
                // Content about
                .clickOn(':nth-child('+randomAnswer+') > .MuiChip-label')
                // Next button
                .clickOn('.apeButton').waitFor(1500)
                // Use apester for
                .clickOn(':nth-child('+randomAnswer+') > .MuiChip-label')
                // Complete button
                .clickOn('.apeButton')
                // Validate welcome page
                .textContains('.main-title', 'Welcome to Apester!')
          })
      }

    it('Report', () => {
        cy.log('------- Your new users -------')
        cy.log(finalUsers.toString())
    })

})

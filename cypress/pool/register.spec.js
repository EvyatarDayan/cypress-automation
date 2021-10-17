'use strict';

const res = require("../support/res");

describe('Register', () => {

  it('Navigate to URL', () => {
    cy.goto(res.automationUrls.register)
  })

  it('Step 1 - email validation', () => {
    cy
        .typeValue('[name=given-name]', 'Martin')
        .typeValue('[name=family-name]', 'Ross')

    //Invalid emails
    for (let i=0 ; i < res.emailInvalid.length ;i++){
      cy
          .typeValue('[name=email]', res.emailInvalid[i])
          .textContains('.InputField_error__2iPLp', 'Invalid Email')
          .clearValue('[name=email]')
    }

    //Valid emails
    for (let i=0 ; i < res.emailValid.length ;i++){
      cy
          .typeValue('[name=email]', res.emailValid[i])
          .elementNotExist('.InputField_error__2iPLp')
          .clearValue('[name=email]')
    }
  })

  it('Step 2 - Password validation', () => {
    cy.typeValue('[name=email]', 'abc123@apester.com')

    //Invalid passwords
    for (let i=0 ; i < res.invalidPass.length ;i++){
      cy
          .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', res.invalidPass[i])
          .propertyContains('[name=new-password]', 'border-color', 'rgb(238, 46, 61)')
          .clearValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-')
    }

    //Valid passwords
    for (let i=0 ; i < res.validPass.length ;i++){
      cy
          .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', res.validPass[i])
          .propertyContains('[name=new-password]', 'border-color', 'rgb(83, 151, 255)')
          .clearValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-')
    }
  })

  it('Step 3 - Matching passwords', () => {
    //not matching passwords
    cy
        .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', 'pass1234')
        .typeValue('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', 'pass123')
        .textContains('.InputField_error__2iPLp', 'Passwords do not match.')
        .propertyContains('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', 'border-color', 'rgb(238, 46, 61)')

    //matching passwords
    cy
        .clearValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-')
        .clearValue('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-')
        .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', 'pass1234')
        .typeValue('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', 'pass1234')
        .propertyContains('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', 'border-color', 'rgb(83, 151, 255)')

    // Validate password field is masked (type 'password' is always masked)
    cy.get('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-').invoke('attr', 'type').should('equal', 'password')
        .get('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-').invoke('attr', 'type').should('equal', 'password')
  })

  it('Step 4 - create button availability', () => {
    // All fields empty
    cy
        .refresh()
        .elementExist('.Button_disabled__3-vAf')
        // Only Name
        .refresh()
        .typeValue('[name=given-name]', 'Martin')
        .elementExist('.Button_disabled__3-vAf')
        // Only Last name
        .refresh()
        .typeValue('[name=family-name]', 'Ross')
        .elementExist('.Button_disabled__3-vAf')
        // Only Email
        .refresh()
        .typeValue('[name=email]', 'abc123@apester.com')
        .elementExist('.Button_disabled__3-vAf')
        // Name + Last name
        .refresh()
        .typeValue('[name=given-name]', 'Martin')
        .typeValue('[name=family-name]', 'Ross')
        .elementExist('.Button_disabled__3-vAf')
        // Name + Last name + Email
        .refresh()
        .typeValue('[name=given-name]', 'Martin')
        .typeValue('[name=family-name]', 'Ross')
        .typeValue('[name=email]', 'abc123@apester.com')
        .elementExist('.Button_disabled__3-vAf')
        // Only First password
        .refresh()
        .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
        .elementExist('.Button_disabled__3-vAf')
        // Only passwords (both)
        .refresh()
        .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
        .typeValue('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
        .elementExist('.Button_disabled__3-vAf')
        // Name + Last name + Email + First Password
        .refresh()
        .typeValue('[name=given-name]', 'Martin')
        .typeValue('[name=family-name]', 'Ross')
        .typeValue('[name=email]', 'abc123@apester.com')
        .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
        .elementExist('.Button_disabled__3-vAf')
        // Name + Last name + Email + Both passwords
        .refresh()
        .typeValue('[name=given-name]', 'Martin')
        .typeValue('[name=family-name]', 'Ross')
        .typeValue('[name=email]', 'abc123@apester.com')
        .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
        .typeValue('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', 'Password1')
        .elementExist('.Button_submitButton__3frDn')
        .elementNotExist('.Button_disabled__3-vAf')
  })

  it('Step 5 - Hyperlinks', () => {
    cy
        .refresh()
        // Check all urls
        .textContains('.disclaimer', "By signing up you agree to Apester'sTerms of ServiceandPrivace Policy")
        .attributeContains('[href="https://apester.com/terms"]', 'href', 'https://apester.com/terms')
        .attributeContains('[href="https://apester.com/privacy"]', 'href', 'https://apester.com/privacy')

        // Navigate to Terms of service
        .openInCurrentTab('[href="https://apester.com/terms"]')                                         // remove "target" from DOM to open the link in the same tab
        .urlContains('https://apester.com/terms-of-service/')                                           // validate url contain
        .back()                                                                                         // navigate back

        // Navigate to Privacy policy
        .openInCurrentTab('[href="https://apester.com/privacy"]')                                        // remove "target" from DOM to open the link in the same tab
        .urlContains('https://apester.com/privacy-policy/')                                               // validate url contain
        .back()                                                                                           // navigate back

        // Navigate to Facebook
        .clickOn('[data-test-id=auth-facebook]')                                                      // click on facebook link
        .urlContains('https://www.facebook.com/login')                                                // validate url contain
        .back()

        // // Navigate to Google
        //     .clickOn('[data-test-id=auth-google]')                                                       // click on google link
        //     .urlContains('https://accounts.google.com/')                                                 // validate url contain
        //     .back()

        // Navigate to LinkedIn
        .clickOn('[data-test-id=auth-linkedin]')                                              // click on linkedIn link
        .urlContains('https://www.linkedin.com/')                                             // validate url contain
        .back()
  })

  it('Step 6 - Register with existing user', () => {
    cy
        .refresh()
        .typeValue('[name=given-name]', res.automationUsers.user1.name)
        .typeValue('[name=family-name]', res.automationUsers.user1.lastname)
        .typeValue('[name=email]', res.automationUsers.user1.email)
        .typeValue('[style="grid-row:5;grid-column:1 / 3"] > .InputField_input__1JpI-', res.automationUsers.user1.password)
        .typeValue('[style="grid-row:7;grid-column:1 / 3"] > .InputField_input__1JpI-', res.automationUsers.user1.password)
    // .clickOn('.apeButton')
  })
})

//TODO:
// Privace Policy - spelling mistake
// Not all valid/invalid emails (e.g .abc@mail.com should indicate as invalid)
// No mandatory indication on "Name" and "Last name".
// Data cleared while switching between the tabs
// Create button is not enabled while adding name and last name after all other fields.
// Create button enabled after all fields valid and removing name and last name.
// "internal server error" while register existing user.

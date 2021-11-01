const res = require('../support/res');

describe('Login', () => {
  it('Navigate to URL', () => {
    cy.goto(res.automationUrls.login);
  });
  /// this is new
  it('Step 1 - Forgot password - none existing email', () => {
    cy
      .clickOn('.link')
      .textContains('.resetPassword_title__3bAxK', 'Forgot your password? Let\'s get you a new one!')
      .textContains('.resetPassword_subtitle__2E2LG', 'To reset your password, enter the email associated with your Apester channel')
      .textContains('.InputField_label__29Ptr', 'Email')
      .textContains('.apeButton', 'continue')
      .textContains('.link', 'return to log in')

      .typeValue('.InputField_input__1JpI-', 'martin@fake.com') // Add none existing email
      .clickOn('.apeButton')
      .textContains('.error', 'Invalid Data.') // Check error message
      .clickOn('.link') // Click on "return to log in"
      .urlContains(res.automationUrls.login); // Validate back to login page
  });

  it('Step 2 - Forgot password - existing email', () => {
    cy
      .clickOn('.link')
      .typeValue('.InputField_input__1JpI-', 'tomato1@yopmail.com') // Add existing email
      .clickOn('.apeButton')

    // Check email sent message
      .textContains('.resetPassword_title__3bAxK', 'You\'re almost there!')
      .textContains('.resetPassword_subtitle__2E2LG', 'We\'ll send you a link to reset your password. Be sure to check your spam folder if you don\'t receive our email soon.')
      .textContains('.apeButton', 'resend email')
      .textContains('.linkContainer ', 'Need help?Contact support')

    // Check link
      .attributeContains('a.link', 'href', 'https://help.apester.com/') // validate link href
      .openInCurrentTab('a.link') // remove "target" from DOM to open the link in the same tab
      .urlContains('https://help.apester.com/hc/en-us') // validate url contain
      .back()
      .clickOn('.link'); // Click on "return to log in"
  });

  it('Step 3 - Hyperlinks', () => {
    cy
    // Navigate to Facebook
      .clickOn('[data-test-id=auth-facebook]') // click on facebook link
      .urlContains('https://www.facebook.com/login') // validate url contain
      .back()

    // // Navigate to Google
    //     .clickOn('[data-test-id=auth-google]')                               // click on google link
    //     .urlContains('https://accounts.google.com/')                         // validate url contain
    //     .back()

    // Navigate to LinkedIn
      .clickOn('[data-test-id=auth-linkedin]') // click on linkedIn link
      .urlContains('https://www.linkedin.com/') // validate url contain
      .back();
  });

  // it('Step 2 - invalid credentials', () => {
  //   cy
  //     .typeValue('[style="grid-row:1"] > .InputField_input__1JpI-', 'Martin@fake.com')
  //     .typeValue('[style="grid-row:3"] > .InputField_input__1JpI-', 'fakePassword')
  //     .clickOn('.apeButton')
  //     .textContains('error', 'username or password are incorrect')
  // })
});

/**
 Login with valid user
 User before welcome
 User after welcome
 Login with invalid user
 Login with expired/blocked user
 Login button availability
 Error messages on empty/invalid fields
 Forgot password
 Link to forgot password and back to login
 Existing/ none-existing email
 Invalid/empty email validation
 Resend mail + contact support
 Reset password
 All Invalid password option ((1 Uppercase, 1 lowercase, a number and 6+ characters))
 Not matching passwords
 Valid password change and login with new
 Old password fail
 Third party login
 Login with Facebook account, existing/ none-exiting
 Login with Google account, existing/ none-exiting
 Login with linkedIn account, existing/ none-exiting
 */

// BUGS
// 1. Click on "Resent mail" should not lead to adding the email again. just display message after sending to the previous email provided.

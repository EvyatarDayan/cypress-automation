'use strict';

const res = require("../../../support/res");

describe('Stage 1 - create the story', () => {
  it('step 1 - Login', () => {
    cy
      .goto('https://portal.automation.apester.dev/auth/login')
      .login(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
  })
})

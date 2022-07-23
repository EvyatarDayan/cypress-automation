const res = require('../../../../support/res');

describe('Stage 2 - create the story', () => {
  it('step 1 - Login', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password);
  });
});

const res = require('../../../../support/res');

describe('Templates', () => {
  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.user2.email, res.automationUsers.user2.password)
      .preserveCookie('automationApesterSession');
  });

  it('Navigate all tabs', () => {
    cy
    // Expand templates
      .clickOn(':nth-child(2) > .main-button > .textContainer')
      .waitFor(500)
      // Click on all link
      .clickOn(':nth-child(2) > .dropdown-container > .dropdown > :nth-child(1)')
      .waitFor(500)
    // Click on news
      .clickOn('[href="/en/all/news"]')
      .waitFor(500)
    // Click on sports
      .clickOn('[href="/en/all/sports"]')
      .waitFor(500)
    // Click on entertainment
      .clickOn('[href="/en/all/entertainment"]')
      .waitFor(500)
    // Click on tech
      .clickOn('[href="/en/all/tech"]')
      .waitFor(500)
    // Click on finance
      .clickOn('[href="/en/all/finance"]')
      .waitFor(500)
    // Click on lifestyle
      .clickOn('[href="/en/all/lifestyle"]')
      .waitFor(500)
    // Click on holidays
      .clickOn('.special');
  });

  it('Template content', () => {
    cy
    // Template title
      .textContains(':nth-child(1) > .template-card > .template-card__header > .template-card__header-layout > .template-card__name', 'Winter Mood: ON')
    // Tags title
      .textContains(':nth-child(1) > .template-card > .template-card__header > .template-card__header-layout > .tags-container > a > .tag', '#holidays')
    // Template description
      .textContains(':nth-child(1) > .template-card > .template-card__body > .template-card__description > .LinesEllipsis', 'Put the kettle on, it’s going to get cozy!')
    // Click on the first template preview
      .clickOn('[href="/en/all/holidays/winter-mood:-on"] > span')
      .waitFor(500)
    // Click on close preview button
      .clickOn('#home-close-button > .ic');

    // Click on edit
    // Click on preview
  });
});

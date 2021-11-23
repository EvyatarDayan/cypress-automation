const res = require('../../../../support/res');

describe('Strip', () => {
  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.user2.email, res.automationUsers.user2.password)
      .preserveCookie('automationApesterSession');
  });

  it('Validate titles and descriptions', () => {
    cy
    // Strip title
      .textContains('header > .title', 'What digital experience you want to create?')
    // Customer Education
      .textContains('.slick-current > :nth-child(1) > [tabindex="-1"] > .title ', 'Customer Education') // title
      .textContains('.slick-current > :nth-child(1) > [tabindex="-1"] > .description', 'Explain your product with how-to widgets.') // description
    // Increase your lead flow
      .textContains('[data-index="1"] > :nth-child(1) > [tabindex="-1"] > .title', 'Increase your lead flow') // title
      .textContains('[data-index="1"] > :nth-child(1) > [tabindex="-1"] > .description', 'Increase your sales prospects volumes with an interactive fun and playful experience.') // description
    // Lead generation
      .textContains('[data-index="2"] > :nth-child(1) > [tabindex="-1"] > .title', 'Lead generation') // title
      .textContains('[data-index="2"] > :nth-child(1) > [tabindex="-1"] > .description', 'Use interactive lead magnets to collect emails') // description
    // Increase your business opportunities
      .textContains('[data-index="3"] > :nth-child(1) > [tabindex="-1"] > .title', 'Increase your business opportunities') // title
      .textContains('[data-index="3"] > :nth-child(1) > [tabindex="-1"] > .description', 'Use forms to increase your customer feedback, orders top line volume and more.') // description
      .multipleClicks(':nth-child(3) > .arrow-button', 4)

    // Product Discovery
      .textContains('.slick-current > :nth-child(1) > [tabindex="-1"] > .title ', 'Product Discovery') // title
      .textContains('.slick-current > :nth-child(1) > [tabindex="-1"] > .description', 'Help consumers find products on your site easily and quickly') // description
    // Automated stories
      .textContains('[data-index="5"] > :nth-child(1) > [tabindex="-1"] > .title', 'Automated stories') // title
      .textContains('[data-index="5"] > :nth-child(1) > [tabindex="-1"] > .description', 'Automated and personalized stories from your website can be done automatically.') // description
    // Share on social
      .textContains('[data-index="6"] > :nth-child(1) > [tabindex="-1"] > .title', 'Share on social') // title
      .textContains('[data-index="6"] > :nth-child(1) > [tabindex="-1"] > .description', 'Get your Facebook community engaged with Apester widgets') // description
    // Community magnet
      .textContains('[data-index="7"] > :nth-child(1) > [tabindex="-1"] > .title', 'Community magnet') // title
      .textContains('[data-index="7"] > :nth-child(1) > [tabindex="-1"] > .description', 'Create your community magnet to keep your customers engaged.') // description
      .multipleClicks(':nth-child(1) > .arrow-button', 4)
      .preserveCookie('automationApesterSession');
  });

  it('Navigate to all use cases', () => {
    cy
    // Customer Education
      .hoverElement('.slick-current > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/customer-education')
      .back(2)
    // Increase your lead flow
      .hoverElement('[data-index="1"] > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/gated-content')
      .back(2)
    // Lead generation
      .hoverElement('[data-index="2"] > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/subscription')
      .back(2)
    // Increase your business opportunities
      .hoverElement('[data-index="3"] > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/lead-gen')
      .back(2)
      .multipleClicks(':nth-child(3) > .arrow-button', 4)

    // Product Discovery
      .hoverElement('.slick-current > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/product-discovery')
      .back(2)
    // Automated Stories
      .hoverElement('[data-index="5"] > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/acg')
      .back(2)
    // Share on social
      .hoverElement('[data-index="6"] > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/share-on-social')
      .back(2)
    // Community magnet
      .hoverElement('[data-index="7"] > :nth-child(1) > [tabindex="-1"] > .image-wrapper > img')
      .goto('https://portal.automation.apester.dev/use-cases/winners-board')
      .back(2);
  });
});

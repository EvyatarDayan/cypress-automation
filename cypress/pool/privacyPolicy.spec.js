const res = require('../support/res');

describe('Login', () => {
  it('Navigate to URL', () => {
    cy.goto(res.automationUrls.privacyPolicy).wait(1000)
    // .scrollTo(0, 2354)
      .scrollToElement('.elementor-element-27ba68a > .elementor-widget-container > .elementor-heading-title')
      .multipleClicks('#tablepress-5_length > label > select', 3);
    cy.pause();
  });

  it('Validate initial chat bot', () => {
    cy
      .iframeClickOn('#hubspot-messages-iframe-container > iframe', '[data-test-id=initial-message-text]')
      .iframeTextContains('#hubspot-messages-iframe-container > iframe', '[data-test-id=primary-message-content]', 'Hi there')
      .iframeTextContains('#hubspot-messages-iframe-container > iframe', '[data-test-id=widget-header-name]', 'ApeBot');
  });

  it('Interact with the bot', () => {
    cy
      .iframeClickOnText('#hubspot-messages-iframe-container > iframe', 'Yes').wait(5000)
      .iframeTypeValue('#hubspot-messages-iframe-container > iframe', '[data-test-id=widget-textarea]', 'How are you?')
      .iframeClickOn('#hubspot-messages-iframe-container > iframe', '[data-test-id=chat-send-button]'); // click on send button
    // .iframeTypeValue('#hubspot-messages-iframe-container > iframe', '[data-test-id=widget-textarea]', '{enter}')   // Or hit ENTER key
    cy.wait(5000)
      .iframeTypeValue('#hubspot-messages-iframe-container > iframe', '[data-test-id=widget-textarea]', 'Are you OK?')
      .iframeClickOn('#hubspot-messages-iframe-container > iframe', '[data-test-id=chat-send-button]') // click on send button
      .iframeClickOn('#hubspot-messages-iframe-container > iframe', '[data-test-id=show-threads-button]') // Switch to "Conversations"
      .iframeClickOn('#hubspot-messages-iframe-container > iframe', '[data-test-id=new-thread-button]'); // Start new conversation
  });
});

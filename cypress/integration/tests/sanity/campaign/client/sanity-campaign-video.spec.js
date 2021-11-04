const cyTools = require('randomstring');
const res = require('../../../../../support/res');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
const aniviewChannelId = '5fad4ac42cd6d91dcb6e50e9';
const aniviewPlayerId = '5faf2a6e1b1ab26edc3f9173';

describe('Stage 2 - create the campaign', () => {
  it('step 1 - Login', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password);
    // Open the campaign editor
    Cypress.Cookies.preserveOnce('automationApesterSession');
    cy.goto('https://campaign.automation.apester.dev/#/video-campaign/new');
  });

  it('Publish the engine + campaign to a public web page (git?)', () => {
    cy
    // Add campaign name
      .typeValue('#campaignName', `Campaign: ${randomNumber}`)
    // Expand 'Video' section
      .clickOn('[model="collapsableUI.video"] > .header > .title')

    // Expand video player selection
      .clickOn('#select_14').waitFor(1000)
    // Select 'aniview' from the list
      .clickOn('#select_option_71 > .md-text')
      .waitFor(1000)
    // Add aniview channel ID (100% fill)
      .typeValue('[ng-if="!isSupportVerticalVideo || isAniview"] > #tagUrl', aniviewChannelId)
    // Add aniview player ID (100% fill)
      .typeValue('#aniviewPlayerId', aniviewPlayerId)

    // 1st player on
      .clickOn('#select_value_label_16 > .md-select-icon')
    // Select "Load"
      .clickOn('#select_option_55')
    // 2nd+ player on
      .clickOn('#select_20')
    // Select "Load"
      .clickOn('#select_option_59')

      .waitFor(500)
    // Max number of ads
      .clearValue('#input_29')
      .typeValue('#input_29', '10')
    // Time between ad calls
      .clearValue('#input_30')
      .typeValue('#input_30', '10')

    // Display settings
      .scrollToPosition(0, 1032)
    // Disable CPM
      .clickOn('[model="collapsableUI.display.cpm"] > .header > .switch > .md-primary > .md-container > .md-bar')
    // Add number of seconds
      .typeValue('.number-input', '7')
    // Expand "2nd+ player on"
      .clickOn('#select_value_label_10 > .md-select-icon')
      .waitFor(500)
    // Select "Load"
      .clickOn('#select_option_67')

      .scrollToPosition(0, 1448)
    // Add target channel
      .waitFor(1000)
      .typeValue('.ui-select-search', 'admin1')
    // Click on the result
      .clickOn('.ui-select-choices-row-inner')
    // Click on 'Add channel' button
      .clickOn('.channel-picker > .setup-button')
    // Click on save button
      .clickOn('[ng-disabled="form.$invalid || savingCampaign || (!onlyBottomEnabled && invalidNoYieldStrategy)"]');
    // cy.pause()
  });
});

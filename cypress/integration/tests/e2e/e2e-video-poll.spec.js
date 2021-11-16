import { fetchAllLayouts, findLayoutId } from '../../../support/utils';

const cyTools = require('randomstring');
const dayjs = require('dayjs');
const res = require('../../../support/res');

const currentDate = dayjs().format('HH:mm - MMM DD, YYYY');
const templates = require('../../../../templates/pageTemplate');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
const testPageName = 'testPage.html';
const aniviewChannelId = '5fad4ac42cd6d91dcb6e50e9';
const aniviewPlayerId = '5faf2a6e1b1ab26edc3f9173';
let videoPollLayoutId;

describe('Create video poll', () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    videoPollLayoutId = findLayoutId('video-poll', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${videoPollLayoutId}`)
      .preserveCookie('automationApesterSession'); // Keep the cookies
  });

  it('Add the unit', () => {
    cy
      .typeValue('.content > .insert-url > .ng-pristine', 'https://www.youtube.com/watch?v=q1vN28g7OhI&ab_channel=GadiEidelheit') // Add the video url
      .clickOn('.enter-url') // click on add button
      .typeValue('.main-title > .ape-text-editor-wrapper > .ta-root', `Automation - Video poll: ${randomNumber}`).waitFor(1000) // Add title to cover slide
      .scrollToPosition(0, 300)
      .clickOn('.control__btn > .ic')
      .waitFor(3000)
      .clickOn('.control__btn > .ic') // start and stop the video
      .clickOn('.btn') // click on add quiz button
      .typeValue('.video > .main-title > .ape-text-editor-wrapper > .ta-root', 'This is the question')
      .waitFor(1000) // Add the question
      .typeValue(':nth-child(1) > .options-wrapper > .option > .selected-option > .ng-empty', 'Answer 1') // Add first answer
      .typeValue(':nth-child(2) > .options-wrapper > .option > .selected-option > .ng-empty', 'Answer 2') // Add second answer
      .dragAndDropByPixels('.video-timeline__point', -50, 0)

      .clickOn(':nth-child(1) > .options-wrapper > .option > .selected-option > .ng-valid-maxlength') // Click on answer 1
      .clickOn('.feedback-feeder__nav > .ape-dropdown > .ape-dropdown__label-wrapper > .ape-dropdown--label') // Click on dropdown list
      .clickOn(':nth-child(3) > .ape-dropdown__list-link') // Select 'correct answer' option
      .clickOn(':nth-child(4) > .ape-image > media > .media-image') // Select the answer image
      .clickOn('.bottom-toolbar--feedback > .icon-check-mark') // Confirm the answer image

      .clickOn(':nth-child(2) > .options-wrapper > .option > .selected-option > .ng-valid-maxlength')
      .waitFor(1000) // Click on answer 1
      .clickOn('.feedback-feeder__nav > .ape-dropdown > .ape-dropdown__label-wrapper > .ape-dropdown--label') // Click on dropdown list
      .clickOn(':nth-child(4) > .ape-dropdown__list-link') // Select 'wrong answer' option
      .clickOn(':nth-child(3) > .ape-image > media > .media-image') // Select the answer image
      .clickOn('.bottom-toolbar--feedback > .icon-check-mark') // Confirm the answer image

      .clickOnXpath('/html/body/section/div/section/section/div/div[2]/div[1]/div[3]/h2'); // click on the result slide
    cy.get('.ape-summary-template__list > :nth-child(1)').click('bottomRight')
      .clearValue('.ape-summary-slide__content-title > .ng-pristine').waitFor(1000)
      .typeValue('.ape-summary-slide__content-title > .ng-valid', 'Feedback 1');

    cy.get('.ape-summary-template__list > :nth-child(2)', { force: true }).click('bottomRight')
      .clearValue('#result1 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title > .ng-pristine\n').waitFor(1000)
      .typeValue('#result1 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title > .ng-valid\n', 'Feedback 2');

    cy.get('.ape-summary-template__list > :nth-child(3)', { force: true }).click('bottomRight')
      .clearValue('.ape-summary-slide__content-title > .ng-pristine').waitFor(1000)
      .typeValue('#result2 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title > .ng-valid', 'Feedback 3')
      .clickOn('.ape-summary-template__list > :nth-child(1)') // Click on the first feedback option

      .scrollToPosition(0, 5000)
      .clickOn('.publish-button')
      .waitFor(3000);

    // Create the HTML file
    // Collect the embedded code and store it in variable
    cy.xpath('//*[@id="embed-box"]/div[2]/ape-embed-tab-content/div[1]/ape-textarea-copy/div').invoke('text').then((embeddedCode) => {
      // Create new html file using html template and the collected embedded code
      cy.writeFile(testPageName, templates.htmlTemplate.replace('YOUR_CODE_HERE',
        embeddedCode.replace('Copy', '')).replace('CURRENT_DATE', currentDate));

      // cy.pause()
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------

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

  // it('Test page validation', () => {
  //     cy.startEventListener()
  //         cy.goto('https://galtubi91.github.io/articles/strip-with-playlist-rtk-test-prod/')
  //
  //             // .waitFor(5000)
  //             .eventExist('player_mon_impression')
  //             .eventExist('apester_sdk_display_failed')
  //             // .eventExist('player_mon_loading_pending')
  //             .eventPropertyContains('player_mon_loading_pending', 'interactionId', '5f3a91875c6921649611d417')
  //             cy.refresh()
  //             .eventPropertyContains('player_mon_loading_pending', 'publisherId', '5f3a8cf5685616b6b2d84426')
  //         // .eventPropertyContains('apester_sdk_loaded', 'isArticle', 'true')
  //
  // })
});

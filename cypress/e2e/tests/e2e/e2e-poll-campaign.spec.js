import { fetchAllLayouts, findLayoutId } from '../../../support/utils';

const cyTools = require('randomstring');
const res = require('../../../support/res');
const templates = require('../../../../templates/pageTemplate');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
// const GPTTag = '/57806026/100_fill_320x50';
const testPageName = 'testPage.html';
let pollLayoutId;

describe('Stage 1 - Create new poll', () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    pollLayoutId = findLayoutId('multi poll two', layouts);
  });

  it('step 1 - Login', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
    // Open poll editor in the same tab (replace click on create->poll due to cypress multiple tabs limitation)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${pollLayoutId}`);
    // Keep the cookie between the tests
    Cypress.Cookies.preserveOnce('automationApesterSession');
  });

  it('step 2 - Create the poll', () => {
    cy
    // Switch to Media section
      .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]').waitFor(2000)
    // Close "Welcome to story" page if exist
      .clickIfExist('.story-info-overlay-body__left--button')
    // Click on gif button
      .clickOnText('Gifs')
    // Type value in the search
      .typeValue('.ape-search-form__input', 'test')
    // Click on search button
      .clickOn('.ape-search-form__icon')
      .waitFor(1000)
    // Select the first gif
      .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[3]/media')

    // Add slide title
      .typeValue('.ta-root', `Automation engine: ${randomNumber}`)
    // Click on add new answer button +
      .clickOn('.bottom-toolbar--plus > .ic')
    // Add answer 1
      .typeValue(':nth-child(1) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 1')
    // Add answer 2
      .typeValue(':nth-child(2) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 2')
    // Add answer 3
      .typeValue(':nth-child(3) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 3')
    // Scroll down
      .scrollToPosition(0, 1000)
    // Click on publish button
      .clickOn('.publish-button')
      .waitFor(3000);

    // Create the HTML file
    // Collect the embedded code and store it in variable
    cy.xpath('//*[@id="embed-box"]/div[2]/ape-embed-tab-content/div[1]/ape-textarea-copy/div').invoke('text').then((embeddedCode) => {
      // Create new html file using html template and the embedded code
      cy.writeFile(testPageName, templates.htmlTemplate.replace('YOUR_CODE_HERE',
        embeddedCode.replace('sdk.automation.apester.dev', 'static.automation.apester.dev').replace('Copy', '')));
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------

describe('Stage 2 - Create the campaign', () => {
  it('Step 1 - Login', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password);
    // Open the campaign editor
    Cypress.Cookies.preserveOnce('automationApesterSession');
    cy.goto('https://campaign.automation.apester.dev/#/companion-campaign/new');
  });

  it('Step 2 - Create a new campaign and associate with the channel', () => {
    cy
    // Add campaign name
      .typeValue('#campaignName', `Campaign: ${randomNumber}`)
    // Expand 'Display' section
      .clickOn('[model="collapsableUI.display"] > .header > .title')
    // Enable 'Display'
      .clickOn('[model="collapsableUI.display"] > .header > .switch > .md-primary > .md-container > .md-thumb-container > .md-thumb')

      .waitFor(1000)
    // Add 'Ad provider' (rtk)
      .selectFromDropdown('[model="collapsableUI.display"] > .content > .margin > .content-height > :nth-child(1) > .form-control', 'rtk')
    // Add auction code (aR1s)
      .typeValue('#tag_Auction\\ Code', 'aR1s')
    // Add unit code (4HPA)
      .typeValue('#tag_Ad\\ Unit\\ Code', '4HPA')

    // Click on timer checkbox
      .clickOn(':nth-child(6) > .md-primary > .md-container')
      .waitFor(1000)
    // click on the selection box and select 'every 30 seconds'
      .selectFromDropdown(':nth-child(6) > .form-control', 'every 30 seconds')

    // Scroll down
      .scrollToPosition(0, 1000)
    // Add target channel
      .typeValue('.ui-select-search', 'admin1')
    // Click on the result
      .clickOn('.ui-select-choices-row-inner')
    // Click on 'Add channel' button
      .clickOn('.channel-picker > .setup-button')
    // Click on save button
      .clickOn('[ng-disabled="form.$invalid || savingCampaign"]');
    // Navigate to the campaigns main page
    cy.goto('https://campaign.automation.apester.dev/')
    // Switch to programmatic section
      .clickOn(':nth-child(2) > .ng-binding')
      .clickOnText('Creative');
    // .pauseHere()
  });

  // it('Publish and validate the page', () => {
  //     Cypress.Cookies.preserveOnce('automationApesterSession')
  //       cy
  //           .goto('http://localhost:63342/cypress-automation/testPage.html')
  // })

  // it('Analytics validation?', () => {
  //
  // })
});

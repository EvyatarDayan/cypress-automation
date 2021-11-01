const cyTools = require('randomstring');
const res = require('../../../support/res');
const templates = require('../../../../templates/pageTemplate');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
const GPTTag = '/57806026/100_fill_320x50';
const testPageName = 'testPage.html';

describe('Stage 1 - create new story', () => {
  it('step 1 - Login', () => {
    cy
      .goto(res.automationUrls.login)
      .login(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
    // Open story editor in the same tab (replace click on create->story due to cypress multiple tabs limitation)
      .goto(res.createNewEngine.story);
    // Keep the cookie between the tests
    Cypress.Cookies.preserveOnce('automationApesterSession');
  });

  it('step 2 - Create the story', () => {
    cy
    // ----------- Create the first slide -----------

    // Switch to Media section
      .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]').waitFor(2000)
    // Close "Welcome to story" page if exist
      .clickIfExist('.story-info-overlay-body__left--button')
    // Click on gif button
      .clickOnText('Gifs')
    // Type value in the search
      .typeValue('.ape-search-form__input', 'Vintage movie')
    // Click on search button
      .clickOn('.ape-search-form__icon')
      .waitFor(1000)
    // Select the first gif
      .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[1]/media')
    // Select the git and expand it
      .clickOn('canvas-image-item > .canvas-item__inner')
      .clickOn('.icon-background-mode')
    // Click on the default button
      .clickOn('.cover-button')
      .waitFor(1000)
    // Click on change color button
      .clickOn('.icon-Colorpick')
      .clickOn('[engine="story"] > .ape-color-picker-container > .pallete-wrapperer > :nth-child(1) > :nth-child(3) > .palette-color-container > .palette-color') // Select the color
    // Click on change shape
      .clickOn('.icon-shape-round')
    // Select the shape (square)
      .clickOn('.icon-shape-rectangle')
    // Click on the main story area
      .clickOn('#cover > .slide > .canvas > .canvas-board > .gradient')
    // Click it again to show the color change button
      .clickOn('#cover > .slide > .canvas > .canvas-board > .gradient')
    // Click on change color button
      .clickOn('.contextual-toolbar > .ic')
    // Select the color
      .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(5) > :nth-child(2) > .palette-color-container > .palette-color')
    // Click on the header to close the color selection
      .clickOn('.cover-header')
    // Click on text adding section
      .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
    // Select the first text template
      .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div/div[1]/div[1]/media/img')

    // Select the text box
      .doubleClick('.canvas-item--text > .canvas-item__inner')
    // Backspace several times to remove the text
      .backspaceKey('.canvas-item--text > .canvas-item__inner', 21)
    // Add new text (with random number)
      .typeValue('.canvas-item--text > .canvas-item__inner', `Automation engine: ${randomNumber}`)

    // Click on change color button (text background)
      .clickOn('.icon-Colorpick')
    // Select the color
      .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(5) > :nth-child(2) > .palette-color-container > .palette-color')
    // Change text background transparency (first change attribute to 0 and than move the slider 100px to the right)
      .updateAttr('.ui-slider-handle', 'style', 'left: 0%;');
    cy.get('.ui-slider-handle').move({ x: 100, y: 0, force: true })
    // Change text box position
      .updateAttr('.canvas-item--selected', 'style', 'inset: 48.2788% auto auto 9.375%; width: 80%; height: auto; z-index: 1; transform: none;').waitFor(1000)

    // ----------- Create the second slide -----------

    // Scroll to the second page
      .scrollToPosition(0, 640)
    // Switch to Media section
      .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]')
    // Focus on the second slide
      .clickOn('#slide0 > .canvas > .canvas-board > .gradient')
    // Select the first gif
      .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[1]/media')
    // Select the git and expand it
      .clickOn('#slide0 > .canvas > .canvas-board > .canvas-item > canvas-image-item > .canvas-item__inner')
      .clickOn('.icon-background-mode')
    // Click on text adding section
      .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
    // Select the first text template
      .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div/div[1]/div[2]/media/img')
    // Click on publish button
      .clickOn('.publish-button')
      .waitFor(3000);

    // Create the HTML file
    // Collect the embedded code and store it in variable
    cy.xpath('//*[@id="embed-box"]/div[2]/ape-embed-tab-content/div[1]/ape-textarea-copy/div').invoke('text').then((embeddedCode) => {
      // Create new html file using html template and the collected embedded code
      cy.writeFile(testPageName, templates.htmlTemplate.replace('YOUR_CODE_HERE',
        embeddedCode.replace('sdk.automation.apester.dev', 'static.automation.apester.dev').replace('Copy', '')));
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------

describe('Stage 2 - create the campaign', () => {
  it('step 1 - Login', () => {
    cy
      .goto(res.automationUrls.login)
      .login(res.automationUsers.admin1.email, res.automationUsers.admin1.password);
    // Open the campaign editor
    Cypress.Cookies.preserveOnce('automationApesterSession');
    cy.goto('https://campaign.automation.apester.dev/#/companion-campaign/new');
  });

  it('Publish the engine + campaign to a public web page (git?)', () => {
    cy
    // Add campaign name
      .typeValue('#campaignName', `Campaign: ${randomNumber}`)
    // Expand 'Display' section
      .clickOn('[model="collapsableUI.display"] > .header > .title')
    // Enable 'Display'
      .clickOn('[model="collapsableUI.display"] > .header > .switch > .md-primary > .md-container > .md-thumb-container > .md-thumb')

    // Add 'Ad provider' (100% fill tag)
      .clearValue('#slot')
      .typeValue('#slot', GPTTag)

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
      .clickOn(':nth-child(2) > .ng-binding');
  });

  // it('Test page validation', () => {
  //
  // })
});

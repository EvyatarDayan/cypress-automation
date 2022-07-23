import { fetchAllLayouts, findLayoutId } from '../../../../../support/utils';

const cyTools = require('randomstring');
const res = require('../../../../../support/res');

let storyLayoutId;

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });

describe('Create story', () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    storyLayoutId = findLayoutId('story', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.user3.email, res.automationUsers.user3.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${storyLayoutId}`)
      .preserveCookie('automationApesterSession');
  });

  it('step 2 - Create the story', () => {
    cy
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
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[1]/media')
    // Select the git and expand it
      .clickOn('canvas-image-item > .canvas-item__inner')
      .clickOn('.icon-background-mode')

    // Click on text adding section
      .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
    // Select the first text template
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div/div[1]/div[1]/media/img')

    // Select the text box
      .doubleClick('.canvas-item--text > .canvas-item__inner')
    // Backspace several times to remove the text
      .backspaceKey('.canvas-item--text > .canvas-item__inner', 21)
    // Add new text (with random number)
      .typeValue('.canvas-item--text > .canvas-item__inner', `Automation engine: ${randomNumber}`)

    // ----------- Create the second slide -----------

    // Scroll to the second page
      .scrollToPosition(0, 640)
    // Switch to Media section
      .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]')
    // Focus on the second slide
      .clickOn('#slide0 > .canvas > .canvas-board > .gradient')
    // Select the second gif
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[2]/media')
    // Select the git and expand it
      .clickOn('#slide0 > .canvas > .canvas-board > .canvas-item > canvas-image-item > .canvas-item__inner')
      .clickOn('.icon-background-mode')
    // Click on text adding section
      .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
    // Select the first text template
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div/div[1]/div[1]/media/img')
    // Click on publish button
      .clickOn('.publish-button')
      .waitFor(5000);
  });

  // it('Delete the unit', () => {
  //   cy
  //       .goto(`${Cypress.env('PORTAL_PUBLIC_URL')}/auth/login`)
  //       .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
  //       .typeValue('.search-filter > .ng-pristine', randomNumber)
  //       .clickOn('.circle-search-btn > .ic')
  //       .waitFor(500)
  //       .hoverElement('.action-items')
  //       .waitFor(500)
  //       .clickOn('.icon-archive')
  //       .waitFor(500)
  //       .clickOn('.warning-popup__container--accept-btn');
  // });

  it('Validate preview page', () => {
    cy
    // Close "Welcome to story" page if exist
      .clickIfExist('.story-info-overlay-body__left--button')
      .waitFor(2000)
    // click on the preview button

      .clickOn('[ng-if="WH.published"] > .workspace-header__view')

      .clickOn('[ng-if="onText"]')
      .waitFor(500)
      .clickOn('[ng-if="offText"]');

    // .switchToIframe('#iframe-wrapper > iframe')
    // .iframeClickOn('#iframe-wrapper > iframe', '.shareButton');

    // .refresh();
    // todo: Fail to display the preview on automation only: -- Cannot read properties of undefined (reading 'autoFullscreen'
  });
});

import { fetchAllLayouts, findLayoutId } from '../../../../../support/utils';

const cyTools = require('randomstring');
const res = require('../../../../../support/res');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
let pollLayoutId;

describe('Create poll', () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    pollLayoutId = findLayoutId('multi-poll-two', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${pollLayoutId}`)
      .preserveCookie('automationApesterSession');
  });

  it('Create the unit', () => {
    cy
    // Switch to Media section
      .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]').waitFor(2000)
    // Close "Welcome to story" page if exist
      .clickIfExist('.story-info-overlay-body__left--button')
    // Click on gif button
      .clickOnText('Gifs')
    // Type value in the search
      .typeValue('.ape-search-form__input', 'vintage movie')
    // Click on search button
      .clickOn('.ape-search-form__icon')
      .waitFor(1000)
    // Select the first gif
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[2]/media')

    // Click on Add cover
      .clickOn('[ng-show="!interaction.data.cover"]')
      .scrollToPosition(0, 0)
    // Add cover title
      .typeValue('[engine="multi-poll-two"] > .main-title > .ape-text-editor-wrapper > .ta-root', `Poll cover: ${randomNumber}`)
      .waitFor(1000)
    // Add slide title
      .typeValue('[max-length="180"] > .main-title > .ape-text-editor-wrapper > .ta-root', `Poll slide: ${randomNumber}`)
      .scrollToPosition(0, 486)
    // .pauseHere()
    // Click on add new answer button +
      .clickOn('.bottom-toolbar--plus > .ic')
    // Add answer 1
      .typeValue(':nth-child(1) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 1')
    // Add answer 2
      .typeValue(':nth-child(2) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 2')
    // Add answer 3
      .typeValue(':nth-child(3) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 3')
    // Scroll all the way down
      .scrollToPosition(0, 1000)
    // Click on publish button
      .clickOn('.publish-button')
      .waitFor(3000);
  });

  it('Delete the unit', () => {
    cy
      .goto(`${Cypress.env('PORTAL_PUBLIC_URL')}/auth/login`)
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
      .typeValue('.search-filter > .ng-pristine', randomNumber)
      .clickOn('.circle-search-btn > .ic')
      .waitFor(500)
      .hoverElement('.action-items')
      .waitFor(500)
      .clickOn('.icon-archive')
      .waitFor(500)
      .clickOn('.warning-popup__container--accept-btn');
  });
});

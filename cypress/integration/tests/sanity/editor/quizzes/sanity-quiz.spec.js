import { fetchAllLayouts, findLayoutId } from '../../../../../support/utils';

const cyTools = require('randomstring');
const res = require('../../../../../support/res');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
let quizLayoutId;

describe('Create quiz', () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    quizLayoutId = findLayoutId('multi-trivia-two', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.user3.email, res.automationUsers.user3.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${quizLayoutId}`)
      .preserveCookie('automationApesterSession');
  });

  it('Create the unit', () => {
    cy
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

      .clickOn('[ng-show="!interaction.data.cover"]')
      .scrollToPosition(0, 0)
    // Add cover title
      .typeValue('[engine="multi-trivia-two"] > .main-title > .ape-text-editor-wrapper > .ta-root', `Quiz cover: ${randomNumber}`)
      .waitFor(1000)
      .scrollToPosition(0, 400)
    // Add slide title
      .typeValue('[max-length="180"] > .main-title > .ape-text-editor-wrapper > .ta-root', `Quiz slide: ${randomNumber}`)
    // Click on add new answer button +
      .clickOn('.bottom-toolbar--plus > .ic')
    // Add answer 1
      .typeValue(':nth-child(1) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 1')
    // Add answer 2
      .typeValue(':nth-child(2) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 2')
    // Add answer 3
      .typeValue(':nth-child(3) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 3')

      .scrollToPosition(0, 1100);
    // Add feedback 1 for result 1
    cy.get('.ape-summary-template__list > :nth-child(1)').click('bottomLeft')
      .typeValue('.ape-summary-template__list > :nth-child(1)', ' - Feedback 1');
    // Add feedback 2 for result 2
    cy.get('#result1 > .ape-summary-slide__canvas > .editable-background', { force: true }).click('topLeft')
      .typeValue('#result1 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title', ' - Feedback 2');
    // Add feedback 3 for result 3
    cy.get('#result2 > .ape-summary-slide__canvas > .editable-background', { force: true }).click('topLeft')
      .typeValue('#result2 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title', ' - Feedback 3')
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


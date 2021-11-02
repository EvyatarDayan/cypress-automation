import { fetchAllLayouts, findLayoutId } from '../../../support/utils';

const res = require('../../../support/res');

let pollLayoutId;

describe('Create poll e2e', () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    pollLayoutId = findLayoutId('multi poll two', layouts);
  });

  it('Login', () => {
    cy
      .goto(res.automationUrls.login)
      .login(res.automationUsers.user1.email, res.automationUsers.user1.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${pollLayoutId}`)
      .preserveCookie('automationApesterSession'); // Keep the cookies
  });

  it('Add the engine', () => {
    cy
      .clickOn('[ng-show="!interaction.data.cover"]') // Click on Add cover
      .typeValue('[engine="multi-poll-two"] > .main-title > .ape-text-editor-wrapper > .ta-root', 'This is the cover') // Add cover
      .clickOn('#slide0 > .canvas > .content') // Click on the main slide
      .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div/div[1]/div[8]/media/img') // Select image for the slide
      .typeValue('[max-length="180"] > .main-title > .ape-text-editor-wrapper > .ta-root', 'This is the poll title')
      .waitFor(1000) // Add poll title
      .typeValue(':nth-child(1) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 1') // Add answer 1
      .typeValue(':nth-child(2) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 2') // Add answer 2
      .clickOn('.bottom-toolbar--normal > :nth-child(1) > .ic') // Click on layout button
      .clickOn('#slide0 > .bottom-toolbar > .bottom-toolbar--layouts > .icon-image-layout') // Choose the layout
      .clickOn('#slide0 > .bottom-toolbar > .bottom-toolbar--layouts > .icon-circle-check') // Confirm

      .scrollToPosition(0, 1000)
      .waitFor(1000)
      .clickOn('[ng-click="regenerateResultsSlides()"]') // Click on add feedback
      .clickOn('#categoryList > ul > :nth-child(2)') // Switch to 'Urban' tab
      .clickOn(':nth-child(2) > ng-transclude > .template-item > span') // select the second option
      .clickOnXpath('//*[@id="result0"]') // Click on the first feedback
      .clearValue(':nth-child(2) > font') // Clear the default feedback text
      .typeValue('.ape-summary-slide__content-title', 'This is the first feedback') // Add new text
      .clickOnByPixels('.ape-slider__toggle', 40, 40) // Open the seconds slider
      .clickOnByPixels('.ape-slider--steps', 0, 100); // Click on the middle of the seconds slider

    // .clickOn('.publish-button')     // Click on publish
  });
});

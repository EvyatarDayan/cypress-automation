import { fetchAllLayouts, findLayoutId } from '../../../../../support/utils';

const cyTools = require('randomstring');
const res = require('../../../../../support/res');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
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
      .preserveCookie('automationApesterSession');
  });

  it('Create the unit', () => {
    cy
      .typeValue('.content > .insert-url > .ng-pristine', 'https://www.youtube.com/watch?v=q1vN28g7OhI&ab_channel=GadiEidelheit') // Add the video url
      .clickOn('.enter-url') // click on add button
      .typeValue('.main-title > .ape-text-editor-wrapper > .ta-root', `Video poll cover: ${randomNumber}`).waitFor(1000) // Add title to cover slide
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
      .clickOn('.bottom-toolbar--feedback > .icon-check-mark'); // Confirm the answer image

    // click on the result slide
    cy.scrollToPosition(0, 1000);
    cy.get('.ape-summary-template__list > :nth-child(1)').click('bottomRight')
      .clearValue('.ape-summary-slide__content-title > .ng-pristine').waitFor(1000)
      .typeValue('.ape-summary-slide__content-title > .ng-valid', 'Feedback 1')
      .waitFor(1000);

    cy.get('.ape-summary-template__list > :nth-child(2)', { force: true }).click('bottomLeft')
      .clearValue('#result1 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title > .ng-pristine\n').waitFor(1000)
      .typeValue('#result1 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title > .ng-valid\n', 'Feedback 2');

    cy.get('.ape-summary-template__list > :nth-child(3)', { force: true }).click('bottomLeft')
      .clearValue('.ape-summary-slide__content-title > .ng-pristine').waitFor(1000)
      .typeValue('#result2 > .ape-summary-slide__canvas > [ng-if="shouldOpenCanvas"] > .vertical-align-helper > .vertical-align > .ape-summary-slide__content > .columns > :nth-child(2) > .ape-summary-slide__content-text > .ape-summary-slide__content-title > .ng-valid', 'Feedback 3')
      .clickOn('.ape-summary-template__list > :nth-child(1)') // Click on the first feedback option

      .scrollToPosition(0, 5000)
      .clickOn('.publish-button')
      .waitFor(1000);
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

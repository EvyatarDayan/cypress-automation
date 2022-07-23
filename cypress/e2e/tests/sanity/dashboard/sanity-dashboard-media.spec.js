import { fetchAllLayouts, findLayoutId } from '../../../../support/utils';

const dayjs = require('dayjs');

const currentDate = dayjs().format('DD MMM YYYY, HH:mm'); // Using current time or + 1 minute
const extraMinute = parseInt(dayjs().format('mm'), 10 + 1); // Adding 1 minute (a minute might pass between unit save and time validation)
const currentDateExtraMinute = dayjs().format(`DD MMM YYYY, HH:${extraMinute}`); // This is the current date + 1 minute extra
const cyTools = require('randomstring');
const res = require('../../../../support/res');

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });
let pollLayoutId;

describe('Create poll', () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    pollLayoutId = findLayoutId('multi-poll-two', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.user2.email, res.automationUsers.user2.password)
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
      .waitFor(3000)
      .preserveCookie('automationApesterSession')
      // Open media tab
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/dashboard?tab=media`);
  });

  it('Validate unit content', () => {
    cy
      // Search for the created unit
      .typeValue('.search-filter > .ng-pristine', randomNumber)
    // Click on search button
      .clickOn('.circle-search-btn > .ic')

    // Validate unit title
      .textContains('[ng-bind-html=boxTitle]', `Poll cover: ${randomNumber}`)
    // Validate unit type (icon)
      .attributeContains('i.engine.ic.icon-poll', 'class', 'engine ic icon-poll');
    // Extracting 'user name' from the 'email' (removing everything after the @)
    const userEmail = res.automationUsers.user2.email;
    const userName = userEmail.substring(0, userEmail.lastIndexOf('@'));
    // Validate date, user and channel title
    cy.textContains('.user-data', `${currentDate || currentDateExtraMinute} By ${userName} Via ${userName} channel`)

    // Hover and check view button
      .hoverElement('.icon-view')
      .waitFor(200)
      .textContains('.icon-view > .action-title', 'View')
    // Hover and check Edit button
      .hoverElement('.icon-edit')
      .waitFor(200)
      .textContains('.icon-edit > .action-title', 'Edit')
    // Hover and check Duplicate button
      .hoverElement('.icon-duplicate')
      .waitFor(200)
      .textContains('.icon-duplicate > .action-title', 'Duplicate')
    // Hover and check Add To Playlist button
      .hoverElement('.icon-playlist-add')
      .waitFor(200)
      .textContains('.icon-playlist-add > .action-title', 'Add To Playlist')
    // Hover and check Archive button
      .hoverElement('.icon-archive')
      .waitFor(200)
      .textContains('.icon-archive > .action-title', 'Archive')
    // Hover and check Results button
      .hoverElement('.icon-results')
      .waitFor(200)
      .textContains('.icon-results > .action-title', 'Results')
    // Hover and check Embed button
      .hoverElement('.icon-embed')
      .waitFor(200)
      .textContains('.icon-embed > .action-title', 'Embed')
    // Hover and check Share button
      .hoverElement('.icon-share')
      .waitFor(200)
      .textContains('.icon-share > .action-title', 'Share')
    // Hover and check Sources button
      .hoverElement('.icon-url')
      .waitFor(200)
      .textContains('.icon-url > .action-title', 'Sources')

    // Unit footer / views
      .textContains('.stats-container > :nth-child(1)', 'Views 0')
    // CTR
      .textContains('.stats-container > :nth-child(2)', 'CTR (%) 0')
    // Avg. Time
      .textContains('.stats-container > :nth-child(3)', 'Avg. Time --')
    // Social
      .textContains('.stats-container > :nth-child(4)', 'Social 0');
  });

  it('Navigation bar', () => {
    cy
    // Filter
      .clickOn('.filters-header')
      .waitFor(500)
      .hoverXpathElement('/html/body/section/div/div/div/div[3]/div/header/div/div[1]/div/div[2]/div[1]/div')
      .waitFor(500)
      .hoverXpathElement('/html/body/section/div/div/div/div[3]/div/header/div/div[1]/div/div[2]/div[2]/div')
      .waitFor(500)
      .hoverXpathElement('/html/body/section/div/div/div/div[3]/div/header/div/div[1]/div/div[2]/div[4]/div')
      .waitFor(500)
      .hoverXpathElement('/html/body/section/div/div/div/div[3]/div/header/div/div[1]/div/div[2]/div[5]/div')
      .waitFor(500)
      .hoverElement('.date-filter')
      .waitFor(500)
      .hoverXpathElement('/html/body/section/div/div/div/div[3]/div/header/div/div[1]/div/div[2]/div[6]/div')
      .clickOn('.ape-navbar > .container')
    // Total title
      .textContains('.ape-counter', 'TOTAL | 1')
    // Sort by Updated/Created
      .clickOn('[title=sortByCreation]')
      .waitFor(500)
      .clickOn('[title=sortByUpdate]');
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

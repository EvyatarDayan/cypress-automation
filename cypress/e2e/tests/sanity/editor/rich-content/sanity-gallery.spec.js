import { fetchAllLayouts, findLayoutId } from '../../../../../support/utils';

const cyTools = require('randomstring');
const res = require('../../../../../support/res');

let galleryLayoutId;

const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });

describe('Create gallery', async () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    galleryLayoutId = findLayoutId('gallery', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.user3.email, res.automationUsers.user3.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${galleryLayoutId}`)
      .preserveCookie('automationApesterSession');
  });

  it('Create gallery', () => {
    cy
    // Go to "Explore" tab
      .clickOnText('Explore')
    // Select "Computer" section
      .clickOn('[data-image="https://img.automation.apester.dev/insecure/fit/0/0/ce/0/plain/user-images%2F00%2F0080e0ce758bbdf023bf4ed02501158e.jpg"]')
    // Choose one of the images
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[2]/media/img')
    // // click on the first slide
    //   .clickOn('#slide0 > .canvas > .canvas-board > .canvas-item--image > canvas-image-item > span > .canvas-item__inner')
    // click on add new slide button
      .clickOn('#slide0 > .canvas > .btn-outside-canvas > .slide-bar__container > [ng-disabled="disableAdd"] > .btn')
    // Click on gif button
      .clickOnText('Gif')

    // Type value in the search
      .typeValue('.ape-search-form__input', 'Vintage movie')
    // Click on search button
      .clickOn('.ape-search-form__icon')
      .waitFor(1000)
    // Select the first gif
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[2]/media')

    // Click on text adding section
      .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
    // Select the first text template
      .doubleClickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div/div[1]/div[1]/media/img')
    // Click on change color button (text background)
      .clickOn('.icon-Colorpick')
    // Select the color
      .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(2) > :nth-child(1) > .palette-color-container > .palette-color')
    // Change text background transparency (first change attribute to 0 and than move the slider 100px to the right)
      .updateAttr('.ui-slider-handle', 'style', 'left: 0%;');
    cy.get('.ui-slider-handle').move({ x: 100, y: 0, force: true })
    // Change text box position
      .updateAttr('.canvas-item--selected', 'style', 'inset: 61.557% auto auto 9.6875%; width: 80%; height: auto; z-index: 2; transform: none;')
    // Change the color again
      .waitFor(1000)
      .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(5) > :nth-child(4) > .palette-color-container > .palette-color')

    // Add bottom link
      .clickOn('#slide1 > .canvas > .btn-outside-canvas > .slide-bar__container > [ng-disabled="disableLink"] > .btn')
    // Add URL
      .typeValue('.see-more__url__container__input', 'https://apester.com/link')
    // Click on apply button
      .clickOn('.action-label__apply')
    // Click on bottom link button
      .clickOn('.render-see-more__item > :nth-child(1) > .ic')
    // Select option 2 (download)
      .clickOn(':nth-child(2) > .type-label')
    // Click on change color button
      .clickOn('.icon-Colorpick')
    // Select the color
      .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(1) > :nth-child(2) > .palette-color-container > .palette-color')
    // Click on change color button of the main title
      .clickOn('[index="2"] > .canvas-item__inner')
    // Select the color
      .clickOn('.icon-Colorpick')
    // Select the color changing by string option
      .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(2) > :nth-child(3) > .palette-color-container > .palette-color')
    // Removing the current color string
      .backspaceKey('.canvas > .ape-color-picker-container > .pallete-wrapperer > .color-preview-wrapper > .input-preview > .ng-valid', 12)
    // Adding the new color string
      .typeValue('.canvas > .ape-color-picker-container > .pallete-wrapperer > .color-preview-wrapper > .input-preview > .ng-valid', '2574a9')
    // Change text background transparency (first change attribute to 0 and than move the slider 100px to the right)
      .updateAttr('.ui-slider-handle', 'style', 'left: 0%;');
    cy.get('.ui-slider-handle').move({ x: 80, y: 0, force: true })
    // Switch to "Paragraph" tab
    // .clickOn('.panel__categories > :nth-child(2)')

    // Select the text box
      .doubleClick('[index="2"] > .canvas-item__inner')
    // Backspace several times to remove the text
      .backspaceKey('[index="2"] > .canvas-item__inner', 20)
    // Add the new text
      .typeValue('[index="2"] > .canvas-item__inner', 'es, this is my new text...')
    // Change text box position
      .updateAttr('.canvas-item--selected', 'style', 'inset: 34.6069% auto auto 9.6875%; width: 80%; height: auto; z-index: 4; transform: none;')
    // Select the color
      .clickOn('.icon-Colorpick')
    // // Select the color changing by string option
      .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(4) > :nth-child(5) > .palette-color-container > .palette-color')
    // Change text background transparency (first change attribute to 0 and than move the slider 100px to the right)
      .updateAttr('.ui-slider-handle', 'style', 'left: 0%;');
    cy.get('.ui-slider-handle').move({ x: 80, y: 0, force: true })
      .clickOn('.workspace')
      .scrollToPosition(0, 0)
      .clickOn('#slide0 > .canvas > .canvas-board > .canvas-item--image > canvas-image-item > span > .canvas-item__inner')
    // Click on text adding section
      .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
    // // Select the first text template
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div/div[1]/div[1]/media/img')
    // Select the text box
      .doubleClick('#slide0 > .canvas > .canvas-board > [index="2"] > .canvas-item__inner')
    // Backspace several times to remove the text
      .backspaceKey('#slide0 > .canvas > .canvas-board > [index="2"] > .canvas-item__inner', 21)
    // Add the new text
      .typeValue('#slide0 > .canvas > .canvas-board > [index="2"] > .canvas-item__inner', `Gallery title ${randomNumber}`);

    // .scrollToPosition(0, 5000);
    // .clickOn('.publish-button')
    // .waitFor(1000);
  });

  // todo: Gallery unit don't display in the dashboard (bug number 2247)
  // it('Delete the unit', () => {
  //   cy
  //     .goto(`${Cypress.env('PORTAL_PUBLIC_URL')}/auth/login`)
  //     .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
  //     .typeValue('.search-filter > .ng-pristine', randomNumber)
  //     .clickOn('.circle-search-btn > .ic')
  //     .waitFor(500)
  //     .hoverElement('.action-items')
  //     .waitFor(500)
  //     .clickOn('.icon-archive')
  //     .waitFor(500)
  //     .clickOn('.warning-popup__container--accept-btn');
  // });
});

import { fetchAllLayouts, findLayoutId } from '../../../../../support/utils';

// const cyTools = require('randomstring');
const res = require('../../../../../support/res');

let customLayoutId;

// const randomNumber = cyTools.generate({ length: 5, charset: '1234567890' });

describe('Create story', async () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    customLayoutId = findLayoutId('custom', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${customLayoutId}`)
      .preserveCookie('automationApesterSession');
  });

  it('step 1 - Slide settings', () => {
    cy
    // Switch to Media section
      .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]').waitFor(2000)
    // Close "Welcome to story" page if exist
      .clickIfExist('.story-info-overlay-body__left--button')
    // Slide height
      .typeValue(':nth-child(1) > .designer-input', '420')
      .waitFor(500)
    // Slide width
      .typeValue(':nth-child(2) > .designer-input', '420')
      .waitFor(500)
    // Slide background
      .clickOn('.sign > .ic')
      .typeValue(':nth-child(1) > .input-box-wrapper > .designer-input', '#828385')
    // Slide background opacity
      .typeValue('.opacity-color-setter', '80');
  });

  it('step 2 - Add image', () => {
    cy
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div[2]/div/div[1]/div[2]/media/img') // select image
      .typeValue('.opacity-properties > .input-box-wrapper > .designer-input', '50%') // opacity
      .clickOn(':nth-child(1) > .option-icon')
      .typeValue(':nth-child(2) > .input-box-wrapper > .designer-input', '320') // width
      .clickOn(':nth-child(2) > .input-box-wrapper > .label')
      .typeValue(':nth-child(4) > .input-box-wrapper > .designer-input', '180') // height
      .clickOn(':nth-child(4) > .input-box-wrapper > .label')
      .typeValue(':nth-child(3) > .input-box-wrapper > .designer-input', '30') // x position
      .clickOn(':nth-child(3) > .input-box-wrapper > .label')
      .typeValue(':nth-child(5) > .input-box-wrapper > .designer-input', '200') // y position
      .clickOn(':nth-child(5) > .input-box-wrapper > .label')
      .typeValue(':nth-child(6) > .input-box-wrapper > .designer-input', '10') // angle
      .clickOn('.input-box-wrapper > .ic')
      // Set stroke
      .clickOn('.sign > .ic') // expand
      .typeValue('.expandable-content > :nth-child(1) > .input-box-wrapper > .designer-input', '#828385') // color
      .typeValue('[style="align-items: center; grid-row: 3 / auto; width: 70px; padding-left: 5px;"] > .designer-input', '9') // stroke width
      .clickOn('[style="align-items: center; grid-row: 3 / auto; width: 70px; padding-left: 5px;"] > .ic');
  });

  it('step 3 - Add gif', () => {
    cy
      // Click on gif button
      .clickOnText('Gifs')
      // Type value in the search
      .typeValue('.ape-search-form__input', 'Photography')
      // Click on search button
      .clickOn('.ape-search-form__icon')
      .waitFor(1000)
      // Select the first gif
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[10]/media/img')
      .clickOn('.canvas-item--selected > .ui-resizable-se') // select the image
      .clickOn('.dropdown-value-container > .ic') // arrange
      .clickOn('.dropdown-options > :nth-child(2) > div') // send to back
      .clickOn('.circle-container > input'); // set as background
  });

  it('step 4 - Add text', () => {
    cy
      // Click on text adding section
      .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
      // Select the first text template
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div/div[1]/div[1]/media/img')
      // // Select the text box
      //   .doubleClick('[index="2"] > custom-item-react > .nonEditText')

    // todo: need to add text to the title (Enosh is working on it)
    // // Select the text box
    // //   .doubleClick('[index="2"] > custom-item-react > .nonEditText')
    //     .typeValue('.selected-item', '2352365436346')
    //     .pauseHere()
    // // Backspace several times to remove the text
    //   .backspaceKey('[index="2"] > custom-item-react > .nonEditText', 21)
    // // Add new text (with random number)
    //   .typeValue('[index="2"] > custom-item-react > .nonEditText', `Automation engine: ${randomNumber}`)
    //   .pauseHere()

      // Select font type
      .clickOn('.single-dropdown > .dropdown-value-container > .ic')
      .clickOn('.dropdown-options > :nth-child(6) > div')
      // Select font style
      .clickOn('.font-setter-second-row > :nth-child(1) > .dropdown-value-container > .ic')
      .clickOn('.dropdown-options > :nth-child(5) > div')
      // Select font size
      .clickOn('.font-setter-second-row > :nth-child(2) > .dropdown-value-container > .ic')
      .clickOn('.dropdown-options > :nth-child(10) > div')
      // Alignment
      .clickOn(':nth-child(3) > .radio-button-options > :nth-child(2) > .option-icon')
      // Decoration
      .clickOn(':nth-child(4) > .radio-button-options > :nth-child(2) > .option-icon')
      // Position
      .typeValue(':nth-child(3) > .input-box-wrapper > .designer-input', '30') // x position
      .typeValue(':nth-child(5) > .input-box-wrapper > .designer-input', '60') // y position
      // Text color
      .typeValue('[style="grid-row: 3 / auto;"] > .input-box-wrapper > .designer-input', '#4d99e9') // x position
      // Link
      .clickOn(':nth-child(5) > .section-title > .sign')
      .typeValue('.expandable-content > .input-box-wrapper > .designer-input', 'https://apester.com/')
      // Text background
      .clickOn(':nth-child(6) > .section-title > .sign > .ic')
      .typeValue(':nth-child(6) > .expandable-content > :nth-child(1) > .input-box-wrapper > .designer-input', '#181818') // text color
      .clickOn('.designer-editor-container')
      // Text stroke
      .clickOn(':nth-child(7) > .section-title > .sign > .ic')
      .typeValue(':nth-child(7) > .expandable-content > :nth-child(1) > .input-box-wrapper > .designer-input', '#e97421') // color
      .typeValue('[style="align-items: center; grid-row: 3 / auto; width: 70px; padding-left: 5px;"] > .designer-input', '5') // stroke width
      .clickOn('[style="align-items: center; grid-row: 3 / auto; width: 70px; padding-left: 5px;"] > .ic')
      // Arrange
      .clickOn('.arrange-properties > .radio-button-box-wrapper > .radio-button-options > :nth-child(2) > .option-icon');
  });

  it('step 5 - Add interactions', () => {
    cy
      .clickOn('#left-panel-items-list > :nth-child(4) > .md-none-theme') // interaction tab
      .clickOnXpath('/html/body/section/div/section/div/section/div/div[3]/div/div[1]/div[2]/div') // select one of the interactions
      .typeValue(':nth-child(3) > .input-box-wrapper > .designer-input', '122') // x position
      .typeValue(':nth-child(5) > .input-box-wrapper > .designer-input', '258') // y position
      .typeValue(':nth-child(6) > .input-box-wrapper > .designer-input', '10') // angle
      .clickOn('.input-box-wrapper > .ic');
  });

  it('step 6 - Add elements', () => {
    cy
      .clickOn('[ui-sref="general.interaction-editor.sticker({\'disabled\': disabledInventory.stickers})"]') // elements tab
      .clickOnXpath('/html/body/section/div/section/div/section/div[2]/div[2]/div/div/div[1]/div[8]/media/img') // select one of the elements
      .typeValue(':nth-child(3) > .input-box-wrapper > .designer-input', '290') // x position
      .typeValue(':nth-child(5) > .input-box-wrapper > .designer-input', '164') // y position
      .typeValue(':nth-child(6) > .input-box-wrapper > .designer-input', '10') // angle
      .typeValue(':nth-child(2) > .input-box-wrapper > .designer-input', '62') // width
      .clickOn(':nth-child(2) > .input-box-wrapper > .label');
  });
});

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
// });

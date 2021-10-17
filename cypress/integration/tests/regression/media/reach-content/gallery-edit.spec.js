'use strict';

const res = require("../../../../../support/res");

describe('Edit gallery', () => {

    it('Login', () => {
        cy
            .goto(res.automationUrls.login)
            .login(res.automationUsers.user1.email, res.automationUsers.user1.password)
    })

    it('Navigate to edit page', () => {
        cy
            // Type "Gallery"
            .typeValue('.search-filter > .ng-pristine' ,'Automation gallery')
            // Click no search button
            .clickOn('.circle-search-btn > .ic')
            .waitFor(1000)
            // Click on edit button (open in current tab)
            .openInCurrentTab('.icon-edit')
    })

    it('Edit gallery', () => {
        cy
            // click on the first slide
            .clickOn('#slide0 > .canvas > .canvas-board > .canvas-item--image > canvas-image-item > span > .canvas-item__inner')
            // click on add new slide button
            .clickOn('#slide0 > .canvas > .btn-outside-canvas > .slide-bar__container > [ng-disabled="disableAdd"] > .btn')
            // Click on gif button
            .clickOnText('Gifs')

            // Type value in the search
            .typeValue('.ape-search-form__input', 'Vintage movie')
            // Click on search button
            .clickOn('.ape-search-form__icon')
            .waitFor(1000)
            // Select the first gif
            .doubleClickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[1]/media')
            // Click on text adding section
            .clickOn('[ui-sref="general.interaction-editor.text({\'disabled\': disabledInventory.text})"]')
            // Select the first text template
            .doubleClickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div/div[1]/div[1]/media/img')
            // Click on change color button (text background)
            .clickOn('.icon-Colorpick')
            // Select the color
            .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(2) > :nth-child(1) > .palette-color-container > .palette-color')
            // Change text background transparency (first change attribute to 0 and than move the slider 100px to the right)
            .updateAttr('.ui-slider-handle', 'style', 'left: 0%;')
            cy.get('.ui-slider-handle').move({x: 100, y: 0 ,force: true})
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
            .clickOn('#slide1 > .canvas > .canvas-board > [index="1"] > .canvas-item__inner')
            // Select the color
            .clickOn('.icon-Colorpick')
            // Select the color changing by string option
            .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(2) > :nth-child(3) > .palette-color-container > .palette-color')
            // Removing the current color string
            .backspaceKey('.canvas > .ape-color-picker-container > .pallete-wrapperer > .color-preview-wrapper > .input-preview > .ng-valid', 12)
            // Adding the new color string
            .typeValue('.canvas > .ape-color-picker-container > .pallete-wrapperer > .color-preview-wrapper > .input-preview > .ng-valid', '2574a9')
            // Change text background transparency (first change attribute to 0 and than move the slider 100px to the right)
            .updateAttr('.ui-slider-handle', 'style', 'left: 0%;')
            cy.get('.ui-slider-handle').move({x: 80, y: 0 ,force: true})
            // Switch to "Paragraph" tab
                // .clickOn('.panel__categories > :nth-child(2)')

                // Select the text box
                .doubleClick('#slide1 > .canvas > .canvas-board > [index="1"] > .canvas-item__inner')
                // Backspace several times to remove the text
                .backspaceKey('#slide1 > .canvas > .canvas-board > [index="1"] > .canvas-item__inner', 20)
                // Add the new text
                .typeValue('#slide1 > .canvas > .canvas-board > [index="1"] > .canvas-item__inner', 'es, this is my new text...')
                // Add another text box by double click (the third)
                .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div/div[1]/div[3]/media/img')
                // Change text box position
                .updateAttr('.canvas-item--selected', 'style', 'inset: 34.6069% auto auto 9.6875%; width: 80%; height: auto; z-index: 4; transform: none;')
                // Select the color
                .clickOn('.icon-Colorpick')
                // // Select the color changing by string option
                .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(4) > :nth-child(5) > .palette-color-container > .palette-color')
                // Change text background transparency (first change attribute to 0 and than move the slider 100px to the right)
                .updateAttr('.ui-slider-handle', 'style', 'left: 0%;')
                cy.get('.ui-slider-handle').move({x: 80, y: 0 ,force: true})
                .clickOn('.workspace')
                    // .multipleClicks('.canvas-item--selected > .canvas-item__inner', 3)
        // $("[id^=jander]").eq(2).doubleClick('{force: true}')
        cy.pauseHere()
    })
});

'use strict';

const res = require("../../../../support/resources");

describe('Edit story', () => {

    it('Login', () => {
        cy
            .visit(res.stageUrls.login)
            .login(res.stageUsers.user1.email, res.stageUsers.user1.password)
    })

    it('Navigate to edit page', () => {
        cy
            .typeValue('.search-filter > .ng-pristine' ,'Story')
            .clickOn('.circle-search-btn > .ic')
            .waitFor(1000)
            .openInCurrentTab('.icon-edit')
    })

    it('Edit story', () => {
        cy
            // Switch to Media section
            .clickOn('[ui-sref="general.interaction-editor.inventory({\'disabled\': disabledInventory.media})"]')
            .waitFor(2000)
            // Close "Welcome to story" page if exist
            .clickIfExist('.story-info-overlay-body__left--button')
            // Click on gif button
            .clickOnText('Gifs')
            // Type value in the search
            .typeValue('.ape-search-form__input', 'The office')
            // Click on search button
            .clickOn('.ape-search-form__icon')
            .waitFor(1000)
            // Select the first gif
            .doubleClickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div[3]/div[1]/div[2]/media')
            // Click on the default button
            .clickOn('.cover-button')

            .waitFor(1000)
            // Click on change color button
            .clickOn('.icon-Colorpick')
            .clickOn('[engine="story"] > .ape-color-picker-container > .pallete-wrapperer > :nth-child(5) > :nth-child(2) > .palette-color-container > .palette-color')   // Select the color
            // Click on change shape
            .clickOn('.icon-shape-oval')
            // Select the shape (square)
            .clickOn('.icon-shape-rectangle')

            // Click on the main story area
            .clickOn('#cover > .slide > .canvas > .canvas-board > .gradient')
            // Click it again to show the color change button
            .clickOn('#cover > .slide > .canvas > .canvas-board > .gradient')

            // Click on change color button
            .clickOn('.contextual-toolbar > .ic')
            // Select the color
            .clickOn('.canvas > .ape-color-picker-container > .pallete-wrapperer > :nth-child(2) > :nth-child(2) > .palette-color-container > .palette-color')
            // Click on the header to close the color selection
            .clickOn('.cover-header')
            // Scroll to the second page
            .scrollToPosition(0, 698)
            .clickOn('#slide0 > .canvas > .canvas-board > [index="0"] > canvas-image-item > .canvas-item__inner')
            // Scroll to the second page
            .scrollToPosition(0, 698)
            .clickOn('.icon-trash')
            .clickOn('#slide0 > .canvas > .canvas-board > .gradient')

            // Scroll to settings section
            .scrollToPosition(0, 1535)
            .waitFor(2000)
            // uncheck first checkbox
            .uncheckCheckbox('#Author')
            // Check third checkbox
            .checkCheckbox('#channelNameAndLogo')
            // Scroll to embedded section
            .scrollToPosition(0, 2248)
            cy.pause()
  })
})

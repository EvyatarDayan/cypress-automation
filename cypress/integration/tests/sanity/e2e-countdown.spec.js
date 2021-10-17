'use strict';

const res = require("../../../support/res");

describe('Edit video quiz', () => {

    it('Login', () => {
        cy
            .goto(res.automationUrls.login)
            .login(res.automationUsers.user1.email, res.automationUsers.user1.password)
            .goto(res.createNewEngine.countdown)
    })

    it('Add video', () => {
        cy
            .clickOn('.add-cover')  // Click on Add cover
            .typeValue('[engine="contest-poll"] > .main-title > .ape-text-editor-wrapper > .ta-root', 'This is the cover')  // Add cover
            .clickOn('#slide0 > .canvas > .content')    // Click on the main slide
            .clickOnXpath('/html/body/section/div/section/section/div[2]/div[2]/div/div[2]/div/div[1]/div[8]/media/img')    // Select image for the slide
            .typeValue('[max-length="180"] > .main-title > .ape-text-editor-wrapper > .ta-root', 'This is the countdown title').waitFor(1000)
            .typeValue(':nth-child(1) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 1')   // Add answer 1
            .typeValue(':nth-child(2) > .options-wrapper > .option > .selected-option > .slide-answer-wrapper > .input-group > .resizableAnswer', 'Answer 2')   // Add answer 2
            .clickOn('.bottom-toolbar--normal > :nth-child(1) > .ic')   // Click on layout button
            .clickOn('#slide0 > .bottom-toolbar > .bottom-toolbar--layouts > .icon-image-layout')   // Choose the layout
            .clickOn('#slide0 > .bottom-toolbar > .bottom-toolbar--layouts > .icon-circle-check')   // Confirm

            .scrollToPosition(0, 1060)
            .clickOn('#teaser > .slide > .canvas > .content')   // Click on the teaser slide
            .typeValue('.first', 'This is a teaser')    // Add teaser
            .typeValue('.second', 'This is the teaser title')   // Add teaser title
            .scrollToPosition(0, 1400)
            .clickOn(':nth-child(3) > .ape-datetime > .form-control')   // Click on date selection
            .clickOn('.workspace')  // Click out to close the date selection dialog
            .scrollToPosition(0, 1840)
            .clickOn('.publish-button')     // Click on publish
    })
});

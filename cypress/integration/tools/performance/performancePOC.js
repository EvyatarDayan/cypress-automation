'use strict';

const res = require("../../../support/res");

describe('Performance POC', () => {

    it('Check registration page', () => {
        cy
            .checkPerformance(res.automationUrls.register, 5000)
            .waitFor(1000)
        })

    it('Check login page', () => {
        cy
            .checkPerformance(res.automationUrls.login, 5000)
            .waitFor(1000)
        })

    it('Check default page (Media)', () => {
        cy
            .login(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
            .checkPerformance('https://app.automation.apester.dev/dashboard?tab=media', 5000)
            .waitFor(3000)
        })

    it('Check Create new story', () => {
        cy
            .goto(res.createNewEngine.story)
            .checkPerformance('https://app.automation.apester.dev/editor/new?layoutId=60e7098e5d57eb00181def71', 5000)
            .waitFor(3000)
    })

    it('Check Create new poll', () => {
        cy
            .goto(res.createNewEngine.poll)
            .checkPerformance('https://app.automation.apester.dev/editor/new?layoutId=60e7098e5d57eb00181def6a', 5000)
            .waitFor(3000)
    })
})

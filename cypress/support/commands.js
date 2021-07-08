
                                         // -------- CUSTOM COMMANDS -------- //

// ACTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- clickOn --
Cypress.Commands.add('clickOn', (selector)  => {
    cy.get(selector).click()
})

// -- clickOnXpath --
Cypress.Commands.add('clickOnXpath', (xpath)  => {
    cy.xpath(xpath).click()
})

// -- multipleClicks --
Cypress.Commands.add('multipleClicks', (selector, numberOfTimes)  => {
    for (let i = 0; i < numberOfTimes; i++) {
        cy.get(selector).click()
            .wait(500)
    }
})

// -- clickIfExist --
Cypress.Commands.add('clickIfExist', (selector)  => {            // This will click on the element only in case
    cy.get('body').then((body) => {                              // it exist
        if (body.find(selector).length > 0) {
            cy.clickOn(selector)
        }
    });
})

// -- typeValue --
Cypress.Commands.add('typeValue', (selector, value)  => {
    cy.get(selector).type(value)
})

// -- clearValue --
Cypress.Commands.add('clearValue', (selector)  => {
    cy.get(selector).clear()
})

// -- back --
Cypress.Commands.add('back', ()  => {
    cy.go('back')
})

// -- refresh --
Cypress.Commands.add('refresh', ()  => {
    cy.reload()
})

// -- getText --
Cypress.Commands.add('getText', (selector)  => {
    cy.get(selector).invoke('text')
})

// -- clickOnText --
Cypress.Commands.add('clickOnText', (text)  => {
    cy.xpath("//*[contains(text(), '"+text+"')]").click()
})

// -- scrollToElement --
Cypress.Commands.add('scrollToElement', (selector)  => {
    cy.get(selector).scrollIntoView();
})

// -- openInCurrentTab --                                       // This will remove "target" att from the
Cypress.Commands.add('openInCurrentTab', (selector)  => {       // element in order to open the link in the same tab
    cy.get(selector).invoke('removeAttr', 'target').click()     // (Cypress not supporting multiple tabs)
})

// ASSERTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- propertyContains --
Cypress.Commands.add('propertyContains', (selector, property, value)  => {
    cy.get(selector).should('have.css', property, value)
})

// -- attributeContains --
Cypress.Commands.add('attributeContains', (selector, attribute, value)  => {
    cy.get(selector).should('have.attr', attribute, value)
})

// -- urlContains --
Cypress.Commands.add('urlContains', (value)  => {
    cy.url().should('contain', value)
})

// -- textContains --
Cypress.Commands.add('textContains', (selector, text)  => {
    cy.get(selector).contains(text)
})

// -- elementExist --
Cypress.Commands.add('elementExist', (selector)  => {
    cy.get(selector).should('exist')
})

// -- elementNotExist --
Cypress.Commands.add('elementNotExist', (selector)  => {
    cy.get(selector).should('not.exist')
})

// -- validateCookie --
Cypress.Commands.add('validateCookie', (cookieName, cookieValue)  => {
    cy.getCookie(cookieName).should('have.property', 'value', cookieValue)
})

// -- validateCookieDomain --
Cypress.Commands.add('validateCookieDomain', (cookieName, cookieDomain)  => {
    cy.getCookie(cookieName).should('have.property', 'domain', cookieDomain)
})

// IFRAME COMMANDS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- switchToIframe --
Cypress.Commands.add('switchToIframe', (iframe)  => {            // This will switch to iframe, use only native cy commands within that function
    return cy
        .get(iframe)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
});

// -- iframeClickOn --
Cypress.Commands.add('iframeClickOn', (iframe, selector)  => {            // This will enter an iFrame and click on element
    cy.get(iframe)
        .then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .find(selector).click()
        })
});

// -- iframeClickOnText --
Cypress.Commands.add('iframeClickOnText', (iframe, text)  => {            // This will click on text (using xpath)
    cy.get(iframe)
        .then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .xpath("//*[contains(text(), '"+text+"')]").click()
        })
});

// -- iframeTextContains --
Cypress.Commands.add('iframeTextContains', (iframe, selector, text)  => {            // This will enter an iFrame and validate text
    cy.get(iframe)
        .then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .find(selector).contains(text)
        })
});

// -- iframeTypeValue --
Cypress.Commands.add('iframeTypeValue', (iframe, selector, value)  => {            // This will enter an iFrame and validate text
    cy.get(iframe)
        .then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .find(selector).type(value)
        })
});
declare namespace Cypress {
    interface Chainable {
        typeValue(a: string, b: string): Chainable
        textContains(a: string, b: string): Chainable
        clearValue(a: string): Chainable
        elementNotExist(a: string): Chainable
        propertyContains(a: string, b: string, c: string): Chainable
        elementExist(a: string): Chainable
        attributeContains(a: string, b: string, c: string): Chainable
        urlContains(a: string): Chainable
        clickOn(a: string): Chainable
        clickOnXpath(a: string): Chainable
        back(): Chainable
        refresh(): Chainable
        getText(a: string): Chainable
        clickOnText(a: string): Chainable
        validateCookie(a: string, b: string): Chainable
        validateCookieDomain(a: string, b: string): Chainable
        openInCurrentTab(a: string): Chainable
        clickIfExist(a: string): Chainable
        scrollToElement(a: string): Chainable
        multipleClicks(a: string, b: number): Chainable

        // iFrame
        switchToIframe(a: string): Chainable
        iframeClickOn(a: string, b: string): Chainable
        iframeTextContains(a: string, b: string, c: string): Chainable
        iframeClickOnText(a: string, b: string): Chainable
        iframeTypeValue(a: string, b: string, c: string): Chainable

    }
}
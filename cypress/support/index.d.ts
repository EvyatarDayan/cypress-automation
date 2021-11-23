declare namespace Cypress {
    interface Chainable {
        typeValue(a: string, b: string): Chainable
        textContains(a: string, b: string): Chainable
        clearValue(a: string): Chainable
        elementNotExist(a: string): Chainable
        propertyContains(a: string, b: string, c: string): Chainable
        elementExist(a: string): Chainable
        attributeContains(a: string, b: string, c: string): Chainable
        updateAttr(a: string, b: string, c: string): Chainable
        urlContains(a: string): Chainable
        goto(a: string): Chainable
        clickOn(a: string): Chainable
        clickOnByPixels(a: string, b: number, c: number): Chainable
        selectFromDropdown(a: string, b: string): Chainable
        doubleClick(a: string): Chainable
        backspaceKey(a: string, b: number): Chainable
        selectText(a: string, b: number): Chainable
        clickOnXpath(a: string): Chainable
        typeValueByXpath(a: string, b: string): Chainable
        doubleClickOnXpath(a: string): Chainable
        back(): Chainable
        waitFor(a: number): Chainable
        waitForVisibleElement(a: string, b: number): Chainable
        refresh(): Chainable
        pauseHere(): Chainable
        checkCheckbox(a: string): Chainable
        uncheckCheckbox(a: string): Chainable
        getText(a: string): Chainable
        clickOnText(a: string): Chainable
        validateCookie(a: string, b: string): Chainable
        validateCookieDomain(a: string, b: string): Chainable
        openInCurrentTab(a: string): Chainable
        clickIfExist(a: string): Chainable
        scrollToElement(a: string): Chainable
        scrollToPosition(a: number, b: number): Chainable
        hoverElement(a: string): Chainable
        hoverXpathElement(a: string): Chainable
        multipleClicks(a: string, b: number): Chainable
        dragAndDrop(a: string, b: string)
        dragAndDropByPixels(a: string, b: number, c: number)
        dragAndDropByXpath(a: string, b: string)
        dragAndDropByPixelsByXpath(a: string, b: number, c: number)
        loginToPortal(a: string, b: string): Chainable
        preserveCookie(a: string): Chainable

        // events
        startEventListener(): Chainable
        eventExist(a: string): Chainable
        eventStatusCode(a: string, b: number): Chainable
        eventPropertyContains(a: string, b: string, c: string): Chainable
        eventMetadataContains(a: string, b: string, c: string): Chainable


        // iFrame
        switchToIframe(a: string): Chainable
        iframeClickOn(a: string, b: string): Chainable
        iframeTextContains(a: string, b: string, c: string): Chainable
        iframeClickOnText(a: string, b: string): Chainable
        iframeTypeValue(a: string, b: string, c: string): Chainable

        // Performance
        checkPerformance(a: string, b: number): Chainable
    }
}

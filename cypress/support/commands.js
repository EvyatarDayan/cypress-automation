// -------- CUSTOM COMMANDS -------- //

// ACTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- goto --
Cypress.Commands.add('goto', (url) => {
  cy.visit(url);
});

// -- clickOn --
Cypress.Commands.add('clickOn', (selector) => {
  cy.get(selector).click({ force: true });
});

// -- clickOnByPixels --
Cypress.Commands.add('clickOnByPixels', (selector, x, y) => {
  cy.get(selector).click(x, y, { force: true });
});

// -- doubleClick --
Cypress.Commands.add('doubleClick', (selector) => {
  cy.get(selector).dblclick();
});

// -- clickOnXpath --
Cypress.Commands.add('clickOnXpath', (xpath) => {
  cy.xpath(xpath).click();
});

// -- selectFromDropdown --
Cypress.Commands.add('selectFromDropdown', (selector, value) => {
  cy.get(selector).select(value, { force: true });
});

// -- typeValueByXpath --
Cypress.Commands.add('typeValueByXpath', (xpath, value) => {
  cy.xpath(xpath).type(value, { force: true });
});

// -- doubleClickOnXpath --
Cypress.Commands.add('doubleClickOnXpath', (xpath) => {
  cy.xpath(xpath).dblclick({ force: true });
});

// -- multipleClicks --
Cypress.Commands.add('multipleClicks', (selector, numberOfTimes) => {
  for (let i = 0; i < numberOfTimes; i++) {
    cy.get(selector).click({ force: true })
      .wait(500);
  }
});

// -- dragAndDropByElements --
Cypress.Commands.add('dragAndDropByElements', (dragElement, dropElement) => {
  cy.get(dragElement).drag(dropElement, { force: true });
});

// -- dragAndDropByPixels --
Cypress.Commands.add('dragAndDropByPixels', (dragElement, x, y) => {
  cy.get(dragElement).trigger('mousedown', { force: true }).wait(500)
    .trigger('mousemove', x, y, { force: true })
    .trigger('mouseup', { force: true });
});

// -- dragAndDropByPixelsByXpath --
Cypress.Commands.add('dragAndDropByPixelsByXpath', (dragElement, x, y) => {
  cy.xpath(dragElement).trigger('mousedown', { force: true }).wait(500)
    .trigger('mousemove', x, y, { force: true })
    .trigger('mouseup', { force: true });
});

// -- dragAndDropByXpath --
Cypress.Commands.add('dragAndDropByXpath', (dragElement, dropElement) => {
  cy.xpath(dragElement).drag(dropElement, { force: true });
});

// -- backspaceKey --
Cypress.Commands.add('backspaceKey', (selector, numberOfTimes) => {
  for (let i = 0; i < numberOfTimes; i++) {
    cy.get(selector).type('{backspace}');
  }
});

// -- selectText --
Cypress.Commands.add('selectText', (selector, numberOfTimes) => {
  for (let i = 0; i < numberOfTimes; i++) {
    cy.get(selector).type('{meta}a', { force: true });
  }
});

// -- clickIfExist --
Cypress.Commands.add('clickIfExist', (selector) => { // This will click on the element only in case
  cy.get('body').then((body) => { // it exist
    if (body.find(selector).length > 0) {
      cy.clickOn(selector);
    }
  });
});

// -- typeValue --
Cypress.Commands.add('typeValue', (selector, value) => {
  cy.get(selector).type(value);
});

// -- clearValue --
Cypress.Commands.add('clearValue', (selector) => {
  cy.get(selector).clear();
});

// -- back --
Cypress.Commands.add('back', (numberOfTimes) => {
  for (let i = 0; i < numberOfTimes; i++) {
    cy.go('back');
    cy.wait(200);
  }
});

// -- refresh --
Cypress.Commands.add('refresh', () => {
  cy.reload();
});

// -- waitFor --
Cypress.Commands.add('waitFor', (time) => {
  cy.wait(time);
});

// -- waitForVisibleElement --
Cypress.Commands.add('waitForVisibleElement', (selector, timeout) => {
  cy.get(selector, { timeout }).should('be.visible');
});

// -- pauseHere --
Cypress.Commands.add('pauseHere', () => {
  cy.pause();
});

// -- checkCheckbox --
Cypress.Commands.add('checkCheckbox', (selector) => {
  cy.get(selector).check({ force: true });
});

// -- uncheckCheckbox --
Cypress.Commands.add('uncheckCheckbox', (selector) => {
  cy.get(selector).uncheck({ force: true });
});

// -- getText --
Cypress.Commands.add('getText', (selector) => {
  cy.get('body').find(selector).invoke('text').then((text) => {
    cy.log(`Your text is: ${text}`);
  });
});

// -- clickOnText --
Cypress.Commands.add('clickOnText', (text) => {
  cy.xpath(`//*[contains(text(), '${text}')]`).click();
});

// -- scrollToElement --
Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).scrollIntoView();
});

// -- scrollToPosition --
Cypress.Commands.add('scrollToPosition', (x, y) => {
  cy.scrollTo(x, y);
});

// -- hoverElement --
Cypress.Commands.add('hoverElement', (selector) => {
  cy.get(selector).realHover('center');
});

// -- hoverXpathElement --
Cypress.Commands.add('hoverXpathElement', (selector) => {
  cy.xpath(selector).realHover('center');
});

// -- updateAttr --
Cypress.Commands.add('updateAttr', (selector, attrName, attrValue) => {
  cy.get(selector).invoke('attr', attrName, attrValue);
});

// -- openInCurrentTab --                                       // This will remove "target" att from the
Cypress.Commands.add('openInCurrentTab', (selector) => { // element in order to open the link in the same tab
  cy.get(selector).invoke('removeAttr', 'target').click({force: true}); // (Cypress not supporting multiple tabs)
});

Cypress.Commands.add('loginWithNoUI', (email, password) => {
  cy.goto(`${Cypress.env('PORTAL_PUBLIC_URL')}/auth/login`);

  cy.request({
    url: `${Cypress.env('USERS_PUBLIC_URL')}/login`,
    method: 'POST',
    body: { email, password, username: email, captcha: 'test' },
    headers: {
      'admin-token': Cypress.env('SERVER_ADMIN_TOKEN')
    },

  });
});

// -- loginToPortal --
Cypress.Commands.add('loginToPortal', (email, password) => {
  cy.intercept('POST', '**/login', (req) => {
    req.headers['admin-token'] = Cypress.env('ADMIN_TOKEN');
  }).as('login');

  cy.goto(`${Cypress.env('PORTAL_PUBLIC_URL')}/auth/login`);

  cy.typeValue('[style="grid-row:1"] > .InputField_input__1JpI-', email);
  cy.typeValue('[style="grid-row:3"] > .InputField_input__1JpI-', password);
  cy.clickOn('.apeButton');
  cy.wait('@login');
});

// -- preserveCookie --
Cypress.Commands.add('preserveCookie', (...cookieNames) => {
  Cypress.Cookies.preserveOnce(...cookieNames);
});

// ASSERTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- propertyContains --
Cypress.Commands.add('propertyContains', (selector, property, value) => {
  cy.get(selector).should('have.css', property, value);
});

// -- attributeContains --
Cypress.Commands.add('attributeContains', (selector, attribute, value) => {
  cy.get(selector).should('have.attr', attribute, value);
});

// -- urlContains --
Cypress.Commands.add('urlContains', (value) => {
  cy.url().should('contain', value);
});

// -- textContains --
Cypress.Commands.add('textContains', (selector, text) => {
  cy.get(selector).contains(text);
});

// -- elementExist --
Cypress.Commands.add('elementExist', (selector) => {
  cy.get(selector).should('exist');
});

// -- elementNotExist --
Cypress.Commands.add('elementNotExist', (selector) => {
  cy.get(selector).should('not.exist');
});

// -- validateCookie --
Cypress.Commands.add('validateCookie', (cookieName, cookieValue) => {
  cy.getCookie(cookieName).should('have.property', 'value', cookieValue);
});

// -- validateCookieDomain --
Cypress.Commands.add('validateCookieDomain', (cookieName, cookieDomain) => {
  cy.getCookie(cookieName).should('have.property', 'domain', cookieDomain);
});

// EVENTS COMMANDS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- startEventListener --
Cypress.Commands.add('startEventListener', () => {
  cy.intercept({
    method: 'POST',
    url: '/event',
    hostname: 'events.apester.com',
  }, (req) => {
    if (req.body.hasOwnProperty('event')) {
      req.alias = req.body.event; // alias this intercept to the "event" property inside the request body
      console.log(req.body);
    }
  });
});

// -- eventExist --
Cypress.Commands.add('eventExist', (eventName) => {
  cy.wait(`@${eventName}`).then((interception) => {
    assert.equal(interception.request.body.event, eventName); // Validate event exist by event name
  });
});

// -- eventStatusCode --
Cypress.Commands.add('eventStatusCode', (eventName, statusCodeValue) => {
  cy.wait(`@${eventName}`).then((interception) => {
    assert.equal(interception.response.statusCode, statusCodeValue); // Validate event status code (202 for success)
  });
});

// -- eventPropertyContains --
Cypress.Commands.add('eventPropertyContains', (eventName, propertyName, propertyValue) => {
  cy.wait(`@${eventName}`).then((interception) => {
    assert.equal(interception.request.body.properties[propertyName], propertyValue); // Validate event specific property value
  });
});

// -- eventMetadataContains --
Cypress.Commands.add('eventMetadataContains', (eventName, metadataName, metadataValue) => {
  cy.wait(`@${eventName}`).then((interception) => {
    assert.equal(interception.request.body.metadata[metadataName], metadataValue); // Validate event specific metadata value
  });
});

// IFRAME COMMANDS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- switchToIframe --
Cypress.Commands.add('switchToIframe', (iframe) => // This will switch to iframe, use only native cy commands within that function
  cy.get(iframe)
    .its('0.contentDocument.body')
    .should('be.visible')
    .then(cy.wrap));

// -- iframeClickOn --
Cypress.Commands.add('iframeClickOn', (iframe, selector) => { // This will enter an iFrame and click on element
  cy.get(iframe)
    .then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find(selector).click();
    });
});

// -- iframeClickOnText --
Cypress.Commands.add('iframeClickOnText', (iframe, text) => { // This will click on text (using xpath)
  cy.get(iframe)
    .then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .xpath(`//*[contains(text(), '${text}')]`).click();
    });
});

// -- iframeTextContains --
Cypress.Commands.add('iframeTextContains', (iframe, selector, text) => { // This will enter an iFrame and validate text
  cy.get(iframe)
    .then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find(selector).contains(text);
    });
});

// -- iframeTypeValue --
Cypress.Commands.add('iframeTypeValue', (iframe, selector, value) => { // This will enter an iFrame and validate text
  cy.get(iframe)
    .then(($iframe) => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find(selector).type(value);
    });
});

// PERFORMANCE COMMANDS
//--------------------------------------------------------------------------------------------------------------------------------------

// -- checkPerformance --
Cypress.Commands.add('checkPerformance', (url, threshold) => { // This will open URL and check it's loading time
  cy.visit(url, {
    onBeforeLoad: (win) => {
      win.performance.mark('start-loading');
    }
  })
  // Get the performance property to work with
    .its('performance')
    .then((performance) => {
      // This is how we will tell that our page is loaded
      cy.get('body').should('contain.text', '')
      // Add a timestamp once the page has loaded
        .then(() => performance.mark('end-loading'))

        .then(() => {
          performance.measure('pageLoad', 'start-loading', 'end-loading');
          // Retrieve the timestamp we just created
          const measure = performance.getEntriesByName('pageLoad')[0];
          // This is the total amount of time (in milliseconds) between the start and end
          const { duration } = measure;
          assert.isAtMost(duration, threshold);
        });
    });
});

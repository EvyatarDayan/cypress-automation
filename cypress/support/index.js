// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '../support/commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

import 'cypress-mochawesome-reporter/register';
import '@bahmutov/cy-api/support';
import 'cypress-xpath';
import 'cypress-iframe';
import "cypress-real-events/support";
import '@4tw/cypress-drag-drop';
import 'cypress-lighthouse';
import 'cypress-terminal-report/src/installLogsCollector';


// Alternatively you can use CommonJS syntax:
// require('./commands')

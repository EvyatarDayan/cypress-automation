/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// plugins file
module.exports = (on, config) => {
  // accept a configFile value or use local by default
};

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--remote-debugging-port=9222');

      // whatever you return here becomes the new args
      return args;
    }
  });
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};

module.exports = (on) => {
  require('cypress-terminal-report/src/installLogsPrinter')(on);
};

let NOSCRevenue;
let withSCRevenue;
let alternativeA;
let alternativeB;
let normaliseRevWithSC;
let normaliseRevenueWithoutSC;
let diffAsPercentageAfterRound;

module.exports = (on, config) => {
  on('task', {
    setNOSCRevenue: (val) => (NOSCRevenue = val),
    getNOSCRevenue: () => NOSCRevenue,

    setWithSCRevenue: (val) => (withSCRevenue = val),
    getWithSCRevenue: () => withSCRevenue,

    setAlternativeA: (val) => (alternativeA = val),
    getAlternativeA: () => alternativeA,

    setAlternativeB: (val) => (alternativeB = val),
    getAlternativeB: () => alternativeB,

    setNormaliseRevWithSC: (val) => (normaliseRevWithSC = val),
    getNormaliseRevWithSC: () => normaliseRevWithSC,

    setNormaliseRevenueWithoutSC: (val) => (normaliseRevenueWithoutSC = val),
    getNormaliseRevenueWithoutSC: () => normaliseRevenueWithoutSC,

    setDiffAsPercentageAfterRound: (val) => (diffAsPercentageAfterRound = val),
    getDiffAsPercentageAfterRound: () => diffAsPercentageAfterRound,

    getAllSavedValues: () => ({
      NOSCRevenue,
      withSCRevenue,
      alternativeA,
      alternativeB,
      normaliseRevWithSC,
      normaliseRevenueWithoutSC,
      diffAsPercentageAfterRound
    }),
    log(message) {
      console.log(message);
      return null;
    }
  });
};

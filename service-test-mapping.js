const sanityTests = [];

module.exports = {
  test: ['./cypress/integration/tests/playground/CICD/**/*.spec.js'],
  editor: ['./cypress/integration/tests/sanity/editor/**/*.spec.js'].concat(sanityTests), // dashboard + editor.
  portal: ['./cypress/integration/tests/sanity/portal/**/*.spec.js'].concat(sanityTests), // login/onboarding/ use case landing page.
  payments: ['./cypress/integration/tests/sanity/payments/**/*.spec.js'].concat(sanityTests), // plans + payments.
  preview: ['./cypress/integration/tests/sanity/editor/sanity-preview-page.spec.js'].concat(sanityTests), // the preview landing page shared from the editor preview.apester.com.
  player: ['./cypress/integration/tests/sanity/player/**/*.spec.js'].concat(sanityTests), // player.
  sdk: [], // old sdk.
  'web-sdk': [], // new sdk.
  console: ['./cypress/integration/tests/sanity/portal/settings/sanity-portal-settings.spec.js'].concat(sanityTests), // settings etc.
  campaign: ['./cypress/integration/tests/sanity/campaign/**/*.spec.js'].concat(sanityTests), // campaign client.
  'campaign-api': ['./cypress/integration/tests/sanity/campaign/api/**/*.spec.js'].concat(sanityTests), // campaigns api.
  display: ['./cypress/integration/tests/sanity/portal/media/**/*.spec.js'].concat(sanityTests), // all of the serving logic (playlist, strip, etc).
  match: [], // ad serving logic.
  interaction: ['./cypress/integration/tests/sanity/portal/media/sanity-dashboard-interactions.spec.js'].concat(sanityTests), // service responsible for interactions.
  users: ['./cypress/integration/tests/sanity/portal/authentication/**/*.spec.js'].concat(sanityTests), // service responsible for users registration / channels   creation.
};

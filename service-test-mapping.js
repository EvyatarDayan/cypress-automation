const sanityTests = [];

module.exports = {

  editor: ['./cypress/integration/tests/CICD/*.spec.js'].concat(sanityTests), // dashboard + editor.
  portal: [], // login/onboarding/ use case landing page.
  payments: [], // plans + payments.
  preview: [], // the preview landing page shared from the editor preview.apester.com.
  player: [], // player.
  sdk: [], // old sdk.
  'web-sdk': [], // new sdk.
  console: [], // settings etc.
  campaign: [], // campaign client.
  'campaign-api': [], // campaigns api.
  display: [], // all of the serving logic (playlist, strip, etc).
  match: [], // ad serving logic.
  interaction: [], // service responsible for interactions.
  users: [], // service responsible for users registration / channels   creation.
};

const dayjs = require('dayjs');
const res = require('../../../support/res');
const aniviewRes = require('./aniview-res');

const currentDate = dayjs().format('HH:mm - MMM DD, YYYY');
const trackUrl = 'https://events.apester.com/px.jpg?event=tpe_ad_start&thirdParty=Aniview&channelId=[AV_CDIM2]&interactionId=[AV_CDIM1]&referrer=[AV_CDIM8]&session_Id=[AV_CDIM3]&demand_id=[AV_CHANNELID]&monBidder=[AV_ADVERTISER_NAME]&campaignId=[AV_CDIM6]&canonicalUrl=[AV_URL]&dynamic_bid=[AVC_CPM]';
const allInvalid = [];

describe('Stage 1 - aniview update', () => {
  it('Step 1 - Login and update all', () => {
    cy
      .goto(`${Cypress.env('ANIVIEW_PUBLIC_URL')}/login`)
      .typeValue('#id', res.prodUsers.aniview.email)
      .typeValue('#password', res.prodUsers.aniview.password)
      .clickOn('button')
      .waitFor(10000);

    for (let i = 0; i < aniviewRes.items.length; i++) {
      cy
      // Open the item URL
        .goto(`https://manage.aniview.com/adsources/${aniviewRes.items[i]}/settings/`)
        .waitFor(8000);

      cy.get('body').then((body) => {
        if (body.find('#tracker-0-url').length > 0) {
          cy.waitFor(1000)
          // Clear tracker URL field
            .clearValue('#tracker-0-url');
          // Add new tracker value
          cy.get('#tracker-0-url').type(trackUrl, { delay: 0 })
          // Click on save button.
            .clickOn('.button-save').waitFor(1000);
        } else {
          // In case tracker field don't exist log the track ID and skip to next iteration
          cy.log(`Didn't get a valid response from track ID: ${aniviewRes.items[i]}`);
          allInvalid.push(aniviewRes.items[i]);
        }
      });
    }
  });

  it('Step 2 - Report', () => {
    const invalidCount = allInvalid.length;
    // Create report file with all invalid track ID's
    cy.writeFile('cypress/integration/tools/aniview/aniviewReport.txt', `-- ${currentDate} --\n\n`);
    cy.writeFile('cypress/integration/tools/aniview/aniviewReport.txt', `Found ${invalidCount} invalid track ID's:\n\n`, { flag: 'a+' });
    cy.writeFile('cypress/integration/tools/aniview/aniviewReport.txt', allInvalid, { flag: 'a+' });
  });
});

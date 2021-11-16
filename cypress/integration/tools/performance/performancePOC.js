import { fetchAllLayouts, findLayoutId } from '../../../support/utils';

const res = require('../../../support/res');

let storyLayoutId;
let pollLayoutId;

describe('Performance POC', async () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    storyLayoutId = findLayoutId('story', layouts);
    pollLayoutId = findLayoutId('multi-poll-two', layouts);
  });

  it('Check registration page', () => {
    cy
      .checkPerformance(`${Cypress.env('PORTAL_PUBLIC_URL')}/auth/signup`, 10000)
      .waitFor(1000);
  });

  it('Check login page', () => {
    cy
      .checkPerformance(`${Cypress.env('PORTAL_PUBLIC_URL')}/auth/login`, 10000)
      .waitFor(1000);
  });

  it('Check default page (Media)', () => {
    cy
      .loginToPortal(res.automationUsers.admin1.email, res.automationUsers.admin1.password)
      .checkPerformance('https://app.automation.apester.dev/dashboard?tab=media', 10000)
      .waitFor(3000);
  });

  it('Check Create new story', () => {
    cy
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${storyLayoutId}`)
      .checkPerformance('https://app.automation.apester.dev/editor/new?layoutId=60e7098e5d57eb00181def71', 10000)
      .waitFor(3000);
  });

  it('Check Create new poll', () => {
    cy
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${pollLayoutId}`)
      .checkPerformance('https://app.automation.apester.dev/editor/new?layoutId=60e7098e5d57eb00181def6a', 10000)
      .waitFor(3000);
  });
});

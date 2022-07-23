import { fetchAllLayouts, findLayoutId } from '../../../support/utils';

const res = require('../../../support/res');

let storyLayoutId;

describe('Create story', async () => {
  before(async () => {
    const layouts = await fetchAllLayouts();
    storyLayoutId = findLayoutId('story', layouts);
  });

  it('Login', () => {
    cy
      .loginToPortal(res.automationUsers.user3.email, res.automationUsers.user3.password)
      .goto(`${Cypress.env('EDITOR_PUBLIC_URL')}/editor/new?layoutId=${storyLayoutId}`)
      .preserveCookie('automationApesterSession');
  });

  it('step 2 - Create the story', () => {
    cy
    // Close "Welcome to story" page if exist
      .clickIfExist('.story-info-overlay-header__right > .icon-button')
        .waitFor(2000)
      .clickOn('[data-cy=story-layouts-media-8]');
  });
});

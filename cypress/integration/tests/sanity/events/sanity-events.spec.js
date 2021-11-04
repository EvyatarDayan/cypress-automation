describe('test events', () => {
  it('Test URL for events', () => {
    cy.startEventListener();
    cy.goto('https://galtubi91.github.io/articles/strip-with-playlist-rtk-test-prod/')

    // .waitFor(5000)
      .eventExist('player_mon_impression')
      .eventExist('apester_sdk_display_failed')
      .eventPropertyContains('player_mon_loading_pending', 'interactionId', '5f3a91875c6921649611d417');
    cy.refresh()
      .eventPropertyContains('player_mon_loading_pending', 'publisherId', '5f3a8cf5685616b6b2d84426');
    // .eventPropertyContains('apester_sdk_loaded', 'isArticle', 'true')
  });
});

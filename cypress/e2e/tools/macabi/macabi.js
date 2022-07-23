const macabiRes = require('./macabiRes');

const successSound = macabiRes.sounds.dua;

describe('Ynet quiz', () => {
  it('Navigate to URL', () => {
    cy.visit('https://mac.maccabi4u.co.il/login?SAMLRequest=rZJJT8MwEIX%2FSuR7NpNuVhNUqBCVWCIaceCCHMdtLTnj4HFY%2Fj1OikQREics%0AzclvZt73NEvkre7YqncHeJAvvUQXvLcakI0fOektMMNRIQPeSmROsO3q9obR%0AKGGdNc4Io0mw9n0KuFMGcnJwrkMWxy0XkS%2FBa5X1kTCR0rE2ewUkuDJWyHFp%0AThISbNY5ea75bDeZ0qSm%2Fsk0E5M5nc93Z1TMaLZoGi9D7OUG0HFwOaEJTcOU%0AhumioglLpoxmTyQovzxdKGgU7P8GqI8iZNdVVYbl%2FbYaB7yqRto7r%2F5mMaAV%0AyF84DQceAo%2B5R4mHxEIJTWcUuEjs1XmXY0dJ8Cgtjsn4naRYDjo2stiTrP92%0AyhGlHeIlxT9YWsYnHo6GOjYAb9al0Up8BCutzdulldz5EFISF8eWn5dSfAI%3D%0A&RelayState=https%3A%2F%2Fonline.maccabi4u.co.il&SigAlg=http%3A%2F%2Fwww.w3.org%2F2000%2F09%2Fxmldsig%23rsa-sha1&Signature=Nj2ne6QbKUxK%2BfdMdwXGnhQkgV%2FrSmnAF5MqnkpcA9qQZIFmdcrncxsDJLhM0vaawyvPyE3R1bonCVFlfSmRsPaH%2BN%2FGq7NpcGbr2a%2BtscEdKgegUUZiKmWVX9U7WKzmgonQIBZtiJnSWeV541fL2Nl0eyyD%2BnPAX3cpBSIlLZjq8AqWGMRWU%2FkmpQEAIgNlyIptUDqidkcZxPLC2iyDmcVOPKkH%2BsT2EuSNDs4RYUOYHDwoibH%2BGUBMRrrjjGdRUgN52X8gLB0jteUNOzBvwYfDEeBj7aGenTRHlRinXGSUYZAhjLSc%2BNISGDIKhcwVKvf8R45AzTiDDex0IgP0zQ%3D%3D')
      .clickOn('.login > .row > :nth-child(1) > a') // login with usrname and password
      .typeValue('#identifyWithPasswordCitizenId', '309379162') // ID
      .typeValue('#password', '225Arist0') // Password
      .clickOn('#IdentifyWithPassword > .submit') // Submit button

      .clickOn('#ctl00_ctl00_MainPlaceHolder_Body_wcHomeUserPersonalNavMenu_rptUserPersonalMenu_ctl00_imgOuter')
      .waitFor(4000)
      .clickIfExist('.WelcomeModal__welcomePopUpBtn--1ozWCW-QhLLa9-o') // close popup message
      .clickOn('div.NewAppointmentLobby__card--1MJ3O9e0y6jOIb_ > .NewAppointmentLobby__cardBtn--1RUIZf7a9ESf45W') // חיפוש רופא, כפתור המשך
      .typeValue('#searchInput', 'ד״ר מושב סולומון') // שם הרופא
      .clickOn('.text_w_16') // Search button
      .clickOn('.newShowSearch') // זימון תור
      .clickOn(':nth-child(2) > .ButtonPickerWithDisableDesc-module__button--1BcGoZ8CmGaRA7J') // ביקור רגיל
      .clickOn('.VisitTypesSelect__continueBtn--2H7P6qzCIklCpCx'); // המשך

    cy.get('.DayPicker-Caption > div').then(($dateLabel) => {
      if ($dateLabel.text().includes('ינואר')) {
        cy.log('=== Date is available! call sasha! ===');
      } else {
        cy.log('=== Date is not available, sorry! ===');
      }
    });
  });
});
